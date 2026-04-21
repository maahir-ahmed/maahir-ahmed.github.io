import { useVisible } from '../../hooks/useVisible';
import { PRODUCTIONS } from '../../data/productions';

const ORGS = [
  {
    org: 'UNSW ESports Society',
    period: 'Dec 2025 – Present',
    roles: ['Producer', 'Replay Operator', 'POV Observer', 'Cinematic Observer'],
  },
  {
    org: 'Oceanic Prodigies',
    period: 'Jul 2025 – Present',
    roles: ['Production Lead', 'Technical Director', 'Producer'],
  },
];

const GROUPED = PRODUCTIONS.reduce((acc, p) => {
  (acc[p.year] = acc[p.year] || []).push(p);
  return acc;
}, {});

const YEARS = Object.keys(GROUPED).map(Number).sort((a, b) => b - a);

export default function ProductionCredits() {
  const [ref, visible] = useVisible({ threshold: 0.05 });

  return (
    <section id="credits" className="projects">
      <div className="container">
        <h2 className="section-title">My Work</h2>
        <div ref={ref} className="credits-grouped">

          <div className={`credits-year-block fade-in${visible ? ' visible' : ''}`}>
            <h3 className="credits-year-label">Current Organisations</h3>
            <div className="credits-orgs">
              {ORGS.map(entry => (
                <div key={entry.org} className="credits-org-card">
                  <div className="credits-org-header">
                    <span className="org-name">{entry.org}</span>
                    <span className="credit-date">{entry.period}</span>
                  </div>
                  <div className="skill-tags">
                    {entry.roles.map(role => (
                      <span key={role} className="skill-tag">{role}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {YEARS.map((year, yi) => (
            <div
              key={year}
              className={`credits-year-block fade-in${visible ? ' visible' : ''}`}
              style={{ transitionDelay: `${(yi + 1) * 0.08}s` }}
            >
              <h3 className="credits-year-label">{year}</h3>
              <div className="credits-rows">
                {GROUPED[year].map(credit => (
                  <a
                    key={credit.slug}
                    href={`/production/${credit.slug}`}
                    className="credits-row"
                  >
                    <span className="credit-date">{credit.date}</span>
                    <span className="credit-event">{credit.event}</span>
                    <span className="credit-role">{credit.role}</span>
                    <span className="credit-cta">→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
