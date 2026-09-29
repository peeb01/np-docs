import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DocsSidebar } from "@/components/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#edeef7]">
      <Navbar />
      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar Navigation */}
            <DocsSidebar />

            {/* Document Main Content */}
            <main className="min-w-0 flex-1">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
