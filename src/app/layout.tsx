import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { contact, hero } from "@/content/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_URL = "https://cv.pankaz.dev";
const TITLE = "Pankaz Jha — QA Automation Engineer";
const DESCRIPTION =
  "QA Automation Engineer. From the operating room to the CI pipeline — a former anesthesiologist who builds Python test automation across UI, API, mobile and performance, wired into CI/CD.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Pankaz Jha",
  },
  description: DESCRIPTION,
  applicationName: "Pankaz Jha — Portfolio",
  authors: [{ name: hero.name, url: SITE_URL }],
  creator: hero.name,
  keywords: [
    "QA Automation Engineer",
    "Test Automation",
    "Python",
    "Pytest",
    "Playwright",
    "Appium",
    "CI/CD",
    "Pankaz Jha",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: hero.name,
  jobTitle: hero.role,
  url: SITE_URL,
  email: `mailto:${contact.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kyiv",
    addressCountry: "UA",
  },
  knowsLanguage: ["uk", "en"],
  sameAs: [
    "https://www.linkedin.com/in/pankaz-jha-51b225220/",
    "https://github.com/p-nk-ss",
    "https://t.me/self_pankass",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
