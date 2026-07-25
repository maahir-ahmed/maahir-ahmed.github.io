'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { clearFailures, recordFailure, throttle, verifyPassword } from '../../lib/auth'
import { coerce, getContentType, validate } from '../../lib/content-types'
import { prisma } from '../../lib/db'
import { endSession, requireAdmin, startSession } from '../../lib/session'

async function clientKey() {
  const list = await headers()
  const forwarded = list.get('x-forwarded-for') ?? ''
  return forwarded.split(',')[0].trim() || 'unknown'
}

export async function login(_prev, formData) {
  const key = await clientKey()
  if (!throttle(key)) {
    return { error: 'Too many failed attempts. Try again in 15 minutes.' }
  }

  const stored = process.env.ADMIN_PASSWORD_HASH
  if (!stored) return { error: 'Admin password is not configured on the server.' }

  if (!verifyPassword(String(formData.get('password') ?? ''), stored)) {
    recordFailure(key)
    return { error: 'Incorrect password.' }
  }

  clearFailures(key)
  await startSession()
  redirect('/admin')
}

export async function logout() {
  await endSession()
  redirect('/admin/login')
}

function idFieldOf(type) {
  return type.idField ?? 'id'
}

export async function save(typeKey, id, _prev, formData) {
  await requireAdmin()

  const type = getContentType(typeKey)
  if (!type) return { error: 'Unknown content type.' }

  const data = {}
  for (const field of type.fields) {
    data[field.name] = coerce(field, formData.get(field.name))
  }

  const errors = validate(type, data)
  if (errors.length) return { error: errors.join('. ') }

  const idField = idFieldOf(type)
  const creating = id === 'new'

  // The id column is user-supplied for key/value settings, generated everywhere
  // else, so never let a generated id be overwritten by form data.
  if (!creating && idField === 'id') delete data[idField]

  try {
    if (creating) {
      await prisma[type.model].create({ data: { ...data, ...(type.scope ?? {}) } })
    } else {
      await prisma[type.model].update({ where: { [idField]: id }, data })
    }
  } catch (error) {
    if (error?.code === 'P2002') return { error: 'That slug or key is already used.' }
    throw error
  }

  redirect(`/admin/${typeKey}`)
}

export async function remove(typeKey, id) {
  await requireAdmin()

  const type = getContentType(typeKey)
  if (!type) return

  await prisma[type.model].delete({ where: { [idFieldOf(type)]: id } })
  redirect(`/admin/${typeKey}`)
}
