import type { ContactFormData } from "./email";

export interface GHLResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Normalises a form value into a tag-safe slug: lowercase, no punctuation,
 * words joined with hyphens. e.g. "Websites & e-commerce" -> "websites-e-commerce".
 */
function slugifyTag(value: string): string {
  return value
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Builds the tag list for a contact from the enquiry itself, so every form
 * submission is tagged with everything relevant: the service they asked
 * about, the investment range, when they want to start, and their
 * country/time zone — on top of the fixed base tags.
 *
 * Note: the GHL upsert endpoint replaces a contact's tags with the tags
 * sent, so a repeat enquiry from the same email refreshes their tags to
 * the latest submission. That is the intended behaviour.
 */
export function buildContactTags(data: ContactFormData): string[] {
  const tags = ["website-lead", "contact-form", "digitalfalconz"];

  const add = (prefix: string, value?: string) => {
    const slug = value ? slugifyTag(value) : "";
    if (slug) tags.push(`${prefix}-${slug}`);
  };

  add("service", data.help);
  add("investment", data.investment);
  add("start", data.start);
  add("country", data.country);

  return [...new Set(tags)];
}

/**
 * Sends contact enquiry data to GoHighLevel (GHL) via the v2 REST API
 * (LeadConnector HQ) — the only delivery method this site uses.
 *
 * Requires GHL_API_KEY (a Private Integration token with the
 * contacts.write scope) and GHL_LOCATION_ID in the environment.
 * The contact is created or updated by email (upsert), tagged
 * website-lead / contact-form / digitalfalconz, with the source set to
 * "DigitalFalconz Website Contact Form".
 */
export async function sendToGHL(data: ContactFormData): Promise<GHLResponse> {
  const apiKey = process.env.GHL_API_KEY || process.env.GHL_ACCESS_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.warn(
      "[sendToGHL] GoHighLevel API not configured (set GHL_API_KEY and GHL_LOCATION_ID in the environment). Lead was logged to console.",
      { name: data.name, email: data.email, company: data.company }
    );
    return { success: false, error: "GoHighLevel configuration missing in environment." };
  }

  // Split full name into first and last name for GHL contact records
  const nameParts = data.name.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  try {
    const ghlApiUrl = "https://services.leadconnectorhq.com/contacts/upsert";
    const apiRes = await fetch(ghlApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        name: data.name,
        email: data.email,
        companyName: data.company,
        website: data.website,
        country: data.country,
        tags: buildContactTags(data),
        source: "DigitalFalconz Website Contact Form",
      }),
    });

    if (apiRes.ok) {
      return { success: true, message: "Enquiry delivered to GoHighLevel." };
    }

    const text = await apiRes.text();
    console.error("GHL REST API returned non-200:", apiRes.status, text);
    return { success: false, error: `GHL API failed: ${apiRes.statusText}` };
  } catch (err: any) {
    console.error("Error calling GHL REST API:", err);
    return { success: false, error: err?.message || "Failed to connect to GHL REST API" };
  }
}
