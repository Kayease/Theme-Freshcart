// Simple localStorage helpers for auth-related persistence

const STORAGE_KEYS = {
  registeredUser: 'registeredUser',
  sessionUser: 'user',
  rememberedEmail: 'rememberedEmail',
};

export function getRegisteredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.registeredUser);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setRegisteredUser(user) {
  try {
    localStorage.setItem(STORAGE_KEYS.registeredUser, JSON.stringify(user));
  } catch {}
}

export function getSessionUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.sessionUser);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setSessionUser(user) {
  try {
    localStorage.setItem(STORAGE_KEYS.sessionUser, JSON.stringify(user));
  } catch {}
}

export function clearSessionUser() {
  try {
    localStorage.removeItem(STORAGE_KEYS.sessionUser);
  } catch {}
}

export function getRememberedEmail() {
  try {
    return localStorage.getItem(STORAGE_KEYS.rememberedEmail) || '';
  } catch {
    return '';
  }
}

export function setRememberedEmail(email) {
  try {
    if (email) localStorage.setItem(STORAGE_KEYS.rememberedEmail, email);
    else localStorage.removeItem(STORAGE_KEYS.rememberedEmail);
  } catch {}
}

export { STORAGE_KEYS };


