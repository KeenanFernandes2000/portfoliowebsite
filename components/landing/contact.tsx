'use client';

import React, { useState } from 'react';
import { Reveal } from './effects';

const CHANNELS = [
  { kind: 'linkedin', label: 'LinkedIn', value: '@keenan-fernandes', href: 'https://www.linkedin.com/in/keenan-fernandes-9906b4171/' },
  { kind: 'github', label: 'GitHub', value: '@KeenanFernandes2000', href: 'https://github.com/KeenanFernandes2000' },
  { kind: 'mail', label: 'Email', value: 'keenan030900@gmail.com', href: 'mailto:keenan030900@gmail.com' },
  { kind: 'phone', label: 'Phone', value: '+971 50-113-3872', href: 'tel:+971501133872' },
];

function ChIcon({ kind }: { kind: string }) {
  const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (kind === 'github') return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z" /></svg>;
  if (kind === 'linkedin') return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C21.4 8.65 22 11.3 22 14.4V21h-4v-5.8c0-1.38-.02-3.16-1.93-3.16-1.93 0-2.23 1.5-2.23 3.06V21h-4z" /></svg>;
  if (kind === 'mail') return <svg {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>;
  return <svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>;
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} style={{ display: 'block' }}>
      <span className="mono-label" style={{ display: 'block', marginBottom: 8 }}>{label}</span>
      {children}
    </label>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));
  const valid = form.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.message.trim().length > 3;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || status === 'submitting') return;
    setStatus('submitting');
    setTimeout(() => {
      const subject = encodeURIComponent(`New order from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
      window.location.href = `mailto:keenan030900@gmail.com?subject=${subject}&body=${body}`;
      setStatus('success');
    }, 900);
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="wrap">
        <Reveal><span className="kicker">06 · place an order</span></Reveal>
        <Reveal delay={60}>
          <h2 className="h2" style={{ marginTop: 18 }}>Let&apos;s build something <span className="grad">remarkable.</span></h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="lead" style={{ maxWidth: 620, marginTop: 14 }}>
            Open to senior engineering roles, tech-lead positions, and interesting freelance
            projects — especially in AI, SaaS, or government tech. Drop a note below or reach out directly.
          </p>
        </Reveal>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 28, marginTop: 48, alignItems: 'start' }}>
          {/* channels */}
          <Reveal delay={120}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CHANNELS.map(c => (
                <a key={c.kind} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="card" style={{ display: 'flex', alignItems: 'center', gap: 15, padding: 17 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'color-mix(in oklab, var(--emerald) 50%, transparent)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = ''; (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}>
                  <span style={{ width: 40, height: 40, borderRadius: 11, display: 'grid', placeItems: 'center', color: 'var(--emerald)', background: 'color-mix(in oklab, var(--emerald) 12%, transparent)', flexShrink: 0 }}>
                    <ChIcon kind={c.kind} />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span className="mono-label" style={{ display: 'block' }}>{c.label}</span>
                    <span style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          {/* order ticket form */}
          <Reveal delay={170}>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* ticket header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', borderBottom: '1px dashed var(--border-2)', background: 'var(--surface-2)' }}>
                <div className="dots"><i /><i /><i /></div>
                <span className="mono-label">order_ticket.sh</span>
              </div>
              {status === 'success' ? (
                <div style={{ padding: '56px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                  <span style={{ width: 60, height: 60, borderRadius: 99, display: 'grid', placeItems: 'center', color: 'var(--emerald)', background: 'color-mix(in oklab, var(--emerald) 14%, transparent)' }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 6, fontFamily: 'var(--display)' }}>Order received! ☕</p>
                    <p className="lead" style={{ fontSize: 14 }}>Your mail draft is ready — hit send and I&apos;ll get back to you within a few days.</p>
                  </div>
                  <button className="btn btn-ghost" style={{ marginTop: 6 }}
                    onClick={() => { setForm({ name: '', email: '', message: '' }); setStatus('idle'); }}>place another</button>
                </div>
              ) : (
                <form onSubmit={submit} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field label="name" id="c-name"><input id="c-name" className="inp" value={form.name} onChange={set('name')} placeholder="Jane Doe" /></Field>
                    <Field label="email" id="c-email"><input id="c-email" type="email" className="inp" value={form.email} onChange={set('email')} placeholder="you@company.com" /></Field>
                  </div>
                  <Field label="the brief" id="c-msg">
                    <textarea id="c-msg" className="inp" rows={5} value={form.message} onChange={set('message')} placeholder="Tell me about the role, project, or idea…" style={{ resize: 'vertical', minHeight: 120 }} />
                  </Field>
                  <button type="submit" disabled={!valid || status === 'submitting'} className="btn btn-primary"
                    style={{ alignSelf: 'flex-start', opacity: valid && status !== 'submitting' ? 1 : 0.5, cursor: valid && status !== 'submitting' ? 'pointer' : 'not-allowed' }}>
                    {status === 'submitting'
                      ? <><span style={{ display: 'inline-block', width: 15, height: 15, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: 99, animation: 'spin 0.7s linear infinite' }} /> brewing…</>
                      : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg> send order</>}
                  </button>
                  <p className="mono-label" style={{ textTransform: 'none', letterSpacing: '0.03em', fontSize: 11, color: 'var(--faint)' }}>// opens a pre-filled draft in your mail client</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
