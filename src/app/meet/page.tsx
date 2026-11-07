import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { PageHero } from "@/components/Motion";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Book a meeting | DigitalFalconz",
  description:
    "Book a call with DigitalFalconz to discuss your marketing, website, software or AI project. Pick a time that suits you.",
  alternates: { canonical: "https://digitalfalconz.com/meet" },
};

export default function MeetPage() {
  return (
    <>
      <PageHero
        kicker="Let's talk"
        title="Book a meeting"
        icon="calendar"
        enter="right"
        lede={
          <>
            <p>
              Pick a time that suits you to discuss your marketing, website,
              software or AI project. A senior strategist will join the call —
              never a salesperson.
            </p>
            <p>
              <Link className="btn ghost" href="/contact">
                Send a project enquiry instead
              </Link>
            </p>
          </>
        }
      />

      <section className="tight">
        <div className="wrap">
          <Reveal>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 24,
                padding: 24,
                boxShadow: "0 30px 60px -30px rgba(0,0,0,.35)",
              }}
            >
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/3uyvXhd8aw8baaZKsCb2"
                title="Book a meeting with DigitalFalconz"
                style={{
                  width: "100%",
                  border: "none",
                  overflow: "hidden",
                  minHeight: 750,
                  display: "block",
                }}
                scrolling="no"
                id="3uyvXhd8aw8baaZKsCb2_1794047366166"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="plain-p" style={{ marginTop: 24 }}>
              If the calendar doesn&apos;t load, email us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or call us on{" "}
              <a href={site.phoneUKHref}>{site.phoneUK}</a> (UK) or{" "}
              <a href={site.phoneUSHref}>{site.phoneUS}</a> (US).
            </p>
          </Reveal>
        </div>
      </section>

      {/* HighLevel booking widget embed — resizes the iframe above. */}
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
