"use client";

import { useState } from "react";
import {
  FileCode2,
  CheckCircle,
  Cpu,
  Binary,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  ChevronRight,
} from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  badge: string;
  status: string;
  description: string;
  icon: typeof FileCode2;
  color: string;
  snippet: {
    title: string;
    language: string;
    content: string;
  };
}

const STAGES: PipelineStage[] = [
  {
    id: "source",
    name: "01. Source Code",
    badge: "Syntax Parser",
    status: "Parsed",
    description: "Tokenizes high-level NP syntax with source span mapping and error recovery.",
    icon: FileCode2,
    color: "blue",
    snippet: {
      title: "main.np",
      language: "np",
      content: `import "time"

fn worker(id: int, out: chan string) {
    time.sleep(10)
    out <- "Task " + string(id) + " complete"
}

fn main() {
    let ch = make(chan string, 2)
    go worker(1, ch)
    go worker(2, ch)
    print(<-ch)
}`,
    },
  },
  {
    id: "semantics",
    name: "02. Semantic Engine",
    badge: "Type Checker",
    status: "Verified",
    description: "Infers types, validates method receiver bindings, and builds dynamic vtables.",
    icon: CheckCircle,
    color: "emerald",
    snippet: {
      title: "Symbol Resolution & VTables",
      language: "text",
      content: `[PASS 1] Symbol Scope Registration: 4 symbols defined
[PASS 2] Type Inference: 'ch' inferred as chan(string, capacity=2)
[PASS 3] Receiver Method Check: 0 mutable conflicts found
[PASS 4] Dynamic Interface Check: 100% type-safe
✓ Semantic verification completed in 1.4ms with 0 diagnostics`,
    },
  },
  {
    id: "llvm",
    name: "03. LLVM SSA Optimizer",
    badge: "IR Generator",
    status: "Optimized",
    description: "Lowers AST to Static Single Assignment LLVM IR with target-specific vectorization.",
    icon: Cpu,
    color: "indigo",
    snippet: {
      title: "Generated LLVM IR (Optimized -O3)",
      language: "llvm",
      content: `; Module: np_main (Target: x86_64-unknown-linux-gnu)
define void @np_worker(i64 %id, ptr %out_chan) {
entry:
  call void @np_runtime_sleep(i64 10)
  %fmt = call ptr @np_fmt_concat(i64 %id)
  call void @np_chan_send(ptr %out_chan, ptr %fmt)
  ret void
}`,
    },
  },
  {
    id: "native",
    name: "04. Native Binary",
    badge: "Clang Linker",
    status: "Ready to Ship",
    description: "Links NP runtime primitives into a standalone machine executable with zero VM overhead.",
    icon: Binary,
    color: "amber",
    snippet: {
      title: "Target Output Binary (ELF / PE)",
      language: "bash",
      content: `$ file ./main
./main: ELF 64-bit LSB pie executable, x86-64, dynamically linked

$ ./main
Task 1 complete
Task 2 complete

✓ Execution time: 10.2ms | Memory: 1.8MB`,
    },
  },
];

export function PipelineFlow() {
  const [selectedStage, setSelectedStage] = useState<string>("source");
  const current = STAGES.find((s) => s.id === selectedStage) || STAGES[0];

  return (
    <section className="py-16 md:py-24 border-y border-slate-200 bg-white/70 backdrop-blur-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 font-mono">
            <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>CONTINUOUS COMPILATION STREAM</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            From Source Code to Standalone Binary
          </h2>
          <p className="text-base text-slate-600">
            Click on any stage in the compilation pipeline to inspect the transformations applied by the NP compiler.
          </p>
        </div>

        {/* Pipeline Nodes Flow (Kargo-style) */}
        <div className="relative">
          {/* Animated Flow Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-slate-200 -z-0">
            <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 opacity-60 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = stage.id === selectedStage;

              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  type="button"
                  className={`text-left rounded-2xl border p-5 transition-all duration-200 ${
                    isSelected
                      ? "border-blue-600 bg-white shadow-md ring-2 ring-blue-500/20 scale-[1.02]"
                      : "border-slate-200 bg-white/90 hover:border-slate-300 hover:bg-white shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                        isSelected
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{stage.name}</h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400 font-mono text-[11px]">{stage.badge}</span>
                    <span
                      className={`flex items-center gap-0.5 ${
                        isSelected ? "text-blue-600" : "text-slate-400"
                      }`}
                    >
                      Inspect <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Stage Inspection Box */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-[#0d1117] shadow-lg overflow-hidden text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-slate-300 font-semibold">{current.snippet.title}</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
              Format: {current.snippet.language}
            </span>
          </div>

          <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-100 overflow-x-auto selection:bg-blue-600">
            <pre>
              <code>{current.snippet.content}</code>
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
}
