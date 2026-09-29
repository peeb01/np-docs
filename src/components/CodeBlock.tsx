"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "np", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative my-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-4 py-2 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="font-mono text-slate-700">{filename}</span>
          ) : (
            <span className="flex items-center gap-1.5 font-mono text-slate-500 uppercase">
              <Terminal className="w-3.5 h-3.5 text-blue-600" />
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code"
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold text-slate-600 transition-colors hover:bg-white hover:text-blue-600 hover:shadow-xs active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-slate-800 bg-slate-900 text-slate-100 selection:bg-blue-600 selection:text-white">
        <pre className="font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
