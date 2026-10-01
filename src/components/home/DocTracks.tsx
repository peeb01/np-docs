import Link from "next/link";
import {
  Compass,
  Boxes,
  Workflow,
  Library,
  BookOpen,
  Cpu,
  Zap,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

interface DocTrack {
  title: string;
  badge: string;
  description: string;
  icon: typeof Compass;
  href: string;
  links: {
    label: string;
    href: string;
  }[];
}

const TRACKS: DocTrack[] = [
  {
    title: "Getting Started",
    badge: "Quickstart",
    description: "Learn how to run NP via Docker, download pre-built binaries, or build from source with CMake.",
    icon: Compass,
    href: "/docs/installation",
    links: [
      { label: "Introduction to NP", href: "/docs/introduction" },
      { label: "Installation & Setup Guide", href: "/docs/installation" },
      { label: "Hello World & CLI Options", href: "/docs/hello-world" },
    ],
  },
  {
    title: "Language Fundamentals",
    badge: "Syntax",
    description: "Explore primitive types, dynamic variables (var), operators, and indentation control flow.",
    icon: Boxes,
    href: "/docs/basics",
    links: [
      { label: "Variables & Type System", href: "/docs/basics" },
      { label: "Control Flow & Loops", href: "/docs/control-flow" },
      { label: "Functions & Parameters", href: "/docs/functions" },
    ],
  },
  {
    title: "Data Structures & Structs",
    badge: "Models",
    description: "Create dynamic arrays, associative dictionaries, custom structs, and Pythonic comprehensions.",
    icon: BookOpen,
    href: "/docs/structs",
    links: [
      { label: "Arrays & Dictionaries", href: "/docs/collections" },
      { label: "Custom Structs & Fields", href: "/docs/structs" },
      { label: "Pythonic Comprehensions", href: "/docs/comprehensions" },
    ],
  },
  {
    title: "Advanced Features",
    badge: "Core",
    description: "Organize modules with imports, use native 128/256-bit big integers, and handle exceptions.",
    icon: Workflow,
    href: "/docs/modules",
    links: [
      { label: "Modules & Import System", href: "/docs/modules" },
      { label: "Concurrency & Channels", href: "/docs/concurrency" },
      { label: "128 & 256-Bit Integers", href: "/docs/big-integers" },
      { label: "Exception Handling (try/except)", href: "/docs/exceptions" },
    ],
  },
  {
    title: "Standard Library Reference",
    badge: "Modules",
    description: "Explore built-in modules for operating systems, high-res timers, JSON, cryptography, and networking.",
    icon: Library,
    href: "/docs/stdlib",
    links: [
      { label: "Standard Library Overview", href: "/docs/stdlib" },
      { label: "sys Module (CLI Args)", href: "/docs/stdlib-sys" },
      { label: "time & Clock Module", href: "/docs/stdlib-time" },
      { label: "os Module (System & Files)", href: "/docs/stdlib-os" },
      { label: "json Serialization", href: "/docs/stdlib-json" },
      { label: "regex Pattern Engine", href: "/docs/stdlib-regex" },
      { label: "crypto Module (SHA-256)", href: "/docs/stdlib-crypto" },
      { label: "net Module (TCP Sockets)", href: "/docs/stdlib-net" },
    ],
  },
  {
    title: "GPU Computing & Acceleration",
    badge: "v1.1 Core",
    description: "Write bare-metal NVIDIA GPU kernels with LLVM NVPTX, zero-dependency Driver API, and high-performance dispatch.",
    icon: Zap,
    href: "/docs/gpu-overview",
    links: [
      { label: "GPU Overview & Architecture", href: "/docs/gpu-overview" },
      { label: "Grid, Blocks & Threads Model", href: "/docs/gpu-threads" },
      { label: "Writing GPU Kernels", href: "/docs/gpu-kernels" },
      { label: "gpu Module API Reference", href: "/docs/stdlib-gpu" },
      { label: "Vector & Matrix MatMul Guide", href: "/docs/gpu-benchmarks" },
    ],
  },
  {
    title: "LLVM Compiler Architecture",
    badge: "Deep Dive",
    description: "Understand how the AST is lowered to LLVM IR, optimized at -O3, and linked with libnpruntime.a.",
    icon: Cpu,
    href: "/docs/architecture",
    links: [
      { label: "LLVM IR Codegen Pipeline", href: "/docs/architecture" },
    ],
  },
];

export function DocTracks() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
            Documentation Tracks
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Choose Your Learning Pathway
          </h2>
          <p className="text-base text-slate-600">
            Structured documentation modules designed for developers, systems engineers, and language enthusiasts.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRACKS.map((track) => {
            const Icon = track.icon;

            return (
              <div
                key={track.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 font-mono uppercase">
                      {track.badge}
                    </span>
                  </div>

                  <Link href={track.href} className="group-hover:text-blue-600 transition-colors">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
                      {track.title}
                    </h3>
                  </Link>

                  <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {track.description}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {track.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-blue-600 py-1 transition-colors"
                      >
                        <span className="truncate">{link.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <Link
                    href={track.href}
                    className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    View section <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
