import CodeBlock from './CodeBlock';
import PixelCat from '../main/PixelCat';

// The hidden CTF flag always sits at the end of the class body (the first
// blank line), however the code is edited in /admin.
function withFlag(html, flag) {
  const rows = html.split('\n');
  let at = rows.findIndex(row => !row.trim());
  if (at < 0) at = rows.length;
  const indent = at > 0 ? rows[at - 1].match(/^ */)[0] : '';
  rows.splice(at, 0, `${indent}<span class="hidden-flag"># ${flag}</span>`);
  return rows.join('\n');
}

export default function Hero({ text, primaryHref, flag, cat = false }) {
  const code = <CodeBlock file={text.file} html={flag ? withFlag(text.code, flag) : text.code} />;

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text hero-enter">
            <h1 className="hero-title">
              {text.greeting} <span className="hero-name">{text.name}</span>
            </h1>
            <p className="hero-subtitle">{text.subtitle}</p>
            <p className="hero-description">{text.description}</p>
            <div className="hero-buttons">
              <a href={primaryHref} className="btn btn-primary">{text.primary}</a>
              <a href="#contact" className="btn btn-secondary">{text.secondary}</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="profile-section">
              <div className="profile-image">
                <img src="/profile.jpg" alt="Maahir Ahmed" className="profile-photo" />
                <div className="profile-border" />
              </div>
              {cat ? <div className="code-perch"><PixelCat />{code}</div> : code}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
