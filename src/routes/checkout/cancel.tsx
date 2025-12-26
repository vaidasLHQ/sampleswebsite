import SEO from "~/components/SEO";

export default function CheckoutCancel() {
  return (
    <main class="checkout-result">
      <SEO 
        title="Payment Cancelled" 
        description="Your payment was cancelled. Your cart is still available."
        path="/checkout/cancel"
        noindex={true}
      />
      <section class="checkout-result-inner">
        <h1>Payment cancelled</h1>
        <p>No worries — your cart is still here.</p>
        <a class="btn btn-primary" href="/cart">
          Back to cart
        </a>
      </section>
    </main>
  );
}





