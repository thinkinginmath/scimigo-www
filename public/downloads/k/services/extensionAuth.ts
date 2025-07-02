export interface ExtensionAuthData {
  userInfo: any | null;
}

const EXTENSION_AUTH_KEY = 'extensionAuthenticated';
const EXTENSION_USER_KEY = 'extensionUserInfo';

export async function setExtensionAuthenticated(userInfo: any): Promise<void> {
  await chrome.storage.local.set({ [EXTENSION_AUTH_KEY]: true, [EXTENSION_USER_KEY]: userInfo });
}

export async function clearExtensionAuth(): Promise<void> {
  await chrome.storage.local.remove([EXTENSION_AUTH_KEY, EXTENSION_USER_KEY]);
}

export async function isExtensionAuthenticated(): Promise<boolean> {
  const { [EXTENSION_AUTH_KEY]: authenticated } = await chrome.storage.local.get(EXTENSION_AUTH_KEY);
  return authenticated === true;
}

export async function getExtensionAuthData(): Promise<ExtensionAuthData | null> {
  const data = await chrome.storage.local.get([EXTENSION_AUTH_KEY, EXTENSION_USER_KEY]);
  if (data[EXTENSION_AUTH_KEY]) {
    return { userInfo: data[EXTENSION_USER_KEY] || null };
  }
  return null;
}
