import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/** Brand icons as inline SVGs — lucide-react no longer ships brand icons,
    so these are the standard brand marks (fill=currentColor). */
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
          <div className="foot-social" aria-label="DigitalFalconz on social media">
            <a href="https://www.facebook.com/people/Digital-Falconz/100089843708311/" target="_blank" rel="noopener noreferrer" aria-label="DigitalFalconz on Facebook">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/digitalfalconz/" target="_blank" rel="noopener noreferrer" aria-label="DigitalFalconz on Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/company/digitalfalconz" target="_blank" rel="noopener noreferrer" aria-label="DigitalFalconz on LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
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
