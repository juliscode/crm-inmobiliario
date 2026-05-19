export function getVisibleLeads(leads, profile) {
  if (!profile) {
    return []
  }

  if (profile.rol === 'admin') {
    return leads
  }

  return leads.filter((lead) => lead.agente_id === profile.id)
}
