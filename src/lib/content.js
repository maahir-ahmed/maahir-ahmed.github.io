import { getContentType } from './content-types'
import { prisma } from './db'
import { highlightPython } from './highlight'
import { getPage, orderKey, sectionOrder, settingKey } from './pages'

const byPosition = { position: 'asc' }

export async function settingsMap() {
  const rows = await prisma.setting.findMany()
  return Object.fromEntries(rows.map((row) => [row.key, row.value]))
}

// Multi-line settings hold one item per line.
export function lines(value) {
  return String(value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export function paragraphs(value) {
  return String(value ?? '')
    .split(/\n\s*\n/)
    .map((para) => para.trim())
    .filter(Boolean)
}

const FORMAT = { lines, paragraphs, code: (value) => highlightPython(value) }

// Raw stored text for one section, falling back to the defaults in pages.js
export function sectionText(page, section, map) {
  return Object.fromEntries(
    section.fields.map((field) => [field.key, map[settingKey(page, section, field)] ?? field.default]),
  )
}

// Everything a public page renders: section text (formatted), order and lists
export async function getPageContent(pageKey) {
  const page = getPage(pageKey)
  const typeKeys = [...new Set(page.sections.flatMap((s) => s.lists ?? []))]

  const [map, ...rows] = await Promise.all([
    settingsMap(),
    ...typeKeys.map((key) => {
      const type = getContentType(key)
      return prisma[type.model].findMany({ where: type.scope ?? {}, orderBy: byPosition, omit: type.publicOmit })
    }),
  ])

  const text = {}
  for (const section of page.sections) {
    const raw = sectionText(page, section, map)
    text[section.key] = Object.fromEntries(
      section.fields.map((field) => [field.key, (FORMAT[field.type] ?? String)(raw[field.key])]),
    )
  }

  return {
    order: sectionOrder(page, map[orderKey(page)]),
    text,
    lists: Object.fromEntries(typeKeys.map((key, i) => [key, rows[i]])),
  }
}

export async function getProduction(slug) {
  return prisma.production.findUnique({ where: { slug } })
}
