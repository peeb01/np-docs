"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Copy, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const installCmd = "alias np='docker run --rm -it -v \"$PWD\":/workspace pib21/np-lang:alpine-3.22'";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/40 via-indigo-50/20 to-transparent pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-xs mb-6 backdrop-blur-sm">
          <span className="flex h-2 w-2 relative">
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
          </span>
          <span className="font-mono font-bold">NP Compiler</span>
          <span className="text-slate-300">|</span>
          <span>Pythonic Syntax • Native LLVM Execution</span>
        </div>

        {/* Hero Title */}
        <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
          Pythonic Simplicity.{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Native C++ Speed.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
          NP is a lightweight scripting language combining clean Python-style syntax and comprehensions with native C++ execution speeds and automated memory management via LLVM.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/docs/introduction"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Explore Documentation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <Link
            href="/docs/installation"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:border-slate-400 active:scale-95"
          >
            Installation Guide
          </Link>

          <a
            href="https://github.com/peeb01/np-compiler"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:border-slate-400 active:scale-95"
          >
            <GithubIcon className="w-4 h-4 mr-2" />
            GitHub
          </a>
        </div>

        {/* Quick CLI Run Box */}
        <div className="mt-10 mx-auto max-w-xl">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/90 p-2 shadow-xs backdrop-blur-sm">
            <div className="flex items-center gap-2.5 pl-3 font-mono text-xs sm:text-sm text-slate-700 truncate">
              <Terminal className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-slate-400 select-none">$</span>
              <span className="truncate">{installCmd}</span>
            </div>
            <button
              onClick={handleCopy}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600 active:scale-95 shrink-0 ml-2"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Instant zero-install setup via Docker. Or compile from source with LLVM.
          </p>
        </div>
      </div>
    </section>
  );
}
