'use client';

import React from 'react';
import { REDUCE, SteamField, ScrambleText, RotatingType, CountUp, Magnetic } from './effects';

const BREW_TITLES = [
  'Full-Stack AI Engineer',
  'Agentic Workflow Architect',
  'SaaS Platform Builder',
  'Technical Lead',
];

const HERO_STATS = [
  { value: 5, suffix: '+', label: 'years brewing' },
  { value: 20, suffix: 'k+', label: 'users served' },
  { value: 10, suffix: '+', label: 'products shipped' },
];

export function Hero({ onOpenTerminal, steam = true }: { onOpenTerminal: () => void; steam?: boolean }) {
  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="gridbg" style={{
      position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', overflow: 'hidden', paddingTop: 66,
    }}>
      {/* interactive particle steam */}
      {steam ? <SteamField /> : null}

      {/* radial vignette + warm glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(120% 90% at 50% 8%, transparent 40%, var(--bg) 100%)' }} />
      <div style={{ position: 'absolute', top: '-12%', left: '50%', transform: 'translateX(-50%)',
        width: 720, height: 420, pointerEvents: 'none', filter: 'blur(70px)', opacity: 0.4,
        background: 'radial-gradient(closest-side, var(--crema), transparent 70%)' }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center', pointerEvents: 'none' }}>
        {/* eyebrow */}
        <div className="hi" style={{
          animationDelay: '0.05s', marginBottom: 26, display: 'flex', justifyContent: 'center',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--mono)', fontSize: 12.5,
            color: 'var(--emerald)', border: '1px solid var(--border-2)', borderRadius: 99, padding: '7px 15px',
            background: 'color-mix(in oklab, var(--surface) 70%, transparent)', backdropFilter: 'blur(6px)',
            letterSpacing: '0.05em', pointerEvents: 'auto',
          }}>
            <span style={{ position: 'relative', width: 8, height: 8 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: 99, background: 'var(--emerald)' }} />
              <span style={{ position: 'absolute', inset: 0, borderRadius: 99, background: 'var(--emerald)', animation: REDUCE ? 'none' : 'pulse-ring 1.8s var(--ease) infinite' }} />
            </span>
            available for new projects · brewing since 2020
          </span>
        </div>

        {/* mono pre-line */}
        <div className="hi" style={{
          fontFamily: 'var(--mono)', color: 'var(--faint)', fontSize: 'clamp(12px,1.4vw,15px)',
          marginBottom: 12, animationDelay: '0.12s',
        }}>
          <span className="text-em">const</span> <span className="text-blue">engineer</span> = <span className="text-crema">brew</span>(
        </div>

        {/* kinetic name */}
        <h1 className="display hi" style={{ fontSize: 'clamp(48px, 11vw, 148px)', marginBottom: 6, animationDelay: '0.16s' }}>
          <ScrambleText text="Keenan" start={true} as="span" style={{ display: 'inline-block' }} />{' '}
          <span className="grad"><ScrambleText text="Fernandes" start={true} speed={0.8} as="span" style={{ display: 'inline-block' }} /></span>
        </h1>

        <div className="hi" style={{
          fontFamily: 'var(--mono)', color: 'var(--faint)', fontSize: 'clamp(12px,1.4vw,15px)',
          marginBottom: 22, animationDelay: '0.2s',
        }}>)</div>

        {/* now brewing */}
        <div className="hi" style={{
          fontFamily: 'var(--mono)', fontSize: 'clamp(16px, 2.6vw, 26px)', fontWeight: 500, marginBottom: 26,
          minHeight: 38, animationDelay: '0.28s',
        }}>
          <span className="text-muted" style={{ fontSize: '0.7em' }}>// now brewing: </span>
          <span className="text-blue"><RotatingType items={BREW_TITLES} /></span>
        </div>

        {/* description */}
        <p className="lead hi" style={{
          maxWidth: 620, margin: '0 auto 34px', animationDelay: '0.36s',
        }}>
          I brew AI-enabled SaaS platforms and agentic workflows end to end — from
          architecture to deployment. Currently leading technical delivery on
          government &amp; enterprise projects in the UAE.
        </p>

        {/* CTAs */}
        <div className="hi" style={{
          display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', pointerEvents: 'auto',
          animationDelay: '0.44s',
        }}>
          <Magnetic>
            <button className="btn btn-primary" onClick={() => go('contact')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16v12H4zM4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              place an order
            </button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <button className="btn btn-ghost" onClick={() => go('projects')}>
              view the menu
              <span style={{ fontSize: 16 }}>↓</span>
            </button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <button className="btn btn-ghost" onClick={onOpenTerminal} style={{ color: 'var(--muted)' }}>
              <span className="text-em">❯_</span> open terminal
            </button>
          </Magnetic>
        </div>

        {/* stats */}
        <div className="hi" style={{
          marginTop: 56, display: 'flex', gap: 'clamp(28px,6vw,72px)', justifyContent: 'center',
          animationDelay: '0.55s',
        }}>
          {HERO_STATS.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', color: 'var(--text)' }}>
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mono-label" style={{ marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* playground hint + scroll cue */}
      <div style={{
        position: 'absolute', bottom: 22, left: 0, right: 0, display: 'flex', justifyContent: 'center',
        zIndex: 2, pointerEvents: 'none',
      }}>
        <span className="mono-label" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ display: 'inline-block', animation: REDUCE ? 'none' : 'floaty 2s ease-in-out infinite' }}>✦</span>
          move + click to stir the steam · press <kbd style={{ border: '1px solid var(--border-2)', borderRadius: 5, padding: '1px 6px', color: 'var(--emerald)' }}>~</kbd> for terminal
        </span>
      </div>
    </section>
  );
}
