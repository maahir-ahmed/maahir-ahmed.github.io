export default function Projects({ title, projects = [] }) {
  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="project-list">
          {projects.map(project => (
            <article key={project.id} className="project">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="tag-list">{project.tech.join(', ')}</p>
              {project.demo && (
                <p className="project-links">
                  <a href={project.demo} target="_blank" rel="noreferrer">Live site</a>
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
