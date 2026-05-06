"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Tools", href: "/#tools" },
    { label: "AI Tools", href: "/#tools" },
    { label: "About", href: "/#tools" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: `1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`,
        backgroundColor:
          theme === "dark"
            ? "rgba(15, 23, 42, 0.90)"
            : "rgba(255, 255, 255, 0.90)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <span
              className="font-bold text-xl"
              style={{ color: theme === "dark" ? "#ffffff" : "#0f172a" }}
            >
              Dev<span className="text-blue-500">Tools</span>Hub
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{ color: theme === "dark" ? "#94a3b8" : "#475569" }}
                className="hover:text-blue-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                padding: "8px",
                borderRadius: "10px",
                backgroundColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
                border: `1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`,
                cursor: "pointer",
                fontSize: "18px",
                transition: "all 0.2s ease",
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
                border: `1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`,
                color: theme === "dark" ? "#ffffff" : "#0f172a",
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden py-4 border-t"
            style={{
              borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
            }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl font-medium text-sm hover:text-blue-500 transition-colors"
                  style={{
                    color: theme === "dark" ? "#94a3b8" : "#475569",
                    backgroundColor: "transparent",
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div
                className="mt-3 pt-3 border-t"
                style={{
                  borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
                }}
              >
                <a
                  href="/tools/resume-generator"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm text-center transition-colors"
                >
                  📄 Generate Resume
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}