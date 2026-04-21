'use client'

import { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CTFTerminal from './components/CTFTerminal';
import CTFProgress from './components/CTFProgress';
import Notification from './components/Notification';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useCTF } from './hooks/useCTF';

const SECTIONS  = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
const NAV_LINKS = [
  { href: '#home',        label: 'Home'         },
  { href: '#about',       label: 'About'        },
  { href: '#projects',    label: 'Projects'     },
  { href: '#skills',      label: 'Skills'       },
  { href: '#experience',  label: 'Experience'   },
  { href: '#contact',     label: 'Contact'      },
  { href: '/production',  label: 'Production ↗' },
];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useScrollSpy(SECTIONS);
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
  }, []);

  const dismissNotification = useCallback(() => setNotification(null), []);

  const ctf = useCTF(showNotification);

  // Konami code easter egg
  useEffect(() => {
    const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let buffer = [];
    const handleKeyDown = (e) => {
      buffer.push(e.keyCode);
      buffer = buffer.slice(-KONAMI.length);
      if (buffer.join(',') === KONAMI.join(',')) {
        showNotification('🎉 Konami code activated! You found the easter egg!', 'success');
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => { document.body.style.animation = ''; }, 2000);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showNotification]);

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
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact showNotification={showNotification} />
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
        <CTFProgress flags={ctf.flags} totalFlags={5} />
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
