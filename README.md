# Ajay C — Portfolio

A production-quality personal portfolio site. Single-page, dark-mode, with
Linear/Vercel/Stripe-grade interactive animations powered by Framer Motion.

## Tech stack

- **Next.js 14** (App Router, TypeScript, fully static prerender)
- **Tailwind CSS** (custom design tokens)
- **Framer Motion** for every animation
- **next/font** — Inter (headings/body) + JetBrains Mono (code/labels)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
app/
  layout.tsx          # fonts, SEO metadata, global chrome (cursor, progress, nav)
  page.tsx            # section composition
  globals.css         # design tokens + base styles
  icon.svg            # favicon
components/
  Hero.tsx            # two-column hero + cycling typewriter
  Terminal.tsx        # macOS terminal with staggered typing
  Skills.tsx          # 4 grouped skill cards, staggered chips
  Projects.tsx        # filterable grid (layoutId underline)
  ProjectCard.tsx     # hover lift + domain glow
  ProjectModal.tsx    # deep-dive drawer (AnimatePresence)
  Experience.tsx
  Timeline.tsx        # SVG pathLength draw-on-scroll line
  SDCContributions.tsx# expandable contributions grid
  Patent.tsx          # full-width banner, spring slide-in
  Achievements.tsx    # 3D rotateY flip-in badges
  Certifications.tsx  # horizontal scroll (mobile) / grid (desktop)
  Contact.tsx
  Navbar.tsx          # frosted glass, hide-on-scroll-down
  ScrollProgress.tsx  # top progress bar
  CustomCursor.tsx    # dot cursor, recolours per section
  SectionHeading.tsx  # word-clip reveal headings
data/
  site.ts             # name, contact, socials, résumé path
  skills.ts           # 4 domain groups
  projects.ts         # 8 featured projects
  experience.ts       # Datamyth + SDC (with 5 contributions)
  certifications.ts   # from résumé
  achievements.ts     # hackathon finals
lib/
  animations.ts       # reusable Framer Motion variants
  domains.ts          # domain → accent colour system
  useActiveSection.ts # tracks active section for cursor/nav
public/
  Ajay-C-Resume.pdf   # served by the "Download Résumé" button
```

## Content to review / customise

All copy lives in `data/`. A few things worth a look before deploying:

- **Project repo / demo links** — every project card's GitHub button points to
  `github.com/Ajayyy00` (the profile) as a placeholder, since per-repo URLs
  weren't available. Add real `github` / `demo` URLs per project in
  `data/projects.ts`.
- **Contact email** — set to `ak.arttoday@gmail.com` (per the brief). The résumé
  lists `aj13ay47@gmail.com`; change in `data/site.ts` if you prefer that.
- **metadataBase** in `app/layout.tsx` is `https://ajay-c.dev` — update to your
  real domain for correct Open Graph URLs.

## Design tokens

| Token        | Value     | Use                         |
| ------------ | --------- | --------------------------- |
| bg           | `#0A0A0F` | page background             |
| surface      | `#111117` | cards                       |
| border       | `#1E1E2E` | borders                     |
| text         | `#E4E4ED` | primary text                |
| text-muted   | `#6B6B80` | secondary text              |
| ai (blue)    | `#3B82F6` | AI / primary                |
| fullstack    | `#10B981` | Full-stack / success        |
| security     | `#F59E0B` | Security / warning          |
| systems      | `#8B5CF6` | Systems / hardware          |
```
