import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { DOCS_DATA, DOC_CATEGORIES } from "@/data/docs";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { TableOfContents } from "@/components/TableOfContents";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(DOCS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCS_DATA[slug];
  if (!doc) {
    return {
      title: "Page Not Found | NP Documentation",
    };
  }

  return {
    title: `${doc.title} — NP Language Documentation`,
    description: doc.description,
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = DOCS_DATA[slug];

  if (!doc) {
    notFound();
  }

  // Calculate Next and Previous articles
  const allItems = DOC_CATEGORIES.flatMap((c) => c.items);
  const currentIndex = allItems.findIndex((item) => item.slug === slug);
  const prevDoc = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextDoc = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start">
      {/* Main Reading Pane */}
      <article className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm w-full">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/docs/introduction" className="hover:text-blue-600 transition-colors">
            Documentation
          </Link>
          <span>/</span>
          <span className="text-slate-500">{doc.category}</span>
          <span>/</span>
          <span className="text-blue-600 font-bold">{doc.title}</span>
        </div>

        {/* Header */}
        <div className="border-b border-slate-200 pb-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 border border-blue-200">
              {doc.category}
            </span>
            {doc.badge && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                {doc.badge}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            {doc.title}
          </h1>

          <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
            {doc.content.lead}
          </p>
        </div>

        {/* Document Sections */}
        <div className="mt-8 space-y-12">
          {doc.content.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                {section.title}
              </h2>

              {section.description && (
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {section.description}
                </p>
              )}

              {section.points && section.points.length > 0 && (
                <ul className="my-4 space-y-2.5 pl-0 list-none">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.code && (
                <CodeBlock
                  code={section.code.code}
                  language={section.code.language}
                  filename={section.code.filename}
                />
              )}

              {section.callout && (
                <Callout type={section.callout.type} title={section.callout.title}>
                  {section.callout.text}
                </Callout>
              )}
            </section>
          ))}
        </div>

        {/* Chapter Pagination (Next / Prev) */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevDoc ? (
            <Link
              href={`/docs/${prevDoc.slug}`}
              className="flex flex-col rounded-xl border border-slate-200 p-4 transition-all hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-xs group"
            >
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-blue-600">
                <ChevronLeft className="w-3.5 h-3.5" /> Previous Chapter
              </span>
              <span className="mt-1 text-base font-bold text-slate-800 group-hover:text-blue-600">
                {prevDoc.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextDoc && (
            <Link
              href={`/docs/${nextDoc.slug}`}
              className="flex flex-col items-end text-right rounded-xl border border-slate-200 p-4 transition-all hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-xs group sm:col-start-2"
            >
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-blue-600">
                Next Chapter <ChevronRight className="w-3.5 h-3.5" />
              </span>
              <span className="mt-1 text-base font-bold text-slate-800 group-hover:text-blue-600">
                {nextDoc.title}
              </span>
            </Link>
          )}
        </div>

        {/* GitHub Edit Suggestion */}
        <div className="mt-8 pt-4 flex items-center justify-between text-xs text-slate-500">
          <a
            href="https://github.com/peeb01/np-compiler"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Edit this documentation on GitHub
          </a>
          <span className="text-slate-500 font-mono">NP Compiler v1.1</span>
        </div>
      </article>

      {/* Right Column: AWS-Style Table of Contents (On this page) */}
      <aside className="hidden xl:block w-72 shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
        <TableOfContents sections={doc.content.sections} />
      </aside>
    </div>
  );
}
