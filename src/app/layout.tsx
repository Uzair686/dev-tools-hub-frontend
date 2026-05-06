import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "DevToolsHub — Free AI-Powered Developer Tools",
    template: "%s | DevToolsHub",
  },
  description:
    "Free online developer tools powered by AI. Format JSON, generate passwords, test regex, rewrite text, explain code and generate resumes. No login required.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "password generator",
    "regex tester",
    "AI text rewriter",
    "code explainer",
    "resume generator",
    "free dev tools",
    "online developer tools",
  ],
  authors: [{ name: "DevToolsHub" }],
  creator: "DevToolsHub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dev-tools-hub-frontend.vercel.app",
    title: "DevToolsHub — Free AI-Powered Developer Tools",
    description:
      "Free online developer tools powered by AI. No login required.",
    siteName: "DevToolsHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevToolsHub — Free AI-Powered Developer Tools",
    description:
      "Free online developer tools powered by AI. No login required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}