'use client'

import { useState, useCallback } from 'react';
import Navbar from './components/shared/Navbar';
import UniversityHero from './components/university/UniversityHero';
import UniversityEducation from './components/university/UniversityEducation';
import UniversitySocieties from './components/university/UniversitySocieties';
import UniversityVolunteering from './components/university/UniversityVolunteering';
import UniversityCoursework from './components/university/UniversityCoursework';
import Contact from './components/shared/Contact';
import Footer from './components/shared/Footer';
import Notification from './components/shared/Notification';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';

const SECTIONS  = ['home', 'education', 'coursework', 'societies', 'volunteering', 'contact'];
const NAV_LINKS = [
  { href: '#home',         label: 'Home'        },
  { href: '#education',    label: 'Education'   },
  { href: '#coursework',   label: 'Coursework'  },
  { href: '#societies',    label: 'Societies'   },
  { href: '#volunteering', label: 'Volunteering' },
  { href: '#contact',      label: 'Contact'     },
  { href: '/',             label: '← Back'      },
];

export default function UniversityApp() {
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
        <UniversityHero />
        <UniversityEducation />
        <UniversityCoursework />
        <UniversitySocieties />
        <UniversityVolunteering />
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
