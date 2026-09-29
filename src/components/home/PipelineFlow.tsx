"use client";

import { useState } from "react";
import {
  FileCode2,
  CheckCircle,
  Cpu,
  Binary,
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
    badge: "Lexer & Parser",
    status: "Parsed",
    description: "Scans Pythonic .np indentation blocks and constructs a typed Abstract Syntax Tree (AST).",
    icon: FileCode2,
    snippet: {
      title: "main.np (Pythonic Syntax)",
      language: "np",
      content: `# Define typed struct
struct User:
    string name
    int age

# Function returning typed value
fn create_user(string n, int a) -> User:
    return User(n, a)

User u = create_user("Alice", 25)
print("Welcome:", u.name)

# List comprehension
array doubled = [x * 2 for x in range(1, 4)]
print("Result:", doubled)`,
    },
  },
  {
    id: "semantics",
    name: "02. AST & Type Verification",
    badge: "Semantic Analyzer",
    status: "Verified",
    description: "Enforces type checking for primitives, validates struct field access, and manages variable scoping.",
    icon: CheckCircle,
    snippet: {
      title: "AST Verification & Scoping Pass",
      language: "text",
      content: `[STAGE 1] Lexical tokenization completed: 42 tokens
[STAGE 2] AST Syntax nodes generated: StructDecl(User), FuncDecl(create_user)
[STAGE 3] Type checking: Return type matches User struct definition
[STAGE 4] RAII Memory Management: Reference counts mapped to std::shared_ptr
✓ 0 type errors, memory verification passed`,
    },
  },
  {
    id: "llvm",
    name: "03. LLVM CodeGen (-O3)",
    badge: "LLVM IR Generator",
    status: "Optimized",
    description: "Lowers AST nodes into LLVM SSA Intermediate Representation with industrial -O3 compiler passes.",
    icon: Cpu,
    snippet: {
      title: "Generated LLVM SSA IR",
      language: "llvm",
      content: `; Module: np_main (Target: x86_64-unknown-linux-gnu)
%struct.User = type { ptr, i64 }

define ptr @create_user(ptr %n, i64 %a) {
entry:
  %user = call ptr @np_alloc_struct(i64 16)
  call void @np_struct_set_field(ptr %user, i64 0, ptr %n)
  call void @np_struct_set_field(ptr %user, i64 1, i64 %a)
  ret ptr %user
}`,
    },
  },
  {
    id: "native",
    name: "04. Standalone Binary",
    badge: "Linker (g++)",
    status: "Ready to Run",
    description: "Links object code with runtime/libnpruntime.a to produce a single native executable (app.out).",
    icon: Binary,
    snippet: {
      title: "Native Execution (app.out)",
      language: "bash",
      content: `$ np build main.np
[NP] Compiling main.np to native machine code...
[NP] LLVM -O3 optimization passes applied
[NP] Linked with runtime/libnpruntime.a -> app.out

$ ./app.out
Welcome: Alice
Result: [2, 4, 6]

✓ Standalone execution completed without external VM or Python runtime`,
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
            From Pythonic Source to Native Binary
          </h2>
          <p className="text-base text-slate-600">
            Click on each phase of the NP compilation pipeline to inspect the code transformation.
          </p>
        </div>

        {/* Pipeline Nodes Flow (Kargo-style) */}
        <div className="relative">
          {/* Animated Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-slate-200 -z-0">
            <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 opacity-60 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {STAGES.map((stage) => {
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

        {/* Live Stage Inspection Box (Clean Minimal Light Container) */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 shadow-xs overflow-hidden text-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-mono text-slate-800 font-bold">{current.snippet.title}</span>
            </div>
            <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              Format: {current.snippet.language}
            </span>
          </div>

          <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-800 overflow-x-auto selection:bg-blue-100">
            <pre>
              <code>{current.snippet.content}</code>
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
}
