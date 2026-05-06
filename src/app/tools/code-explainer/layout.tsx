import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Code Explainer",
  description:
    "Free AI code explainer. Paste any code and get a plain English explanation. Supports JavaScript, Python, TypeScript, React, SQL and more.",
  keywords: ["code explainer", "AI code review", "explain code", "code understanding"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}