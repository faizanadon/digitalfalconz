"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { servicesByCategory, serviceIcon, serviceMenuLabel, serviceShortLabel } from "@/data/serviceIcons";
import ThemeToggle from "@/components/ThemeToggle";
import { CtaArrow } from "@/components/Motion";

const NAV = [
  { label: "Work", href: "/work" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const groups = servicesByCategory();

  // Close mega-menu on navigation, outside click, Escape.
  useEffect(() => { setMegaOpen(false); setMobileOpen(false); }, [pathname]);
  // While the mobile menu is open, stop Lenis so the page beneath it
  // cannot scroll. NOTE: do NOT set overflow:hidden on <body> here — that
  // makes the body the scroll container, which breaks the sticky header:
  // the header reverts to its flow position and scrolls out of view,
  // taking the menu's only Close button with it. Lenis stop() freezes the
  // viewport scroll without touching the body's overflow, so the header
  // stays put. The menu itself is a full-screen overlay with its own
  // header row and Close button, so it never depends on the page header.
  useEffect(() => {
    if (!mobileOpen) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMegaOpen(false); triggerRef.current?.focus(); }
    };
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [megaOpen]);

  return (
    <header className="site">
      <div className="wrap">
        <div className="nav">
          <Link className="brand" href="/" aria-label="DigitalFalconz home">
            <Image src="/logo-light-hires.png" alt="DigitalFalconz" width={220} height={47} priority />
          </Link>
          <nav className="links" aria-label="Primary">
            <div
              className="mega-wrap"
              ref={megaRef}
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaOpen(false); }}
            >
              <Link
                ref={triggerRef}
                href="/services"
                className="mega-trigger"
                aria-expanded={megaOpen}
                aria-haspopup="true"
                aria-controls="servicesMegaMenu"
                onFocus={() => setMegaOpen(true)}
              >
                Services <ChevronDown size={15} className={`mega-chevron${megaOpen ? " open" : ""}`} aria-hidden="true" />
              </Link>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    id="servicesMegaMenu"
                    className="mega-menu"
                    role="menu"
                    data-lenis-prevent
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22, ease: [0.22, 0.61, 0.21, 1] }}
                  >
                    <div className="mega-inner">
                      <div className="mega-top">
                        <div>
                          <span className="mono kicker">Our capabilities</span>
                          <strong>Five capabilities. One connected partner.</strong>
                          <p>Pick one discipline or run the full system — everything plugs into the same engine.</p>
                        </div>
                        <Link className="btn small" href="/services">View all services</Link>
                      </div>
                      <div className="mega-grid">
                        {groups.map((g) => (
                          <div className="mega-col" key={g.category}>
                            <h4>{g.short}</h4>
                            <ul>
                              {g.services.map((s) => {
                                const Icon = serviceIcon(s.slug);
                                return (
                                  <li key={s.slug}>
                                    <Link href={`/services/${s.slug}`} role="menuitem">
                                      <span className="mega-icon" aria-hidden="true"><Icon size={18} strokeWidth={2} /></span>
                                      <span className="mega-label">{serviceMenuLabel(s.slug)}</span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mega-foot">
                      <span>Not sure where to start?</span>
                      <Link href="/contact">Start with a free growth audit <span className="cta-arrow" aria-hidden="true"><ArrowRight size={15} /></span></Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
            <ThemeToggle />
            <Link className="btn small" href="/contact">Free growth audit</Link>
          </nav>
          <button className="menu-btn" aria-expanded={mobileOpen} aria-controls="mobileMenu" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />} {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
        {/* Mobile menu — a full-screen overlay on <body> with its own
            header row (logo + Close), so it never depends on the page
            header staying visible. Earlier versions lived inside the
            sticky header: a tall menu trapped there could not scroll, and
            locking the body hid the header — taking the only Close button
            with it and freezing the site. */}
        {mobileOpen && typeof document !== "undefined" && createPortal(
          <div className="mobile-menu" id="mobileMenu" data-lenis-prevent>
            <div className="mobile-menu-head">
              <Link className="brand" href="/" onClick={() => setMobileOpen(false)} aria-label="DigitalFalconz home">
                <Image src="/logo-light-hires.png" alt="DigitalFalconz" width={220} height={47} />
              </Link>
              <button type="button" className="menu-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={18} aria-hidden="true" /> Close
              </button>
            </div>
            <div className="mobile-menu-body">
            <button type="button" className="mobile-services-btn" aria-expanded={mobileServicesOpen} onClick={() => setMobileServicesOpen((v) => !v)}>
              Services <ChevronDown size={15} className={`mega-chevron${mobileServicesOpen ? " open" : ""}`} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {mobileServicesOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                  <div className="mobile-services">
                    {groups.map((g) => (
                      <div key={g.category}>
                        <h4>{g.short}</h4>
                        {g.services.map((s) => {
                          const Icon = serviceIcon(s.slug);
                          return (
                            <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileOpen(false)}>
                              <span className="mega-icon" aria-hidden="true"><Icon size={18} strokeWidth={2} /></span>
                              {serviceShortLabel(s.slug)}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                    <Link href="/services" onClick={() => setMobileOpen(false)}><strong>View all services <CtaArrow /></strong></Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {NAV.map((n) => <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)}>{n.label}</Link>)}
            <Link href="/contact" onClick={() => setMobileOpen(false)}>Free growth audit</Link>
            <div className="mobile-theme-row"><ThemeToggle withLabel /></div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </header>
  );
}
