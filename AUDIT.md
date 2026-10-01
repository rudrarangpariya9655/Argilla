# ARGILLA — audit and verification

## Scope and baseline

Reviewed all App Router routes, shared layouts, home sections, cards, forms,
hooks, content data, styling, image helpers and project configuration before
implementation. Read the installed Next.js 16.3.5 guides for routing, images,
metadata and route handlers. The working tree was clean. Baseline lint and
TypeScript checks passed. No test runner was configured.

The live homepage was inspected in a browser. Its warm mineral palette,
Instrument Serif / Inter Tight typography, asymmetric grids, material imagery
and editorial numbering are worth preserving. The architecture is suitable;
there is no reason to replace the stack or introduce another animation library.

## Confirmed findings before changes

| Area | Evidence and impact |
| --- | --- |
| Hero | Fixed viewport height contains a three-line heading, copy, CTA, metadata and large padding; the heading clips in the live 700 × 652 viewport. |
| Navigation | Fullscreen menu sits above its navbar toggle and has no close button inside the dialog. Secondary links do not close it. Seven display-xl menu items and footer details cannot fit a short phone. Inline close callbacks also restart the focus/scroll effect on navbar renders. |
| Search | Escape is handled, but focus is neither trapped nor restored; background remains interactive. Search suggestions omit product dimensions and collection descriptions. |
| Scrolling | Scroll locks are not reference counted; one overlay can unlock another. Lenis anchor interception does not move keyboard focus or update the fragment. |
| Motion resilience | Pre-paint script hides content before the bundle loads; a failed bundle leaves it hidden despite the README claim. Preloader displays a timer-driven fake loading percentage and delays access by up to 3.2 seconds. |
| Reduced motion | Showcase disables pinning, but desktop CSS still hides its overflowing track. Later slides cannot be reached. Several hidden chrome states are excluded from reduced-motion CSS. |
| Showcase | At wide, short viewports the width-derived portrait cards exceed the fixed viewport-height section. Keyboard focus can reach offscreen pinned items. |
| Craft | Odometer translates by 100% of the whole five-number column per step; its mask uses a smaller font size than the digits. |
| Typography | Forced nowrap on the final CTA can clip long lines. Product prices compete with names at small widths. Product dimensions already contain mm but detail page appends mm again. |
| Accessibility | Eyebrow and Rule put data-anim on elements outside a Reveal in product/about details, hiding useful labels. Parallax section references a nonexistent heading ID. Multiple newsletter instances reuse input/error IDs. Required form fields omit HTML required. Gallery exposes invisible images to assistive technology. |
| Forms | Contact only switches state; “recorded locally” does not actually save anything. Newsletter implies successful subscription with no service. Contact intent/product state is initialized once and becomes stale on same-route query navigation. Finish sample CTA omits the selected finish. |
| Downloads and legal | PDF/BIM/catalogue links navigate to contact instead of downloading. Footer privacy/terms/cookies all point to contact. FAQs link uses an unsupported form intent rather than the FAQ section. |
| SEO | Canonicals, sitemap and robots use argilla.example.com. Organization JSON-LD includes fictional founding date, telephone and generic social network homepages. Product AggregateOffer claims InStock without a price or real stock. Most index OG cards have no image. Sitemap claims fresh modification dates at every build. Default Next favicon remains. |
| Content | Demo status is buried in footer and some sections. Catalogue counts promise 70+ / 500+ designs although only 13 product entries exist. Testimonials and company history need immediate illustration labels. |
| Performance | Below-fold collection/cards/gallery use deprecated priority and compete with hero loading. Hover alternate images all mount eagerly. Overlong shared motion timings and large reveal-region staggering delay access to lower items. Permanent will-change is widespread. Custom cursor replaces the native pointer and animates width/height. |
| Assets / duplication | Five unused create-next-app SVGs; unused CSS selectors and marquee keyframe. Components and content are otherwise well separated. |

Existing filters, semantic links, route lookup/notFound handling, labelled form
errors, image aspect boxes, remote image configuration and most GSAP context
cleanup are sound. No API exists, so no remote submission success can be claimed.
Runtime errors, external image availability, overflow and link destinations will
be verified again against the local production build; absence of a code finding
alone does not establish a browser pass.

## Implementation and final QA

Preserved the mineral palette, fonts, photography, asymmetric grids and
editorial numbering. The work changes the existing components and shared
primitives without adding dependencies or replacing the application stack.

- Rebalanced hero typography, minimum heights, reading measures, metadata,
  CTA wrapping and wide-screen containers. Corrected narrow-screen newsletter
  grids in both the journal index and articles, product name/price wrapping,
  thumbnail rhythm and repeated dimension units.
- Rebuilt the menu and search around one dialog lifecycle: explicit close
  controls, focus trap, immediate initial focus, background inertness, Escape,
  focus restoration and reference-counted scroll locking. Visibility changes
  are immediate; only opacity transitions, so focus cannot land on a hidden
  dialog during its opening frame.
