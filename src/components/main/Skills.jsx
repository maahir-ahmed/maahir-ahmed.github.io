export default function Skills({ title, groups = [] }) {
  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <dl className="spec-list">
          {groups.map(group => (
            <div key={group.id}>
              <dt>{group.category}</dt>
              <dd>{group.skills.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
