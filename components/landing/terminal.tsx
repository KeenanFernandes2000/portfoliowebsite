'use client';

import React, { useState, useEffect, useRef } from 'react';

const TERM_BANNER = [
  '  ☕  codingbarista — interactive shell  v1.0',
  '  type `help` for the menu · `exit` or ~ to close',
];

interface TermLine {
  t: string;
  color: string;
  prompt?: boolean;
}

function runCommand(raw: string, ctx: {
  toggleTheme: () => void;
  close: () => void;
  clear: () => void;
  coffee: () => void;
  goto: (id: string) => void;
}): TermLine[] | null {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const c = cmd.toLowerCase();
  const L = (s: string, color: string): TermLine => ({ t: s, color });
  switch (c) {
    case '': return [];
    case 'help': return [
      L('available commands:', 'var(--emerald)'),
      L('  whoami        who is the barista', 'var(--muted)'),
      L('  about         the house blend', 'var(--muted)'),
      L('  skills        the full menu', 'var(--muted)'),
      L('  projects      house brews', 'var(--muted)'),
      L('  experience    the brewing log', 'var(--muted)'),
      L('  stack         current toolchain', 'var(--muted)'),
      L('  socials       where to find me', 'var(--muted)'),
      L('  contact       place an order', 'var(--muted)'),
      L('  coffee        brew a fresh cup ☕', 'var(--muted)'),
      L('  theme         toggle espresso / latte', 'var(--muted)'),
      L('  goto <sec>    jump to a section', 'var(--muted)'),
      L('  clear         wipe the counter', 'var(--muted)'),
      L('  exit          close the shell', 'var(--muted)'),
    ];
    case 'whoami': return [
      L('Keenan Domnick Fernandes', 'var(--text)'),
      L('Full-Stack AI Engineer · Technical Lead @ Potential FZ LLC', 'var(--muted)'),
      L('📍 UAE · brewing AI-enabled SaaS since 2020', 'var(--crema)'),
    ];
    case 'about': return [
      L('Full-stack engineer specialising in AI-enabled SaaS & agentic workflows.', 'var(--muted)'),
      L('Owns products end to end — DB schema → API → UI → production deploys.', 'var(--muted)'),
      L('Built & scaled VX-Academy to 20,000+ users; cut DB load >80%.', 'var(--text)'),
      L('First Class Honours BEng, Middlesex University (4.25 GPA).', 'var(--muted)'),
    ];
    case 'skills': return [
      L('languages   TypeScript · JavaScript · Python · SQL · PHP · Java', 'var(--muted)'),
      L('frontend    React · Next.js · Tailwind · shadcn/ui · TanStack', 'var(--muted)'),
      L('backend     Node · Express · PostgreSQL · MongoDB · Redis · Pinecone', 'var(--muted)'),
      L('ai/llm      LangChain · LangGraph · OpenAI · Anthropic · Ollama', 'var(--emerald)'),
      L('cloud       Docker · Dokploy · AWS · Azure · CI/CD', 'var(--muted)'),
    ];
    case 'projects': return [
      L('professional:', 'var(--blue)'),
      L('  • AI Self-Service Chatbot SaaS — multi-tenant, Stripe, LLM routing', 'var(--muted)'),
      L('hardware:', 'var(--blue)'),
      L('  • Kinetic Sand Table · LED Infinity Mirror · Smart Foosball', 'var(--muted)'),
      L('  • Indoor AR Nav · Real-Time OCR Reader · Virtual Mouse (ML)', 'var(--muted)'),
      L('run `goto projects` to see them all →', 'var(--faint)'),
    ];
    case 'experience': return [
      L('2023›  Potential FZ LLC — Full-Stack AI Engineer / Tech Lead', 'var(--text)'),
      L('2022›  Emicool — Data Science Intern', 'var(--muted)'),
      L('2021›  The Assembly — Team Lead & Lab Incharge', 'var(--muted)'),
      L('2020›  Ookiyo — Remote Web Developer', 'var(--muted)'),
    ];
    case 'stack': return [
      L('$ now brewing with', 'var(--faint)'),
      L('  Next.js · TypeScript · Node · PostgreSQL · LangGraph · Docker · AWS', 'var(--emerald)'),
    ];
    case 'socials': return [
      L('github     github.com/KeenanFernandes2000', 'var(--blue)'),
      L('linkedin   linkedin.com/in/keenan-fernandes-9906b4171', 'var(--blue)'),
    ];
    case 'contact': return [
      L('email      keenan030900@gmail.com', 'var(--emerald)'),
      L('phone      +971 50-113-3872', 'var(--muted)'),
      L('run `goto contact` to place an order →', 'var(--faint)'),
    ];
    case 'coffee': {
      ctx.coffee();
      return [L('brewing a fresh cup… ☕  (watch the steam rise)', 'var(--crema)')];
    }
    case 'theme': {
      ctx.toggleTheme();
      return [L('switched roast → ' + (document.documentElement.getAttribute('data-theme') === 'dark' ? 'espresso (dark)' : 'latte (light)'), 'var(--crema)')];
    }
    case 'goto': {
      const sec = (args[0] || '').toLowerCase();
      const map: Record<string, string> = { about: 'about', work: 'experience', experience: 'experience', skills: 'skills', menu: 'skills', projects: 'projects', brews: 'projects', education: 'education', contact: 'contact', order: 'contact', top: 'hero', home: 'hero' };
      const id = map[sec];
      if (!id) return [L(`no section "${sec}". try: about, experience, skills, projects, education, contact`, 'var(--crema)')];
      ctx.goto(id); ctx.close();
      return [L(`jumping to ${id}…`, 'var(--emerald)')];
    }
    case 'sudo': return [L('nice try ☕ — permission denied (but I admire the hustle)', 'var(--crema)')];
    case 'ls': return [L('about  experience  skills  projects  education  contact', 'var(--muted)')];
    case 'exit': case 'quit': case 'close': { ctx.close(); return []; }
    case 'clear': case 'cls': { ctx.clear(); return null; }
    default: return [L(`command not found: ${c} — type \`help\``, 'var(--crema)')];
  }
}

