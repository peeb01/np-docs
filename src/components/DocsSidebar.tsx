"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_CATEGORIES } from "@/data/docs";
import { Search, ChevronRight } from "lucide-react";

export function DocsSidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = DOC_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  useEffect(() => {
    const activeEl = document.querySelector('[data-active-nav="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <aside className="w-full shrink-0 lg:w-72 xl:w-80 sticky top-[5.5rem] self-start">
      <div className="flex flex-col space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs max-h-[calc(100vh-7rem)] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent]">
        {/* Search Filter Box */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs font-medium text-slate-800 placeholder-slate-400 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Categories List */}
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <h3 className="px-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                {category.name}
              </h3>
              <ul className="space-y-1">
                {category.items.map((item) => {
                  const href = `/docs/${item.slug}`;
                  const isActive = pathname === href;

                  return (
                    <li key={item.slug}>
                      <Link
                        href={href}
                        data-active-nav={isActive ? "true" : undefined}
                        className={`group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-blue-50 text-blue-600 shadow-xs border border-blue-200/60"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                        {isActive ? (
                          <ChevronRight className="h-4 w-4 text-blue-600 shrink-0" />
                        ) : item.badge ? (
                          <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 group-hover:bg-slate-200">
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <p className="px-2 text-xs text-slate-400">No documentation matched &quot;{searchQuery}&quot;.</p>
          )}
        </div>
      </div>
    </aside>
  );
}
