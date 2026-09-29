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
        <div className="mx-auto max-w-[105rem] w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col gap-8 lg:flex-row items-start">
            {/* Left Sidebar Navigation */}
            <DocsSidebar />

            {/* Document Main Content */}
            <main className="min-w-0 flex-1 w-full">
              {children}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
