"use client";

import { useEffect, useState } from "react";

/**
 * Thin vertical line + rotated label pinned to the right edge, always
 * showing the name of the section currently in view — the same quiet wayfinding
 * chrome used throughout the reference site. Desktop only; there isn't
 * room for it once the viewport narrows, and the mobile nav already orients
 * the person.
 */
export function SectionIndicator() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-section-label]"));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const el = visible[0].target as HTMLElement;
          setLabel(el.dataset.sectionLabel || "");
        }
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-10% 0px -10% 0px" }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      aria-hidden="true"
    >
      <span className="h-16 w-px bg-paper/15" />
      <span
        key={label}
        className="origin-center -rotate-90 whitespace-nowrap font-sans text-xs font-medium tracking-wide text-paper/50 transition-opacity duration-300"
        style={{ writingMode: "horizontal-tb" }}
      >
        {label}
      </span>
      <span className="h-16 w-px bg-paper/15" />
    </div>
  );
}
