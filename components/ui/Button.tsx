"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "primaryDark" | "outline" | "outlineDark";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium text-sm tracking-wide px-7 py-3.5 transition-all duration-300 ease-meraki focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary:
    "bg-meraki-gradient text-paper shadow-[0_8px_30px_-8px_rgba(251,87,95,0.55)] hover:shadow-[0_12px_36px_-6px_rgba(143,83,252,0.55)] hover:-translate-y-0.5",
  primaryDark:
    "bg-paper text-ink hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-6px_rgba(255,254,250,0.25)]",
  outline:
    "border border-ink/20 text-ink hover:border-ink hover:-translate-y-0.5",
  outlineDark:
    "border border-paper/25 text-paper hover:border-paper hover:-translate-y-0.5",
};

type CommonProps = {
  variant?: Variant;
  showIcon?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const { variant = "primary", showIcon = true, className, children, ...rest } = props;

  const content = (
    <>
      <span>{children}</span>
      {showIcon && (
        <ArrowUpRight
          size={16}
          strokeWidth={2.5}
          className="transition-transform duration-300 ease-meraki group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={props.href}
        className={cn(base, variants[variant], className)}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
