import { useVisible } from '../hooks/useVisible';

// ─── Production credits in reverse-chronological order ─────
const CREDITS = [
  {
    id: 1,
    event: 'Oceanic Prodigies RE:BIRTH',
    date: 'Feb – Mar 2026',
    role: 'Production Lead / Technical Director',
    description:
      'Directed end-to-end production for a large-scale esports event. Managed full broadcast ' +
      'infrastructure including audio routing, multi-camera systems, and OMT video feeds. ' +
      'Led a cross-functional team of camera operators, producers, observers, replay operators, ' +
      'stagehands, and audio technicians through in-person setup, rehearsals, and live execution. ' +
      'Designed signal flow diagrams and communication matrices; led equipment procurement, ' +
      'transport, setup, and teardown.',
    tech: ['vMix', 'Multi-Camera', 'Audio Routing', 'NDI', 'Signal Flow', 'Leadership'],
  },
  {
    id: 2,
    event: 'UNSW ESports Live Broadcasts',
    date: 'Dec 2025 – Present',
    role: 'Producer / Replay Operator / Cinematics / POV Observer',
    description:
      'Regular live broadcasts across a wide range of roles for the UNSW ESports Club, ' +
      'including producer, replay operator, cinematics, and POV observing.',
    tech: ['vMix', 'Replay', 'Live Broadcast', 'Esports'],
  },
  {
    id: 3,
    event: 'UNSW Intervarsity Academic Esports',
    date: 'Dec 2025 – Jan 2026',
    role: 'Technical Assistant',
    description:
      'Assisted in technical setup of a gaming arena and broadcast production using vMix for ' +
      'an international intervarsity academic esports event run by the Faculty of Arts, Design ' +
      'and Architecture at UNSW.',
    tech: ['vMix', 'Gaming Arena Setup', 'AV Setup', 'Broadcast'],
  },
  {
    id: 4,
    event: 'Oceanic Prodigies II',
    date: 'Jul 2025',
    role: 'Event Tech & Production Crew',
    description:
      'Supported live broadcast production for a large-scale esports tournament. Assisted with ' +
      'network patching, NDI distribution, and hardware setup. Configured production systems ' +
      'for stable video feed distribution across multiple endpoints. Also contributed to web ' +
      'infrastructure including domain integration and the Pick\'Ems platform.',
    tech: ['NDI', 'Network Patching', 'Broadcast Infrastructure', 'Web Infra'],
  },
  {
    id: 5,
    event: 'Scones Conference',
    date: 'Mar 2025',
    role: 'AV Production',
    description:
      'Engineered the full recording and live-streaming rig for UNSW SecSoc\'s Scones security ' +
      'conference, saving the society $1,825 compared to outsourcing. Documented the entire ' +
      'setup for future use by the society.',
    tech: ['OBS', 'FFMPEG', 'NDI', 'Linux', 'Streaming'],
  },
];

export default function ProductionCredits() {
  const [ref, visible] = useVisible({ threshold: 0.05 });

  return (
    <section id="credits" className="projects">
      <div className="container">
        <h2 className="section-title">Credits</h2>
        <div ref={ref} className="credits-list">
          {CREDITS.map((credit, i) => (
            <article
              key={credit.id}
              className={`credit-card fade-in${visible ? ' visible' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="credit-meta">
                <span className="credit-date">{credit.date}</span>
                <span className="credit-role">{credit.role}</span>
              </div>
              <h3 className="credit-event">{credit.event}</h3>
              <p className="credit-description">{credit.description}</p>
              <div className="project-tech">
                {credit.tech.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
