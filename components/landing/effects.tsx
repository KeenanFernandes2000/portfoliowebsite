'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ElementType,
  CSSProperties,
} from 'react';

// SSR-safe: only evaluate matchMedia on the client
export const REDUCE =
  typeof window !== 'undefined' &&
  window.matchMedia != null &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- theme ---------------- */
export function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState(() => {
    try {
      return (typeof window !== 'undefined' && localStorage.getItem('cb-theme')) || 'dark';
    } catch {
      return 'dark';
    }
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('cb-theme', theme); } catch {}
  }, [theme]);
  const toggle = useCallback(() => setTheme(t => (t === 'dark' ? 'light' : 'dark')), []);
  return [theme, toggle];
}

/* ---------------- in-view ---------------- */
export function useInView(opts?: IntersectionObserverInit): [React.RefObject<any>, boolean] {
  const ref = useRef<Element>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (REDUCE) { setSeen(true); return; }
    if (document.hidden) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '-40px', ...(opts || {}) });
    io.observe(el);
    const onVis = () => { if (document.hidden) setSeen(true); };
    document.addEventListener('visibilitychange', onVis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, seen];
}

/* Reveal — fade/translate children in, with optional stagger delay */
export function Reveal({
  children,
  delay = 0,
  className = '',
  style = {},
  as: Tag = 'div' as ElementType,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

/* ---------------- scramble / decode text ---------------- */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#@$%&abcdefABCDEF0123456789';

export function ScrambleText({
  text,
  className = '',
  style = {},
  start = true,
  speed = 1,
  as: Tag = 'span' as ElementType,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  start?: boolean;
  speed?: number;
  as?: ElementType;
}) {
  const [out, setOut] = useState(text);
  const frame = useRef(0);
  useEffect(() => {
    if (REDUCE || !start) { setOut(text); return; }
    let raf: number;
    const queue: { to: string; startF: number; endF: number; char: string }[] = [];
    for (let i = 0; i < text.length; i++) {
      const startF = Math.floor(Math.random() * 20 / speed);
      const endF = startF + Math.floor(Math.random() * 26 / speed) + 8;
      queue.push({ to: text[i], startF, endF, char: '' });
    }
    frame.current = 0;
    const tick = () => {
      let done = 0, str = '';
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        if (frame.current >= q.endF) { done++; str += q.to; }
        else if (frame.current >= q.startF) {
          if (!q.char || Math.random() < 0.32) q.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          str += `<span style="opacity:.55;color:var(--blue)">${q.char}</span>`;
        } else { str += q.to; }
      }
      setOut(str);
      if (done < queue.length) { frame.current++; raf = requestAnimationFrame(tick); }
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    const guarantee = setTimeout(() => { cancelAnimationFrame(raf); setOut(text); }, 2000);
    return () => { cancelAnimationFrame(raf); clearTimeout(guarantee); };
  }, [text, start]); // eslint-disable-line react-hooks/exhaustive-deps
  return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: out }} />;
}

/* ---------------- typewriter rotating ---------------- */
export function RotatingType({
  items,
  className = '',
  style = {},
}: {
  items: string[];
  className?: string;
  style?: CSSProperties;
}) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState(items[0]);
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (REDUCE) return;
    const cur = items[i];
    let t: ReturnType<typeof setTimeout>;
    if (!del && txt === cur) { t = setTimeout(() => setDel(true), 1900); }
    else if (del && txt === '') { setDel(false); setI((i + 1) % items.length); }
    else {
      t = setTimeout(() => {
        setTxt(del ? cur.slice(0, txt.length - 1) : cur.slice(0, txt.length + 1));
      }, del ? 34 : 62);
    }
    return () => clearTimeout(t);
  }, [txt, del, i, items]);
  return <span className={className} style={style}>{txt}<span className="blink">▍</span></span>;
}

/* ---------------- count up ---------------- */
export function CountUp({
  value,
  suffix = '',
  prefix = '',
  className = '',
  style = {},
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [ref, seen] = useInView();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (REDUCE) { setN(value); return; }
    let raf: number;
    const s = performance.now(), dur = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - s) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setN(value * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const guarantee = setTimeout(() => { cancelAnimationFrame(raf); setN(value); }, dur + 400);
    return () => { cancelAnimationFrame(raf); clearTimeout(guarantee); };
  }, [seen, value]);
  const decimals = (String(value).split('.')[1] || '').length;
  const display = decimals ? n.toFixed(decimals) : Math.round(n);
  return <span ref={ref} className={className} style={style}>{prefix}{display}{suffix}</span>;
}

/* ---------------- magnetic ---------------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = '',
  style = {},
  ...rest
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (REDUCE) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ display: 'inline-flex', transition: 'transform 0.3s var(--ease)', ...style }}
      {...rest}
    >
      {children}
    </span>
  );
}

/* ---------------- tilt card ---------------- */
export function Tilt({
  children,
  className = '',
  style = {},
  max = 9,
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (REDUCE) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform 0.4s var(--ease)', transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </div>
  );
}

