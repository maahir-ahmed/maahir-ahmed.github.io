'use client'

import { Fragment, useState, useCallback, useMemo } from 'react';
import Navbar from './components/shared/Navbar';
import Hero from './components/shared/Hero';
import ProductionCredits from './components/production/ProductionCredits';
import ProductionLogoScroller from './components/production/ProductionLogoScroller';
import Skills from './components/main/Skills';
import Contact from './components/shared/Contact';
import Footer from './components/shared/Footer';
import Notification from './components/shared/Notification';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { sortLinks } from './lib/nav';

const NAV_LINKS = [
  { href: '#home',    label: 'Home'    },
  { href: '#credits', label: 'My Work' },
  { href: '#skills',  label: 'Skills'  },
  { href: '#contact', label: 'Contact' },
  { href: '/',        label: 'Main site' },
];

export default function ProductionApp({ content }) {
  const { order, text, lists } = content;
  const { theme, toggleTheme } = useTheme();
  const sectionIds = useMemo(() => ['home', ...order], [order]);
  const activeSection = useScrollSpy(sectionIds);
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
  }, []);

  const dismissNotification = useCallback(() => setNotification(null), []);

  const sections = {
    credits: () => <ProductionCredits text={text.credits} orgs={lists['production-orgs']} productions={lists.productions} />,
    logos:   () => <ProductionLogoScroller logos={lists.logos} />,
    skills:  () => <Skills title={text.skills.title} groups={lists['production-skills']} />,
    contact: () => <Contact text={text.contact} showNotification={showNotification} />,
  };

  return (
    <>
      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        navLinks={sortLinks(NAV_LINKS, order)}
      />
      <main>
        <Hero text={text.hero} primaryHref="#credits" />
        {order.map(key => <Fragment key={key}>{sections[key]()}</Fragment>)}
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
