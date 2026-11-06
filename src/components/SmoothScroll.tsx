"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll, site-wide.
 * - Skipped entirely when the user prefers reduced motion.
 * - In-page anchors (href="#…") are scrolled with Lenis so the
 *   sticky header offset is respected and the motion stays smooth.
 * - Cross-page hashes (e.g. /contact#enquiry-form) are handled via
 *   the hashchange event after Next.js navigation.
 * - Destroyed on unmount; the rAF loop is the only loop running.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const scrollToHash = (hash: string) => {
      const el = document.querySelector(hash);
      if (el) lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.1 });
    };

    // Same-page anchor clicks: let Lenis animate instead of a native jump.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.1 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    // Cross-page hash navigation (Next.js sets location.hash after routing).
    const onHashChange = () => {
      if (window.location.hash.length > 1) {
        // Wait a tick so the target page has rendered.
        setTimeout(() => scrollToHash(window.location.hash), 80);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    if (window.location.hash.length > 1) setTimeout(() => scrollToHash(window.location.hash), 120);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
