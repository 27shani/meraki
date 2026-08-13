import { cn } from "@/lib/utils";

/**
 * Inline emphasis wrapper for the mixed-typography pattern used throughout
 * the site: a line set mostly in Urbanist (sans), with one or two words
 * picked out in italic Merriweather (serif) for editorial emphasis.
 *
 * Usage: <>As a <Em>creative</Em> partner, we build...</>
 */
export function Em({
  children,
  className,
  tone = "current",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "current" | "muted" | "coral";
}) {
  return (
    <span
      className={cn(
        "em",
        tone === "muted" && "opacity-50",
        tone === "coral" && "text-coral",
        className
      )}
    >
      {children}
    </span>
  );
}
