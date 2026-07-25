// The single source of truth for the admin panel. Every list page, edit form,
// validation rule and seed record is derived from this registry, so adding a
// new editable content type means adding one entry here and nothing else.

const timelineFields = [
  { name: 'period', label: 'Period', type: 'text', required: true, hint: 'e.g. Sep 2025 – Present' },
  { name: 'role', label: 'Role', type: 'text', required: true },
  { name: 'org', label: 'Organisation', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'tags', label: 'Tags', type: 'list', hint: 'One per line' },
  { name: 'position', label: 'Sort position', type: 'number' },
]

function timeline(key, label, section) {
  return {
    key,
    label,
    model: 'timelineEntry',
    scope: { section },
    title: (row) => `${row.role} — ${row.org}`,
    fields: timelineFields,
  }
}

function facts(key, label, section) {
  return {
    key,
    label,
    model: 'fact',
    scope: { section },
    title: (row) => row.label,
    fields: [
      { name: 'label', label: 'Label', type: 'text', required: true },
      { name: 'value', label: 'Value', type: 'text', required: true },
      { name: 'position', label: 'Sort position', type: 'number' },
    ],
  }
}

export const CONTENT_TYPES = [
  timeline('experience', 'Experience', 'EXPERIENCE'),
  timeline('societies', 'Societies', 'SOCIETY'),
  timeline('volunteering', 'Volunteering', 'VOLUNTEERING'),
  {
    key: 'productions',
    label: 'Productions',
    model: 'production',
    title: (row) => row.event,
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true, hint: 'URL path, e.g. road-2-opens-4' },
      { name: 'event', label: 'Event', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'text', required: true, hint: 'Free text, e.g. 25 Apr 2026' },
      { name: 'year', label: 'Year', type: 'number', required: true },
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'tech', label: 'Tech / tags', type: 'list', hint: 'One per line' },
      { name: 'photos', label: 'Photos', type: 'list', hint: 'One path per line, e.g. /productions/slug/a.jpg' },
      { name: 'position', label: 'Sort position', type: 'number' },
    ],
  },
  {
    key: 'projects',
    label: 'Projects',
    model: 'project',
    title: (row) => row.title,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'tech', label: 'Tech', type: 'list', hint: 'One per line' },
      { name: 'github', label: 'GitHub URL', type: 'url' },
      { name: 'demo', label: 'Live URL', type: 'url' },
      { name: 'position', label: 'Sort position', type: 'number' },
    ],
  },
  {
    key: 'skills',
    label: 'Skill groups',
    model: 'skillGroup',
    title: (row) => row.category,
    fields: [
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'skills', label: 'Skills', type: 'list', required: true, hint: 'One per line' },
      { name: 'position', label: 'Sort position', type: 'number' },
    ],
  },
  {
    key: 'courses',
    label: 'Coursework',
    model: 'course',
    title: (row) => `${row.code} — ${row.name}`,
    fields: [
      { name: 'code', label: 'Course code', type: 'text', required: true },
      { name: 'name', label: 'Course name', type: 'text', required: true },
      { name: 'grade', label: 'Grade', type: 'number', required: true },
      { name: 'position', label: 'Sort position', type: 'number' },
    ],
  },
  facts('about-facts', 'About facts', 'ABOUT'),
  facts('education-facts', 'Education facts', 'EDUCATION'),
  {
    key: 'settings',
    label: 'Page text',
    model: 'setting',
    idField: 'key',
    orderBy: { key: 'asc' },
    title: (row) => row.key,
    fields: [
      { name: 'key', label: 'Key', type: 'text', required: true },
      { name: 'value', label: 'Text', type: 'textarea', required: true },
    ],
  },
]

export function getContentType(key) {
  return CONTENT_TYPES.find((type) => type.key === key) ?? null
}

// form value -> prisma value, per field type
export function coerce(field, raw) {
  if (field.type === 'list') {
    return String(raw ?? '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  }
  if (field.type === 'number') {
    const n = Number(raw)
    return Number.isFinite(n) ? Math.trunc(n) : 0
  }
  const value = String(raw ?? '').trim()
  if ((field.type === 'url') && value === '') return null
  return value
}

// prisma value -> textarea/input value
export function present(field, value) {
  if (field.type === 'list') return (value ?? []).join('\n')
  return value ?? ''
}

export function validate(type, data) {
  const errors = []
  for (const field of type.fields) {
    if (!field.required) continue
    const value = data[field.name]
    const empty = field.type === 'list' ? value.length === 0 : value === '' || value === null
    if (empty) errors.push(`${field.label} is required`)
  }
  return errors
}
