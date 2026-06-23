import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuxeRealty — Premium Properties in Mumbai",
  description: "Discover premium residential, commercial & luxury properties in Mumbai. Trusted by 3,200+ clients since 2009. RERA registered. Worli, Bandra, Juhu, Powai, BKC & more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://db.brewhouse.realatte.com/api/chatbot/widget.js"
          data-chatbot="cbk_pub_41016b05b5d2c6bd0e188d35"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
