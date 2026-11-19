import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { themeInitScript } from "@/lib/theme";

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
    "Computer Science senior at Georgia Tech. Building modern, performant software.",
  keywords: [
    "Mannan Raj Singh",
    "Software Engineer",
    "Georgia Tech",
    "Georgia Tech Senior",
    "Full Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Mannan Raj Singh" }],
  creator: "Mannan Raj Singh",
  openGraph: {
    type: "website",
    title: "Mannan Raj Singh — Software Engineer",
    description:
      "Computer Science senior at Georgia Tech.",
    siteName: "Mannan Raj Singh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mannan Raj Singh — Software Engineer",
    description:
      "Computer Science senior at Georgia Tech.",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
