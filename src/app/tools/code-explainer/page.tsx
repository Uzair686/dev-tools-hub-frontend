"use client";

import { useState } from "react";
import BackButton from "@/components/BackButton";

const LANGUAGES = [
  { label: "JavaScript", value: "JavaScript", emoji: "🟨" },
  { label: "Python", value: "Python", emoji: "🐍" },
  { label: "TypeScript", value: "TypeScript", emoji: "🔷" },
  { label: "React", value: "React/JSX", emoji: "⚛️" },
  { label: "SQL", value: "SQL", emoji: "🗄️" },
  { label: "CSS", value: "CSS", emoji: "🎨" },
];

export default function CodeExplainer() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const explainCode = async () => {
    if (!code.trim()) {
      setError("Please enter some code to explain.");
      return;
    }
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const response = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setOutput(data.result);
      }
    } catch {
      setError("Failed to connect to AI. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SAMPLE_CODE = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`;

  return (
    <div>
      <BackButton />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🤖</span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Code Explainer
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Paste any code and get a plain English explanation instantly.
        </p>
      </div>

      {/* Language Selector */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Select Language
        </p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                language === lang.value
                  ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
              }`}
            >
              {lang.emoji} {lang.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Your Code
            </label>
            <button
              onClick={() => setCode(SAMPLE_CODE)}
              className="text-xs px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors"
            >
              Try Sample Code
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Paste your ${language} code here...`}
            className="w-full h-64 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{code.split("\n").length} lines</span>
            <button
              onClick={() => { setCode(""); setOutput(""); setError(""); }}
              className="hover:text-red-500 transition-colors"
            >
              Clear
            </button>
          </div>
          <button
            onClick={explainCode}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                AI is analyzing...
              </>
            ) : (
              "🤖 Explain This Code"
            )}
          </button>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Explanation
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="text-xs px-3 py-1 rounded-lg bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 font-medium transition-colors"
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            )}
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              ❌ {error}
            </div>
          )}

          <div className="w-full h-64 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm overflow-auto">
            {loading ? (
              <div className="flex flex-col gap-2 h-full justify-center items-center text-slate-400">
                <span className="text-2xl animate-pulse">🤖</span>
                <span>AI is reading your code...</span>
              </div>
            ) : output ? (
              <p className="leading-relaxed whitespace-pre-wrap">{output}</p>
            ) : (
              <p className="text-slate-400">
                Code explanation will appear here...
              </p>
            )}
          </div>

          {output && (
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
              ✅ Explained {language} code — {output.length} characters
            </div>
          )}
        </div>
      </div>
    </div>
  );
}