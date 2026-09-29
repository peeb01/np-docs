import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NP Programming Language | Official Documentation",
  description:
    "Official documentation for NP: A lightweight scripting language combining clean Python-style syntax and comprehensions with native C++ execution speeds and automated memory management via LLVM.",
  keywords: ["NP", "programming language", "LLVM", "compiler", "docs", "pythonic", "native binary"],
  authors: [{ name: "NP Language Core Team" }],
  icons: {
    icon: "/NP.png",
    shortcut: "/NP.png",
    apple: "/NP.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/NP.png" />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
