import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Chatbot } from "@/components/chat/chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-tools-catalog.local"),
  title: {
    default: "AI Tools Catalog",
    template: "%s | AI Tools Catalog",
  },
  description:
    "A curated catalog of AI tools with filters by category, pricing, and rating.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50`}
      >
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
          <Navbar />
          <main className="mx-auto flex w-full max-w-6xl flex-1 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
        <Chatbot />
      </body>
    </html>
  );
}
