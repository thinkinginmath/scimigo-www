/**
 * Avatar State Manager
 */
import { settingsManager, Settings } from '../../utils/settingsManager';
import { subscribe as subscribeUIState, UIState } from '../../core/uiStateStore';
import { EVENTS } from '../../core/eventBus';

export enum AvatarStatus {
  IDLE = 'idle',
  DRAGGING = 'dragging',
  PROCESSING = 'processing',
  ERROR = 'error',
  DISABLED = 'disabled'
}

export interface AvatarState {
  element: HTMLElement | null;
  isDragging: boolean;
  position: { top?: number; bottom?: number; left?: number; right?: number; };
  offset: { x: number; y: number; };
  lastHovered: HTMLElement | null;
  extensionIconUrl: string | null;
  mouseDownPosition: { x: number; y: number; } | null;
  dragDistanceThreshold: number;
  dragIntentional: boolean;
  isMainWindow: boolean;
  error: string | null;
  currentState: AvatarStatus;
  isEnabled: boolean;
}

const DEFAULT_STATE: AvatarState = {
  element: null,
  isDragging: false,
  position: { bottom: 20, right: 20 },
  offset: { x: 0, y: 0 },
  lastHovered: null,
  extensionIconUrl: null,
  mouseDownPosition: null,
  dragDistanceThreshold: 10,
  dragIntentional: false,
  isMainWindow: window.self === window.top,
  error: null,
  currentState: AvatarStatus.IDLE,
  isEnabled: true,
};

type StateSubscriber = (state: AvatarState) => void;

class AvatarStateManager {
  private state: AvatarState;
  private subscribers = new Set<StateSubscriber>();
  private isCleaningUp = false;
  private settingsLoaded = false;

  constructor() {
    this.state = { ...DEFAULT_STATE };
  }

  public async initialize(): Promise<void> {
    if (this.settingsLoaded) return;

    if (!settingsManager.isInitialized()) {
      await settingsManager.initialize();
    }

    // Don't load position from settings - always use default
    // This prevents quota errors and ensures consistent behavior

    this.setupUIStateSync();
    this.settingsLoaded = true;
    this.notifySubscribers();
  }
  
  private setupUIStateSync(): void {
    subscribeUIState((uiState: Partial<UIState>) => {
      if (typeof uiState.isEnabled === 'boolean') {
        this.setState({ isEnabled: uiState.isEnabled });
      }
    });
  }

  public subscribe(callback: StateSubscriber): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.state));
  }

  public setState(newState: Partial<AvatarState>): void {
    const oldState = { ...this.state };
    this.state = { ...this.state, ...newState };

    if (newState.currentState && oldState.currentState !== newState.currentState) {
      this.handleStateTransition(oldState.currentState, newState.currentState);
    }

    // Don't save position to avoid quota errors
    // Position is temporary during drag operations

    this.notifySubscribers();
  }

  private handleStateTransition(oldState: AvatarStatus, newState: AvatarStatus): void {
    // Additional logic for state transitions can be added here
  }

  public getState(): AvatarState {
    return this.state;
  }

  public reset(): void {
    this.setState(DEFAULT_STATE);
  }
  
  public getDefaultPosition(): { top?: number; bottom?: number; left?: number; right?: number; } {
    return DEFAULT_STATE.position;
  }

  public setError(error: string | null): void {
    this.setState({ error, currentState: error ? AvatarStatus.ERROR : AvatarStatus.IDLE });
  }

  public cleanup(): void {
    this.isCleaningUp = true;
    this.subscribers.clear();
  }
}

export const avatarStateManager = new AvatarStateManager(); 