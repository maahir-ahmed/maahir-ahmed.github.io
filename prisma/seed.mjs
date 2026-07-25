// Seeds the content that used to be hardcoded in the components.
// Each table is only filled when it is empty, so running this on every deploy
// never clobbers edits made in /admin.
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

const experience = [
  {
    period: 'Sep 2025 – Present',
    role: 'Pick Packer',
    org: 'DB Schenker',
    description:
      'Supported logistics operations for major product launches (e.g. iPhone 17, MacBook series), ensuring accurate inventory handling in a high-volume warehouse environment under strict WH&S procedures.',
    tags: ['Logistics', 'Inventory Management', 'WH&S'],
  },
  {
    period: 'Dec 2025 – Jan 2026',
    role: 'Technical Assistant',
    org: 'UNSW',
    description:
      'Assisted in event technical setup of gaming arena and broadcast production using vMix for an international intervarsity academic esports event run by the Faculty of Arts, Design and Architecture.',
    tags: ['vMix', 'Broadcast Production', 'Event Tech', 'Esports'],
  },
  {
    period: 'Jun 2025',
    role: 'Student Ambassador',
    org: 'UNSW',
    description:
      'Supported delivery of SECeduCon through event setup, coordination, and attendee engagement for SECedu.',
    tags: ['Event Support', 'SECedu'],
  },
  {
    period: 'Feb 2022 – Jul 2024',
    role: 'Homework Marker, Substitute Tutor & Receptionist',
    org: 'Pre Uni College',
    description:
      'Tutored classes of 2–15 students in Mathematics, English, and Thinking Skills. Marked assignments with constructive feedback, improving student performance by up to 30%. Handled enrolment inquiries and parent communications.',
    tags: ['Teaching', 'Tutoring', 'Communication', 'Customer Service'],
  },
  {
    period: 'May 2025',
    role: 'Temporary Administrative Assistant',
    org: 'Australian Electoral Commission',
    description:
      'Supported administrative operations during the election period, assisting with data handling and process execution in a compliance-heavy environment requiring accuracy and confidentiality.',
    tags: ['Administration', 'Data Handling', 'Compliance'],
  },
]

const societies = [
  {
    period: 'Dec 2025 – Present',
    role: 'Production Subcommittee',
    org: 'UNSW ESports Club',
    description:
      'Assist in regular live broadcasts of esports events in a wide range of roles, including producer, replay operator, cinematics, and POV observing.',
    tags: ['Live Production', 'vMix', 'Replay', 'Esports', 'Broadcasting'],
  },
  {
    period: 'Oct 2025 – Present',
    role: 'Treasurer',
    org: 'UNSW Security Society (SecSoc)',
    description:
      'Managed a $20,000 annual budget, overseeing financial planning, budget allocation, and cash flow. Invoiced and managed over $10,000 in sponsorship funding. Liaised with the ACNC and ATO to ensure tax compliance and maintain Not-for-Profit status.',
    tags: ['Financial Management', 'Sponsorship', 'Tax Compliance', 'NFP'],
  },
  {
    period: 'Oct 2025 – Present',
    role: 'Treasurer',
    org: 'PCSoc: Computers and Tech',
    description:
      'Managed ~$5,000+ society capital, overseeing budgeting, forecasting, and cash flow. Maintained 100% accuracy in financial records through monthly reconciliation. Secured and managed $5,000+ in sponsorship funding for large-scale events. Ensured ACNC and ATO compliance to maintain Not-for-Profit status. Deployed self-hosted Vaultwarden and Snipe-IT to overhaul security and asset management for equipment valued at $100,000+.',
    tags: ['Financial Management', 'Sponsorship', 'NFP Compliance', 'Vaultwarden', 'Snipe-IT', 'Self-Hosted'],
  },
  {
    period: 'Mar 2025 – Oct 2025',
    role: 'Projects Subcommittee',
    org: 'UNSW Security Society (SecSoc)',
    description:
      'Designed the Scones hardware badge and ran a beginner-friendly PCB design workshop producing NFC business cards for UNSW security society members.',
    tags: ['PCB Design', 'Hardware', 'Workshop Facilitation'],
  },
  {
    period: 'Mar 2025 – Oct 2025',
    role: 'Events, Hardware & DevOps Subcommittee',
    org: 'PCSoc: Computers and Tech',
    description:
      'Helped plan and deliver society events including hardware workshops and gaming nights. Assisted with technical setup, content preparation, and event execution.',
    tags: ['Event Logistics', 'Hardware', 'DevOps'],
  },
]

