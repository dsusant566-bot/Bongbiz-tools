import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "./_components/site-footer";
import { SidebarLayout } from "./_components/sidebar";
import { WhatsAppFloatButton } from "./_components/whatsapp-float";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { baseMetadata } from "./metadata.config";

export const metadata: Metadata = {
  ...baseMetadata,
  manifest: "/manifest.json",
  icons: {
    apple: "/logo.png",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        
        {/* মডিফাইড হেডার সেকশন */}
        <header className="flex flex-wrap items-center px-4 md:px-6 py-4 border-b border-white/5 print:hidden justify-between">
          
          {/* লোগো সেকশন */}
          <div className="flex items-center gap-3 mb-2 sm:mb-0">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-9 md:h-10 w-auto object-contain" 
            />
            <span className="text-lg font-bold tracking-tight text-white">
              BongoBiz Tools
            </span>
          </div>

          {/* --- মডিফাইড বাটন সেকশন (পাবলিকের জন্য পরিষ্কার টেক্সট) --- */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <a 
              href="https://bongobiz.com" 
              target="_blank" 
              className="whitespace-nowrap px-3 py-1.5 text-[11px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-lg hover:bg-zinc-700 hover:text-white transition-all"
            >
              🌐 MAIN SITE
            </a>
            
            <a 
              href="/loan-inquiry" 
              className="whitespace-nowrap px-3 py-1.5 text-[11px] font-bold bg-blue-600/10 text-blue-400 border border-blue-500/40 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-900/10"
            >
              💰 APPLY FOR LOAN
            </a>
            
            <a 
              href="/create-website" 
              className="whitespace-nowrap px-3 py-1.5 text-[11px] font-bold bg-emerald-600/10 text-emerald-400 border border-emerald-500/40 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-lg shadow-emerald-900/10"
            >
              🚀 ORDER WEBSITE
            </a>
          </div>
          {/* --- বাটন শেষ --- */}
          
        </header>

        <SidebarLayout>{children}</SidebarLayout>
        <SiteFooter />
        <WhatsAppFloatButton phone="917585999923" />
      </body>
    </html>
  );
}