# Meraki 2026 — FIIB International Business Plan Competition

Production landing page for Meraki 2026, built with Next.js 15 (App Router),
TypeScript, Tailwind CSS, GSAP + ScrollTrigger, and Lenis for smooth scroll.

**Design direction:** dark theme throughout, editorial mixed typography
(Urbanist as the workhorse sans, Merriweather italic reserved for emphasis
words within a line), lighter font weights, coral-led palette with purple
only as a trailing accent. Art direction and interaction patterns adapted
from a reference site the client supplied (lukebaffait.com) — reinterpreted
with Meraki's own content, brand colors, and logo, not copied wholesale.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**, strict mode
- **Tailwind CSS** — brand tokens (colors, fonts, gradients) defined in `tailwind.config.ts`
- **GSAP + ScrollTrigger** — pinned scroll storytelling (Why Participate, How It Works), scroll-driven progress line (Key Dates)
- **Lenis** — smooth scroll, wired to GSAP's ticker
- **lucide-react** — icons
- **next/font/google** — Merriweather (primary/serif, italic emphasis only) + Urbanist (secondary/sans, dominant everywhere else), self-hosted at build time (no runtime Google Fonts request)

No Three.js / WebGL dependency — the hero's "idea → momentum → stage" visual
and the Why Participate particle formations are lightweight Canvas2D, so
there's no 3D bundle cost and no WebGL fallback to worry about.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

`next build` requires network access (to fetch Merriweather/Urbanist from
Google Fonts once, at build time, via `next/font/google`) — this works out
of the box on Vercel. If you build somewhere without internet access, the
font fetch step will fail; that's expected and not a bug in the app code.

## Deploying (GitHub → Vercel)

1. Push this repository to GitHub.
2. In Vercel, "Import Project" → select the repo → framework preset
   **Next.js** is auto-detected → Deploy.
3. No environment variables are required.
4. Before going live, update `SITE_URL` in `app/layout.tsx` to the real
   production domain (currently a placeholder:
   `https://meraki2026.fiib.edu.in`) so Open Graph, canonical, and schema
   URLs are correct.

## Project structure

```
/app
  layout.tsx        – fonts, metadata, JSON-LD (Organization/Event/FAQPage)
  page.tsx          – assembles all sections
  globals.css       – dark-first tokens, .em italic-emphasis utility, dot-matrix texture, grain

/components
  Navbar.tsx         – always-dark nav + mobile full-screen menu
  SectionIndicator.tsx – persistent right-edge label showing the section in view
  Hero.tsx           – mixed-typography headline / countdown / CTA
  HeroVisual.tsx     – Canvas2D "idea → momentum → stage" particle trajectory
  Countdown.tsx      – live JS countdown to 23 Oct 2026, event-state message after
  About.tsx          – mixed-typography "Your idea. Your stage. Your shot." transition
  WhyParticipate.tsx – pinned scroll story (desktop) / swipeable carousel (mobile)
  PhaseVisual.tsx    – Canvas2D particle formation that morphs cone → rings → burst
                        across the three Why Participate phases, driven by scroll
  Tracks.tsx         – Prize & Tracks: two hover-interactive panels + prize table
  Investors.tsx      – Past Investors as a clean row-based data table
  Timeline.tsx       – Key Dates, scroll-driven gradient progress line, TBC placeholders preserved
  HowItWorks.tsx     – vertical reel + ribbon accent + crossfading preview panel (desktop) / stepper (mobile)
  FAQ.tsx            – accessible accordion
  FinalCTA.tsx       – climax section
  Footer.tsx         – contact details, big repeated wordmark, dot-matrix texture

  /ui
    Button.tsx         – primary/outline variants, arrow micro-interaction
    Logo.tsx           – logomark / full lockup, real brand PNG assets via next/image
    Em.tsx             – inline italic-serif emphasis wrapper for mixed-typography lines
    SectionLabel.tsx   – eyebrow/kicker used across sections
    MagneticButton.tsx – cursor-following CTA wrapper (desktop only)
    AnimatedText.tsx   – scroll-reveal + staggered word-reveal primitives

/lib
  utils.ts           – cn() helper, single source of truth for event date/venue

/public
  logo-black.png / logo-white.png         – full lockup, official brand asset
  logomark-black.png / logomark-white.png – standalone mark, cropped from the same asset
  favicon.png                              – generated from the logomark
```

## The mixed-typography pattern

The recurring "one word in italic serif, the rest in sans" treatment lives
in two places:

- The `.em` utility class in `globals.css` (Merriweather, italic, 400 weight)
- The `<Em>` component in `components/ui/Em.tsx`, a thin wrapper around it

Usage looks like:

```tsx
<h2 className="font-sans text-4xl font-normal">
  Sharpen Your <span className="em">Pitch</span>
</h2>
```

Applied throughout: the hero headline, About, Why Participate card titles,
Tracks taglines, Timeline's TBC dates, FAQ heading, Investors heading, and
the Final CTA.

## Content source of truth

All copy, dates, prize figures, and contact details come directly from the
files supplied for this build (the original brand guide and landing-page
structure documents, plus the revised design-direction PDF). Nothing was
invented. Specifically:

- **Timeline dates** marked "Date to be confirmed" / "Application deadline"
  in the source are preserved as-is — do not replace with guessed dates.
- **Past Investors** names are taken from the official FIIB Meraki
  sponsorship page screenshot embedded in the structure document, rendered
  as a clean data-table list.
- **Prize money** figures are taken from the official prize-money screenshot
  embedded in the same document — not fabricated.
- **Instagram** is marked "TBC" in the footer, matching the source.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `address`)
- Visible focus states on all interactive elements
- FAQ and Tracks accordions use `aria-expanded` / `aria-controls`
- Countdown uses `role="timer"` with a readable `aria-label`
- All motion respects `prefers-reduced-motion` (Lenis, GSAP ScrollTrigger,
  and CSS transitions all check/short-circuit)

## Logo assets

`public/logo-*.png` and `public/logomark-*.png` are cropped directly from
the brand PNG supplied for this build (trimmed to remove excess padding,
plus a generated off-white version for dark backgrounds — no recoloring of
the mark's actual ink). `components/ui/Logo.tsx` reads from these files via
`next/image`; every call site (Navbar, Footer, favicon) goes through that
one component, so swapping in a future vector/SVG source is a one-file change.
