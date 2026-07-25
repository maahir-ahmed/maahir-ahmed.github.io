import { useVisible } from '../../hooks/useVisible';

export default function UniversityVolunteering({ entries = [] }) {
  const [ref, visible] = useVisible({ threshold: 0.05 });

  return (
    <section id="volunteering" className="experience">
      <div className="container">
        <h2 className="section-title">Volunteering</h2>
        <div ref={ref} className="timeline">
          {entries.map((entry, i) => (
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
