"use client";

import { useState } from "react";
import { Terminal, Copy, Check, Play } from "lucide-react";

interface CodeSnippet {
  id: string;
  tabLabel: string;
  filename: string;
  code: string;
  output: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: "structs",
    tabLabel: "Custom Structs",
    filename: "user.np",
    code: `# Define a custom struct with typed fields
struct User:
    string name
    int age
    bool is_active

# Automatic constructor initialization
User u = User("Alice", 25, true)

print("User Name:", u.name)
print("Age:", u.age)

# Mutating struct field
u.age = 26
print("Updated Age:", u.age)`,
    output: `User Name: Alice
Age: 25
Updated Age: 26
[Done] Program exited with status code 0 (1.8ms)`,
  },
  {
    id: "comprehensions",
    tabLabel: "List & Dict Comprehensions",
    filename: "comprehension.np",
    code: `# List comprehension with mapping
array doubled = [x * 2 for x in range(1, 6)]
print("Doubled numbers:", doubled)

# Filtering with conditions
array filtered = [x for x in doubled if x > 5]
print("Values > 5:", filtered)

# Dictionary comprehension
dict mapping = {x: x * 10 for x in range(1, 4)}
print("Dictionary:", mapping)`,
    output: `Doubled numbers: [2, 4, 6, 8, 10]
Values > 5: [6, 8, 10]
Dictionary: {"1": 10, "2": 20, "3": 30}
[Done] Program exited with status code 0 (2.2ms)`,
  },
  {
    id: "functions",
    tabLabel: "Functions & Loops",
    filename: "math_ops.np",
    code: `fn factorial(int n) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Iterative loop
for i in range(1, 5):
    print("Factorial of", i, "=", factorial(i))`,
    output: `Factorial of 1 = 1
Factorial of 2 = 2
Factorial of 3 = 6
Factorial of 4 = 24
[Done] Program exited with status code 0 (1.5ms)`,
  },
  {
    id: "system",
    tabLabel: "OS & System Info",
    filename: "sysinfo.np",
    code: `import "sys"
import "time"

print("Operating System:", sys.os_name())
print("CPU Architecture:", sys.arch())
print("Logical Cores:", sys.num_cpus())
print("Current Timestamp (ms):", time.now_ms())`,
    output: `Operating System: Linux
CPU Architecture: x86_64
Logical Cores: 16
Current Timestamp (ms): 1790691500120
[Done] Program exited with status code 0 (2.9ms)`,
  },
];

export function InteractiveCode() {
  const [activeId, setActiveId] = useState<string>("structs");
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
    }, 350);
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
            Interactive Code Tour
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Clean Syntax, Real Speed
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Select any tab below and click Run to test simulated execution in NP.
          </p>
        </div>

        {/* Code Runner Card */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-[#0d1117] shadow-lg overflow-hidden text-slate-100">
          
          {/* Top Bar with Sticky Action Buttons (Run & Copy NEVER hidden!) */}
          <div className="relative flex items-center justify-between border-b border-slate-800 bg-slate-900">
            {/* Scrollable Tabs */}
            <div className="flex gap-1 overflow-x-auto px-3 pt-2.5 pb-0 shrink min-w-0 pr-2">
              {SNIPPETS.map((snippet) => (
                <button
                  key={snippet.id}
                  onClick={() => {
                    setActiveId(snippet.id);
                    setShowOutput(true);
                  }}
                  className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap font-mono shrink-0 ${
                    activeId === snippet.id
                      ? "bg-[#0d1117] text-blue-400 border-t-2 border-blue-500"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  {snippet.tabLabel}
                </button>
              ))}
            </div>

            {/* Pinned / Sticky Action Buttons on the Right */}
            <div className="sticky right-0 bg-slate-900/95 pl-4 pr-3 py-2 flex items-center gap-2 shrink-0 shadow-[-12px_0_16px_rgba(15,23,42,0.8)] z-10">
              <button
                onClick={handleCopy}
                type="button"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handleRun}
                disabled={isRunning}
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? "Running..." : "Run"}</span>
              </button>
            </div>
          </div>

          {/* Code Window with Whitespace Preserved */}
          <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-[#0d1117] text-slate-100 selection:bg-blue-600">
            <pre className="whitespace-pre">
              <code>{current.code}</code>
            </pre>
          </div>

          {/* Terminal Output */}
          <div className="border-t border-slate-800 bg-slate-950 p-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-500">$</span>
              <span className="text-slate-300">np {current.filename}</span>
            </div>

            {isRunning ? (
              <div className="text-blue-400 animate-pulse py-1">
                Compiling and executing native code...
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
