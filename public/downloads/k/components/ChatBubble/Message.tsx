import React, { useState, useEffect, useRef } from 'react';
import { renderMarkdownWithKatex } from '../../utils/markdownUtils';
import { whenKatexReady, isKatexReady, onKatexReady } from '../../utils/assetLoader';
import VoiceSummaryButton from './VoiceSummaryButton';
import type { Katex, Hljs, RenderMathInElement } from '../../utils/markdownUtils';

declare global {
  interface Window {
    hljs?: Hljs;
    katex?: Katex;
    renderMathInElement?: RenderMathInElement;
  }
}

interface MessageData {
  id: string | number;
  content: string;
  position: 'left' | 'right';
  sender: 'user' | 'ai';
  markdown?: string;
  usageStats?: any;
  isStreaming?: boolean;
  isComplete?: boolean;
  reasoning?: string;
  isReasoningInProgress?: boolean;
  isError?: boolean;
  isAuthError?: boolean;
  showLoginButton?: boolean;
}

interface MessageProps {
  message: MessageData;
  onCopy: (content: string) => void;
  darkMode?: boolean;
  isLatestMessage?: boolean;
  onTriggerLogin: () => void;
  katexReady: boolean;
}

const Message: React.FC<MessageProps> = ({ message, onCopy, darkMode = false, isLatestMessage = false, onTriggerLogin, katexReady }) => {
  const [copied, setCopied] = useState(false);
  const [reasoningVisible, setReasoningVisible] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const reasoningContentRef = useRef<HTMLDivElement>(null);
  const {
    id,
    content,
    position,
    sender,
    markdown,
    usageStats,
    isStreaming,
    isComplete,
    reasoning,
    isReasoningInProgress
  } = message;

  // Wait for global KaTeX readiness
  useEffect(() => {
    // Already ready, do nothing.
    if (katexReady) return;

    // This is a fallback in case the direct prop isn't updated
    const unsubscribe = onKatexReady(() => {
      // The parent will re-render with the prop, so we don't need a state variable here
    });

    whenKatexReady().then(() => {
      // The parent will re-render with the prop
    });

    return unsubscribe;
  }, [id, katexReady]);

  // Function to apply syntax highlighting
  const applySyntaxHighlighting = () => {
    if (window.hljs && contentRef.current) {
      const codeBlocks = contentRef.current.querySelectorAll('pre code');
      if (codeBlocks.length > 0) {
        console.log(`[Message] Applying syntax highlighting to ${codeBlocks.length} code blocks`);
        
        Array.from(codeBlocks).forEach(block => {
          try {
            if ((block as HTMLElement).classList.contains('scimigo-highlighted')) {
              return;
            }

            const classList = (block as HTMLElement).className.split(' ');
            const langClass = classList.find(cls => cls.startsWith('language-'));
            
            if (langClass) {
              const language = langClass.replace('language-', '');
              if (language && !['', 'plaintext', 'text'].includes(language)) {
                if (!window.hljs.getLanguage(language)) {
                  window.hljs.highlightElement(block);
                } else {
                  (block as HTMLElement).setAttribute('data-language', language);
                  window.hljs.highlightElement(block);
                }
              } else {
                window.hljs.highlightElement(block);
              }
            } else {
              window.hljs.highlightElement(block);
            }
            
            (block as HTMLElement).classList.add('scimigo-highlighted');
            
          } catch (error) {
            console.error('[Message] Failed to highlight code block:', error);
            (block as HTMLElement).classList.add('scimigo-highlight-failed');
          }
        });
      }
    }
  };

  // Render markdown + LaTeX when message content changes and KaTeX is ready
  useEffect(() => {
    if (contentRef.current && sender === 'ai' && markdown) {
      try {
        renderMarkdownWithKatex(markdown, contentRef.current, katexReady, String(id));

        setTimeout(() => {
          applySyntaxHighlighting();
        }, 150);

        if (katexReady && window.katex && window.renderMathInElement) {
          setTimeout(() => {
            try {
              if (contentRef.current) {
                window.renderMathInElement(contentRef.current, {
                  delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '\\[', right: '\\]', display: true },
                    { left: '$', right: '$', display: false },
                    { left: '\\(', right: '\\)', display: false }
                  ],
                  throwOnError: false,
                  output: 'html',
                  trust: true
                });
                applySyntaxHighlighting();
              }
            } catch (err) {
              console.warn('[Message] Error in direct KaTeX rendering fallback:', err);
            }
          }, 500);
        }
      } catch (error) {
        console.error('[Message] Error rendering message:', error);
        contentRef.current.innerHTML = `<div class="scimigo-message-error">
          Error rendering message. <br><pre>${(error as Error).message}</pre>
        </div>`;
      }
    }
  }, [markdown, sender, id, katexReady]);

  // Render reasoning content when available
  useEffect(() => {
    if (reasoningContentRef.current && sender === 'ai' && reasoning) {
      try {
        renderMarkdownWithKatex(reasoning, reasoningContentRef.current, katexReady, `${id}-reasoning`);

        setTimeout(() => {
          if (window.hljs && reasoningContentRef.current) {
            const codeBlocks = reasoningContentRef.current.querySelectorAll('pre code');
            if (codeBlocks.length > 0) {
              Array.from(codeBlocks).forEach(block => {
                try {
                  window.hljs.highlightElement(block);
                } catch (error) {
                  console.error('[Message] Failed to highlight code block in reasoning:', error);
                }
              });
            }
          }
        }, 50);
      } catch (error) {
        console.error('[Message] Error rendering reasoning:', error);
        reasoningContentRef.current.innerHTML = `<div class="scimigo-message-error">
          Error rendering reasoning. <br><pre>${(error as Error).message}</pre>
        </div>`;
      }
    }
  }, [reasoning, sender, id, katexReady]);

  // Apply syntax highlighting when highlight.js becomes available
  useEffect(() => {
    const checkForHighlightJs = () => {
      if (window.hljs) {
        applySyntaxHighlighting();
        return true;
      }
      return false;
    };

    if (!checkForHighlightJs()) {
      const timer = setTimeout(checkForHighlightJs, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCopy = () => {
    if (onCopy) {
      onCopy(markdown || content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleReasoning = () => {
    setReasoningVisible(!reasoningVisible);
  };

  return (
    <div className={`scimigo-chat-message scimigo-${position} ${isStreaming ? 'scimigo-streaming' : ''} ${isComplete ? 'scimigo-complete' : ''}`} data-message-id={id}>
      <div className={`scimigo-avatar scimigo-${sender}-avatar`}>
        {sender === 'user' ? 'U' : 'AI'}
      </div>
      
      {darkMode && position === 'left' ? (
        <div 
          id="scimigo-dark-message"
          className="scimigo-message-bubble scimigo-dark-message-bubble"
          style={{
            backgroundColor: '#3a3a3a',
            color: '#f5f5f5',
            borderTopLeftRadius: '4px',
            marginRight: '40px'
          }}
        >
          {sender === 'user' ? (
            <div className="scimigo-message-content" style={{color: '#f5f5f5'}}>{content}</div>
          ) : message.isError ? (
            <>
              <div 
                ref={contentRef} 
                className={`scimigo-message-content ${message.isAuthError ? 'scimigo-auth-error' : 'scimigo-error-message'}`} 
                style={{
                  color: message.isAuthError ? '#2196f3' : 'red', 
                  fontWeight: 500
                }}
              >
                {!markdown && <div className="scimigo-message-loading">Error occurred</div>}
              </div>
              {message.showLoginButton && (
                <button
                  className="scimigo-login-button"
                  onClick={onTriggerLogin}
                  style={{
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  Log In to Continue
                </button>
              )}
            </>
          ) : (
            <div ref={contentRef} className="scimigo-message-content">
              {!markdown && <div className="scimigo-message-loading">Loading...</div>}
            </div>
          )}
          <div className="scimigo-message-toolbar">
            <button className="scimigo-copy-btn" onClick={handleCopy}>
              {copied ? '✅' : '📄'}
            </button>
          </div>
        </div>
      ) : (
        <div className={`scimigo-message-bubble scimigo-${position}-bubble`}>
          {sender === 'user' ? (
            <div className="scimigo-message-content">{content}</div>
          ) : message.isError ? (
            <>
              <div 
                ref={contentRef} 
                className={`scimigo-message-content ${message.isAuthError ? 'scimigo-auth-error' : 'scimigo-error-message'}`} 
              >
                {!markdown && <div className="scimigo-message-loading">Error occurred</div>}
              </div>
              {message.showLoginButton && (
                <button
                  className="scimigo-login-button"
                  onClick={onTriggerLogin}
                >
                  Log In to Continue
                </button>
              )}
            </>
          ) : (
            <div ref={contentRef} className="scimigo-message-content">
              {!markdown && <div className="scimigo-message-loading">Loading...</div>}
            </div>
          )}

          <div className="scimigo-message-toolbar">
            <button className="scimigo-copy-btn" onClick={handleCopy}>
              {copied ? '✅' : '📄'}
            </button>
            {reasoning && (
              <button className="scimigo-reasoning-btn" onClick={toggleReasoning}>
                {reasoningVisible ? '▲' : '▼'} R
              </button>
            )}
            {isLatestMessage && (
              <VoiceSummaryButton 
                responseId={String(id)} 
                isLatestMessage={isLatestMessage}
                darkMode={darkMode}
                isGeneratingSummary={isGeneratingSummary}
                onSummaryGenerationStart={() => setIsGeneratingSummary(true)}
                onSummaryGenerationEnd={() => setIsGeneratingSummary(false)}
              />
            )}
          </div>

          {reasoningVisible && (
            <div className="scimigo-reasoning-container">
              <h4>Reasoning</h4>
              <div ref={reasoningContentRef} className="scimigo-reasoning-content">
                {!reasoning && <div className="scimigo-message-loading">Loading reasoning...</div>}
              </div>
            </div>
          )}

          {usageStats && (
            <div className="scimigo-usage-stats">
              <span>Tokens: {usageStats.total_tokens}</span>
              <span>Time: {usageStats.time_to_first_token.toFixed(2)}s (first) / {usageStats.total_time.toFixed(2)}s (total)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Message; 