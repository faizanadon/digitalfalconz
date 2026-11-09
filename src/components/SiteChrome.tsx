"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollProgress } from "@/components/Motion";

/**
 * Site chrome (header, scroll progress, footer) around every page — except
 * the standalone website templates. A template detail page (e.g.
 * /templates/bali-retreat) is a client's own premium site, so it renders
 * without any DigitalFalconz branding. The /templates index itself keeps
 * the normal chrome because it is the agency's showcase page.
 *
 * usePathname is safe for static pages (unlike useSearchParams) — the
 * pathname is known at build time, so this does not make any route dynamic.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isStandaloneTemplate =
    !!pathname && pathname.startsWith("/templates/") && pathname !== "/templates";

  if (isStandaloneTemplate) {
    return <main id="main">{children}</main>;
  }

  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
