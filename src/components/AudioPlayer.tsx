import { createSignal, onCleanup, Show } from "solid-js";
import { Howl } from "howler";

interface AudioPlayerProps {
  src: string;
  packName: string;
}

export default function AudioPlayer(props: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [progress, setProgress] = createSignal(0);
  let sound: Howl | null = null;
  let progressInterval: number | null = null;

  const initSound = () => {
    if (!sound) {
      sound = new Howl({
        src: [props.src],
        html5: true,
        onplay: () => {
          setIsPlaying(true);
          startProgressTracking();
        },
        onpause: () => {
          setIsPlaying(false);
          stopProgressTracking();
        },
        onend: () => {
          setIsPlaying(false);
          setProgress(0);
          stopProgressTracking();
        },
        onloaderror: () => {
          console.error('Error loading audio');
        }
      });
    }
  };

  const startProgressTracking = () => {
    progressInterval = window.setInterval(() => {
      if (sound) {
        const seek = sound.seek() as number;
        const duration = sound.duration();
        setProgress((seek / duration) * 100);
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  };

  const togglePlay = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    
    initSound();
    
    if (isPlaying()) {
      sound?.pause();
    } else {
      sound?.play();
    }
  };

  onCleanup(() => {
    sound?.unload();
    stopProgressTracking();
  });

  return (
    <div class="audio-player">
      <button 
        class="play-button-control"
        onClick={togglePlay}
        aria-label={isPlaying() ? "Pause" : "Play"}
      >
        <Show when={!isPlaying()} fallback={
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        }>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </Show>
      </button>
      <div class="audio-progress">
        <div class="audio-progress-bar" style={{ width: `${progress()}%` }} />
      </div>
    </div>
  );
}