- Replaced the pinned selected-work section with a native gallery, swipe,
  keyboard scrolling and arrow controls. Removed the fake loading percentage,
  preloader, custom cursor, transition cover and unnecessary intro provider.
  Navigation starts immediately; Next handles route scrolling and history
  restoration. In-page anchors set the fragment and focus their destination.
- Shortened shared/page entrance motion, bounded reveal stagger and removed
  permanent will-change. Phone hero frames stay stable. GSAP owns reveal start
  states after mount, leaving server HTML visible if JavaScript fails. Reduced
  motion has static states for content, frames and chrome; Lenis reacts to the
  preference. Corrected the craft odometer and removed unnecessary finish-index
  counting. Animated headings retain accessible names before their reveal.
- Prioritized hero imagery, removed below-fold priority, mounted alternate
  product images and gallery plates on interaction, and added a shared labelled
  fallback that preserves image frames and gallery visibility states.
- Made forms honest and useful: required fields, length limits, unique
  newsletter IDs, inline validation, first-error focus, focused confirmations
  and editing/retry focus. Product, finish and intent flow into the enquiry;
  changing query parameters initializes the appropriate new brief. Valid
  enquiries produce a downloadable local TXT brief. Newsletter success is
  explicitly a validation preview.
- Added actual catalogue/specification TXT downloads and concept/site-policy
  content. Removed fake PDF/BIM destinations, contact details and generic
  social links. Counts now match the six collections and thirteen references;
  fictional history, projects and environmental practices are clearly labelled.
- Corrected the canonical origin, sitemap dates, shared social images and brand
  icon. Removed invented stock/offer/Organization schema; retained accurate
  WebSite and illustrative Article data. Unknown slugs return actual HTTP 404.
  Removing the global streaming loader avoids committing HTTP 200 before an
  unknown detail route is resolved. No framework errors are suppressed.
- Removed unused starter assets/CSS and documented the current architecture
  and production checks in README. AGENTS.md remains intact.

### Verification on 1 October 2026

| Check | Result |
| --- | --- |
| ESLint, TypeScript and production build | Passed; no suppressed errors. Next generates 61 page/handler/metadata outputs. |
| Production smoke test (`npm test`) | 41 page routes, 1,852 internal link/fragment occurrences, 14 attachments, titles, descriptions, canonicals, social images and parseable structured data pass. Unknown page and catalogue slugs, sitemap, robots, icon and PNG social image pass. |
| Responsive DOM measurements | All 41 pages at 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 and 2560px: 410 checks with no document overflow or clipped headings/body/metadata. Screen-reader-only elements are excluded from clipping checks. Measurements are saved in `qa/responsive-checks.json`. |
| Browser navigation/dialogs | Desktop and mobile navigation, internal menu close, secondary menu link, Tab boundaries, Escape, background isolation, initial focus and restored focus verified. Search multi-word matching and no-results state verified. Route arrival focuses main; Back restores previous scroll. |
| Filters and selectors | All seven product filters give 2/2/2/2/2/3/13 results; six project categories each give one, All gives six. Five product gallery controls update the pressed state and expose only the active plate to assistive technology. Finish End key selects Satin and its CTA pre-fills the sample brief. Native gallery arrow and keyboard scrolling verified. |
| Forms | Empty enquiry errors and first-error focus, valid local brief, preserved edit values/focus, product/finish context and same-route trade intent changes verified. Newsletter validation, explicit preview confirmation and unique IDs across two instances verified. |
| Downloads | All fourteen endpoints return real TXT attachment headers and illustrative data; a browser catalogue download completes. Brief data URL contains the entered values and correct enquiry context. |
| Images | All 65 unique external image URLs respond HTTP 200. Home imagery renders in desktop/mobile captures. |
| Visual evidence | `qa/home-desktop.jpg` (1440 × 1000 viewport) and `qa/home-mobile.jpg` (390 × 844 viewport). Shared route families inspected in the browser; the two narrow journal grid issues found during QA were repaired and rechecked. |

The production browser checks showed no application console errors. An earlier
development Fast Refresh notice belongs to edited module exports, not the final
production session. Local production server is available on port 3001. Changes
have not been deployed or committed.

### Practical limits

This is a working portfolio demonstration, not a connected business service.
No inbox, CRM, mailing provider, real stock or certified technical assets were
provided. The application therefore makes no claim to send enquiries, subscribe
addresses, dispatch samples or offer certified PDF/BIM files.

Responsive checks use Chromium in the Codex browser. They establish document
fit, not exhaustive physical-device or assistive-technology compatibility.
Reduced-motion and failed-JavaScript behavior were reviewed in source; OS media
emulation and disabling JavaScript are not exposed by the available browser
tools. Forced image failure was not injected. No Lighthouse score or field
Core Web Vitals improvement is claimed; those require measurement on the final
deployment and representative devices/networks. Remote image availability can
change after this check.
