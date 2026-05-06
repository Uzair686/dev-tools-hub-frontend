"use client";

import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Animated 404 */}
      <div className="relative mb-8">
        <div className="text-[120px] sm:text-[160px] font-extrabold text-slate-100 dark:text-slate-800 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl animate-bounce">🔧</span>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 text-lg">
        Looks like this tool does not exist yet. Go back to the hub and pick a
        working tool!
      </p>

      {/* Quick Links */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
        >
          Back to Homepage
        </a>
        <a
          href="/tools/json-formatter"
          className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-all hover:-translate-y-0.5"
        >
          Try JSON Formatter
        </a>
      </div>

      {/* Popular Tools */}
      <div className="w-full max-w-lg">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">
          Popular Tools
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: "📋", label: "JSON Formatter", href: "/tools/json-formatter" },
            { icon: "🔐", label: "Password Gen", href: "/tools/password-generator" },
            { icon: "🔍", label: "Regex Tester", href: "/tools/regex-tester" },
            { icon: "✍️", label: "Text Rewriter", href: "/tools/text-rewriter" },
            { icon: "🤖", label: "Code Explainer", href: "/tools/code-explainer" },
            { icon: "📄", label: "Resume Gen", href: "/tools/resume-generator" },
          ].map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:-translate-y-0.5"
            >
              <span>{tool.icon}</span>
              <span>{tool.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}