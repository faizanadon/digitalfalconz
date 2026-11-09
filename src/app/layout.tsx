import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteChrome from "@/components/SiteChrome";
import SmoothScroll from "@/components/SmoothScroll";
import { metaFor, orgJsonLd, site } from "@/data/site";
import "./globals.css";

// Fonts are self-hosted from @fontsource packages (installed via npm) so the
// build never has to fetch from Google Fonts. next/font/google used to
// download font CSS at build time and Vercel builds kept failing on it
// ("Cannot read properties of null (reading '1')" in the font loader when
// Google returned an extensionless font URL). Same families, same weights,
// same CSS variable names, so nothing on any page changes appearance.
const interTight = localFont({
  src: [{ path: "../../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-head",
  display: "swap",
});
const inter = localFont({
  src: [{ path: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-body",
  display: "swap",
});
const spaceMono = localFont({
  src: [
    { path: "../../node_modules/@fontsource/space-mono/files/space-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/space-mono/files/space-mono-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});
// Premium serif used ONLY by the standalone website templates
// (e.g. /templates/bali-retreat). The variable is defined here so the
// template can use it, but no site page applies this family.
const cormorant = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2", weight: "300 700", style: "normal" },
    { path: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-retreat-serif",
  display: "swap",
});

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
      <body id="top" className={`${interTight.variable} ${inter.variable} ${spaceMono.variable} ${cormorant.variable}`}>
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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
