"use client";

import { useState } from "react";
import BackButton from "@/components/BackButton";

export default function ResumeGenerator() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateResume = async () => {
    if (!formData.name || !formData.skills) {
      setError("Name and Skills are required.");
      return;
    }
    setLoading(true);
    setError("");
    setOutput("");
    setSaved(false);

    try {
      const response = await fetch("http://localhost:5000/api/resume/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setOutput(data.result);
        setSaved(true);
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

  const downloadResume = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${formData.name} - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f1f5f9; display: flex; justify-content: center; padding: 40px 20px; }
    .resume { background: white; width: 800px; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #1d4ed8, #3b82f6); padding: 40px; position: relative; overflow: hidden; }
    .header::before { content: ''; position: absolute; top: -40px; right: -40px; width: 150px; height: 150px; background: rgba(255,255,255,0.1); border-radius: 50%; }
    .header::after { content: ''; position: absolute; bottom: -30px; left: -30px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%; }
    .header h1 { color: white; font-size: 32px; font-weight: 800; position: relative; z-index: 1; }
    .header .job-title { color: #bfdbfe; font-size: 16px; margin-top: 6px; position: relative; z-index: 1; }
    .contact-row { display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap; position: relative; z-index: 1; }
    .contact-badge { background: rgba(255,255,255,0.2); color: white; padding: 6px 14px; border-radius: 8px; font-size: 13px; display: flex; align-items: center; gap: 6px; }
    .body { padding: 36px 40px; }
    .section { margin-bottom: 24px; }
    .section-title { font-size: 11px; font-weight: 800; color: #2563eb; text-transform: uppercase; letter-spacing: 0.15em; padding-bottom: 8px; border-bottom: 2px solid #dbeafe; margin-bottom: 12px; }
    .section p, .section li { font-size: 14px; color: #475569; line-height: 1.7; }
    ul { list-style: none; padding: 0; }
    ul li { display: flex; gap: 8px; margin-bottom: 6px; }
    ul li::before { content: '▸'; color: #3b82f6; font-weight: bold; flex-shrink: 0; }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-tag { background: #eff6ff; color: #1d4ed8; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; border: 1px solid #bfdbfe; }
    .footer { text-align: center; padding: 16px; background: #f8fafc; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="resume">
    <div class="header">
      <h1>${formData.name}</h1>
      ${formData.jobTitle ? `<p class="job-title">${formData.jobTitle}</p>` : ""}
      <div class="contact-row">
        ${formData.email ? `<div class="contact-badge">✉️ ${formData.email}</div>` : ""}
        ${formData.phone ? `<div class="contact-badge">📞 ${formData.phone}</div>` : ""}
      </div>
    </div>
    <div class="body">
      ${output
        .split("\n")
        .map((line) => {
          const t = line.trim();
          if (!t) return "<br/>";
          if (t === t.toUpperCase() && t.length > 2 && t.length < 40 && !/^\d/.test(t) && !t.startsWith("-") && !t.startsWith("*")) {
            return `<div class="section"><div class="section-title">${t}</div>`;
          }
          if (t.startsWith("- ") || t.startsWith("• ") || t.startsWith("* ")) {
            return `<ul><li>${t.replace(/^[-•*]\s*/, "")}</li></ul>`;
          }
          if (t.startsWith("**") && t.endsWith("**")) {
            return `<p><strong>${t.replace(/\*\*/g, "")}</strong></p>`;
          }
          return `<p>${t}</p>`;
        })
        .join("")}
    </div>
    <div class="footer">Generated by DevToolsHub • AI-Powered Resume Generator</div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.name.replace(/\s+/g, "_")}_Resume.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fillSampleData = () => {
    setFormData({
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234 567 8900",
      jobTitle: "Full Stack Developer",
      skills: "JavaScript, React, Node.js, Python, MongoDB, SQL, Git, Docker",
      experience:
        "2 years at TechCorp as Junior Developer - built REST APIs and React dashboards. 1 year freelancing - developed 5 client websites.",
      education:
        "BSc Computer Science - State University 2022. AWS Certified Developer 2023.",
    });
  };

  // Smart resume renderer — skips lines that duplicate header info
  const renderResumeBody = (text: string) => {
    const skipPatterns = [
      formData.name?.toLowerCase(),
      formData.email?.toLowerCase(),
      formData.phone,
      formData.jobTitle?.toLowerCase(),
    ].filter(Boolean);

    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let skipCount = 0;

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) {
        elements.push(<div key={index} className="h-2" />);
        return;
      }

      // Skip lines that duplicate the header (name, email, phone, job title)
      const lowerTrimmed = trimmed.toLowerCase();
      const isDuplicate = skipPatterns.some(
        (p) => p && lowerTrimmed.includes(p) && trimmed.length < 80
      );
      if (isDuplicate && skipCount < 6) {
        skipCount++;
        return;
      }

      // Section heading detection (ALL CAPS, or starts with **)
      const isAllCaps =
        trimmed === trimmed.toUpperCase() &&
        trimmed.length > 2 &&
        trimmed.length < 40 &&
        !/^\d/.test(trimmed) &&
        !trimmed.startsWith("-") &&
        !trimmed.startsWith("*");

      const isBoldHeading =
        trimmed.startsWith("**") && trimmed.endsWith("**");

      const isHashHeading =
        trimmed.startsWith("##") || trimmed.startsWith("# ");

      if (isAllCaps || isBoldHeading || isHashHeading) {
        const label = trimmed
          .replace(/^#+\s*/, "")
          .replace(/\*\*/g, "")
          .trim();
        elements.push(
          <div key={index} className="mt-5 mb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-[0.15em] whitespace-nowrap">
                {label}
              </h2>
              <div className="flex-1 h-px bg-blue-200 dark:bg-blue-800" />
            </div>
          </div>
        );
        return;
      }

      // Bullet points
      if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("* ")) {
        elements.push(
          <div key={index} className="flex gap-2 ml-1 my-1">
            <span className="text-blue-500 font-bold mt-0.5 shrink-0 text-xs">▸</span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {trimmed.replace(/^[-•*]\s*/, "")}
            </p>
          </div>
        );
        return;
      }

      // Bold inline text (job titles, company names)
      if (trimmed.includes("**")) {
        const parts = trimmed.split(/\*\*(.*?)\*\*/g);
        elements.push(
          <p key={index} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-0.5">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-bold text-slate-900 dark:text-white">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
        return;
      }

      // Regular paragraph
      elements.push(
        <p key={index} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed my-0.5">
          {trimmed}
        </p>
      );
    });

    return elements;
  };

  return (
    <div>
      <BackButton />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">📄</span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Resume Generator
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Fill in your details and AI will generate a professional resume instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Your Details
            </h2>
            <button
              onClick={fillSampleData}
              className="text-xs px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors"
            >
              Try Sample Data
            </button>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col gap-3">
            <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">Basic Info</p>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name *"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" />
            <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title (e.g. Full Stack Developer)"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" />
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col gap-3">
            <p className="text-xs font-bold text-green-500 uppercase tracking-wider">Skills *</p>
            <textarea name="skills" value={formData.skills} onChange={handleChange}
              placeholder="e.g. JavaScript, React, Node.js, Python, SQL..." rows={3}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors" />
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col gap-3">
            <p className="text-xs font-bold text-purple-500 uppercase tracking-wider">Work Experience</p>
            <textarea name="experience" value={formData.experience} onChange={handleChange}
              placeholder="Describe your work experience, roles, and achievements..." rows={4}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors" />
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col gap-3">
            <p className="text-xs font-bold text-orange-500 uppercase tracking-wider">Education</p>
            <textarea name="education" value={formData.education} onChange={handleChange}
              placeholder="e.g. BSc Computer Science - MIT 2022" rows={3}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors" />
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              ❌ {error}
            </div>
          )}

          <button onClick={generateResume} disabled={loading}
            className="w-full py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
            {loading ? (
              <><span className="animate-spin">⏳</span> AI is generating your resume...</>
            ) : ("📄 Generate Resume with AI")}
          </button>
        </div>

        {/* Right: Resume Preview */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Generated Resume
            </label>
            {output && (
              <div className="flex gap-2">
                <button onClick={copyToClipboard}
                  className="text-xs px-3 py-1 rounded-lg bg-green-100 hover:bg-green-200 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium transition-colors">
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
                <button onClick={downloadResume}
                  className="text-xs px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium transition-colors">
                  ⬇️ Download
                </button>
              </div>
            )}
          </div>

          <div className="w-full min-h-96 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl">
            {loading ? (
              <div className="flex flex-col gap-3 h-full justify-center items-center text-slate-400 py-32 bg-white dark:bg-slate-800">
                <span className="text-5xl animate-pulse">📄</span>
                <span className="font-medium">AI is crafting your resume...</span>
                <span className="text-xs">This may take 10-15 seconds</span>
                <div className="flex gap-1 mt-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            ) : output ? (
              <div className="bg-white dark:bg-slate-800">
                {/* Beautiful Resume Header */}
                <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 px-8 py-8">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                      {formData.name}
                    </h1>
                    {formData.jobTitle && (
                      <p className="text-blue-100 font-medium mt-1 text-base">
                        {formData.jobTitle}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 mt-4">
                      {formData.email && (
                        <div className="flex items-center gap-1.5 bg-white/20 rounded-lg px-3 py-1.5">
                          <span className="text-xs">✉️</span>
                          <span className="text-white text-xs font-medium">{formData.email}</span>
                        </div>
                      )}
                      {formData.phone && (
                        <div className="flex items-center gap-1.5 bg-white/20 rounded-lg px-3 py-1.5">
                          <span className="text-xs">📞</span>
                          <span className="text-white text-xs font-medium">{formData.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Resume Body */}
                <div className="px-8 py-6">
                  {renderResumeBody(output)}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 h-full justify-center items-center text-slate-400 py-32 bg-white dark:bg-slate-800">
                <span className="text-5xl">📄</span>
                <span className="font-medium">Your resume will appear here</span>
                <span className="text-xs text-center px-8">
                  Fill in your details on the left and click Generate
                </span>
              </div>
            )}
          </div>

          {saved && output && (
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
              ✅ Resume generated and saved to database!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}