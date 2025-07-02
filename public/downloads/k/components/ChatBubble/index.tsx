import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ChatInterface } from '../../pages/ChatInterface';
import { chatStore } from '../../stores/chatStore';
import { whenKatexReady } from '../../utils/assetLoader';
import { clearHighlights } from '../../core/selectionHandler';
import { cancelPendingChatBubble } from '../../core/uiStateStore';
import '../../styles/chat-bubble.css';
import './ChatBubble.css';
import './katex_fonts.css';

interface ScimigoWindow extends Window {
  scimigo?: {
    isLoginPromptShown?: boolean;
    chatBubbleProcessing?: boolean;
    debugInfo?: any;
    lastAuthRequest?: any;
    lastChatCloseTime?: number;
  };
  _chatBubbleRoot?: Root;
}

declare let window: ScimigoWindow;

if (!window.scimigo) window.scimigo = {};

export function isChatBubbleActive(): boolean {
  const container = document.getElementById('scimigo-chat-bubble-container');
  return !!(container && container.style.display !== 'none' && (container as any)._reactRoot);
}

type InitialPrompt = string | {
  type?: string;
  reason?: string;
  code?: string;
  question?: string;
  text?: string;
  content?: string;
  selection?: string;
  initialPrompt?: string;
  [key: string]: any;
};

export function initChatBubble(initialPrompt: InitialPrompt, darkMode = false): boolean {
  if (isChatBubbleActive()) {
    if (initialPrompt && typeof initialPrompt === 'object' && initialPrompt.type === 'AUTH_REQUIRED') {
      const authEvent = new CustomEvent('SCIMIGO_AUTH_REQUIRED', {
        detail: {
          reason: initialPrompt.reason,
          code: initialPrompt.code
        }
      });
      document.dispatchEvent(authEvent);
      return true;
    }
    
    const warningEvent = new CustomEvent('SCIMIGO_SHOW_WARNING', {
      detail: {
        message: 'Please close the current chat session before starting a new one.',
        type: 'warning',
        action: 'close_chat'
      }
    });
    document.dispatchEvent(warningEvent);
    return false;
  }
  
  let promptText = '';
  if (typeof initialPrompt === 'string') {
    promptText = initialPrompt;
  } else if (initialPrompt && typeof initialPrompt === 'object') {
    promptText = initialPrompt.question || initialPrompt.text || initialPrompt.content || 
                 initialPrompt.selection || initialPrompt.initialPrompt || '';
    if (!promptText) {
      const stringProps = Object.entries(initialPrompt)
        .filter(([, value]) => typeof value === 'string' && value.trim().length > 0)
        .map(([, value]) => value);
      
      if (stringProps.length > 0) {
        promptText = stringProps.sort((a, b) => b.length - a.length)[0];
      } else {
        try {
          promptText = JSON.stringify(initialPrompt, null, 2);
        } catch {
          promptText = 'Could not process the initial prompt.';
        }
      }
    }
  }
  
  let container = document.getElementById('scimigo-chat-bubble-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'scimigo-chat-bubble-container';
    container.className = 'scimigo-chat-bubble-wrapper chat-theme-extension';
    document.body.appendChild(container);
  } else {
  }

  // If already active and visible, don't create another instance
  if (container.style.display !== 'none' && window._chatBubbleRoot) {
    return false;
  }

  if (window.scimigo?.chatBubbleProcessing) {
    return false;
  }

  window.scimigo = window.scimigo || {};
  window.scimigo.chatBubbleProcessing = true;
  window.scimigo.chatBubbleInitialized = true;

  container.style.display = '';

  // Clear previous messages and set new prompt
  chatStore.clearMessages();
  if (promptText) {
    chatStore.setInputValue(promptText);
  }

  // Ensure KaTeX is loaded before rendering
  whenKatexReady().then(() => {
    let root = window._chatBubbleRoot;
    if (!root) {
      root = createRoot(container);
      window._chatBubbleRoot = root;
    } else {
    }

    root.render(
      <ChatBubbleWrapper 
        initialPrompt={promptText}
        darkMode={darkMode} 
        onUnmount={() => {
          if (window.scimigo) {
            window.scimigo.chatBubbleProcessing = false;
          }
          if (container) {
            container.style.display = 'none';
          }
          chatStore.clearMessages();
        }}
      />
    );
  }).catch(err => {
    console.error('[ChatBubble] Failed to load KaTeX:', err);
    // Still render even if KaTeX fails to load
    let root = window._chatBubbleRoot;
    if (!root) {
      root = createRoot(container);
      window._chatBubbleRoot = root;
    }

    root.render(
      <ChatBubbleWrapper 
        initialPrompt={promptText}
        darkMode={darkMode} 
        onUnmount={() => {
          if (window.scimigo) {
            window.scimigo.chatBubbleProcessing = false;
          }
          if (container) {
            container.style.display = 'none';
          }
          chatStore.clearMessages();
        }}
      />
    );
  });

  return true;
}

