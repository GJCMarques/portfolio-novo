"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".contact-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-6 md:px-10"
    >
      {/* Top editorial divider */}
      <div className="max-w-[1400px] mx-auto mb-16 md:mb-24">
        <div className="contact-line h-[1px] bg-black/[0.08] origin-left" />
      </div>

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="contact-reveal flex items-center gap-4 mb-20 md:mb-28">
          <span
            className="text-[10px] tracking-[0.5em] uppercase text-black/25"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            04
          </span>
          <div className="w-12 h-[0.5px] bg-black/10" />
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-black/25"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Get in Touch
          </span>
        </div>

        {/* Main Contact — Large CTA */}
        <div className="contact-reveal mb-20 md:mb-28">
          <p className="text-[15px] text-black/35 font-light mb-6 max-w-md">
            Interested in working together? Let&apos;s create something exceptional.
          </p>
          <a
            href="mailto:hello@guilhermemarques.dev"
            className="group inline-block"
          >
            <span
              className="text-[clamp(28px,5vw,56px)] font-light text-ink/80 tracking-tight group-hover:text-[#C8A96E] transition-colors duration-700"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              hello@guilhermemarques
            </span>
            <span
              className="text-[clamp(28px,5vw,56px)] font-light italic text-ink/40 group-hover:text-[#C8A96E]/60 transition-colors duration-700"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              .dev
            </span>
          </a>
        </div>

        {/* Social & Links Grid */}
        <div className="contact-reveal grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <div>
            <p
              className="text-[9px] tracking-[0.5em] uppercase text-black/25 mb-4"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Social
            </p>
            <div className="space-y-3">
              {[
                { label: "LinkedIn", href: "#" },
                { label: "GitHub", href: "#" },
                { label: "X / Twitter", href: "#" },
                { label: "Dribbble", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group flex items-center gap-3"
                >
                  <span className="w-0 group-hover:w-4 h-[0.5px] bg-[#C8A96E] transition-all duration-500" />
                  <span className="text-[13px] text-black/40 group-hover:text-black/70 transition-colors duration-300 font-light">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-[9px] tracking-[0.5em] uppercase text-black/25 mb-4"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Location
            </p>
            <p className="text-[14px] text-black/45 font-light leading-relaxed">
              Portugal
              <br />
              Available Worldwide
            </p>
          </div>

          <div>
            <p
              className="text-[9px] tracking-[0.5em] uppercase text-black/25 mb-4"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Availability
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-[6px] h-[6px] rounded-full bg-[#C8A96E]" />
              <span className="text-[14px] text-black/45 font-light">
                Open to new projects
              </span>
            </div>
            <p className="text-[12px] text-black/25 font-light">
              Freelance & Full-time
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="contact-reveal mt-24 md:mt-32 pt-8">
          <div className="contact-line h-[1px] bg-black/[0.06] origin-left mb-8" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span
                className="text-[18px] font-medium tracking-tight text-ink/80"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                GM
              </span>
              <div className="w-[1px] h-4 bg-black/10" />
              <span
                className="text-[9px] tracking-[0.4em] uppercase text-black/20"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                © 2026
              </span>
            </div>
            <span
              className="text-[9px] tracking-[0.3em] uppercase text-black/15"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Designed & Developed with precision
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
