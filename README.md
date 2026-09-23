# Argilla — ceramic brand site

A production-quality marketing site for a fictional premium ceramics brand:
architectural surfaces and hand-thrown vessels. Built as a scroll-led editorial
experience rather than a catalogue template.

> **Everything here is demo content.** The company, addresses, phone numbers,
> prices, statistics, project credits and sustainability practices are
> placeholders written for this build. Replace them with verified data before
> anything goes public — see [Replacing the content](#replacing-the-content).

## Stack

| Concern           | Choice                                          |
| ----------------- | ----------------------------------------------- |
| Framework         | Next.js 16 (App Router, Turbopack), React 19     |
| Language          | TypeScript, strict                               |
| Styling           | Tailwind CSS v4, design tokens in `globals.css`  |
| Animation         | GSAP + ScrollTrigger                             |
| Smooth scrolling  | Lenis, driven by the GSAP ticker                 |
| Icons             | lucide-react                                     |
| Demo photography  | Pexels, via `next/image` remote patterns         |

One animation library, one scroll library, no overlap.

## Running it

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Routes

```
/                        Home
/collections             Collection index
/collections/[slug]      Collection detail        (6 pages)
/products                Product index, filterable
/products/[slug]         Product detail           (13 pages)
/projects                Project index, filterable
/projects/[slug]         Project detail           (6 pages)
/craft                   Craftsmanship
/about                   About
/sustainability          Sustainability
/journal                 Journal index
/journal/[slug]          Article                  (6 pages)
/contact                 Contact and enquiry form
```

All 45 pages prerender statically. `sitemap.xml` and `robots.txt` are generated
from the same data files.

## Architecture

```
src/
  app/                 Routes, metadata, sitemap, robots, error and 404
  components/
    layout/            Preloader, Navbar, FullscreenMenu, SearchOverlay,
                       Footer, CustomCursor, SmoothScroll, PageTransition,
                       ScrollProgress, NavTheme
    ui/                AnimatedText, RevealImage, MagneticButton, Primitives
                       (Reveal / SectionHeading / Eyebrow / UnderlineLink / Rule),
                       TransitionLink
    cards/             CollectionCard, ProductCard, ProjectCard, JournalCard
    home/              One component per homepage section
    sections/          PageHero, ProductGallery, index listings, FilterBar
    forms/             ContactForm, Newsletter
  lib/
    data/              All content: collections, products, projects, journal,
                       craft, site constants
    gsap.ts            Single plugin registration point and shared easings
    images.ts          Image helper and blur placeholder
  hooks/               useMediaQuery, useReducedMotion, useIsomorphicLayoutEffect
```

Content is kept entirely in `src/lib/data`. No component hard-codes copy that a
content editor would want to change.

## How the motion system works

**One set of motion tokens.** `src/lib/gsap.ts` exports the easing curves,
durations and travel distances every animation uses. Sections differ in what
they animate, never in how it feels.

**Reveal on scroll.** Sections wrap content in `<Reveal>` and tag elements with
`data-anim`: `fade-up`, `fade`, `mask`, `mask-left`, `line` or `rise` (the
card entrance). An element can hold its own start with `data-anim-delay`.
`Reveal` builds one paused GSAP timeline per region and plays it from a single
ScrollTrigger, so the page has a handful of triggers rather than one per
element. Anything that is genuinely a different behaviour — the pinned
showcase, the sticky craft narrative, the counters, the preloader — stays
bespoke rather than being forced through the same primitive.

**Hidden start states live in CSS, gated on a class.** A tiny inline script adds
`js` and (unless the visitor prefers reduced motion) `js-anim` to `<html>`
before first paint. Only `.js-anim` hides anything. If the bundle fails, if
JavaScript is off, or if reduced motion is requested, nothing is ever hidden and
the full page renders. The preloader is hidden outright without `js`, so its
overlay can't sit invisibly over the page swallowing clicks.

**Reduced motion is a real path, not a token gesture.** Lenis is never
instantiated, the custom cursor never mounts, the preloader is skipped, and
every GSAP setup short-circuits to a static end state.

**Nothing important depends on an animation finishing.** Page navigation fires
from a timer rather than a tween callback, and the transition lock releases when
the route lands. The preloader has a hard time cap on the same basis: it is a
flourish, never a gate. A throttled ticker in a background tab can't swallow a
click or strand a visitor behind an overlay.

**Cleanup.** Every effect uses `gsap.context()` and reverts on unmount;
`matchMedia` scopes are reverted; timers are cleared.

**Performance.** Animations touch `transform`, `opacity` and `clip-path` only.
The horizontal showcase recomputes its pin distance on every refresh, so font
loading and image sizing can't leave it stale.

## Responsive behaviour

Not a shrunken desktop:

- The horizontal showcase pins and converts vertical scroll to horizontal travel
  on desktop; below 1024px it becomes a native swipeable scroller with snap
  points. The pin ends exactly when the track runs out, so scrolling is never
  trapped.
- The craft story uses a sticky image column on desktop and inline images on
  smaller screens.
- The custom cursor only mounts for fine pointers.
- Parallax travel is halved on tablets and switched off below 640px: a
  scrub-driven transform on a large decoded image is cheap on a desktop GPU and
  the most expensive thing on the page on a phone.
- Product cards reveal finish and format on hover where there is a pointer, and
  print the same two facts under the title where there is not.
- Magnetic buttons are disabled on touch.
- Verified for horizontal overflow at 375, 768 and 1440 across every route.

## Accessibility

- Semantic landmarks, one `<h1>` per page, no heading-level jumps.
- Skip link, visible focus rings, keyboard-operable menu, search, tablist,
  gallery and filters.
- The fullscreen menu and search are `inert` when closed, trap focus when open,
  close on Escape and restore focus.
- Form fields are labelled, errors use `role="alert"` and `aria-invalid`, and
  focus moves to the first problem on submit.
- Decorative images use empty `alt`; content images are described.

## SEO

Per-page titles, descriptions, canonicals, Open Graph and Twitter cards;
`Organization`, `Product` and `Article` JSON-LD; generated sitemap and robots.

## Replacing the content

1. **Brand** — `src/lib/data/site.ts`: name, tagline, URL, contact details,
   social links. Set `SITE.url` to the production domain; metadata, canonicals
   and the sitemap derive from it.
2. **Catalogue** — `collections.ts`, `products.ts`, `projects.ts`, `journal.ts`,
   `craft.ts`.
3. **Imagery** — every image is an `{ id, alt }` pair resolved by
   `pexels(id)` in `src/lib/images.ts`. Point `src()` at your asset host (or
   swap in static imports) and the whole site follows. Update
   `images.remotePatterns` in `next.config.ts` to match.
4. **Figures and claims** — the statistics in `craft.ts` and the sustainability
   copy are illustrative. Do not publish them as fact.
5. **Forms** — `ContactForm` and `Newsletter` validate locally and submit
   nowhere. Replace their submit handlers with a server action or API route.
# Argilla
