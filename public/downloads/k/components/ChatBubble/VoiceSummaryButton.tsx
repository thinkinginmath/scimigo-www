import React, { useState, useEffect, useCallback } from 'react';
import { speak, stop, pause, resume, isSpeechSynthesisAvailable } from '../../utils/textToSpeech';

interface VoiceSummaryButtonProps {
  responseId: string;
  isLatestMessage?: boolean;
  darkMode?: boolean;
  isGeneratingSummary?: boolean;
  onSummaryGenerationStart?: () => void;
  onSummaryGenerationEnd?: () => void;
}

const VoiceSummaryButton: React.FC<VoiceSummaryButtonProps> = ({ 
  responseId,
  isLatestMessage = false,
  darkMode = false,
  isGeneratingSummary = false,
  onSummaryGenerationStart = () => {},
  onSummaryGenerationEnd = () => {}
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTtsAvailable, setIsTtsAvailable] = useState(false);
  const [isGenerating, setIsGenerating] = useState(isGeneratingSummary);
  const [summaryText, setSummaryText] = useState('');
  const [hasGeneratedSummary, setHasGeneratedSummary] = useState(false);

  useEffect(() => {
    setIsTtsAvailable(isSpeechSynthesisAvailable());
  }, []);

  useEffect(() => {
    if (!isLatestMessage && isSpeaking) {
      stop();
      setIsSpeaking(false);
      setIsPaused(false);
    }
    return () => {
      if (isSpeaking) stop();
    };
  }, [isLatestMessage, isSpeaking]);

  const speakText = useCallback((text: string) => {
    const utterance = speak(text, {
      onEnd: () => {
        setIsSpeaking(false);
        setIsPaused(false);
      },
      onError: (e: SpeechSynthesisErrorEvent) => {
        console.error('Error synthesizing speech:', e);
        setIsSpeaking(false);
        setIsPaused(false);
      },
    });

    if (utterance) {
      setIsSpeaking(true);
      setIsPaused(false);
    }
  }, []);

  const handleSpeak = useCallback(async () => {
    if (!isLatestMessage) return;

    if (isSpeaking) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
      setIsPaused(!isPaused);
      return;
    }

    if (hasGeneratedSummary) {
      speakText(summaryText);
      return;
    }

    try {
      setIsGenerating(true);
      if(onSummaryGenerationStart) onSummaryGenerationStart();
      const response = await chrome.runtime.sendMessage({
        type: 'ASK_VOICE_SUMMARY',
        responseId
      });

      if (!response || response.error) {
        throw new Error(response?.error || 'Failed to generate summary');
      }

      setSummaryText(response.summary);
      setHasGeneratedSummary(true);
      speakText(response.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setIsGenerating(false);
      if(onSummaryGenerationEnd) onSummaryGenerationEnd();
    }
  }, [isLatestMessage, isSpeaking, isPaused, hasGeneratedSummary, summaryText, responseId, onSummaryGenerationStart, onSummaryGenerationEnd, speakText]);

  const handleStop = useCallback(() => {
    stop();
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  if (!isTtsAvailable || !isLatestMessage) return null;

  const getButtonIcon = () => {
    if (isGenerating) return '⏳';
    if (isPaused) return '▶️';
    if (isSpeaking) return '⏸️';
    return '🔊';
  };

  return (
    <div className="scimigo-voice-controls">
      <button
        className={`scimigo-voice-btn ${isSpeaking ? 'speaking' : ''}`}
        onClick={handleSpeak}
        disabled={isGenerating}
        title={isGenerating ? 'Getting summary...' : 'Listen to summary'}
      >
        {getButtonIcon()}
      </button>
      
      {isSpeaking && (
        <button
          className="scimigo-voice-stop-btn"
          onClick={handleStop}
          title="Stop speaking"
        >
          ⏹️
        </button>
      )}
    </div>
  );
};

export default VoiceSummaryButton; 