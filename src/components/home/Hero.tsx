'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    
    const text = new SplitType(titleRef.current, { types: 'chars' });
    
    gsap.set(text.chars, {
      y: 100,
      opacity: 0
    });

    gsap.to(text.chars, {
      y: 0,
      opacity: 1,
      stagger: 0.04,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2
    });

    return () => {
      text.revert();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pt-32 pb-12 overflow-hidden bg-background w-full">
      {/* Decorative gigantic background text */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none whitespace-nowrap z-0">
        <h2 className="text-[35vw] font-sans font-bold tracking-tighter">MNRN™</h2>
      </div>

      <div className="relative z-10 w-full mb-12 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="w-full md:w-3/4">
          <div className="overflow-visible pb-4 w-full">
            <h1 
              ref={titleRef} 
              className="text-[18vw] md:text-[13vw] font-serif leading-[0.8] tracking-tighter uppercase mb-2 whitespace-nowrap"
            >
              MONRION
            </h1>
          </div>
          <div className="h-[2px] w-full bg-foreground scale-x-0 origin-left" 
             ref={(el) => {
               if(el) {
                 gsap.to(el, { scaleX: 1, duration: 1.5, ease: "power4.out", delay: 1 });
               }
             }}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          className="w-full md:w-1/4 body-large md:text-right"
        >
          <p className="text-balance">
            Digital architecture <br/>
            for the brutally bold.
          </p>
        </motion.div>
      </div>

      {/* Big Visual Area */}
      <motion.div 
        initial={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
        className="w-full aspect-[16/9] md:aspect-[21/9] relative bg-neutral-200 overflow-hidden"
      >
        <Image 
          src="https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=2564&auto=format&fit=crop"
          alt="Abstract brutalist architecture"
          fill
          className="object-cover scale-105"
          ref={(el) => {
            if(el) {
              gsap.to(el, { 
                scale: 1, 
                duration: 2, 
                ease: "power2.out", 
                delay: 1.5 
              });
            }
          }}
          priority
        />
        
        {/* Absolute floating stamp */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-8 right-8 w-32 h-32 bg-brand rounded-full items-center justify-center hidden md:flex text-background caption text-center p-4 hover-trigger mix-blend-screen"
        >
          Established <br/> 2026
        </motion.div>
      </motion.div>
    </section>
  );
}
