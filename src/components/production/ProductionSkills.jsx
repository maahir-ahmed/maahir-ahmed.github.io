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
  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <dl className="spec-list">
          {SKILL_GROUPS.map(group => (
            <div key={group.category}>
              <dt>{group.category}</dt>
              <dd>{group.skills.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
