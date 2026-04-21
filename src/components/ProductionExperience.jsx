import { useVisible } from '../hooks/useVisible';

const ENTRIES = [
  {
    period: 'Dec 2025 – Present',
    role: 'Production Subcommittee',
    org: 'UNSW ESports Club',
    description:
      'Assist in regular live broadcasts of esports in a wide range of roles, including ' +
      'producer, replay operator, cinematics, and POV observing.',
    tags: ['Live Production', 'vMix', 'Replay', 'Esports'],
  },
  {
    period: 'Mar 2025 – Oct 2025',
    role: 'Events, Hardware & DevOps Subcommittee',
    org: 'PCSoc: Computers and Tech',
    description:
      'Provided AV and technical support at major events such as Oceanic Prodigies, including ' +
      'fibre/network patching, hardware setup, and logistics coordination. Assisted with ' +
      'technical setup, content preparation, and event execution.',
    tags: ['AV Support', 'Network Patching', 'Hardware', 'Event Logistics'],
  },
  {
    period: 'Mar 2025 – Oct 2025',
    role: 'Projects Subcommittee',
    org: 'UNSW Security Society (SecSoc)',
    description:
      'Built and managed the recording and live-streaming rig for the Scones security ' +
      'conference, ensuring smooth technical delivery.',
    tags: ['AV Production', 'Streaming', 'OBS', 'NDI'],
  },
];

export default function ProductionExperience() {
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
              style={{ transitionDelay: `${i * 0.1}s` }}
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
