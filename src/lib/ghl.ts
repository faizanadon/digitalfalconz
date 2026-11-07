import type { ContactFormData } from "./email";

export interface GHLResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Custom field IDs for the form fields in the "Digital Falconz" sub-account
 * (location dcts1IzmzaWnBUYWaPws). Name, email, company and website map to
 * HighLevel's standard contact fields; these six cover the rest of the form.
 * If a field is ever recreated in HighLevel, its new ID must be put here.
 */
const CUSTOM_FIELD_IDS = {
  help: "1EuVkpkYRZhpUOs7EyKy", // Help Needed
  investment: "0ErTlxmMBajKCVswt817", // Investment Range
  start: "5wfO8zIMmGnR9jQkXcK4", // Desired Start
  country: "VjmZAFzSBc4wkoiyeuIg", // Country / Time Zone
  goals: "7IFuB2dYvAKeXHkYYQrv", // Project Goals
  brief: "2BuM8zMulBJNd0I7Qzij", // Brief Link
} as const;

/**
 * Builds the custom-field values for the upsert, one entry per form field
 * that has a value. Empty fields are left out so an enquiry never wipes a
 * value already stored on the contact.
 */
function buildCustomFields(data: ContactFormData): { id: string; value: string }[] {
  const fields: { id: string; value: string }[] = [];

  const add = (id: string, value?: string) => {
    if (value) fields.push({ id, value });
  };

  add(CUSTOM_FIELD_IDS.help, data.help);
  add(CUSTOM_FIELD_IDS.investment, data.investment);
  add(CUSTOM_FIELD_IDS.start, data.start);
  add(CUSTOM_FIELD_IDS.country, data.country);
  add(CUSTOM_FIELD_IDS.goals, data.goals);
  add(CUSTOM_FIELD_IDS.brief, data.brief);

  return fields;
}

/**
 * Sends contact enquiry data to GoHighLevel (GHL) via the v2 REST API
 * (LeadConnector HQ) — the only delivery method this site uses.
 *
 * Requires GHL_API_KEY (a Private Integration token with the
 * contacts.write scope) and GHL_LOCATION_ID in the environment.
 * The contact is created or updated by email (upsert), tagged with the
 * single tag "siteform", with the form fields stored in HighLevel custom
 * fields and the source set to "DigitalFalconz Website Contact Form".
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
        tags: ["siteform"],
        customFields: buildCustomFields(data),
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
