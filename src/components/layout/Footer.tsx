'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="px-6 md:px-12 py-24 md:py-32 bg-foreground text-background">
      <div className="flex flex-col mb-24 lg:mb-48">
        <p className="caption mb-6">Let&apos;s Talk</p>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="mailto:hello@mnrn.studio" className="text-[12vw] md:text-[8vw] font-serif leading-none tracking-tight hover:italic transition-all duration-300 block w-full truncate">
            hello@mnrn.studio
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-4 lg:col-span-3 caption">
          <p>© {new Date().getFullYear()} Radiance Studio</p>
          <p className="mt-2 text-background/50">All rights reserved.</p>
        </div>
        
        <div className="md:col-span-4 lg:col-span-6 flex gap-8 caption">
          <Link href="#" className="hover:text-white/70 transition-colors duration-300">Instagram</Link>
          <Link href="#" className="hover:text-white/70 transition-colors duration-300">Twitter</Link>
          <Link href="#" className="hover:text-white/70 transition-colors duration-300">LinkedIn</Link>
        </div>

        <div className="md:col-span-4 lg:col-span-3 text-right caption">
          <p>Designed with Intent.</p>
        </div>
      </div>
    </footer>
  );
}
