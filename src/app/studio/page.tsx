import TextReveal from "@/components/home/TextReveal";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: 'Studio — MONRION',
};

export default function StudioPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32">
      <div className="px-6 md:px-12 mb-12">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight font-light italic">Studio</h1>
      </div>
      <TextReveal />
      <Footer />
    </main>
  );
}
