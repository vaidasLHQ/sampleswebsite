import { Title } from "@solidjs/meta";
import { For } from "solid-js";

// VARIANT 6: VISUAL ART - HIGH TECH THEMED
// Circuit patterns, digital glitch, matrix elements, futuristic
export default function LandingHighTechArt() {
  return (
    <main class="landing-v6">
      <Title>TRNDFY - Digital Audio Technology</Title>
      
      <section class="v6-hero">
        {/* High-tech art background */}
        <div class="v6-art-bg">
          {/* Circuit board pattern */}
          <svg class="v6-circuit-svg" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="v6-cyber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#00ffff;stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:#0080ff;stop-opacity:0.3" />
              </linearGradient>
              <filter id="v6-glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Circuit paths */}
            <g class="v6-circuits" filter="url(#v6-glow)">
              <path class="v6-circuit-path" d="M0,200 H200 V100 H400 V200 H600" stroke="url(#v6-cyber)" />
              <path class="v6-circuit-path v6-delay-1" d="M1000,300 H800 V400 H600 V300 H400" stroke="url(#v6-cyber)" />
              <path class="v6-circuit-path v6-delay-2" d="M0,500 H150 V600 H350 V500 H550 V400" stroke="url(#v6-cyber)" />
              <path class="v6-circuit-path v6-delay-3" d="M1000,600 H850 V500 H650 V600 H450" stroke="url(#v6-cyber)" />
              
              {/* Circuit nodes */}
              <circle class="v6-node" cx="200" cy="200" r="6" fill="#00ffff" />
              <circle class="v6-node v6-node-pulse" cx="400" cy="100" r="6" fill="#00ffff" />
              <circle class="v6-node" cx="600" cy="200" r="6" fill="#00ffff" />
              <circle class="v6-node v6-node-pulse" cx="800" cy="300" r="6" fill="#00ffff" />
              <circle class="v6-node" cx="600" cy="400" r="6" fill="#00ffff" />
              <circle class="v6-node v6-node-pulse" cx="150" cy="500" r="6" fill="#00ffff" />
              <circle class="v6-node" cx="550" cy="400" r="6" fill="#00ffff" />
            </g>
            
            {/* Hexagon grid */}
            <g class="v6-hexagons" opacity="0.1">
              <polygon points="100,100 130,85 160,100 160,130 130,145 100,130" stroke="#00ffff" fill="none" />
              <polygon points="900,150 930,135 960,150 960,180 930,195 900,180" stroke="#00ffff" fill="none" />
              <polygon points="150,450 180,435 210,450 210,480 180,495 150,480" stroke="#00ffff" fill="none" />
              <polygon points="850,500 880,485 910,500 910,530 880,545 850,530" stroke="#00ffff" fill="none" />
            </g>
          </svg>
          
          {/* Matrix rain effect */}
          <div class="v6-matrix">
            <For each={Array(30).fill(0)}>
              {(_, i) => (
                <div 
                  class="v6-matrix-col"
                  style={{ 
                    left: `${i() * 3.33}%`,
                    "--delay": `${Math.random() * 5}s`,
                    "--duration": `${3 + Math.random() * 4}s`
                  }}
                >
                  <For each={Array(20).fill(0)}>
                    {() => (
                      <span>{String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}</span>
                    )}
                  </For>
                </div>
              )}
            </For>
          </div>
          
          {/* Scan lines */}
          <div class="v6-scanlines" />
          
          {/* Glitch overlay */}
          <div class="v6-glitch-overlay" />
        </div>
        
        <div class="v6-content">
          <div class="v6-terminal-label">
            <span class="v6-cursor">_</span>
            <span class="v6-typing">INITIALIZING AUDIO SYSTEM...</span>
          </div>
          
          <h1 class="v6-title">
            <span class="v6-title-glitch" data-text="Sample Packs">Sample Packs</span>
            <span class="v6-title-sub">of Trending</span>
            <span class="v6-title-cyber">SPOTIFY SONGS</span>
          </h1>
          
          <div class="v6-status-bar">
            <span class="v6-status-dot" />
            <span class="v6-status-text">ROYALTY FREE // INSTANT ACCESS // UNLIMITED USE</span>
          </div>
          
          <p class="v6-description">
            Next-generation audio samples powered by<br />
            advanced extraction technology. Future-proof<br />
            your productions with cutting-edge sound.
          </p>
          
          <div class="v6-specs">
            <div class="v6-spec">
              <span class="v6-spec-value">48kHz</span>
              <span class="v6-spec-label">Sample Rate</span>
            </div>
            <div class="v6-spec">
              <span class="v6-spec-value">24bit</span>
              <span class="v6-spec-label">Bit Depth</span>
            </div>
            <div class="v6-spec">
              <span class="v6-spec-value">WAV</span>
              <span class="v6-spec-label">Format</span>
            </div>
          </div>
          
          <div class="v6-cta-area">
            <a href="/register" class="v6-cta">
              <span class="v6-cta-bracket">[</span>
              <span class="v6-cta-text">ACCESS VAULT</span>
              <span class="v6-cta-bracket">]</span>
            </a>
          </div>
          
          <div class="v6-footer-text">
            <span>SYS.VERSION: 2.0.24</span>
            <span>|</span>
            <span>STATUS: ONLINE</span>
            <span>|</span>
            <span>SAMPLES: 50,000+</span>
          </div>
        </div>
        
        {/* Data stream at bottom */}
        <div class="v6-data-stream">
          <div class="v6-stream-track">
            <span>01001000 01001001 01010000 00100000 01001000 01001111 01010000 00100000 // TRAP // R&B // POP // EDM // </span>
            <span>01001000 01001001 01010000 00100000 01001000 01001111 01010000 00100000 // TRAP // R&B // POP // EDM // </span>
          </div>
        </div>
      </section>
      
      <div class="v6-nav-links">
        <p>View other variants:</p>
        <a href="/v3">V3 - Original Art</a>
        <a href="/v4">V4 - Music</a>
        <a href="/v5">V5 - Business</a>
        <a href="/v6">V6 - High Tech (current)</a>
        <a href="/">Original Homepage</a>
      </div>
    </main>
  );
}





