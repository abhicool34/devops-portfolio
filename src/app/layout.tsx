import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "akhilesh@devops — Portfolio",
  description: "Senior DevOps Engineer · Cloud Architect · Platform Engineer",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
