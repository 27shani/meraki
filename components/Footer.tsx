import { Mail, Phone, Instagram } from "lucide-react";
import { LogoLockup, Logomark } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer
      data-section-label="Contact"
      className="relative overflow-hidden bg-ink px-5 pb-10 pt-20 text-paper sm:px-8 sm:pt-24 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 border-b border-paper/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <LogoLockup className="h-8" />
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-paper/45">
              FIIB&rsquo;s International Business Plan Competition.
            </p>
            <p className="mt-8 max-w-xs font-sans text-sm leading-relaxed text-paper/35">
              For sponsorship and partnership enquiries, please reach out to{" "}
              <a
                href="mailto:meraki2026@fiib.edu.in"
                className="text-paper/65 underline decoration-paper/20 underline-offset-4 transition-colors hover:text-coral"
              >
                meraki2026@fiib.edu.in
              </a>
            </p>
          </div>

          <div className="lg:col-span-4">
            <span className="font-sans text-xs font-medium uppercase tracking-widest2 text-paper/35">
              Get in Touch
            </span>
            <p className="mt-5 font-sans text-lg font-normal">Meraki Team</p>
            <p className="font-sans text-sm text-paper/45">
              Fortune Institute of International Business
            </p>
            <address className="mt-3 max-w-xs font-sans text-sm not-italic leading-relaxed text-paper/45">
              Plot No. 5, Rao Tula Ram Marg,
              <br />
              Opp. Army R&amp;R Hospital, Vasant Vihar,
              <br />
              New Delhi 110057
            </address>
          </div>

          <div className="lg:col-span-3">
            <span className="font-sans text-xs font-medium uppercase tracking-widest2 text-paper/35">
              Contact
            </span>
            <ul className="mt-5 flex flex-col gap-3 font-sans text-sm text-paper/55">
              <li>
                <a href="tel:+917060366392" className="transition-colors hover:text-coral">
                  +91 7060366392
                </a>
              </li>
              <li>
                <a href="tel:+919958617024" className="transition-colors hover:text-coral">
                  +91 9958617024
                </a>
              </li>
              <li>
                <a href="tel:+919910470427" className="transition-colors hover:text-coral">
                  +91 9910470427
                </a>
              </li>
            </ul>

            <div className="mt-7 flex items-center gap-3">
              <a
                href="mailto:meraki2026@fiib.edu.in"
                aria-label="Email Meraki 2026"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/65 transition-colors hover:border-coral hover:text-coral"
              >
                <Mail size={16} />
              </a>
              <a
                href="tel:+917060366392"
                aria-label="Call Meraki 2026"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/65 transition-colors hover:border-coral hover:text-coral"
              >
                <Phone size={16} />
              </a>
              <span
                aria-label="Instagram — to be confirmed"
                title="Instagram — to be confirmed"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/10 text-paper/25"
              >
                <Instagram size={16} />
              </span>
              <span className="font-sans text-[11px] text-paper/30">Instagram &mdash; TBC</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="font-sans text-xs text-paper/30">
            &copy; {new Date().getFullYear()} Meraki. All rights reserved.
          </p>
          <p className="font-sans text-xs font-medium uppercase tracking-widest2 text-paper/35">
            Powered by FIIB
          </p>
        </div>

        {/* Big repeated wordmark, echoes the reference site's footer signature */}
        <div className="relative mt-16 flex items-center justify-center overflow-hidden py-6 sm:justify-start">
          <div
            className="dot-matrix pointer-events-none absolute -left-10 -top-10 h-48 w-72 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
            aria-hidden="true"
          />
          <div
            className="dot-matrix pointer-events-none absolute -right-16 bottom-0 h-56 w-80 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
            aria-hidden="true"
          />
          <Logomark tone="paper" className="relative z-10 h-14 opacity-90 sm:h-20 lg:h-24" />
        </div>
      </div>
    </footer>
  );
}
