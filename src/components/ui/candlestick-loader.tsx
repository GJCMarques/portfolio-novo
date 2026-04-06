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
  duration = 3.5,
  className,
}: CandlestickLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const candlesRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    const exitTl = gsap.timeline({
      onComplete: () => onComplete?.(),
    });

    exitTl
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });
  }, [onComplete]);

  useEffect(() => {
    if (!containerRef.current || !candlesRef.current || !percentRef.current || !linesRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // -- Background editorial lines animation --
      const lines = linesRef.current!.querySelectorAll(".editorial-line");
      gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(lines, {
        scaleX: 1,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      });

      // -- Candlestick bars animation --
      const candles = candlesRef.current!.querySelectorAll(".candle-bar");
      const wicks = candlesRef.current!.querySelectorAll(".candle-wick");

      gsap.set(candles, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(wicks, { scaleY: 0, transformOrigin: "bottom center" });

      // Main timeline
      const tl = gsap.timeline();
      tlRef.current = tl;

      // Animate wicks first, then bodies
      tl.to(wicks, {
        scaleY: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
        delay: 0.4,
      })
      .to(candles, {
        scaleY: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "elastic.out(1, 0.6)",
      }, "-=0.4");

      // Continuous candlestick pulsing animation
      candles.forEach((candle, i) => {
        gsap.to(candle, {
          scaleY: () => 0.5 + Math.random() * 0.8,
          duration: 0.8 + Math.random() * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.12,
        });
      });

      wicks.forEach((wick, i) => {
        gsap.to(wick, {
          scaleY: () => 0.6 + Math.random() * 0.5,
          duration: 0.6 + Math.random() * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1 + 0.15,
        });
      });

      // -- 3D Rotating "LOADING" text --
      gsap.to(textRef.current!, {
        rotateX: 360,
        duration: 2.8,
        repeat: -1,
        ease: "none",
      });

      // -- Percentage counter 0 → 100 --
      const counter = { value: 0 };
      gsap.to(counter, {
        value: 100,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.textContent = `${Math.floor(counter.value)}`;
          }
        },
        onComplete: handleComplete,
      });

    }, containerRef);

    return () => ctx.revert();
  }, [duration, handleComplete]);

  // -- Candlestick data: each bar has a body height, wick height, and color --
  const candlestickData = [
    { bodyH: 48, wickH: 68, bullish: true },
    { bodyH: 32, wickH: 52, bullish: false },
    { bodyH: 56, wickH: 72, bullish: true },
    { bodyH: 24, wickH: 44, bullish: false },
    { bodyH: 64, wickH: 80, bullish: true },
    { bodyH: 40, wickH: 56, bullish: true },
    { bodyH: 28, wickH: 48, bullish: false },
    { bodyH: 72, wickH: 88, bullish: true },
    { bodyH: 36, wickH: 54, bullish: false },
    { bodyH: 52, wickH: 70, bullish: true },
    { bodyH: 44, wickH: 64, bullish: true },
    { bodyH: 20, wickH: 40, bullish: false },
    { bodyH: 60, wickH: 76, bullish: true },
  ];

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden",
        "bg-[#FAFAF8]",
        isExiting && "pointer-events-none",
        className
      )}
    >
      {/* Editorial Background Lines */}
      <div ref={linesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="editorial-line absolute left-0 right-0"
            style={{
              top: `${(i + 1) * 5.26}%`,
              height: i % 4 === 0 ? "1px" : "0.5px",
              backgroundColor: i % 4 === 0 ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.03)",
            }}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="editorial-line absolute top-0 bottom-0"
            style={{
              left: `${(i + 1) * 7.7}%`,
              width: i % 3 === 0 ? "1px" : "0.5px",
              backgroundColor: i % 3 === 0 ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.02)",
            }}
          />
        ))}
      </div>

      {/* Decorative top line – editorial masthead */}
      <div className="absolute top-[12%] left-[8%] right-[8%] h-[2px] bg-black/10" />
      <div className="absolute top-[12.4%] left-[8%] right-[8%] h-[0.5px] bg-black/5" />

      {/* Center Content */}
      <div className="relative flex flex-col items-center gap-12 z-10">
        {/* Top Label – editorial serif */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="text-[11px] tracking-[0.45em] uppercase text-black/30 font-light"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            Portfolio · Résumé · CV
          </span>
        </div>

        {/* Candlestick Chart */}
        <div
          ref={candlesRef}
          className="flex items-end gap-[6px] h-[120px]"
        >
          {candlestickData.map((candle, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center"
              style={{ width: "8px" }}
            >
              {/* Wick */}
              <div
                className="candle-wick absolute bottom-0 w-[1.5px]"
                style={{
                  height: `${candle.wickH}px`,
                  backgroundColor: candle.bullish
                    ? "rgba(16, 16, 16, 0.6)"
                    : "rgba(16, 16, 16, 0.3)",
                }}
              />
              {/* Body */}
              <div
                className="candle-bar absolute bottom-0 rounded-[1px]"
                style={{
                  height: `${candle.bodyH}px`,
                  width: "6px",
                  backgroundColor: candle.bullish
                    ? "#101010"
                    : "transparent",
                  border: candle.bullish
                    ? "none"
                    : "1px solid rgba(16, 16, 16, 0.4)",
                }}
              />
            </div>
          ))}
        </div>

        {/* 3D Rotating LOADING text */}
        <div
          className="overflow-hidden"
          style={{
            perspective: "400px",
            perspectiveOrigin: "center center",
          }}
        >
          <div
            ref={textRef}
            className="flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <span
              className="text-[13px] tracking-[0.5em] uppercase text-black/60 font-light select-none"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              Loading
            </span>
          </div>
        </div>

        {/* Percentage Counter */}
        <div className="flex items-baseline gap-1">
          <span
            ref={percentRef}
            className="text-[72px] font-extralight text-black/90 tabular-nums leading-none tracking-tight"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            0
          </span>
          <span
            className="text-[20px] font-light text-black/40 tracking-tight"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            %
          </span>
        </div>

        {/* Bottom editorial detail */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-[0.5px] bg-black/15" />
          <span
            className="text-[9px] tracking-[0.6em] uppercase text-black/25 font-light"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            Est. 2026
          </span>
          <div className="w-12 h-[0.5px] bg-black/15" />
        </div>
      </div>

      {/* Bottom decorative line – editorial footer */}
      <div className="absolute bottom-[10%] left-[8%] right-[8%] h-[0.5px] bg-black/8" />
      <div className="absolute bottom-[10.4%] left-[8%] right-[8%] h-[2px] bg-black/10" />
    </div>
  );
}
