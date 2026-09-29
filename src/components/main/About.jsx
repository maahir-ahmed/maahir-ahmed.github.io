export default function About({ facts = [], intro = '', outro = '', bullets = [] }) {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">About me</h2>
        <div className="prose">
          {intro && <p>{intro}</p>}
          {bullets.length > 0 && (
            <ul>
              {bullets.map(item => <li key={item}>{item}</li>)}
            </ul>
          )}
          {outro && <p>{outro}</p>}
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
