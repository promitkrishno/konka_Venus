import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

// Clean Sans-serif for body text
const sans = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

// Formal Serif for Headings and Logo
const serif = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

export const metadata: Metadata = {
  title: "Konka Venus | Handcrafted Ladies Fashion",
  description: "Minimalist, Boho, Traditional aesthetics. Woven. Chosen. Yours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans antialiased flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}