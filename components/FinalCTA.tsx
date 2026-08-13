"use client";

import { Reveal, AnimatedWords } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/MagneticButton";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      data-section-label="Register"
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-ink px-5 py-32 text-center text-paper sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(251,87,95,0.24), transparent 55%), radial-gradient(circle at 50% 85%, rgba(251,87,95,0.1), transparent 55%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <Reveal>
          <span className="font-sans text-xs font-normal uppercase tracking-widest2 text-paper/45">
            Meraki 2026
          </span>
        </Reveal>

        <h2 className="mt-6 font-sans text-5xl font-normal leading-[1.05] sm:text-6xl lg:text-7xl">
          <AnimatedWords text="Your idea has" />
          <br />
          <AnimatedWords text="entered the chat." startDelay={150} wordClassName="em text-coral" />
        </h2>

        <Reveal delay={350}>
          <p className="mt-6 font-sans text-xl text-paper/55 sm:text-2xl">
            Now give it <span className="em">a stage.</span>
          </p>
        </Reveal>

        <Reveal delay={450} className="mt-3 font-sans text-sm text-paper/45 sm:text-base">
          23&ndash;25 October 2026 &nbsp;|&nbsp; FIIB, New Delhi
        </Reveal>

        <Reveal delay={550} className="mt-10">
          <Magnetic>
            <Button href="mailto:meraki2026@fiib.edu.in" variant="primary" className="!px-10 !py-4 !text-base">
              Apply Now
            </Button>
          </Magnetic>
        </Reveal>

        <Reveal delay={650} className="mt-14">
          <p className="font-sans text-lg font-normal tracking-wide text-paper/35">
            Pitch. Connect. Scale.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
