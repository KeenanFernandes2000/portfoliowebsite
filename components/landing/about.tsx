'use client';

import React from 'react';
import { Reveal, useInView, MaybeTilt } from './effects';

const ABOUT_INGREDIENTS = [
  { pct: '40%', label: 'Full-Stack', desc: 'End-to-end ownership — DB schema to pixel-perfect UI.', icon: 'code' },
  { pct: '30%', label: 'AI / LLM', desc: 'LangChain, LangGraph, voice agents, agentic workflows.', icon: 'brain' },
  { pct: '20%', label: 'Cloud & Infra', desc: 'AWS, Azure, Docker, Dokploy — production-grade deploys.', icon: 'server' },
  { pct: '10%', label: 'Technical Lead', desc: 'Client-facing delivery, junior mentor, cross-team glue.', icon: 'users' },
];

function IngIcon({ name }: { name: string }) {
  const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'code') return <svg {...p}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>;
  if (name === 'brain') return <svg {...p}><path d="M12 5a3 3 0 1 0-5.99.14A3 3 0 0 0 4 10a3 3 0 0 0 1.5 5.5A2.5 2.5 0 0 0 12 18m0-13a3 3 0 1 1 5.99.14A3 3 0 0 1 20 10a3 3 0 0 1-1.5 5.5A2.5 2.5 0 0 1 12 18M12 5v13" /></svg>;
  if (name === 'server') return <svg {...p}><rect x="2" y="3" width="20" height="8" rx="2" /><rect x="2" y="13" width="20" height="8" rx="2" /><path d="M6 7h.01M6 17h.01" /></svg>;
  return <svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}

function BlendBar({ pct, delay }: { pct: string; delay: number }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} style={{
      height: '100%', width: seen ? pct : '0%',
      background: 'linear-gradient(90deg, var(--blue), var(--emerald))',
      borderRadius: 99, transition: `width 1s var(--ease-out) ${delay}ms`,
    }} />
  );
}

export function About({ tilt = true }: { tilt?: boolean }) {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <Reveal><span className="kicker">01 · the house blend</span></Reveal>
        <Reveal delay={60}>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>
            Building at the intersection of<br />
            <span className="grad">AI and great software.</span>
          </h2>
        </Reveal>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, marginTop: 56, alignItems: 'start' }}>
          {/* prose */}
          <div>
            <Reveal delay={80}>
              <div className="mono-label" style={{ marginBottom: 18 }}>// roast notes</div>
            </Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Reveal delay={120}>
                <p className="lead">
                  I&apos;m a full-stack engineer based in the UAE, specialising in
                  AI-enabled SaaS platforms and agentic workflows. I love owning products
                  end to end — from database design and API architecture to polished
                  frontends and production deploys on <span style={{ color: 'var(--text)' }}>AWS</span> and <span style={{ color: 'var(--text)' }}>Azure</span>.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <p className="lead">
                  At <span style={{ color: 'var(--text)', fontWeight: 600 }}>Potential FZ LLC</span> I lead technical delivery on
                  government &amp; enterprise projects. Most notably I built and scaled{' '}
                  <span className="text-em" style={{ fontWeight: 600 }}>VX-Academy</span> for the Department of Culture &amp;
                  Tourism – Abu Dhabi to <span style={{ color: 'var(--text)' }}>20,000+ users</span>, cutting peak-load DB
                  resource usage by <span className="text-crema" style={{ fontWeight: 600 }}>over 80%</span> through query
                  optimisation and app-level caching.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p className="lead">
                  Off the clock I&apos;m drawn to hardware — kinetic sand tables, AR indoor
                  navigation, smart IoT devices — anywhere software meets the physical
                  world. I hold a <span style={{ color: 'var(--text)', fontWeight: 600 }}>First Class Honours BEng</span> from
                  Middlesex University (4.25 GPA).
                </p>
              </Reveal>
            </div>

            <Reveal delay={300}>
              <div style={{ marginTop: 30, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['☕ caffeinated', '📍 UAE', '🌙 night-shift commits', '🔧 hardware tinkerer'].map(t => (
                  <span key={t} className="chip" style={{ borderRadius: 99 }}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ingredient breakdown */}
          <Reveal delay={140}>
            <MaybeTilt on={tilt} max={5}>
              <div className="card" style={{ padding: 26, position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none',
                  background: 'radial-gradient(120% 80% at var(--mx,80%) var(--my,0%), color-mix(in oklab, var(--crema) 18%, transparent), transparent 60%)',
                  transition: 'background .2s',
                }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                    <div className="dots"><i /><i /><i /></div>
                    <span className="mono-label">blend.recipe</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {ABOUT_INGREDIENTS.map((ing, i) => (
                      <div key={ing.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                          display: 'grid', placeItems: 'center', color: 'var(--emerald)',
                          background: 'color-mix(in oklab, var(--emerald) 12%, transparent)',
                          border: '1px solid color-mix(in oklab, var(--emerald) 26%, transparent)',
                        }}><IngIcon name={ing.icon} /></div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                            <span style={{ fontWeight: 600, fontSize: 14.5, color: 'var(--text)' }}>{ing.label}</span>
                            <span className="text-crema" style={{ fontFamily: 'var(--mono)', fontSize: 12.5, fontWeight: 700 }}>{ing.pct}</span>
                          </div>
                          <p style={{ color: 'var(--muted)', fontSize: 12.5, lineHeight: 1.55, marginTop: 2 }}>{ing.desc}</p>
                          <div style={{ height: 4, borderRadius: 99, background: 'var(--surface-3)', marginTop: 8, overflow: 'hidden' }}>
                            <BlendBar pct={ing.pct} delay={i * 120} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hr" style={{ margin: '20px 0 14px' }} />
                  <p className="mono-label" style={{ textTransform: 'none', letterSpacing: '0.04em', color: 'var(--faint)', fontSize: 11.5 }}>
                    * roasted nightly · best served in production
                  </p>
                </div>
              </div>
            </MaybeTilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
