import type { Metadata } from "next";
import DiscoveryBooking from "@/components/DiscoveryBooking";

export const metadata: Metadata = {
  title: "Free Discovery Call | DigitalFalconz",
  description:
    "In this 30-minute call, we will review your current marketing and lead generation, identify your biggest growth opportunities, and map out clear next steps for your business. No obligation and no pressure — just a clear plan.",
  alternates: { canonical: "https://digitalfalconz.com/discovery" },
};

export default function DiscoveryPage() {
  return (
    <DiscoveryBooking
      calendarId="WMiSyo5UFMs9PWY0jgy2"
      iframeId="WMiSyo5UFMs9PWY0jgy2_1794243236733"
    />
  );
}
