'use client'

import PageShell from './components/shared/PageShell';
import ProductionCredits from './components/production/ProductionCredits';
import ProductionLogoScroller from './components/production/ProductionLogoScroller';
import Skills from './components/main/Skills';
import Contact from './components/shared/Contact';

const NAV_LINKS = [
  { href: '#home',    label: 'Home'    },
  { href: '#credits', label: 'My Work' },
  { href: '#skills',  label: 'Skills'  },
  { href: '#contact', label: 'Contact' },
  { href: '/',        label: 'Main site' },
];

export default function ProductionApp({ content }) {
  return (
    <PageShell
      content={content}
      navLinks={NAV_LINKS}
      primaryHref="#credits"
      buildSections={({ text, lists, showNotification }) => ({
        credits: () => <ProductionCredits text={text.credits} orgs={lists['production-orgs']} productions={lists.productions} />,
        logos:   () => <ProductionLogoScroller logos={lists.logos} />,
        skills:  () => <Skills title={text.skills.title} groups={lists['production-skills']} />,
        contact: () => <Contact text={text.contact} showNotification={showNotification} />,
      })}
    />
  );
}
