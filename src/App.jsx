'use client'

import { Fragment, useState, useCallback, useEffect, useMemo } from 'react';
import Navbar from './components/shared/Navbar';
import Hero from './components/shared/Hero';
import About from './components/main/About';
import Projects from './components/main/Projects';
import Skills from './components/main/Skills';
import Timeline from './components/shared/Timeline';
import Contact from './components/shared/Contact';
import Footer from './components/shared/Footer';
import CTFTerminal from './components/ctf/CTFTerminal';
import CTFProgress from './components/ctf/CTFProgress';
import Notification from './components/shared/Notification';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useCTF } from './hooks/useCTF';

const NAV_LINKS = [
  { href: '#home',        label: 'Home'       },
  { href: '/university',  label: 'University'        },
  { href: '/production',  label: 'Production' },
];

export default function App({ content }) {
  const { order, text, lists } = content;
  const { theme, toggleTheme } = useTheme();
  const sectionIds = useMemo(() => ['home', ...order], [order]);
  const activeSection = useScrollSpy(sectionIds);
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
  }, []);

  const dismissNotification = useCallback(() => setNotification(null), []);

  const ctf = useCTF(showNotification);

  // CTF 'console' stage. This has to be a real runtime effect: a JSX
  // {/* comment */} compiles away and never reaches the served HTML.
  useEffect(() => {
    console.log(
      '%cCTF{C0ns0l3_S4ys_H3ll0}',
      'color:#22d3ee;font:600 16px/1.6 monospace',
      '\n\nYou opened dev tools. Submit that in the CTF terminal: flag <value>',
    );
  }, []);

  // Konami code easter egg
  useEffect(() => {
    const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let buffer = [];
    const handleKeyDown = (e) => {
      buffer.push(e.keyCode);
      buffer = buffer.slice(-KONAMI.length);
      if (buffer.join(',') === KONAMI.join(',')) {
        showNotification('Konami code activated! You found the easter egg!', 'success');
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => { document.body.style.animation = ''; }, 2000);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showNotification]);

  const sections = {
    about:      () => <About text={text.about} facts={lists['about-facts']} />,
    projects:   () => <Projects title={text.projects.title} projects={lists.projects} />,
    skills:     () => <Skills title={text.skills.title} groups={lists.skills} />,
    experience: () => <Timeline id="experience" title={text.experience.title} entries={lists.experience} />,
    contact:    () => <Contact text={text.contact} showNotification={showNotification} />,
  };

  return (
    <>
      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        onLogoClick={ctf.handleLogoClick}
        navLinks={NAV_LINKS}
      />
      <main>
        <Hero text={text.hero} primaryHref="#projects" flag="CTF{H1dd3n_1n_C0d3_B10ck}" cat />
        {order.map(key => <Fragment key={key}>{sections[key]()}</Fragment>)}
      </main>
      <Footer />

      {ctf.terminalVisible && (
        <CTFTerminal
          lines={ctf.terminalLines}
          onCommand={ctf.processCommand}
          onClose={ctf.closeTerminal}
        />
      )}
      {ctf.progressVisible && (
        <CTFProgress stages={ctf.stages} solved={ctf.solved} total={ctf.total} />
      )}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={dismissNotification}
        />
      )}
    </>
  );
}
