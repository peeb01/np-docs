"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, ExternalLink, Check } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface TOCSection {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: TOCSection[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [feedbackGiven, setFeedbackGiven] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = sections
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPosition = window.scrollY + 120;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          return;
        }
      }
      if (headingElements.length > 0) {
        setActiveId(headingElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="sticky top-20 flex flex-col space-y-6">
      {/* On this page Navigation */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          On this page
        </h4>

        <nav className="space-y-1">
          {sections.map((section) => {
            const isActive = activeId === section.id;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block py-1.5 pl-3 text-xs transition-all border-l-2 ${
                  isActive
                    ? "border-blue-600 font-bold text-blue-600"
                    : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {section.title}
              </a>
            );
          })}
        </nav>
      </div>

      {/* AWS-style "Did this page help you?" Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs text-xs space-y-3">
        <h5 className="font-bold text-slate-800">Did this page help you?</h5>
        
        {feedbackGiven ? (
          <div className="flex items-center gap-1.5 text-emerald-600 font-semibold py-1">
            <Check className="w-4 h-4" />
            <span>Thank you for your feedback!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFeedbackGiven(true)}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Yes</span>
            </button>
            <button
              onClick={() => setFeedbackGiven(true)}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>No</span>
            </button>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100">
          <a
            href="https://github.com/peeb01/np-compiler"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Contribute on GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
