import { useVisible } from '../../hooks/useVisible';

const ENTRIES = [
  {
    period: 'Dec 2025 – Present',
    role: 'Production Subcommittee',
    org: 'UNSW ESports Club',
    description:
      'Assist in regular live broadcasts of esports events in a wide range of roles, including ' +
      'producer, replay operator, cinematics, and POV observing.',
    tags: ['Live Production', 'vMix', 'Replay', 'Esports', 'Broadcasting'],
  },
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
      'Managed ~$5,000+ society capital, overseeing budgeting, forecasting, and cash flow. ' +
      'Maintained 100% accuracy in financial records through monthly reconciliation. Secured ' +
      'and managed $5,000+ in sponsorship funding for large-scale events. Ensured ACNC and ATO ' +
      'compliance to maintain Not-for-Profit status. Deployed self-hosted Vaultwarden and ' +
      'Snipe-IT to overhaul security and asset management for equipment valued at $100,000+.',
    tags: ['Financial Management', 'Sponsorship', 'NFP Compliance', 'Vaultwarden', 'Snipe-IT', 'Self-Hosted'],
  },
  {
    period: 'Mar 2025 – Oct 2025',
    role: 'Projects Subcommittee',
    org: 'UNSW Security Society (SecSoc)',
    description:
      'Designed the Scones hardware badge and ran a beginner-friendly ' +
      'PCB design workshop producing NFC business cards for UNSW security society members.',
    tags: ['PCB Design', 'Hardware', 'Workshop Facilitation'],
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
];

export default function UniversitySocieties() {
  const [ref, visible] = useVisible({ threshold: 0.05 });

  return (
    <section id="societies" className="skills">
      <div className="container">
        <h2 className="section-title">Societies</h2>
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
