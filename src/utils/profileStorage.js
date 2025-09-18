// Local storage helpers strictly for user profile data (separate from auth)

const PROFILE_KEYS = {
  profile: 'userProfile',
};

export function getStoredProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEYS.profile);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setStoredProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEYS.profile, JSON.stringify(profile));
  } catch {}
}

export function updateStoredProfile(partial) {
  try {
    const current = getStoredProfile() || {};
    const updated = { ...current, ...partial };
    setStoredProfile(updated);
    return updated;
  } catch {
    return null;
  }
}

export function clearStoredProfile() {
  try {
    localStorage.removeItem(PROFILE_KEYS.profile);
  } catch {}
}

export function saveProfileImage(dataUrl) {
  return updateStoredProfile({ profileImage: dataUrl });
}

export default {
  getStoredProfile,
  setStoredProfile,
  updateStoredProfile,
  clearStoredProfile,
  saveProfileImage,
};


