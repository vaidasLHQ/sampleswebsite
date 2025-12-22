import { samples } from "~/data/samples";
import type { CartItem } from "~/lib/cart";
import { getSupabaseServer } from "~/lib/supabaseServer";
import { createStripeCheckoutSession } from "~/lib/stripe";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function badRequest(message: string) {
  return new Response(message, { status: 400 });
}

export async function POST({ request }: { request: Request }) {
  const origin = new URL(request.url).origin;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON");
  }

  const userId = body?.userId ?? null;
  const email = String(body?.email ?? "").trim().toLowerCase();
  const items = (body?.items ?? []) as CartItem[];

  // Require authenticated user
  if (!userId) return badRequest("Login required to checkout");
  if (!email || !email.includes("@")) return badRequest("Invalid user email");
  if (!Array.isArray(items) || items.length === 0) return badRequest("Cart is empty");

  const sampleById = new Map(samples.map((s) => [s.id, s]));
  const normalized = items
    .map((it) => ({
      sampleId: Number(it.sampleId),
      quantity: Math.max(1, Math.floor(Number(it.quantity || 1))),
    }))
    .filter((it) => sampleById.has(it.sampleId));

  if (normalized.length === 0) return badRequest("No valid items");

  const supabase = getSupabaseServer();

  // Create order linked to authenticated user (no download token needed)
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      email,
      status: "pending",
    })
    .select("id")
    .single();

  if (orderErr || !order?.id) {
    return new Response(`Supabase error (order): ${orderErr?.message ?? "unknown"}`, {
      status: 500,
    });
  }

  const orderItems = normalized.map((it) => {
    const s = sampleById.get(it.sampleId)!;
    return {
      order_id: order.id,
      sample_id: s.id,
      quantity: it.quantity,
      unit_amount_cents: s.priceUsdCents,
    };
  });

  const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
  if (itemsErr) {
    return new Response(`Supabase error (items): ${itemsErr.message}`, { status: 500 });
  }

  const lineItems = normalized.map((it) => {
    const s = sampleById.get(it.sampleId)!;
    return {
      name: s.filename,
      amountCents: s.priceUsdCents,
      quantity: it.quantity,
    };
  });

  const session = await createStripeCheckoutSession({
    origin,
    email,
    orderId: order.id,
    lineItems,
  });

  const { error: updErr } = await supabase
    .from("orders")
    .update({ stripe_session_id: session.id })
    .eq("id", order.id);

  if (updErr) {
    return new Response(`Supabase error (update): ${updErr.message}`, { status: 500 });
  }

  return json({ url: session.url });
}



