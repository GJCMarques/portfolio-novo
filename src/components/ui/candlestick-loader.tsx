"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface CandlestickLoaderProps {
  onComplete?: () => void;
  duration?: number;
  className?: string;
}

export function CandlestickLoader({
  onComplete,
  duration = 4.5,
  className,
}: CandlestickLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const candlesRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    const exitTl = gsap.timeline({
      onComplete: () => onComplete?.(),
    });

    // Dramatic curtain-split exit
    exitTl
      .to(".loader-content", {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: "power3.in",
      })
      .to(topCurtainRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      }, "-=0.1")
      .to(bottomCurtainRef.current, {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.inOut",
      }, "<");
  }, [onComplete]);

  useEffect(() => {
    if (
      !containerRef.current ||
      !candlesRef.current ||
      !percentRef.current ||
      !progressBarRef.current ||
      !linesRef.current ||
      !cylinderRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // -- Background editorial lines stagger in --
      const lines = linesRef.current!.querySelectorAll(".ed-line");
      gsap.set(lines, { scaleX: 0, opacity: 0 });
      gsap.to(lines, {
        scaleX: 1,
        opacity: 1,
        duration: 1.6,
        stagger: { each: 0.04, from: "center" },
        ease: "power3.out",
        delay: 0.3,
      });

      // -- Candlestick entry --
      const candles = candlesRef.current!.querySelectorAll(".cs-body");
      const wicks = candlesRef.current!.querySelectorAll(".cs-wick");

      gsap.set(candles, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(wicks, { scaleY: 0, transformOrigin: "bottom center" });

      // Staggered entrance
      gsap.to(wicks, {
        scaleY: 1,
        duration: 0.7,
        stagger: 0.04,
        ease: "power2.out",
        delay: 0.5,
      });
      gsap.to(candles, {
        scaleY: 1,
        duration: 0.9,
        stagger: 0.04,
        ease: "elastic.out(1, 0.5)",
        delay: 0.7,
      });

      // Continuous organic pulsing — living chart
      candles.forEach((candle, i) => {
        gsap.to(candle, {
          scaleY: () => 0.4 + Math.random() * 0.9,
          duration: 1 + Math.random() * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2 + i * 0.08,
        });
      });

      wicks.forEach((wick, i) => {
        gsap.to(wick, {
          scaleY: () => 0.5 + Math.random() * 0.6,
          duration: 0.7 + Math.random() * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.0 + i * 0.06,
        });
      });

      // -- 3D Cylinder rotation for LOADING text --
      gsap.to(cylinderRef.current!, {
        rotateX: -360,
        duration: 3,
        repeat: -1,
        ease: "none",
      });

      // -- Progress bar fill --
      gsap.to(progressBarRef.current!, {
        scaleX: 1,
        duration: duration,
        ease: "power1.inOut",
        transformOrigin: "left center",
      });
      gsap.set(progressBarRef.current!, { scaleX: 0 });

      // -- Percentage counter 0 → 100 --
      const counter = { value: 0 };
      gsap.to(counter, {
        value: 100,
        duration: duration,
        ease: "power1.inOut",
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.textContent = `${Math.floor(counter.value)}`;
          }
        },
        onComplete: handleComplete,
      });

      // -- Fade-in entry for loader content --
      gsap.fromTo(
        ".loader-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.15 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [duration, handleComplete]);

  // -- Candlestick data -- more bars, more chart presence
  const candlestickData = [
    { bodyH: 38, wickH: 58, bullish: true, offsetY: 20 },
    { bodyH: 22, wickH: 42, bullish: false, offsetY: 35 },
    { bodyH: 50, wickH: 68, bullish: true, offsetY: 10 },
    { bodyH: 18, wickH: 36, bullish: false, offsetY: 42 },
    { bodyH: 56, wickH: 74, bullish: true, offsetY: 5 },
    { bodyH: 30, wickH: 48, bullish: true, offsetY: 25 },
    { bodyH: 16, wickH: 34, bullish: false, offsetY: 44 },
    { bodyH: 62, wickH: 82, bullish: true, offsetY: 0 },
    { bodyH: 26, wickH: 44, bullish: false, offsetY: 32 },
    { bodyH: 48, wickH: 66, bullish: true, offsetY: 12 },
    { bodyH: 34, wickH: 52, bullish: true, offsetY: 22 },
    { bodyH: 14, wickH: 30, bullish: false, offsetY: 48 },
    { bodyH: 54, wickH: 72, bullish: true, offsetY: 8 },
    { bodyH: 20, wickH: 38, bullish: false, offsetY: 38 },
    { bodyH: 44, wickH: 62, bullish: true, offsetY: 16 },
    { bodyH: 28, wickH: 46, bullish: true, offsetY: 28 },
    { bodyH: 58, wickH: 78, bullish: true, offsetY: 2 },
  ];

  // Cylinder faces for the 3D text rotation
  const cylinderFaces = ["LOADING", "BUILDING", "CRAFTING", "LOADING"];

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-[9999] overflow-hidden",
        isExiting && "pointer-events-none",
        className
      )}
    >
      {/* Split curtains for exit */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#F5F4F0] z-[60]"
      />
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#F5F4F0] z-[60]"
      />

      {/* Content layer (above curtains when visible) */}
      <div className="loader-content absolute inset-0 z-[70] flex flex-col items-center justify-center bg-[#F5F4F0]">
        
        {/* Background editorial grid lines */}
        <div ref={linesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Horizontal lines */}
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="ed-line absolute left-0 right-0"
              style={{
                top: `${(i + 1) * 4}%`,
                height: i % 5 === 0 ? "1px" : "0.5px",
                backgroundColor:
                  i % 5 === 0
                    ? "rgba(0,0,0,0.04)"
                    : "rgba(0,0,0,0.015)",
                transformOrigin: "center center",
              }}
            />
          ))}
          {/* Vertical lines */}
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="ed-line absolute top-0 bottom-0"
              style={{
                left: `${(i + 1) * 6}%`,
                width: i % 4 === 0 ? "1px" : "0.5px",
                backgroundColor:
                  i % 4 === 0
                    ? "rgba(0,0,0,0.035)"
                    : "rgba(0,0,0,0.012)",
                transformOrigin: "center center",
              }}
            />
          ))}
        </div>

        {/* Top editorial masthead */}
        <div className="absolute top-[6%] left-[6%] right-[6%] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[3px] h-[3px] rounded-full bg-black/20" />
            <span
              className="text-[9px] tracking-[0.5em] uppercase text-black/25"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Digital Portfolio
            </span>
          </div>
          <div className="h-[0.5px] flex-1 mx-6 bg-black/[0.06]" />
          <span
            className="text-[9px] tracking-[0.5em] uppercase text-black/25"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            2026
          </span>
        </div>

        {/* Main Centered Composition */}
        <div className="relative flex flex-col items-center z-10">
          
          {/* Headline – editorial serif impact */}
          <div className="flex flex-col items-center mb-10">
            <span
              className="text-[10px] tracking-[0.7em] uppercase text-black/30 mb-4"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Portfolio · Résumé · CV
            </span>
            <div className="w-16 h-[0.5px] bg-black/10" />
          </div>

          {/* Candlestick Chart — hero visual */}
          <div
            ref={candlesRef}
            className="flex items-end gap-[5px] h-[140px] mb-12"
          >
            {candlestickData.map((candle, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center"
                style={{ width: "7px", marginBottom: `${candle.offsetY * 0.3}px` }}
              >
                {/* Wick — thin line */}
                <div
                  className="cs-wick absolute bottom-0 rounded-full"
                  style={{
                    width: "1px",
                    height: `${candle.wickH}px`,
                    backgroundColor: candle.bullish
                      ? "rgba(20, 20, 20, 0.45)"
                      : "rgba(20, 20, 20, 0.2)",
                  }}
                />
                {/* Body — thick bar */}
                <div
                  className="cs-body absolute bottom-0"
                  style={{
                    width: "5px",
                    height: `${candle.bodyH}px`,
                    backgroundColor: candle.bullish
                      ? "#111111"
                      : "transparent",
                    border: candle.bullish
                      ? "none"
                      : "1px solid rgba(17, 17, 17, 0.3)",
                    borderRadius: "0.5px",
                  }}
                />
              </div>
            ))}
          </div>

          {/* 3D Cylinder Rotating Text */}
          <div className="mb-10" style={{ perspective: "600px" }}>
            <div
              ref={cylinderRef}
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                width: "200px",
                height: "20px",
              }}
            >
              {cylinderFaces.map((text, i) => {
                const angle = (360 / cylinderFaces.length) * i;
                const radius = 20; // half the height creates the cylinder
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <span
                      className="text-[11px] tracking-[0.6em] uppercase text-black/50 font-normal select-none whitespace-nowrap"
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    >
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Percentage Counter */}
          <div className="flex items-baseline gap-0.5 mb-8">
            <span
              ref={percentRef}
              className="text-[80px] font-[200] text-black/85 tabular-nums leading-none tracking-tighter"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              0
            </span>
            <span
              className="text-[22px] font-[300] text-black/30 tracking-tight self-start mt-3"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              %
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-[240px] h-[1px] bg-black/[0.06] relative overflow-hidden rounded-full">
            <div
              ref={progressBarRef}
              className="absolute inset-0 bg-black/60 origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        {/* Bottom editorial footer */}
        <div className="absolute bottom-[6%] left-[6%] right-[6%] flex items-center justify-between">
          <span
            className="text-[8px] tracking-[0.4em] uppercase text-black/20"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Guilherme Marques
          </span>
          <div className="h-[0.5px] flex-1 mx-6 bg-black/[0.06]" />
          <span
            className="text-[8px] tracking-[0.4em] uppercase text-black/20"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Frontend · Fintech · Design
          </span>
        </div>
      </div>
    </div>
  );
}
