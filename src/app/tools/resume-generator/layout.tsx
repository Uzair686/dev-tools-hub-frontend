import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Resume Generator",
  description:
    "Free AI resume generator. Create a professional ATS-friendly resume in seconds. Powered by AI. Download as HTML file.",
  keywords: ["resume generator", "AI resume", "CV generator", "professional resume", "ATS resume"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}