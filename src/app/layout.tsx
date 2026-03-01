import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Brainrot Index",
  description: "The definitive meme and brainrot encyclopedia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground overflow-x-hidden max-w-[100vw] w-full`}
        suppressHydrationWarning
      >
        <div className="overflow-x-hidden w-full max-w-[100vw] min-h-screen">
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
