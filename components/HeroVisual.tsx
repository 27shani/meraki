"use client";

import { useEffect, useRef } from "react";

/**
 * Abstract "idea becoming momentum" visual for the hero.
 * Particles spawn near a single point (the idea) and flow along a curved
 * trajectory toward an expanding glow (the stage), rendered on Canvas2D —
 * no WebGL dependency, so it degrades gracefully and stays light on mobile.
 */
export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    // Trajectory: a smooth curve from lower-left (idea) to upper-right (stage)
    function pathPoint(t: number) {
      const x0 = width * 0.08,
        y0 = height * 0.85;
      const x1 = width * 0.35,
        y1 = height * 0.15;
      const x2 = width * 0.68,
        y2 = height * 0.75;
      const x3 = width * 0.95,
        y3 = height * 0.2;
      const u = 1 - t;
      const x =
        u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3;
      const y =
        u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3;
      return { x, y };
    }

    type Particle = { t: number; speed: number; size: number; hue: number };
    const particles: Particle[] = Array.from({ length: reduceMotion ? 0 : 70 }, () => ({
      t: Math.random(),
      speed: 0.00035 + Math.random() * 0.00045,
      size: 1 + Math.random() * 2.2,
      hue: Math.random(),
    }));

    let frame = 0;
    let animId = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Faint static ribbon guide
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const p = pathPoint(i / 60);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(255,254,250,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Idea point (origin glow)
      const origin = pathPoint(0);
      const originGlow = ctx.createRadialGradient(
        origin.x,
        origin.y,
        0,
        origin.x,
        origin.y,
        70
      );
      originGlow.addColorStop(0, "rgba(255,125,138,0.35)");
      originGlow.addColorStop(1, "rgba(255,125,138,0)");
      ctx.fillStyle = originGlow;
      ctx.fillRect(origin.x - 70, origin.y - 70, 140, 140);

      // Stage glow (destination) — coral-led with only a faint purple undertone
      const dest = pathPoint(1);
      const destGlow = ctx.createRadialGradient(dest.x, dest.y, 0, dest.x, dest.y, 130);
      destGlow.addColorStop(0, "rgba(196,90,140,0.28)");
      destGlow.addColorStop(1, "rgba(196,90,140,0)");
      ctx.fillStyle = destGlow;
      ctx.fillRect(dest.x - 130, dest.y - 130, 260, 260);

      for (const p of particles) {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const pos = pathPoint(p.t);
        const tone = p.t * 0.55;
        const r = 251 + (196 - 251) * tone;
        const g = 87 + (70 - 87) * tone;
        const b = 95 + (140 - 95) * tone;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.55 + 0.35 * Math.sin(frame * 0.02 + p.hue * 10)})`;
        ctx.fill();
      }

      frame++;
      animId = requestAnimationFrame(draw);
    }

    if (!reduceMotion) {
      animId = requestAnimationFrame(draw);
    } else {
      draw();
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