const volunteering = [
  {
    period: 'Jun 2025 – Present',
    role: 'eReuse Volunteer',
    org: 'Arc – UNSW Student Life',
    description:
      'Refurbish and repurpose donated electronic devices to provide accessible technology to those in need. Diagnose and repair laptops and desktops, install operating systems, configure software, perform data sanitisation, and test hardware for reliability.',
    tags: ['Hardware Repair', 'IT Support', 'Data Sanitisation', 'Sustainability', 'E-Waste'],
  },
  {
    period: 'Nov 2023 – Nov 2024',
    role: 'Charter Member',
    org: 'Leo Clubs',
    description:
      "Led community initiatives including organising book and care package drives with Parramatta High School Leo's Club and participating in Clean Up Australia Day. Volunteered at The Y NSW Empowered Minds Festival 2024.",
    tags: ['Community Service', 'Leadership', 'Fundraising'],
  },
]

const productions = [
  {
    slug: 'auec-unsw-showmatch',
    event: 'AUEC x UNSW Showmatch',
    date: '25 Apr 2026',
    year: 2026,
    role: 'POV Observer',
    description:
      'Assisted in live broadcast production for the AUEC x UNSW Showmatch, contributing across a range of production roles.',
    tech: ['Live Broadcast', 'Esports'],
    photos: [],
  },
  {
    slug: 'txg-april-circuit',
    event: 'TXG April Circuit',
    date: 'Apr 2026',
    year: 2026,
    role: 'Cinematic Observer',
    description:
      'Assisted in live broadcast production for the TXG April Circuit, contributing across a range of production roles.',
    tech: ['Live Broadcast', 'Esports'],
    photos: [],
  },
  {
    slug: 'road-2-opens-4',
    event: 'Road 2 Opens 4',
    date: 'Apr 2026',
    year: 2026,
    role: 'POV Observer',
    description:
      'Assisted in live broadcast production for Road 2 Opens 4, contributing across a range of production roles.',
    tech: ['Live Broadcast', 'Esports'],
    photos: [],
  },
  {
    slug: 'waveoce-rising-tides-split-1',
    event: 'WaveOCE Rising Tides: Split 1',
    date: 'Apr 2026',
    year: 2026,
    role: 'Producer / Tournament Referee / POV Observer / Cinematic Observer',
    description:
      'Assisted in live broadcast production for WaveOCE Rising Tides: Split 1, contributing across a range of production roles.',
    tech: ['OBS', 'Live Broadcast', 'Esports'],
    photos: [],
  },
  {
    slug: 'unsw-contenders-cup',
    event: 'UNSW Contenders Cup Term 1',
    date: 'Mar 2026',
    year: 2026,
    role: 'Producer / Replay Operator / POV Observer / Cinematic Observer',
    description:
      "Assisted in live broadcast production for the UNSW ESports Society's Contenders Cup, contributing across a range of production roles.",
    tech: ['vMix', 'Live Broadcast', 'Esports'],
    photos: [],
  },
  {
    slug: 'overwatch-casual-tournament',
    event: 'Overwatch Casual Tournament',
    date: '1 Mar 2026',
    year: 2026,
    role: 'POV Observer',
    description:
      'Assisted in live broadcast production for the Overwatch Casual Tournament, contributing across a range of production roles.',
    tech: ['vMix', 'Live Broadcast', 'Esports'],
    photos: [],
  },
  {
    slug: 'oceanic-prodigies-rebirth',
    event: 'Oceanic Prodigies RE:BIRTH',
    date: 'Feb – Mar 2026',
    year: 2026,
    role: 'Production Lead / Technical Director',
    description:
      'Directed end-to-end production for a large-scale esports event. Managed full broadcast infrastructure including audio routing, multi-camera systems, and OMT video feeds. Led a cross-functional team of camera operators, producers, observers, replay operators, stagehands, and audio technicians through in-person setup, rehearsals, and live execution. Designed signal flow diagrams and communication matrices; led equipment procurement, transport, setup, and teardown.',
    tech: ['vMix', 'Multi-Camera', 'Audio Routing', 'NDI', 'Signal Flow', 'Leadership'],
    photos: [],
  },
  {
    slug: 'unsw-intervarsity-esports',
    event: 'UNSW Intervarsity Academic Esports',
    date: 'Dec 2025 – Jan 2026',
    year: 2025,
    role: 'Technical Assistant',
    description:
      'Assisted in technical setup of a gaming arena and broadcast production using vMix for an international intervarsity academic esports event run by the Faculty of Arts, Design and Architecture at UNSW.',
    tech: ['vMix', 'Gaming Arena Setup', 'AV Setup', 'Broadcast'],
    photos: [],
  },
  {
    slug: 'oceanic-prodigies-ii',
    event: 'Oceanic Prodigies II',
    date: 'Jul 2025',
    year: 2025,
    role: 'Event Tech & Production Crew',
    description:
      "Supported live broadcast production for a large-scale esports tournament. Assisted with network patching, NDI distribution, and hardware setup. Configured production systems for stable video feed distribution across multiple endpoints. Also contributed to web infrastructure including domain integration and the Pick'Ems platform.",
    tech: ['NDI', 'Network Patching', 'Broadcast Infrastructure', 'Web Infra'],
    photos: [],
  },
  {
    slug: 'scones-conference',
    event: 'Scones Conference',
    date: 'Mar 2025',
    year: 2025,
    role: 'Producer / Technical Director',
    description:
      "Engineered the full recording and live-streaming rig for UNSW SecSoc's Scones security conference, saving the society $1,825 compared to outsourcing. Documented the entire setup for future use by the society.",
    tech: ['OBS', 'FFMPEG', 'NDI', 'Linux', 'Streaming'],
    photos: [],
  },
]

