'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { clearFailures, recordFailure, throttle, verifyPassword } from '../../lib/auth'
import { coerce, getContentType, validate } from '../../lib/content-types'
import { prisma } from '../../lib/db'
import { adminPathOf, getPage, getSection, orderKey, sectionOrder, settingKey } from '../../lib/pages'
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

  try {
    if (id === 'new') {
      // New items go to the end of their list
      const { _max } = await prisma[type.model].aggregate({ where: type.scope ?? {}, _max: { position: true } })
      data.position = (_max.position ?? -1) + 1
      await prisma[type.model].create({ data: { ...data, ...(type.scope ?? {}) } })
    } else {
      await prisma[type.model].update({ where: { id }, data })
    }
  } catch (error) {
    if (error?.code === 'P2002') return { error: 'That slug is already used.' }
    throw error
  }

  redirect(adminPathOf(typeKey))
}

export async function remove(typeKey, id) {
  await requireAdmin()

  const type = getContentType(typeKey)
  if (!type) return

  await prisma[type.model].delete({ where: { id } })
  redirect(adminPathOf(typeKey))
}

const isIdList = (ids) => Array.isArray(ids) && ids.every((id) => typeof id === 'string')

// Dragged tiles: ids in their new order. Scoped, so a stray id from another
// list can never be moved.
export async function reorder(typeKey, ids) {
  await requireAdmin()

  const type = getContentType(typeKey)
  if (!type || !isIdList(ids)) return

  await prisma.$transaction(
    ids.map((id, position) =>
      prisma[type.model].updateMany({ where: { id, ...(type.scope ?? {}) }, data: { position } }),
    ),
  )
}

export async function reorderSections(pageKey, keys) {
  await requireAdmin()

  const page = getPage(pageKey)
  if (!page || !isIdList(keys)) return

  // Only accept an exact rearrangement of the page's movable sections
  const movable = sectionOrder(page)
  if (keys.length !== movable.length || !movable.every((key) => keys.includes(key))) return

  const key = orderKey(page)
  const value = keys.join(',')
  await prisma.setting.upsert({ where: { key }, create: { key, value }, update: { value } })
}

export async function saveText(pageKey, sectionKey, _prev, formData) {
  await requireAdmin()

  const page = getPage(pageKey)
  const section = getSection(page, sectionKey)
  if (!section) return { error: 'Unknown section.' }

  await prisma.$transaction(
    section.fields.map((field) => {
      const key = settingKey(page, section, field)
      const value = String(formData.get(field.key) ?? '').replace(/\r\n/g, '\n')
      return prisma.setting.upsert({ where: { key }, create: { key, value }, update: { value } })
    }),
  )

  return { saved: Date.now() }
}
