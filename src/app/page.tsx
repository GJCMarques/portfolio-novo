"use client";

import { useState } from "react";
import { CandlestickLoader } from "@/components/ui/candlestick-loader";
import { Navigation } from "@/components/home/Navigation";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Projects } from "@/components/home/Projects";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <CandlestickLoader
        onComplete={() => setIsLoading(false)}
        duration={4}
      />
    );
  }

  return (
    <>
      <Navigation />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
