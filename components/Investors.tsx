"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/AnimatedText";

const PAST_INVESTORS = [
  "Social Business Creation",
  "Mayfield",
  "Network18",
  "magicpin",
  "Waterbridge Ventures",
  "Lightspeed Venture Partners",
  "iCreate",
  "Deal4Loans",
  "Dozee",
  "Chalo",
  "Aricent",
  "Venture Catalysts",
  "SocialCops",
  "Hercules Capital",
  "Fir Tree Partners",
  "Motorola",
];

export function Investors() {
  return (
    <section
      id="investors"
      data-section-label="Credibility"
      className="relative bg-ink px-5 py-24 text-paper sm:px-8 sm:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel index="04">Credibility</SectionLabel>
            <h2 className="mt-6 font-sans text-3xl font-normal text-paper sm:text-4xl lg:text-5xl">
              Past <span className="em">Investors</span>
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-paper/45">
            Meraki has previously connected participants with the following
            investors, funds and organisations.
          </p>
        </div>

        <div className="mt-14 border-t border-paper/10">
          {PAST_INVESTORS.map((name, i) => (
            <Reveal key={name} delay={Math.min(i * 25, 300)}>
              <div className="group relative flex items-center justify-between overflow-hidden border-b border-paper/10 py-4 transition-colors duration-300 sm:py-5">
                <span
                  className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-coral transition-all duration-300 group-hover:w-full group-hover:opacity-[0.06]"
                  aria-hidden="true"
                />
                <span className="relative z-10 font-sans text-lg font-normal text-paper/55 transition-colors duration-300 group-hover:text-paper sm:text-xl">
                  {name}
                </span>
                <span className="relative z-10 font-sans text-xs tabular-nums text-paper/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
