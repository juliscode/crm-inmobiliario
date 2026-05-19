import { useMemo, useState } from 'react'

import { leadStatuses, operationTypes, priorities, profiles } from '../data/mockData.js'

const agents = profiles.filter((profile) => profile.rol === 'agente')

function getInitialForm(activeProfile) {
  return {
    nombre: '',
    telefono: '',
    email: '',
    operacion: operationTypes[0],
    zona_interes: '',
    presupuesto: '',
    estado: leadStatuses[0],
    prioridad: priorities[1],
    agente_id: activeProfile.rol === 'admin' ? agents[0].id : activeProfile.id,
    propiedad_interes: '',
    proxima_accion: '',
    fecha_proximo_contacto: '',
  }
}

export function LeadFormModal({ activeProfile, onClose, onCreateLead }) {
  const initialForm = useMemo(() => getInitialForm(activeProfile), [activeProfile])
  const [form, setForm] = useState(initialForm)

  const isAdmin = activeProfile.rol === 'admin'

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onCreateLead(form)
    onClose()
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        aria-labelledby="new-lead-title"
        aria-modal="true"
        className="modal"
        role="dialog"
      >
        <div className="modal-header">
          <div>
            <p className="section-label">Nuevo lead</p>
            <h2 id="new-lead-title">Cargar cliente interesado</h2>
          </div>
          <button className="ghost-button" type="button" onClick={onClose}>
            Cerrar
          </button>
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
            <button className="ghost-button" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className="primary-button" type="submit">
              Guardar lead
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
