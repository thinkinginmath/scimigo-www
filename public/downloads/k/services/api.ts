import type { SolveMode } from '@math-agents/types';
import eventBus, { EVENTS } from '../core/eventBus';

interface StreamCallbacks {
  start?: (data: { model: string; conversationId?: string }) => void;
  delta?: (data: { content: string }) => void;
  plot?: (data: { plot_data: any }) => void;
  error?: (data: { error: string }) => void;
  end?: (data: { usage?: { total_tokens: number }; error?: string; metadata?: any }) => void;
}

interface SolveOptions {
  mode?: SolveMode;
  sessionContext?: any;
  history?: any[];
  conversationId?: string | null;
}

export class ChromeExtensionApiClient {
  solveStream(
    message: string,
    callbacks: StreamCallbacks,
    onError: (error: Error) => void,
    options: SolveOptions = {}
  ) {
    // Generate a unique request ID
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    let hasStarted = false;
    let messageSubscription: string | null = null;
    let errorSubscription: string | null = null;

    // Set up cleanup function
    const cleanup = () => {
      if (messageSubscription) eventBus.unsubscribe(messageSubscription);
      if (errorSubscription) eventBus.unsubscribe(errorSubscription);
    };

    // Set up EventBus listeners BEFORE sending the request to avoid race conditions
    const messageHandler = (payload: any) => {
      //console.log('[API Client] EventBus messageHandler called with:', payload);
      //console.log('[API Client] Expected requestId:', requestId, 'Received responseId:', payload.responseId);
      
      if (!payload || (payload.responseId && payload.responseId !== requestId)) {
        //console.log('[API Client] Ignoring message - responseId mismatch or no payload');
        return;
      }

      if (payload.conversationId && callbacks.start) {
        callbacks.start({ model: 'auto', conversationId: payload.conversationId });
      }

      if (callbacks.delta && payload.content) {
        //console.log('[API Client] Calling delta callback with content:', payload.content);
        callbacks.delta({ content: payload.content });
      }
      if (payload.isComplete && callbacks.end) {
        //console.log('[API Client] Calling end callback');
        callbacks.end({
          usage: payload.usageStats ? { total_tokens: payload.usageStats.total_tokens } : undefined
        });
      }
    };

    const errorHandler = (payload: any) => {
      // console.log('[API Client] EventBus errorHandler called with:', payload);
      
      if (!payload || (payload.responseId && payload.responseId !== requestId)) {
        //console.log('[API Client] Ignoring error - responseId mismatch or no payload');
        return;
      }
      
      // Check if this is a rate limit error (429)
      if (payload.status === 429 || payload.error?.status === 429) {
        // console.log('[API Client] Rate limit error detected, showing modal');
        // Rate limit modal will be shown by content script handler
        if (callbacks.error) {
          callbacks.error({ error: payload.message || 'Rate limit exceeded' });
        }
        if (callbacks.end) {
          callbacks.end({ error: payload.message || 'Rate limit exceeded' });
        }
        return;
      }
      
      if (callbacks.error) {
        // console.log('[API Client] Calling error callback');
        callbacks.error({ error: payload.error?.message || 'Stream error occurred' });
      }
      if (callbacks.end) {
        // console.log('[API Client] Calling end callback from error');
        callbacks.end({ error: payload.error?.message || 'Stream error occurred' });
      }
    };

    // Subscribe to EventBus events BEFORE sending the request
    console.log('[API Client] Subscribing to EventBus events for requestId:', requestId);
    messageSubscription = eventBus.subscribe(EVENTS.AI_MESSAGE, messageHandler);
    errorSubscription = eventBus.subscribe(EVENTS.STREAM_ERROR, errorHandler);
    console.log('[API Client] EventBus subscriptions created:', { messageSubscription, errorSubscription });

    // Send message to background script using the existing chrome extension pattern
    const sendRequest = async () => {
      try {
        // console.log('[API Client] Starting request with message:', message);
        // console.log('[API Client] Options:', options);
        
        if (callbacks.start) {
          callbacks.start({ model: 'auto' });
          hasStarted = true;
        }

        // Use the existing chrome.runtime messaging system
        const messagePayload = {
          type: 'ASK_AI',
          question: message,
          isInitialPrompt: false,
          requestId: requestId,
          mode: options.mode || 'solve',
          history: options.history || [],
          conversationId: options.conversationId || null,
        };
        
        // console.log('[API Client] Sending chrome.runtime.sendMessage:', messagePayload);
        
        const response = await chrome.runtime.sendMessage(messagePayload);
        
        // console.log('[API Client] Received response:', response);

        if (!response || !response.responseId) {
          throw new Error('No response ID received from background script');
        }

        return cleanup;

      } catch (error) {
        console.error('[API Client] Error sending request:', error);
        onError(error as Error);
        return cleanup;
      }
    };

    // Start the request
    sendRequest();

    return cleanup;
  }
}

export const apiClient = new ChromeExtensionApiClient();