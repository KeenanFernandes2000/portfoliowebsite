# Keenan Fernandes — Portfolio

Personal portfolio for Keenan Domnick Fernandes, Full-Stack AI Engineer.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** with custom oklch design tokens
- **shadcn/ui** for UI primitives
- **Framer Motion** for scroll-driven and entrance animations
- **next-themes** — dark mode default, light mode toggle
- **lucide-react** icons

## Run locally

```bash
bun install
bun dev        # starts on http://localhost:3000
```

## Build

```bash
bun run build
bun start
```

## Deploy (Vercel)

Push to GitHub, import the repo in Vercel — zero config needed. Next.js is auto-detected.

```bash
vercel --prod   # or use the Vercel dashboard
```

## Structure

```
app/
  layout.tsx       # Root layout, metadata, ThemeProvider
  page.tsx         # Single-page assembly
components/
  nav.tsx          # Sticky nav with mobile drawer + theme toggle
  footer.tsx
  sections/
    hero.tsx       # Animated hero with rotating title + dot grid bg
    about.tsx      # Bio paragraphs + highlight cards
    experience.tsx # Expandable job timeline
    skills.tsx     # Grouped skill chips + marquee ticker
    projects.tsx   # Hardware & SaaS project grid
    education.tsx  # Degree + certifications
    contact.tsx    # Large CTA section
```
