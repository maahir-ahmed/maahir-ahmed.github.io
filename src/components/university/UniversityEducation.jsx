export default function UniversityEducation({ text, facts = [] }) {
  return (
    <section id="education">
      <div className="container">
        <h2 className="section-title">{text.title}</h2>
        <div className="prose">
          {text.intro.map(para => <p key={para}>{para}</p>)}
          {text.bullets.length > 0 && (
            <ul>
              {text.bullets.map(item => <li key={item}>{item}</li>)}
            </ul>
          )}
          <dl className="spec-list">
            {facts.map(({ id, label, value }) => (
              <div key={id}>
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
