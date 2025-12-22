import { Show } from "solid-js";
import type { Sample } from "~/data/samples";
import { useCart } from "~/lib/cart";

interface SampleRowV12Props {
  sample: Sample;
  onPlay?: () => void;
  isPlaying?: boolean;
  isLoading?: boolean;
  isNew?: boolean;
}

/**
 * V12 Enhanced Sample Row Component
 * Features: Duration display, NEW badges, Waveform preview, Cart integration
 */
export default function SampleRowV12(props: SampleRowV12Props) {
  const cart = useCart();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const onAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cart.addSample(props.sample.id, 1);
  };

  // Generate pseudo-random waveform based on sample id
  const waveformBars = () => {
    const bars = [];
    const seed = props.sample.id * 17;
    for (let i = 0; i < 40; i++) {
      const height = 20 + Math.abs(Math.sin(seed + i * 0.3)) * 80;
      bars.push(height);
    }
    return bars;
  };

  return (
    <div class={`sample-row-v12 ${props.isPlaying ? "playing" : ""}`}>
      {/* Play Button */}
      <button
        class={`v12-play-btn ${props.isLoading ? "loading" : ""}`}
        onClick={props.onPlay}
        aria-label={props.isLoading ? "Loading" : props.isPlaying ? "Pause" : "Play"}
        disabled={props.isLoading}
      >
        <Show when={props.isLoading}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="v12-spinner">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" />
          </svg>
        </Show>
        <Show when={!props.isLoading && props.isPlaying}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        </Show>
        <Show when={!props.isLoading && !props.isPlaying}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </Show>
      </button>

      {/* Artwork */}
      <div class="v12-artwork">
        <img src={props.sample.artwork} alt={props.sample.packName} loading="lazy" />
        <Show when={props.isNew}>
          <span class="v12-new-badge">NEW</span>
        </Show>
      </div>

      {/* Info */}
      <div class="v12-info">
        <div class="v12-title-row">
          <span class="v12-filename">{props.sample.packName}</span>
        </div>
        <div class="v12-pack-name">{props.sample.filename.replace(".wav", "")}</div>
      </div>

      {/* Tags */}
      <div class="v12-tags">
        <span class="v12-tag">{props.sample.category}</span>
        <Show when={props.sample.bpm > 0}>
          <span class="v12-tag v12-tag-bpm">{props.sample.bpm} BPM</span>
        </Show>
      </div>

      {/* Duration */}
      <div class="v12-duration">{formatDuration(props.sample.duration)}</div>

      {/* Waveform Preview */}
      <div class={`v12-waveform ${props.isPlaying ? "active" : ""}`}>
        {waveformBars().map((height, i) => (
          <div
            class="v12-waveform-bar"
            style={{
              height: `${height}%`,
              "animation-delay": props.isPlaying ? `${i * 0.02}s` : "0s",
            }}
          />
        ))}
      </div>

      {/* Actions */}
      <div class="v12-actions">
        <div class="v12-price">${(props.sample.priceUsdCents / 100).toFixed(2)}</div>
        <button
          class={`v12-add-btn ${cart.isInCart(props.sample.id) ? "in-cart" : ""}`}
          onClick={onAddToCart}
          aria-label={cart.isInCart(props.sample.id) ? "In cart" : "Add to cart"}
        >
          <Show
            when={!cart.isInCart(props.sample.id)}
            fallback={
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Added</span>
              </>
            }
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>Add</span>
          </Show>
        </button>
      </div>
    </div>
  );
}
