import type { Metadata } from "next";
import Link from "next/link";
import { TwoColumnHero } from "@/components/Motion";
import Reveal from "@/components/Reveal";
import { PageHeroGraphic } from "@/components/Graphics";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy | DigitalFalconz",
  description: "How DigitalFalconz uses the information you share when you enquire about a project.",
  alternates: { canonical: `${site.domain}/privacy-policy` },
};

export default function PrivacyPage() {
  return (
    <>
      <TwoColumnHero kicker="Legal" title="Privacy Policy" icon="shield" graphic={<PageHeroGraphic page="privacy" />} />
      <div className="wrap" style={{ paddingBottom: 72 }}>
        <Reveal>
        <div className="md">
          <p><strong>Last updated: November 2026.</strong></p>
          <h2>What we collect</h2>
          <p>When you contact DigitalFalconz through the enquiry or audit form, or by email, we receive the details you choose to share — typically your name, work email, company, website, and anything you write about your project or goals.</p>
          <h2>How we use it</h2>
          <p>We use your details only to respond to your enquiry and manage the related conversation — for example, to review your brief, clarify requirements, and agree a next step. We do not sell your details.</p>
          <h2>How long we keep it</h2>
          <p>We keep enquiry correspondence for as long as needed to handle your enquiry and any resulting engagement, and then delete it when it is no longer needed.</p>
          <h2>Your choices</h2>
          <p>You can ask us to correct or delete the details you shared with us at any time by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          <h2>Contact</h2>
          <p>Questions about this policy? Email <a href={`mailto:${site.email}`}>{site.email}</a>. You can also reach us on <a href={site.phoneUKHref}>UK: {site.phoneUK}</a> or <a href={site.phoneUSHref}>US: {site.phoneUS}</a>.</p>
          <p><Link href="/contact">← Back to Contact</Link></p>
        </div>
        </Reveal>
      </div>
    </>
  );
}
