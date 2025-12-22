import { Title } from "@solidjs/meta";

export default function CheckoutCancel() {
  return (
    <main class="checkout-result">
      <Title>Payment cancelled - TRNDFY</Title>
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





