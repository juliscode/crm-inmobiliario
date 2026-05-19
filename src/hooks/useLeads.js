import { useMemo, useState } from 'react'

import { initialLeads } from '../data/mockData.js'
import {
  createLead,
  filterLeads,
  updateLeadStatus,
} from '../services/leadManagement.js'
import { getVisibleLeads } from '../services/leadVisibility.js'
import { readStorage, storageKeys, writeStorage } from '../services/storage.js'

export function useLeads(activeProfile) {
  const [leads, setLeads] = useState(() =>
    readStorage(storageKeys.leads, initialLeads),
  )

  const visibleLeads = useMemo(() => getVisibleLeads(leads, activeProfile), [
    leads,
    activeProfile,
  ])

  function persistLeads(nextLeads) {
    setLeads(nextLeads)
    writeStorage(storageKeys.leads, nextLeads)
  }

  function getFilteredLeads(filters) {
    return filterLeads(visibleLeads, filters)
  }

  function addLead(formData) {
    const nextLead = createLead(formData, activeProfile)
    persistLeads([nextLead, ...leads])
  }

  function changeLeadStatus(leadId, status) {
    persistLeads(updateLeadStatus(leads, leadId, status, activeProfile))
  }

  function resetLeads() {
    persistLeads(initialLeads)
  }

  return {
    leads,
    visibleLeads,
    getFilteredLeads,
    addLead,
    changeLeadStatus,
    resetLeads,
  }
}
