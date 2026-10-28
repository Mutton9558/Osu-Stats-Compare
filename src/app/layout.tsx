import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Osu Stats Compare",
  description: "Compare osu! player's statistics side-by-side!",
  openGraph: {
    title: 'Osu Stats Compare',
    description: "Compare osu! player's statistics side-by-side!",
    url: 'https://osu-stats-compare.vercel.app/',
    siteName: 'Osu Stats Compare',
    images: [
      {
        url: 'https://osu-stats-compare.vercel.app/sitelogo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Osu Stats Compare',
    description: "Compare osu! player's statistics side-by-side!",
    images: ['https://osu-stats-compare.vercel.app/sitelogo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white dark:bg-gray-800`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
