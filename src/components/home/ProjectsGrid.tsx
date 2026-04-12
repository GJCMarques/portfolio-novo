'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Magnetic from '@/components/ui/Magnetic';

const projects = [
  {
    id: 1,
    title: 'ECHELON',
    category: 'BRAND / WEB',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    aspect: 'aspect-[3/4]',
    colSpan: 'col-span-12 md:col-span-5 md:col-start-8',
    offsetY: 'mt-0 md:mt-32',
  },
  {
    id: 2,
    title: 'VOID',
    category: 'VFX / MOTION',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop',
    aspect: 'aspect-[4/5]',
    colSpan: 'col-span-12 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-8',
    offsetY: 'mt-0',
  },
  {
    id: 3,
    title: 'KINETIC',
    category: 'INTERACTION',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    aspect: 'aspect-square',
    colSpan: 'col-span-12 md:col-span-5 md:col-start-2 lg:col-span-6 lg:col-start-2',
    offsetY: 'mt-12 md:-mt-48',
  },
  {
    id: 4,
    title: 'SYNTH',
    category: 'DEVELOPMENT',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2000&auto=format&fit=crop',
    aspect: 'aspect-[16/9]',
    colSpan: 'col-span-12 md:col-span-10 md:col-start-3 lg:col-span-9 lg:col-start-4',
    offsetY: 'mt-16 md:mt-36',
  },
  {
    id: 5,
    title: 'SILK',
    category: 'EDITORIAL',
    image: 'https://images.unsplash.com/photo-1621570273764-1da66127393d?q=80&w=2000&auto=format&fit=crop', // classic sculpture or soft aesthetic
    aspect: 'aspect-[3/4]',
    colSpan: 'col-span-12 md:col-span-5 md:col-start-2 lg:col-span-4 lg:col-start-2',
    offsetY: 'mt-12 md:mt-48',
  },
  {
    id: 6,
    title: 'AURA',
    category: 'DESIGN SYSTEM',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop', // minimalist architecture
    aspect: 'aspect-[3/5]',
    colSpan: 'col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8',
    offsetY: 'mt-12 md:-mt-24',
  },
  {
    id: 7,
    title: 'FRAGILITY',
    category: 'ART DIRECTION',
    image: 'https://images.unsplash.com/photo-1542106313-097edfa4ee8c?q=80&w=2000&auto=format&fit=crop', // elegant fashion
    aspect: 'aspect-video',
    colSpan: 'col-span-12 md:col-span-10 md:col-start-2',
    offsetY: 'mt-16 md:mt-48',
  }
];

interface ProjectType {
  id: number;
  title: string;
  category: string;
  image: string;
  aspect: string;
  colSpan: string;
  offsetY: string;
}

function ParallaxProject({ project }: { project: ProjectType }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`${project.colSpan} ${project.offsetY} flex flex-col group hover-trigger`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-border py-4 z-10 w-full relative">
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight transition-all duration-500 group-hover:italic group-hover:text-muted px-1">
          {project.title}
        </h3>
        <p className="caption text-right pt-4 md:pt-0 pr-1 text-muted">[{project.category}]</p>
      </div>

      <div ref={containerRef} className={`relative w-full overflow-hidden bg-neutral-200 ${project.aspect} mt-4`}>
        <motion.div 
          style={{ y }} 
          className="absolute inset-[-15%] w-[130%] h-[130%]"
        >
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image 
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover transition-all duration-700 ${isHovered ? 'grayscale-0' : 'grayscale'}`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectsGrid() {
  return (
    <section id="work" className="px-6 md:px-12 py-32 bg-background relative z-10 w-full overflow-hidden">
      <div className="grid grid-cols-12 gap-x-6 gap-y-16 md:gap-y-0 relative w-full">
        <div className="col-span-12 md:col-span-6 mb-24 md:mb-0">
          <h2 className="text-2xl md:text-4xl font-serif italic text-muted leading-tight mb-12">Selected<br/>Archive</h2>
        </div>
        {projects.map((project) => (
          <ParallaxProject key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
