# ARGILLA

An independent ceramic brand portfolio concept built with Next.js 16.3.5,
React 19, TypeScript, Tailwind CSS 4, GSAP and Lenis. Instrument Serif,
Inter Tight, warm mineral colours and asymmetric editorial grids define
the existing identity.

## Run and verify

```sh
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm start -- --port 3001
npm test
```

The dependency-free production smoke test expects localhost:3001. Set
`SITE_CHECK_URL` to check another running server. It checks all 41 pages,
internal destinations and fragments, fourteen downloads, metadata, JSON-LD,
404 responses, sitemap, robots, icon and generated social image.
Browser interaction and responsive checks are recorded in `AUDIT.md`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Editorial homepage |
| `/collections`, `/collections/[slug]` | Six collection stories |
| `/products`, `/products/[slug]` | Filterable catalogue and thirteen references |
| `/projects`, `/projects/[slug]` | Filterable index and six project stories |
| `/journal`, `/journal/[slug]` | Index and six articles |
| `/about`, `/craft`, `/sustainability` | Brand narrative |
| `/contact` | Enquiry brief and FAQs |
| `/site-notes` | Concept, privacy, terms and cookies |
| `/catalogue/all`, `/catalogue/[product-slug]` | Downloadable illustrative TXT references |

Pages and downloads are generated from the content in `src/lib/data`.
`SITE.url` is the existing public deployment URL; canonicals, sitemap and
robots derive from it. No deployment is performed by the QA scripts.

## Interaction and motion

The menu and search share a dialog hook with background isolation, focus
trapping, Escape dismissal, focus restoration and reference-counted scroll
locks. Route navigation is immediate. Native links retain modified-click
behavior, and in-page links update the hash and move keyboard focus.

Reveals set their start states only after GSAP mounts. Server-rendered content
stays visible if JavaScript fails. Reduced motion disables GSAP flourishes
and Lenis. The selected-work gallery uses native horizontal scrolling,
keyboard focus, swipe and arrow controls at every width. It never pins vertical
scroll. Below-fold imagery loads lazily, alternate card images mount on
interaction, and failed remote images keep their frame with a labelled fallback.

## Content and forms

ARGILLA is fictional. The site identifies its project credits, prices,
history, technical specifications and environmental practices as illustrative.
Catalogue totals reflect the actual entries. Structured data avoids invented
stock, offers, contact details or social accounts.

The enquiry form validates a brief, preserves product/finish/intent from its
URL, and offers a local TXT download. It does not send email or place an order.
The newsletter is explicitly a validation preview; it creates no subscription.
No form data is persisted or sent to a service. No certified PDF or BIM assets
are represented as available. A real launch requires verified content, licensed
imagery and a configured enquiry/subscription service.

## Structure

`src/app` owns routes, metadata and handlers; `src/components` contains shared
layout, UI primitives, cards, sections and forms; `src/hooks` owns media and
dialog behavior. Motion tokens and plugin registration live in `src/lib/gsap.ts`.
Photography is referenced through `src/lib/images.ts` and Next Image remote
patterns. The installed Next.js guides in `node_modules/next/dist/docs` take
precedence over assumptions about earlier framework versions.
