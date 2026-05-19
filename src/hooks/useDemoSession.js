import { useEffect, useMemo, useState } from 'react'

import { profiles } from '../data/mockData.js'
import {
  readStorage,
  removeStorage,
  storageKeys,
  writeStorage,
} from '../services/storage.js'

export function useDemoSession() {
  const [activeProfileId, setActiveProfileId] = useState(() =>
    readStorage(storageKeys.activeProfileId, null),
  )

  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId) ?? null,
    [activeProfileId],
  )

  useEffect(() => {
    if (activeProfileId) {
      writeStorage(storageKeys.activeProfileId, activeProfileId)
    }
  }, [activeProfileId])

  return {
    profiles,
    activeProfile,
    selectProfile: setActiveProfileId,
    clearProfile: () => {
      removeStorage(storageKeys.activeProfileId)
      setActiveProfileId(null)
    },
  }
}
