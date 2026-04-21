const CODE_HTML = `<span class="keyword">class</span> <span class="class-name">Producer</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(<span class="keyword">self</span>):
        <span class="keyword">self</span>.name       = <span class="string">"Maahir Ahmed"</span>
        <span class="keyword">self</span>.roles      = [<span class="string">"Production Lead"</span>, <span class="string">"Technical Director"</span>]
        <span class="keyword">self</span>.tools      = [<span class="string">"vMix"</span>, <span class="string">"NDI"</span>, <span class="string">"OBS"</span>, <span class="string">"FFMPEG"</span>]
        <span class="keyword">self</span>.speciality = [<span class="string">"Live Broadcast"</span>, <span class="string">"Multi-Camera"</span>]
        <span class="keyword">self</span>.events     = <span class="number">5</span>  <span class="comment"># and counting</span>

me = <span class="class-name">Producer</span>()`;

export default function ProductionHero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title fade-in-up">
              <span className="word-reveal">Hi,</span>{' '}
              <span className="word-reveal">I&apos;m</span>
              <br />
              <span className="name-glow highlight">Maahir Ahmed</span>
            </h1>
            <p className="hero-subtitle">AV &amp; Live Production</p>
            <p className="hero-description">
              Directing live broadcasts, managing end-to-end production workflows, and
              building broadcast infrastructure for esports events and conferences.
            </p>
            <div className="hero-buttons">
              <a href="#credits" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
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
                  <div className="dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <span className="file-name">producer.py</span>
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
