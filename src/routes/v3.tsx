import { Title } from "@solidjs/meta";
import { For } from "solid-js";

// VARIANT 3: VISUAL ART - Artistic, creative, gallery-like
export default function LandingArt() {
  return (
    <main class="landing-v3">
      <Title>TRNDFY - Sound as Art</Title>
      
      <section class="v3-hero">
        {/* Abstract art background */}
        <div class="v3-art-bg">
          <svg class="v3-svg-art" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="v3-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ff006e;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#8338ec;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#3a86ff;stop-opacity:1" />
              </linearGradient>
              <linearGradient id="v3-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#ffbe0b;stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:#fb5607;stop-opacity:0.8" />
              </linearGradient>
            </defs>
            <circle class="v3-shape v3-shape-1" cx="200" cy="300" r="150" fill="url(#v3-grad1)" opacity="0.6" />
            <circle class="v3-shape v3-shape-2" cx="800" cy="200" r="200" fill="url(#v3-grad2)" opacity="0.5" />
            <circle class="v3-shape v3-shape-3" cx="500" cy="700" r="180" fill="url(#v3-grad1)" opacity="0.4" />
            <path class="v3-shape v3-shape-4" d="M100,500 Q300,100 500,500 T900,500" stroke="url(#v3-grad2)" stroke-width="3" fill="none" opacity="0.6" />
            <path class="v3-shape v3-shape-5" d="M0,600 Q250,300 500,600 T1000,600" stroke="url(#v3-grad1)" stroke-width="2" fill="none" opacity="0.4" />
          </svg>
          
          {/* Noise texture overlay */}
          <div class="v3-noise" />
          
          {/* Grid lines */}
          <div class="v3-grid">
            <For each={Array(10).fill(0)}>
              {(_, i) => (
                <>
                  <div class="v3-grid-line v3-grid-h" style={{top: `${i() * 10}%`}} />
                  <div class="v3-grid-line v3-grid-v" style={{left: `${i() * 10}%`}} />
                </>
              )}
            </For>
          </div>
        </div>
        
        <div class="v3-content">
          <div class="v3-label">
            <span class="v3-label-line" />
            <span class="v3-label-text">AUDIO COLLECTION 2024</span>
            <span class="v3-label-line" />
          </div>
          
          <h1 class="v3-title">
            <span class="v3-title-line v3-title-line-1">Sample Packs</span>
            <span class="v3-title-line v3-title-line-2">of Trending</span>
            <span class="v3-title-line v3-title-line-3 v3-accent">Spotify Songs</span>
          </h1>
          
          <div class="v3-subtitle">
            <span class="v3-sub-word">R</span>
            <span class="v3-sub-word">O</span>
            <span class="v3-sub-word">Y</span>
            <span class="v3-sub-word">A</span>
            <span class="v3-sub-word">L</span>
            <span class="v3-sub-word">T</span>
            <span class="v3-sub-word">Y</span>
            <span class="v3-sub-space" />
            <span class="v3-sub-word">F</span>
            <span class="v3-sub-word">R</span>
            <span class="v3-sub-word">E</span>
            <span class="v3-sub-word">E</span>
          </div>
          
          <p class="v3-manifesto">
            Sound is art. Music is expression.<br />
            We curate the finest samples from today's<br />
            most influential tracks for tomorrow's creators.
          </p>
          
          <div class="v3-cta-area">
            <a href="/register" class="v3-cta">
              <span class="v3-cta-text">Enter the Vault</span>
              <span class="v3-cta-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
          </div>
          
          {/* Artistic corner elements */}
          <div class="v3-corner v3-corner-tl">
            <span>01</span>
          </div>
          <div class="v3-corner v3-corner-tr">
            <span>SAMPLE</span>
          </div>
          <div class="v3-corner v3-corner-bl">
            <span>VAULT</span>
          </div>
          <div class="v3-corner v3-corner-br">
            <span>2024</span>
          </div>
        </div>
        
        {/* Scrolling marquee */}
        <div class="v3-marquee">
          <div class="v3-marquee-track">
            <span>HIP HOP — TRAP — R&B — POP — EDM — LO-FI — HOUSE — AMBIENT — </span>
            <span>HIP HOP — TRAP — R&B — POP — EDM — LO-FI — HOUSE — AMBIENT — </span>
          </div>
        </div>
      </section>
      
      <div class="v3-nav-links">
        <p>View other variants:</p>
        <a href="/v1">V1 - Conservative</a>
        <a href="/v2">V2 - Live & Catchy</a>
        <a href="/v3">V3 - Visual Art (current)</a>
        <a href="/">Original Homepage</a>
      </div>
    </main>
  );
}





