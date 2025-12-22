import { samples } from "~/data/samples";
import { getSupabaseServer } from "~/lib/supabaseServer";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token")?.trim();
  if (!token) return new Response("Missing token", { status: 400 });

  const supabase = getSupabaseServer();

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .select("id, status")
    .eq("download_token", token)
    .single();

  if (orderErr || !order) return new Response("Invalid token", { status: 404 });
  if (order.status !== "paid") return new Response("Not paid", { status: 403 });

  const { data: items, error: itemsErr } = await supabase
    .from("order_items")
    .select("sample_id, quantity")
    .eq("order_id", order.id);

  if (itemsErr || !items) return new Response("Order items missing", { status: 500 });

  const fullBucket = ((import.meta as any).env?.SUPABASE_FULL_BUCKET as string | undefined) ?? "sample-full";

  const sampleById = new Map(samples.map((s) => [s.id, s]));
  const out: Array<{ filename: string; url: string }> = [];

  for (const it of items as any[]) {
    const s = sampleById.get(Number(it.sample_id));
    if (!s) continue;

    // One link per sample (even if quantity > 1)
    const { data, error } = await supabase.storage
      .from(fullBucket)
      .createSignedUrl(s.fullStoragePath, 60 * 15);

    if (error || !data?.signedUrl) continue;
    out.push({ filename: s.filename, url: data.signedUrl });
  }

  return json({ items: out });
}





