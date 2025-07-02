import React, { useState, useRef, useEffect } from 'react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, disabled = false, placeholder = 'Ask a question...' }) => {
  const [message, setMessage] = useState('');
  const [isUserResizing, setIsUserResizing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current && !isUserResizing) {
      // Only auto-resize if user hasn't manually resized
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(200, Math.max(40, textareaRef.current.scrollHeight));
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message, isUserResizing]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Detect when user manually resizes textarea
    const resizeObserver = new ResizeObserver(() => {
      const computedHeight = parseInt(window.getComputedStyle(textarea).height);
      const autoHeight = textarea.scrollHeight;
      
      // If height differs significantly from auto-calculated height, user likely resized
      if (Math.abs(computedHeight - autoHeight) > 5) {
        setIsUserResizing(true);
      }
    });

    resizeObserver.observe(textarea);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      if (message.trim()) {
        handleSendMessage();
      }
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setIsUserResizing(false); // Reset user resizing state
      if (textareaRef.current) {
        textareaRef.current.style.height = '40px';
      }
    }
  };

  return (
    <div className="scimigo-chat-input">
      <textarea
        ref={textareaRef}
        className="scimigo-input-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="Message input"
        rows={1}
      />
      <button
        className="scimigo-send-button"
        onClick={handleSendMessage}
        disabled={!message.trim() || disabled}
        aria-label="Send message"
      >
        →
      </button>
    </div>
  );
};

export default InputArea; 