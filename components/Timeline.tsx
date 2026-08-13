"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/AnimatedText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const DATES = [
  {
    label: "Applications Open",
    date: "Date to be confirmed",
    tbc: true,
    body: "Submit your idea and put your venture in the running.",
  },
  {
    label: "Applications Close",
    date: "Application deadline",
    tbc: true,
    body: "Last call to get your pitch in.",
  },
  {
    label: "Shortlist Announcement",
    date: "Date to be confirmed",
    tbc: true,
    body: "The strongest ideas move to the next stage.",
  },
  {
    label: "Meraki 2026",
    date: "23\u201325 October 2026",
    tbc: false,
    body: "Three days. Big ideas. Serious pitches. New connections.",
    venue: "Fortune Institute of International Business, New Delhi",
  },
];

export function Timeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [passed, setPassed] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!rail || !fill) return;

    const ctx = gsap.context(() => {
      gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      ScrollTrigger.create({
        trigger: rail,
        start: "top 75%",
        end: "bottom 60%",
        scrub: 0.6,
        onUpdate: (self) => {
          gsap.set(fill, { scaleY: self.progress });
          setPassed(Math.round(self.progress * (DATES.length - 1) * 100) / 100);
        },
      });
    }, rail);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" data-section-label="Key Dates" className="relative bg-ink px-5 py-28 text-paper sm:px-8 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionLabel index="05">Key Dates</SectionLabel>
        <h2 className="mt-6 font-sans text-4xl font-normal leading-tight sm:text-5xl">
          Save <span className="em">the dates.</span>
        </h2>

        <div ref={railRef} className="relative mt-16">
          {/* Static faint guide line */}
          <div
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-paper/10"
            aria-hidden="true"
          />
          {/* Scroll-driven fill, grows as the section comes into view */}
          <div
            ref={fillRef}
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-coral via-coral/70 to-coral/20"
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-10 sm:gap-14">
            {DATES.map((item, i) => {
              const isLit = passed >= i - 0.15;
              return (
                <Reveal key={item.label} delay={i * 80}>
                  <li className="relative flex flex-col gap-2 sm:flex-row sm:gap-10 sm:pl-0">
                    <div className="flex items-center gap-4 sm:w-56 sm:shrink-0">
                      <span
                        className={cn(
                          "relative z-10 h-4 w-4 shrink-0 rounded-full border-2 transition-all duration-500 ease-meraki",
                          isLit ? "border-coral bg-meraki-gradient" : "border-paper/25 bg-ink"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          "text-lg transition-colors duration-500 sm:text-xl",
                          item.tbc
                            ? "em text-paper/40"
                            : isLit
                            ? "font-sans font-normal text-coral"
                            : "font-sans font-normal text-paper/40"
                        )}
                      >
                        {item.date}
                      </span>
                    </div>

                    <div className="flex-1 pb-2 pl-6 sm:pl-0">
                      <h3 className="font-sans text-2xl font-normal sm:text-[1.75rem]">
                        {item.label}
                      </h3>
                      <p className="mt-2 max-w-lg font-sans text-base leading-relaxed text-paper/55">
                        {item.body}
                      </p>
                      {item.venue && (
                        <p className="mt-4 flex items-center gap-2 font-sans text-sm text-paper/60">
                          <MapPin size={15} className="text-coral" aria-hidden="true" />
                          {item.venue}
                        </p>
                      )}
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
