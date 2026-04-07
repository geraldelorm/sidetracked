import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BLOG_URL = process.env.BLOG_URL ?? "https://sidetracked-two.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BLOG_URL),
  title: {
    default: "Sidetracked — Tech, Life & Everything In Between",
    template: "%s — Sidetracked",
  },
  description:
    "A blog about consumer electronics, tech, lifestyle, and whatever else comes up. No main quest here.",
  keywords: ["tech", "lifestyle", "consumer electronics", "gaming", "productivity", "opinion"],
  openGraph: {
    title: "Sidetracked",
    description: "Tech, life & everything in between.",
    type: "website",
    url: BLOG_URL,
    siteName: "Sidetracked",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidetracked",
    description: "Tech, life & everything in between.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
