import Link from "next/link";
import { Zap, BookOpen, Terminal, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-12 text-slate-600 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white">
                <Zap className="h-4 w-4 fill-current" />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">NP Language</span>
            </div>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              A modern statically-typed compiled language combining Python-like clarity with Go-style concurrency and LLVM native speed.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/peeb01/np"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                peeb01/np
              </a>
              <span className="text-xs text-slate-600 font-mono">v0.2.0 • MIT License</span>
            </div>
          </div>

          {/* Docs Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Documentation</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs/introduction" className="hover:text-blue-600 transition-colors">
                  Introduction
                </Link>
              </li>
              <li>
                <Link href="/docs/installation" className="hover:text-blue-600 transition-colors">
                  Installation & CLI
                </Link>
              </li>
              <li>
                <Link href="/docs/basics" className="hover:text-blue-600 transition-colors">
                  Variables & Types
                </Link>
              </li>
              <li>
                <Link href="/docs/functions" className="hover:text-blue-600 transition-colors">
                  Functions & Returns
                </Link>
              </li>
              <li>
                <Link href="/docs/structs" className="hover:text-blue-600 transition-colors">
                  Structs & OOP
                </Link>
              </li>
            </ul>
          </div>

          {/* Pillars Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Core Pillars</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs/concurrency" className="hover:text-blue-600 transition-colors">
                  Goroutines & Tasks
                </Link>
              </li>
              <li>
                <Link href="/docs/channels" className="hover:text-blue-600 transition-colors">
                  Channels & Sync
                </Link>
              </li>
              <li>
                <Link href="/docs/interfaces" className="hover:text-blue-600 transition-colors">
                  Interfaces & Polymorphism
                </Link>
              </li>
              <li>
                <Link href="/docs/generics" className="hover:text-blue-600 transition-colors">
                  Parametric Generics
                </Link>
              </li>
              <li>
                <Link href="/docs/architecture" className="hover:text-blue-600 transition-colors">
                  LLVM Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Standard Library */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Standard Library</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs/stdlib" className="hover:text-blue-600 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/docs/stdlib-os" className="hover:text-blue-600 transition-colors">
                  os & sys
                </Link>
              </li>
              <li>
                <Link href="/docs/stdlib-crypto" className="hover:text-blue-600 transition-colors">
                  crypto (SHA256, MD5)
                </Link>
              </li>
              <li>
                <Link href="/docs/stdlib-json" className="hover:text-blue-600 transition-colors">
                  json Serialization
                </Link>
              </li>
              <li>
                <Link href="/docs/stdlib-time" className="hover:text-blue-600 transition-colors">
                  time & Benchmarking
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NP Programming Language Project. Open source under MIT License.</p>
          <p className="mt-4 sm:mt-0 font-medium">Engineered for high-performance systems programming.</p>
        </div>
      </div>
    </footer>
  );
}
