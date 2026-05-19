function canAccessLead(leads, leadId, profile) {
  if (!profile) {
    return false
  }

  const lead = leads.find((currentLead) => currentLead.id === leadId)

  if (!lead) {
    return false
  }

  return profile.rol === 'admin' || lead.agente_id === profile.id
}

function sortNewestFirst(items) {
  return [...items].sort(
    (first, second) => new Date(second.created_at) - new Date(first.created_at),
  )
}

function createActivityId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function getVisibleLeadNotes(notes, leads, leadId, activeProfile) {
  if (!canAccessLead(leads, leadId, activeProfile)) {
    return []
  }

  return sortNewestFirst(notes.filter((note) => note.lead_id === leadId))
}

export function getVisibleLeadVisits(visits, leads, leadId, activeProfile) {
  if (!canAccessLead(leads, leadId, activeProfile)) {
    return []
  }

  return sortNewestFirst(visits.filter((visit) => visit.lead_id === leadId))
}

export function createLeadNote(
  leadId,
  formData,
  activeProfile,
  leads,
  now = new Date().toISOString(),
) {
  if (!canAccessLead(leads, leadId, activeProfile)) {
    return null
  }

  return {
    id: createActivityId('note'),
    lead_id: leadId,
    agente_id: activeProfile.id,
    nota: formData.nota.trim(),
    created_at: now,
  }
}

export function createLeadVisit(
  leadId,
  formData,
  activeProfile,
  leads,
  now = new Date().toISOString(),
) {
  if (!canAccessLead(leads, leadId, activeProfile)) {
    return null
  }

  return {
    id: createActivityId('visit'),
    lead_id: leadId,
    agente_id: activeProfile.id,
    propiedad: formData.propiedad.trim(),
    fecha_visita: formData.fecha_visita,
    resultado: formData.resultado.trim(),
    observaciones: formData.observaciones.trim(),
    created_at: now,
  }
}
