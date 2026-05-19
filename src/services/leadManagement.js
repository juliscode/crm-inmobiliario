function normalize(value) {
  return String(value ?? '').trim().toLowerCase()
}

function canEditLead(lead, profile) {
  if (!profile) {
    return false
  }

  return profile.rol === 'admin' || lead.agente_id === profile.id
}

export function createLead(formData, activeProfile, now = new Date().toISOString()) {
  const agentId =
    activeProfile?.rol === 'admin' ? formData.agente_id : activeProfile?.id

  return {
    id: `lead-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    nombre: formData.nombre.trim(),
    telefono: formData.telefono.trim(),
    email: formData.email.trim(),
    operacion: formData.operacion,
    zona_interes: formData.zona_interes.trim(),
    presupuesto: formData.presupuesto.trim(),
    estado: formData.estado,
    prioridad: formData.prioridad,
    agente_id: agentId,
    propiedad_interes: formData.propiedad_interes.trim(),
    proxima_accion: formData.proxima_accion.trim(),
    fecha_proximo_contacto: formData.fecha_proximo_contacto,
    created_at: now,
    updated_at: now,
  }
}

export function filterLeads(leads, filters) {
  const query = normalize(filters.query)

  return leads.filter((lead) => {
    const matchesQuery =
      !query ||
      normalize(lead.nombre).includes(query) ||
      normalize(lead.telefono).includes(query) ||
      normalize(lead.email).includes(query)

    const matchesStatus = !filters.status || lead.estado === filters.status
    const matchesAgent = !filters.agentId || lead.agente_id === filters.agentId

    return matchesQuery && matchesStatus && matchesAgent
  })
}

export function updateLeadStatus(
  leads,
  leadId,
  status,
  activeProfile,
  now = new Date().toISOString(),
) {
  return leads.map((lead) => {
    if (lead.id !== leadId || !canEditLead(lead, activeProfile)) {
      return lead
    }

    return {
      ...lead,
      estado: status,
      updated_at: now,
    }
  })
}