export function Terminal({ open, onClose, toggleTheme, onCoffee }: {
  open: boolean;
  onClose: () => void;
  toggleTheme: () => void;
  onCoffee?: () => void;
}) {
  const [history, setHistory] = useState<TermLine[]>([
    { t: TERM_BANNER[0], color: 'var(--emerald)' },
    { t: TERM_BANNER[1], color: 'var(--faint)' },
  ]);
  const [input, setInput] = useState('');
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [logIdx, setLogIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const goto = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };

  useEffect(() => { if (open && inputRef.current) setTimeout(() => inputRef.current!.focus(), 60); }, [open]);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [history]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input;
    const out = runCommand(raw, { toggleTheme, close: onClose, clear: () => setHistory([]), coffee: () => onCoffee && onCoffee(), goto });
    setHistory(h => {
      const next = [...h, { t: `❯ ${raw}`, color: 'var(--text)', prompt: true }];
      if (out === null) return [];
      return [...next, ...out];
    });
    if (raw.trim()) setCmdLog(l => [...l, raw]);
    setLogIdx(-1);
    setInput('');
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCmdLog(l => {
        const ni = logIdx < 0 ? l.length - 1 : Math.max(0, logIdx - 1);
        setLogIdx(ni);
        if (l[ni] != null) setInput(l[ni]);
        return l;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCmdLog(l => {
        if (logIdx < 0) return l;
        const ni = logIdx + 1;
        if (ni >= l.length) { setLogIdx(-1); setInput(''); }
        else { setLogIdx(ni); setInput(l[ni]); }
        return l;
      });
    } else if (e.key === 'Escape') { onClose(); }
  };

  if (!open) return null;
  return (
    <div onMouseDown={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000, display: 'grid', placeItems: 'center', padding: 20,
      background: 'color-mix(in oklab, var(--bg) 55%, transparent)', backdropFilter: 'blur(7px)',
      animation: 'termfade 0.2s var(--ease)',
    }}>
      <div onMouseDown={e => e.stopPropagation()} style={{
        width: 'min(680px, 100%)', maxHeight: '70vh', display: 'flex', flexDirection: 'column',
        background: 'color-mix(in oklab, var(--surface) 96%, transparent)', border: '1px solid var(--border-2)',
        borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow), 0 0 0 1px color-mix(in oklab, var(--emerald) 14%, transparent)',
        animation: 'termpop 0.28s var(--ease-out)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="dots"><i /><i /><i /></div>
            <span className="mono-label" style={{ textTransform: 'none' }}>keenan@codingbarista: ~</span>
          </div>
          <button onClick={onClose} aria-label="Close terminal" style={{ color: 'var(--faint)', fontSize: 18, lineHeight: 1, padding: 4 }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--faint)'}>✕</button>
        </div>
        <div ref={bodyRef} onClick={() => inputRef.current && inputRef.current.focus()}
          style={{ flex: 1, overflowY: 'auto', padding: 18, fontFamily: 'var(--mono)', fontSize: 13.5, lineHeight: 1.7 }}>
          {history.map((line, i) => (
            <div key={i} style={{ color: line.color || 'var(--muted)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: line.prompt ? 8 : 0 }}>{line.t}</div>
          ))}
          <form onSubmit={submit} style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 8 }}>
            <span className="text-em" style={{ fontWeight: 700 }}>❯</span>
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}
              spellCheck={false} autoComplete="off"
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: 13.5 }} />
          </form>
        </div>
      </div>
    </div>
  );
}
