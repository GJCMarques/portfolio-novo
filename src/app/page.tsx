"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Quick GSAP Entry Animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.2 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center p-8 overflow-hidden relative"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-multiply" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -z-10 mix-blend-multiply" />

      {/* Hero Content */}
      <div className="max-w-4xl w-full text-center space-y-8 z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-white/70" />
          <span className="text-white/80">A Próxima Geração de Experiências Web</span>
        </motion.div>

        <h1 className="gsap-reveal text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/30 drop-shadow-sm">
          Digital Portfolio
          <br />
          <span className="italic font-light">Em Progresso.</span>
        </h1>

        <p className="gsap-reveal text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          A fundação foi estabelecida. Next.js, Framer Motion e GSAP estão prontos para renderizar animações imersivas e desempenho de topo.
        </p>

        <div className="gsap-reveal flex items-center justify-center gap-6 mt-12">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explorar Projetos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
          
          <motion.button 
            whileHover={{ color: "rgba(255,255,255,1)" }}
            className="px-8 py-4 text-white/70 font-medium transition-colors"
          >
            Ver o Currículo
          </motion.button>
        </div>
      </div>
    </main>
  );
}
