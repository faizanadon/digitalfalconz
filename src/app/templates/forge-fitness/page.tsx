import type { Metadata } from "next";
import ForgeFitness from "./ForgeFitness";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/forge-fitness");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function ForgeFitnessPage() {
  return <ForgeFitness />;
}
