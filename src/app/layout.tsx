import type { Metadata } from "next";
import { Syne, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import CustomCursor from "@/components/ui/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "MONRION | High-End Digital Experience",
  description: "Exaggerated digital experiences. Editorial, brutalist, premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${bodoni.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground selection:bg-brand selection:text-background flex flex-col min-h-screen cursor-none">
        <CustomCursor>
          <SmoothScroll>
            <Header />
            {children}
          </SmoothScroll>
        </CustomCursor>
      </body>
    </html>
  );
}
