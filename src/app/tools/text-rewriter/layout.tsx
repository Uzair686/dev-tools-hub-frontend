import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Text Rewriter",
  description:
    "Free AI text rewriter. Rewrite any text in professional, casual, formal or friendly tone using AI. Powered by Groq AI.",
  keywords: ["AI text rewriter", "text paraphraser", "rewrite text", "AI writing tool"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}