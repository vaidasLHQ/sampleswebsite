import { Title } from "@solidjs/meta";
import { For } from "solid-js";

// VARIANT 2: LIVE & CATCHY - Energetic, animated, vibrant
export default function LandingCatchy() {
  return (
    <main class="landing-v2">
      <Title>TRNDFY - 🔥 Trending Spotify Samples</Title>
      
      <section class="v2-hero">
        {/* Animated background */}
        <div class="v2-bg-animation">
          <div class="v2-blob v2-blob-1" />
          <div class="v2-blob v2-blob-2" />
          <div class="v2-blob v2-blob-3" />
          <div class="v2-particles">
            <For each={Array(20).fill(0)}>
              {(_, i) => (
                <div 
                  class="v2-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    "animation-delay": `${i() * 0.2}s`,
                    "animation-duration": `${3 + Math.random() * 2}s`
                  }}
                />
              )}
            </For>
          </div>
        </div>
        
        <div class="v2-content">
          <div class="v2-badge-wrapper">
            <div class="v2-badge v2-badge-pulse">
              <span class="v2-fire">🔥</span>
              <span>TRENDING NOW</span>
              <span class="v2-live-dot" />
            </div>
          </div>
          
          <h1 class="v2-title">
            <span class="v2-word v2-word-1">SAMPLE</span>
            <span class="v2-word v2-word-2">PACKS</span>
            <span class="v2-word v2-word-3">FROM</span>
            <span class="v2-word v2-word-4 v2-gradient-text">SPOTIFY HITS</span>
          </h1>
          
          <div class="v2-tagline">
            <span class="v2-tag">100% ROYALTY FREE</span>
            <span class="v2-divider">•</span>
            <span class="v2-tag">INSTANT DOWNLOAD</span>
            <span class="v2-divider">•</span>
            <span class="v2-tag">UNLIMITED USE</span>
          </div>
          
          <p class="v2-description">
            Drop beats that <em>slap</em>. Premium samples from chart-toppers, 
            ready for your next banger. No clearance needed. Ever.
          </p>
          
          <div class="v2-actions">
            <a href="/register" class="v2-btn-primary v2-btn-glow">
              <span class="v2-btn-text">START FREE</span>
              <span class="v2-btn-arrow">→</span>
            </a>
            <a href="#preview" class="v2-btn-secondary">
              <span class="v2-play-icon">▶</span>
              Preview Samples
            </a>
          </div>
          
          {/* Floating genre tags */}
          <div class="v2-floating-tags">
            <span class="v2-float-tag" style={{"animation-delay": "0s"}}>Hip Hop</span>
            <span class="v2-float-tag" style={{"animation-delay": "0.5s"}}>Trap</span>
            <span class="v2-float-tag" style={{"animation-delay": "1s"}}>R&B</span>
            <span class="v2-float-tag" style={{"animation-delay": "1.5s"}}>Pop</span>
            <span class="v2-float-tag" style={{"animation-delay": "2s"}}>EDM</span>
          </div>
        </div>
        
        {/* Waveform visualization */}
        <div class="v2-waveform">
          <For each={Array(50).fill(0)}>
            {(_, i) => (
              <div 
                class="v2-wave-bar"
                style={{
                  height: `${20 + Math.sin(i() * 0.3) * 40 + Math.random() * 20}px`,
                  "animation-delay": `${i() * 0.05}s`
                }}
              />
            )}
          </For>
        </div>
      </section>
      
      <div class="v2-nav-links">
        <p>View other variants:</p>
        <a href="/v1">V1 - Conservative</a>
        <a href="/v2">V2 - Live & Catchy (current)</a>
        <a href="/v3">V3 - Visual Art</a>
        <a href="/">Original Homepage</a>
      </div>
    </main>
  );
}





