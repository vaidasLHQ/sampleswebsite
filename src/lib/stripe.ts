import { requireServerEnv } from "./serverEnv";

export function getStripeSecretKey() {
  return requireServerEnv("STRIPE_SECRET_KEY");
}

export function getStripeWebhookSecret() {
  return requireServerEnv("STRIPE_WEBHOOK_SECRET");
}

export async function verifyStripeWebhookSignature(opts: {
  payload: string;
  signatureHeader: string | null;
  webhookSecret: string;
}): Promise<boolean> {
  const header = opts.signatureHeader;
  if (!header) return false;

  // Format: t=timestamp,v1=signature[,v0=...]
  const parts = header.split(",").map((p) => p.trim());
  const tPart = parts.find((p) => p.startsWith("t="));
  const v1Part = parts.find((p) => p.startsWith("v1="));
  if (!tPart || !v1Part) return false;

  const timestamp = tPart.slice(2);
  const signature = v1Part.slice(3);
  const signedPayload = `${timestamp}.${opts.payload}`;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(opts.webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(signedPayload));
  const expected = bufferToHex(new Uint8Array(sigBuf));

  return timingSafeEqualHex(expected, signature);
}

function bufferToHex(buf: Uint8Array) {
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function createStripeCheckoutSession(opts: {
  origin: string;
  email: string;
  orderId: string;
  lineItems: Array<{ name: string; amountCents: number; quantity: number }>;
}): Promise<{ id: string; url: string }> {
  const key = getStripeSecretKey();

  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("success_url", `${opts.origin}/checkout/success`);
  params.set("cancel_url", `${opts.origin}/checkout/cancel`);
  params.set("customer_email", opts.email);
  params.set("metadata[order_id]", opts.orderId);

  opts.lineItems.forEach((li, idx) => {
    params.set(`line_items[${idx}][quantity]`, String(li.quantity));
    params.set(`line_items[${idx}][price_data][currency]`, "usd");
    params.set(`line_items[${idx}][price_data][unit_amount]`, String(li.amountCents));
    params.set(`line_items[${idx}][price_data][product_data][name]`, li.name);
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Stripe error: ${txt}`);
  }

  const data = (await res.json()) as any;
  if (!data?.id || !data?.url) throw new Error("Stripe returned invalid response");
  return { id: data.id as string, url: data.url as string };
}


