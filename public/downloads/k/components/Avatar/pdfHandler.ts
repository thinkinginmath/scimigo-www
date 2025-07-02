/**
 * PDF Handler Module
 */
import { setPrompt } from '../../core/uiStateStore';

interface PdfHandlerState {
  isPdf: boolean;
  waitingForSelection: boolean;
  hasHandledClick: boolean;
}

// Extend window for PDF.js
declare global {
  interface Window {
    PDFViewerApplication?: any;
  }
}

const state: PdfHandlerState = {
  isPdf: false,
  waitingForSelection: false,
  hasHandledClick: false
};

export function isPdfViewer(): boolean {
  const hasPdfViewerElement = document.querySelector('pdf-viewer#viewer') !== null;
  const isPdfViewerElement = document.querySelector('#viewer.pdfViewer') !== null;
  const hasPdfUrl = /\.pdf($|\?|#)/i.test(window.location.href);
  const hasPdfEmbed = document.querySelector('embed[type="application/pdf"]') !== null;
  const hasPdfJs = typeof window.PDFViewerApplication !== 'undefined';
  
  return hasPdfViewerElement || isPdfViewerElement || hasPdfEmbed || (hasPdfUrl && hasPdfJs);
}

export function initialize(): boolean {
  state.isPdf = isPdfViewer();
  state.waitingForSelection = false;
  state.hasHandledClick = false;
  return state.isPdf;
}

export function handleClick(event: MouseEvent): void {
  if (!state.hasHandledClick) {
    state.hasHandledClick = true;
    state.waitingForSelection = true;
    showManualEntryDialog();
    return;
  }

  if (state.waitingForSelection) {
    handleSelection();
    return;
  }

  showManualEntryDialog();
}

async function showManualEntryDialog(initialText: string = ''): Promise<void> {
  // Same implementation, but with types
  const text = await new Promise<string | null>((resolve) => {
    // ... dialog creation logic ...
    const dialog = document.createElement('div');
    dialog.className = 'scimigo-pdf-dialog';
    dialog.innerHTML = `
      <div class="scimigo-pdf-dialog-content">
        <h3>Enter PDF Content</h3>
        <textarea placeholder="Paste or type the content from the PDF...">${initialText}</textarea>
        <div class="scimigo-pdf-dialog-buttons">
          <button class="scimigo-pdf-dialog-cancel">Cancel</button>
          <button class="scimigo-pdf-dialog-submit">Submit</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(dialog);
    
    const textarea = dialog.querySelector('textarea');
    const submitButton = dialog.querySelector('.scimigo-pdf-dialog-submit') as HTMLButtonElement;
    const cancelButton = dialog.querySelector('.scimigo-pdf-dialog-cancel') as HTMLButtonElement;
    
    submitButton.onclick = () => {
      resolve(textarea?.value || null);
      dialog.remove();
    };
    
    cancelButton.onclick = () => {
      resolve(null);
      dialog.remove();
    };
  });
  
  if (text) {
    processSelection(text);
  }
}

async function handleSelection(): Promise<void> {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      processSelection(text);
    } else {
      showManualEntryDialog();
    }
  } catch (error) {
    console.error('[PDFHandler] Error reading clipboard:', error);
    showManualEntryDialog();
  }
}

function processSelection(text: string): void {
  if (!text) return;
  const cleanedText = text.trim();
  if (!cleanedText) return;

  setPrompt({
    content: cleanedText,
    type: 'pdf',
    position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    source: 'pdf'
  });
  
  state.waitingForSelection = false;
}

function cleanup(): void {
  state.isPdf = false;
  state.waitingForSelection = false;
  state.hasHandledClick = false;
  document.querySelectorAll('.scimigo-pdf-dialog').forEach(el => el.remove());
}

export const pdfHandler = {
  isPdfViewer,
  initialize,
  handleClick,
  getState: (): PdfHandlerState => ({ ...state }),
  cleanup,
}; 