"use client";

import { Countdown } from "@/components/Countdown";
import { HeroVisual } from "@/components/HeroVisual";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/AnimatedText";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink text-paper"
    >
      {/* Ambient gradient glow — coral-led, matching the reference's monochrome-red field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[720px] w-[900px] -translate-x-1/2 opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(ellipse at top, #FB575F, transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full opacity-[0.12] blur-[110px]"
        style={{ background: "radial-gradient(circle, #8F53FC, transparent 70%)" }}
      />

      <HeroVisual />

      {/* Grain overlay */}
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 pb-10 sm:px-8 sm:pt-32 lg:px-10">
        <Reveal delay={0}>
          <p className="max-w-md font-sans text-xs font-normal uppercase tracking-widest2 text-paper/50 sm:text-sm">
            Your idea deserves more than a classroom pitch.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-6 font-sans text-[15vw] font-normal leading-[0.95] tracking-tight text-paper sm:text-[9vw] lg:text-[7.4vw] xl:text-[6.6rem]">
            <span>Pitch. </span>
            <span className="em text-coral">Connect.</span>
            <br />
            <span>Scale.</span>
          </h1>
        </Reveal>

        <Reveal delay={300} className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-sans text-lg text-paper/80 sm:text-xl">
            23rd to 25th October 2026
          </span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-coral sm:inline-block" aria-hidden="true" />
          <span className="font-sans text-sm text-paper/40">FIIB, New Delhi</span>
        </Reveal>

        <Reveal delay={420} className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-5">
            <Button href="#final-cta" variant="primary" className="w-fit">
              Register for Meraki
            </Button>
            <p className="font-sans text-base text-paper/45 sm:text-lg">
              Your idea. Your stage. <span className="em">Your shot.</span>
            </p>
          </div>

          <div>
            <Countdown />
          </div>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 mx-auto mb-8 hidden items-center gap-2 font-sans text-[10px] uppercase tracking-widest2 text-paper/30 sm:flex">
        <span className="h-8 w-px animate-pulse bg-paper/20" />
        Scroll
      </div>
    </section>
  );
}
