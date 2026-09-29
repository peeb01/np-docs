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

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/document.np" : "");

export const metadata: Metadata = {
  title: "NP Programming Language | Official Documentation",
  description:
    "Official documentation for NP: A lightweight scripting language combining clean Python-style syntax and comprehensions with native C++ execution speeds and automated memory management via LLVM.",
  keywords: ["NP", "programming language", "LLVM", "compiler", "docs", "pythonic", "native binary"],
  authors: [{ name: "NP Language Core Team" }],
  icons: {
    icon: [
      { url: `${basePath}/NP.png`, type: "image/png" },
      { url: `${basePath}/favicon.ico` },
    ],
    shortcut: `${basePath}/NP.png`,
    apple: `${basePath}/NP.png`,
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
        <link rel="icon" type="image/png" href={`${basePath}/NP.png`} />
        <link rel="shortcut icon" href={`${basePath}/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${basePath}/NP.png`} />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
