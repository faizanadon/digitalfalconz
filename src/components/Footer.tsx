import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/**
 * Footer rebuilt to match the client's reference design (black footer):
 *  - Top: "Good things start with a conversation." + huge
 *    "Let's make your next move." + gold circle "Discuss your project" link.
 *  - Middle: Brand / Explore / What we do / Let's talk.
 *  - Bottom: giant gold DigitalFalconz wordmark, then
 *    © 2026 / Independent thinking. Connected delivery. / Back to top.
 * Text links only — no icons anywhere in the footer. All 30 services stay
 * one click away via Services, What we do, and the mega-menu.
 */
const EXPLORE: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Selected work", href: "/work" },
  { label: "Contact", href: "/contact" },
  { label: "Industries", href: "/industries" },
  { label: "FAQs", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Website Terms", href: "/terms" },
];

const WHAT_WE_DO: { label: string; href: string }[] = [
  { label: "Websites & digital experiences", href: "/services#web-software-engineering" },
  { label: "Growth & marketing", href: "/services#growth-demand-generation" },
  { label: "AI & automation", href: "/services#ai-crm-automation" },
  { label: "Brand & creative", href: "/services#brand-design-video" },
];

export default function Footer() {
  const year = 2026;
  return (
    <footer className="site footer-shot">
      {/* Top — conversation + giant heading + gold circle CTA */}
      <div className="wrap foot-shot-top">
        <div className="foot-shot-head">
          <p className="foot-shot-eyebrow">Good things start with a conversation.</p>
          <h2>
            Let&rsquo;s make
            <br />
            your next move.
          </h2>
        </div>
        <Link href="/contact" className="foot-circle-link" aria-label="Discuss your project — go to the contact page">
          <span className="foot-circle" aria-hidden="true">
            <span className="foot-circle-arrow">↗</span>
          </span>
          <span className="foot-circle-label">Discuss your project</span>
        </Link>
      </div>

      {/* Middle — brand / explore / what we do / let's talk */}
      <div className="wrap foot-shot-mid">
        <div className="foot-shot-brand">
          <Link className="foot-shot-brandlink" href="/" aria-label="DigitalFalconz home">
            <Image src="/logo-dark-hires.png" alt="" width={44} height={44} />
            <span>DigitalFalconz</span>
          </Link>
          <p>
            Strategy, creativity and technology.
            <br />
            One connected digital partner.
          </p>
          <a className="foot-shot-email" href={`mailto:${site.email}`}>
            {site.email} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <nav className="foot-shot-col" aria-label="Explore">
          <h4>Explore</h4>
          {EXPLORE.map((l) => (
            <Link key={l.href + l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <nav className="foot-shot-col" aria-label="What we do">
          <h4>What we do</h4>
          {WHAT_WE_DO.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link className="foot-shot-all" href="/services">
            View all 30 services <span className="cta-arrow" aria-hidden="true">→</span>
          </Link>
        </nav>

        <div className="foot-shot-col" aria-label="Let's talk">
          <h4>Let&rsquo;s talk</h4>
          <p className="foot-shot-talk">
            <span>United Kingdom</span>
            <a href={site.phoneUKHref}>{site.phoneUK}</a>
            <Link className="foot-shot-book" href="/meet">
              Book a{" "}
              <span className="keep">
                meeting <span aria-hidden="true">↗</span>
              </span>
            </Link>
          </p>
          <p className="foot-shot-talk">
            <span>United States</span>
            <a href={site.phoneUSHref}>{site.phoneUS}</a>
            <Link className="foot-shot-book" href="/discovery">
              Book a discovery{" "}
              <span className="keep">
                call <span aria-hidden="true">↗</span>
              </span>
            </Link>
          </p>
          <p className="foot-shot-note">
            These are contact numbers, not statements that DigitalFalconz maintains physical offices in the UK or USA.
          </p>
        </div>
      </div>

      {/* Giant gold wordmark */}
      <div className="wrap foot-wordmark-wrap" aria-hidden="true">
        <div className="foot-wordmark">DigitalFalconz</div>
      </div>

      {/* Bottom bar */}
      <div className="wrap foot-shot-bottom">
        <p>© {year} DigitalFalconz</p>
        <p>Independent thinking. Connected delivery.</p>
        <a className="foot-shot-top-link" href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
