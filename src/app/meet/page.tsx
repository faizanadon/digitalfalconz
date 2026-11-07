import type { Metadata } from "next";
import DiscoveryBooking from "@/components/DiscoveryBooking";

export const metadata: Metadata = {
  title: "Let's make your next move count. | DigitalFalconz",
  description:
    "In this 30-minute call, we will review your current marketing and lead generation, identify your biggest growth opportunities, and map out clear next steps for your business. No obligation and no pressure — just a clear plan.",
  alternates: { canonical: "https://digitalfalconz.com/meet" },
};

export default function MeetPage() {
  return <DiscoveryBooking />;
}
