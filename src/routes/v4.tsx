import { Title } from "@solidjs/meta";
import { For } from "solid-js";

// VARIANT 4: VISUAL ART - MUSIC THEMED
// Waveforms, vinyl records, equalizer bars, audio spectrum
export default function LandingMusicArt() {
  return (
    <main class="landing-v4">
      <Title>TRNDFY - Sound Waves</Title>
      
      <section class="v4-hero">
        {/* Music-themed art background */}
        <div class="v4-art-bg">
          {/* Vinyl record */}
          <div class="v4-vinyl">
            <div class="v4-vinyl-grooves">
              <For each={Array(20).fill(0)}>
                {(_, i) => (
                  <div class="v4-groove" style={{ "--i": i() }} />
                )}
              </For>
            </div>
            <div class="v4-vinyl-label">
              <span>SAMPLE</span>
              <span>VAULT</span>
            </div>
          </div>
          
          {/* Audio spectrum bars */}
          <div class="v4-spectrum v4-spectrum-left">
            <For each={Array(12).fill(0)}>
              {(_, i) => (
                <div 
                  class="v4-spectrum-bar" 
                  style={{ 
                    "--delay": `${i() * 0.1}s`,
                    "--height": `${30 + Math.sin(i() * 0.8) * 50 + Math.random() * 20}%`
                  }} 
                />
              )}
            </For>
          </div>
          
          <div class="v4-spectrum v4-spectrum-right">
            <For each={Array(12).fill(0)}>
              {(_, i) => (
                <div 
                  class="v4-spectrum-bar" 
                  style={{ 
                    "--delay": `${i() * 0.12}s`,
                    "--height": `${30 + Math.cos(i() * 0.8) * 50 + Math.random() * 20}%`
                  }} 
                />
              )}
            </For>
          </div>
          
          {/* Floating musical notes */}
          <div class="v4-notes">
            <span class="v4-note" style={{ left: "10%", "--delay": "0s" }}>♪</span>
            <span class="v4-note" style={{ left: "25%", "--delay": "1s" }}>♫</span>
            <span class="v4-note" style={{ left: "75%", "--delay": "2s" }}>♬</span>
            <span class="v4-note" style={{ left: "85%", "--delay": "0.5s" }}>♩</span>
          </div>
          
          {/* Waveform sine wave */}
          <svg class="v4-waveform-svg" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path class="v4-wave-path" d="M0,100 Q150,20 300,100 T600,100 T900,100 T1200,100" />
            <path class="v4-wave-path v4-wave-path-2" d="M0,100 Q150,180 300,100 T600,100 T900,100 T1200,100" />
          </svg>
        </div>
        
        <div class="v4-content">
          <div class="v4-label">
            <span class="v4-headphones">🎧</span>
            <span class="v4-label-text">AUDIO EXPERIENCE</span>
          </div>
          
          <h1 class="v4-title">
            <span class="v4-title-line">Sample Packs</span>
            <span class="v4-title-sub">of Trending</span>
            <span class="v4-title-accent">Spotify Songs</span>
          </h1>
          
          <div class="v4-subtitle">
            <span class="v4-eq-bar" />
            <span class="v4-subtitle-text">ROYALTY FREE</span>
            <span class="v4-eq-bar" />
          </div>
          
          <p class="v4-manifesto">
            Feel the rhythm. Capture the vibe.<br />
            Premium samples extracted from chart-topping<br />
            hits, ready for your next masterpiece.
          </p>
          
          <div class="v4-cta-area">
            <a href="/register" class="v4-cta">
              <span class="v4-play-circle">▶</span>
              <span class="v4-cta-text">Start Creating</span>
            </a>
          </div>
        </div>
        
        {/* Bottom equalizer */}
        <div class="v4-bottom-eq">
          <For each={Array(60).fill(0)}>
            {(_, i) => (
              <div 
                class="v4-eq-line"
                style={{ "--delay": `${i() * 0.05}s` }}
              />
            )}
          </For>
        </div>
      </section>
      
      <div class="v4-nav-links">
        <p>View other variants:</p>
        <a href="/v3">V3 - Original Art</a>
        <a href="/v4">V4 - Music (current)</a>
        <a href="/v5">V5 - Business</a>
        <a href="/v6">V6 - High Tech</a>
        <a href="/">Original Homepage</a>
      </div>
    </main>
  );
}





