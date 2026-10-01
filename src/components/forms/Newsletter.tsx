"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
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
  const id = useId();
  const result = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const retry = useRef(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  useEffect(() => {
    if (status === "done") result.current?.focus();
    else if (retry.current) { input.current?.focus(); retry.current = false; }
  }, [status]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setStatus("error");
      input.current?.focus();
      return;
    }
    setStatus("done");
  };

  const dark = tone === "dark";

  if (status === "done") {
    return (
      <div
        ref={result}
        tabIndex={-1}
        className={cn(
          "body-sm flex max-w-md flex-col items-start gap-3",
          dark ? "text-porcelain" : "text-charcoal",
        )}
        role="status"
      >
        <Check aria-hidden="true" className="size-4 text-terracotta" />
        <p>Preview complete. This concept does not create a subscription or send email.</p>
        <button type="button" onClick={() => { retry.current = true; setStatus("idle"); }} className="label min-h-11 underline underline-offset-4">Try another address</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <label
        htmlFor={`newsletter-${id}`}
        className={cn("label mb-3 block", dark ? "text-porcelain/75" : "text-umber/85")}
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
          ref={input}
          id={`newsletter-${id}`}
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="your@email.com"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `newsletter-error-${id}` : `newsletter-note-${id}`}
          className={cn(
            "body-base min-w-0 flex-1 bg-transparent",
            dark
              ? "text-porcelain placeholder:text-porcelain/75"
              : "text-charcoal placeholder:text-stone/70",
          )}
        />
        <button
          type="submit"
          className={cn(
            "group flex min-h-11 shrink-0 items-center gap-2 transition-colors",
            dark
              ? "text-porcelain/70 hover:text-porcelain"
              : "text-umber hover:text-charcoal",
          )}
        >
          <span className="label">Preview</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          />
        </button>
      </div>
      <p id={`newsletter-note-${id}`} className={cn("caption mt-3", dark ? "text-porcelain/70" : "text-umber")}>Demo sign-up. Your address stays in this page and no email is sent.</p>
      {status === "error" ? (
        <p id={`newsletter-error-${id}`} role="alert" className={cn("body-sm mt-3", dark ? "text-clay" : "text-terracotta")}>
          Please enter a valid email address.
        </p>
      ) : null}
    </form>
  );
}
