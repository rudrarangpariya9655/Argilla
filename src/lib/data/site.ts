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
    "Explore ARGILLA, an independent architectural ceramics concept: earthy porcelain surfaces, hand-thrown objects and editorial material stories.",
  url: "https://argilla-three.vercel.app",
  locale: "en_GB",
  founded: 1998,
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
  { label: "Catalogue", href: "/catalogue/all" },
  { label: "Trade enquiries", href: "/contact?intent=trade" },
];
