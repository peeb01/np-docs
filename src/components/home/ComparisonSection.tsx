import { Check, X, Zap } from "lucide-react";

export function ComparisonSection() {
  const features = [
    {
      name: "Native Machine Speed (LLVM AOT)",
      np: true,
      python: false,
      go: true,
      cpp: true,
    },
    {
      name: "Go-Style Goroutines & Channels",
      np: true,
      python: false,
      go: true,
      cpp: false,
    },
    {
      name: "Python-Like Readability & Syntax",
      np: true,
      python: true,
      go: false,
      cpp: false,
    },
    {
      name: "Zero GC Pauses & Deterministic Layout",
      np: true,
      python: false,
      go: false,
      cpp: true,
    },
    {
      name: "Batteries-Included Standard Library",
      np: true,
      python: true,
      go: true,
      cpp: false,
    },
    {
      name: "Single Standalone Executable Binary",
      np: true,
      python: false,
      go: true,
      cpp: true,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
            Language Landscape
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Where NP Fits In
          </h2>
          <p className="text-base text-slate-600">
            A balanced architecture combining ergonomic syntax with raw native execution.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase text-slate-600 font-mono">
                  <th className="py-4 px-6">Capability</th>
                  <th className="py-4 px-6 text-center text-blue-600 bg-blue-50/50">
                    <span className="inline-flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-current" /> NP Language
                    </span>
                  </th>
                  <th className="py-4 px-6 text-center">Python</th>
                  <th className="py-4 px-6 text-center">Go</th>
                  <th className="py-4 px-6 text-center">C / C++</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {features.map((feat) => (
                  <tr key={feat.name} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">{feat.name}</td>
                    
                    <td className="py-3.5 px-6 text-center bg-blue-50/30">
                      {feat.np ? (
                        <Check className="w-4 h-4 text-blue-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>

                    <td className="py-3.5 px-6 text-center">
                      {feat.python ? (
                        <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>

                    <td className="py-3.5 px-6 text-center">
                      {feat.go ? (
                        <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>

                    <td className="py-3.5 px-6 text-center">
                      {feat.cpp ? (
                        <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
