export default function UniversityCoursework({ title, courses = [] }) {
  return (
    <section id="coursework">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <dl className="spec-list course-list">
          {courses.map(course => (
            <div key={course.id}>
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
