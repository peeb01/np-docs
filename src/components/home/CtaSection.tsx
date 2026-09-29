import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export function CtaSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-b from-blue-50/50 to-white p-8 sm:p-14 shadow-sm space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-bold text-blue-700 font-mono">
            <span>GET STARTED TODAY</span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Start Building with NP in Minutes
          </h2>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-slate-600 leading-relaxed">
            Follow the quickstart guide, explore the interactive documentation, or clone the open-source repository to compile your first binary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/docs/introduction"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Read The Documentation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <a
              href="https://github.com/peeb01/np"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
            >
              <GithubIcon className="w-4 h-4 mr-2" />
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
