"use client";

import { useEffect } from "react";
import Link from "next/link";

/** Route error boundary. Keeps the brand voice and offers a way forward. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in the browser console during development; wire to your
    // monitoring service in production.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center bg-porcelain">
      <div className="shell flex flex-col gap-8">
        <span className="label text-umber/60">Something went wrong</span>
        <h1 className="display-lg max-w-2xl text-charcoal">
          A crack in the glaze.
        </h1>
        <p className="body-lg max-w-xl text-umber">
          This page failed to load. Try again, or head back to the collections.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="label border border-charcoal px-7 py-4 text-charcoal transition-colors hover:bg-charcoal hover:text-porcelain"
          >
            Try again
          </button>
          <Link
            href="/collections"
            className="label border border-umber/30 px-7 py-4 text-umber transition-colors hover:border-charcoal hover:text-charcoal"
          >
            Browse collections
          </Link>
        </div>
        {error.digest ? (
          <p className="body-sm text-umber/50">Reference: {error.digest}</p>
        ) : null}
      </div>
    </section>
  );
}
