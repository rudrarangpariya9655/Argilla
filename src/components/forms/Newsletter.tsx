"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "error" | "done";

/**
 * Newsletter sign-up. No backend is wired in this demo build — the submit
 * handler validates and shows confirmation locally. Point `onSubmit` at a
 * server action or API route when the list provider is chosen.
 */
export function Newsletter({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("done");
  };

  const dark = tone === "dark";

  if (status === "done") {
    return (
      <p
        className={cn(
          "body-base flex items-center gap-3",
          dark ? "text-porcelain" : "text-charcoal",
        )}
        role="status"
      >
        <Check aria-hidden="true" className="size-4 text-terracotta" />
        Thank you. We send the journal roughly once a month.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <label
        htmlFor="newsletter-email"
        className={cn("label mb-3 block", dark ? "text-porcelain/50" : "text-umber/70")}
      >
        The Argilla journal
      </label>
      <div
        className={cn(
          "flex items-center gap-3 border-b pb-3 transition-colors",
          dark ? "border-porcelain/25" : "border-umber/25",
          status === "error" && "border-terracotta",
        )}
      >
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="your@email.com"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          className={cn(
            "body-base w-full bg-transparent outline-none",
            dark
              ? "text-porcelain placeholder:text-porcelain/35"
              : "text-charcoal placeholder:text-stone/70",
          )}
        />
        <button
          type="submit"
          className={cn(
            "group flex shrink-0 items-center gap-2 transition-colors",
            dark
              ? "text-porcelain/70 hover:text-porcelain"
              : "text-umber hover:text-charcoal",
          )}
        >
          <span className="label">Subscribe</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          />
        </button>
      </div>
      {status === "error" ? (
        <p id="newsletter-error" role="alert" className="body-sm mt-3 text-terracotta">
          Please enter a valid email address.
        </p>
      ) : null}
    </form>
  );
}
