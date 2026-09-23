"use client";

import Image from "next/image";
import { useState } from "react";
import { BLUR, src, type Img } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Product gallery: a large plate with thumbnail selection. The plate
 * cross-fades rather than swapping, and every thumbnail is a real button so the
 * gallery works from the keyboard.
 */
export function ProductGallery({
  images,
  name,
}: {
  images: Img[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand sm:aspect-[3/4]">
        {images.map((image, i) => (
          <Image
            key={image.id + "-" + i}
            src={src(image, 1400)}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 92vw, 52vw"
            quality={80}
            priority={i === 0}
            placeholder="blur"
            blurDataURL={BLUR}
            className={cn(
              "object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              active === i ? "scale-100 opacity-100" : "scale-[1.05] opacity-0",
            )}
          />
        ))}
      </div>

      <div
        role="group"
        aria-label={`${name} gallery`}
        className="grid grid-cols-4 gap-3 sm:gap-4"
      >
        {images.map((image, i) => (
          <button
            key={`thumb-${image.id}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1} of ${images.length}: ${image.alt}`}
            aria-current={active === i}
            className={cn(
              "relative aspect-square overflow-hidden bg-sand transition-opacity duration-500",
              active === i ? "opacity-100" : "opacity-55 hover:opacity-85",
            )}
          >
            <Image
              src={src(image, 400)}
              alt=""
              aria-hidden="true"
              fill
              sizes="120px"
              quality={60}
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-terracotta transition-transform duration-500",
                active === i ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
