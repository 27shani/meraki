"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/AnimatedText";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Who can participate in Meraki 2026?",
    a: "Meraki is open to participants worldwide. Teams can have 1\u20135 members, with at least one currently enrolled student or degree-seeking member. The competition welcomes early-stage ideas and young ventures with clear revenue potential, scalability and credible, defensible business models that can attract investors.",
  },
  {
    q: "Do I need to have an existing startup?",
    a: "No. Meraki welcomes both early-stage ideas and young ventures seeking validation, growth or a platform to take their concept forward.",
  },
  {
    q: "Can students from outside India apply?",
    a: "Yes. Meraki is designed as an international platform and welcomes eligible undergraduate students from across the world.",
  },
  {
    q: "What will the judges look for?",
    a: "Your idea matters, but so does your thinking. Evaluation focuses on factors such as business clarity, market understanding, execution readiness, scalability and real-world impact.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section
      id="faq"
      data-section-label="FAQ"
      className="relative bg-ink px-5 py-28 text-paper sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-4xl">
        <SectionLabel index="07">FAQs</SectionLabel>
        <h2 className="mt-6 font-sans text-4xl font-normal leading-tight text-paper sm:text-5xl">
          Questions, <span className="em">answered.</span>
        </h2>

        <div className="mt-14 flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 60}>
                <div className="overflow-hidden rounded-sm border border-paper/10 bg-paper/[0.015]">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-header-${i}`}
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-sans text-xs font-medium text-coral">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-sans text-lg font-normal text-paper sm:text-xl">
                          {faq.q}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-paper/15 text-paper transition-transform duration-300 ease-meraki",
                          isOpen && "rotate-45 border-coral text-coral"
                        )}
                        aria-hidden="true"
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-header-${i}`}
                    className={cn(
                      "grid transition-all duration-[400ms] ease-meraki",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl px-6 pb-7 pl-[3.35rem] font-sans text-base leading-relaxed text-paper/55 sm:px-8 sm:pl-[4.6rem]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
