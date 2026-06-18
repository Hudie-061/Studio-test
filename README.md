# Studio Portfolio

AI Cinematic Brand Films — Brussels

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect the repo in the Vercel dashboard — zero configuration needed.

## Swap placeholder content

| What to replace | Where |
|---|---|
| Studio name / logo text | `components/shared/Navigation.tsx`, `components/shared/Footer.tsx`, `components/hero/Hero.tsx` |
| Hero tagline & headline | `components/hero/HeroHeadline.tsx` + `lib/translations/en.json` → `hero` |
| Project thumbnails | Replace the `thumbnailGradient` strings in `components/work/Work.tsx` with `<Image>` src paths; swap the placeholder `<div>` in `ProjectCard.tsx` for a `next/image` `<Image />` |
| Project data (titles, descriptions) | `components/work/Work.tsx` → `PROJECTS` array |
| Service copy | `components/services/Services.tsx` → `SERVICES` array |
| Contact handles (Telegram, WhatsApp, Email) | `components/contact/Contact.tsx` → `CONTACT_LINKS` array |
| Footer copyright year / name | `components/shared/Footer.tsx` |
| All visible strings (i18n source) | `lib/translations/en.json` |

## Add translations (FR / NL)

1. Fill in `lib/translations/fr.json` and `lib/translations/nl.json` (keys mirror `en.json`).
2. Create a `TranslationContext` in `lib/contexts/TranslationContext.tsx` that holds the active language in state.
3. Update `lib/hooks/useTranslation.ts` to read from that context instead of hard-coding `en`.
4. Wire the Footer language switcher's `setActiveLang` to the context setter.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — animations, magnetic buttons, custom cursor
- **Lenis** (`@studio-freight/lenis`) — smooth scroll
- **Lucide React** — contact icons
- **Google Fonts** — Newsreader (headings) + Inter (body) via `next/font`
