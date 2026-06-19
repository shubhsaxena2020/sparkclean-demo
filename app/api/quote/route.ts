import { NextResponse } from "next/server";
import { EMAIL } from "@/lib/site";

type QuotePayload = {
  service: string;
  frequency: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  name: string;
  email: string;
  phone: string;
  postalCode: string;
  preferredDate: string;
  notes: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POSTAL_RE = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

function isQuotePayload(value: unknown): value is QuotePayload {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<QuotePayload>;

  return (
    typeof data.service === "string" &&
    typeof data.frequency === "string" &&
    typeof data.bedrooms === "number" &&
    typeof data.bathrooms === "number" &&
    typeof data.price === "number" &&
    typeof data.name === "string" &&
    typeof data.email === "string" &&
    typeof data.phone === "string" &&
    typeof data.postalCode === "string" &&
    typeof data.preferredDate === "string" &&
    typeof data.notes === "string"
  );
}

function validate(payload: QuotePayload) {
  const errors: Record<string, string> = {};

  if (payload.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!EMAIL_RE.test(payload.email.trim())) errors.email = "Enter a valid email address.";
  if (payload.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a 10-digit phone number.";
  if (!POSTAL_RE.test(payload.postalCode.trim())) errors.postalCode = "Enter a valid Canadian postal code.";

  return errors;
}

function makeEmailText(payload: QuotePayload, referenceId: string) {
  return [
    `Reference: ${referenceId}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Postal code: ${payload.postalCode}`,
    `Preferred date/time: ${payload.preferredDate || "Flexible"}`,
    `Service: ${payload.service}`,
    `Bedrooms: ${payload.bedrooms === 0 ? "Studio" : payload.bedrooms}`,
    `Bathrooms: ${payload.bathrooms}`,
    `Frequency: ${payload.frequency}`,
    `Estimated rate: $${payload.price}`,
    "",
    `Notes: ${payload.notes || "None"}`,
  ].join("\n");
}

async function sendEmail(payload: QuotePayload, referenceId: string) {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL ?? EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!resendKey || !fromEmail) {
    return "not_configured" as const;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject: `SparkClean Quote Request ${referenceId}`,
      text: makeEmailText(payload, referenceId),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend failed with ${response.status}`);
  }

  return "sent" as const;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Send valid JSON." } }, { status: 400 });
  }

  if (!isQuotePayload(body)) {
    return NextResponse.json({ ok: false, errors: { form: "Quote request is missing required fields." } }, { status: 400 });
  }

  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const referenceId = `SC-${Date.now().toString(36).toUpperCase()}`;

  try {
    const delivery = await sendEmail(body, referenceId);
    return NextResponse.json({ ok: true, referenceId, delivery });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        errors: { form: "The request was valid, but email delivery failed. Please email the quote details directly." },
      },
      { status: 502 },
    );
  }
}
