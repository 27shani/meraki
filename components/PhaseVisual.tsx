"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export type PhaseVisualHandle = {
  setProgress: (p: number) => void;
};

type Pt = { x: number; y: number; size: number; tone: number };

const COUNT = 260;

/** Smoothstep-style easing so morphs settle instead of snapping linearly. */
function ease(t: number) {
  return t * t * (3 - 2 * t);
}

/** BUILD — particles converge into an upward cone, like a sharpened point. */
function formationBuild(i: number, n: number): Pt {
  const t = i / n;
  const yLevel = 1 - t * 2; // 1 (base) -> -1 (tip)
  const width = Math.max(0.02, (yLevel + 1) / 2) * 0.75;
  const x = (seeded(i, 1) * 2 - 1) * width;
  const jitter = (seeded(i, 4) - 0.5) * 0.04;
  return { x, y: yLevel + jitter, size: 1.1 + seeded(i, 2) * 1.6, tone: t };
}

/** CONNECT — particles settle onto three concentric rings, like a network. */
function formationConnect(i: number, n: number): Pt {
  const ring = i % 3;
  const radius = 0.32 + ring * 0.27;
  const angle = seeded(i, 5) * Math.PI * 2;
  const wobble = (seeded(i, 6) - 0.5) * 0.05;
  return {
    x: Math.cos(angle) * (radius + wobble),
    y: Math.sin(angle) * (radius + wobble) * 0.92,
    size: 1.2 + seeded(i, 7) * 1.5,
    tone: 0.5,
  };
}

/** GROW — particles radiate outward from the centre, denser near the core. */
function formationGrow(i: number, n: number): Pt {
  const t = i / n;
  const angle = seeded(i, 8) * Math.PI * 2;
  const radius = Math.pow(seeded(i, 9), 0.45) * 0.95;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 1.08,
    size: 1 + (1 - radius) * 2.2,
    tone: 1 - t,
  };
}

/** Deterministic pseudo-random in [0,1) — stable across renders, no Math.random(). */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const FORMATIONS = [formationBuild, formationConnect, formationGrow];

export const PhaseVisual = forwardRef<PhaseVisualHandle, { className?: string }>(
  function PhaseVisual({ className }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const progressRef = useRef(0);
    const displayRef = useRef(0);

    useImperativeHandle(ref, () => ({
      setProgress: (p: number) => {
        progressRef.current = Math.min(1, Math.max(0, p));
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const particles = Array.from({ length: COUNT }, (_, i) => ({ i }));
      const targets = FORMATIONS.map((f) =>
        particles.map((p) => f(p.i, COUNT))
      );
      const current = particles.map((p) => formationBuild(p.i, COUNT));

      let width = 0;
      let height = 0;
      let dpr = Math.min(window.devicePixelRatio || 1, 2);

      function resize() {
        const el = canvasRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        el.width = width * dpr;
        el.height = height * dpr;
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      resize();
      window.addEventListener("resize", resize);

      let frame = 0;
      let animId = 0;

      function targetAt(progress: number, idx: number) {
        const scaled = progress * 2; // 0..2 across 3 formations
        const lo = Math.min(1, Math.floor(scaled));
        const hi = Math.min(2, lo + 1);
        const localT = ease(scaled - lo);
        const a = targets[lo][idx];
        const b = targets[hi][idx];
        return {
          x: a.x + (b.x - a.x) * localT,
          y: a.y + (b.y - a.y) * localT,
          size: a.size + (b.size - a.size) * localT,
          tone: a.tone + (b.tone - a.tone) * localT,
        };
      }

      function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        // Ease the displayed progress toward the real scroll progress for a
        // touch of trailing smoothness (buttery, not laggy).
        displayRef.current += (progressRef.current - displayRef.current) * (reduceMotion ? 1 : 0.09);

        const cx = width / 2;
        const cy = height / 2;
        const scale = Math.min(width, height) / 2;

        for (let idx = 0; idx < COUNT; idx++) {
          const t = targetAt(displayRef.current, idx);
          const c = current[idx];
          c.x += (t.x - c.x) * 0.14;
          c.y += (t.y - c.y) * 0.14;
          c.size += (t.size - c.size) * 0.14;
          c.tone += (t.tone - c.tone) * 0.14;

          const px = cx + c.x * scale;
          const py = cy + c.y * scale;

          const toneClamped = c.tone * 0.4; // keep the palette coral-led; purple stays a faint undertone
          const r = 251 + (196 - 251) * toneClamped;
          const g = 87 + (70 - 87) * toneClamped;
          const b = 95 + (140 - 95) * toneClamped;
          const twinkle = 0.55 + 0.35 * Math.sin(frame * 0.015 + idx * 0.4);

          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.4, c.size), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${twinkle})`;
          ctx.fill();
        }

        frame++;
        animId = requestAnimationFrame(draw);
      }

      animId = requestAnimationFrame(draw);

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animId);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className={cn("pointer-events-none", className)}
        aria-hidden="true"
      />
    );
  }
);
