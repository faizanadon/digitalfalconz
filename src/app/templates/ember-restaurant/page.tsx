import type { Metadata } from "next";
import EmberRestaurant from "./EmberRestaurant";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/ember-restaurant");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function EmberRestaurantPage() {
  return <EmberRestaurant />;
}
