// Every public page, its sections, and each section's editable text.
//
// Text is stored in the Setting table under `${prefix}.${field}`, where prefix
// defaults to `${page}.${section}`. A field that was never edited shows its
// default here, so new fields need no seeding. Section order is stored under
// `${page}.order`; a pinned section (the hero) always stays first.
//
// Field types: text (one line), textarea (one block), paragraphs (blank line
// between paragraphs), lines (one item per line), code (Python, highlighted).

const title = (value) => ({ key: 'title', label: 'Heading', type: 'text', default: value })

function hero({ prefix, subtitle, description, primary, file, code }) {
  return {
    key: 'hero',
    label: 'Hero',
    pinned: true,
    prefix,
    fields: [
      { key: 'greeting', label: 'Greeting', type: 'text', default: "Hi, I'm" },
      { key: 'name', label: 'Name', type: 'text', default: 'Maahir Ahmed' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', default: subtitle },
      { key: 'description', label: 'Description', type: 'textarea', default: description },
      { key: 'primary', label: 'Main button', type: 'text', default: primary },
      { key: 'secondary', label: 'Second button', type: 'text', default: 'Get in touch' },
      { key: 'file', label: 'Code file name', type: 'text', default: file },
      { key: 'code', label: 'Code', type: 'code', default: code },
    ],
  }
}

// One Contact section shared by every page that has it
const contact = {
  key: 'contact',
  label: 'Contact',
  prefix: 'contact',
  shared: true,
  fields: [
    title('Get in touch'),
    {
      key: 'blurb',
      label: 'Text',
      type: 'paragraphs',
      default: "I'm always open to discussing new opportunities, collaborating on interesting projects, or just having a chat about technology and computer science.",
    },
    { key: 'email', label: 'Email', type: 'text', default: 'maahirahmed2910@gmail.com' },
    { key: 'linkedinUrl', label: 'LinkedIn URL', type: 'text', default: 'https://www.linkedin.com/in/maahir-ahmed/' },
    { key: 'linkedinLabel', label: 'LinkedIn link text', type: 'text', default: 'linkedin.com/in/maahir-ahmed' },
  ],
}

export const PAGES = [
  {
    key: 'home',
    label: 'Home',
    path: '/',
    sections: [
      hero({
        prefix: 'hero',
        subtitle: 'Computer Science Student',
        description: 'Passionate about cybersecurity, gaming, and live production. Currently studying CS at UNSW and always seeking new opportunities to learn and do cool stuff.',
        primary: 'View my work',
        file: 'about_me.py',
        code: `class Developer:
    def __init__(self):
        self.name = "Maahir Ahmed"
        self.uni  = "UNSW"
        self.year = 2

me = Developer()`,
      }),
      {
        key: 'about',
        label: 'About me',
        prefix: 'about',
        lists: ['about-facts'],
        fields: [
          title('About me'),
          {
            key: 'intro',
            label: 'Intro',
            type: 'paragraphs',
            default: "Hi! I'm Maahir! - A Computer Science student at UNSW and Treasurer of both SecSoc and PCSoc. I've spent the last year managing society finances, running hardware workshops, directing live esports broadcasts. I like understanding how systems work at every level, from software all the way down to the silicon.",
          },
          {
            key: 'bullets',
            label: 'Highlights',
            type: 'lines',
            default: [
              'Managed a $20,000 annual budget and $10,000+ in sponsorship at SecSoc',
              'Deployed Vaultwarden & Snipe-IT for PCSoc, overhauling asset management on $100k+ of equipment',
              'Directed end-to-end production for Oceanic Prodigies RE:BIRTH as Production Lead / Technical Director',
            ].join('\n'),
          },
          {
            key: 'outro',
            label: 'Outro',
            type: 'paragraphs',
            default: 'Outside of all that I love tinkering with electronics, rock climbing, competing in CTF competitions, and finding bargains on OzBargain.',
          },
        ],
      },
      { key: 'projects', label: 'Projects', lists: ['projects'], fields: [title('Projects')] },
      { key: 'skills', label: 'Skills', lists: ['skills'], fields: [title('Skills')] },
      { key: 'experience', label: 'Experience', lists: ['experience'], fields: [title('Experience')] },
      contact,
    ],
  },
  {
    key: 'university',
    label: 'University',
    path: '/university',
    sections: [
      hero({
        subtitle: 'CS Student at UNSW',
        description: 'Studying Computer Science at UNSW while serving as Treasurer of both SecSoc and PCSoc: managing budgets, running workshops, and building things that matter.',
        primary: 'My societies',
        file: 'student.py',
        code: `class Student:
    def __init__(self):
        self.name       = "Maahir Ahmed"
        self.degree     = "B. Computer Science"
        self.university = "UNSW Sydney"
        self.year       = 2  # started Feb 2025
        self.societies  = ["SecSoc", "PCSoc", "ESports"]
        self.roles      = ["Treasurer", "Treasurer", "Production"]

me = Student()`,
      }),
      {
        key: 'education',
        label: 'Education',
        prefix: 'education',
        lists: ['education-facts'],
        fields: [
          title('Education'),
          {
            key: 'intro',
            label: 'Intro',
            type: 'paragraphs',
            default: "I'm studying a Bachelor of Computer Science at UNSW Sydney, with a core focus on cybersecurity. Beyond coursework, I've channelled my interest in production and hardware through the university's security and computing societies.",
          },
          {
            key: 'bullets',
            label: 'Highlights',
            type: 'lines',
            default: [
              'Core coursework: Algorithms & Data Structures, Systems Programming, Software Engineering',
              'Active in university cybersecurity competitions (CTFs) and hardware design projects',
              'Serving as Treasurer for two university societies simultaneously since October 2025',
            ].join('\n'),
          },
        ],
      },
      { key: 'coursework', label: 'Coursework', lists: ['courses'], fields: [title('Notable coursework')] },
      { key: 'societies', label: 'Societies', lists: ['societies'], fields: [title('Societies')] },
      { key: 'volunteering', label: 'Volunteering', lists: ['volunteering'], fields: [title('Volunteering')] },
      contact,
    ],
  },
  {
    key: 'production',
    label: 'Production',
    path: '/production',
    sections: [
      hero({
        subtitle: 'AV & Live Production',
        description: 'Directing live broadcasts, managing end-to-end production workflows, and building broadcast infrastructure for esports events and conferences.',
        primary: 'View my work',
        file: 'producer.py',
        code: `class Producer:
    def __init__(self):
        self.name       = "Maahir Ahmed"
        self.roles      = ["Production Lead", "Technical Director"]
        self.tools      = ["vMix", "NDI", "OBS", "FFMPEG"]
        self.speciality = ["Live Broadcast", "Multi-Camera"]

me = Producer()`,
      }),
      {
        key: 'credits',
        label: 'My work',
        lists: ['production-orgs', 'productions', 'production-roles'],
        fields: [
          title('My work'),
          { key: 'orgsTitle', label: 'Organisations heading', type: 'text', default: 'Current organisations' },
        ],
      },
      { key: 'logos', label: 'Logo strip', lists: ['logos'], fields: [] },
      { key: 'skills', label: 'Skills', lists: ['production-skills'], fields: [title('Skills')] },
      contact,
    ],
  },
  {
    key: 'secsoc',
    label: 'SecSoc',
    path: '/secsoc',
    sections: [
      {
        key: 'hero',
        label: 'Hero and ballot',
        pinned: true,
        lists: ['positions'],
        fields: [
          { key: 'title', label: 'Heading', type: 'text', default: "Hi! I'm Maahir." },
          { key: 'lede', label: 'Intro', type: 'textarea', default: "I'm running for Vice President of Internals and Vice President of Technicals." },
          { key: 'electionLabel', label: 'Ballot heading', type: 'text', default: 'SecSoc executive elections' },
          { key: 'candidateLabel', label: 'Ballot candidate line', type: 'text', default: 'Candidate: Maahir Ahmed' },
          { key: 'catHint', label: 'Cat says', type: 'text', default: 'Meow. Vote 1 Maahir.' },
        ],
      },
      {
        key: 'background',
        label: "Where I've been",
        lists: ['secsoc-photos'],
        fields: [
          title("Where I've been"),
          {
            key: 'body',
            label: 'Text',
            type: 'paragraphs',
            default: `I've been involved with SecSoc since the beginning of 2025 as a Projects subcommittee member, and this past year as the Treasurer for 2026. In that time, I've helped behind the scenes run events such as SCONES and K17, whilst helping out around the society wherever needed. I've also been the Treasurer of PC Society, where I performed similar duties and have been re-elected as the Secretary.

All this experience has shown me how much of a society's success depends on the things members might never see, including internal communications that flow well, a form submitted on time and ensuring that everyone is on the right track to getting things done.`,
          },
        ],
      },
      { key: 'positions', label: 'Positions', lists: ['positions'], fields: [] },
      {
        key: 'why',
        label: 'Why SecSoc',
        fields: [
          title('Why SecSoc'),
          {
            key: 'body',
            label: 'Text',
            type: 'paragraphs',
            default: "SecSoc has always been home to me since my first year. The people I have met here have helped me with my academics, career goals and personal life. I couldn't thank them all enough for it, and I want to be able to share this with everyone else I meet.",
          },
          { key: 'caption', label: 'Photo caption', type: 'text', default: 'SecSoc at BSides Canberra' },
          {
            key: 'vision',
            label: 'Vision',
            type: 'paragraphs',
            default: 'My vision for the next year is to help support a committee with my help and direction to run smoothly throughout the year, enough that everyone gets to spend their energy on the fun parts: enjoying great events, building cool things, gaining new opportunities and bringing more people into our amazing community.',
          },
        ],
      },
      {
        key: 'more',
        label: 'Check out my website',
        fields: [
          title('Check out my website'),
          { key: 'body', label: 'Text', type: 'paragraphs', default: "There's more about me there: projects, experience, AV production and university." },
          { key: 'primary', label: 'Main button', type: 'text', default: 'Visit maahirahmed.com' },
          { key: 'secondary', label: 'Second button', type: 'text', default: 'University and societies' },
        ],
      },
    ],
  },
]

export function getPage(key) {
  return PAGES.find((page) => page.key === key) ?? null
}

export function getSection(page, key) {
  return page?.sections.find((section) => section.key === key) ?? null
}

export function settingKey(page, section, field) {
  return `${section.prefix ?? `${page.key}.${section.key}`}.${field.key}`
}

export const orderKey = (page) => `${page.key}.order`

// Saved order, minus sections that no longer exist, plus any added since
export function sectionOrder(page, saved = '') {
  const movable = page.sections.filter((s) => !s.pinned).map((s) => s.key)
  const kept = saved.split(',').filter((key) => movable.includes(key))
  return [...new Set([...kept, ...movable])]
}

// Where a list is edited in /admin (the first section that shows it)
export function adminPathOf(typeKey) {
  for (const page of PAGES) {
    const section = page.sections.find((s) => s.lists?.includes(typeKey))
    if (section) return `/admin/pages/${page.key}/${section.key}`
  }
  return '/admin'
}
