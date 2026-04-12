import Footer from "@/components/layout/Footer";

export const metadata = {
  title: 'Contact — MONRION',
};

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 flex flex-col justify-between">
      <div className="px-6 md:px-12 mb-12 h-[60vh] flex flex-col justify-center">
        <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-serif tracking-tight font-light uppercase leading-none mb-4">Let's talk</h1>
        <p className="body-large text-muted max-w-2xl">Based in the intersection of code and aesthetics. Available for new ventures worldwide.</p>
      </div>
      <Footer />
    </main>
  );
}
