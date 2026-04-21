'use client'

import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { useTheme } from '../../hooks/useTheme';

const NAV_LINKS = [
  { href: '/production', label: '← Credits' },
  { href: '/',           label: 'Tech Portfolio' },
];

export default function ProductionEventPage({ production }) {
  const { theme, toggleTheme } = useTheme();

  if (!production) {
    return (
      <>
        <Navbar theme={theme} toggleTheme={toggleTheme} navLinks={NAV_LINKS} />
        <main style={{ padding: '8rem 2rem 4rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Event not found.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} navLinks={NAV_LINKS} />
      <main className="event-page">
        <div className="container">

          <div className="event-header">
            <a href="/production" className="event-back">← Back to Productions</a>
            <p className="event-date">{production.date}</p>
            <h1 className="event-title">{production.event}</h1>
            <p className="event-role">{production.role}</p>
            <div className="event-tags">
              {production.tech.map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="event-body">
            <p className="event-description">{production.description}</p>
          </div>

          {production.photos.length > 0 && (
            <div className="event-gallery">
              <h2 className="event-gallery-title">Photos</h2>
              <div className="gallery-grid">
                {production.photos.map((src, i) => (
                  <div key={i} className="gallery-item">
                    <img src={src} alt={`${production.event} — photo ${i + 1}`} className="gallery-img" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
