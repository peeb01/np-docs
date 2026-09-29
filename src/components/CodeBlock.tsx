"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

// Lightweight syntax tokenizer for crisp, high-contrast code display
function renderSyntaxHighlighting(code: string, language: string) {
  const lines = code.split("\n");

  return lines.map((line, lineIdx) => {
    // Check if line is full comment
    const trimmed = line.trimStart();
    if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
      return (
        <div key={lineIdx} className="table-row">
          <span className="table-cell pr-4 text-right select-none text-slate-500 font-mono text-xs">
            {lineIdx + 1}
          </span>
          <span className="table-cell text-slate-400 italic">{line}</span>
        </div>
      );
    }

    // Tokenize line with regex
    const tokenRegex = /(\/\/[^\n]*|"(?:\\.|[^"\\])*"|\b(?:fn|struct|interface|let|mut|const|return|go|make|chan|import|if|else|while|for|in|break|continue)\b|\b(?:int|float|string|bool|void)\b|\b\d+(?:\.\d+)?\b|[{}()[\]<>-]+|\b[a-zA-Z_][a-zA-Z0-9_]*(?=\()|[^\s\w]+|\s+|\w+)/g;

    const parts = line.match(tokenRegex) || [line];

    return (
      <div key={lineIdx} className="table-row">
        <span className="table-cell pr-4 text-right select-none text-slate-500 font-mono text-xs">
          {lineIdx + 1}
        </span>
        <span className="table-cell">
          {parts.map((token, tokenIdx) => {
            if (token.startsWith("//") || token.startsWith("#")) {
              return (
                <span key={tokenIdx} className="text-slate-400 italic">
                  {token}
                </span>
              );
            }
            if (token.startsWith('"') && token.endsWith('"')) {
              return (
                <span key={tokenIdx} className="text-emerald-300 font-medium">
                  {token}
                </span>
              );
            }
            if (
              /^(fn|struct|interface|let|mut|const|return|go|make|chan|import|if|else|while|for|in|break|continue)$/.test(
                token
              )
            ) {
              return (
                <span key={tokenIdx} className="text-sky-300 font-bold">
                  {token}
                </span>
              );
            }
            if (/^(int|float|string|bool|void)$/.test(token)) {
              return (
                <span key={tokenIdx} className="text-amber-300 font-semibold">
                  {token}
                </span>
              );
            }
            if (/^\d+(?:\.\d+)?$/.test(token)) {
              return (
                <span key={tokenIdx} className="text-purple-300">
                  {token}
                </span>
              );
            }
            if (/^(<-|->|:=|==|!=|<=|>=)$/.test(token)) {
              return (
                <span key={tokenIdx} className="text-rose-300 font-bold">
                  {token}
                </span>
              );
            }
            return (
              <span key={tokenIdx} className="text-slate-100">
                {token}
              </span>
            );
          })}
        </span>
      </div>
    );
  });
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
    <div className="relative my-5 overflow-hidden rounded-xl border border-slate-200 bg-[#0d1117] shadow-md transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-medium text-slate-300">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="font-mono text-slate-200 font-semibold">{filename}</span>
          ) : (
            <span className="flex items-center gap-1.5 font-mono text-slate-400 uppercase">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code"
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* High-Contrast Code Area with Syntax Highlighting */}
      <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-slate-100 selection:bg-blue-600 selection:text-white">
        <div className="table w-full border-collapse">
          {renderSyntaxHighlighting(code, language)}
        </div>
      </div>
    </div>
  );
}
