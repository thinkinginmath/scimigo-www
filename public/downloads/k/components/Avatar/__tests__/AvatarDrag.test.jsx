import { createAvatar, cleanup } from '../index';
import { avatarState } from '../avatarState';
import { EVENTS } from '../../../core/eventBus';
import eventBus from '../../../core/eventBus';
import { setPrompt, subscribe as subscribeUIState } from '../../../core/uiStateStore';
import * as selectionHandler from '../../../core/selectionHandler';

// Mock the event bus
jest.mock('../../../core/eventBus', () => ({
  __esModule: true,
  default: {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn()
  },
  EVENTS: {
    SHOW_PROMPT_EDITOR: 'show:prompt:editor',
    ASK_AI: 'ask:ai'
  }
}));

// Mock the selection handler
jest.mock('../../../core/selectionHandler', () => ({
  initialize: jest.fn(),
  cleanup: jest.fn(),
  processSelection: jest.fn().mockResolvedValue({
    content: 'Selected text content',
    element: null, // We'll set this in the test
    position: { x: 100, y: 100 }
  })
}));

// Mock uiStateStore
jest.mock('../../../core/uiStateStore', () => ({
  setPrompt: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn()
}));

describe('Avatar Drag and Drop Functionality', () => {
  let avatar;
  let mockElement;

  beforeEach(async () => {
    // Reset document body and add test elements
    document.body.innerHTML = '<div id="root"></div>';
    mockElement = document.createElement('div');
    mockElement.textContent = 'Test content';
    mockElement.setAttribute('data-testid', 'target-element');
    document.body.appendChild(mockElement);
    
    // Mock document.elementsFromPoint
    document.elementsFromPoint = jest.fn().mockImplementation((x, y) => {
      // Return the mock element when the coordinates match our test case
      if (x === 150 && y === 150) {
        return [mockElement];
      }
      return [];
    });
    
    // Reset avatar state
    avatarState.reset();
    
    // Create avatar for testing
    avatar = await createAvatar({
      iconUrl: 'test-icon.png',
      position: { bottom: 20, right: 20 }
    });

    // Enable the avatar
    avatarState.setState({ isEnabled: true });

    // Reset mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    // Clean up the mock
    delete document.elementsFromPoint;
  });

  test('dispatches SHOW_PROMPT_EDITOR event on successful drag', async () => {
    // Mock the selection handler's processSelection to return our mock element
    selectionHandler.processSelection.mockResolvedValueOnce({
      content: 'Selected text content',
      element: mockElement,
      position: { x: 150, y: 150 }
    });

    // Ensure avatar is enabled
    expect(avatarState.getState().isEnabled).toBe(true);

    // Simulate drag start
    const dragStartEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 100,
      clientY: 100,
      cancelable: true
    });
    avatar.dispatchEvent(dragStartEvent);

    // Verify drag state was set
    expect(avatarState.getState().isDragging).toBe(true);

    // Simulate drag movement to make it intentional
    const dragMoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      clientX: 150,
      clientY: 150,
      cancelable: true
    });
    document.dispatchEvent(dragMoveEvent);

    // Verify drag was made intentional
    expect(avatarState.getState().dragIntentional).toBe(true);

    // Simulate drag over target element
    const dragOverEvent = new MouseEvent('dragover', {
      bubbles: true,
      clientX: 150,
      clientY: 150,
      cancelable: true
    });
    mockElement.dispatchEvent(dragOverEvent);

    // Simulate drop
    const dropEvent = new MouseEvent('drop', {
      bubbles: true,
      clientX: 150,
      clientY: 150,
      cancelable: true
    });
    mockElement.dispatchEvent(dropEvent);

    // Simulate drag end
    const dragEndEvent = new MouseEvent('mouseup', {
      bubbles: true,
      clientX: 150,
      clientY: 150,
      cancelable: true
    });
    document.dispatchEvent(dragEndEvent);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify uiStateStore.setPrompt was called with correct payload
    expect(setPrompt).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Selected text content',
        element: mockElement,
        position: { x: 150, y: 150 }
      })
    );
  });

  test('handles drag cancellation correctly', () => {
    // Ensure avatar is enabled
    expect(avatarState.getState().isEnabled).toBe(true);

    // Simulate drag start
    const dragStartEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 100,
      clientY: 100,
      cancelable: true
    });
    avatar.dispatchEvent(dragStartEvent);

    // Verify drag state was set
    expect(avatarState.getState().isDragging).toBe(true);

    // Simulate drag cancel (e.g., by pressing Escape)
    const keyEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(keyEvent);

    // Simulate drag end to clean up
    const dragEndEvent = new MouseEvent('mouseup', {
      bubbles: true,
      clientX: 100,
      clientY: 100,
      cancelable: true
    });
    document.dispatchEvent(dragEndEvent);

    // Verify drag state was cleared
    expect(avatarState.getState().isDragging).toBe(false);

    // Verify no events were dispatched
    expect(eventBus.dispatch).not.toHaveBeenCalled();
    expect(setPrompt).not.toHaveBeenCalled();
  });

  test('handles invalid drag targets', async () => {
    // Ensure avatar is enabled
    expect(avatarState.getState().isEnabled).toBe(true);

    // Create an invalid target (e.g., another avatar)
    const invalidTarget = document.createElement('div');
    invalidTarget.setAttribute('data-scimigo-component', 'true');
    document.body.appendChild(invalidTarget);

    // Update elementsFromPoint mock to return the invalid target
    document.elementsFromPoint.mockImplementation((x, y) => {
      if (x === 150 && y === 150) {
        return [invalidTarget];
      }
      return [];
    });

    // Simulate drag start
    const dragStartEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 100,
      clientY: 100,
      cancelable: true
    });
    avatar.dispatchEvent(dragStartEvent);

    // Verify drag state was set
    expect(avatarState.getState().isDragging).toBe(true);

    // Simulate drag movement to make it intentional
    const dragMoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      clientX: 150,
      clientY: 150,
      cancelable: true
    });
    document.dispatchEvent(dragMoveEvent);

    // Verify drag was made intentional
    expect(avatarState.getState().dragIntentional).toBe(true);

    // Simulate drag over invalid target
    const dragOverEvent = new MouseEvent('dragover', {
      bubbles: true,
      clientX: 150,
      clientY: 150,
      cancelable: true
    });
    invalidTarget.dispatchEvent(dragOverEvent);

    // Simulate drop on invalid target
    const dropEvent = new MouseEvent('drop', {
      bubbles: true,
      clientX: 150,
      clientY: 150,
      cancelable: true
    });
    invalidTarget.dispatchEvent(dropEvent);

    // Simulate drag end
    const dragEndEvent = new MouseEvent('mouseup', {
      bubbles: true,
      clientX: 150,
      clientY: 150,
      cancelable: true
    });
    document.dispatchEvent(dragEndEvent);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify drag state was cleared
    expect(avatarState.getState().isDragging).toBe(false);

    // Verify no events were dispatched
    expect(eventBus.dispatch).not.toHaveBeenCalled();
    expect(setPrompt).not.toHaveBeenCalled();
  });
}); 