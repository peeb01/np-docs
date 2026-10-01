import React from "react";

interface FormattedTextProps {
  text: string;
  className?: string;
}

export function FormattedText({ text, className }: FormattedTextProps) {
  if (!text) return null;

  // 1. Split text by inline code segments first: `...`
  const codeParts = text.split(/(`[^`]+`)/g);

  return (
    <span className={className}>
      {codeParts.map((codePart, cIdx) => {
        if (!codePart) return null;

        // Render inline code
        if (codePart.startsWith("`") && codePart.endsWith("`") && codePart.length >= 2) {
          const code = codePart.slice(1, -1);
          return (
            <code
              key={`c-${cIdx}`}
              className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs sm:text-[13px] font-medium text-slate-800 border border-slate-200/80"
            >
              {code}
            </code>
          );
        }

        // 2. Split non-code text by bold markers: **...**
        // Following CommonMark whitespace constraints so mathematical ** or operator text isn't misidentified
        const boldParts = codePart.split(/(\*\*(?!\s)[^*]+?(?<!\s)\*\*)/g);

        return (
          <React.Fragment key={`p-${cIdx}`}>
            {boldParts.map((boldPart, bIdx) => {
              if (!boldPart) return null;

              if (boldPart.startsWith("**") && boldPart.endsWith("**") && boldPart.length >= 4) {
                const bold = boldPart.slice(2, -2);
                return (
                  <strong key={`b-${bIdx}`} className="font-bold text-slate-900">
                    {bold}
                  </strong>
                );
              }

              return <React.Fragment key={`t-${bIdx}`}>{boldPart}</React.Fragment>;
            })}
          </React.Fragment>
        );
      })}
    </span>
  );
}
