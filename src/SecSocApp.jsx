'use client'

import { Fragment, useMemo } from 'react';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import PixelCat from './components/main/PixelCat';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { sortLinks } from './lib/nav';

const NAV_LINKS = [
  { href: '#home',      label: 'Home'      },
  { href: '#positions', label: 'Positions' },
  { href: '#why',       label: 'Why'       },
  { href: '/',          label: 'Main site' },
];

const PREFERENCE = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

export default function SecSocApp({ content }) {
  const { order, text, lists } = content;
  const { hero, background, why, more } = text;
  const positions = lists.positions;
  const { theme, toggleTheme } = useTheme();
  const sectionIds = useMemo(() => ['home', ...order], [order]);
  const activeSection = useScrollSpy(sectionIds);

  const ballotLabel = `My preferences: ${positions.map((p, i) => `${i + 1}, ${p.title}`).join('. ')}.`;

  const sections = {
    background: () => (
      <section id="background" className="ss-section">
        <div className="ss-wrap">
          <div className="ss-prose">
            <h2>{background.title}</h2>
            {background.body.map(para => <p key={para}>{para}</p>)}
          </div>
          <div className="ss-photos">
            {lists['secsoc-photos'].map(ph => (
              <figure key={ph.id}>
                <img src={ph.src} alt={ph.caption} loading="lazy" />
                <figcaption>{ph.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    ),

    positions: () => (
      <section id="positions" className="ss-section ss-alt">
        <div className="ss-wrap">
          {positions.map((p, i) => (
            <article key={p.id} className="ss-position">
              <span className="ss-box ss-box-lg" aria-hidden="true">{i + 1}</span>
              <div className="ss-prose">
                <h2>{p.title}</h2>
                <p className="ss-pref">{PREFERENCE[i] ?? `#${i + 1}`} preference</p>
                <p>{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    ),

    why: () => (
      <section id="why" className="ss-section">
        <div className="ss-wrap">
          <div className="ss-prose">
            <h2>{why.title}</h2>
            {why.body.map(para => <p key={para}>{para}</p>)}
          </div>
          <figure className="ss-feature">
            <div className="ss-feature-media">
              <img
                src="/images/SecSocBSides-1600.webp"
                srcSet="/images/SecSocBSides-800.webp 800w, /images/SecSocBSides-1600.webp 1600w"
                sizes="(max-width: 1040px) 100vw, 1000px"
                width="1600"
                height="1014"
                loading="lazy"
                alt="About fifty SecSoc members on the steps at BSides Canberra, holding the Security Society banner. Maahir is circled: second from the left in the front row, holding the banner"
              />
              {/* Coordinates are in the original photo's 2048x1298 pixels */}
              <svg className="ss-me" viewBox="0 0 2048 1298" aria-hidden="true">
                <circle cx="728" cy="672" r="84" />
                <path d="M 150 1190 Q 300 850 660 735" />
                <path d="M 621 727 L 660 735 L 633 765" />
                <text x="52" y="1262">Me</text>
              </svg>
            </div>
            <figcaption>{why.caption}</figcaption>
          </figure>
          <div className="ss-prose">
            {why.vision.map(para => <p key={para} className="ss-vision">{para}</p>)}
          </div>
        </div>
      </section>
    ),

    more: () => (
      <section id="more" className="ss-section ss-alt">
        <div className="ss-wrap ss-prose">
          <h2>{more.title}</h2>
          {more.body.map(para => <p key={para}>{para}</p>)}
          <div className="ss-actions">
            <a href="/" className="btn btn-primary">{more.primary}</a>
            <a href="/university" className="btn btn-secondary">{more.secondary}</a>
          </div>
        </div>
      </section>
    ),
  };

  return (
    <>
      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        navLinks={sortLinks(NAV_LINKS, order)}
      />
      <main className="ss">
        <section id="home" className="ss-hero">
          <div className="ss-wrap ss-hero-grid">
            <div>
              <div className="profile-image ss-profile">
                <img src="/profile.jpg" alt="Maahir Ahmed" className="profile-photo" />
                <div className="profile-border" />
              </div>
              <h1 className="ss-title">{hero.title}</h1>
              <p className="ss-lede">{hero.lede}</p>
            </div>

            <figure className="ss-ballot" aria-label={ballotLabel}>
              <PixelCat hint={hero.catHint} />
              <figcaption className="ss-ballot-head">
                <span>{hero.electionLabel}</span>
                <span>{hero.candidateLabel}</span>
              </figcaption>
              {positions.map((p, i) => (
                <div key={p.id} className="ss-ballot-row">
                  <span className="ss-box" style={{ animationDelay: `${0.65 + i * 0.3}s` }}>
                    {i + 1}
                  </span>
                  <span>{p.title}</span>
                </div>
              ))}
            </figure>
          </div>
        </section>

        {order.map(key => <Fragment key={key}>{sections[key]()}</Fragment>)}
      </main>
      <Footer />
    </>
  );
}
