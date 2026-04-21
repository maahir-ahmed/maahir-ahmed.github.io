import { useVisible } from '../../hooks/useVisible';

const FACTS = [
  { icon: '', label: 'Degree',     value: 'B. Computer Science'    },
  { icon: '', label: 'University', value: 'UNSW Sydney'             },
  { icon: '', label: 'Started',    value: 'February 2025'           },
  { icon: '', label: 'Focus',      value: 'Cybersecurity & Systems' },
];

export default function UniversityEducation() {
  const [ref, visible] = useVisible({ threshold: 0.1 });

  return (
    <section id="education" className="about">
      <div className="container">
        <h2 className="section-title">Education</h2>

        <div ref={ref} className={`about-body fade-in${visible ? ' visible' : ''}`}>
          <p className={`about-intro${visible ? ' visible' : ''}`}>
            I&apos;m studying a Bachelor of Computer Science at UNSW Sydney, with a core focus on
            cybersecurity. Beyond coursework, I&apos;ve channelled my interest in production and
            hardware through the university&apos;s security
            and computing societies.
          </p>
          <ul className={`about-list${visible ? ' visible' : ''}`} style={{ transitionDelay: '0.08s' }}>
            <li>Core coursework: Algorithms &amp; Data Structures, Systems Programming, Software Engineering</li>
            <li>Active in university cybersecurity competitions (CTFs) and hardware design projects</li>
            <li>Serving as Treasurer for two university societies simultaneously since October 2025</li>
          </ul>

          <div className="about-facts">
            {FACTS.map(({ icon, label, value }) => (
              <div key={label} className={`fact-card${visible ? ' visible' : ''}`}>
                <span className="fact-icon">{icon}</span>
                <div>
                  <p className="fact-label">{label}</p>
                  <p className="fact-value">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
