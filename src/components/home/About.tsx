"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal animations on scroll
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Draw lines
      gsap.fromTo(
        ".about-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stats counter
      const statEls = sectionRef.current!.querySelectorAll(".stat-number");
      statEls.forEach((el) => {
        const target = parseInt(el.getAttribute("data-value") || "0", 10);
        const suffix = el.getAttribute("data-suffix") || "";
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            (el as HTMLElement).textContent = `${Math.floor(counter.value)}${suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="about-reveal flex items-center gap-4 mb-16 md:mb-24">
          <span
            className="text-[10px] tracking-[0.5em] uppercase text-black/25"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            02
          </span>
          <div className="about-line w-12 h-[0.5px] bg-black/10 origin-left" />
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-black/25"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            About
          </span>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left — Pull Quote */}
          <div className="lg:col-span-5">
            <div className="about-reveal">
              <div className="w-8 h-[2px] bg-[#C8A96E] mb-8" />
              <blockquote
                className="text-[clamp(28px,3.5vw,44px)] font-light leading-[1.2] tracking-tight text-ink/90"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                I don&apos;t just build interfaces—
                <span className="italic text-ink/60">
                  {" "}I architect experiences
                </span>{" "}
                that resonate.
              </blockquote>
            </div>

            {/* Stats */}
            <div className="about-reveal mt-16 grid grid-cols-3 gap-6">
              <div>
                <span
                  className="stat-number text-[36px] font-light text-ink/85 tabular-nums block leading-none"
                  data-value="5"
                  data-suffix="+"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  0
                </span>
                <span
                  className="text-[9px] tracking-[0.4em] uppercase text-black/30 mt-2 block"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Years Exp.
                </span>
              </div>
              <div>
                <span
                  className="stat-number text-[36px] font-light text-ink/85 tabular-nums block leading-none"
                  data-value="30"
                  data-suffix="+"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  0
                </span>
                <span
                  className="text-[9px] tracking-[0.4em] uppercase text-black/30 mt-2 block"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Projects
                </span>
              </div>
              <div>
                <span
                  className="stat-number text-[36px] font-light text-ink/85 tabular-nums block leading-none"
                  data-value="15"
                  data-suffix="+"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  0
                </span>
                <span
                  className="text-[9px] tracking-[0.4em] uppercase text-black/30 mt-2 block"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Clients
                </span>
              </div>
            </div>
          </div>

          {/* Right — Bio & Skills */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="about-reveal">
              <p className="text-[15px] md:text-[16px] text-black/50 font-light leading-[1.8] mb-8">
                A frontend developer specialized in building premium digital products
                for the financial sector. I combine deep technical expertise in{" "}
                <span className="text-black/75 font-normal">React</span>,{" "}
                <span className="text-black/75 font-normal">Next.js</span>, and{" "}
                <span className="text-black/75 font-normal">TypeScript</span> with
                an obsessive attention to visual detail and performance.
              </p>
              <p className="text-[15px] md:text-[16px] text-black/50 font-light leading-[1.8]">
                My work lives at the intersection of{" "}
                <span className="text-[#C8A96E] font-normal">FinTech innovation</span>{" "}
                and world-class UI/UX. Every pixel, every animation, every interaction
                is engineered with surgical precision to deliver experiences that
                convert, engage, and inspire.
              </p>
            </div>

            {/* Expertise Tags */}
            <div className="about-reveal mt-12">
              <div className="about-line h-[1px] bg-black/[0.06] origin-left mb-8" />
              <p
                className="text-[9px] tracking-[0.5em] uppercase text-black/25 mb-6"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Core Expertise
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "React / Next.js",
                  "TypeScript",
                  "GSAP & Motion",
                  "Tailwind CSS",
                  "UI/UX Design",
                  "FinTech",
                  "WebGL / Three.js",
                  "Node.js",
                  "Figma",
                  "Performance",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase text-black/40 border border-black/[0.08] rounded-none hover:border-[#C8A96E]/40 hover:text-[#C8A96E] transition-all duration-500"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
