import { useVisible } from '../hooks/useVisible';

const SKILL_GROUPS = [
  {
    category: 'Broadcast Software',
    skills: ['vMix', 'OBS', 'NDI', 'FFMPEG', 'Replay Systems'],
  },
  {
    category: 'Signal Chain',
    skills: ['Multi-Camera', 'Audio Routing', 'OMT Video Feeds', 'Signal Flow Design'],
  },
  {
    category: 'Networking',
    skills: ['Network Patching', 'NDI Distribution', 'Fibre Setup', 'Domain Integration'],
  },
  {
    category: 'Event Production',
    skills: ['Runsheet Creation', 'Production Meetings', 'Contingency Planning', 'Logistics'],
  },
  {
    category: 'Hardware & Setup',
    skills: ['AV Rigging', 'Equipment Transport', 'Inventory Management', 'Cabling'],
  },
];

export default function ProductionSkills() {
  const [ref, visible] = useVisible({ threshold: 0.1 });

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div ref={ref} className="skills-grid">
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={group.category}
              className={`skill-group fade-in${visible ? ' visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <h3 className="skill-category-label">{group.category}</h3>
              <div className="skill-tags">
                {group.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
