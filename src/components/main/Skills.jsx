import { useVisible } from '../../hooks/useVisible';

export default function Skills({ groups = [] }) {
  const [ref, visible] = useVisible({ threshold: 0.1 });

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div ref={ref} className="skills-grid">
          {groups.map((group, i) => (
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
