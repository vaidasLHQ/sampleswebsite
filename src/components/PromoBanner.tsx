import { createSignal, Show } from "solid-js";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = createSignal(true);

  return (
    <Show when={isVisible()}>
      <div class="promo-banner">
        <div class="promo-content">
          <strong>Limited Time Offer:</strong>
          <span>Get 30% off your first pack with code WELCOME30</span>
          <a href="/register" class="promo-cta">Start Free Trial →</a>
        </div>
        <button 
          class="promo-close" 
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
        >
          ✕
        </button>
      </div>
    </Show>
  );
}


