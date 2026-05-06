import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator",
  description:
    "Free online JSON formatter, validator and beautifier. Format, validate and minify JSON data instantly. No login required.",
  keywords: ["JSON formatter", "JSON validator", "JSON beautifier", "online JSON tool"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}