# Keenan Fernandes — Portfolio

Personal portfolio for Keenan Domnick Fernandes, Full-Stack AI Engineer.
A single-page, frontend-only site — no backend, no database.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + TypeScript
- **Plain CSS design system** (`app/globals.css`) — CSS custom properties, dark/light themes, swappable accent palettes. No Tailwind, no UI library.
- **Custom animations**, hand-rolled: interactive steam particle canvas, text scramble/decode, rotating typewriter, count-up, magnetic + 3D-tilt cards, scroll reveal, coffee pour.
- **Google Fonts** — Space Grotesk (display) + JetBrains Mono (body/mono).
- Theme + accent persisted to `localStorage`, applied pre-paint to avoid flash.

## Run locally

```bash
bun install
bun dev        # http://localhost:3000
```

## Build

```bash
bun run build
bun start
```

## Deploy (Vercel)

Push to GitHub, import the repo in Vercel — zero config. Next.js is auto-detected.

```bash
vercel --prod
```

## Structure

```
app/
  layout.tsx          # Root layout, metadata, pre-paint theme script, boot screen
  page.tsx            # Renders the landing app
  globals.css         # Entire design system (tokens, themes, accents, keyframes)
  icon.svg            # Favicon
components/landing/
  landing-app.tsx     # Root client component — assembles the page, tweaks panel, footer
  effects.tsx         # Shared hooks & motion primitives (Reveal, Scramble, Tilt, SteamField, useTheme, …)
  tweaks-panel.tsx    # Live accent/motion controls
  nav.tsx             # Sticky nav + mobile drawer + theme toggle + CoffeeMark
  hero.tsx            # Hero with steam canvas + rotating title
  about.tsx           # Bio + highlight cards
  experience.tsx      # Job timeline
  skills.tsx          # Grouped skill chips
  projects.tsx        # Project grid
  education.tsx       # Degree + certifications
  contact.tsx         # Contact section + form
  terminal.tsx        # Interactive shell overlay (toggle with ` or ~)
```

## Notes

- The contact form is currently frontend-only (no submission backend wired up).
- The `reference/` folder (gitignored) holds the original static design source and is not part of the build.
