import { useVisible } from '../../hooks/useVisible';

export default function About({ facts = [], intro = '', outro = '', bullets = [] }) {
  const [ref, visible] = useVisible({ threshold: 0.1 });

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div ref={ref} className={`about-body fade-in${visible ? ' visible' : ''}`}>
          {intro && <p className={`about-intro${visible ? ' visible' : ''}`}>{intro}</p>}

          {bullets.length > 0 && (
            <ul className={`about-list${visible ? ' visible' : ''}`} style={{ transitionDelay: '0.08s' }}>
              {bullets.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          {outro && (
            <p className={`about-intro${visible ? ' visible' : ''}`} style={{ transitionDelay: '0.16s' }}>
              {outro}
            </p>
          )}

          <div className="about-facts">
            {facts.map(({ id, label, value }) => (
              <div key={id ?? label} className={`fact-card${visible ? ' visible' : ''}`}>
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
