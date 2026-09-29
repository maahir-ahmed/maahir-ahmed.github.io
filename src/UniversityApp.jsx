'use client'

import { Fragment, useState, useCallback, useMemo } from 'react';
import Navbar from './components/shared/Navbar';
import Hero from './components/shared/Hero';
import UniversityEducation from './components/university/UniversityEducation';
import Timeline from './components/shared/Timeline';
import UniversityCoursework from './components/university/UniversityCoursework';
import Contact from './components/shared/Contact';
import Footer from './components/shared/Footer';
import Notification from './components/shared/Notification';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { sortLinks } from './lib/nav';

const NAV_LINKS = [
  { href: '#home',         label: 'Home'        },
  { href: '#education',    label: 'Education'   },
  { href: '#coursework',   label: 'Coursework'  },
  { href: '#societies',    label: 'Societies'   },
  { href: '#volunteering', label: 'Volunteering' },
  { href: '#contact',      label: 'Contact'     },
  { href: '/',             label: 'Main site'   },
];

export default function UniversityApp({ content }) {
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
    education:    () => <UniversityEducation text={text.education} facts={lists['education-facts']} />,
    coursework:   () => <UniversityCoursework title={text.coursework.title} courses={lists.courses} />,
    societies:    () => <Timeline id="societies" title={text.societies.title} entries={lists.societies} />,
    volunteering: () => <Timeline id="volunteering" title={text.volunteering.title} entries={lists.volunteering} />,
    contact:      () => <Contact text={text.contact} showNotification={showNotification} />,
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
        <Hero text={text.hero} primaryHref="#societies" />
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
