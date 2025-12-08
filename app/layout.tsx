import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "My portfolio showcasing my projects",
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
      </body>
    </html>
  );
}
