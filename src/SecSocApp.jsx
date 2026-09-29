'use client'

import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Carousel from './components/main/Carousel';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';

const SECTIONS  = ['home', 'running-for', 'vision', 'more'];
const NAV_LINKS = [
  { href: '#home',        label: 'Home'        },
  { href: '#running-for', label: 'Running For' },
  { href: '#vision',      label: 'Vision'      },
  { href: '/',            label: 'Main Site'   },
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
      <main>
        <section id="home" className="secsoc-intro">
          <div className="container">
            <h1 className="section-title">Candidate Statement</h1>
            <p className="secsoc-subtitle">
              Vice President of Internals (1st Preference) / Vice President of Technicals (2nd Preference)
            </p>
            <div className="secsoc-text">
              <p>
                Hi! I&apos;m Maahir, and I&apos;m running for Vice President of Internals and Vice
                President of Technicals.
              </p>
              <p>
                I&apos;ve been involved with SecSoc since the beginning of 2025 as a Projects
                subcommittee member, and this past year as the Treasurer for 2026. In that time,
                I&apos;ve helped behind the scenes run events such as SCONES and K17, whilst helping
                out around the society wherever needed. I&apos;ve also been the Treasurer of PC
                Society, where I performed similar duties and have been re-elected as the Secretary.
                All this experience has shown me how much of a society&apos;s success depends on the
                things members might never see, including internal communications that flow well, a
                form submitted on time and ensuring that everyone is on the right track to getting
                things done.
              </p>
            </div>
            <Carousel />
          </div>
        </section>

        <section id="running-for" className="running-for">
          <div className="container">
            <h2 className="section-title">What am I running for?</h2>
            <div className="positions-grid">
              <div className="position-card primary">
                <div className="position-header">
                  <h3>Vice President of Internals</h3>
                  <span className="preference-badge">First Preference</span>
                </div>
                <div className="position-content">
                  <p>
                    As VP Internals, I want to make joining SecSoc&apos;s committee easy and ensure
                    things run smooth internally. Helping everyone internally work with each other
                    cohesively is something I aspire to have throughout the entire year. I&apos;ll
                    run meetings with proper agendas and minutes, keep the membership list, club
                    papers and Arc forms up to date, and coordinate elections with the Returning
                    Officer. This would also work well with my other role as Secretary in PC Society
                    as both roles have similar responsibilities.
                  </p>
                </div>
              </div>

              <div className="position-card secondary">
                <div className="position-header">
                  <h3>Vice President of Technicals</h3>
                  <span className="preference-badge secondary">Second Preference</span>
                </div>
                <div className="position-content">
                  <p>
                    As VP Technicals, I&apos;d look after the infrastructure behind our events,
                    internals and community. I already have a solid understanding of the current
                    infrastructure in place, including all of the internal tools/programs, and am
                    familiar with how to manage everything within Azure. Keeping systems secure,
                    reliable and cheap to run is something I do both for 2 different societies as
                    well as myself. I&apos;d also ensure to document everything as I go, so the next
                    person can carry on our infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vision" className="secsoc-intro">
          <div className="container">
            <h2 className="section-title">Why SecSoc?</h2>
            <div className="secsoc-text">
              <p>
                SecSoc has always been home to me since my first year. The people I have met here
                have helped me with my academics, career goals and personal life. I couldn&apos;t
                thank them all enough for it, and I want to be able to share this with everyone else
                I meet.
              </p>
              <p>
                My vision for the next year is to help support a committee with my help and direction
                to run smoothly throughout the year, enough that everyone gets to spend their energy
                on the fun parts: enjoying great events, building cool things, gaining new
                opportunities and bringing more people into our amazing community.
              </p>
            </div>
          </div>
        </section>

        <section id="more" className="running-for">
          <div className="container secsoc-text secsoc-more">
            <h2 className="section-title">Want to know more?</h2>
            <p>Check out the rest of my website for other stuff about me!</p>
            <div className="hero-buttons">
              <a href="/" className="btn btn-primary">Visit my website</a>
              <a href="/university" className="btn btn-secondary">University</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
