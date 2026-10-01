"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { productBySlug } from "@/lib/data/products";

const INTENTS = [
  { value: "sample", label: "Request a sample" },
  { value: "trade", label: "Trade account" },
  { value: "downloads", label: "Technical downloads" },
  { value: "project", label: "Project enquiry" },
  { value: "press", label: "Press" },
  { value: "faq", label: "General question" },
] as const;

type Field = "name" | "email" | "company" | "intent" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Enquiry form.
 *
 * Validation runs client-side and the submit handler is intentionally local:
 * no endpoint is wired in this demo build. Swap `handleSubmit` for a server
 * action when a CRM or inbox is chosen.
 */
export function ContactForm() {
  const searchParams = useSearchParams();
  return <EnquiryForm key={searchParams.toString()} intent={searchParams.get("intent")} product={searchParams.get("product")} finish={searchParams.get("finish")} />;
}

function EnquiryForm({ intent, product, finish }: { intent: string | null; product: string | null; finish: string | null }) {
  const confirmation = useRef<HTMLDivElement>(null);
  const editing = useRef(false);
  const context = product ? productBySlug(product)?.name : undefined;
  const [values, setValues] = useState(() => {
    return {
      name: "",
      email: "",
      company: "",
      intent:
        intent && INTENTS.some((i) => i.value === intent) ? intent : "project",
      message: context
        ? `I would like more information about ${context}.`
        : finish ? `I would like to explore the ${finish.slice(0, 80)} finish for my project.` : "",
    };
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (sent) confirmation.current?.focus();
    else if (editing.current) {
      document.getElementById("contact-name")?.focus();
      editing.current = false;
    }
  }, [sent]);
  const brief = ["ARGILLA / DEMO PROJECT BRIEF", "Portfolio concept — this enquiry has not been sent.", "", `Name: ${values.name}`, `Email: ${values.email}`, `Studio: ${values.company || "—"}`, `Enquiry: ${INTENTS.find((i) => i.value === values.intent)?.label}`, "", values.message].join("\n");

  const set = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!EMAIL.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10)
      next.message = "A sentence or two is enough, but we need something.";

    setErrors(next);

    if (Object.keys(next).length) {
      // Move focus to the first problem so keyboard users are not stranded.
      const first = Object.keys(next)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div
        ref={confirmation}
        tabIndex={-1}
        role="status"
        className="flex flex-col gap-4 border border-umber/20 p-8"
      >
        <Check aria-hidden="true" className="size-6 text-terracotta" />
        <h3 className="display-sm text-charcoal">Your brief is ready, {values.name}.</h3>
        <p className="body-base max-w-md text-umber">
          Download your project brief below. Nothing has been sent or saved on
          a server. This concept does not process real enquiries or sample requests.
        </p>
        <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(brief)}`} download="argilla-project-brief.txt" className="label inline-flex min-h-12 self-start items-center border border-charcoal px-6 py-4 transition-colors hover:bg-charcoal hover:text-porcelain">Download brief · TXT ↗</a>
        <button
          type="button"
          onClick={() => { editing.current = true; setSent(false); }}
          className="label mt-2 flex min-h-11 items-center self-start text-charcoal underline underline-offset-4"
        >
          Edit the brief
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <FieldText
          id="contact-name"
          label="Name"
          value={values.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          autoComplete="name"
          required
        />
        <FieldText
          id="contact-email"
          label="Email"
          type="email"
          value={values.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          autoComplete="email"
          required
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <FieldText
          id="contact-company"
          label="Studio or company"
          value={values.company}
          onChange={(v) => set("company", v)}
          autoComplete="organization"
        />

        <div className="flex flex-col gap-3">
          <label htmlFor="contact-intent" className="label text-umber/85">
            Enquiry type
          </label>
          <select
            id="contact-intent"
            name="intent"
            value={values.intent}
            onChange={(event) => set("intent", event.target.value)}
            className="body-base border-b border-umber/25 bg-transparent pb-3 text-charcoal outline-none transition-colors focus:border-charcoal"
          >
            {INTENTS.map((intent) => (
              <option key={intent.value} value={intent.value}>
                {intent.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="contact-message" className="label text-umber/85">
          Message <span className="text-terracotta">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          value={values.message}
          onChange={(event) => set("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          placeholder="Tell us about the project, the space or the surface you are looking for."
          className={cn(
            "body-base resize-y border-b bg-transparent pb-3 text-charcoal outline-none transition-colors placeholder:text-stone/60 focus:border-charcoal",
            errors.message ? "border-terracotta" : "border-umber/25",
          )}
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="body-sm text-terracotta">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
        <p className="body-sm max-w-sm text-umber/85">
          Demo form. Nothing is transmitted, stored on a server or emailed.
        </p>
        <button
          type="submit"
          className="group relative inline-flex items-center overflow-hidden border border-charcoal px-8 py-4 text-charcoal"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 origin-bottom scale-y-0 bg-charcoal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
          />
          <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-porcelain group-focus-visible:text-porcelain">
            <span className="label">Prepare enquiry</span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
            />
          </span>
        </button>
      </div>
    </form>
  );
}

function FieldText({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="label text-umber/85">
        {label}
        {required ? <span className="ml-1 text-terracotta">*</span> : null}
      </label>
      <input
        id={id}
        name={id.replace("contact-", "")}
        type={type}
        value={value}
        autoComplete={autoComplete}
        required={required}
        maxLength={type === "email" ? 254 : 160}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "body-base border-b bg-transparent pb-3 text-charcoal outline-none transition-colors focus:border-charcoal",
          error ? "border-terracotta" : "border-umber/25",
        )}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="body-sm text-terracotta">
          {error}
        </p>
      ) : null}
    </div>
  );
}
