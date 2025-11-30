import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/components/providers/AppProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Global Academic Forum",
  description: "Live academic seminars, policy dialogues, and research briefings for BRICS and global partners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <AppProviders>
          <div className="grain-overlay relative flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
            <Header />
            <main className="relative z-10 w-full flex-1">
              <div className="mx-auto w-full max-w-[1740px] px-6 py-10 lg:px-10 xl:px-16">{children}</div>
            </main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
