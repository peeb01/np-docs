"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Menu, X, Search, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-black text-2xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              NP
            </span>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-bold tracking-wide text-blue-600 border border-blue-200">
              v1.1
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <Link
            href="/docs/introduction"
            className="transition-colors hover:text-blue-600 flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            Documentation
          </Link>
          <Link
            href="/docs/installation"
            className="transition-colors hover:text-blue-600"
          >
            Installation
          </Link>
          <Link
            href="/docs/basics"
            className="transition-colors hover:text-blue-600"
          >
            Basics &amp; Types
          </Link>
          <Link
            href="/docs/structs"
            className="transition-colors hover:text-blue-600"
          >
            Structs
          </Link>
          <Link
            href="/docs/stdlib"
            className="transition-colors hover:text-blue-600"
          >
            Standard Library
          </Link>
          <Link
            href="/docs/architecture"
            className="transition-colors hover:text-blue-600"
          >
            LLVM Architecture
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/docs/introduction"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow active:scale-95"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/peeb01/np"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-blue-600"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-5 shadow-lg space-y-3">
          <Link
            href="/docs/introduction"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600"
          >
            Documentation
          </Link>
          <Link
            href="/docs/basics"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600"
          >
            Language Basics
          </Link>
          <Link
            href="/docs/structs"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600"
          >
            Custom Structs
          </Link>
          <Link
            href="/docs/stdlib"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600"
          >
            Standard Library
          </Link>
          <Link
            href="/docs/architecture"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600"
          >
            Compiler Architecture
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://github.com/peeb01/np"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-bold text-slate-700"
            >
              <GithubIcon className="w-4 h-4" /> View peeb01/np on GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
