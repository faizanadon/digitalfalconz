import type { ContactFormData } from "./email";

export interface GHLResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Sends contact enquiry data to GoHighLevel (GHL).
 * 
 * Supports two methods:
 * 1. GHL Inbound Webhook URL (GHL_WEBHOOK_URL) - recommended, easiest to set up in GHL Workflows.
 * 2. GHL V2 REST API (GHL_API_KEY + GHL_LOCATION_ID) - direct contact upsert via LeadConnector HQ API.
 */
export async function sendToGHL(data: ContactFormData): Promise<GHLResponse> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  const apiKey = process.env.GHL_API_KEY || process.env.GHL_ACCESS_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  // Split full name into first and last name for GHL contact records
  const nameParts = data.name.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Standardized payload covering both snake_case and camelCase naming
  // so any GHL Inbound Webhook trigger mapping will match effortlessly.
  const payload = {
    firstName,
    lastName,
    name: data.name,
    email: data.email,
    companyName: data.company || "",
    company: data.company || "",
    website: data.website || "",
    country: data.country || "",
    help: data.help || "",
    helpWith: data.help || "",
    investment: data.investment || "",
    desiredStart: data.start || "",
    start: data.start || "",
    goals: data.goals,
    message: data.goals,
    brief: data.brief || "",
    briefUrl: data.brief || "",
    tags: ["website-lead", "contact-form", "digitalfalconz"],
    source: "DigitalFalconz Website Contact Form",
    submittedAt: new Date().toISOString(),
  };

  let webhookSuccess = false;
  let apiSuccess = false;
  let errorMsg = "";

  // 1. Post to GHL Webhook (Workflow Trigger)
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        webhookSuccess = true;
      } else {
        const text = await res.text();
        console.error("GHL Webhook returned non-200:", res.status, text);
        errorMsg = `GHL Webhook failed: ${res.statusText}`;
      }
    } catch (err: any) {
      console.error("Error posting to GHL Webhook:", err);
      errorMsg = err?.message || "Failed to connect to GHL Webhook";
    }
  }

  // 2. Post to GHL REST API v2 (if API key + location ID provided)
  if (apiKey && locationId) {
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
          tags: ["website-lead", "contact-form", "digitalfalconz"],
          source: "DigitalFalconz Website Contact Form",
        }),
      });

      if (apiRes.ok) {
        apiSuccess = true;
      } else {
        const text = await apiRes.text();
        console.error("GHL REST API returned non-200:", apiRes.status, text);
        errorMsg = `GHL API failed: ${apiRes.statusText}`;
      }
    } catch (err: any) {
      console.error("Error calling GHL REST API:", err);
      errorMsg = err?.message || "Failed to connect to GHL REST API";
    }
  }

  if (webhookSuccess || apiSuccess) {
    return { success: true, message: "Enquiry delivered to GoHighLevel." };
  }

  if (!webhookUrl && (!apiKey || !locationId)) {
    console.warn(
      "[sendToGHL] No GHL configuration found (set GHL_WEBHOOK_URL or GHL_API_KEY + GHL_LOCATION_ID in .env.local). Lead was logged to console.",
      payload
    );
    return { success: false, error: "GoHighLevel configuration missing in environment." };
  }

  return { success: false, error: errorMsg || "Failed to deliver to GoHighLevel." };
}
