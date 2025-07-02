// Mock the PDF handler before importing Avatar
jest.mock('../pdfHandler', () => ({
  pdfHandler: {
    initialize: jest.fn().mockReturnValue(true),
    getState: jest.fn().mockReturnValue({ isPdf: true }),
    cleanup: jest.fn()
  }
}));

import { createAvatar, cleanup } from '../index';
import { avatarState } from '../avatarState';

describe('Avatar Component', () => {
  beforeEach(() => {
    // Reset document body before each test
    document.body.innerHTML = '<div id="root"></div>';
    // Reset avatar state
    avatarState.reset();
  });

  afterEach(() => {
    cleanup();
  });

  test('creates avatar element with correct properties', async () => {
    const options = {
      iconUrl: 'test-icon.png',
      position: { bottom: 20, right: 20 }
    };

    const avatar = await createAvatar(options);
    
    expect(avatar).not.toBeNull();
    expect(avatar.id).toBe('scimigo-avatar');
    expect(avatar.getAttribute('data-scimigo-component')).toBe('true');
    expect(avatar.style.position).toBe('fixed');
    expect(avatar.style.bottom).toBe('20px');
    expect(avatar.style.right).toBe('20px');
  });

  test('does not create duplicate avatars', async () => {
    const options = {
      iconUrl: 'test-icon.png',
      position: { bottom: 20, right: 20 }
    };

    const avatar1 = await createAvatar(options);
    const avatar2 = await createAvatar(options);

    expect(avatar1).toBe(avatar2);
    expect(document.querySelectorAll('#scimigo-avatar').length).toBe(1);
  });

  test('handles cleanup correctly', async () => {
    const avatar = await createAvatar();
    expect(document.querySelector('#scimigo-avatar')).not.toBeNull();

    cleanup();
    expect(document.querySelector('#scimigo-avatar')).toBeNull();
  });

  test('sets correct title based on PDF mode', async () => {
    const avatar = await createAvatar();
    expect(avatar.getAttribute('title')).toBe('Click to select text from this PDF');
  });
}); 