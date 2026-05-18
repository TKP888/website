import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Antony Petsas - Videographer, Editor & Developer",
  description: "Antony Petsas - Videographer, Editor & Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-900">
        <Header />
        <main className="flex-grow pt-28 md:pt-32">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
