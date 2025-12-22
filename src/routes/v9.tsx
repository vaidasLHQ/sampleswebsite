import { Title } from "@solidjs/meta";
import { For } from "solid-js";

// VARIANT 9: VISUAL ART - RAVE MUSIC
// Neon, psychedelic, lasers, strobes, 90s rave culture
export default function LandingRaveArt() {
  return (
    <main class="landing-v9">
      <Title>TRNDFY - Rave Culture</Title>
      
      <section class="v9-hero">
        {/* Rave art background */}
        <div class="v9-art-bg">
          {/* Laser beams */}
          <div class="v9-lasers">
            <div class="v9-laser v9-laser-1" />
            <div class="v9-laser v9-laser-2" />
            <div class="v9-laser v9-laser-3" />
            <div class="v9-laser v9-laser-4" />
            <div class="v9-laser v9-laser-5" />
            <div class="v9-laser v9-laser-6" />
          </div>
          
          {/* Neon smiley faces */}
          <div class="v9-smileys">
            <div class="v9-smiley v9-smiley-1">☺</div>
            <div class="v9-smiley v9-smiley-2">☺</div>
            <div class="v9-smiley v9-smiley-3">☺</div>
          </div>
          
          {/* Psychedelic spiral */}
          <div class="v9-spiral">
            <For each={Array(8).fill(0)}>
              {(_, i) => (
                <div class="v9-spiral-ring" style={{ "--i": i() }} />
              )}
            </For>
          </div>
          
          {/* Strobe flash effect */}
          <div class="v9-strobe-flash" />
          
          {/* Floating pills/shapes */}
          <div class="v9-shapes">
            <div class="v9-pill v9-pill-1" />
            <div class="v9-pill v9-pill-2" />
            <div class="v9-star v9-star-1">★</div>
            <div class="v9-star v9-star-2">★</div>
            <div class="v9-star v9-star-3">★</div>
          </div>
          
          {/* Rainbow gradient overlay */}
          <div class="v9-rainbow-overlay" />
        </div>
        
        <div class="v9-content">
          <div class="v9-label">
            <span class="v9-label-emoji">🌈</span>
            <span class="v9-label-text">PEACE • LOVE • UNITY • RESPECT</span>
            <span class="v9-label-emoji">✨</span>
          </div>
          
          <h1 class="v9-title">
            <span class="v9-title-neon v9-neon-1">SAMPLE</span>
            <span class="v9-title-neon v9-neon-2">PACKS</span>
            <span class="v9-title-sub">of Trending</span>
            <span class="v9-title-glow">SPOTIFY SONGS</span>
          </h1>
          
          <div class="v9-rave-tag">
            <span class="v9-tag-letter">R</span>
            <span class="v9-tag-letter">A</span>
            <span class="v9-tag-letter">V</span>
            <span class="v9-tag-letter">E</span>
            <span class="v9-tag-space" />
            <span class="v9-tag-letter">O</span>
            <span class="v9-tag-letter">N</span>
          </div>
          
          <p class="v9-tagline">💯 ROYALTY FREE 💯</p>
          
          <p class="v9-description">
            Acid. Hardcore. Euphoria.<br />
            The sounds that made warehouses shake since '89.
          </p>
          
          <div class="v9-cta-area">
            <a href="/register" class="v9-cta">
              <span class="v9-cta-text">DROP THE BASS</span>
              <span class="v9-cta-emoji">🔊</span>
            </a>
          </div>
          
          <div class="v9-footer-text">
            <span>ACID HOUSE</span>
            <span>•</span>
            <span>HARDCORE</span>
            <span>•</span>
            <span>JUNGLE</span>
            <span>•</span>
            <span>TRANCE</span>
          </div>
        </div>
        
        {/* Bottom frequency bars */}
        <div class="v9-freq-bars">
          <For each={Array(50).fill(0)}>
            {(_, i) => (
              <div 
                class="v9-freq-bar"
                style={{ 
                  "--delay": `${i() * 0.03}s`,
                  "--hue": `${(i() * 7) % 360}`
                }}
              />
            )}
          </For>
        </div>
      </section>
      
      <div class="v9-nav-links">
        <p>View other variants:</p>
        <a href="/v7">V7 - Techno</a>
        <a href="/v8">V8 - Slap Bass</a>
        <a href="/v9">V9 - Rave (current)</a>
        <a href="/v3">V3 - Original Art</a>
        <a href="/">Homepage</a>
      </div>
    </main>
  );
}





