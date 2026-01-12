import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Antony Petsas - Full Stack Developer",
  description: "Antony Petsas - Full Stack Developer",
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
        <main className="flex-grow pt-20 md:pt-28">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
