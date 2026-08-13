"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Generic scroll-reveal wrapper. Fades + rises content into place the first
 * time it enters the viewport. Cheap (IntersectionObserver + CSS transform/
 * opacity only), and fully inert under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Comp = Tag as any;

  return (
    <Comp
      ref={ref}
      className={cn("transition-[opacity,transform] duration-[900ms] ease-meraki", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Comp>
  );
}

/**
 * Splits a heading into words and reveals them with a stagger — used for the
 * hero and section headings that need editorial emphasis.
 */
export function AnimatedWords({
  text,
  className,
  wordClassName,
  staggerMs = 45,
  startDelay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  staggerMs?: number;
  startDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={cn("inline", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
          <span
            className={cn("inline-block transition-transform duration-[850ms] ease-meraki", wordClassName)}
            style={{
              transform: visible ? "translateY(0%)" : "translateY(110%)",
              transitionDelay: `${startDelay + i * staggerMs}ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
