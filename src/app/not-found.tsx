import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PRIMARY_NAV } from "@/lib/data/site";
import { Reveal, Rule, UnderlineLink } from "@/components/ui/Primitives";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="Error 404"
        title={["This page", "was never fired."]}
        lead="The address you followed does not exist, or the surface it pointed at has been retired from the catalogue."
        crumbs={[{ label: "Home", href: "/" }, { label: "Not found" }]}
      />

      <section className="section-y bg-porcelain" aria-label="Where to go next">
        <div className="shell">
          <Reveal className="flex flex-col gap-10">
            <Rule />
            <div className="flex flex-wrap gap-4">
              <MagneticButton href="/" variant="solid" className="border-transparent">
                Back to home
              </MagneticButton>
              <MagneticButton href="/collections">
                Browse collections
              </MagneticButton>
            </div>

            <nav aria-label="Site sections" className="mt-6">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.href} data-anim="fade-up">
                    <UnderlineLink
                      href={item.href}
                      className="display-sm text-charcoal"
                    >
                      {item.label}
                    </UnderlineLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>
    </>
  );
}