/* renders a Tilt when enabled, otherwise a plain div */
export function MaybeTilt({
  on = true,
  children,
  max,
  ...rest
}: {
  on?: boolean;
  children: React.ReactNode;
  max?: number;
  [key: string]: any;
}) {
  if (!on) {
    return <div {...rest}>{children}</div>;
  }
  return <Tilt max={max} {...rest}>{children}</Tilt>;
}

/* ============================================================
   SteamField — interactive particle canvas
   ============================================================ */
export function SteamField({ className = '', style = {} }: { className?: string; style?: CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let parts: any[] = [];
    let raf: number;
    const mouse = { x: -9999, y: -9999, active: false };
    const GLYPH = ['{', '}', '(', ')', ';', '/', '<', '>', '·', '0', '1', '*', '+', '=', '∴', '•'];

    function colors() {
      const cs = getComputedStyle(document.documentElement);
      return {
        blue: cs.getPropertyValue('--blue-ink').trim() || '#5b8cff',
        em: cs.getPropertyValue('--emerald').trim() || '#22c79a',
        crema: cs.getPropertyValue('--crema').trim() || '#e0a667',
        alpha: parseFloat(cs.getPropertyValue('--steam-alpha')) || 0.8,
      };
    }
    let COL = colors();

    function resize() {
      const r = wrap.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      COL = colors();
      const target = Math.min(150, Math.floor(W * H / 9000));
      if (parts.length < target) for (let i = parts.length; i < target; i++) parts.push(spawn(true));
      else parts = parts.slice(0, target);
    }

    function spawn(anywhere: boolean) {
      const palette = [COL.blue, COL.em, COL.crema];
      const isGlyph = Math.random() < 0.42;
      return {
        x: anywhere ? Math.random() * W : (W * 0.5 + (Math.random() - 0.5) * W * 0.5),
        y: anywhere ? Math.random() * H : H + 10,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(0.18 + Math.random() * 0.5),
        size: isGlyph ? 9 + Math.random() * 8 : 1.1 + Math.random() * 2.4,
        glyph: isGlyph ? GLYPH[(Math.random() * GLYPH.length) | 0] : null,
        c: palette[(Math.random() * palette.length) | 0],
        life: 0, max: 200 + Math.random() * 260,
        phase: Math.random() * Math.PI * 2,
        sway: 0.3 + Math.random() * 0.8,
        a: 0,
      };
    }

    function step() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.life++;
        p.phase += 0.01;
        p.x += p.vx + Math.sin(p.phase) * p.sway * 0.25;
        p.y += p.vy;
        const lp = p.life / p.max;
        p.a = Math.sin(Math.min(1, lp) * Math.PI) * COL.alpha;
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const d = Math.sqrt(d2) || 1, f = (1 - d / 118) * 1.5;
            p.x += (dx / d) * f * 3.2;
            p.y += (dy / d) * f * 3.2;
          }
        }
        if (p.y < -30 || p.life > p.max || p.x < -40 || p.x > W + 40) { parts[i] = spawn(false); continue; }
        ctx.globalAlpha = p.a;
        if (p.glyph) {
          ctx.fillStyle = p.c;
          ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
          ctx.fillText(p.glyph, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.c;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(step);
    }

    function burst(x: number, y: number) {
      const palette = [COL.blue, COL.em, COL.crema];
      for (let i = 0; i < 26; i++) {
        const ang = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 3.5;
        parts.push({
          x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 0.5,
          size: 1.4 + Math.random() * 2.6,
          glyph: Math.random() < 0.3 ? GLYPH[(Math.random() * GLYPH.length) | 0] : null,
          c: palette[(Math.random() * palette.length) | 0],
          life: 0, max: 50 + Math.random() * 40, phase: 0, sway: 0.4, a: 0,
        });
      }
      if (parts.length > 320) parts = parts.slice(-320);
    }

    const move = (e: any) => {
      const r = wrap.getBoundingClientRect();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
      mouse.x = cx; mouse.y = cy; mouse.active = true;
    };
    const leave = () => { mouse.active = false; mouse.x = -9999; };
    const click = (e: any) => {
      const r = wrap.getBoundingClientRect();
      burst(
        (e.clientX || (e.touches && e.touches[0].clientX)) - r.left,
        (e.clientY || (e.touches && e.touches[0].clientY)) - r.top,
      );
    };

    resize();
    if (!REDUCE) step();
    else ctx.clearRect(0, 0, W, H);
    window.addEventListener('resize', resize);
    wrap.addEventListener('pointermove', move);
    wrap.addEventListener('pointerleave', leave);
    wrap.addEventListener('pointerdown', click);
    const themeObs = new MutationObserver(() => { COL = colors(); });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      wrap.removeEventListener('pointermove', move);
      wrap.removeEventListener('pointerleave', leave);
      wrap.removeEventListener('pointerdown', click);
      themeObs.disconnect();
    };
  }, []);
  return (
    <div ref={wrapRef} className={className} style={{ position: 'absolute', inset: 0, ...style }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
