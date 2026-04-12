import ProjectsGrid from "@/components/home/ProjectsGrid";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: 'Work — MONRION',
};

export default function WorkPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32">
      <div className="px-6 md:px-12 mb-12">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight font-light italic">Work</h1>
        <p className="mt-8 body-large max-w-2xl text-muted">A curated selection of our high-end digital experiences, editorial platforms, and immersive visual design systems.</p>
      </div>
      <ProjectsGrid />
      <Footer />
    </main>
  );
}
