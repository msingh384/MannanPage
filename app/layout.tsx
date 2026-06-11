import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mannanrajsingh.vercel.app"),
  title: {
    default: "Mannan Raj Singh — Software Engineer",
    template: "%s · Mannan Raj Singh",
  },
  description:
    "Computer Science student at Georgia Tech, currently interning at Amazon. Building modern, performant software.",
  keywords: [
    "Mannan Raj Singh",
    "Software Engineer",
    "Georgia Tech",
    "Amazon Intern",
    "Full Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Mannan Raj Singh" }],
  creator: "Mannan Raj Singh",
  openGraph: {
    type: "website",
    title: "Mannan Raj Singh — Software Engineer",
    description:
      "Computer Science student at Georgia Tech, currently interning at Amazon.",
    siteName: "Mannan Raj Singh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mannan Raj Singh — Software Engineer",
    description:
      "Computer Science student at Georgia Tech, currently interning at Amazon.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-violet-500/30">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
