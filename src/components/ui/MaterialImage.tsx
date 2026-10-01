"use client";

import NextImage, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Preserve the image frame and a useful description when a remote asset fails. */
export default function MaterialImage({ alt, src, onError, ...props }: ImageProps) {
  const source = typeof src === "string" ? src : "src" in src ? src.src : src.default.src;
  const [failed, setFailed] = useState<string | null>(null);
  if (failed === source) {
    return <span role={alt ? "img" : undefined} aria-label={alt ? `Image unavailable: ${alt}` : undefined} aria-hidden={!alt || props["aria-hidden"]}
      style={props.style}
      className={cn("absolute inset-0 flex flex-col items-center justify-center gap-3 bg-sand p-4 text-center text-umber", props.className)}>
      <span className="label">ARGILLA</span><span className="caption">{alt ? "Image unavailable" : "Material study"}</span>
    </span>;
  }
  return <NextImage {...props} src={src} alt={alt} onError={(event) => { setFailed(source); onError?.(event); }} />;
}
