import { leadStatuses, profiles } from '../data/mockData.js'

const agentNames = new Map(profiles.map((profile) => [profile.id, profile.nombre]))

export function LeadList({ leads, activeProfile, onChangeLeadStatus }) {
  const isAdmin = activeProfile.rol === 'admin'

  return (
    <section className="lead-panel" aria-labelledby="leads-title">
      <div className="panel-header">
        <div>
          <h2 id="leads-title">Leads</h2>
          <p>
            {isAdmin
              ? 'Vista general de todos los agentes.'
              : 'Vista limitada a tus leads asignados.'}
          </p>
        </div>
        <span className="lead-count">{leads.length} leads</span>
      </div>

      {leads.length > 0 ? (
        <div className="lead-list">
          {leads.map((lead) => (
            <article className="lead-row" key={lead.id}>
              <div className="lead-main">
                <div>
                  <h3>{lead.nombre}</h3>
                  <p>{lead.telefono}</p>
                  {lead.email ? <p>{lead.email}</p> : null}
                </div>
                <span
                  className={`priority priority-${lead.prioridad.toLowerCase()}`}
                >
                  {lead.prioridad}
                </span>
              </div>

              <dl className="lead-meta">
                <div>
                  <dt>Estado</dt>
                  <dd>
                    <select
                      aria-label={`Cambiar estado de ${lead.nombre}`}
                      className="status-select"
                      onChange={(event) =>
                        onChangeLeadStatus(lead.id, event.target.value)
                      }
                      value={lead.estado}
                    >
                      {leadStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </dd>
                </div>
                <div>
                  <dt>Operación</dt>
                  <dd>{lead.operacion}</dd>
                </div>
                <div>
                  <dt>Zona</dt>
                  <dd>{lead.zona_interes}</dd>
                </div>
                <div>
                  <dt>Agente</dt>
                  <dd>{agentNames.get(lead.agente_id)}</dd>
                </div>
              </dl>

              <div className="lead-next-action">
                <strong>Próxima acción</strong>
                <span>{lead.proxima_accion}</span>
                <time dateTime={lead.fecha_proximo_contacto}>
                  {lead.fecha_proximo_contacto}
                </time>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          No hay leads que coincidan con los filtros actuales.
        </div>
      )}
    </section>
  )
}
