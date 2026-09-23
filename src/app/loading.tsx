/** Route-level loading state, shown while a segment streams in. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[70svh] items-center justify-center bg-porcelain"
    >
      <span className="flex items-center gap-4 text-umber">
        <span
          aria-hidden="true"
          className="block size-4 rounded-full border border-current border-t-transparent"
          style={{ animation: "argilla-spin 0.9s linear infinite" }}
        />
        <span className="label">Loading</span>
      </span>
    </div>
  );
}
