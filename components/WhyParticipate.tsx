"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PhaseVisual, type PhaseVisualHandle } from "@/components/PhaseVisual";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    tag: "/ BUILD_01",
    titlePre: "Sharpen Your",
    titleEm: "Pitch",
    body: "Turn your idea into a clear, compelling business case with expert feedback and real-world perspective.",
    side: "left" as const,
  },
  {
    tag: "/ CONNECT_02",
    titlePre: "Build Your",
    titleEm: "Network",
    body: "Connect with mentors, investors, industry leaders and ambitious peers who can take your idea further.",
    side: "right" as const,
  },
  {
    tag: "/ GROW_03",
    titlePre: "Earn Real",
    titleEm: "Recognition",
    body: "Put your idea on a bigger stage, compete for prizes and gain visibility among the entrepreneurial ecosystem.",
    side: "left" as const,
  },
];

export function WhyParticipate() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<PhaseVisualHandle>(null);
  const [active, setActive] = useState(0);

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
        end: "+=220%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          visualRef.current?.setProgress(self.progress);
          const idx = Math.min(2, Math.floor(self.progress * 3));
          setActive(idx);
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-participate" data-section-label="Why Participate" className="relative bg-ink text-paper">
      {/* ---------- Desktop: sticky scroll storytelling ---------- */}
      <div ref={wrapperRef} className="relative hidden h-screen overflow-hidden lg:block">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full opacity-25 blur-[120px]"
          style={{ background: "radial-gradient(circle, #FB575F, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-1/4 h-[480px] w-[480px] rounded-full opacity-[0.12] blur-[120px]"
          style={{ background: "radial-gradient(circle, #8F53FC, transparent 70%)" }}
        />
        <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="absolute left-8 top-28 z-10">
          <SectionLabel index="02">
            Why Participate
          </SectionLabel>
        </div>

        {/* Central morphing particle formation */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <PhaseVisual ref={visualRef} className="h-[62vh] w-[62vh] max-w-[720px]" />
        </div>

        {/* Progress rail, bottom-left */}
        <div className="absolute bottom-12 left-8 z-10 flex gap-2">
          {STAGES.map((s, i) => (
            <span
              key={s.tag}
              className="h-1 w-14 rounded-full transition-colors duration-500"
              style={{ background: i <= active ? "#FB575F" : "rgba(255,254,250,0.12)" }}
            />
          ))}
        </div>

        {/* Alternating content cards */}
        <div className="relative z-10 mx-auto h-full max-w-7xl px-8">
          {STAGES.map((stage, i) => (
            <div
              key={stage.tag}
              className={cn(
                "absolute top-1/2 w-full max-w-md -translate-y-1/2 rounded-sm border border-paper/10 bg-paper/[0.02] p-8 backdrop-blur-sm transition-all duration-700 ease-meraki",
                stage.side === "left" ? "left-0" : "right-0"
              )}
              style={{
                opacity: i === active ? 1 : 0,
                transform:
                  i === active
                    ? "translateY(-50%) translateX(0px)"
                    : `translateY(-50%) translateX(${stage.side === "left" ? "-24px" : "24px"})`,
                pointerEvents: i === active ? "auto" : "none",
              }}
              aria-hidden={i !== active}
            >
              <span className="font-sans text-xs font-medium uppercase tracking-widest2 text-coral">
                {stage.tag}
              </span>
              <h3 className="mt-4 font-sans text-4xl font-normal leading-tight xl:text-[2.75rem]">
                {stage.titlePre} <span className="em">{stage.titleEm}</span>
              </h3>
              <p className="mt-5 font-sans text-base leading-relaxed text-paper/60 xl:text-lg">
                {stage.body}
              </p>
              <span className="mt-6 block font-sans text-sm font-normal text-paper/30">
                {String(i + 1).padStart(2, "0")} / 03
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Mobile / tablet: swipeable carousel ---------- */}
      <div className="px-5 py-24 sm:px-8 sm:py-28 lg:hidden">
        <SectionLabel index="02">
          Why Participate
        </SectionLabel>

        <div
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
          role="group"
          aria-label="Why participate — swipe to explore"
        >
          {STAGES.map((stage, i) => (
            <div
              key={stage.tag}
              className="relative flex w-[85%] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-sm border border-paper/10 bg-paper/[0.02] p-7 sm:w-[70%]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
                style={{
                  background:
                    i === 0
                      ? "radial-gradient(circle, #FB575F, transparent 70%)"
                      : i === 1
                      ? "radial-gradient(circle, #E8636F, transparent 70%)"
                      : "radial-gradient(circle, #C8636F, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <span className="font-sans text-xs font-medium uppercase tracking-widest2 text-coral">
                  {stage.tag}
                </span>
                <h3 className="mt-4 font-sans text-3xl font-normal leading-tight">
                  {stage.titlePre} <span className="em">{stage.titleEm}</span>
                </h3>
              </div>
              <p className="relative z-10 mt-8 font-sans text-base leading-relaxed text-paper/60">
                {stage.body}
              </p>
              <span className="relative z-10 mt-8 font-sans text-6xl font-normal leading-none text-paper/[0.08]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 font-sans text-xs text-paper/35">Swipe to explore &rarr;</p>
      </div>
    </section>
  );
}
