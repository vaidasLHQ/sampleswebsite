import { createSignal, onMount } from "solid-js";
import { Howl, Howler } from "howler";

const [playingSampleId, setPlayingSampleId] = createSignal<number | null>(null);
const [loadingId, setLoadingId] = createSignal<number | null>(null);
const [globalVolume, setGlobalVolumeState] = createSignal(0.8);

// Cache for preloaded audio
const audioCache = new Map<number, Howl>();
const preloadQueue: Array<{ id: number; url: string }> = [];
let isPreloading = false;

let currentSound: Howl | null = null;

/**
 * Set global volume for all audio playback (0.0 to 1.0)
 */
export function setGlobalVolume(volume: number) {
  const clampedVolume = Math.max(0, Math.min(1, volume));
  setGlobalVolumeState(clampedVolume);
  Howler.volume(clampedVolume);
}

/**
 * Get current global volume
 */
export function getGlobalVolume() {
  return globalVolume();
}

function cleanupSound() {
  try {
    currentSound?.stop();
  } catch {
    // ignore
  }
  // Don't unload cached sounds - just stop them
  currentSound = null;
}

/**
 * Preload a single audio file into the cache
 */
function preloadAudio(sampleId: number, previewUrl: string): Promise<void> {
  return new Promise((resolve) => {
    // Skip if already cached or currently playing
    if (audioCache.has(sampleId)) {
      resolve();
      return;
    }

    const howl = new Howl({
      src: [previewUrl],
      html5: true,
      preload: true,
      onload: () => {
        audioCache.set(sampleId, howl);
        resolve();
      },
      onloaderror: () => {
        // Failed to preload, will load on demand
        resolve();
      },
    });
  });
}

/**
 * Process the preload queue in background
 */
async function processPreloadQueue() {
  if (isPreloading || preloadQueue.length === 0) return;
  
  isPreloading = true;
  
  while (preloadQueue.length > 0) {
    const item = preloadQueue.shift();
    if (!item) break;
    
    // Don't preload if user is already playing something
    // Give priority to user interaction
    if (playingSampleId() !== null) {
      await new Promise(r => setTimeout(r, 100));
    }
    
    await preloadAudio(item.id, item.url);
    
    // Small delay between preloads to not overwhelm the browser
    await new Promise(r => setTimeout(r, 50));
  }
  
  isPreloading = false;
}

/**
 * Queue samples for background preloading
 * Call this after page renders with visible samples
 */
export function queuePreload(samples: Array<{ id: number; previewUrl?: string }>) {
  for (const sample of samples) {
    if (sample.previewUrl && !audioCache.has(sample.id)) {
      // Check if not already in queue
      const alreadyQueued = preloadQueue.some(q => q.id === sample.id);
      if (!alreadyQueued) {
        preloadQueue.push({ id: sample.id, url: sample.previewUrl });
      }
    }
  }
  
  // Start processing if not already
  processPreloadQueue();
}

/**
 * Check if a sample is preloaded and ready
 */
export function isPreloaded(sampleId: number): boolean {
  return audioCache.has(sampleId);
}

/**
 * Get preload status for debugging/UI
 */
export function getPreloadStats() {
  return {
    cached: audioCache.size,
    queued: preloadQueue.length,
    isPreloading,
  };
}

export function useDemoPlayer() {
  const toggle = (sampleId: number, previewUrl: string) => {
    if (!previewUrl) return;

    // If same sample is playing, pause it
    if (playingSampleId() === sampleId) {
      currentSound?.pause();
      setPlayingSampleId(null);
      return;
    }

    // Stop current sound
    cleanupSound();
    
    // Check if we have a cached version
    const cachedHowl = audioCache.get(sampleId);
    
    if (cachedHowl) {
      // Use cached audio - instant playback!
      currentSound = cachedHowl;
      cachedHowl.seek(0); // Reset to beginning
      cachedHowl.play();
      setPlayingSampleId(sampleId);
      
      // Set up event handlers
      cachedHowl.off('end');
      cachedHowl.off('pause');
      cachedHowl.on('end', () => setPlayingSampleId(null));
      cachedHowl.on('pause', () => setPlayingSampleId(null));
    } else {
      // Load on demand (not preloaded yet)
      setLoadingId(sampleId);
      
      const howl = new Howl({
        src: [previewUrl],
        html5: true,
        onload: () => {
          // Cache it for future use
          audioCache.set(sampleId, howl);
          setLoadingId(null);
        },
        onplay: () => {
          setPlayingSampleId(sampleId);
          setLoadingId(null);
        },
        onpause: () => setPlayingSampleId(null),
        onend: () => setPlayingSampleId(null),
        onloaderror: () => {
          setPlayingSampleId(null);
          setLoadingId(null);
        },
        onplayerror: () => {
          setPlayingSampleId(null);
          setLoadingId(null);
        },
      });
      
      currentSound = howl;
      howl.play();
    }
  };

  const stop = () => {
    cleanupSound();
    setPlayingSampleId(null);
    setLoadingId(null);
  };

  return {
    playingSampleId,
    loadingId,
    toggle,
    stop,
    isPreloaded,
  };
}
