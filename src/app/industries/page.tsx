import type { Metadata } from "next";
import Industries from "./Industries";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/industries");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function IndustriesPage() {
  return <Industries />;
}
