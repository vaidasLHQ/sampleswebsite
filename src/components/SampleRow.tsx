import { Show } from "solid-js";

interface SampleRowProps {
  artwork: string;
  filename: string;
  packName: string;
  bpm?: number;
  key?: string;
  onPlay?: () => void;
  isPlaying?: boolean;
}

export default function SampleRow(props: SampleRowProps) {
  return (
    <div class="sample-row">
      <div class="sample-artwork">
        <img src={props.artwork} alt={props.packName} />
      </div>
      
      <button 
        class="sample-play-btn"
        onClick={props.onPlay}
        aria-label={props.isPlaying ? "Pause" : "Play"}
      >
        <Show when={!props.isPlaying} fallback={
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        }>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </Show>
      </button>

      <div class="sample-info">
        <div class="sample-filename">{props.filename}</div>
        <div class="sample-pack-name">{props.packName}</div>
      </div>

      <div class="sample-waveform">
        {/* Waveform bars - simulated */}
        {Array.from({ length: 60 }).map((_, i) => {
          const height = Math.random() * 100;
          return <div class="waveform-bar" style={{ height: `${height}%` }} />;
        })}
      </div>

      <Show when={props.bpm || props.key}>
        <div class="sample-metadata">
          <Show when={props.bpm}>
            <span class="sample-bpm">{props.bpm} BPM</span>
          </Show>
          <Show when={props.key}>
            <span class="sample-key">{props.key}</span>
          </Show>
        </div>
      </Show>
    </div>
  );
}

