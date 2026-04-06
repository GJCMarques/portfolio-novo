"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Staggered reveal of editorial elements
      tl.fromTo(
        ".hero-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.out", stagger: 0.15 }
      )
        .fromTo(
          ".hero-label",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
          "-=0.8"
        )
        .fromTo(
          ".hero-name",
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", stagger: 0.1 },
          "-=0.6"
        )
        .fromTo(
          ".hero-role",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-detail",
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.08 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-10 overflow-hidden"
    >
      {/* Background editorial markers */}
      <div className="absolute top-[15%] right-[6%] hidden lg:block">
        <span
          className="hero-detail text-[9px] tracking-[0.5em] uppercase text-black/15 block"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          EST. 2026
        </span>
      </div>

      <div className="absolute top-[40%] left-[6%] hidden lg:block">
        <div className="hero-detail flex flex-col items-center gap-2">
          <div className="w-[1px] h-16 bg-black/[0.06]" />
          <span
            className="text-[8px] tracking-[0.6em] uppercase text-black/15 [writing-mode:vertical-lr]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-black/[0.06]" />
        </div>
      </div>

      {/* Top editorial line */}
      <div className="absolute top-[20%] left-[6%] right-[6%]">
        <div className="hero-line h-[1px] bg-black/[0.06] origin-left" />
      </div>

      {/* Main Content — Asymmetric Layout */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        {/* Section index */}
        <div className="hero-label mb-8 flex items-center gap-4">
          <span
            className="text-[10px] tracking-[0.5em] uppercase text-black/25"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            01
          </span>
          <div className="w-8 h-[0.5px] bg-black/10" />
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-black/25"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Introduction
          </span>
        </div>

        {/* Name — Oversized */}
        <div className="space-y-0">
          <h1
            className="hero-name text-[clamp(48px,10vw,140px)] font-medium leading-[0.9] tracking-[-0.03em] text-ink"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Guilherme
          </h1>
          <h1
            className="hero-name text-[clamp(48px,10vw,140px)] font-medium leading-[0.9] tracking-[-0.03em] text-ink/80 italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Marques
          </h1>
        </div>

        {/* Divider + Role */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
          <div className="hero-line h-[1px] bg-black/10 w-full md:w-[200px] origin-left" />
          <div className="hero-role">
            <p
              className="text-[11px] tracking-[0.5em] uppercase text-black/35 mb-3"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Frontend Developer
            </p>
            <p className="text-[16px] md:text-[18px] text-black/50 font-light max-w-md leading-relaxed">
              Crafting immersive digital experiences at the intersection of{" "}
              <span className="text-[#C8A96E] font-normal">finance</span>,{" "}
              <span className="text-black/70 font-normal">technology</span>, and{" "}
              <span className="text-black/70 font-normal">design</span>.
            </p>
          </div>
        </div>

        {/* Bottom details */}
        <div className="hero-detail mt-12 md:mt-16 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-[6px] h-[6px] rounded-full bg-[#C8A96E]" />
            <span
              className="text-[9px] tracking-[0.4em] uppercase text-black/25"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Available for work
            </span>
          </div>
          <div className="h-[0.5px] w-6 bg-black/10" />
          <span
            className="text-[9px] tracking-[0.4em] uppercase text-black/25"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Based in Portugal
          </span>
        </div>
      </div>

      {/* Scroll Indicator — Bottom Center */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="hero-detail absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-6 bg-black/10" />
        <div className="w-[3px] h-[3px] rounded-full bg-black/20" />
      </motion.div>
    </section>
  );
}
