"use client";

import { useState } from "react";
import { Terminal, Copy, Check, Play, Zap } from "lucide-react";

interface CodeSnippet {
  id: string;
  tabLabel: string;
  filename: string;
  code: string;
  output: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: "concurrency",
    tabLabel: "Goroutines & Channels",
    filename: "concurrency.np",
    code: `import "time"

fn worker(id: int, out: chan string) {
    time.sleep(15)
    out <- "Task " + string(id) + " processed!"
}

fn main() {
    let ch = make(chan string, 3)

    // Schedule concurrent jobs on the thread pool
    go worker(1, ch)
    go worker(2, ch)
    go worker(3, ch)

    // Synchronize and collect results
    print(<-ch)
    print(<-ch)
    print(<-ch)
}`,
    output: `Task 1 processed!
Task 2 processed!
Task 3 processed!
[Done] Program exited with status code 0 (15.4ms)`,
  },
  {
    id: "methods",
    tabLabel: "Mutating Struct Methods",
    filename: "bank.np",
    code: `struct BankAccount {
    owner: string
    balance: float
}

// Mutating pointer receiver
fn (mut b BankAccount) deposit(amount: float) {
    b.balance = b.balance + amount
}

fn (b BankAccount) summary() -> string {
    return b.owner + " balance: $" + string(b.balance)
}

fn main() {
    let mut acc = BankAccount{owner: "Alice", balance: 50.0}
    acc.deposit(150.0)
    print(acc.summary())
}`,
    output: `Alice balance: $200.0
[Done] Program exited with status code 0 (2.1ms)`,
  },
  {
    id: "interfaces",
    tabLabel: "Dynamic Interfaces",
    filename: "polymorphism.np",
    code: `interface Greeter {
    fn greet(target: string) -> string
}

struct Robot {
    model: string
}

fn (r Robot) greet(target: string) -> string {
    return "Beep boop, hello " + target + " from " + r.model
}

fn run_greeting(g: Greeter) {
    print(g.greet("World"))
}

fn main() {
    let bot = Robot{model: "NP-X1"}
    run_greeting(bot) // Implicit interface satisfaction
}`,
    output: `Beep boop, hello World from NP-X1
[Done] Program exited with status code 0 (2.4ms)`,
  },
  {
    id: "stdlib",
    tabLabel: "Batteries-Included Stdlib",
    filename: "system_info.np",
    code: `import "sys"
import "crypto"

fn main() {
    let cpus = sys.num_cpus()
    let arch = sys.arch()
    let digest = crypto.sha256("NP Language Native")

    print("Architecture: " + arch)
    print("Logical CPU Cores: ")
    print(cpus)
    print("SHA256: " + digest)
}`,
    output: `Architecture: x86_64
Logical CPU Cores: 16
SHA256: 7d25e0a6d...
[Done] Program exited with status code 0 (3.2ms)`,
  },
];

export function InteractiveCode() {
  const [activeId, setActiveId] = useState<string>("concurrency");
  const [showOutput, setShowOutput] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const current = SNIPPETS.find((s) => s.id === activeId) || SNIPPETS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 400);
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
            Interactive Code Tour
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Clean Syntax, Real Speed
          </h2>
          <p className="text-base text-slate-600">
            Switch tabs below to see how NP solves real programming challenges with minimal boilerplate.
          </p>
        </div>

        {/* Code Runner Card */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-[#0d1117] shadow-xl overflow-hidden text-slate-100">
          
          {/* Top Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 pt-3 overflow-x-auto">
            <div className="flex gap-2">
              {SNIPPETS.map((snippet) => (
                <button
                  key={snippet.id}
                  onClick={() => {
                    setActiveId(snippet.id);
                    setShowOutput(true);
                  }}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap font-mono ${
                    activeId === snippet.id
                      ? "bg-[#0d1117] text-blue-400 border-t-2 border-blue-500"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  {snippet.tabLabel}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 pb-2">
              <button
                onClick={handleCopy}
                type="button"
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handleRun}
                disabled={isRunning}
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isRunning ? "Compiling..." : "Run"}</span>
              </button>
            </div>
          </div>

          {/* Code Window */}
          <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-[#0d1117] text-slate-100 selection:bg-blue-600">
            <pre>
              <code>{current.code}</code>
            </pre>
          </div>

          {/* Terminal Output */}
          <div className="border-t border-slate-800 bg-slate-950 p-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-500">$</span>
              <span className="text-slate-300">np run {current.filename}</span>
            </div>

            {isRunning ? (
              <div className="text-blue-400 animate-pulse py-1">
                Optimizing LLVM IR and executing binary...
              </div>
            ) : showOutput ? (
              <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                {current.output}
              </pre>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
}
