'use client';

import React, { useState, useEffect } from 'react';
import { useTheme, REDUCE } from './effects';
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakToggle } from './tweaks-panel';
import { Nav, NAV_LINKS, CoffeeMark } from './nav';
import { Hero } from './hero';
import { About } from './about';
import { Experience } from './experience';
import { Skills } from './skills';
import { Projects } from './projects';
import { Education } from './education';
import { Terminal } from './terminal';
import { Contact } from './contact';

const ACCENTS = [
  { hex: '#e6ad6e', key: 'caramel' },
  { hex: '#6f9bff', key: 'cobalt' },
  { hex: '#2fd3c4', key: 'teal' },
  { hex: '#ff8a5b', key: 'coral' },
  { hex: '#b08bff', key: 'violet' },
  { hex: '#2fd3a3', key: 'emerald' },
];

const CB_TWEAK_DEFAULTS = {
  accent: '#ff8a5b',
  steam: true,
  tilt: true,
};

function CoffeePour({ trigger }: { trigger: number }) {
  const [bits, setBits] = useState<any[]>([]);
  useEffect(() => {
    if (!trigger) return;
    if (REDUCE) return;
    const glyphs = ['☕', '☕', '◦', '°', '·', '∴', '~'];
    const b = Array.from({ length: 22 }, (_, i) => ({
      id: trigger + '-' + i,
      left: 10 + Math.random() * 80,
      g: glyphs[(Math.random() * glyphs.length) | 0],
      dur: 1.6 + Math.random() * 1.4,
      delay: Math.random() * 0.5,
      size: 14 + Math.random() * 22,
      drift: (Math.random() - 0.5) * 120,
    }));
    setBits(b);
    const t = setTimeout(() => setBits([]), 3400);
    return () => clearTimeout(t);
  }, [trigger]);
  if (!bits.length) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1500, pointerEvents: 'none', overflow: 'hidden' }}>
      {bits.map(b => (
        <span key={b.id} style={{
          position: 'absolute', bottom: -40, left: b.left + '%', fontSize: b.size,
          color: 'var(--crema)', opacity: 0,
          ['--drift' as any]: b.drift + 'px',
          animation: `pour ${b.dur}s var(--ease-out) ${b.delay}s forwards`,
        } as React.CSSProperties}>{b.g}</span>
      ))}
    </div>
  );
}

function Footer({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '46px 0 40px', position: 'relative' }}>
      <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <CoffeeMark size={22} />
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13.5 }}>coding<span className="text-crema">barista</span><span className="text-em">.dev</span></div>
            <div className="mono-label" style={{ textTransform: 'none', letterSpacing: '0.03em', marginTop: 2 }}>brewed with caffeine &amp; care · © {new Date().getFullYear()} Keenan Fernandes</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => go(l.id)} className="mono-label"
              style={{ textTransform: 'none', letterSpacing: '0.03em', padding: '6px 8px', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--emerald)'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = ''}>{l.label}</button>
          ))}
          <button onClick={onOpenTerminal} className="chip" style={{ borderRadius: 8 }}><span className="text-em">❯_</span> terminal</button>
        </div>
      </div>
    </footer>
  );
}

export function LandingApp() {
  const [theme, toggleTheme] = useTheme();
  const [tw, setTweak] = useTweaks(CB_TWEAK_DEFAULTS);
  const [termOpen, setTermOpen] = useState(false);
  const [pour, setPour] = useState(0);
  const openTerminal = () => setTermOpen(true);
  const brewCoffee = () => setPour(p => p + 1);

  // apply chosen accent to <html data-accent> + persist
  useEffect(() => {
    const match = ACCENTS.find(a => a.hex.toLowerCase() === String(tw.accent).toLowerCase()) || ACCENTS[0];
    document.documentElement.setAttribute('data-accent', match.key);
    try { localStorage.setItem('cb-accent', match.key); } catch {}
  }, [tw.accent]);

  // keyboard ~ / ` to toggle terminal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement && (document.activeElement as HTMLElement).tagName) || '';
      if ((e.key === '`' || e.key === '~') && !/input|textarea/i.test(tag)) {
        e.preventDefault(); setTermOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // hide boot screen on mount
  useEffect(() => {
    const b = document.getElementById('boot');
    if (b) { b.style.opacity = '0'; setTimeout(() => b.remove(), 500); }
  }, []);

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} onOpenTerminal={openTerminal} />
      <main>
        <Hero onOpenTerminal={openTerminal} steam={tw.steam} />
        <About tilt={tw.tilt} />
        <Experience />
        <Skills />
        <Projects tilt={tw.tilt} />
        <Education />
        <Contact />
      </main>
      <Footer onOpenTerminal={openTerminal} />
      <Terminal open={termOpen} onClose={() => setTermOpen(false)} toggleTheme={toggleTheme} onCoffee={brewCoffee} />
      <CoffeePour trigger={pour} />

      <TweaksPanel>
        <TweakSection label="Accent" />
        <TweakColor label="Primary color" value={tw.accent}
          options={ACCENTS.map(a => a.hex)}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Motion" />
        <TweakToggle label="Hero steam" value={tw.steam} onChange={(v) => setTweak('steam', v)} />
        <TweakToggle label="3D card tilt" value={tw.tilt} onChange={(v) => setTweak('tilt', v)} />
      </TweaksPanel>
    </>
  );
}
