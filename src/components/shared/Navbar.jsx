import { useState, useEffect } from 'react';

const DEFAULT_NAV_LINKS = [
  { href: '#home',       label: 'Home'       },
  { href: '/university', label: 'University'        },
  { href: '/production', label: 'Production' },
];

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar({ activeSection, theme, toggleTheme, onLogoClick, navLinks = DEFAULT_NAV_LINKS }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  // Every click paints the logo the next syntax colour (5 of them, matching
  // the 5 clicks that open the CTF terminal on the home page).
  const handleLogoClick = () => {
    setLogoClicks(n => n + 1);
    onLogoClick?.();
  };

  const navbarStyle = scrolled
    ? {
        background: theme === 'dark' ? 'rgba(10,10,10,0.97)' : 'rgba(250,250,250,0.97)',
        boxShadow: theme === 'dark' ? '0 1px 0 rgba(255,255,255,0.06)' : '0 1px 0 rgba(0,0,0,0.08)',
      }
    : {};

  return (
    <nav className="navbar" style={navbarStyle}>
      <div className="nav-container">
        <div className="nav-logo">
          <span
            className="logo-text"
            data-hue={logoClicks ? ((logoClicks - 1) % 5) + 1 : undefined}
            onClick={handleLogoClick}
          >
            &lt;MA&gt;
          </span>
        </div>

        <ul id="nav-menu" className={`nav-menu${menuOpen ? ' active' : ''}`}>
          {navLinks.map(({ href, label }) => {
            const isSwitch = href.startsWith('/');
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`nav-link${isSwitch ? ' nav-switch' : activeSection === href.slice(1) ? ' active' : ''}`}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav-controls">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {/* key forces remount → triggers CSS entry animation on swap */}
            <span className="theme-icon" key={theme}>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>
        </div>

        <button
          type="button"
          className={`hamburger${menuOpen ? ' active' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>
    </nav>
  );
}
