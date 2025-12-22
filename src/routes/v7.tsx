import { Title } from "@solidjs/meta";
import { For } from "solid-js";

// VARIANT 7: VISUAL ART - TECHNO MUSIC
// Dark, industrial, minimal, Berlin vibes, repetitive patterns
export default function LandingTechnoArt() {
  return (
    <main class="landing-v7">
      <Title>TRNDFY - Techno Underground</Title>
      
      <section class="v7-hero">
        {/* Techno art background */}
        <div class="v7-art-bg">
          {/* Industrial grid */}
          <div class="v7-industrial-grid">
            <For each={Array(20).fill(0)}>
              {(_, i) => (
                <div class="v7-grid-line-h" style={{ top: `${i() * 5}%` }} />
              )}
            </For>
            <For each={Array(20).fill(0)}>
              {(_, i) => (
                <div class="v7-grid-line-v" style={{ left: `${i() * 5}%` }} />
              )}
            </For>
          </div>
          
          {/* Kick drum pulse circles */}
          <div class="v7-kick-container">
            <div class="v7-kick v7-kick-1" />
            <div class="v7-kick v7-kick-2" />
            <div class="v7-kick v7-kick-3" />
            <div class="v7-kick-center" />
          </div>
          
          {/* Rotating geometric shapes */}
          <div class="v7-geo v7-geo-1">
            <div class="v7-geo-inner" />
          </div>
          <div class="v7-geo v7-geo-2">
            <div class="v7-geo-inner" />
          </div>
          
          {/* Strobe flash */}
          <div class="v7-strobe" />
          
          {/* BPM counter */}
          <div class="v7-bpm">
            <span class="v7-bpm-value">128</span>
            <span class="v7-bpm-label">BPM</span>
          </div>
        </div>
        
        <div class="v7-content">
          <div class="v7-label">
            <span class="v7-label-line" />
            <span class="v7-label-text">UNDERGROUND SOUND</span>
            <span class="v7-label-line" />
          </div>
          
          <h1 class="v7-title">
            <span class="v7-title-top">SAMPLE PACKS</span>
            <span class="v7-title-mid">OF TRENDING</span>
            <span class="v7-title-main">SPOTIFY SONGS</span>
          </h1>
          
          <div class="v7-divider">
            <For each={Array(5).fill(0)}>
              {() => <span class="v7-divider-block" />}
            </For>
          </div>
          
          <p class="v7-tagline">ROYALTY FREE</p>
          
          <p class="v7-description">
            Dark. Minimal. Relentless.<br />
            Industrial-grade samples for the underground.
          </p>
          
          <div class="v7-cta-area">
            <a href="/register" class="v7-cta">
              <span class="v7-cta-text">ENTER THE WAREHOUSE</span>
            </a>
          </div>
          
          <div class="v7-footer-info">
            <span>BERLIN</span>
            <span>•</span>
            <span>DETROIT</span>
            <span>•</span>
            <span>AMSTERDAM</span>
          </div>
        </div>
        
        {/* Bottom waveform */}
        <div class="v7-waveform">
          <For each={Array(100).fill(0)}>
            {(_, i) => (
              <div 
                class="v7-wave-bar"
                style={{ 
                  "--delay": `${i() * 0.02}s`,
                  "--h": `${10 + Math.abs(Math.sin(i() * 0.2)) * 40}px`
                }}
              />
            )}
          </For>
        </div>
      </section>
      
      <div class="v7-nav-links">
        <p>View other variants:</p>
        <a href="/v7">V7 - Techno (current)</a>
        <a href="/v8">V8 - Slap Bass</a>
        <a href="/v9">V9 - Rave</a>
        <a href="/v3">V3 - Original Art</a>
        <a href="/">Homepage</a>
      </div>
    </main>
  );
}





