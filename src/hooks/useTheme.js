import { useSyncExternalStore } from 'react';

// The saved theme is applied to <html data-theme> by an inline script in
// layout.jsx before first paint. This hook only reads that attribute, so the
// server render ("dark") and hydration always agree, then it re-renders with
// the real value.
const EVENT = 'themechange';

function subscribe(onChange) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

const getSnapshot = () => document.documentElement.dataset.theme || 'dark';
const getServerSnapshot = () => 'dark';

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    // Every element changes colour together, then the class comes off
    root.classList.add('theme-transitioning');
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    window.dispatchEvent(new Event(EVENT));
    setTimeout(() => root.classList.remove('theme-transitioning'), 400);
  };

  return { theme, toggleTheme };
}
