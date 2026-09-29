export default function UniversityCoursework({ courses = [] }) {
  return (
    <section id="coursework">
      <div className="container">
        <h2 className="section-title">Notable coursework</h2>
        <dl className="spec-list course-list">
          {courses.map(course => (
            <div key={course.code}>
              <dt>{course.code}</dt>
              <dd>{course.name}</dd>
              <dd className="course-grade">{course.grade}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
