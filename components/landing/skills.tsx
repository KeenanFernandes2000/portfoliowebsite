'use client';

import React from 'react';
import { REDUCE, Reveal } from './effects';

const SKILL_GROUPS = [
  { category: 'Languages', tagline: 'the beans', skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'PHP', 'Java'] },
  { category: 'Frontend', tagline: 'the latte art', skills: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query', 'Bootstrap'] },
  { category: 'Backend & Database', tagline: 'the espresso shot', skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Pinecone', 'REST APIs'] },
  { category: 'AI / LLM', tagline: 'the secret syrup', skills: ['LangChain', 'LangGraph', 'OpenAI API', 'Anthropic API', 'Ollama', 'AI Chatbots', 'Voice Agents', 'Agentic Workflows'] },
  { category: 'Cloud & DevOps', tagline: 'the roastery', skills: ['Docker', 'Dokploy', 'AWS', 'Azure', 'Object Storage', 'CI/CD', 'Production Support'] },
];

const ALL_SKILLS = SKILL_GROUPS.flatMap(g => g.skills);

function SkillTicker() {
  if (REDUCE) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {ALL_SKILLS.map(s => <span key={s} className="chip" style={{ borderRadius: 99 }}>{s}</span>)}
      </div>
    );
  }
  const doubled = [...ALL_SKILLS, ...ALL_SKILLS];
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '4px 0' }}>
      <div style={{ display: 'flex', gap: 12, width: 'max-content', animation: 'marquee 46s linear infinite' }}>
        {doubled.map((s, i) => (
          <span key={s + i} className="chip" style={{ borderRadius: 99, fontSize: 13 }}>{s}</span>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 90, background: 'linear-gradient(90deg, var(--bg), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 90, background: 'linear-gradient(270deg, var(--bg), transparent)', pointerEvents: 'none' }} />
    </div>
  );
}

function MenuCard({ group, index }: { group: typeof SKILL_GROUPS[0]; index: number }) {
  return (
    <Reveal delay={index * 70}>
      <div className="card menu-card" style={{ padding: 22, height: '100%' }}
        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'color-mix(in oklab, var(--emerald) 50%, transparent)'}
        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = ''}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 4 }}>
          <h3 style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text)' }}>{group.category}</h3>
          <span style={{ flex: 1, borderBottom: '1px dotted var(--border-2)', transform: 'translateY(-3px)' }} />
          <span className="text-crema" style={{ fontFamily: 'var(--mono)', fontSize: 11, fontStyle: 'italic' }}>{group.tagline}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {group.skills.map(s => (
            <span key={s} style={{
              fontSize: 13.5, padding: '5px 11px', borderRadius: 9, color: 'var(--text)',
              border: '1px solid var(--border)', background: 'var(--surface-2)',
              transition: 'all 0.18s var(--ease)', cursor: 'default',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.borderColor = 'var(--emerald)'; (e.currentTarget as HTMLSpanElement).style.color = 'var(--emerald)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLSpanElement).style.color = 'var(--text)'; }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <Reveal><span className="kicker">03 · the menu</span></Reveal>
            <Reveal delay={60}><h2 className="h2" style={{ marginTop: 18 }}>Tools of the trade</h2></Reveal>
          </div>
          <Reveal delay={100}>
            <span className="mono-label" style={{ textTransform: 'none', letterSpacing: '0.04em' }}>// freshly ground daily</span>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div style={{ margin: '34px 0 40px', padding: '18px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <SkillTicker />
          </div>
        </Reveal>

        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {SKILL_GROUPS.map((g, i) => <MenuCard key={g.category} group={g} index={i} />)}
        </div>
      </div>
    </section>
  );
}
