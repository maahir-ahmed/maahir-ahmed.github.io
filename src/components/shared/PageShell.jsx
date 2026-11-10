'use client'

import { Fragment, useCallback, useMemo, useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
import Notification from './Notification';
import { useTheme } from '../../hooks/useTheme';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { sortLinks } from '../../lib/nav';

// The shell ProductionApp and UniversityApp share: navbar, hero, the
// admin-ordered section loop, footer and one toast. The home page (CTF wiring
// into the navbar and hero) and /secsoc (its own hero and layout) deliberately
// keep their own shells.
export default function PageShell({ content, navLinks, primaryHref, buildSections }) {
  const { order, text, lists } = content;
  const { theme, toggleTheme } = useTheme();
  const sectionIds = useMemo(() => ['home', ...order], [order]);
  const activeSection = useScrollSpy(sectionIds);
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
  }, []);

  // Stable identity: Notification's auto-dismiss timer restarts when its
  // onClose changes, and this shell re-renders on every scroll-spy change.
  const dismissNotification = useCallback(() => setNotification(null), []);

  const sections = buildSections({ text, lists, showNotification });

  return (
    <>
      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        navLinks={sortLinks(navLinks, order)}
      />
      <main>
        <Hero text={text.hero} primaryHref={primaryHref} />
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
