/**
 * Image helpers.
 *
 * Demo photography is served from Pexels so the site ships with real ceramic
 * imagery rather than grey boxes. Every entry is a plain `{ id, alt }` pair, so
 * swapping in final brand assets is a one-line change per image: replace
 * `pexels(id)` with the production URL or a static import.
 */

export type Img = {
  /** Pexels photo id — replace with a real asset path when brand shots land. */
  readonly id: number;
  readonly alt: string;
};

/**
 * Builds a source URL at a sensible upstream width. `next/image` re-optimises
 * and serves AVIF/WebP at the device size, so this only caps the origin fetch.
 */
export function pexels(id: number, width = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export function src(img: Img, width?: number) {
  return pexels(img.id, width);
}

/** A tiny warm-grey placeholder so images fade in from clay, not white. */
export const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNkZGQyYzIiLz48L3N2Zz4=";
