import React from 'react';
import { UnifiedRenderer, EXTENSION_PRESET } from '@math-agents/math-renderer';

interface MathRendererProps {
  content: string;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className }) => {
  return (
    <UnifiedRenderer
      content={content}
      className={`math-renderer ${className || ''}`}
      {...EXTENSION_PRESET}
      onError={(error, context) => {
        console.warn(`[Extension] Math rendering error in ${context}:`, error);
      }}
    />
  );
};
