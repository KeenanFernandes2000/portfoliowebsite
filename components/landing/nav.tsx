'use client';

import React, { useState, useEffect } from 'react';

export const NAV_LINKS = [
  { id: 'about', label: 'about', n: '01' },
  { id: 'experience', label: 'work', n: '02' },
  { id: 'skills', label: 'menu', n: '03' },
  { id: 'projects', label: 'brews', n: '04' },
  { id: 'contact', label: 'order', n: '05' },
];

export function CoffeeMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 13h17v6a7 7 0 0 1-7 7h-3a7 7 0 0 1-7-7v-6Z" stroke="var(--emerald)" strokeWidth="1.8"/>
      <path d="M23 15h2.5a3.5 3.5 0 0 1 0 7H23" stroke="var(--blue)" strokeWidth="1.8"/>
      <path d="M11 4c-1.2 1.4-1.2 2.6 0 4M16 4c-1.2 1.4-1.2 2.6 0 4M21 4c-1.2 1.4-1.2 2.6 0 4"
        stroke="var(--crema)" strokeWidth="1.8" strokeLinecap="round" className="cm-steam"/>
    </svg>
  );
}

export function Nav({ theme, toggleTheme, onOpenTerminal }: {
  theme: string;
  toggleTheme: () => void;
  onOpenTerminal: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero', ...NAV_LINKS.map(l => l.id)];
    const obs = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) setActive((e.target as HTMLElement).id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      transition: 'all 0.4s var(--ease)',
      background: scrolled ? 'color-mix(in oklab, var(--bg) 82%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(1.3)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66 }}>
        {/* brand */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <CoffeeMark />
          <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em' }}>
            coding<span className="text-crema">barista</span>
            <span className="text-em">.dev</span>
          </span>
        </button>

        {/* desktop links */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              style={{
                fontFamily: 'var(--mono)', fontSize: 13, padding: '8px 12px', borderRadius: 8,
                color: active === l.id ? 'var(--text)' : 'var(--muted)',
                background: active === l.id ? 'var(--surface)' : 'transparent',
                transition: 'all 0.2s var(--ease)', position: 'relative',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--blue)'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = active === l.id ? 'var(--text)' : 'var(--muted)'}>
              <span style={{ color: 'var(--faint)', marginRight: 6, fontSize: 11 }}>{l.n}</span>{l.label}
            </button>
          ))}
        </nav>

        {/* right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={onOpenTerminal} title="Open terminal (~)"
            className="nav-term"
            style={{
              display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--mono)', fontSize: 12.5,
              padding: '8px 12px', borderRadius: 9, border: '1px solid var(--border-2)', color: 'var(--muted)',
              transition: 'all 0.2s var(--ease)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--emerald)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--emerald)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-2)'; }}>
            <span style={{ color: 'var(--emerald)' }}>❯_</span>
            <span className="nav-term-label">terminal</span>
          </button>

          <button onClick={toggleTheme} title="Toggle espresso / latte"
            style={{
              width: 38, height: 38, borderRadius: 10, border: '1px solid var(--border-2)',
              display: 'grid', placeItems: 'center', transition: 'all 0.25s var(--ease)',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--crema)'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-2)'}>
            {theme === 'dark'
              ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--crema)" strokeWidth="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinejoin="round"/></svg>
              : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--crema)" strokeWidth="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round"/></svg>}
          </button>

          <button onClick={() => setOpen(o => !o)} className="nav-burger" aria-label="Menu"
            style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid var(--border-2)', display: 'none', placeItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open
                ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round"/>
                : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div className="nav-drawer" style={{
        maxHeight: open ? 340 : 0, overflow: 'hidden', transition: 'max-height 0.4s var(--ease)',
        background: 'color-mix(in oklab, var(--bg) 92%, transparent)', backdropFilter: 'blur(14px)',
        borderBottom: open ? '1px solid var(--border)' : 'none',
      }}>
        <div className="wrap" style={{ padding: '12px 28px 22px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              style={{ textAlign: 'left', fontFamily: 'var(--mono)', fontSize: 16, padding: '12px 8px', color: 'var(--text)', display: 'flex', gap: 12, alignItems: 'baseline' }}>
              <span style={{ color: 'var(--faint)', fontSize: 12 }}>{l.n}</span>{l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
