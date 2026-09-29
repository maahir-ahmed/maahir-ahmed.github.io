export default function UniversityEducation({ facts = [], intro = '', bullets = [] }) {
  return (
    <section id="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="prose">
          {intro && <p>{intro}</p>}
          {bullets.length > 0 && (
            <ul>
              {bullets.map(item => <li key={item}>{item}</li>)}
            </ul>
          )}
          <dl className="spec-list">
            {facts.map(({ id, label, value }) => (
              <div key={id ?? label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
