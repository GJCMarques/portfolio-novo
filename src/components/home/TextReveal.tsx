'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal() {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Split text into words for a staggered reveal
    const splitText = new SplitType(textRef.current, { types: 'lines, words' });
    
    // Animate words from subtle opacity
    gsap.fromTo(splitText.words, 
      { opacity: 0.1, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          end: "bottom 50%",
          scrub: 1, // Smooth scrub
        }
      }
    );

    return () => {
      splitText.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="px-6 md:px-12 py-32 md:py-48 bg-background relative overflow-hidden flex flex-col justify-center min-h-[80vh]">
      <motion.div style={{ y: y1 }} className="absolute right-0 top-[20%] w-[40vw] h-[60vh] opacity-20 hidden lg:block overflow-hidden pointer-events-none">
         <img src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover grayscale blur-[2px]" alt="" />
      </motion.div>

      <div className="grid grid-cols-12 gap-6 relative z-10">
        <div className="col-span-12 md:col-span-3 text-muted caption pt-2">
          [ MANIFESTO ]
        </div>
        <div className="col-span-12 md:col-span-9 lg:col-span-8">
          <div ref={textRef} className="text-3xl md:text-5xl lg:text-7xl font-sans font-medium leading-[1.15] tracking-tight">
            We reject the ordinary. We build digital spaces that evoke emotion, craft narratives, and shape aesthetics into functional masterpieces. True elegance is found in the precise balance of tension and harmony.
          </div>
          <div className="mt-16 flex gap-6 mt-24 hover-trigger w-fit">
            <button className="rounded-full border border-foreground px-8 py-4 text-xs tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors duration-500">
              Read Our Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
