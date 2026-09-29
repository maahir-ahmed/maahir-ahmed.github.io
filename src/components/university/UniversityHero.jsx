const CODE_HTML = `<span class="keyword">class</span> <span class="class-name">Student</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(<span class="keyword">self</span>):
        <span class="keyword">self</span>.name       = <span class="string">"Maahir Ahmed"</span>
        <span class="keyword">self</span>.degree     = <span class="string">"B. Computer Science"</span>
        <span class="keyword">self</span>.university = <span class="string">"UNSW Sydney"</span>
        <span class="keyword">self</span>.year       = <span class="number">2</span>  <span class="comment"># started Feb 2025</span>
        <span class="keyword">self</span>.societies  = [<span class="string">"SecSoc"</span>, <span class="string">"PCSoc"</span>, <span class="string">"ESports"</span>]
        <span class="keyword">self</span>.roles      = [<span class="string">"Treasurer"</span>, <span class="string">"Treasurer"</span>, <span class="string">"Production"</span>]

me = <span class="class-name">Student</span>()`;

export default function UniversityHero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text hero-enter">
            <h1 className="hero-title">
              Hi, I&apos;m <span className="hero-name">Maahir Ahmed</span>
            </h1>
            <p className="hero-subtitle">CS Student at UNSW</p>
            <p className="hero-description">
              Studying Computer Science at UNSW while serving as Treasurer of both SecSoc
              and PCSoc: managing budgets, running workshops, and building things that matter.
            </p>
            <div className="hero-buttons">
              <a href="#societies" className="btn btn-primary">My societies</a>
              <a href="#contact" className="btn btn-secondary">Get in touch</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="profile-section">
              <div className="profile-image">
                <img src="/profile.jpg" alt="Maahir Ahmed" className="profile-photo" />
                <div className="profile-border" />
              </div>
              <div className="code-block">
                <div className="code-header">
                  <span className="file-name">student.py</span>
                </div>
                <div className="code-content">
                  <pre>
                    <code dangerouslySetInnerHTML={{ __html: CODE_HTML }} />
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
