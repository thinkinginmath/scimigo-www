import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '@math-agents/ui-components';
import type { Message } from '@math-agents/types';
import { isKatexReady, onKatexReady } from '../../utils/assetLoader';


interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  scrollParentRef: React.RefObject<HTMLDivElement>;
  darkMode?: boolean;
  onTriggerLogin: () => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, scrollParentRef, darkMode = false, onTriggerLogin }) => {
  const [katexReady, setKatexReady] = useState(isKatexReady());
  
  // Listen for KaTeX ready state
  useEffect(() => {
    if (katexReady) return;
    
    const unsubscribe = onKatexReady(() => {
      setKatexReady(true);
    });
    
    return unsubscribe;
  }, [katexReady]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(0);
  const prevIsTypingRef = useRef(isTyping);

  // Handle scrolling when messages change or typing status changes
  useEffect(() => {
    const shouldScrollToBottom = 
      messages.length !== prevMessagesLengthRef.current || 
      isTyping !== prevIsTypingRef.current;
    
    if (shouldScrollToBottom && scrollParentRef?.current) {
      // Use requestAnimationFrame to ensure DOM updates complete first
      requestAnimationFrame(() => {
        if (scrollParentRef.current) {
          scrollParentRef.current.scrollTop = scrollParentRef.current.scrollHeight;
        }
      });
    }
    
    // Update refs for next comparison
    prevMessagesLengthRef.current = messages.length;
    prevIsTypingRef.current = isTyping;
  }, [messages, isTyping, scrollParentRef]);

  // Track mutations to catch LaTeX rendering and other dynamic content changes
  useEffect(() => {
    if (!messagesContainerRef.current || !scrollParentRef.current) return;

    // Create mutation observer for content changes
    const observer = new MutationObserver((mutations) => {
      let shouldScroll = false;
      
      // Check if mutations affect height
      mutations.forEach(mutation => {
        // If nodes were added/removed or attributes changed that might affect layout
        if (
          mutation.type === 'childList' || 
          (mutation.type === 'attributes' && 
           (mutation.attributeName === 'style' || mutation.attributeName === 'class'))
        ) {
          shouldScroll = true;
        }
      });
      
      if (shouldScroll && scrollParentRef.current) {
        requestAnimationFrame(() => {
          if (scrollParentRef.current) {
            scrollParentRef.current.scrollTop = scrollParentRef.current.scrollHeight;
          }
        });
      }
    });

    // Start observing with configuration
    observer.observe(messagesContainerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    // Clean up observer on unmount
    return () => observer.disconnect();
  }, [scrollParentRef]);

  // KaTeX ready state changed - might need to re-render math
  useEffect(() => {
    if (katexReady && scrollParentRef?.current) {
      // KaTeX just became ready, might trigger re-renders - scroll after a delay
      const scrollTimer = setTimeout(() => {
        if (scrollParentRef.current) {
          scrollParentRef.current.scrollTop = scrollParentRef.current.scrollHeight;
        }
      }, 100);
      
      return () => clearTimeout(scrollTimer);
    }
  }, [katexReady, scrollParentRef]);

  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('[MessageList] Failed to copy message:', err);
    }
  };

  return (
    <div className="scimigo-chat-messages" ref={messagesContainerRef}>
      {messages.length === 0 ? (
        <div className="scimigo-chat-empty">
          <p>Ask a question about STEM topics to get started</p>
          {!katexReady && (
            <p className="scimigo-notification">
              <small>Loading math rendering capabilities...</small>
            </p>
          )}
        </div>
      ) : (
        <>
          {messages.map((message, index) => {
            // Find the last AI message
            const lastAIMessageIndex = [...messages].reverse().findIndex(m => m.sender === 'ai');
            const isLatestMessage = lastAIMessageIndex !== -1 && messages.length - 1 - lastAIMessageIndex === index && message.sender === 'ai';

            return (
              <ChatMessage
                key={message.id}
                message={message}
                onCopy={handleCopyMessage}
                showMetadata={true}
              />
            );
          })}

          {isTyping && (
            <div className="scimigo-chat-typing">
              <div className="scimigo-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {/* Element for scroll reference */}
          <div ref={messagesEndRef} className="scimigo-messages-end" style={{ minHeight: '30px' }}></div>
        </>
      )}
    </div>
  );
};

export default MessageList; 