import type { Metadata } from "next";
import Link from "next/link";
import { TwoColumnHero } from "@/components/Motion";
import Reveal from "@/components/Reveal";
import { PageHeroGraphic } from "@/components/Graphics";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Website Terms | DigitalFalconz",
  description: "Website terms for digitalfalconz.com — using the site and contacting DigitalFalconz about a project.",
  alternates: { canonical: `${site.domain}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <TwoColumnHero kicker="Legal" title="Website Terms" icon="shield" graphic={<PageHeroGraphic page="privacy" />} />
      <div className="wrap" style={{ paddingBottom: 72 }}>
        <Reveal>
          <div className="md">
            <p><strong>Last updated: November 2026.</strong></p>
            <h2>About this website</h2>
            <p>This website is operated by DigitalFalconz. It describes the marketing, software development, branding and AI automation services DigitalFalconz offers, and how to enquire about a project.</p>
            <h2>Using the site</h2>
            <p>You may browse the site and share its pages. You must not use it in a way that harms the site, other visitors, or DigitalFalconz, or to misrepresent yourself as DigitalFalconz.</p>
            <h2>Enquiries</h2>
            <p>Enquiries can be made through the <Link href="/contact">contact page</Link> or by emailing <a href={`mailto:${site.email}`}>{site.email}</a>. Sending an enquiry does not create a contract. Any work that follows is agreed separately, with its own scope, fees and terms.</p>
            <h2>Content</h2>
            <p>The content on this site is provided as-is for general information. Service descriptions are not a guarantee of a particular result, and no outcome, ranking or return is promised. Where the site says verified project examples are to be added, that means no client work is presented until it has been authorised.</p>
            <h2>Links</h2>
            <p>The site may link to other websites. DigitalFalconz is not responsible for their content or availability.</p>
            <h2>Changes</h2>
            <p>These terms and the content of the site may change from time to time. The version published here is the current one.</p>
            <h2>Contact</h2>
            <p>Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>. You can also reach us on <a href={site.phoneUKHref}>UK: {site.phoneUK}</a> or <a href={site.phoneUSHref}>US: {site.phoneUS}</a>.</p>
            <p><Link href="/contact">← Back to Contact</Link></p>
          </div>
        </Reveal>
      </div>
    </>
  );
}
