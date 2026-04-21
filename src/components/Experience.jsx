import { useVisible } from '../hooks/useVisible';

// ─── Add entries in reverse-chronological order ────────────
const ENTRIES = [
  {
    period: 'Oct 2025 – Present',
    role: 'Treasurer',
    org: 'UNSW Security Society (SecSoc)',
    description:
      'Managed a $20,000 annual budget, overseeing financial planning, budget allocation, and ' +
      'cash flow. Invoiced and managed over $10,000 in sponsorship funding. Liaised with the ' +
      'ACNC and ATO to ensure tax compliance and maintain Not-for-Profit status.',
    tags: ['Financial Management', 'Sponsorship', 'Tax Compliance', 'NFP'],
  },
  {
    period: 'Oct 2025 – Present',
    role: 'Treasurer',
    org: 'PCSoc: Computers and Tech',
    description:
      'Managed ~$5,000+ society capital. Deployed a self-hosted Vaultwarden instance to ' +
      'replace insecure password storage. Implemented Snipe-IT to overhaul asset management ' +
      'for equipment valued at $100,000+. Maintained ongoing self-hosted infrastructure.',
    tags: ['Financial Management', 'Vaultwarden', 'Snipe-IT', 'Self-Hosted', 'DevOps'],
  },
  {
    period: 'Sep 2025 – Present',
    role: 'Pick Packer',
    org: 'DB Schenker',
    description:
      'Supported logistics operations for major product launches (e.g. iPhone 17, MacBook series), ' +
      'ensuring accurate inventory handling in a high-volume warehouse environment under strict ' +
      'WH&S procedures.',
    tags: ['Logistics', 'Inventory Management', 'WH&S'],
  },
  {
    period: 'Jun 2025',
    role: 'Student Ambassador',
    org: 'UNSW',
    description:
      'Supported delivery of SECeduCon through event setup, coordination, and attendee ' +
      'engagement for SECedu.',
    tags: ['Event Support', 'SECedu'],
  },
  {
    period: 'May 2025',
    role: 'Temporary Administrative Assistant',
    org: 'Australian Electoral Commission',
    description:
      'Supported administrative operations during the election period, assisting with data ' +
      'handling and process execution in a compliance-heavy environment requiring accuracy ' +
      'and confidentiality.',
    tags: ['Administration', 'Data Handling', 'Compliance'],
  },
  {
    period: 'Mar 2025 – Oct 2025',
    role: 'Projects Subcommittee',
    org: 'UNSW Security Society (SecSoc)',
    description:
      'Designed the Scones hardware badge (RP2040 + e-ink + IR comms) and ran a beginner-friendly ' +
      'PCB design workshop producing NFC business cards for UNSW security society members.',
    tags: ['PCB Design', 'Hardware', 'RP2040', 'Workshop Facilitation'],
  },
  {
    period: 'Mar 2025 – Oct 2025',
    role: 'Events, Hardware & DevOps Subcommittee',
    org: 'PCSoc: Computers and Tech',
    description:
      'Helped plan and deliver society events including hardware workshops and gaming nights. ' +
      'Assisted with technical setup, content preparation, and event execution.',
    tags: ['Event Logistics', 'Hardware', 'DevOps'],
  },
  {
    period: 'Feb 2025 – Present',
    role: 'Bachelor of Computer Science',
    org: 'UNSW Sydney',
    description:
      'Core focus on algorithms, systems programming, and software engineering. ' +
      'Exploring cybersecurity and hardware design through coursework and extracurriculars.',
    tags: ['Algorithms', 'Systems', 'Software Engineering', 'Cybersecurity'],
  },
  {
    period: 'Feb 2022 – Jul 2024',
    role: 'Homework Marker, Substitute Tutor & Receptionist',
    org: 'Pre Uni College',
    description:
      'Tutored classes of 2–15 students in Mathematics, English, and Thinking Skills. ' +
      'Marked assignments with constructive feedback, improving student performance by up to 30%. ' +
      'Handled enrolment inquiries and parent communications.',
    tags: ['Teaching', 'Tutoring', 'Communication', 'Customer Service'],
  },
];

export default function Experience() {
  const [ref, visible] = useVisible({ threshold: 0.05 });

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div ref={ref} className="timeline">
          {ENTRIES.map((entry, i) => (
            <div
              key={i}
              className={`timeline-item fade-in${visible ? ' visible' : ''}`}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="timeline-marker" />
              <div className="timeline-content">
                <p className="timeline-period">{entry.period}</p>
                <h3 className="timeline-role">{entry.role}</h3>
                <p className="timeline-org">{entry.org}</p>
                <p className="timeline-description">{entry.description}</p>
                <div className="timeline-tags">
                  {entry.tags.map(tag => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
