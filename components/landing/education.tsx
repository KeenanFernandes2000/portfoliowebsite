'use client';

import React from 'react';
import { Reveal, CountUp } from './effects';

const CERTIFICATIONS = [
  'Astrolabs Full-Stack Bootcamp (Dec 2022)',
  'GDSC Cloud Engineering, DS & ML (May 2020)',
  'IBM Cloud Application Developer 2019 Mastery Award',
  'Dell EMC Cloud Infrastructure & Services v3.0',
  'Dell EMC Information Storage & Management',
  'Cisco CCNA Routing & Switching Essentials',
  'Cisco Cybersecurity Essentials',
  'Cisco Intro to IoT',
  'Cisco PCAP — Programming Essentials in Python',
];

export function Education() {
  return (
    <section id="education" className="section">
      <div className="wrap">
        <Reveal><span className="kicker">05 · barista training</span></Reveal>
        <Reveal delay={60}>
          <h2 className="h2" style={{ margin: '18px 0 56px' }}>
            Academic background &amp;<br /><span className="grad">credentials.</span>
          </h2>
        </Reveal>

        <div className="edu-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          {/* degree */}
          <Reveal delay={80}>
            <div className="card" style={{ padding: 28, height: '100%', borderColor: 'color-mix(in oklab, var(--emerald) 30%, transparent)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <span style={{ width: 40, height: 40, borderRadius: 11, display: 'grid', placeItems: 'center', color: 'var(--emerald)', background: 'color-mix(in oklab, var(--emerald) 12%, transparent)', border: '1px solid color-mix(in oklab, var(--emerald) 26%, transparent)' }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                </span>
                <h3 style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)' }}>Education</h3>
              </div>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', lineHeight: 1.25, marginBottom: 6, fontFamily: 'var(--display)' }}>BEng Computer Systems Engineering</h4>
              <p className="text-em" style={{ fontSize: 14, fontWeight: 600 }}>Middlesex University</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', marginTop: 4, marginBottom: 22 }}>Jan 2018 – Jul 2021 · Dubai, UAE</p>
              <div style={{ display: 'flex', gap: 14 }}>
                <div style={{ flex: 1, textAlign: 'center', padding: 16, borderRadius: 14, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <div className="display" style={{ fontSize: 22, color: 'var(--text)' }}>First Class</div>
                  <div className="mono-label" style={{ marginTop: 4 }}>honours</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: 16, borderRadius: 14, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <div className="display text-em" style={{ fontSize: 22 }}><CountUp value={4.25} /></div>
                  <div className="mono-label" style={{ marginTop: 4 }}>gpa</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* certifications */}
          <Reveal delay={150}>
            <div className="card" style={{ padding: 28, height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <span style={{ width: 40, height: 40, borderRadius: 11, display: 'grid', placeItems: 'center', color: 'var(--crema)', background: 'color-mix(in oklab, var(--crema) 14%, transparent)', border: '1px solid color-mix(in oklab, var(--crema) 28%, transparent)' }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                </span>
                <h3 style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--crema)' }}>Certifications</h3>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {CERTIFICATIONS.map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: 11, fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.45 }}>
                    <span style={{ marginTop: 7, width: 5, height: 5, borderRadius: 99, background: 'var(--crema)', flexShrink: 0 }} />{c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
