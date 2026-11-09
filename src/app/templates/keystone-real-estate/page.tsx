import type { Metadata } from "next";
import KeystoneRealEstate from "./KeystoneRealEstate";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/keystone-real-estate");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function KeystoneRealEstatePage() {
  return <KeystoneRealEstate />;
}
