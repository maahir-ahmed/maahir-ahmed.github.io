export default function ProductionCredits({ text, orgs = [], productions = [] }) {
  const grouped = productions.reduce((acc, item) => {
    (acc[item.year] = acc[item.year] || []).push(item);
    return acc;
  }, {});
  const years = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  return (
    <section id="credits">
      <div className="container">
        <h2 className="section-title">{text.title}</h2>
        <div className="credits-grouped">
          <div className="credits-year-block">
            <h3 className="credits-year-label">{text.orgsTitle}</h3>
            <dl className="spec-list">
              {orgs.map(entry => (
                <div key={entry.id}>
                  <dt>
                    {entry.period.includes('Present') && <span className="tally" aria-label="Current" />}
                    {entry.org}
                  </dt>
                  <dd>{entry.roles.join(', ')}</dd>
                  <dd className="credit-date">{entry.period}</dd>
                </div>
              ))}
            </dl>
          </div>

          {years.map(year => (
            <div key={year} className="credits-year-block">
              <h3 className="credits-year-label">{year}</h3>
              <div className="credits-rows">
                {grouped[year].map(credit => (
                  <a key={credit.slug} href={`/production/${credit.slug}`} className="credits-row">
                    <span className="credit-date">{credit.date}</span>
                    <span className="credit-event">{credit.event}</span>
                    <span className="credit-role">{credit.role}</span>
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
