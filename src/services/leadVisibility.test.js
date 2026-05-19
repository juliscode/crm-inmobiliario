import test from 'node:test'
import assert from 'node:assert/strict'

import { getVisibleLeads } from './leadVisibility.js'

const leads = [
  { id: 'lead-1', agente_id: 'agent-1', nombre: 'Laura Perez' },
  { id: 'lead-2', agente_id: 'agent-2', nombre: 'Carlos Ruiz' },
  { id: 'lead-3', agente_id: 'agent-1', nombre: 'Marta Gomez' },
]

test('admin can see every lead', () => {
  const profile = { id: 'admin-1', rol: 'admin' }

  assert.deepEqual(getVisibleLeads(leads, profile).map((lead) => lead.id), [
    'lead-1',
    'lead-2',
    'lead-3',
  ])
})

test('agent can only see assigned leads', () => {
  const profile = { id: 'agent-1', rol: 'agente' }

  assert.deepEqual(getVisibleLeads(leads, profile).map((lead) => lead.id), [
    'lead-1',
    'lead-3',
  ])
})

test('missing profile sees no leads', () => {
  assert.deepEqual(getVisibleLeads(leads, null), [])
})
