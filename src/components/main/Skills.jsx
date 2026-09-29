export default function Skills({ groups = [] }) {
  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <dl className="spec-list">
          {groups.map(group => (
            <div key={group.category}>
              <dt>{group.category}</dt>
              <dd>{group.skills.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
