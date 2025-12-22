import { getSupabaseServer } from "~/lib/supabaseServer";
import { getStripeWebhookSecret, verifyStripeWebhookSignature } from "~/lib/stripe";

function ok() {
  return new Response("ok", { status: 200 });
}

export async function POST({ request }: { request: Request }) {
  const payload = await request.text();

  let verified = false;
  try {
    verified = await verifyStripeWebhookSignature({
      payload,
      signatureHeader: request.headers.get("stripe-signature"),
      webhookSecret: getStripeWebhookSecret(),
    });
  } catch (e) {
    return new Response((e as any)?.message ?? "Webhook secret missing", { status: 500 });
  }

  if (!verified) return new Response("Invalid signature", { status: 400 });

  let event: any;
  try {
    event = JSON.parse(payload);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (event?.type !== "checkout.session.completed") return ok();

  const session = event?.data?.object;
  const orderId = session?.metadata?.order_id as string | undefined;

  if (!orderId) return ok();

  const supabase = getSupabaseServer();

  // Load order (idempotent)
  const { data: order, error: ordErr } = await supabase
    .from("orders")
    .select("id, status")
    .eq("id", orderId)
    .single();

  if (ordErr || !order) return ok();

  // Mark paid (if not already)
  // Samples become available in user's Vault immediately - no email sent
  if (order.status !== "paid") {
    await supabase.from("orders").update({ status: "paid" }).eq("id", orderId);
  }

  return ok();
}





