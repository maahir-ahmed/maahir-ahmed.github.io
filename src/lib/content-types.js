// Every repeating list on the site. The admin item forms, validation and
// ordering are derived from this registry; src/lib/pages.js says which section
// each list belongs to. Order comes from dragging tiles in /admin, which writes
// `position`, so it is never a form field.

const timelineFields = [
  { name: 'period', label: 'Period', type: 'text', required: true, hint: 'e.g. Sep 2025 – Present. "Present" adds the red current mark.' },
  { name: 'role', label: 'Role', type: 'text', required: true },
  { name: 'org', label: 'Organisation', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'tags', label: 'Tags', type: 'list', hint: 'One per line' },
]

function timeline(key, label, section) {
  return {
    key,
    label,
    model: 'timelineEntry',
    scope: { section },
    title: (row) => `${row.role}, ${row.org}`,
    fields: timelineFields,
  }
}

function facts(key, label, section) {
  return {
    key,
    label,
    model: 'fact',
    scope: { section },
    title: (row) => `${row.label}: ${row.value}`,
    fields: [
      { name: 'label', label: 'Label', type: 'text', required: true },
      { name: 'value', label: 'Value', type: 'text', required: true },
    ],
  }
}

function skills(key, section) {
  return {
    key,
    label: 'Skill groups',
    model: 'skillGroup',
    scope: { section },
    title: (row) => row.category,
    fields: [
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'skills', label: 'Skills', type: 'list', required: true, hint: 'One per line' },
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
    title: (row) => `${row.year}: ${row.event}`,
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true, hint: 'URL path, e.g. road-2-opens-4' },
      { name: 'event', label: 'Event', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'text', required: true, hint: 'Free text, e.g. 25 Apr 2026' },
      { name: 'year', label: 'Year', type: 'number', required: true, hint: 'Groups the list; order within a year follows the tiles' },
      { name: 'role', label: 'Roles', type: 'roles', join: ' / ', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'tech', label: 'Tech / tags', type: 'list', hint: 'One per line' },
      { name: 'photos', label: 'Photos', type: 'list', hint: 'One path per line, e.g. /productions/slug/a.jpg' },
    ],
  },
  {
    key: 'production-orgs',
    label: 'Current organisations',
    model: 'productionOrg',
    title: (row) => row.org,
    fields: [
      { name: 'org', label: 'Organisation', type: 'text', required: true },
      { name: 'period', label: 'Period', type: 'text', required: true, hint: '"Present" adds the red current mark' },
      { name: 'roles', label: 'Roles', type: 'roles', required: true },
    ],
  },
  {
    key: 'logos',
    label: 'Logos',
    model: 'logo',
    title: (row) => row.name,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, hint: 'Alt text, or shown as text when there is no image' },
      { name: 'img', label: 'Image path', type: 'url', hint: 'e.g. /logos/txg.webp. Leave empty to show the name.' },
      { name: 'invert', label: 'Invert in dark mode', type: 'checkbox', hint: 'For dark logos on a transparent background' },
    ],
  },
  {
    key: 'production-roles',
    label: 'Role choices',
    model: 'role',
    title: (row) => row.name,
    fields: [{ name: 'name', label: 'Role', type: 'text', required: true, hint: 'Shows as a tick box on productions and organisations' }],
  },
  skills('production-skills', 'PRODUCTION'),
  {
    key: 'projects',
    label: 'Projects',
    model: 'project',
    // GitHub links are hidden for now, so they never leave the server
    publicOmit: { github: true },
    title: (row) => row.title,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'tech', label: 'Tech', type: 'list', hint: 'One per line' },
      { name: 'github', label: 'GitHub URL', type: 'url', hint: 'Not shown on the site for now' },
      { name: 'demo', label: 'Live URL', type: 'url' },
    ],
  },
  skills('skills', 'HOME'),
  {
    key: 'courses',
    label: 'Coursework',
    model: 'course',
    title: (row) => `${row.code}: ${row.name}`,
    fields: [
      { name: 'code', label: 'Course code', type: 'text', required: true },
      { name: 'name', label: 'Course name', type: 'text', required: true },
      { name: 'grade', label: 'Grade', type: 'number', required: true },
    ],
  },
  facts('about-facts', 'Facts', 'ABOUT'),
  facts('education-facts', 'Facts', 'EDUCATION'),
  {
    key: 'positions',
    label: 'Positions',
    model: 'position',
    title: (row) => row.title,
    fields: [
      { name: 'title', label: 'Position', type: 'text', required: true, hint: 'The top tile is first preference' },
      { name: 'body', label: 'Statement', type: 'textarea', required: true },
    ],
  },
  {
    key: 'secsoc-photos',
    label: 'Photos',
    model: 'photo',
    title: (row) => row.caption || row.src,
    fields: [
      { name: 'src', label: 'Image path', type: 'text', required: true, hint: 'e.g. /images/AV.jpg' },
      { name: 'caption', label: 'Caption', type: 'text', required: true, hint: 'Also used as alt text' },
    ],
  },
]

export function getContentType(key) {
  return CONTENT_TYPES.find((type) => type.key === key) ?? null
}

// form value -> prisma value, per field type. A roles field arrives as every
// ticked box plus the "Other roles" lines, all under the one name.
export function coerce(field, raw) {
  if (field.type === 'roles') {
    const roles = [...new Set([raw].flat().flatMap((value) => String(value ?? '').split('\n')).map((r) => r.trim()).filter(Boolean))]
    return field.join ? roles.join(field.join) : roles
  }
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
  if (field.type === 'checkbox') return raw === 'on'
  const value = String(raw ?? '').trim()
  if ((field.type === 'url') && value === '') return null
  return value
}

// prisma value -> textarea/input value
export function present(field, value) {
  if (field.type === 'roles') {
    return (Array.isArray(value) ? value : String(value ?? '').split(field.join)).map((r) => r.trim()).filter(Boolean)
  }
  if (field.type === 'list') return (value ?? []).join('\n')
  if (field.type === 'checkbox') return Boolean(value)
  return value ?? ''
}

export function validate(type, data) {
  const errors = []
  for (const field of type.fields) {
    if (!field.required) continue
    const value = data[field.name]
    const empty = Array.isArray(value) ? value.length === 0 : value === '' || value === null
    if (empty) errors.push(`${field.label} is required`)
  }
  return errors
}
