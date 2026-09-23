import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { SITE } from "@/lib/data/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { IntroProvider } from "@/components/layout/IntroProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { NavThemeProvider } from "@/components/layout/NavTheme";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const display = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const sans = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "ceramic surfaces",
    "porcelain tiles",
    "handmade ceramics",
    "architectural ceramics",
    "terracotta",
    "large format porcelain",
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "design",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#16120f" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Runs before first paint.
 *
 * `.js` marks that scripting is available at all, which lets CSS hide the
 * preloader for visitors without JavaScript (otherwise its full-screen overlay
 * would sit invisibly over the page and swallow every click).
 *
 * `.js-anim` is added only when motion is welcome, and is what puts animated
 * elements into their hidden start state. Without it nothing is ever hidden,
 * so a failed bundle or a reduced-motion preference still yields a full page.
 */
const ANIM_BOOTSTRAP = `try{var d=document.documentElement;d.classList.add("js");if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("js-anim")}}catch(e){}`;

const ORGANISATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  description: SITE.description,
  foundingDate: String(SITE.founded),
  sameAs: SITE.social.map((s) => s.href),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: SITE.contact.email,
    telephone: SITE.contact.phone,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The pre-paint script below adds a class here before React hydrates.
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <head>
        <script
          // Runs before paint; intentionally inline and tiny.
          dangerouslySetInnerHTML={{ __html: ANIM_BOOTSTRAP }}
        />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
      </head>
      <body className="flex min-h-full flex-col bg-porcelain">
        <Script
          id="organisation-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANISATION_JSONLD),
          }}
        />
        <SmoothScroll />
        <CustomCursor />
        <IntroProvider>
          <NavThemeProvider>
            <PageTransition>
              <ScrollProgress />
              <Navbar />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
            </PageTransition>
          </NavThemeProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
