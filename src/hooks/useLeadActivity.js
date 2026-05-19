import { useMemo, useState } from 'react'

import { initialLeadNotes, initialLeadVisits } from '../data/mockData.js'
import {
  createLeadNote,
  createLeadVisit,
  getVisibleLeadNotes,
  getVisibleLeadVisits,
} from '../services/leadActivity.js'
import { readStorage, storageKeys, writeStorage } from '../services/storage.js'

export function useLeadActivity(activeProfile, leads, selectedLeadId) {
  const [notes, setNotes] = useState(() =>
    readStorage(storageKeys.leadNotes, initialLeadNotes),
  )
  const [visits, setVisits] = useState(() =>
    readStorage(storageKeys.leadVisits, initialLeadVisits),
  )

  const leadNotes = useMemo(
    () => getVisibleLeadNotes(notes, leads, selectedLeadId, activeProfile),
    [notes, leads, selectedLeadId, activeProfile],
  )

  const leadVisits = useMemo(
    () => getVisibleLeadVisits(visits, leads, selectedLeadId, activeProfile),
    [visits, leads, selectedLeadId, activeProfile],
  )

  function persistNotes(nextNotes) {
    setNotes(nextNotes)
    writeStorage(storageKeys.leadNotes, nextNotes)
  }

  function persistVisits(nextVisits) {
    setVisits(nextVisits)
    writeStorage(storageKeys.leadVisits, nextVisits)
  }

  function addNote(formData) {
    const nextNote = createLeadNote(selectedLeadId, formData, activeProfile, leads)

    if (!nextNote) {
      return false
    }

    persistNotes([nextNote, ...notes])
    return true
  }

  function addVisit(formData) {
    const nextVisit = createLeadVisit(selectedLeadId, formData, activeProfile, leads)

    if (!nextVisit) {
      return false
    }

    persistVisits([nextVisit, ...visits])
    return true
  }

  return {
    leadNotes,
    leadVisits,
    addNote,
    addVisit,
  }
}
