import type { Metadata } from "next";
import { Inter, Inter_Tight, Space_Mono } from "next/font/google";
import Header from "@/components/Header";
import { ScrollProgress } from "@/components/Motion";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import { metaFor, orgJsonLd, site } from "@/data/site";
import "./globals.css";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["600", "700", "800", "900"], variable: "--font-head", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });

const home = metaFor("/");

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: home?.seo_title ?? "DigitalFalconz | Digital Marketing, Software & AI Agency",
  description: home?.meta_description ?? "DigitalFalconz connects performance marketing, websites, software development, branding and AI automation to help ambitious businesses grow.",
  alternates: { canonical: home?.canonical ?? site.domain },
  icons: { icon: "/logo-mark-hires.png", apple: "/logo-mark-hires.png" },
  openGraph: {
    type: "website",
    url: site.domain,
    siteName: "DigitalFalconz",
    title: home?.seo_title,
    description: home?.meta_description,
    images: [{ url: "/logo-mark-hires.png", width: 2400, height: 2400, alt: "DigitalFalconz" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="top" className={`${interTight.variable} ${inter.variable} ${spaceMono.variable}`}>
        {/* Set data-theme before paint so there is no light/dark flash.
            Dark mode is default; stored choice wins if user toggled. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('digitalfalconz-theme');if(!t){t='dark'}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
        <a className="skip-link" href="#main">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
