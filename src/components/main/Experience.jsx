import { useVisible } from '../../hooks/useVisible';

// ─── Add entries in reverse-chronological order ────────────
const ENTRIES = [
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
    period: 'Dec 2025 – Jan 2026',
    role: 'Technical Assistant',
    org: 'UNSW',
    description:
      'Assisted in event technical setup of gaming arena and broadcast production using vMix ' +
      'for an international intervarsity academic esports event run by the Faculty of Arts, ' +
      'Design and Architecture.',
    tags: ['vMix', 'Broadcast Production', 'Event Tech', 'Esports'],
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
    period: 'Feb 2022 – Jul 2024',
    role: 'Homework Marker, Substitute Tutor & Receptionist',
    org: 'Pre Uni College',
    description:
      'Tutored classes of 2–15 students in Mathematics, English, and Thinking Skills. ' +
      'Marked assignments with constructive feedback, improving student performance by up to 30%. ' +
      'Handled enrolment inquiries and parent communications.',
    tags: ['Teaching', 'Tutoring', 'Communication', 'Customer Service'],
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
