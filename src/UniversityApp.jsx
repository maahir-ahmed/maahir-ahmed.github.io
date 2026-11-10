'use client'

import PageShell from './components/shared/PageShell';
import UniversityEducation from './components/university/UniversityEducation';
import UniversityCoursework from './components/university/UniversityCoursework';
import Timeline from './components/shared/Timeline';
import Contact from './components/shared/Contact';

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
  return (
    <PageShell
      content={content}
      navLinks={NAV_LINKS}
      primaryHref="#societies"
      buildSections={({ text, lists, showNotification }) => ({
        education:    () => <UniversityEducation text={text.education} facts={lists['education-facts']} />,
        coursework:   () => <UniversityCoursework title={text.coursework.title} courses={lists.courses} />,
        societies:    () => <Timeline id="societies" title={text.societies.title} entries={lists.societies} />,
        volunteering: () => <Timeline id="volunteering" title={text.volunteering.title} entries={lists.volunteering} />,
        contact:      () => <Contact text={text.contact} showNotification={showNotification} />,
      })}
    />
  );
}