const projects = [
  {
    title: 'PCSoc Self-Hosted Infrastructure',
    description:
      'Migrated PCSoc from insecure password storage to a self-hosted Vaultwarden instance. Deployed and configured Snipe-IT to fully overhaul asset management for equipment valued at $100,000+. Maintained ongoing self-hosted infrastructure for internal operations.',
    tech: ['Docker', 'Vaultwarden', 'Snipe-IT', 'Linux', 'Self-Hosted'],
    github: null,
    demo: null,
  },
  {
    title: 'NFC Business Card',
    description:
      'Designed an NFC-enabled PCB business card and ran a beginner-friendly workshop teaching PCB design fundamentals to UNSW security society members.',
    tech: ['KiCad', 'NFC', 'PCB Design', 'Workshop'],
    github: null,
    demo: null,
  },
  {
    title: 'Personal Portfolio',
    description:
      'This site. Built with Next.js and React; dark/light theme, smooth transitions, a hidden CTF challenge, and a Konami code easter egg. You found this one.',
    tech: ['Next.js', 'React', 'CSS'],
    github: 'https://github.com/maahir-ahmed',
    demo: 'https://maahirahmed.com',
  },
]

const skillGroups = [
  { category: 'Languages', skills: ['Python', 'C', 'JavaScript', 'TypeScript', 'Bash', 'SQL'] },
  { category: 'Web & Frameworks', skills: ['React', 'Next.js', 'Node.js', 'HTML', 'CSS'] },
  { category: 'Hardware & PCB', skills: ['KiCad', 'RP2040', 'NFC', 'PCB Design', 'Soldering'] },
  { category: 'DevOps & Infra', skills: ['Docker', 'Linux', 'Git', 'Vaultwarden', 'Snipe-IT', 'Self-Hosted'] },
  { category: 'Interests', skills: ['Cybersecurity', 'CTF', 'PCB Design', 'Rock Climbing', 'OzBargain'] },
]

