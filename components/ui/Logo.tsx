import Image from "next/image";
import { cn } from "@/lib/utils";

type Tone = "ink" | "paper";

/** Standalone logomark (the icon only) — official brand asset. Size via h-* (width follows aspect ratio). */
export function Logomark({
  className,
  tone = "paper",
}: {
  className?: string;
  tone?: Tone;
}) {
  const src = tone === "paper" ? "/logomark-white.png" : "/logomark-black.png";
  return (
    <Image
      src={src}
      alt="Meraki"
      width={253}
      height={296}
      className={cn("h-8 w-auto object-contain", className)}
      priority
    />
  );
}

/** Full logo lockup (icon + wordmark) — official brand asset. Size via h-* (width follows aspect ratio). */
export function LogoLockup({
  className,
  tone = "paper",
}: {
  className?: string;
  tone?: Tone;
}) {
  const src = tone === "paper" ? "/logo-white.png" : "/logo-black.png";
  return (
    <Image
      src={src}
      alt="Meraki"
      width={1092}
      height={308}
      className={cn("h-8 w-auto object-contain", className)}
      priority
    />
  );
}
