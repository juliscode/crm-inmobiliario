import test from 'node:test'
import assert from 'node:assert/strict'

import {
  createLead,
  filterLeads,
  updateLeadStatus,
} from './leadManagement.js'

const admin = { id: 'admin-1', rol: 'admin' }
const agentOne = { id: 'agent-1', rol: 'agente' }

const leads = [
  {
    id: 'lead-1',
    nombre: 'Laura Perez',
    telefono: '+54 381 555-0184',
    email: 'laura@example.com',
    estado: 'Nuevo',
    agente_id: 'agent-1',
  },
  {
    id: 'lead-2',
    nombre: 'Carlos Ruiz',
    telefono: '+54 381 555-0149',
    email: 'carlos@example.com',
    estado: 'Contactado',
    agente_id: 'agent-2',
  },
]

const formData = {
  nombre: 'Ana Torres',
  telefono: '+54 381 555-0101',
  email: '',
  operacion: 'compra',
  zona_interes: 'Yerba Buena',
  presupuesto: 'USD 100.000',
  estado: 'Nuevo',
  prioridad: 'Alta',
  agente_id: 'agent-2',
  propiedad_interes: 'Casa con patio',
  proxima_accion: 'Llamar',
  fecha_proximo_contacto: '2026-05-22',
}

test('agent-created lead is assigned to active agent', () => {
  const lead = createLead(formData, agentOne, '2026-05-19T12:00:00.000Z')

  assert.equal(lead.agente_id, 'agent-1')
  assert.equal(lead.nombre, 'Ana Torres')
  assert.equal(lead.created_at, '2026-05-19T12:00:00.000Z')
})

test('admin-created lead keeps selected agent', () => {
  const lead = createLead(formData, admin, '2026-05-19T12:00:00.000Z')

  assert.equal(lead.agente_id, 'agent-2')
})

test('filters leads by text, status and agent', () => {
  const result = filterLeads(leads, {
    query: '381 555-0149',
    status: 'Contactado',
    agentId: 'agent-2',
  })

  assert.deepEqual(result.map((lead) => lead.id), ['lead-2'])
})

test('admin can update any lead status', () => {
  const result = updateLeadStatus(
    leads,
    'lead-2',
    'Interesado',
    admin,
    '2026-05-19T12:00:00.000Z',
  )

  assert.equal(result.find((lead) => lead.id === 'lead-2').estado, 'Interesado')
})

test('agent cannot update another agent lead status', () => {
  const result = updateLeadStatus(
    leads,
    'lead-2',
    'Interesado',
    agentOne,
    '2026-05-19T12:00:00.000Z',
  )

  assert.equal(result.find((lead) => lead.id === 'lead-2').estado, 'Contactado')
})
