"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Zap,
  Cpu,
  Boxes,
  Workflow,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Layers,
  Copy,
  Check,
  Code2,
  BookOpen,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const CODE_EXAMPLES = {
  concurrency: {
    title: "Concurrency & Channels",
    filename: "concurrency.np",
    code: `import "time"

fn worker(id: int, out: chan string) {
    time.sleep(20)
    out <- "Worker " + string(id) + " finished"
}

fn main() {
    let results = make(chan string, 3)

    // Launch concurrent tasks using 'go'
    go worker(1, results)
    go worker(2, results)
    go worker(3, results)

    // Receive results sequentially from channel
    print(<-results)
    print(<-results)
    print(<-results)
}`,
  },
  oop: {
    title: "Structs & Methods",
    filename: "oop.np",
    code: `struct Account {
    owner: string
    balance: float
}

// Mutating method receiver
fn (mut a Account) deposit(amount: float) {
    a.balance = a.balance + amount
}

fn (a Account) summary() -> string {
    return a.owner + " has balance: $" + string(a.balance)
}

fn main() {
    let mut acc = Account{owner: "Alex", balance: 100.0}
    acc.deposit(50.0)
    print(acc.summary())
}`,
  },
  stdlib: {
    title: "Standard Library",
    filename: "sysinfo.np",
    code: `import "os"
import "crypto"
import "sys"

fn main() {
    let cores = sys.num_cpus()
    let hash = crypto.sha256("NP High Performance")

    print("Target Architecture: " + sys.arch())
    print("Available CPU Cores: ")
    print(cores)
    print("SHA256 Digest: " + hash)
}`,
  },
  generics: {
    title: "Parametric Generics",
    filename: "generics.np",
    code: `fn wrap_pair[T, U](first: T, second: U) -> (T, U) {
    return (first, second)
}

fn main() {
    let (name, id) = wrap_pair[string, int]("compiler", 42)
    print("Paired entity: " + name)
    print(id)
}`,
  },
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<keyof typeof CODE_EXAMPLES>("concurrency");
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#edeef7] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Content */}
            <div className="space-y-6 text-center lg:col-span-6 lg:text-left">
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
                <span className="flex h-2 w-2 relative">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                </span>
                <span>NATIVE LLVM COMPILER • HIGH PERFORMANCE</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-black tracking-tight leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Simple as Python. <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Fast as C & Go.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 lg:mx-0 sm:text-lg font-medium">
                NP is a modern compiled language built for high-performance software. Write readable, elegant code that compiles directly to optimized LLVM machine binaries with Go-style goroutines and zero-cost abstractions.
              </p>

              {/* Value Promise Box */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3.5 text-xs sm:text-sm font-semibold text-slate-800 max-w-xl mx-auto lg:mx-0 text-left">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Direct Machine Code • Lightweight Goroutines • Zero VM Overhead</p>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">Self-contained native executables with C-compatible ABI and instant startup.</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col items-stretch sm:items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start max-w-md mx-auto lg:mx-0">
                <Link
                  href="/docs/introduction"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
                >
                  Explore Documentation <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a
                  href="https://github.com/peeb01/np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-base font-bold text-slate-700 shadow-xs transition-all duration-200 hover:bg-slate-50 hover:text-blue-600"
                >
                  GitHub Repository
                </a>
              </div>

              {/* Technology Badges */}
              <div className="pt-4 border-t border-slate-200/80">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Engineered with Modern Compiling Primitives
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs font-bold text-slate-700 lg:justify-start">
                  <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" /> LLVM IR Backend
                  </span>
                  <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                    <Workflow className="w-3.5 h-3.5 text-indigo-600" /> Go-Style CSP Channels
                  </span>
                  <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                    <Boxes className="w-3.5 h-3.5 text-emerald-600" /> Monomorphized Generics
                  </span>
                  <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                    <Terminal className="w-3.5 h-3.5 text-amber-600" /> Native CLI Toolchain
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Code Panel */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                {/* Code Window Header */}
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="ml-2 font-mono text-xs font-semibold text-slate-600">
                      {CODE_EXAMPLES[activeTab].filename}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(CODE_EXAMPLES[activeTab].code)}
                    type="button"
                    className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-600"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 bg-slate-50/50 px-3 pt-2 text-xs font-semibold overflow-x-auto">
                  {(Object.keys(CODE_EXAMPLES) as Array<keyof typeof CODE_EXAMPLES>).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`px-3 py-2 border-b-2 font-mono transition-colors whitespace-nowrap ${
                        activeTab === key
                          ? "border-blue-600 text-blue-600 bg-white rounded-t-lg"
                          : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {CODE_EXAMPLES[key].title}
                    </button>
                  ))}
                </div>

                {/* Code Editor Body */}
                <div className="p-4 sm:p-5 font-mono text-sm leading-relaxed bg-slate-900 text-slate-100 overflow-x-auto selection:bg-blue-600 selection:text-white">
                  <pre>
                    <code>{CODE_EXAMPLES[activeTab].code}</code>
                  </pre>
                </div>

                {/* Run Info Bar */}
                <div className="border-t border-slate-800 bg-slate-950 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Compiled via LLVM AOT Target
                  </span>
                  <span>np run {CODE_EXAMPLES[activeTab].filename}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Three Pillars Section (Matching the 3 Services in the screenshot) */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
              Core Language Pillars
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Engineered for Speed, Concurrency & Simplicity
            </h2>
            <p className="text-base text-slate-600">
              Three architectural pillars designed to give systems programmers modern syntax without sacrificing performance.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Pillar 1 */}
            <div className="rounded-2xl border border-slate-200 bg-[#edeef7]/40 p-8 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-blue-600">01 — NATIVE LLVM CODEGEN</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Native Performance</h3>
                <p className="text-xs font-mono text-slate-500">LLVM IR • O3 Optimizations • Zero-GC Pauses</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  NP translates code directly into LLVM Static Single Assignment (SSA) IR, taking full advantage of LLVM vectorization, inlining, and target-specific optimizations for AMD64, ARM64, and WebAssembly.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <Link
                  href="/docs/architecture"
                  className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Explore LLVM Pipeline <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-2xl border border-slate-200 bg-[#edeef7]/40 p-8 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-colors">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-indigo-600">02 — CONCURRENCY PRIMITIVES</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                  <Workflow className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Goroutines & Channels</h3>
                <p className="text-xs font-mono text-slate-500">go Keyword • CSP Channels • Work-Stealing Runtime</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Launch thousands of concurrent tasks using the <code className="bg-indigo-50 px-1 py-0.5 rounded text-indigo-700 font-bold">go</code> keyword. Typed FIFO channels provide lockless synchronization and safe data exchange between concurrent workers.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <Link
                  href="/docs/concurrency"
                  className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Learn Concurrency <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-2xl border border-slate-200 bg-[#edeef7]/40 p-8 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-emerald-600">03 — STRUCTURAL OOP & GENERICS</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Boxes className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Modern Type System</h3>
                <p className="text-xs font-mono text-slate-500">Value/Pointer Receivers • Dynamic Interfaces • Generics</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Model systems with clean structs, attach mutating or read-only methods, and achieve duck-typed dynamic polymorphism via implicit interfaces with fat-pointer vtables and compile-time monomorphization.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <Link
                  href="/docs/structs"
                  className="inline-flex items-center text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  Explore OOP & Types <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Four-Step Compilation Pipeline (Matching the 4-step process in screenshot) */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
              Compilation Pipeline
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              A Transparent Four-Stage Engineering Process
            </h2>
            <p className="text-base text-slate-600">
              From human-readable NP source code to production-grade standalone machine executables.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700 font-mono text-xs font-bold">
                01
              </span>
              <h3 className="text-lg font-bold text-slate-900">Lex & Parse</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tokenizes source with location tracking and parses code into an Abstract Syntax Tree (AST) with friendly syntax error recovery.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-mono text-xs font-bold">
                02
              </span>
              <h3 className="text-lg font-bold text-slate-900">Semantic Analysis</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Performs static type checking, receiver method resolution, interface contract validation, and symbol table management.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700 font-mono text-xs font-bold">
                03
              </span>
              <h3 className="text-lg font-bold text-slate-900">LLVM Codegen</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Emits optimized LLVM IR instructions, maps runtime memory layouts, and triggers LLVM target architecture optimization passes.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-mono text-xs font-bold">
                04
              </span>
              <h3 className="text-lg font-bold text-slate-900">Native Executable</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Links with the NP runtime thread pool and standard library, producing a single standalone native binary (ELF, PE, Mach-O).
              </p>
            </div>

          </div>

          {/* Quick CLI Run Preview Banner */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="font-mono text-xs font-bold text-blue-600 uppercase">One Command To Compile & Run</p>
              <h4 className="text-lg font-bold text-slate-900">Try it out in seconds</h4>
              <p className="text-sm text-slate-600">Clone the repo, build the compiler with CMake, and run your first NP program.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 font-mono text-xs text-slate-800">
                np run hello.np
              </div>
              <Link
                href="/docs/installation"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-xs"
              >
                Installation Guide
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Batteries-Included Standard Library Preview */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
              Batteries Included
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Standard Library Built for Systems
            </h2>
            <p className="text-base text-slate-600">
              Zero external dependencies required. Production-tested primitives ready for your applications.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            <Link
              href="/docs/stdlib-os"
              className="rounded-2xl border border-slate-200 bg-[#edeef7]/30 p-6 transition-all hover:bg-white hover:shadow-sm hover:border-blue-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold text-blue-600">os & sys</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-sm text-slate-600">
                File system I/O, directory scanning, environment variables, exit codes, and CPU hardware inspection.
              </p>
            </Link>

            <Link
              href="/docs/stdlib-crypto"
              className="rounded-2xl border border-slate-200 bg-[#edeef7]/30 p-6 transition-all hover:bg-white hover:shadow-sm hover:border-blue-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold text-indigo-600">crypto</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-sm text-slate-600">
                Cryptographic hashing routines including SHA256 and MD5 for data integrity and password authentication.
              </p>
            </Link>

            <Link
              href="/docs/stdlib-json"
              className="rounded-2xl border border-slate-200 bg-[#edeef7]/30 p-6 transition-all hover:bg-white hover:shadow-sm hover:border-blue-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold text-emerald-600">json</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-sm text-slate-600">
                Blazing fast JSON serialization, deserialization, and dynamic field traversal for web microservices.
              </p>
            </Link>

            <Link
              href="/docs/stdlib-time"
              className="rounded-2xl border border-slate-200 bg-[#edeef7]/30 p-6 transition-all hover:bg-white hover:shadow-sm hover:border-blue-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold text-amber-600">time</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-sm text-slate-600">
                High resolution nanosecond clocks, timers, sleep intervals, and latency benchmarking utilities.
              </p>
            </Link>

            <Link
              href="/docs/stdlib-regex"
              className="rounded-2xl border border-slate-200 bg-[#edeef7]/30 p-6 transition-all hover:bg-white hover:shadow-sm hover:border-blue-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold text-rose-600">regex</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-sm text-slate-600">
                Pattern matching engine with capture groups and string replacement capabilities.
              </p>
            </Link>

            <Link
              href="/docs/stdlib"
              className="rounded-2xl border border-slate-200 bg-[#edeef7]/30 p-6 transition-all hover:bg-white hover:shadow-sm hover:border-blue-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold text-slate-800">Module System</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-sm text-slate-600">
                Clean, import-based module resolution allowing clean separation of concern and code sharing.
              </p>
            </Link>

          </div>
        </div>
      </section>

      {/* Bottom CTA Section (Matching CTA Box in the screenshot) */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 sm:p-16 shadow-sm space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
              Get Started with NP
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Ready to write fast, elegant code?
            </h2>
            <p className="mx-auto max-w-xl text-base text-slate-600 leading-relaxed font-medium">
              Dive into the official documentation, inspect real language examples, or build the compiler directly from GitHub.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/docs/introduction"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                Read The Documentation →
              </Link>
              <a
                href="https://github.com/peeb01/np"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-8 py-3.5 text-base font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                peeb01/np on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
