import React, { useEffect, useState, useRef } from 'react';
import * as domUtils from '../../utils/domUtils';
import { setPrompt } from '../../core/uiStateStore';
import { pdfHandler } from './pdfHandler';
import { avatarStateManager, AvatarState, AvatarStatus } from './avatarState';

// Ensure webpack's public path is correctly set before any dynamic imports
declare let __webpack_public_path__: string | undefined;
function ensurePublicPath() {
  try {
    if (typeof __webpack_public_path__ !== 'undefined' &&
        !__webpack_public_path__.startsWith('chrome-extension://')) {
      __webpack_public_path__ = chrome.runtime.getURL('/');
    }
  } catch (err) {
    console.error('[Avatar] Failed to set webpack public path:', err);
  }
}
ensurePublicPath();
let extract: (typeof import('../../core/textExtractor'))['extract'] | null = null;
import './Avatar.css';

let avatarDragging = false;

export const Avatar: React.FC = () => {
  const [state, setState] = useState<AvatarState>(avatarStateManager.getState());
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = avatarStateManager.subscribe(setState);
    
    // Create avatar element
    const avatar = document.createElement('div');
    avatar.id = 'scimigo-avatar';
    avatar.setAttribute('data-scimigo-component', 'true');
    (avatarRef as React.MutableRefObject<HTMLDivElement>).current = avatar;
    document.body.appendChild(avatar);

    avatarStateManager.setState({ element: avatar });
    
    // Setup event listeners
    const handleMouseDown = (event: MouseEvent) => {
        if (event.button !== 0) return; // Only handle left clicks
        avatarDragging = true;
        avatarStateManager.setState({ 
            isDragging: true,
            currentState: AvatarStatus.DRAGGING,
            mouseDownPosition: { x: event.clientX, y: event.clientY },
            offset: {
                x: event.clientX - avatarRef.current!.getBoundingClientRect().left,
                y: event.clientY - avatarRef.current!.getBoundingClientRect().top,
            }
        });
        event.preventDefault();
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!state.isDragging) return;
        
        const newPosition = {
            top: event.clientY - state.offset.y,
            left: event.clientX - state.offset.x,
        };
        avatarStateManager.setState({ position: newPosition });

        // Highlight element under cursor
        // Temporarily hide avatar to get element underneath
        if (avatarRef.current) {
            avatarRef.current.style.pointerEvents = 'none';
            const element = document.elementFromPoint(event.clientX, event.clientY);
            avatarRef.current.style.pointerEvents = 'auto';
            
            if (element && element !== state.lastHovered) {
                clearHighlight();
                if (domUtils.isElementHighlightable(element)) {
                    (element as HTMLElement).classList.add('scimigo-target-highlight');
                    avatarStateManager.setState({ lastHovered: element as HTMLElement });
                    console.log('[Avatar] Highlighting element:', element.tagName, element.className);
                }
            }
        }
    };

    const handleMouseUp = async (event: MouseEvent) => {
        if (state.isDragging) {
            // Clear dragging state first
            avatarDragging = false;
            
            // Handle element selection if there's a hovered element
            if (state.lastHovered) {
                await handleElementSelection(state.lastHovered);
            }
            clearHighlight();
            
            // Clear dragging state immediately
            avatarStateManager.setState({ 
                isDragging: false, 
                currentState: AvatarStatus.IDLE
            });
            
            // Return to default position with a small delay
            setTimeout(() => {
                const defaultPos = avatarStateManager.getDefaultPosition();
                avatarStateManager.setState({ 
                    position: defaultPos
                });
            }, 100);
        } else {
            avatarDragging = false;
            avatarStateManager.setState({ isDragging: false, currentState: AvatarStatus.IDLE });
        }
    };

    const handleClick = (event: MouseEvent) => {
        if (pdfHandler.isPdfViewer()) {
            pdfHandler.handleClick(event);
        } else {
            // Handle regular click (e.g., open menu)
        }
    };

    const handleElementSelection = async (element: HTMLElement) => {
        try {
            // Use the proper text extractor to get formatted content
            if (!extract) {
                ensurePublicPath();
                const mod = await import('../../core/textExtractor');
                extract = mod.extract;
            }
            const content = await extract(element, {
                includeMath: true,
                includeImages: true,
                preserveStructure: true
            });
            
            if (content) {
                setPrompt({
                    content,
                    type: 'element',
                    source: 'avatar',
                    position: { x: state.position.left || 0, y: state.position.top || 0 }
                });
                
            }
        } catch (error) {
            console.error('[Avatar] Error extracting element content:', error);
        }
    }

    const clearHighlight = () => {
        if(state.lastHovered) {
            state.lastHovered.classList.remove('scimigo-target-highlight');
            avatarStateManager.setState({ lastHovered: null });
        }
    }

    avatar.addEventListener('mousedown', handleMouseDown);
    avatar.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      unsubscribe();
      avatar.removeEventListener('mousedown', handleMouseDown);
      avatar.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      avatar.remove();
    };
  }, []);

  useEffect(() => {
    if (avatarRef.current) {
      const { position, isEnabled, currentState } = state;
      const avatar = avatarRef.current;

      // Apply styles - convert position object to CSS properties
      const positionStyles: any = {};
      
      // When using bottom/right positioning, clear top/left
      if (position.bottom !== undefined && position.right !== undefined) {
        positionStyles.bottom = `${position.bottom}px`;
        positionStyles.right = `${position.right}px`;
        positionStyles.top = 'auto';
        positionStyles.left = 'auto';
      } 
      // When using top/left positioning (during drag), clear bottom/right
      else if (position.top !== undefined && position.left !== undefined) {
        positionStyles.top = `${position.top}px`;
        positionStyles.left = `${position.left}px`;
        positionStyles.bottom = 'auto';
        positionStyles.right = 'auto';
      }
      
      Object.assign(avatar.style, {
        position: 'fixed',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: '2147483647',
        backgroundColor: 'var(--scimigo-primary-color)',
        backgroundImage: `url(${chrome.runtime.getURL('public/icons/icon48.png')})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        ...positionStyles,
      });

      // Update class based on state
      avatar.className = `scimigo-avatar scimigo-avatar--${currentState}`;
      if (!isEnabled) {
        avatar.classList.add('scimigo-avatar--disabled');
      }
      
      // Add transition for smooth return to position (but not during drag)
      if (!state.isDragging) {
        avatar.style.transition = 'all 0.3s ease';
      } else {
        avatar.style.transition = 'none';
      }
    }
  }, [state]);

  return null; // The component is rendered via direct DOM manipulation
};

export function isAvatarCurrentlyDragging() {
    return avatarDragging;
}

let avatarElement: HTMLDivElement | null = null;
let stateUnsub: (() => void) | null = null;
let handlers: { [k: string]: (e: any) => void } | null = null;

export async function createAvatar(options: { iconUrl?: string; position?: { top?: number; bottom?: number; left?: number; right?: number } } = {}): Promise<HTMLDivElement> {
  if (avatarElement) {
    return avatarElement;
  }

  await avatarStateManager.initialize();

  avatarElement = document.createElement('div');
  avatarElement.id = 'scimigo-avatar';
  avatarElement.setAttribute('data-scimigo-component', 'true');
  avatarElement.style.pointerEvents = 'auto';
  
  // Apply initial styles immediately
  const initialPosition = options.position || avatarStateManager.getState().position;
  const positionStyles: any = {};
  if (initialPosition.top !== undefined) positionStyles.top = `${initialPosition.top}px`;
  if (initialPosition.bottom !== undefined) positionStyles.bottom = `${initialPosition.bottom}px`;
  if (initialPosition.left !== undefined) positionStyles.left = `${initialPosition.left}px`;
  if (initialPosition.right !== undefined) positionStyles.right = `${initialPosition.right}px`;
  
  Object.assign(avatarElement.style, {
    position: 'fixed',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: '2147483647',
    backgroundColor: 'var(--scimigo-primary-color)',
    backgroundImage: `url(${chrome.runtime.getURL('public/icons/icon48.png')})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    ...positionStyles,
  });

  document.body.appendChild(avatarElement);

  stateUnsub = avatarStateManager.subscribe(state => {
    // Convert position object to CSS properties
    const positionStyles: any = {};
    
    // When using bottom/right positioning, clear top/left
    if (state.position.bottom !== undefined && state.position.right !== undefined) {
      positionStyles.bottom = `${state.position.bottom}px`;
      positionStyles.right = `${state.position.right}px`;
      positionStyles.top = 'auto';
      positionStyles.left = 'auto';
    } 
    // When using top/left positioning (during drag), clear bottom/right
    else if (state.position.top !== undefined && state.position.left !== undefined) {
      positionStyles.top = `${state.position.top}px`;
      positionStyles.left = `${state.position.left}px`;
      positionStyles.bottom = 'auto';
      positionStyles.right = 'auto';
    }
    
    Object.assign(avatarElement!.style, {
      position: 'fixed',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      cursor: 'pointer',
      zIndex: '2147483647',
      backgroundColor: 'var(--scimigo-primary-color)',
      backgroundImage: `url(${chrome.runtime.getURL('public/icons/icon48.png')})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      ...positionStyles,
    });

    avatarElement!.className = `scimigo-avatar scimigo-avatar--${state.currentState}`;
    if (!state.isEnabled) {
      avatarElement!.classList.add('scimigo-avatar--disabled');
    }
    
    // Add transition for smooth return to position (but not during drag)
    if (!state.isDragging) {
      avatarElement!.style.transition = 'all 0.3s ease';
    } else {
      avatarElement!.style.transition = 'none';
    }
  });

  const position = options.position || avatarStateManager.getState().position;
  avatarStateManager.setState({ element: avatarElement, position });

  const clearHighlight = () => {
    const s = avatarStateManager.getState();
    if (s.lastHovered) {
      s.lastHovered.classList.remove('scimigo-target-highlight');
      avatarStateManager.setState({ lastHovered: null });
    }
  };

  const handleElementSelection = async (element: HTMLElement) => {
    try {
      // Use the proper text extractor to get formatted content
      if (!extract) {
        ensurePublicPath();
        const mod = await import('../../core/textExtractor');
        extract = mod.extract;
      }
      const content = await extract(element, {
        includeMath: true,
        includeImages: true,
        preserveStructure: true
      });
      
      if (content) {
        const pos = avatarStateManager.getState().position;
        setPrompt({
          content,
          type: 'element',
          source: 'avatar',
          position: { x: pos.left || 0, y: pos.top || 0 }
        });
        
      }
    } catch (error) {
      console.error('[Avatar] Error extracting element content:', error);
    }
  };

  handlers = {
    mousedown: (event: MouseEvent) => {
      if (event.button !== 0) return;
      avatarDragging = true;
      const rect = avatarElement!.getBoundingClientRect();
      avatarStateManager.setState({
        isDragging: true,
        currentState: AvatarStatus.DRAGGING,
        mouseDownPosition: { x: event.clientX, y: event.clientY },
        offset: { x: event.clientX - rect.left, y: event.clientY - rect.top }
      });
      event.preventDefault();
    },
    mousemove: (event: MouseEvent) => {
      const state = avatarStateManager.getState();
      if (!state.isDragging) return;
      const newPosition = {
        top: event.clientY - state.offset.y,
        left: event.clientX - state.offset.x,
      };
      avatarStateManager.setState({ position: newPosition });
      
      // Temporarily hide avatar to get element underneath
      if (avatarElement) {
        avatarElement.style.pointerEvents = 'none';
        const element = document.elementFromPoint(event.clientX, event.clientY);
        avatarElement.style.pointerEvents = 'auto';
        
        if (element && element !== state.lastHovered) {
          clearHighlight();
          if (domUtils.isElementHighlightable(element)) {
            (element as HTMLElement).classList.add('scimigo-target-highlight');
            avatarStateManager.setState({ lastHovered: element as HTMLElement });
            console.log('[Avatar] Highlighting element:', element.tagName, element.className);
          }
        }
      }
    },
    mouseup: async () => {
      const state = avatarStateManager.getState();
      if (state.isDragging) {
        // Clear dragging state first
        avatarDragging = false;
        
        // Handle element selection if there's a hovered element
        if (state.lastHovered) {
          await handleElementSelection(state.lastHovered);
        }
        clearHighlight();
        
        // Clear dragging state immediately
        avatarStateManager.setState({ 
          isDragging: false, 
          currentState: AvatarStatus.IDLE
        });
        
        // Return to default position with a small delay
        setTimeout(() => {
          const defaultPos = avatarStateManager.getDefaultPosition();
          avatarStateManager.setState({ 
            position: defaultPos
          });
        }, 100);
      } else {
        avatarDragging = false;
        avatarStateManager.setState({ isDragging: false, currentState: AvatarStatus.IDLE });
      }
    },
    click: (event: MouseEvent) => {
      if (pdfHandler.isPdfViewer()) {
        pdfHandler.handleClick(event);
      }
    }
  };

  avatarElement.addEventListener('mousedown', handlers.mousedown);
  avatarElement.addEventListener('click', handlers.click);
  document.addEventListener('mousemove', handlers.mousemove);
  document.addEventListener('mouseup', handlers.mouseup);

  pdfHandler.initialize();

  return avatarElement;
}

export function cleanup() {
  if (!avatarElement) return;
  avatarElement.removeEventListener('mousedown', handlers!.mousedown);
  avatarElement.removeEventListener('click', handlers!.click);
  document.removeEventListener('mousemove', handlers!.mousemove);
  document.removeEventListener('mouseup', handlers!.mouseup);
  stateUnsub && stateUnsub();
  avatarElement.remove();
  avatarElement = null;
  handlers = null;
  avatarStateManager.cleanup();
}
