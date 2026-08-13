"use client";

import { Reveal } from "@/components/ui/AnimatedText";

export function About() {
  return (
    <section
      id="about"
      data-section-label="About"
      className="relative overflow-hidden bg-ink px-5 py-28 text-paper sm:px-8 sm:py-36 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: "radial-gradient(circle, #FB575F, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <span className="mb-6 block font-sans text-xs text-paper/25 sm:mb-8">(02)</span>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-sans text-4xl font-normal leading-[1.15] text-paper sm:text-5xl lg:text-[3.4rem]">
                Your idea. Your stage.
                <br />
                <span className="em text-paper/70">Your shot.</span>
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center gap-6 lg:col-span-5">
            <Reveal delay={120}>
              <p className="font-sans text-lg leading-relaxed text-paper/75 sm:text-xl">
                Meraki is FIIB&rsquo;s flagship <span className="em">international</span> business
                plan competition for the next generation of entrepreneurs.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="max-w-xl font-sans text-base leading-relaxed text-paper/50">
                Since 2012, it has brought together ambitious students, mentors, investors and
                industry leaders to turn promising ideas into stronger, more viable ventures.
              </p>
            </Reveal>
            <Reveal delay={320} className="mt-2 max-w-xl border-t border-paper/10 pt-6">
              <p className="font-sans text-base leading-relaxed text-paper/50">
                It&rsquo;s not just about having a great idea. It&rsquo;s about solving a real
                problem, building a strong business case and pitching it with{" "}
                <span className="em">conviction</span>.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
