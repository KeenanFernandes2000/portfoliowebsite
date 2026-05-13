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

## Email setup

The contact form uses [Resend](https://resend.com) to send emails.

1. Sign up at resend.com and grab an API key.
2. Copy `.env.local.example` to `.env.local` and paste your key:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
   EMAIL_FROM="Keenan Fernandes <onboarding@resend.dev>"
   ```
3. `onboarding@resend.dev` works immediately without verifying a domain — useful for dev/testing. For production, [verify your own domain](https://resend.com/docs/dashboard/domains/introduction) in Resend and update `EMAIL_FROM` to a verified address (e.g. `hello@yourdomain.com`).

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
