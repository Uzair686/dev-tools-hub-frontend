"use client";

import { useState, useMemo } from "react";
import BackButton from "@/components/BackButton";

const QUICK_PATTERNS = [
  { label: "Email", pattern: "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$", flags: "i" },
  { label: "URL", pattern: "https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*", flags: "i" },
  { label: "Phone", pattern: "^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$", flags: "" },
  { label: "IP Address", pattern: "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", flags: "" },
  { label: "Hex Color", pattern: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", flags: "" },
  { label: "Date (YYYY-MM-DD)", pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$", flags: "" },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState("");

  const result = useMemo(() => {
    if (!pattern || !testString) return { matches: [], highlighted: testString };
    try {
      setError("");
      const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const matches: string[] = [];
      let match;
      const tempRegex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      while ((match = tempRegex.exec(testString)) !== null) {
        matches.push(match[0]);
        if (!flags.includes("g")) break;
      }

      // Build highlighted output
      const highlighted = testString.replace(
        new RegExp(pattern, flags.includes("g") ? flags : flags + "g"),
        (m) => `##MATCH_START##${m}##MATCH_END##`
      );

      return { matches, highlighted, error: "" };
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
      return { matches: [], highlighted: testString };
    }
  }, [pattern, flags, testString]);

  const applyQuickPattern = (p: string, f: string) => {
    setPattern(p);
    setFlags(f || "g");
    setError("");
  };

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag
    );
  };

  const renderHighlighted = (text: string) => {
    const parts = text.split(/(##MATCH_START##.*?##MATCH_END##)/g);
    return parts.map((part, i) => {
      if (part.startsWith("##MATCH_START##")) {
        const content = part.replace("##MATCH_START##", "").replace("##MATCH_END##", "");
        return (
          <mark key={i} className="bg-yellow-300 dark:bg-yellow-500 text-slate-900 rounded px-0.5">
            {content}
          </mark>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div>
      <BackButton />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🔍</span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Regex Tester
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Write and test regular expressions with live match highlighting.
        </p>
      </div>

      {/* Quick Patterns */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Quick Patterns
        </p>
        <div className="flex flex-wrap gap-2">
          {QUICK_PATTERNS.map((qp) => (
            <button
              key={qp.label}
              onClick={() => applyQuickPattern(qp.pattern, qp.flags)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-700"
            >
              {qp.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">

        {/* Regex Input */}
        <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-3">
            Regular Expression
          </label>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-slate-400 text-xl">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter your regex pattern..."
              className="flex-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <span className="text-slate-400 text-xl">/</span>
            <span className="text-blue-500 font-bold">{flags}</span>
          </div>

          {error && (
            <div className="mt-3 text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
              ❌ {error}
            </div>
          )}

          {/* Flags */}
          <div className="flex gap-3 mt-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 self-center">Flags:</p>
            {["g", "i", "m"].map((flag) => (
              <button
                key={flag}
                onClick={() => toggleFlag(flag)}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-colors ${
                  flags.includes(flag)
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                }`}
              >
                {flag}
              </button>
            ))}
            <span className="text-xs text-slate-400 self-center">
              (g=global, i=case insensitive, m=multiline)
            </span>
          </div>
        </div>

        {/* Test String */}
        <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-3">
            Test String
          </label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against your regex..."
            className="w-full h-36 p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono resize-none focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Results */}
        {testString && pattern && (
          <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Match Results
              </label>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                result.matches.length > 0
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}>
                {result.matches.length} match{result.matches.length !== 1 ? "es" : ""}
              </span>
            </div>

            {/* Highlighted Text */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 font-mono text-sm text-slate-800 dark:text-slate-200 leading-relaxed mb-4 whitespace-pre-wrap">
              {renderHighlighted(result.highlighted)}
            </div>

            {/* Match List */}
            {result.matches.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  Matched Values:
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.matches.map((m, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-mono text-xs"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}