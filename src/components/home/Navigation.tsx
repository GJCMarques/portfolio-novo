"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const navItems = [
  { label: "Home", href: "#hero", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Work", href: "#work", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      setIsOpen(false);
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 600);
    },
    []
  );

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[#F5F4F0]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="relative z-[110] flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
          >
            <span
              className={`text-[22px] font-semibold tracking-tight transition-colors duration-500 ${
                isOpen ? "text-[#F5F4F0]" : "text-ink"
              }`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              GM
            </span>
            <div
              className={`hidden md:block w-[1px] h-4 transition-colors duration-500 ${
                isOpen ? "bg-white/20" : "bg-black/10"
              }`}
            />
            <span
              className={`hidden md:block text-[9px] tracking-[0.35em] uppercase transition-colors duration-500 ${
                isOpen ? "text-white/40" : "text-black/30"
              }`}
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Portfolio
            </span>
          </a>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[110] flex items-center gap-3 group cursor-editorial"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`text-[10px] tracking-[0.4em] uppercase transition-colors duration-500 ${
                isOpen ? "text-white/50" : "text-black/40"
              }`}
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {isOpen ? "Close" : "Menu"}
            </span>

            {/* Animated Menu Icon — Two Lines */}
            <div className="relative w-6 h-4 flex flex-col justify-between">
              <motion.div
                animate={
                  isOpen
                    ? { rotate: 45, y: 6, backgroundColor: "#F5F4F0" }
                    : { rotate: 0, y: 0, backgroundColor: "#111111" }
                }
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-[1.5px] origin-center"
              />
              <motion.div
                animate={
                  isOpen
                    ? { rotate: -45, y: -6, backgroundColor: "#F5F4F0" }
                    : { rotate: 0, y: 0, backgroundColor: "#111111" }
                }
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-[1.5px] origin-center"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            exit={{ clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[105] bg-[#111111] flex"
          >
            {/* Left Column — Decorative */}
            <div className="hidden lg:flex w-[35%] flex-col justify-between p-10 border-r border-white/[0.06]">
              <div>
                <div className="w-8 h-[1px] bg-white/10 mb-6" />
                <p
                  className="text-[11px] tracking-[0.4em] uppercase text-white/25"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Guilherme Marques
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <p
                    className="text-[9px] tracking-[0.5em] uppercase text-white/20 mb-2"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    Location
                  </p>
                  <p className="text-[14px] text-white/50 font-light">
                    Portugal
                  </p>
                </div>
                <div>
                  <p
                    className="text-[9px] tracking-[0.5em] uppercase text-white/20 mb-2"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    Availability
                  </p>
                  <p className="text-[14px] text-white/50 font-light flex items-center gap-2">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#C8A96E] inline-block" />
                    Open to opportunities
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {["LinkedIn", "GitHub", "X"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-[10px] tracking-[0.3em] uppercase text-white/25 hover:text-[#C8A96E] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column — Navigation Items */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
              <div className="space-y-2">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.index}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group flex items-center gap-6 py-4 border-b border-white/[0.04] hover:border-white/[0.1] transition-colors duration-500"
                  >
                    <span
                      className="text-[11px] text-white/20 group-hover:text-[#C8A96E] transition-colors duration-500"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      {item.index}
                    </span>
                    <span
                      className="text-[clamp(32px,5vw,64px)] font-light text-white/80 group-hover:text-white transition-colors duration-500 tracking-tight"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {item.label}
                    </span>
                    <div className="flex-1" />
                    <motion.div
                      className="w-0 group-hover:w-12 h-[1px] bg-[#C8A96E] transition-all duration-700 ease-out"
                    />
                  </motion.a>
                ))}
              </div>

              {/* Bottom of menu — email */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-16 pt-8 border-t border-white/[0.04]"
              >
                <a
                  href="mailto:hello@guilhermemarques.dev"
                  className="text-[13px] text-white/30 hover:text-[#C8A96E] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  hello@guilhermemarques.dev
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
