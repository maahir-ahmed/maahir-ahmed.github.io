export default function Projects({ projects = [] }) {
  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="project-list">
          {projects.map(project => (
            <article key={project.id} className="project">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="tag-list">{project.tech.join(', ')}</p>
              {(project.github || project.demo) && (
                <p className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer">Live site</a>
                  )}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
