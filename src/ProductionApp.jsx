'use client'

import { useState, useCallback } from 'react';
import Navbar from './components/shared/Navbar';
import ProductionHero from './components/production/ProductionHero';
import ProductionCredits from './components/production/ProductionCredits';
import ProductionLogoScroller from './components/production/ProductionLogoScroller';
import ProductionSkills from './components/production/ProductionSkills';
import Contact from './components/shared/Contact';
import Footer from './components/shared/Footer';
import Notification from './components/shared/Notification';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';

const SECTIONS  = ['home', 'credits', 'skills', 'contact'];
const NAV_LINKS = [
  { href: '#home',    label: 'Home'    },
  { href: '#credits', label: 'My Work' },
  { href: '#skills',  label: 'Skills'  },
  { href: '#contact', label: 'Contact' },
  { href: '/',        label: '← Back'  },
];

export default function ProductionApp({ productions = [] }) {
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
        <ProductionCredits productions={productions} />
        <ProductionLogoScroller />
        <ProductionSkills />
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
