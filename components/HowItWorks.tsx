"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileEdit, ClipboardCheck, Scissors, MessagesSquare, Mic2, Trophy } from "lucide-react";
import { Reveal } from "@/components/ui/AnimatedText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "Apply",
    body: "Share your idea, the problem it solves, and your vision.",
    Icon: FileEdit,
  },
  {
    n: "02",
    title: "Get Evaluated",
    body: "Experts assess your idea's strength, market potential, and execution readiness.",
    Icon: ClipboardCheck,
  },
  {
    n: "03",
    title: "Make the Cut",
    body: "Strongest submissions advance to the next stage of Meraki competition.",
    Icon: Scissors,
  },
  {
    n: "04",
    title: "Refine Your Pitch",
    body: "Refine your idea through expert feedback and focused mentorship sessions.",
    Icon: MessagesSquare,
  },
  {
    n: "05",
    title: "Pitch at Meraki",
    body: "Pitch your idea at FIIB before experts, investors, and innovators.",
    Icon: Mic2,
  },
  {
    n: "06",
    title: "Win",
    body: "Compete for prizes, build connections, and take your idea forward.",
    Icon: Trophy,
  },
];

const ITEM_HEIGHT = 82; // px — must match the row spacing below

export function HowItWorks() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeFloat, setActiveFloat] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "+=380%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          setActiveFloat(self.progress * (STEPS.length - 1));
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  const active = Math.min(STEPS.length - 1, Math.round(activeFloat));

  return (
    <section
      id="how-it-works"
      data-section-label="How It Works"
      className="relative border-t border-paper/10 bg-ink text-paper"
    >
      {/* ---------- Desktop: vertical list + preview panel ---------- */}
      <div ref={wrapperRef} className="relative hidden h-screen overflow-hidden lg:block">
        <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

        {/* Decorative ribbon accent, echoes the reference's flowing red curve */}
        <svg
          className="pointer-events-none absolute -left-10 top-0 h-full w-[420px] opacity-70"
          viewBox="0 0 420 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M -20 60 C 160 140, 60 320, 220 420 C 360 500, 140 620, 80 760 C 40 840, 120 880, 200 900"
            fill="none"
            stroke="#FB575F"
            strokeWidth="46"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>

        <div className="absolute left-8 top-28 z-10">
          <SectionLabel index="06">How It Works</SectionLabel>
        </div>

        <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-12 items-center gap-8 px-8">
          {/* Reel */}
          <div className="relative col-span-5 h-full">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
              {STEPS.map((step, i) => {
                const distance = Math.abs(i - activeFloat);
                const opacity = Math.max(0.18, 1 - distance * 0.5);
                const isActive = distance < 0.5;
                return (
                  <div
                    key={step.n}
                    className="absolute left-0 flex items-baseline gap-4 transition-none"
                    style={{ top: (i - activeFloat) * ITEM_HEIGHT, opacity }}
                  >
                    <span
                      className={cn(
                        "font-sans text-xs tabular-nums transition-colors duration-300",
                        isActive ? "text-coral" : "text-paper/30"
                      )}
                    >
                      {step.n}
                    </span>
                    <span
                      className={cn(
                        "whitespace-nowrap font-sans font-normal leading-none transition-all duration-300",
                        isActive ? "text-4xl text-paper xl:text-5xl" : "text-2xl text-paper/35"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preview panel */}
          <div className="col-span-7 flex justify-end">
            <div className="w-full max-w-lg">
              <div className="mb-3 flex items-center justify-between font-sans text-xs uppercase tracking-widest2 text-paper/40">
                <span>Stage {STEPS[active].n} &middot; 2026</span>
                <span>Preview</span>
              </div>
              <div className="relative h-[420px] w-full overflow-hidden rounded-sm border border-paper/10">
                {STEPS.map((step, i) => {
                  const offset = i === active ? 0 : i < active ? -18 : 18;
                  return (
                    <div
                      key={step.n}
                      className="absolute inset-0 flex flex-col justify-end p-9 transition-[opacity,transform,filter] duration-300 ease-meraki"
                      style={{
                        opacity: i === active ? 1 : 0,
                        transform: `translateY(${offset}px)`,
                        filter: i === active ? "blur(0px)" : "blur(6px)",
                        pointerEvents: i === active ? "auto" : "none",
                        background: `linear-gradient(155deg, rgba(251,87,95,${0.42 - i * 0.03}) 0%, rgba(25,24,24,0.9) 100%)`,
                      }}
                      aria-hidden={i !== active}
                    >
                      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
                      <step.Icon
                        className="relative z-10 mb-auto mt-2 text-paper/60"
                        size={30}
                        strokeWidth={1.5}
                      />
                      <span className="relative z-10 font-sans text-7xl font-normal leading-none text-paper/15">
                        {step.n}
                      </span>
                      <h3 className="relative z-10 mt-4 font-sans text-3xl font-normal text-paper">
                        {step.title}
                      </h3>
                      <p className="relative z-10 mt-3 max-w-sm font-sans text-base leading-relaxed text-paper/65">
                        {step.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 z-10 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <span
              key={s.n}
              className="h-1 w-8 rounded-full transition-colors duration-500"
              style={{ background: i <= active ? "#FB575F" : "rgba(255,254,250,0.12)" }}
            />
          ))}
        </div>
      </div>

      {/* ---------- Mobile / tablet: vertical process stepper ---------- */}
      <div className="px-5 py-24 sm:px-8 sm:py-28 lg:hidden">
        <SectionLabel index="06">How It Works</SectionLabel>

        <ol className="relative mt-12 flex flex-col gap-10">
          <div
            className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-coral via-coral/30 to-transparent"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 60}>
              <li className="relative flex gap-5 pl-0">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/15 bg-ink font-sans text-xs text-paper/70">
                  {step.n}
                </span>
                <div className="pt-1.5">
                  <h3 className="flex items-center gap-2 font-sans text-2xl font-normal leading-tight">
                    <step.Icon size={18} className="text-coral" strokeWidth={1.75} />
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-sm font-sans text-base leading-relaxed text-paper/55">
                    {step.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
