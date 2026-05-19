import { useMemo, useState } from 'react'

import { LeadFormModal } from '../components/LeadFormModal.jsx'
import { LeadList } from '../components/LeadList.jsx'
import { leadStatuses, profiles } from '../data/mockData.js'

const agents = profiles.filter((profile) => profile.rol === 'agente')

export function Dashboard({
  activeProfile,
  visibleLeads,
  totalLeads,
  getFilteredLeads,
  onCreateLead,
  onChangeLeadStatus,
  onResetLeads,
}) {
  const isAdmin = activeProfile.rol === 'admin'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    query: '',
    status: '',
    agentId: '',
  })

  const filteredLeads = useMemo(
    () => getFilteredLeads(filters),
    [filters, getFilteredLeads],
  )

  function updateFilter(event) {
    const { name, value } = event.target
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }))
  }

  return (
    <main className="dashboard">
      <section className="dashboard-hero">
        <div>
          <p className="section-label">Primera etapa funcional</p>
          <h2>
            {isAdmin
              ? 'Supervisión inicial de todos los leads'
              : 'Tu tablero de seguimiento diario'}
          </h2>
          <p>
            Esta versión local valida perfiles, permisos simulados y lectura de
            leads mockeados antes de conectar Supabase.
          </p>
        </div>

        <div className="summary-grid" aria-label="Resumen">
          <div>
            <span>{visibleLeads.length}</span>
            <strong>Visibles</strong>
          </div>
          <div>
            <span>{totalLeads}</span>
            <strong>Total demo</strong>
          </div>
        </div>
      </section>

      <div className="toolbar">
        <p>
          {isAdmin
            ? 'Como Admin, estás viendo todos los leads mockeados.'
            : 'Como Agente, solo ves los leads asignados a tu perfil.'}
        </p>
        <div className="toolbar-actions">
          <button className="secondary-button" type="button" onClick={onResetLeads}>
            Restaurar datos demo
          </button>
          <button
            className="primary-button"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Nuevo lead
          </button>
        </div>
      </div>

      <section className="filters-panel" aria-label="Filtros de leads">
        <label>
          Buscar
          <input
            name="query"
            onChange={updateFilter}
            placeholder="Nombre, teléfono o email"
            type="search"
            value={filters.query}
          />
        </label>

        <label>
          Estado
          <select name="status" onChange={updateFilter} value={filters.status}>
            <option value="">Todos los estados</option>
            {leadStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        {isAdmin ? (
          <label>
            Agente
            <select name="agentId" onChange={updateFilter} value={filters.agentId}>
              <option value="">Todos los agentes</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.nombre}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </section>

      <LeadList
        activeProfile={activeProfile}
        leads={filteredLeads}
        onChangeLeadStatus={onChangeLeadStatus}
      />

      {isModalOpen ? (
        <LeadFormModal
          activeProfile={activeProfile}
          onClose={() => setIsModalOpen(false)}
          onCreateLead={onCreateLead}
        />
      ) : null}
    </main>
  )
}
