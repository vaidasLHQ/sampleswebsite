import { getSupabaseServer } from "~/lib/supabaseServer";
import { getStripeWebhookSecret, verifyStripeWebhookSignature } from "~/lib/stripe";
import { sendDownloadEmail } from "~/lib/email";

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
  const email = (session?.customer_details?.email || session?.customer_email) as
    | string
    | undefined;

  if (!orderId) return ok();

  const supabase = getSupabaseServer();

  // Load order (idempotent)
  const { data: order, error: ordErr } = await supabase
    .from("orders")
    .select("id, email, status, download_token, email_sent_at")
    .eq("id", orderId)
    .single();

  if (ordErr || !order) return ok();

  // Mark paid (if not already)
  if (order.status !== "paid") {
    await supabase.from("orders").update({ status: "paid" }).eq("id", orderId);
  }

  // Email link once
  if (order.email_sent_at) return ok();

  const { count } = await supabase
    .from("order_items")
    .select("id", { count: "exact", head: true })
    .eq("order_id", orderId);

  const origin = new URL(request.url).origin;
  const downloadUrl = `${origin}/download/${encodeURIComponent(order.download_token)}`;

  try {
    await sendDownloadEmail({
      to: (order.email || email || "").trim(),
      downloadUrl,
      itemCount: count ?? 0,
    });
    await supabase
      .from("orders")
      .update({ email_sent_at: new Date().toISOString(), email_error: null })
      .eq("id", orderId);
  } catch (e: any) {
    await supabase
      .from("orders")
      .update({ email_error: e?.message ?? "Email failed" })
      .eq("id", orderId);
  }

  return ok();
}





