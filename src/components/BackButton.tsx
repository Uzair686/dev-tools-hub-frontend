"use client";

export default function BackButton() {
  return (
    <a
      href="/"
      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all mb-8 group px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20"
    >
      <span className="group-hover:-translate-x-1 transition-transform text-lg">
        ←
      </span>
      Back to all tools
    </a>
  );
}