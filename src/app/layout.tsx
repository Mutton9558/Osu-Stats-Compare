import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { version } from "../../package.json"

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
  description: "Compares 2 players' osu! statistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {children}
        <footer className="sticky bottom-0 w-screen bg-white p-4 border-t text-center text-sm text-gray-500 dark:text-white dark:bg-gray-800">
          <p className="font-mono text-gray-500 dark:text-white">Osu Stats Compare v{version} | MIT Licensed</p>
        </footer>
      </body>
    </html>
  );
}
