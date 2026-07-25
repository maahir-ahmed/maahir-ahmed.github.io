import { useVisible } from '../../hooks/useVisible';

export default function UniversityCoursework({ courses = [] }) {
  const [ref, visible] = useVisible({ threshold: 0.1 });

  return (
    <section id="coursework" className="skills">
      <div className="container">
        <h2 className="section-title">Notable Coursework</h2>
        <div ref={ref} className="skills-grid">
          {courses.map((course, i) => (
            <div
              key={course.code}
              className={`skill-group fade-in${visible ? ' visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <h3 className="skill-category-label">{course.code}</h3>
              <p className="coursework-name">{course.name}</p>
              <p className="coursework-grade">{course.grade}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
