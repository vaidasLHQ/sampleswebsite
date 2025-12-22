import { Show } from "solid-js";
import type { Sample } from "~/data/samples";
import { useCart } from "~/lib/cart";

interface SampleRowProps {
  sample: Sample;
  onPlay?: () => void;
  isPlaying?: boolean;
  isLoading?: boolean;
}

export default function SampleRow(props: SampleRowProps) {
  const cart = useCart();

  const onAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cart.addSample(props.sample.id, 1);
  };

  return (
    <div class="sample-row">
      <div class="sample-artwork">
        <img src={props.sample.artwork} alt={props.sample.packName} />
      </div>
      
      <button 
        class={`sample-play-btn ${props.isLoading ? 'loading' : ''}`}
        onClick={props.onPlay}
        aria-label={props.isLoading ? "Loading" : props.isPlaying ? "Pause" : "Play"}
        disabled={props.isLoading}
      >
        <Show when={props.isLoading}>
          {/* Loading spinner */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
          </svg>
        </Show>
        <Show when={!props.isLoading && props.isPlaying}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        </Show>
        <Show when={!props.isLoading && !props.isPlaying}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </Show>
      </button>

      <div class="sample-info">
        <div class="sample-filename">{props.sample.filename}</div>
        <div class="sample-pack-name">{props.sample.packName}</div>
      </div>

      <div class="sample-waveform">
        {/* Waveform bars - simulated */}
        {Array.from({ length: 60 }).map((_, i) => {
          const height = Math.random() * 100;
          return <div class="waveform-bar" style={{ height: `${height}%` }} />;
        })}
      </div>

      <div class="sample-actions">
        <div class="sample-price">${(props.sample.priceUsdCents / 100).toFixed(2)}</div>
        <button
          class={`sample-add-btn ${cart.isInCart(props.sample.id) ? "in-cart" : ""}`}
          onClick={onAddToCart}
          aria-label="Add to cart"
        >
          <Show when={!cart.isInCart(props.sample.id)} fallback={"In cart"}>
            Add
          </Show>
        </button>
      </div>

      <Show when={props.sample.bpm || props.sample.key}>
        <div class="sample-metadata">
          <Show when={props.sample.bpm}>
            <span class="sample-bpm">{props.sample.bpm} BPM</span>
          </Show>
          <Show when={props.sample.key}>
            <span class="sample-key">{props.sample.key}</span>
          </Show>
        </div>
      </Show>
    </div>
  );
}


