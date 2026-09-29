'use client'

import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';

const SECTIONS  = ['home', 'background', 'positions', 'why', 'more'];
const NAV_LINKS = [
  { href: '#home',      label: 'Home'      },
  { href: '#positions', label: 'Positions' },
  { href: '#why',       label: 'Why'       },
  { href: '/',          label: 'Main site' },
];

const POSITIONS = [
  {
    pref: 1,
    title: 'Vice President of Internals',
    body: `As VP Internals, I want to make joining SecSoc's committee easy and ensure things run smooth internally. Helping everyone internally work with each other cohesively is something I aspire to have throughout the entire year. I'll run meetings with proper agendas and minutes, keep the membership list, club papers and Arc forms up to date, and coordinate elections with the Returning Officer. This would also work well with my other role as Secretary in PC Society as both roles have similar responsibilities.`,
  },
  {
    pref: 2,
    title: 'Vice President of Technicals',
    body: `As VP Technicals, I'd look after the infrastructure behind our events, internals and community. I already have a solid understanding of the current infrastructure in place, including all of the internal tools/programs, and am familiar with how to manage everything within Azure. Keeping systems secure, reliable and cheap to run is something I do both for 2 different societies as well as myself. I'd also ensure to document everything as I go, so the next person can carry on our infrastructure.`,
  },
];

const PHOTOS = [
  { src: '/images/SecSocProjects2025.jpg', caption: 'Projects subcommittee, 2025' },
  { src: '/images/AV.jpg',                 caption: 'Running AV for SCONES'       },
  { src: '/images/SecSoc2025.jpg',         caption: 'SecSoc, 2025'                },
];

export default function SecSocApp() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useScrollSpy(SECTIONS);

  return (
    <>
      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        navLinks={NAV_LINKS}
      />
      <main className="ss">
        <section id="home" className="ss-hero">
          <div className="ss-wrap ss-hero-grid">
            <div>
              <h1 className="ss-title">Hi! I&apos;m Maahir.</h1>
              <p className="ss-lede">
                I&apos;m running for Vice President of Internals and Vice President of Technicals.
              </p>
            </div>

            <figure className="ss-ballot" aria-label="My preferences: 1, VP Internals. 2, VP Technicals.">
              <figcaption className="ss-ballot-head">
                <span>SecSoc executive elections</span>
                <span>Candidate: Maahir Ahmed</span>
              </figcaption>
              {POSITIONS.map(p => (
                <div key={p.pref} className="ss-ballot-row">
                  <span className="ss-box" style={{ animationDelay: `${0.35 + p.pref * 0.3}s` }}>
                    {p.pref}
                  </span>
                  <span>{p.title}</span>
                </div>
              ))}
            </figure>
          </div>
        </section>

        <section id="background" className="ss-section">
          <div className="ss-wrap">
            <div className="ss-prose">
              <h2>Where I&apos;ve been</h2>
              <p>
                I&apos;ve been involved with SecSoc since the beginning of 2025 as a Projects
                subcommittee member, and this past year as the Treasurer for 2026. In that time,
                I&apos;ve helped behind the scenes run events such as SCONES and K17, whilst helping
                out around the society wherever needed. I&apos;ve also been the Treasurer of PC
                Society, where I performed similar duties and have been re-elected as the Secretary.
              </p>
              <p>
                All this experience has shown me how much of a society&apos;s success depends on the
                things members might never see, including internal communications that flow well, a
                form submitted on time and ensuring that everyone is on the right track to getting
                things done.
              </p>
            </div>
            <div className="ss-photos">
              {PHOTOS.map(ph => (
                <figure key={ph.src}>
                  <img src={ph.src} alt={ph.caption} loading="lazy" />
                  <figcaption>{ph.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="positions" className="ss-section ss-alt">
          <div className="ss-wrap">
            {POSITIONS.map(p => (
              <article key={p.pref} className="ss-position">
                <span className="ss-box ss-box-lg" aria-hidden="true">{p.pref}</span>
                <div className="ss-prose">
                  <h2>{p.title}</h2>
                  <p className="ss-pref">{p.pref === 1 ? 'First' : 'Second'} preference</p>
                  <p>{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="why" className="ss-section">
          <div className="ss-wrap ss-prose">
            <h2>Why SecSoc</h2>
            <p>
              SecSoc has always been home to me since my first year. The people I have met here have
              helped me with my academics, career goals and personal life. I couldn&apos;t thank them
              all enough for it, and I want to be able to share this with everyone else I meet.
            </p>
            <p className="ss-vision">
              My vision for the next year is to help support a committee with my help and direction
              to run smoothly throughout the year, enough that everyone gets to spend their energy on
              the fun parts: enjoying great events, building cool things, gaining new opportunities
              and bringing more people into our amazing community.
            </p>
          </div>
        </section>

        <section id="more" className="ss-section ss-alt">
          <div className="ss-wrap ss-prose">
            <h2>Check out my website</h2>
            <p>There&apos;s more about me there: projects, experience, AV production and university.</p>
            <div className="ss-actions">
              <a href="/" className="btn btn-primary">Visit maahirahmed.com</a>
              <a href="/university" className="btn btn-secondary">University and societies</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
