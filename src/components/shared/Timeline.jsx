export default function Timeline({ id, title, entries = [] }) {
  return (
    <section id={id}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <ol className="timeline">
          {entries.map((entry, i) => (
            <li key={i} className="timeline-item">
              <p className="timeline-period">
                {entry.period.includes('Present') && <span className="tally" aria-label="Current" />}
                {entry.period}
              </p>
              <div>
                <h3 className="timeline-role">{entry.role}</h3>
                <p className="timeline-org">{entry.org}</p>
                <p className="timeline-description">{entry.description}</p>
                <p className="tag-list">{entry.tags.join(', ')}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
