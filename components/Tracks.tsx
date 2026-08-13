"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const TRACKS = [
  {
    n: "01",
    name: "Inclusive Innovation",
    tagPre: "Build for the people who are",
    tagEm: "often left out.",
    body: "This track celebrates ideas that create opportunities, access and solutions for underrepresented communities. Whether you're solving for inclusion, accessibility, gender equity or social barriers, bring an idea that makes business more inclusive.",
    who: "Ideas led by or designed for underrepresented communities, including women, persons with disabilities, LGBTQIA+ communities and other underserved groups.",
    glow: "radial-gradient(circle at 30% 20%, rgba(251,87,95,0.28), transparent 60%)",
  },
  {
    n: "02",
    name: "Open Innovation",
    tagPre: "Think bigger.",
    tagEm: "Solve what matters.",
    body: "This track is for bold ideas tackling real-world challenges through innovative, scalable business models. From climate action and education to healthcare, technology and beyond, bring a solution with the potential to create meaningful impact.",
    who: "Any undergraduate student or team with an innovative, scalable idea aligned with one or more Sustainable Development Goals.",
    glow: "radial-gradient(circle at 70% 20%, rgba(251,87,95,0.22), transparent 60%)",
  },
];

const PRIZES = [
  { label: "Winner", amount: "\u20B9150,000 | $1,800", note: "Each track" },
  { label: "1st Runner Up", amount: "\u20B9100,000 | $1,200", note: "Each track" },
  { label: "2nd Runner Up", amount: "\u20B950,000 | $600", note: "Each track" },
];

export function Tracks() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [openMobile, setOpenMobile] = useState<number>(0);

  return (
    <section
      id="tracks"
      data-section-label="Tracks"
      className="relative bg-ink px-5 py-28 text-paper sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="03">Prize &amp; Tracks</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-sans text-4xl font-normal leading-tight text-paper sm:text-5xl lg:text-6xl">
          Two tracks. <span className="em">One stage.</span>
        </h2>

        {/* Desktop / tablet interactive panels */}
        <div className="mt-14 hidden gap-4 md:flex">
          {TRACKS.map((track, i) => (
            <div
              key={track.n}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "group relative flex cursor-default flex-col justify-between overflow-hidden rounded-sm border border-paper/10 p-9 transition-all duration-500 ease-meraki lg:p-11",
                hovered === i ? "flex-[1.5]" : hovered === null ? "flex-1" : "flex-[0.7]"
              )}
              style={{ minHeight: 460 }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: track.glow }}
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-start justify-between">
                <span className="font-sans text-xs font-medium uppercase tracking-widest2 text-paper/40">
                  Track {track.n}
                </span>
                <span
                  className={cn(
                    "font-sans font-normal leading-none text-paper/[0.08] transition-all duration-500",
                    hovered === i ? "text-8xl" : "text-6xl"
                  )}
                >
                  {track.n}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="font-sans text-3xl font-normal leading-tight lg:text-4xl">
                  {track.name}
                </h3>
                <p className="mt-3 font-sans text-lg text-paper/60">
                  {track.tagPre} <span className="em">{track.tagEm}</span>
                </p>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-meraki",
                    hovered === i ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-md font-sans text-sm leading-relaxed text-paper/55">
                      {track.body}
                    </p>
                    <p className="mt-4 max-w-md border-t border-paper/10 pt-4 font-sans text-xs leading-relaxed text-paper/45">
                      <span className="font-medium text-paper/65">Who can apply: </span>
                      {track.who}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="mt-12 flex flex-col gap-3 md:hidden">
          {TRACKS.map((track, i) => {
            const isOpen = openMobile === i;
            return (
              <div key={track.n} className="overflow-hidden rounded-sm border border-paper/10">
                <button
                  type="button"
                  onClick={() => setOpenMobile(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span>
                    <span className="block font-sans text-xs font-medium uppercase tracking-widest2 text-paper/40">
                      Track {track.n}
                    </span>
                    <span className="mt-1 block font-sans text-2xl font-normal">{track.name}</span>
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-paper/20 text-lg transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-[400ms] ease-meraki",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden px-6 pb-6">
                    <p className="font-sans text-base text-paper/60">
                      {track.tagPre} <span className="em">{track.tagEm}</span>
                    </p>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-paper/55">{track.body}</p>
                    <p className="mt-4 border-t border-paper/10 pt-4 font-sans text-xs leading-relaxed text-paper/45">
                      <span className="font-medium text-paper/65">Who can apply: </span>
                      {track.who}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prize money strip */}
        <div className="mt-16 rounded-sm border border-paper/10 bg-paper/[0.02] p-8 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="font-sans text-xs font-medium uppercase tracking-widest2 text-paper/40">
                Prize Money
              </span>
              <p className="mt-2 font-sans text-2xl font-normal text-paper sm:text-3xl">
                Awarded <span className="em">per track.</span>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 xs:grid-cols-3 lg:gap-10">
              {PRIZES.map((p) => (
                <div key={p.label} className="border-l-2 border-coral/40 pl-4">
                  <p className="font-sans text-xs font-medium uppercase tracking-widest2 text-paper/35">
                    {p.label}
                  </p>
                  <p className="mt-1 font-sans text-xl font-normal text-paper sm:text-2xl">
                    {p.amount}
                  </p>
                  <p className="font-sans text-xs text-paper/35">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-1 border-t border-paper/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-sm text-paper/50">
              Participation fee: <span className="font-medium text-paper">&#8377;1,000 | $50</span>
            </p>
            <p className="font-sans text-sm text-paper/50">Group discounts available.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
