import Hero from "@/components/home/Hero";
import TextReveal from "@/components/home/TextReveal";
import Marquee from "@/components/home/Marquee";
import ProjectsGrid from "@/components/home/ProjectsGrid";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <TextReveal />
      <Marquee text="DIGITAL HORIZONS — HIGH FASHION CODE — " baseVelocity={-1.5} />
      <ProjectsGrid />
      <Marquee text="CRAFTED WITH INTENT — " baseVelocity={1} />
      <Footer />
    </main>
  );
}
