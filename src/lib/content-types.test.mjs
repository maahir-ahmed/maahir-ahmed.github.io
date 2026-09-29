import assert from 'node:assert/strict'
import { test } from 'node:test'
import { coerce, getContentType, present, validate } from './content-types.js'

const roleField = (typeKey, name) => getContentType(typeKey).fields.find((f) => f.name === name)

test('production roles round-trip through ticked boxes and "Other roles"', () => {
  const field = roleField('productions', 'role')
  // ticked boxes first, then the free-text lines (with a duplicate and blank line)
  const stored = coerce(field, ['Producer', 'Director', 'Observer\n\nProducer '])
  assert.equal(stored, 'Producer / Director / Observer')
  assert.deepEqual(present(field, stored), ['Producer', 'Director', 'Observer'])
})

test('organisation roles stay a list, and an empty roles field fails validation', () => {
  const field = roleField('production-orgs', 'roles')
  assert.deepEqual(coerce(field, ['Main Observer', 'GFX Operator']), ['Main Observer', 'GFX Operator'])
  assert.deepEqual(present(field, ['Producer']), ['Producer'])
  const errors = validate(getContentType('production-orgs'), { org: 'X', period: 'Y', roles: coerce(field, ['']) })
  assert.deepEqual(errors, ['Roles is required'])
})
