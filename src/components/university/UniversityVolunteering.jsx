import { useVisible } from '../../hooks/useVisible';

const ENTRIES = [
  {
    period: 'Jun 2025 – Present',
    role: 'eReuse Volunteer',
    org: 'Arc – UNSW Student Life',
    description:
      'Refurbish and repurpose donated electronic devices to provide accessible technology to ' +
      'those in need. Diagnose and repair laptops and desktops, install operating systems, ' +
      'configure software, perform data sanitisation, and test hardware for reliability.',
    tags: ['Hardware Repair', 'IT Support', 'Data Sanitisation', 'Sustainability', 'E-Waste'],
  },
  {
    period: 'Nov 2023 – Nov 2024',
    role: 'Charter Member',
    org: 'Leo Clubs',
    description:
      'Led community initiatives including organising book and care package drives with ' +
      'Parramatta High School Leo\'s Club and participating in Clean Up Australia Day. ' +
      'Volunteered at The Y NSW Empowered Minds Festival 2024.',
    tags: ['Community Service', 'Leadership', 'Fundraising'],
  },
];

export default function UniversityVolunteering() {
  const [ref, visible] = useVisible({ threshold: 0.05 });

  return (
    <section id="volunteering" className="experience">
      <div className="container">
        <h2 className="section-title">Volunteering</h2>
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
