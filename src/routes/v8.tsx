import { Title } from "@solidjs/meta";
import { For } from "solid-js";

// VARIANT 8: VISUAL ART - SLAP BASS MUSIC
// Funky, groovy, bass-heavy, retro funk aesthetic
export default function LandingSlapBassArt() {
  return (
    <main class="landing-v8">
      <Title>TRNDFY - Slap Bass Grooves</Title>
      
      <section class="v8-hero">
        {/* Slap bass art background */}
        <div class="v8-art-bg">
          {/* Funky waves */}
          <svg class="v8-waves" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="v8-funk1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#ff6b35;stop-opacity:0.6" />
                <stop offset="50%" style="stop-color:#f7c531;stop-opacity:0.6" />
                <stop offset="100%" style="stop-color:#ff6b35;stop-opacity:0.6" />
              </linearGradient>
              <linearGradient id="v8-funk2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#7b2cbf;stop-opacity:0.5" />
                <stop offset="50%" style="stop-color:#c77dff;stop-opacity:0.5" />
                <stop offset="100%" style="stop-color:#7b2cbf;stop-opacity:0.5" />
              </linearGradient>
            </defs>
            <path class="v8-wave-path v8-wave-1" d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z" fill="url(#v8-funk1)" />
            <path class="v8-wave-path v8-wave-2" d="M0,500 Q300,300 600,500 T1200,500 L1200,800 L0,800 Z" fill="url(#v8-funk2)" />
          </svg>
          
          {/* Bass strings */}
          <div class="v8-strings">
            <For each={Array(4).fill(0)}>
              {(_, i) => (
                <div class="v8-string" style={{ "--i": i() }}>
                  <div class="v8-string-vibrate" />
                </div>
              )}
            </For>
          </div>
          
          {/* Floating groovy circles */}
          <div class="v8-circles">
            <div class="v8-circle v8-circle-1" />
            <div class="v8-circle v8-circle-2" />
            <div class="v8-circle v8-circle-3" />
            <div class="v8-circle v8-circle-4" />
          </div>
          
          {/* Retro sunburst */}
          <div class="v8-sunburst">
            <For each={Array(12).fill(0)}>
              {(_, i) => (
                <div class="v8-ray" style={{ transform: `rotate(${i() * 30}deg)` }} />
              )}
            </For>
          </div>
        </div>
        
        <div class="v8-content">
          <div class="v8-badge">
            <span>🎸</span>
            <span>FUNK • SOUL • GROOVE</span>
          </div>
          
          <h1 class="v8-title">
            <span class="v8-title-line v8-title-1">Sample</span>
            <span class="v8-title-line v8-title-2">Packs</span>
            <span class="v8-title-sub">of Trending</span>
            <span class="v8-title-accent">Spotify Songs</span>
          </h1>
          
          <div class="v8-slap-text">
            <span class="v8-slap-letter">S</span>
            <span class="v8-slap-letter">L</span>
            <span class="v8-slap-letter">A</span>
            <span class="v8-slap-letter">P</span>
            <span class="v8-slap-space" />
            <span class="v8-slap-letter">I</span>
            <span class="v8-slap-letter">T</span>
            <span class="v8-slap-letter">!</span>
          </div>
          
          <p class="v8-tagline">100% ROYALTY FREE</p>
          
          <p class="v8-description">
            Groovy basslines. Funky rhythms.<br />
            Get that pocket-tight slap in your productions.
          </p>
          
          <div class="v8-cta-area">
            <a href="/register" class="v8-cta">
              <span class="v8-cta-icon">♪</span>
              <span class="v8-cta-text">Get Funky</span>
            </a>
          </div>
        </div>
        
        {/* Bass frequency visualizer */}
        <div class="v8-bass-viz">
          <For each={Array(30).fill(0)}>
            {(_, i) => (
              <div 
                class="v8-bass-bar"
                style={{ "--delay": `${i() * 0.05}s` }}
              />
            )}
          </For>
        </div>
      </section>
      
      <div class="v8-nav-links">
        <p>View other variants:</p>
        <a href="/v7">V7 - Techno</a>
        <a href="/v8">V8 - Slap Bass (current)</a>
        <a href="/v9">V9 - Rave</a>
        <a href="/v3">V3 - Original Art</a>
        <a href="/">Homepage</a>
      </div>
    </main>
  );
}





