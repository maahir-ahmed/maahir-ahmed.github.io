'use client'

import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProductionHero from './components/ProductionHero';
import ProductionCredits from './components/ProductionCredits';
import ProductionSkills from './components/ProductionSkills';
import ProductionExperience from './components/ProductionExperience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Notification from './components/Notification';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';

const SECTIONS  = ['home', 'credits', 'skills', 'experience', 'contact'];
const NAV_LINKS = [
  { href: '#home',       label: 'Home'       },
  { href: '#credits',    label: 'Credits'    },
  { href: '#skills',     label: 'Skills'     },
  { href: '#experience', label: 'Experience' },
  { href: '#contact',    label: 'Contact'    },
  { href: '/',           label: '← Tech'     },
];

export default function ProductionApp() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useScrollSpy(SECTIONS);
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
  }, []);

  const dismissNotification = useCallback(() => setNotification(null), []);

  return (
    <>
      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        navLinks={NAV_LINKS}
      />
      <main>
        <ProductionHero />
        <ProductionCredits />
        <ProductionSkills />
        <ProductionExperience />
        <Contact showNotification={showNotification} />
      </main>
      <Footer />
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