interface ChatBubbleWrapperProps {
  initialPrompt?: string;
  darkMode?: boolean;
  onUnmount?: () => void;
}

const ChatBubbleWrapper: React.FC<ChatBubbleWrapperProps> = ({ initialPrompt, darkMode = false, onUnmount }) => {
  const onUnmountRef = React.useRef(onUnmount);
  onUnmountRef.current = onUnmount;
  const hasUserInteracted = React.useRef(false);
  const closingTimeRef = React.useRef<number>(0);
  const [isMinimized, setIsMinimized] = React.useState(false);

  // Track if user has interacted with the chat
  React.useEffect(() => {
    const handleInteraction = () => {
      hasUserInteracted.current = true;
    };

    // Listen for any user interaction with the chat interface
    const container = document.getElementById('scimigo-chat-bubble-container');
    if (container) {
      container.addEventListener('click', handleInteraction);
      container.addEventListener('keydown', handleInteraction);
      container.addEventListener('input', handleInteraction);
    }

    return () => {
      if (container) {
        container.removeEventListener('click', handleInteraction);
        container.removeEventListener('keydown', handleInteraction);
        container.removeEventListener('input', handleInteraction);
      }
    };
  }, []);

  React.useEffect(() => {
    const container = document.getElementById('scimigo-chat-bubble-container');
    if (container) {
      if (isMinimized) {
        container.classList.add('scimigo-minimized');
      } else {
        container.classList.remove('scimigo-minimized');
      }
    }
  }, [isMinimized]);

  React.useEffect(() => {
    return () => {
      closingTimeRef.current = Date.now();
      
      // Cancel any pending chat bubble initialization
      cancelPendingChatBubble();
      
      // Only clear selection if user has interacted with the chat
      // This preserves the selection for copy-paste workflows
      if (hasUserInteracted.current) {
        window.getSelection()?.removeAllRanges();
        clearHighlights(false);
      } else {
        // Set a flag to ignore selection events for a brief period
        // This prevents immediate re-triggering while preserving the selection
        if (window.scimigo) {
          window.scimigo.lastChatCloseTime = Date.now();
        }
      }
      
      if (onUnmountRef.current) {
        onUnmountRef.current();
      }
    };
  }, []); // Empty dependency array - only run once

  const handleClose = () => {
    closingTimeRef.current = Date.now();
    
    // Cancel any pending chat bubble initialization
    cancelPendingChatBubble();
    
    // Only clear selection if user has interacted with the chat
    if (hasUserInteracted.current) {
      window.getSelection()?.removeAllRanges();
      clearHighlights(false);
    } else {
      // Set a flag to ignore selection events for a brief period
      if (window.scimigo) {
        window.scimigo.lastChatCloseTime = Date.now();
      }
    }
    
    if (onUnmountRef.current) {
      onUnmountRef.current();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <div
      className={`scimigo-chat-bubble chat-theme-extension ${darkMode ? 'scimigo-dark-mode' : ''} ${isMinimized ? 'scimigo-minimized' : ''}`}
    >
      <div className="scimigo-chat-header" onDoubleClick={toggleMinimize}>
        <div className="scimigo-chat-title">
          <img
            src={chrome.runtime.getURL('public/icons/icon16.png')}
            alt="SciMigo Logo"
            className="scimigo-header-logo"
          />
          <span>SciMigo AI Tutor</span>
        </div>
        <div className="chat-actions">
          <button
            className="chat-minimize-button"
            onClick={toggleMinimize}
            title={isMinimized ? 'Restore Chat' : 'Minimize Chat'}
          >
            {isMinimized ? '▢' : '–'}
          </button>
          <button
            className="scimigo-chat-close-btn"
            onClick={handleClose}
            title="Close Chat"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="scimigo-chat-body">
        <ChatInterface initialPrompt={initialPrompt} />
      </div>
    </div>
  );
};