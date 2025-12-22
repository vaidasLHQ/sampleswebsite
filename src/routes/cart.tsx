import { For, Show, createMemo, createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { samples } from "~/data/samples";
import { useCart } from "~/lib/cart";
import { supabase } from "~/lib/supabase";
import SEO from "~/components/SEO";

function formatUsd(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function CartPage() {
  const cart = useCart();
  const navigate = useNavigate();

  const [mounted, setMounted] = createSignal(false);
  const [email, setEmail] = createSignal("");
  const [userId, setUserId] = createSignal<string | null>(null);
  const [submitting, setSubmitting] = createSignal(false);
  const [error, setError] = createSignal("");

  // Check auth and wait for client-side hydration
  onMount(async () => {
    setMounted(true);
    
    // Check if user is logged in and pre-fill email
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUserId(session.user.id);
      if (session.user.email) {
        setEmail(session.user.email);
      }
    }
  });

  const sampleById = createMemo(() => new Map(samples.map((s) => [s.id, s])));

  const lines = createMemo(() =>
    cart.items().map((it) => {
      const s = sampleById().get(it.sampleId);
      return { item: it, sample: s };
    })
  );

  const canCheckout = createMemo(() => cart.itemCount() > 0 && email().includes("@"));

  const startCheckout = async () => {
    setError("");
    if (!canCheckout()) return;

    setSubmitting(true);
    try {
      const checkoutData: Record<string, any> = {
        email: email().trim(),
        items: cart.items(),
      };
      
      // Link order to authenticated user if logged in
      if (userId()) {
        checkoutData.userId = userId();
      }
      
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutData),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Checkout failed");
      }

      const data = (await res.json()) as { url?: string };
      if (!data.url) throw new Error("Missing Stripe redirect URL");

      window.location.href = data.url;
    } catch (e: any) {
      setError(e?.message ?? "Checkout failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main class="cart-page">
      <SEO 
        title="Shopping Cart"
        description="Review your selected sample packs and proceed to checkout."
        path="/cart"
        noindex={true}
      />

      <section class="cart-section">
        <div class="cart-container">
          <div class="cart-header">
            <h1>Cart</h1>
            <Show when={mounted() && cart.itemCount() > 0}>
              <button class="btn btn-secondary" onClick={() => cart.clear()}>
                Clear
              </button>
            </Show>
          </div>

          <Show when={!mounted()}>
            <div class="cart-empty">
              <p>Loading cart...</p>
            </div>
          </Show>

          <Show
            when={mounted() && cart.itemCount() > 0}
            fallback={
              <Show when={mounted()}>
                <div class="cart-empty">
                  <p>Your cart is empty.</p>
                  <button class="btn btn-primary" onClick={() => navigate("/")}>
                    Browse samples
                  </button>
                </div>
              </Show>
            }
          >
            <div class="cart-grid">
              <div class="cart-items">
                <For each={lines()}>
                  {(line) => (
                    <Show when={line.sample}>
                      {(s) => (
                        <div class="cart-item">
                          <img class="cart-item-art" src={s().artwork} alt={s().packName} />
                          <div class="cart-item-main">
                            <div class="cart-item-title">{s().filename}</div>
                            <div class="cart-item-sub">{s().packName}</div>
                            <div class="cart-item-meta">
                              <span>{formatUsd(s().priceUsdCents)}</span>
                              <span class="dot">•</span>
                              <span>{s().category}</span>
                            </div>
                          </div>

                          <div class="cart-item-qty">
                            <input
                              type="number"
                              min="1"
                              value={line.item.quantity}
                              onInput={(e) =>
                                cart.setQuantity(line.item.sampleId, Number(e.currentTarget.value))
                              }
                            />
                          </div>

                          <div class="cart-item-total">
                            {formatUsd(s().priceUsdCents * line.item.quantity)}
                          </div>

                          <button
                            class="btn btn-secondary cart-remove"
                            onClick={() => cart.removeSample(line.item.sampleId)}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </Show>
                  )}
                </For>
              </div>

              <aside class="cart-summary">
                <h2>Checkout</h2>
                <div class="cart-summary-row">
                  <span>Subtotal</span>
                  <strong>{formatUsd(cart.subtotalCents())}</strong>
                </div>

                <div class="cart-summary-row">
                  <span>Email for delivery</span>
                </div>
                <input
                  class="cart-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email()}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  autocomplete="email"
                />

                <Show when={error()}>
                  <div class="cart-error">{error()}</div>
                </Show>

                <button
                  class="btn btn-primary btn-large btn-full"
                  disabled={!canCheckout() || submitting()}
                  onClick={startCheckout}
                >
                  {submitting() ? "Redirecting..." : "Pay with Stripe"}
                </button>

                <p class="cart-note">
                  After payment, we’ll email you a private download link (full-quality files). Demos stay public.
                </p>
              </aside>
            </div>
          </Show>
        </div>
      </section>
    </main>
  );
}


