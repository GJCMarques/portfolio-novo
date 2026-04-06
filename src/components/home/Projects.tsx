"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  gradient: string;
  size: "large" | "small";
  accent?: string;
}

const projects: Project[] = [
  {
    title: "Bloomberg Terminal",
    category: "FinTech · Dashboard",
    year: "2025",
    description:
      "Redesign of a real-time financial data terminal with modern UI patterns and WebSocket architecture.",
    gradient: "linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #222222 100%)",
    size: "large",
  },
  {
    title: "Liria Studio",
    category: "Creative · WebGL",
    year: "2024",
    description:
      "Immersive audio-visual experience with real-time 3D rendering and AI-driven effects.",
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
    size: "small",
  },
  {
    title: "FinConnect",
    category: "FinTech · Platform",
    year: "2025",
    description:
      "End-to-end payment processing platform with real-time analytics and compliance tools.",
    gradient: "linear-gradient(135deg, #C8A96E 0%, #B8955A 50%, #A88548 100%)",
    size: "small",
    accent: "dark",
  },
  {
    title: "Agency Portfolio",
    category: "Design · Web",
    year: "2024",
    description:
      "Award-winning agency website featuring scroll-driven animations and editorial typography.",
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #151515 50%, #1f1f1f 100%)",
    size: "large",
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-reveal",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".project-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-6 md:px-10"
    >
      {/* Editorial divider */}
      <div className="max-w-[1400px] mx-auto mb-16 md:mb-24">
        <div className="project-line h-[1px] bg-black/[0.08] origin-left" />
      </div>

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="project-reveal flex items-center justify-between mb-16 md:mb-20">
          <div className="flex items-center gap-4">
            <span
              className="text-[10px] tracking-[0.5em] uppercase text-black/25"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              03
            </span>
            <div className="w-12 h-[0.5px] bg-black/10" />
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-black/25"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Selected Work
            </span>
          </div>
          <span
            className="hidden md:block text-[10px] tracking-[0.3em] uppercase text-black/20"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {projects.length} Projects
          </span>
        </div>

        {/* Project Grid — Asymmetric Editorial */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {projects.map((project, i) => {
            const isLarge = project.size === "large";
            const colSpan = isLarge ? "md:col-span-7" : "md:col-span-5";
            // Alternate large/small positioning
            const colStart =
              i === 0
                ? ""
                : i === 1
                ? "md:col-start-8"
                : i === 2
                ? ""
                : "md:col-start-6";

            return (
              <motion.div
                key={project.title}
                className={`project-reveal ${colSpan} ${colStart} group cursor-editorial`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Card */}
                <div
                  className="relative overflow-hidden rounded-sm"
                  style={{
                    background: project.gradient,
                    aspectRatio: isLarge ? "16/10" : "4/3",
                  }}
                >
                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      hoveredIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                    }}
                  />

                  {/* Project Number */}
                  <div className="absolute top-6 left-6">
                    <span
                      className={`text-[11px] tracking-[0.3em] ${
                        project.accent === "dark"
                          ? "text-black/30"
                          : "text-white/20"
                      }`}
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-6 right-6">
                    <span
                      className={`text-[9px] tracking-[0.4em] uppercase ${
                        project.accent === "dark"
                          ? "text-black/30"
                          : "text-white/25"
                      }`}
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Bottom Content — Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3
                          className={`text-[clamp(24px,3vw,36px)] font-light tracking-tight leading-tight ${
                            project.accent === "dark"
                              ? "text-black/80"
                              : "text-white/90"
                          }`}
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {project.title}
                        </h3>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={
                            hoveredIndex === i
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 10 }
                          }
                          transition={{ duration: 0.4 }}
                          className={`text-[13px] font-light mt-3 max-w-sm leading-relaxed ${
                            project.accent === "dark"
                              ? "text-black/50"
                              : "text-white/50"
                          }`}
                        >
                          {project.description}
                        </motion.p>
                      </div>
                      <span
                        className={`text-[11px] tracking-[0.2em] ${
                          project.accent === "dark"
                            ? "text-black/25"
                            : "text-white/20"
                        }`}
                        style={{ fontFamily: "var(--font-geist-mono)" }}
                      >
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Hover arrow indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      hoveredIndex === i
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.3 }}
                    className="absolute top-1/2 right-8 -translate-y-1/2"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={
                        project.accent === "dark"
                          ? "text-black/30"
                          : "text-white/30"
                      }
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
