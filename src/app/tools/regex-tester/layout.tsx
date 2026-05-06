import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester",
  description:
    "Free online regex tester. Test regular expressions with live match highlighting. Supports global, case-insensitive and multiline flags.",
  keywords: ["regex tester", "regular expression", "regex validator", "online regex"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}