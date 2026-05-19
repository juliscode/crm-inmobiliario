const STORAGE_PREFIX = 'crm-inmobiliario-v1'

export const storageKeys = {
  activeProfileId: `${STORAGE_PREFIX}:active-profile-id`,
  leads: `${STORAGE_PREFIX}:leads`,
}

export function readStorage(key, fallbackValue) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallbackValue
  } catch {
    return fallbackValue
  }
}

export function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeStorage(key) {
  window.localStorage.removeItem(key)
}
