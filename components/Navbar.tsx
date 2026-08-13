"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoLockup } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#why-participate", label: "Why Participate" },
  { href: "#tracks", label: "Tracks" },
  { href: "#timeline", label: "Timeline" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Actual smooth-scrolling is handled globally by SmoothScroll (Lenis),
  // which intercepts any in-page hash link click. Here we only need to
  // close the mobile menu when a link is chosen.
  function handleNav() {
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-meraki",
        scrolled ? "py-2" : "py-4 sm:py-6"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 transition-all duration-500 ease-meraki sm:px-6",
          scrolled
            ? "border border-paper/10 bg-ink/80 py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : "border border-transparent bg-transparent py-2"
        )}
      >
        <a href="#top" onClick={handleNav} className="flex items-center" aria-label="Meraki 2026 home">
          <LogoLockup className="h-6 sm:h-7" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNav}
              className="font-sans text-sm font-normal text-paper/65 transition-colors duration-200 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#final-cta" variant="primary" className="!px-5 !py-2.5 text-xs" onClick={handleNav}>
            Register Now
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink transition-all duration-500 ease-meraki lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        style={{ top: 0 }}
      >
        <div className="flex items-center justify-between px-5 pt-5 sm:px-6">
          <LogoLockup className="h-6" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mt-10 flex flex-1 flex-col justify-center gap-1 px-6" aria-label="Mobile">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNav}
              className={cn(
                "border-b border-paper/10 py-4 font-sans text-3xl font-normal text-paper transition-all duration-500 ease-meraki xs:text-4xl",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: open ? `${i * 60 + 100}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="px-6 pb-10">
          <Button href="#final-cta" onClick={handleNav} variant="primary" className="w-full justify-center">
            Register for Meraki
          </Button>
        </div>
      </div>
    </header>
  );
}
