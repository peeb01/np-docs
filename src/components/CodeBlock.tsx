"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

// Light minimal syntax highlighter for clean bright documentation
function renderLightSyntax(code: string) {
  const lines = code.split("\n");

  return lines.map((line, lineIdx) => {
    const trimmed = line.trimStart();

    // Full line comment
    if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
      return (
        <div key={lineIdx} className="table-row">
          <span className="table-cell pr-4 text-right select-none text-slate-300 font-mono text-xs">
            {lineIdx + 1}
          </span>
          <span className="table-cell text-slate-400 italic">{line}</span>
        </div>
      );
    }

    // Tokenize NP syntax
    const tokenRegex = /(#[^\n]*|\/\/[^\n]*|"(?:\\.|[^"\\])*"|\b(?:fn|struct|import|if|elif|else|while|for|in|return|var|as|and|or|not|try|except|range|print)\b|\b(?:int|int32|int64|int128|int256|float|float32|float64|string|bool|array|dict|void)\b|\b\d+(?:\.\d+)?\b|[{}()[\]:.,+\-*/%^=><]+|\s+|\w+)/g;

    const parts = line.match(tokenRegex) || [line];

    return (
      <div key={lineIdx} className="table-row">
        <span className="table-cell pr-4 text-right select-none text-slate-300 font-mono text-xs">
          {lineIdx + 1}
        </span>
        <span className="table-cell">
          {parts.map((token, tokenIdx) => {
            if (token.startsWith("#") || token.startsWith("//")) {
              return (
                <span key={tokenIdx} className="text-slate-400 italic">
                  {token}
                </span>
              );
            }
            if (token.startsWith('"') && token.endsWith('"')) {
              return (
                <span key={tokenIdx} className="text-emerald-700 font-medium">
                  {token}
                </span>
              );
            }
            if (
              /^(fn|struct|import|if|elif|else|while|for|in|return|var|as|and|or|not|try|except|range|print)$/.test(
                token
              )
            ) {
              return (
                <span key={tokenIdx} className="text-blue-600 font-bold">
                  {token}
                </span>
              );
            }
            if (
              /^(int|int32|int64|int128|int256|float|float32|float64|string|bool|array|dict|void)$/.test(
                token
              )
            ) {
              return (
                <span key={tokenIdx} className="text-amber-700 font-semibold">
                  {token}
                </span>
              );
            }
            if (/^\d+(?:\.\d+)?$/.test(token)) {
              return (
                <span key={tokenIdx} className="text-purple-600">
                  {token}
                </span>
              );
            }
            if (/^(->|==|!=|<=|>=)$/.test(token)) {
              return (
                <span key={tokenIdx} className="text-rose-600 font-bold">
                  {token}
                </span>
              );
            }
            return (
              <span key={tokenIdx} className="text-slate-800">
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
    <div className="relative my-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/70 shadow-xs transition-all">
      {/* Clean Minimal Light Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="font-mono text-slate-800 font-bold text-xs">{filename}</span>
          ) : (
            <span className="font-mono text-slate-500 uppercase text-[11px] font-semibold">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600 active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Clean Crisp Code Area */}
      <div className="overflow-x-auto p-4 font-mono text-xs sm:text-sm leading-relaxed text-slate-800 selection:bg-blue-100 selection:text-blue-900">
        <div className="table w-full border-collapse">
          {renderLightSyntax(code)}
        </div>
      </div>
    </div>
  );
}
