import test from 'node:test'
import assert from 'node:assert/strict'

import {
  createLeadNote,
  createLeadVisit,
  getVisibleLeadNotes,
  getVisibleLeadVisits,
} from './leadActivity.js'

const admin = { id: 'admin-1', rol: 'admin' }
const agentOne = { id: 'agent-1', rol: 'agente' }

const leads = [
  { id: 'lead-1', agente_id: 'agent-1' },
  { id: 'lead-2', agente_id: 'agent-2' },
]

const notes = [
  {
    id: 'note-1',
    lead_id: 'lead-1',
    agente_id: 'agent-1',
    nota: 'Primera llamada realizada',
    created_at: '2026-05-18T10:00:00.000Z',
  },
  {
    id: 'note-2',
    lead_id: 'lead-2',
    agente_id: 'agent-2',
    nota: 'Pidió opciones en zona norte',
    created_at: '2026-05-18T11:00:00.000Z',
  },
]

const visits = [
  {
    id: 'visit-1',
    lead_id: 'lead-1',
    agente_id: 'agent-1',
    propiedad: 'Casa en Yerba Buena',
    fecha_visita: '2026-05-22',
    resultado: 'Interesado',
    observaciones: 'Quiere volver con familia',
    created_at: '2026-05-18T12:00:00.000Z',
  },
  {
    id: 'visit-2',
    lead_id: 'lead-2',
    agente_id: 'agent-2',
    propiedad: 'Departamento centro',
    fecha_visita: '2026-05-23',
    resultado: 'Pendiente',
    observaciones: 'Confirmar horario',
    created_at: '2026-05-18T13:00:00.000Z',
  },
]

test('admin can see notes and visits for any lead', () => {
  assert.deepEqual(
    getVisibleLeadNotes(notes, leads, 'lead-2', admin).map((note) => note.id),
    ['note-2'],
  )
  assert.deepEqual(
    getVisibleLeadVisits(visits, leads, 'lead-2', admin).map((visit) => visit.id),
    ['visit-2'],
  )
})

test('agent can only see notes and visits for assigned leads', () => {
  assert.deepEqual(
    getVisibleLeadNotes(notes, leads, 'lead-1', agentOne).map((note) => note.id),
    ['note-1'],
  )
  assert.deepEqual(
    getVisibleLeadNotes(notes, leads, 'lead-2', agentOne).map((note) => note.id),
    [],
  )
  assert.deepEqual(
    getVisibleLeadVisits(visits, leads, 'lead-1', agentOne).map((visit) => visit.id),
    ['visit-1'],
  )
  assert.deepEqual(
    getVisibleLeadVisits(visits, leads, 'lead-2', agentOne).map((visit) => visit.id),
    [],
  )
})

test('new note is associated with active profile and lead', () => {
  const note = createLeadNote(
    'lead-1',
    { nota: 'Enviar ficha técnica' },
    agentOne,
    leads,
    '2026-05-19T12:00:00.000Z',
  )

  assert.equal(note.lead_id, 'lead-1')
  assert.equal(note.agente_id, 'agent-1')
  assert.equal(note.nota, 'Enviar ficha técnica')
  assert.equal(note.created_at, '2026-05-19T12:00:00.000Z')
})

test('new visit is associated with active profile and lead', () => {
  const visit = createLeadVisit(
    'lead-2',
    {
      propiedad: 'PH reciclado',
      fecha_visita: '2026-05-26',
      resultado: 'Visitó',
      observaciones: 'Le gustó el patio',
    },
    admin,
    leads,
    '2026-05-19T13:00:00.000Z',
  )

  assert.equal(visit.lead_id, 'lead-2')
  assert.equal(visit.agente_id, 'admin-1')
  assert.equal(visit.propiedad, 'PH reciclado')
  assert.equal(visit.fecha_visita, '2026-05-26')
  assert.equal(visit.resultado, 'Visitó')
  assert.equal(visit.observaciones, 'Le gustó el patio')
})

test('agent cannot create activity on another agent lead', () => {
  assert.equal(
    createLeadNote('lead-2', { nota: 'No debería guardar' }, agentOne, leads),
    null,
  )
  assert.equal(
    createLeadVisit(
      'lead-2',
      {
        propiedad: 'Departamento centro',
        fecha_visita: '2026-05-26',
        resultado: 'Pendiente',
        observaciones: 'No debería guardar',
      },
      agentOne,
      leads,
    ),
    null,
  )
})

test('missing profile cannot create activity', () => {
  assert.equal(
    createLeadNote('lead-1', { nota: 'No debería guardar' }, null, leads),
    null,
  )
  assert.equal(
    createLeadVisit(
      'lead-1',
      {
        propiedad: 'Casa',
        fecha_visita: '2026-05-26',
        resultado: 'Pendiente',
        observaciones: 'No debería guardar',
      },
      null,
      leads,
    ),
    null,
  )
})
