/**
 * Brand constants.
 *
 * DEMO CONTENT — the company, address, phone, email and all figures below are
 * placeholders created for this build. Replace with verified brand data before
 * publishing anything public-facing.
 */

export const SITE = {
  name: "Argilla",
  legalName: "Argilla Ceramica",
  tagline: "Shaped by earth.",
  description:
    "Argilla makes architectural ceramic surfaces and hand-thrown vessels — clay bodies pressed, fired and finished for spaces built to outlast trend.",
  /** Update to the production domain before launch. */
  url: "https://argilla.example.com",
  locale: "en_GB",
  founded: 1998,
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
  /** Placeholder contact details — not a real studio. */
  contact: {
    studio: "Via delle Fornaci 12, 41049 Sassuolo, Italy",
    showroom: "Unit 4, Clerkenwell Green, London EC1R",
    email: "studio@argilla.example.com",
    press: "press@argilla.example.com",
    phone: "+39 0536 000 000",
  },
} as const;

export type NavItem = { label: string; href: string };

export const PRIMARY_NAV: NavItem[] = [
  { label: "Collections", href: "/collections" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Craft", href: "/craft" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const SECONDARY_NAV: NavItem[] = [
  { label: "Sustainability", href: "/sustainability" },
  { label: "Request a sample", href: "/contact?intent=sample" },
  { label: "Downloads", href: "/contact?intent=downloads" },
  { label: "Trade enquiries", href: "/contact?intent=trade" },
];
