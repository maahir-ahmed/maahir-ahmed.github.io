const CODE_HTML = `<span class="keyword">class</span> <span class="class-name">Developer</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(<span class="keyword">self</span>):
        <span class="keyword">self</span>.name     = <span class="string">"Maahir Ahmed"</span>
        <span class="keyword">self</span>.roles    = [<span class="string">"CS Student"</span>, <span class="string">"Treasurer"</span>]
        <span class="keyword">self</span>.orgs     = [<span class="string">"SecSoc"</span>, <span class="string">"PCSoc"</span>]
        <span class="keyword">self</span>.uni      = <span class="string">"UNSW"</span>
        <span class="keyword">self</span>.year     = <span class="number">2</span>
        <span class="keyword">self</span>.focus    = [<span class="string">"Cybersecurity"</span>, <span class="string">"AV Production"</span>]
        <span class="hidden-flag"># CTF{H1dd3n_1n_C0d3_B10ck}</span>

me = <span class="class-name">Developer</span>()`;

export default function Hero({ subtitle = '', description = '' }) {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text hero-enter">
            <h1 className="hero-title">
              Hi, I&apos;m <span className="hero-name">Maahir Ahmed</span>
            </h1>
            <p className="hero-subtitle">{subtitle}</p>
            <p className="hero-description">{description}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View my work</a>
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
                  <span className="file-name">about_me.py</span>
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
