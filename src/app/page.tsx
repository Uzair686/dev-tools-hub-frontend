"use client";

import { useState, useEffect } from "react";

const tools = [
  {
    icon: "📋",
    title: "JSON Formatter",
    description: "Format, validate and beautify your JSON data instantly.",
    href: "/tools/json-formatter",
    tag: "Utility",
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: "🔐",
    title: "Password Generator",
    description: "Generate strong, secure passwords with custom rules.",
    href: "/tools/password-generator",
    tag: "Security",
    color: "green",
    gradient: "from-green-500 to-green-600",
  },
  {
    icon: "🔍",
    title: "Regex Tester",
    description: "Write and test regular expressions with live matching.",
    href: "/tools/regex-tester",
    tag: "Utility",
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: "✍️",
    title: "AI Text Rewriter",
    description: "Rewrite any text using AI to improve tone and clarity.",
    href: "/tools/text-rewriter",
    tag: "AI",
    color: "orange",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    icon: "🤖",
    title: "Code Explainer",
    description: "Paste any code and get a plain English explanation.",
    href: "/tools/code-explainer",
    tag: "AI",
    color: "pink",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    icon: "📄",
    title: "Resume Generator",
    description: "Generate a professional resume with AI assistance.",
    href: "/tools/resume-generator",
    tag: "AI",
    color: "teal",
    gradient: "from-teal-500 to-teal-600",
  },
];

const tagColors: Record<string, string> = {
  Utility: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Security: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  AI: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

const stats = [
  { label: "Free Tools", value: "6+" },
  { label: "AI Powered", value: "3" },
  { label: "No Login", value: "100%" },
  { label: "Open Source", value: "Yes" },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  const tags = ["All", "Utility", "Security", "AI"];
  const filtered =
    activeTag === "All"
      ? tools
      : tools.filter((t) => t.tag === activeTag);

  if (!mounted) return null;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Free Developer Tools — No Login Required
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            All Your Dev Tools,{" "}
            <span className="relative">
              <span className="text-blue-500">Powered by AI</span>
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Format JSON, generate passwords, test regex, rewrite text with AI,
            explain code and build resumes — all in one place, completely free.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#tools"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              Explore Tools
              <span>↓</span>
            </a>
            <a
              href="/tools/resume-generator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-lg transition-all shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:-translate-y-0.5"
            >
              📄 Generate Resume
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur border border-slate-200 dark:border-slate-700"
              >
                <div className="text-2xl font-extrabold text-blue-500">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section
        id="tools"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
      >
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
            🛠️ All Tools
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Pick a tool and start building. No signup, no limits, no cost.
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-2 mt-6">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTag === tag
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool) => (
            <a
              key={tool.title}
              href={tool.href}
              className="group relative block p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Gradient top bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{tool.icon}</div>
                <span
                  className={`text-xs px-2 py-1 rounded-lg font-semibold ${tagColors[tool.tag]}`}
                >
                  {tool.tag}
                </span>
              </div>

              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                {tool.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                {tool.description}
              </p>

              <div className="flex items-center gap-1 text-blue-500 text-sm font-semibold">
                Open Tool
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 py-10">
        <div className="max-w-7xl mx-auto px-4">

          {/* Sponsored Section */}
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Recommended for Developers
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.digitalocean.com/?refcode=https://m.do.co/c/ee6ae3a7358a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all text-sm font-medium text-slate-700 dark:text-slate-300 hover:-translate-y-0.5"
              >
                🌊 DigitalOcean — $200 Free Credit
              </a>
              <a
                href="https://www.namecheap.com/?aff=YOUR_AFF_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all text-sm font-medium text-slate-700 dark:text-slate-300 hover:-translate-y-0.5"
              >
                🔗 Namecheap — Cheap Domains
              </a>
              <a
                href="https://www.hostinger.com/affiliates"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all text-sm font-medium text-slate-700 dark:text-slate-300 hover:-translate-y-0.5"
              >
                🚀 Hostinger — Best Web Hosting
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">⚙️</span>
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                Dev<span className="text-blue-500">Tools</span>Hub
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Built with Next.js + Tailwind CSS + Groq AI
            </p>
            <p className="text-slate-400 dark:text-slate-600 text-xs mt-2">
              Free forever. No login required.
            </p>
            <div className="flex justify-center gap-4 mt-4 text-xs text-slate-400">
              <a href="/sitemap.xml" className="hover:text-blue-500 transition-colors">Sitemap</a>
              <span>•</span>
              <a href="/#tools" className="hover:text-blue-500 transition-colors">All Tools</a>
              <span>•</span>
              <a href="mailto:uzairchohan686@gmail.com" className="hover:text-blue-500 transition-colors">Contact</a>
              <span>•</span>
              <a
                href="https://buymeacoffee.com/uzair686"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-500 transition-colors"
              >
                ☕ Support
              </a>
            </div>
          </div>

        </div>
      </footer >
    </>
  );
}