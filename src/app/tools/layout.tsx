export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {children}
    </main>
  );
}