const courses = [
  { code: 'COMP1511', name: 'Programming Fundamentals', grade: 80 },
  { code: 'COMP1521', name: 'Computer Systems Fundamentals', grade: 75 },
]

const aboutFacts = [
  { label: 'Location', value: 'Sydney, Australia' },
  { label: 'Degree', value: 'B. Computer Science, UNSW' },
  { label: 'Roles', value: 'Treasurer - SecSoc & PCSoc' },
  { label: 'Focus', value: 'Cybersecurity & AV Production' },
]

const educationFacts = [
  { label: 'Degree', value: 'B. Computer Science' },
  { label: 'University', value: 'UNSW Sydney' },
  { label: 'Started', value: 'February 2025' },
  { label: 'Focus', value: 'Cybersecurity & Systems' },
]

const settings = [
  { key: 'hero.subtitle', value: 'Computer Science Student' },
  {
    key: 'hero.description',
    value:
      'Passionate about cybersecurity, gaming, and live production. Currently studying CS at UNSW and always seeking new opportunities to learn and do cool stuff.',
  },
  {
    key: 'about.intro',
    value:
      "Hi! I'm Maahir! - A Computer Science student at UNSW and Treasurer of both SecSoc and PCSoc. I've spent the last year managing society finances, running hardware workshops, directing live esports broadcasts. I like understanding how systems work at every level, from software all the way down to the silicon.",
  },
  {
    key: 'about.bullets',
    value: [
      'Managed a $20,000 annual budget and $10,000+ in sponsorship at SecSoc',
      'Deployed Vaultwarden & Snipe-IT for PCSoc, overhauling asset management on $100k+ of equipment',
      'Directed end-to-end production for Oceanic Prodigies RE:BIRTH as Production Lead / Technical Director',
    ].join('\n'),
  },
  {
    key: 'about.outro',
    value:
      'Outside of all that I love tinkering with electronics, rock climbing, competing in CTF competitions, and finding bargains on OzBargain.',
  },
  {
    key: 'education.intro',
    value:
      "I'm studying a Bachelor of Computer Science at UNSW Sydney, with a core focus on cybersecurity. Beyond coursework, I've channelled my interest in production and hardware through the university's security and computing societies.",
  },
  {
    key: 'education.bullets',
    value: [
      'Core coursework: Algorithms & Data Structures, Systems Programming, Software Engineering',
      'Active in university cybersecurity competitions (CTFs) and hardware design projects',
      'Serving as Treasurer for two university societies simultaneously since October 2025',
    ].join('\n'),
  },
]

function positioned(rows, extra = {}) {
  return rows.map((row, index) => ({ ...row, ...extra, position: index }))
}

async function fill(model, rows, label) {
  const existing = await prisma[model].count()
  if (existing > 0) {
    console.log(`skip ${label}: ${existing} row(s) already present`)
    return
  }
  await prisma[model].createMany({ data: rows })
  console.log(`seeded ${label}: ${rows.length} row(s)`)
}

async function main() {
  const timeline = [
    ...positioned(experience, { section: 'EXPERIENCE' }),
    ...positioned(societies, { section: 'SOCIETY' }),
    ...positioned(volunteering, { section: 'VOLUNTEERING' }),
  ]
  const allFacts = [
    ...positioned(aboutFacts, { section: 'ABOUT' }),
    ...positioned(educationFacts, { section: 'EDUCATION' }),
  ]

  await fill('timelineEntry', timeline, 'timeline entries')
  await fill('production', positioned(productions), 'productions')
  await fill('project', positioned(projects), 'projects')
  await fill('skillGroup', positioned(skillGroups), 'skill groups')
  await fill('course', positioned(courses), 'courses')
  await fill('fact', allFacts, 'facts')
  await fill('setting', settings, 'settings')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
