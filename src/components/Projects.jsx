import { useVisible } from '../hooks/useVisible';

// ─── Add your projects here ────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    icon: '🔒',
    title: 'PCSoc Self-Hosted Infrastructure',
    description:
      'Migrated PCSoc from insecure password storage to a self-hosted Vaultwarden instance. ' +
      'Deployed and configured Snipe-IT to fully overhaul asset management for equipment ' +
      'valued at $100,000+. Maintained ongoing self-hosted infrastructure for internal operations.',
    tech: ['Docker', 'Vaultwarden', 'Snipe-IT', 'Linux', 'Self-Hosted'],
    github: null,
    demo: null,
  },
  {
    id: 2,
    icon: '🔧',
    title: 'Scones Hardware Badge',
    description:
      'Custom PCB badge designed for the UNSW Security Society\'s Scones conference. ' +
      'Features an RP2040 microcontroller, e-ink display, and IR communication between badges.',
    tech: ['KiCad', 'C', 'RP2040', 'PCB Design'],
    github: null,
    demo: null,
  },
  {
    id: 3,
    icon: '📱',
    title: 'NFC Business Card',
    description:
      'Designed an NFC-enabled PCB business card and ran a beginner-friendly workshop ' +
      'teaching PCB design fundamentals to UNSW security society members.',
    tech: ['KiCad', 'NFC', 'PCB Design', 'Workshop'],
    github: null,
    demo: null,
  },
  {
    id: 4,
    icon: '💻',
    title: 'Personal Portfolio',
    description:
      'This site. Built with Next.js and React; dark/light theme, smooth transitions, ' +
      'a hidden CTF challenge, and a Konami code easter egg. You found this one.',
    tech: ['Next.js', 'React', 'CSS'],
    github: 'https://github.com/maahir-ahmed',
    demo: 'https://maahir-ahmed.github.io',
  },
];

export default function Projects() {
  const [ref, visible] = useVisible({ threshold: 0.05 });

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div ref={ref} className="project-grid">
          {PROJECTS.map((project, i) => (
            <article
              key={project.id}
              className={`project-card fade-in${visible ? ' visible' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="project-icon">{project.icon}</div>
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
