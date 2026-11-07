import type { Metadata } from "next";
import Script from "next/script";
import { PageHero } from "@/components/Motion";
import Reveal from "@/components/Reveal";
import { Phone } from "lucide-react";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Free Discovery Call | DigitalFalconz",
  description:
    "In this 30-minute call, we will review your current marketing and lead generation, identify your biggest growth opportunities, and map out clear next steps for your business. No obligation and no pressure — just a clear plan.",
  alternates: { canonical: "https://digitalfalconz.com/discovery" },
};

export default function DiscoveryPage() {
  return (
    <>
      <PageHero
        kicker="DigitalFalconz / Private Consultations 01 / 01"
        title="Let's make your next move count."
        icon="calendar"
        enter="left"
        lede={
          <>
            <p>
              A focused, 30-minute conversation about your business, your
              ambitions, and where <strong>marketing, software or AI</strong>{" "}
              could create meaningful opportunities.
            </p>
            <p className="mono" style={{ letterSpacing: ".14em" }}>
              30 minutes · Google Meet · Complimentary
            </p>
            <p>
              <a className="btn" href="#book">
                Choose a time <span aria-hidden="true">↗</span>
              </a>
            </p>
          </>
        }
      />

      <section className="tight">
        <div className="wrap">
          <Reveal>
            <span className="mono kicker">What we&apos;ll cover</span>
            <ol className="steps-list">
              <li>
                <strong>Your priorities</strong>
                <br />
                Where you are today and what you want to achieve.
              </li>
              <li>
                <strong>The opportunities</strong>
                <br />
                Where the right strategy or technology may help.
              </li>
              <li>
                <strong>A practical direction</strong>
                <br />
                Useful next steps, without unnecessary complexity.
              </li>
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="plain-p">
              In this 30-minute call, we will review your current marketing
              and lead generation, identify your biggest growth opportunities,
              and map out clear next steps for your business. No obligation
              and no pressure — just a clear plan.
            </p>
            <p className="plain-p">
              A considered conversation. No obligation to proceed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="tight">
        <div className="wrap">
          <Reveal>
            <span className="mono kicker">Free Discovery Call</span>
            <h2>Choose a time</h2>
            <div
              id="book"
              style={{
                background: "#ffffff",
                borderRadius: 24,
                padding: 24,
                boxShadow: "0 30px 60px -30px rgba(0,0,0,.35)",
              }}
            >
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/3uyvXhd8aw8baaZKsCb2"
                title="Book a free discovery call with DigitalFalconz"
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
            <div className="contact-cards" style={{ marginTop: 32 }}>
              <div className="card">
                <span className="svc-icon" aria-hidden="true">
                  <Phone size={20} strokeWidth={1.9} />
                </span>
                <span className="tag">United Kingdom</span>
                <h3>
                  <a href={site.phoneUKHref}>{site.phoneUK}</a>
                </h3>
              </div>
              <div className="card">
                <span className="svc-icon" aria-hidden="true">
                  <Phone size={20} strokeWidth={1.9} />
                </span>
                <span className="tag">United States</span>
                <h3>
                  <a href={site.phoneUSHref}>{site.phoneUS}</a>
                </h3>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HighLevel booking widget embed — resizes the iframe above. */}
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
