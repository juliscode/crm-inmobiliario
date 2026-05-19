import { useMemo, useState } from 'react'

import { leadStatuses, operationTypes, priorities, profiles } from '../data/mockData.js'

const agents = profiles.filter((profile) => profile.rol === 'agente')
const agentNames = new Map(profiles.map((profile) => [profile.id, profile.nombre]))

function toForm(lead) {
  return {
    nombre: lead.nombre,
    telefono: lead.telefono,
    email: lead.email,
    operacion: lead.operacion,
    zona_interes: lead.zona_interes,
    presupuesto: lead.presupuesto,
    estado: lead.estado,
    prioridad: lead.prioridad,
    agente_id: lead.agente_id,
    propiedad_interes: lead.propiedad_interes,
    proxima_accion: lead.proxima_accion,
    fecha_proximo_contacto: lead.fecha_proximo_contacto,
  }
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

const initialNoteForm = {
  nota: '',
}

const initialVisitForm = {
  propiedad: '',
  fecha_visita: '',
  resultado: '',
  observaciones: '',
}

export function LeadDetail({
  activeProfile,
  lead,
  leadNotes,
  leadVisits,
  onAddNote,
  onAddVisit,
  onBack,
  onSaveLead,
}) {
  const [form, setForm] = useState(() => toForm(lead))
  const [noteForm, setNoteForm] = useState(initialNoteForm)
  const [visitForm, setVisitForm] = useState(initialVisitForm)
  const [savedMessage, setSavedMessage] = useState('')
  const [activityMessage, setActivityMessage] = useState('')
  const isAdmin = activeProfile.rol === 'admin'

  const detailItems = useMemo(
    () => [
      ['Teléfono', lead.telefono || 'Sin teléfono'],
      ['Email', lead.email || 'Sin email'],
      ['Operación', lead.operacion],
      ['Zona de interés', lead.zona_interes],
      ['Presupuesto', lead.presupuesto],
      ['Estado', lead.estado],
      ['Prioridad', lead.prioridad],
      ['Agente asignado', agentNames.get(lead.agente_id)],
      ['Propiedad de interés', lead.propiedad_interes],
      ['Próxima acción', lead.proxima_accion],
      ['Fecha de próximo contacto', lead.fecha_proximo_contacto],
      ['Creado', formatDateTime(lead.created_at)],
      ['Actualizado', formatDateTime(lead.updated_at)],
    ],
    [lead],
  )

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function updateNoteField(event) {
    const { name, value } = event.target
    setNoteForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function updateVisitField(event) {
    const { name, value } = event.target
    setVisitForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSaveLead(lead.id, form)
    setSavedMessage('Cambios guardados en esta sesión local.')
  }

  function handleNoteSubmit(event) {
    event.preventDefault()
    const wasCreated = onAddNote(noteForm)

    if (!wasCreated) {
      setActivityMessage('No tenés permiso para agregar esta nota.')
      return
    }

    setNoteForm(initialNoteForm)
    setActivityMessage('Nota agregada al historial.')
  }

  function handleVisitSubmit(event) {
    event.preventDefault()
    const wasCreated = onAddVisit(visitForm)

    if (!wasCreated) {
      setActivityMessage('No tenés permiso para registrar esta visita.')
      return
    }

    setVisitForm(initialVisitForm)
    setActivityMessage('Visita registrada en el historial.')
  }

  return (
    <main className="lead-detail">
      <button className="ghost-button back-button" type="button" onClick={onBack}>
        Volver al dashboard
      </button>

      <section className="detail-hero">
        <div>
          <p className="section-label">Ficha del lead</p>
          <h2>{lead.nombre}</h2>
          <p>
            Vista completa del cliente, sus datos comerciales y la próxima
            acción de seguimiento.
          </p>
        </div>
        <span className={`priority priority-${lead.prioridad.toLowerCase()}`}>
          {lead.prioridad}
        </span>
      </section>

      <dl className="detail-grid" aria-label="Datos actuales del lead">
        {detailItems.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <section className="edit-panel" aria-labelledby="edit-lead-title">
        <div className="panel-header">
          <div>
            <h2 id="edit-lead-title">Editar datos principales</h2>
            <p>
              Los cambios se guardan en localStorage hasta que conectemos la
              base real.
            </p>
          </div>
          {savedMessage ? <span className="save-message">{savedMessage}</span> : null}
        </div>

        <form className="lead-form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input
              name="nombre"
              onChange={updateField}
              required
              type="text"
              value={form.nombre}
            />
          </label>

          <label>
            Teléfono
            <input
              name="telefono"
              onChange={updateField}
              required
              type="tel"
              value={form.telefono}
            />
          </label>

          <label>
            Email
            <input
              name="email"
              onChange={updateField}
              type="email"
              value={form.email}
            />
          </label>

          <label>
            Operación
            <select name="operacion" onChange={updateField} value={form.operacion}>
              {operationTypes.map((operation) => (
                <option key={operation} value={operation}>
                  {operation}
                </option>
              ))}
            </select>
          </label>

          <label>
            Zona de interés
            <input
              name="zona_interes"
              onChange={updateField}
              required
              type="text"
              value={form.zona_interes}
            />
          </label>

          <label>
            Presupuesto
            <input
              name="presupuesto"
              onChange={updateField}
              required
              type="text"
              value={form.presupuesto}
            />
          </label>

          <label>
            Estado
            <select name="estado" onChange={updateField} value={form.estado}>
              {leadStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label>
            Prioridad
            <select name="prioridad" onChange={updateField} value={form.prioridad}>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>

          <label>
            Agente asignado
            <select
              disabled={!isAdmin}
              name="agente_id"
              onChange={updateField}
              value={form.agente_id}
            >
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.nombre}
                </option>
              ))}
            </select>
          </label>

          <label>
            Propiedad de interés
            <input
              name="propiedad_interes"
              onChange={updateField}
              required
              type="text"
              value={form.propiedad_interes}
            />
          </label>

          <label>
            Próxima acción
            <input
              name="proxima_accion"
              onChange={updateField}
              required
              type="text"
              value={form.proxima_accion}
            />
          </label>

          <label>
            Fecha de próximo contacto
            <input
              name="fecha_proximo_contacto"
              onChange={updateField}
              required
              type="date"
              value={form.fecha_proximo_contacto}
            />
          </label>

          <div className="modal-actions">
            <button className="primary-button" type="submit">
              Guardar cambios
            </button>
          </div>
        </form>
      </section>

      <section className="activity-grid" aria-label="Seguimiento del lead">
        <div className="activity-panel">
          <div className="panel-header">
            <div>
              <h2>Notas</h2>
              <p>Historial de seguimiento cargado por el equipo.</p>
            </div>
          </div>

          <form className="activity-form" onSubmit={handleNoteSubmit}>
            <label>
              Nueva nota
              <textarea
                name="nota"
                onChange={updateNoteField}
                required
                rows="4"
                value={noteForm.nota}
              />
            </label>
            <button className="primary-button" type="submit">
              Agregar nota
            </button>
          </form>

          <div className="activity-list">
            {leadNotes.length === 0 ? (
              <p className="empty-state">Todavía no hay notas para este lead.</p>
            ) : (
              leadNotes.map((note) => (
                <article className="activity-item" key={note.id}>
                  <p>{note.nota}</p>
                  <footer>
                    <span>{agentNames.get(note.agente_id) ?? 'Admin'}</span>
                    <time dateTime={note.created_at}>
                      {formatDateTime(note.created_at)}
                    </time>
                  </footer>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="activity-panel">
          <div className="panel-header">
            <div>
              <h2>Visitas</h2>
              <p>Registro de visitas realizadas o coordinadas.</p>
            </div>
          </div>

          <form className="activity-form" onSubmit={handleVisitSubmit}>
            <label>
              Propiedad
              <input
                name="propiedad"
                onChange={updateVisitField}
                required
                type="text"
                value={visitForm.propiedad}
              />
            </label>

            <label>
              Fecha de visita
              <input
                name="fecha_visita"
                onChange={updateVisitField}
                required
                type="date"
                value={visitForm.fecha_visita}
              />
            </label>

            <label>
              Resultado
              <input
                name="resultado"
                onChange={updateVisitField}
                required
                type="text"
                value={visitForm.resultado}
              />
            </label>

            <label>
              Observaciones
              <textarea
                name="observaciones"
                onChange={updateVisitField}
                required
                rows="3"
                value={visitForm.observaciones}
              />
            </label>

            <button className="primary-button" type="submit">
              Registrar visita
            </button>
          </form>

          <div className="activity-list">
            {leadVisits.length === 0 ? (
              <p className="empty-state">Todavía no hay visitas para este lead.</p>
            ) : (
              leadVisits.map((visit) => (
                <article className="activity-item" key={visit.id}>
                  <div className="activity-item-header">
                    <strong>{visit.propiedad}</strong>
                    <span>{visit.resultado}</span>
                  </div>
                  <p>{visit.observaciones}</p>
                  <footer>
                    <span>{agentNames.get(visit.agente_id) ?? 'Admin'}</span>
                    <time dateTime={visit.fecha_visita}>{visit.fecha_visita}</time>
                  </footer>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {activityMessage ? (
        <p className="activity-message" role="status">
          {activityMessage}
        </p>
      ) : null}
    </main>
  )
}
