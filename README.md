# personal-website

My personal site — Next.js + TypeScript + Tailwind v4 + Framer Motion.
Dark, modern, and built to be edited from a single data file.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Deploy:** Vercel

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Where to edit content

Almost all copy lives in **`data/site.ts`**. Open it and swap placeholders for
the real stuff:

| What                                          | Where                              |
| --------------------------------------------- | ---------------------------------- |
| Name, tagline, status, email, social URLs     | `site` object                      |
| Navigation links                              | `navLinks` array                   |
| Work experience (Amazon, etc.)                | `experiences` array                |
| Projects (cards on the homepage)              | `projects` array                   |
| Education (Georgia Tech, etc.)                | `education` array                  |
| Skills shown in the About section             | `skills` array                     |

Drop a `resume.pdf` into `public/` and the Resume button will Just Work
(`site.resumeUrl` defaults to `/resume.pdf`).

## Project structure

```
app/
  layout.tsx          # root layout, fonts, metadata
  page.tsx            # composes the homepage sections
  globals.css         # design tokens, custom utilities
components/
  Navbar.tsx          # sticky nav with active-section highlighting
  Hero.tsx            # landing hero with conic glow + gradient text
  About.tsx           # intro + skills grid
  Experience.tsx      # vertical timeline of roles
  Projects.tsx        # project cards with hover glow
  Education.tsx       # education cards
  Contact.tsx         # email CTA
  Footer.tsx
  ui/                 # shared primitives (Container, Reveal, SectionHeading)
data/
  site.ts             # SINGLE SOURCE OF TRUTH for content
lib/
  utils.ts            # cn() helper for class merging
```

## Design system

Defined in `app/globals.css` via Tailwind v4's `@theme` directive:

- **Background:** `#08080b` (near-black)
- **Surfaces:** `white/[0.02]` with `white/[0.08]` borders
- **Accents:** violet → indigo → cyan gradient
- **Custom utilities:** `.bg-grid`, `.glow-conic`, `.gradient-text`, `.card-glow`, `.pulse-dot`, `.link-underline`

## Deploy

### Vercel (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click Deploy.
3. (Optional) Add a custom domain in Project → Settings → Domains.

### Local production build

```bash
npm run build
npm run start
```

## Scripts

| Command         | Does                            |
| --------------- | ------------------------------- |
| `npm run dev`   | start dev server (with Turbopack) |
| `npm run build` | production build                |
| `npm run start` | run the production build        |
| `npm run lint`  | run ESLint                      |
