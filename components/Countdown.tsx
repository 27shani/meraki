"use client";

import { useEffect, useState } from "react";
import { EVENT_START_ISO } from "@/lib/utils";
import { cn } from "@/lib/utils";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getTimeLeft(): TimeLeft {
  const target = new Date(EVENT_START_ISO).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, done: false };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function Unit({ value, label, tone }: { value: number; label: string; tone: "dark" }) {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div
        className={cn(
          "relative flex h-16 w-14 items-center justify-center overflow-hidden rounded-sm border font-sans text-3xl font-normal tabular-nums sm:h-20 sm:w-20 sm:text-4xl md:h-24 md:w-24 md:text-5xl",
          "border-paper/15 bg-paper/[0.04] text-paper backdrop-blur-sm"
        )}
      >
        <span className="flip-digit">{pad(value)}</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-paper/10"
        />
      </div>
      <span className="font-sans text-[10px] font-medium uppercase tracking-widest2 text-paper/45 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Render stable zeros on the server / first paint to avoid hydration mismatch,
  // then swap in the live value once mounted.
  const display = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

  if (time?.done) {
    return (
      <div
        className="font-sans text-xl font-normal text-paper sm:text-2xl"
        role="status"
        aria-live="polite"
      >
        Meraki 2026 is live at FIIB, New Delhi.
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-3 sm:gap-4 md:gap-5"
      role="timer"
      aria-live="off"
      aria-label={`Countdown to Meraki 2026: ${display.days} days, ${display.hours} hours, ${display.minutes} minutes, ${display.seconds} seconds`}
    >
      <Unit value={display.days} label="Days" tone="dark" />
      <span className="pb-6 font-sans text-2xl text-paper/20 sm:text-3xl">:</span>
      <Unit value={display.hours} label="Hours" tone="dark" />
      <span className="pb-6 font-sans text-2xl text-paper/20 sm:text-3xl">:</span>
      <Unit value={display.minutes} label="Minutes" tone="dark" />
      <span className="pb-6 font-sans text-2xl text-paper/20 sm:text-3xl">:</span>
      <Unit value={display.seconds} label="Seconds" tone="dark" />
    </div>
  );
}
