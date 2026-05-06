"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import BackButton from "@/components/BackButton";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const { showToast, ToastComponent } = useToast();

  const formatJSON = () => {
    setError("");
    setOutput("");
    if (!input.trim()) {
      setError("Please enter some JSON to format.");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError("Invalid JSON: " + e.message);
      } else {
        setError("Invalid JSON. Please check your input.");
      }
    }
  };

  const minifyJSON = () => {
    setError("");
    setOutput("");
    if (!input.trim()) {
      setError("Please enter some JSON to minify.");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError("Invalid JSON: " + e.message);
      } else {
        setError("Invalid JSON. Please check your input.");
      }
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    showToast("Copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div>
      <BackButton />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">📋</span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            JSON Formatter
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Paste your JSON below to format, validate or minify it instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here... e.g. {"name":"John","age":30}'
            className="w-full h-72 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="flex gap-3">
            <button
              onClick={formatJSON}
              className="flex-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
            >
              ✨ Format
            </button>
            <button
              onClick={minifyJSON}
              className="flex-1 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
            >
              🗜️ Minify
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2.5 rounded-xl bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-semibold transition-colors"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Output
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
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-mono">
              ❌ {error}
            </div>
          )}

          <textarea
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            className="w-full h-72 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm resize-none focus:outline-none"
          />

          {output && !error && (
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
              ✅ Valid JSON — {output.length} characters
            </div>
          )}
        </div>
      </div>
      {ToastComponent}
    </div>
  );
}