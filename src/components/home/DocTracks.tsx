import Link from "next/link";
import {
  Compass,
  Boxes,
  Workflow,
  Library,
  BookOpen,
  Cpu,
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
    badge: "Basics",
    description: "Learn how to install the compiler, understand the project layout, and write your first program.",
    icon: Compass,
    href: "/docs/introduction",
    links: [
      { label: "Introduction to NP", href: "/docs/introduction" },
      { label: "Installation & CLI Toolchain", href: "/docs/installation" },
      { label: "Hello World & Pipeline", href: "/docs/hello-world" },
    ],
  },
  {
    title: "Language Concepts",
    badge: "Core Syntax",
    description: "Explore static types, control flow structures, first-class functions, and tuple returns.",
    icon: Boxes,
    href: "/docs/basics",
    links: [
      { label: "Variables & Primitive Types", href: "/docs/basics" },
      { label: "Control Flow & Loops", href: "/docs/control-flow" },
      { label: "Functions & Closures", href: "/docs/functions" },
    ],
  },
  {
    title: "Object-Oriented Programming",
    badge: "Types & VTables",
    description: "Design clean models with structs, receiver methods, and dynamic implicit interfaces.",
    icon: BookOpen,
    href: "/docs/structs",
    links: [
      { label: "Structs & Memory Layout", href: "/docs/structs" },
      { label: "Value & Mutating Receivers", href: "/docs/methods" },
      { label: "Interfaces & Polymorphism", href: "/docs/interfaces" },
    ],
  },
  {
    title: "Concurrency & Runtime",
    badge: "CSP Primitives",
    description: "Harness lightweight goroutines and typed FIFO channels for lock-free parallel execution.",
    icon: Workflow,
    href: "/docs/concurrency",
    links: [
      { label: "Goroutines (go keyword)", href: "/docs/concurrency" },
      { label: "Channels & Synchronization", href: "/docs/channels" },
    ],
  },
  {
    title: "Standard Library Reference",
    badge: "Batteries Included",
    description: "Explore production-grade modules with zero external dependencies.",
    icon: Library,
    href: "/docs/stdlib",
    links: [
      { label: "Standard Library Overview", href: "/docs/stdlib" },
      { label: "os & sys (System)", href: "/docs/stdlib-os" },
      { label: "crypto (SHA256, MD5)", href: "/docs/stdlib-crypto" },
      { label: "json (Serialization)", href: "/docs/stdlib-json" },
      { label: "time (High-Res Timers)", href: "/docs/stdlib-time" },
      { label: "regex (Pattern Engine)", href: "/docs/stdlib-regex" },
    ],
  },
  {
    title: "Compiler Architecture",
    badge: "Deep Dive",
    description: "Inspect LLVM intermediate representation, compiler flags, and native code generation.",
    icon: Cpu,
    href: "/docs/architecture",
    links: [
      { label: "Generics & Monomorphization", href: "/docs/generics" },
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
