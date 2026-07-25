import { prisma } from './db'

const byPosition = { position: 'asc' }

async function settingsMap() {
  const rows = await prisma.setting.findMany()
  return Object.fromEntries(rows.map((row) => [row.key, row.value]))
}

function timeline(section) {
  return prisma.timelineEntry.findMany({ where: { section }, orderBy: byPosition })
}

function facts(section) {
  return prisma.fact.findMany({ where: { section }, orderBy: byPosition })
}

// Multi-line settings hold one bullet per line.
export function lines(value) {
  return String(value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export async function getHomeContent() {
  const [projects, skills, experience, aboutFacts, map] = await Promise.all([
    prisma.project.findMany({ orderBy: byPosition }),
    prisma.skillGroup.findMany({ orderBy: byPosition }),
    timeline('EXPERIENCE'),
    facts('ABOUT'),
    settingsMap(),
  ])
  return {
    projects,
    skills,
    experience,
    aboutFacts,
    settings: {
      heroSubtitle: map['hero.subtitle'] ?? '',
      heroDescription: map['hero.description'] ?? '',
      aboutIntro: map['about.intro'] ?? '',
      aboutOutro: map['about.outro'] ?? '',
      aboutBullets: lines(map['about.bullets']),
    },
  }
}

export async function getUniversityContent() {
  const [societies, volunteering, courses, educationFacts, map] = await Promise.all([
    timeline('SOCIETY'),
    timeline('VOLUNTEERING'),
    prisma.course.findMany({ orderBy: byPosition }),
    facts('EDUCATION'),
    settingsMap(),
  ])
  return {
    societies,
    volunteering,
    courses,
    educationFacts,
    settings: {
      educationIntro: map['education.intro'] ?? '',
      educationBullets: lines(map['education.bullets']),
    },
  }
}

export async function getProductions() {
  return prisma.production.findMany({ orderBy: byPosition })
}

export async function getProduction(slug) {
  return prisma.production.findUnique({ where: { slug } })
}
