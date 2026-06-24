import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ajay-c.dev"),
  title: {
    default: "Ajay C — Aspiring Software Developer",
    template: "%s · Ajay C",
  },
  description: site.description,
  keywords: [
    "Ajay C",
    "AI Engineer",
    "Full-Stack Developer",
    "RAG",
    "LangGraph",
    "Reinforcement Learning",
    "PSG Tech",
    "Machine Learning",
  ],
  authors: [{ name: "Ajay C", url: site.linkedin }],
  creator: "Ajay C",
  openGraph: {
    type: "website",
    title: "Ajay C — Aspiring Software Developer",
    description: site.description,
    siteName: "Ajay C",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay C — Aspiring Software Developer",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="custom-cursor-active bg-bg text-text antialiased">
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
