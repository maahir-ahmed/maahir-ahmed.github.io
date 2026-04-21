import { useVisible } from '../../hooks/useVisible';

// ─── Add / remove skill groups here ───────────────────────
const SKILL_GROUPS = [
  {
    category: 'Languages',
    skills: ['Python', 'C', 'JavaScript', 'TypeScript', 'Bash', 'SQL'],
  },
  {
    category: 'Web & Frameworks',
    skills: ['React', 'Next.js', 'Node.js', 'HTML', 'CSS'],
  },
  {
    category: 'Hardware & PCB',
    skills: ['KiCad', 'RP2040', 'NFC', 'PCB Design', 'Soldering'],
  },
  {
    category: 'DevOps & Infra',
    skills: ['Docker', 'Linux', 'Git', 'Vaultwarden', 'Snipe-IT', 'Self-Hosted'],
  },
  {
    category: 'Interests',
    skills: ['Cybersecurity', 'CTF', 'PCB Design', 'Rock Climbing', 'OzBargain'],
  },
];

export default function Skills() {
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
