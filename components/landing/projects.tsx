'use client';

import React from 'react';
import { Reveal, MaybeTilt } from './effects';

const PROJECTS = [
  { title: 'Kinetic Sand Table', kind: 'hardware', icon: 'waves',
    description: 'Raspberry Pi + Arduino CNC machine that draws geometric patterns in sand with stepper motors and a steel ball — controlled via web UI.',
    tags: ['Raspberry Pi', 'Arduino', 'Python', 'CNC'] },
  { title: 'LED Infinity Mirror', kind: 'hardware', icon: 'bulb',
    description: 'Infinity mirror with addressable LED strips on an Arduino MKR WIFI 1010, reacting to audio input and web-based colour control.',
    tags: ['Arduino MKR', 'WS2812B', 'IoT', 'Web Control'] },
  { title: 'Smart Foosball Table', kind: 'hardware', icon: 'game',
    description: 'Automated score tracking via Raspberry Pi camera + computer vision; live web dashboard with full game history.',
    tags: ['Raspberry Pi', 'OpenCV', 'Python', 'CV'] },
  { title: 'Pi Photobooth', kind: 'hardware', icon: 'camera',
    description: 'Raspberry Pi photobooth with physical button trigger, live preview, and digital + print output — deployed at live events.',
    tags: ['Raspberry Pi', 'Python', 'GPIO', 'Events'] },
  { title: 'Indoor AR Navigation', kind: 'hardware', icon: 'nav',
    description: 'Android app using Unity + Vuforia to overlay AR wayfinding onto printed QR anchors — turn-by-turn indoor nav, no GPS.',
    tags: ['Android', 'Unity', 'C#', 'Vuforia', 'AR'] },
  { title: 'Real-Time OCR Reader', kind: 'hardware', icon: 'eye',
    description: 'Pi camera captures text from physical surfaces in real time; Tesseract OCR reads it aloud via pyttsx3 — an accessibility aid.',
    tags: ['Raspberry Pi', 'Tesseract', 'Python', 'A11y'] },
  { title: 'Virtual Mouse via ML', kind: 'hardware', icon: 'mouse',
    description: 'MediaPipe hand-tracking on a Raspberry Pi translates finger gestures into cursor control — no physical mouse required.',
    tags: ['Raspberry Pi', 'MediaPipe', 'Python', 'ML'] },
  { title: 'AI Chatbot SaaS Platform', kind: 'saas', icon: 'cpu', featured: true,
    description: 'Multi-tenant SaaS letting businesses embed custom AI chatbots. Stripe-integrated tiers, admin dashboard, and LLM routing.',
    tags: ['Next.js', 'LangChain', 'OpenAI', 'Stripe', 'Docker'] },
];

function ProjIcon({ name }: { name: string }) {
  const p = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'waves': return <svg {...p}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></svg>;
    case 'bulb': return <svg {...p}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4" /></svg>;
    case 'game': return <svg {...p}><path d="M6 12h4m-2-2v4M15 13h.01M18 11h.01M17.32 5H6.68a4 4 0 0 0-3.98 3.59c-.01.13-.04.31-.09.7L2.1 13.27a2.43 2.43 0 0 0 2.42 2.73c.95 0 1.81-.55 2.21-1.41l.41-.87A2 2 0 0 1 8.96 12.5h6.08a2 2 0 0 1 1.82 1.22l.41.87c.4.86 1.26 1.41 2.21 1.41a2.43 2.43 0 0 0 2.42-2.73l-.51-3.98c-.05-.39-.08-.57-.09-.7A4 4 0 0 0 17.32 5Z" /></svg>;
    case 'camera': return <svg {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" /><circle cx="12" cy="13" r="3" /></svg>;
    case 'nav': return <svg {...p}><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>;
    case 'eye': return <svg {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
    case 'mouse': return <svg {...p}><rect x="5" y="2" width="14" height="20" rx="7" /><path d="M12 6v4" /></svg>;
    default: return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></svg>;
  }
}

function ProjectCard({ p, index, tilt = true }: { p: typeof PROJECTS[0]; index: number; tilt?: boolean }) {
  return (
    <Reveal delay={(index % 4) * 60}>
      <MaybeTilt on={tilt} max={10} style={{ height: '100%' }}>
        <article className="card proj-card" style={{
          padding: 20, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
          borderColor: (p as any).featured ? 'color-mix(in oklab, var(--emerald) 38%, transparent)' : undefined,
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.55,
            background: 'radial-gradient(90% 60% at var(--mx,50%) var(--my,0%), color-mix(in oklab, var(--blue) 16%, transparent), transparent 55%)',
          }} />
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, display: 'grid', placeItems: 'center', color: 'var(--emerald)',
                background: 'color-mix(in oklab, var(--emerald) 12%, transparent)', border: '1px solid color-mix(in oklab, var(--emerald) 26%, transparent)',
              }}><ProjIcon name={p.icon} /></div>
              <span className="mono-label" style={{ fontSize: 10, color: p.kind === 'saas' ? 'var(--blue)' : 'var(--faint)' }}>
                {p.kind === 'saas' ? '◆ saas' : '◇ hardware'}
              </span>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 8 }}>{p.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>{p.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.tags.map(t => (
                <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'var(--surface-3)', color: 'var(--muted)' }}>{t}</span>
              ))}
            </div>
          </div>
        </article>
      </MaybeTilt>
    </Reveal>
  );
}

export function Projects({ tilt = true }: { tilt?: boolean }) {
  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="wrap">
        <Reveal><span className="kicker">04 · house brews</span></Reveal>
        <Reveal delay={60}><h2 className="h2" style={{ marginTop: 18 }}>Things I&apos;ve built</h2></Reveal>
        <Reveal delay={100}>
          <p className="lead" style={{ maxWidth: 560, marginTop: 14 }}>
            From AI SaaS platforms to hardware experiments — a mix of professional work and
            personal projects exploring where software meets the physical world.
          </p>
        </Reveal>

        <div className="proj-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 44 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} index={i} tilt={tilt} />)}
        </div>
      </div>
    </section>
  );
}
