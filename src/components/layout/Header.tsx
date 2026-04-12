'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 flex justify-between items-start mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto">
            <Link href="/" className="font-sans font-bold text-xl md:text-2xl tracking-tighter uppercase block">
              MNRN™
            </Link>
        </div>
        
        <div className="pointer-events-auto">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 group"
            >
              <div className="flex flex-col gap-1 w-8 items-end">
                <motion.span 
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                  className="block h-[2px] w-full bg-white transition-all duration-300 origin-center"
                />
                <motion.span 
                  animate={{ width: isOpen ? "100%" : "60%", rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                  className="block h-[2px] bg-white transition-all duration-300 origin-center"
                />
              </div>
              <span className="caption uppercase hidden md:block">Menu</span>
            </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col justify-center px-6 md:px-24"
          >
            <nav className="flex flex-col gap-4 md:gap-8 items-center text-center">
              {['Home', 'Work', 'Studio', 'Contact'].map((item, i) => (
                <div key={item} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i }}
                  >
                    <Link 
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      className="text-6xl md:text-8xl lg:text-9xl font-serif text-foreground hover:italic transition-all duration-700 hover-trigger inline-block tracking-tight font-light"
                    >
                      {item}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 w-full left-0 flex justify-center gap-12 caption text-muted"
            >
              <Link href="#" className="hover-trigger hover:text-foreground transition-colors">Instagram</Link>
              <Link href="#" className="hover-trigger hover:text-foreground transition-colors">Twitter</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
