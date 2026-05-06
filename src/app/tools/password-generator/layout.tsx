import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator",
  description:
    "Free secure password generator. Generate strong passwords with custom length, uppercase, numbers and symbols. No login required.",
  keywords: ["password generator", "secure password", "random password", "strong password"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}