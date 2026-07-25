import { useVisible } from '../../hooks/useVisible';

export default function Projects({ projects = [] }) {
  const [ref, visible] = useVisible({ threshold: 0.05 });

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div ref={ref} className="project-grid">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className={`project-card fade-in${visible ? ' visible' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              {(project.github || project.demo) && (
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                      GitHub →
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="project-link">
                      Live →
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
