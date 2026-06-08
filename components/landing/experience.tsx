'use client';

import React, { useState } from 'react';
import { Reveal } from './effects';

const JOBS = [
  {
    company: 'Potential FZ LLC',
    role: 'Full-Stack AI Product Engineer / Technical Lead',
    period: 'Nov 2023 – Present',
    year: '2023',
    location: 'UAE',
    featured: true,
    featuredLabel: 'VX-Academy — featured pour',
    bullets: [
      'Built full-stack SaaS platforms, AI chatbots, voice agents, and agentic workflows across client and internal projects.',
      'Led development of VX-Academy for the Department of Culture & Tourism – Abu Dhabi: a learning & certification platform for frontline tourism workers.',
      'Scaled VX-Academy to ~4–5k active / ~20k total users; cut peak-load DB resource usage by >80% via query optimisation, indexing, and app-level caching.',
      'Designed AI concierge & AI examiner features: course guidance, progress tracking, role-play assessment, data sovereignty.',
      'Built an AI self-service chatbot SaaS with Stripe-integrated subscription workflows.',
      'Owned architecture across most projects: DB design, AI workflow design, deployment, and infra.',
      'Replaced manual deploys with Docker-based workflows via Dokploy; production support on AWS and Azure.',
      'Direct technical contact for enterprise & government clients; mentored junior developers.',
    ],
    tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'LangChain', 'LangGraph', 'Docker', 'AWS', 'Azure', 'Stripe', 'Redis', 'Pinecone'],
  },
  {
    company: 'Emicool',
    role: 'Data Science Intern',
    period: 'Oct 2022 – Jun 2023',
    year: '2022',
    location: 'UAE',
    featured: false,
    featuredLabel: '',
    bullets: [
      'Preprocessed & migrated Oracle Fusion data; saved ~120 hours of manual work via Alteryx, Python, Pandas, NumPy automation.',
      'Migrated Power BI dashboards to Incorta — built 80+ dashboards across 5 departments with ETL pipelines.',
      'Processed >1 billion plant sensor records/day with Apache Spark for RSB regulatory compliance.',
      'Built Python automation: file consolidation, PDF bill extraction, review scraping, SQL Server transfers.',
      'Built feature-engineering pipelines on 50+ variables; trained Random Forest & Decision Tree models predicting complaints at 70% accuracy.',
    ],
    tags: ['Python', 'Pandas', 'NumPy', 'Spark', 'Alteryx', 'SQL', 'Power BI', 'Incorta', 'Oracle Fusion'],
  },
  {
    company: 'The Assembly',
    role: 'Team Lead & Lab Incharge',
    period: 'May 2021 – Jul 2022',
    year: '2021',
    location: 'Dubai, UAE',
    featured: false,
    featuredLabel: '',
    bullets: [
      'Led interns coordinating tech, media, and event projects using Trello.',
      'Directed, edited & produced 50+ YouTube videos (Premiere Pro, OBS Studio).',
      'Maintained & upgraded 7 legacy lab projects, including 3D-printed hardware repairs.',
      'Designed a portable livestreaming setup for multiple In5 Dubai locations.',
      'Contributed to 2 projects showcased at GITEX Technology Week 2021.',
    ],
    tags: ['Team Leadership', 'Premiere Pro', 'OBS', '3D Printing', 'GITEX 2021'],
  },
  {
    company: 'Ookiyo',
    role: 'Remote Web Developer',
    period: 'Dec 2020 – Dec 2021',
    year: '2020',
    location: 'Remote',
    featured: false,
    featuredLabel: '',
    bullets: [
      'Built responsive websites with HTML, CSS, JavaScript, WordPress, and HubSpot.',
      'Set up Zapier automation workflows; applied SEO best practices and cross-browser support.',
    ],
    tags: ['HTML/CSS', 'JavaScript', 'WordPress', 'HubSpot', 'Zapier', 'SEO'],
  },
];

function JobCard({ job, index }: { job: typeof JOBS[0]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  return (
    <article className="card" style={{
      padding: 24, position: 'relative', textAlign: 'left',
      borderColor: job.featured ? 'color-mix(in oklab, var(--emerald) 40%, transparent)' : undefined,
      boxShadow: job.featured ? '0 0 0 1px color-mix(in oklab, var(--emerald) 20%, transparent), 0 20px 50px -28px var(--emerald)' : undefined,
    }}>
      {job.featured && (
        <div style={{ position: 'absolute', top: -12, left: 22 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--mono)', fontSize: 11.5,
            color: 'var(--emerald)', background: 'var(--bg)', border: '1px solid color-mix(in oklab, var(--emerald) 35%, transparent)',
            borderRadius: 99, padding: '4px 11px', fontWeight: 600,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--emerald)' }} />{job.featuredLabel}
          </span>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 14 }}>
        <div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--muted)', marginBottom: 5 }}>{job.period} · {job.location}</p>
          <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{job.role}</h3>
          <p className="text-em" style={{ fontSize: 13.5, fontWeight: 600, marginTop: 3 }}>{job.company}</p>
        </div>
        <button onClick={() => setExpanded(e => !e)} aria-expanded={expanded}
          style={{
            flexShrink: 0, width: 32, height: 32, borderRadius: 9, display: 'grid', placeItems: 'center',
            border: '1px solid ' + (expanded ? 'var(--emerald)' : 'var(--border)'),
            color: expanded ? 'var(--emerald)' : 'var(--muted)',
            transition: 'all 0.2s var(--ease)',
          }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s var(--ease)' }}>
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {job.tags.map(t => <span key={t} className="chip">{t}</span>)}
      </div>
      <div style={{
        display: 'grid', gridTemplateRows: expanded ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.4s var(--ease)', overflow: 'hidden',
      }}>
        <div style={{ minHeight: 0, overflow: 'hidden' }}>
          <ul style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {job.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: 11, fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6 }}>
                <span style={{ marginTop: 8, width: 5, height: 5, borderRadius: 99, background: 'var(--emerald)', flexShrink: 0 }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="wrap">
        <Reveal><span className="kicker">02 · the brewing log</span></Reveal>
        <Reveal delay={60}>
          <h2 className="h2" style={{ margin: '18px 0 56px' }}>
            Where I&apos;ve worked<br /><span className="grad">and what I brewed.</span>
          </h2>
        </Reveal>

        <div className="exp-timeline" style={{ position: 'relative' }}>
          {/* center spine */}
          <div className="exp-spine" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'var(--border)', transform: 'translateX(-50%)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {JOBS.map((job, i) => {
              const left = i % 2 === 0;
              return (
                <div key={job.company} className="exp-row" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: 40, alignItems: 'start' }}>
                  <div className="exp-card-cell" style={{ gridColumn: left ? 1 : 3, gridRow: 1 }}>
                    <Reveal delay={i * 60}><JobCard job={job} index={i} /></Reveal>
                  </div>
                  <div className="exp-marker" style={{ gridColumn: 2, gridRow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingTop: 20, position: 'relative', zIndex: 2 }}>
                    <span style={{ width: 13, height: 13, borderRadius: 99, border: '2px solid var(--emerald)', background: 'var(--bg)', boxShadow: '0 0 16px -2px var(--emerald)' }} />
                    <span className="text-em" style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em' }}>{job.year}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
