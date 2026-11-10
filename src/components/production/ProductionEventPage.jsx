'use client'

import Link from 'next/link';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import TournamentLogo from './TournamentLogo';
import { useTheme } from '../../hooks/useTheme';

const NAV_LINKS = [
  { href: '/production', label: 'All productions' },
  { href: '/',           label: 'Tech Portfolio' },
];

// No not-found branch: the page calls notFound() before rendering this.
export default function ProductionEventPage({ production }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} navLinks={NAV_LINKS} />
      <main className="event-page">
        <div className="container">

          <div className="event-header">
            <Link href="/production" className="event-back">All productions</Link>
            <TournamentLogo production={production} className="event-logo" />
            <p className="event-date">{production.date}</p>
            <h1 className="event-title">{production.event}</h1>
            <p className="event-role">{production.role}</p>
            <p className="tag-list">{production.tech.join(', ')}</p>
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
                    <img src={src} alt={`${production.event}, photo ${i + 1}`} className="gallery-img" />
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
