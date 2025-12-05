import { Title } from "@solidjs/meta";
import { For } from "solid-js";

const samplePacks = [
  {
    id: 1,
    title: "Midnight Sessions",
    category: "Lo-Fi Hip Hop",
    description: "Warm vinyl textures, dusty drums, and soulful melodies for late-night production.",
    samples: 156,
    bpm: "70-90",
    price: 49,
    gradient: "sonic"
  },
  {
    id: 2,
    title: "Neon Streets",
    category: "Synthwave",
    description: "Retro-futuristic synths, punchy drums, and atmospheric pads from the 80s.",
    samples: 203,
    bpm: "100-128",
    price: 59,
    gradient: "neon"
  },
  {
    id: 3,
    title: "Desert Gold",
    category: "World Fusion",
    description: "Organic percussion, ethnic instruments, and earthy textures from around the globe.",
    samples: 184,
    bpm: "80-120",
    price: 54,
    gradient: "warm"
  },
  {
    id: 4,
    title: "Deep Space",
    category: "Ambient",
    description: "Ethereal soundscapes, cosmic textures, and otherworldly atmospheres.",
    samples: 128,
    bpm: "60-80",
    price: 44,
    gradient: "bass"
  },
  {
    id: 5,
    title: "Club Genesis",
    category: "House",
    description: "Driving beats, infectious grooves, and peak-time energy for the dancefloor.",
    samples: 245,
    bpm: "120-128",
    price: 69,
    gradient: "neon"
  },
  {
    id: 6,
    title: "Trap Kingdom",
    category: "Trap",
    description: "Hard-hitting 808s, crisp hi-hats, and melodic elements for modern production.",
    samples: 312,
    bpm: "130-160",
    price: 79,
    gradient: "sonic"
  }
];

const features = [
  {
    icon: "⚡",
    title: "Instant Download",
    description: "Get your samples immediately after purchase. No waiting, start creating right away."
  },
  {
    icon: "🎚️",
    title: "100% Royalty Free",
    description: "Use in any project, commercial or personal. No additional fees or credits required."
  },
  {
    icon: "🎛️",
    title: "DAW Compatible",
    description: "Works with Ableton, FL Studio, Logic Pro, and every major DAW. WAV & AIFF formats."
  },
  {
    icon: "🔄",
    title: "Free Updates",
    description: "Get new samples and variations added to packs you own. Lifetime access included."
  }
];

export default function Home() {
  return (
    <main>
      <Title>SampleVault - Premium Music Sample Packs</Title>
      
      {/* Hero Section */}
      <section class="hero">
        <div class="grid-pattern" />
        
        <div class="hero-content">
          <div class="hero-badge animate-fade-in-up">
            <span class="hero-badge-new">New</span>
            <span>Trap Kingdom pack just dropped</span>
          </div>
          
          <h1 class="animate-fade-in-up delay-1">
            Sounds that <em>inspire</em> your next hit.
          </h1>
          
          <p class="hero-description animate-fade-in-up delay-2">
            Premium sample packs crafted by Grammy-winning producers. 
            Royalty-free, high-quality sounds for your next masterpiece.
          </p>
          
          <div class="hero-actions animate-fade-in-up delay-3">
            <a href="#packs" class="btn btn-primary btn-large">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5.14v14l11-7-11-7z" fill="currentColor"/>
              </svg>
              Browse Packs
            </a>
            <a href="/about" class="btn btn-secondary btn-large">
              Learn More
            </a>
          </div>
        </div>
        
        {/* Decorative wave lines */}
        <div class="hero-visual">
          <div class="wave-container">
            <For each={Array(30).fill(0)}>
              {(_, i) => (
                <div 
                  class="wave-line" 
                  style={{
                    transform: `rotate(${i() * 6}deg) translateY(${Math.sin(i() * 0.5) * 50}px)`,
                    opacity: 0.1 + (i() * 0.02)
                  }}
                />
              )}
            </For>
          </div>
        </div>
      </section>
      
      {/* Sample Packs Section */}
      <section id="packs" class="packs-section">
        <div class="section-header">
          <h2>Featured Packs</h2>
          <p>Hand-picked collections from our best-selling catalog</p>
        </div>
        
        <div class="packs-grid">
          <For each={samplePacks}>
            {(pack) => (
              <article class="pack-card">
                <div class={`pack-artwork ${pack.gradient}`}>
                  <div class="play-button" />
                  <div class="pack-waveform">
                    <div class="wave-bar" />
                    <div class="wave-bar" />
                    <div class="wave-bar" />
                    <div class="wave-bar" />
                    <div class="wave-bar" />
                    <div class="wave-bar" />
                    <div class="wave-bar" />
                    <div class="wave-bar" />
                    <div class="wave-bar" />
                    <div class="wave-bar" />
                  </div>
                </div>
                <div class="pack-info">
                  <span class="pack-category">{pack.category}</span>
                  <h3 class="pack-title">{pack.title}</h3>
                  <p class="pack-description">{pack.description}</p>
                  <div class="pack-meta">
                    <div class="pack-stats">
                      <span>{pack.samples} samples</span>
                      <span>{pack.bpm} BPM</span>
                    </div>
                    <span class="pack-price">${pack.price}</span>
                  </div>
                </div>
              </article>
            )}
          </For>
        </div>
      </section>
      
      {/* Features Section */}
      <section class="features-section">
        <div class="section-header">
          <h2>Why SampleVault?</h2>
          <p>Everything you need to create professional-sounding music</p>
        </div>
        
        <div class="features-grid">
          <For each={features}>
            {(feature) => (
              <div class="feature-card">
                <div class="feature-icon">{feature.icon}</div>
                <h3 class="feature-title">{feature.title}</h3>
                <p class="feature-description">{feature.description}</p>
              </div>
            )}
          </For>
        </div>
      </section>
      
      {/* CTA Section */}
      <section class="cta-section">
        <div class="cta-content">
          <h2>Start creating today.</h2>
          <p>Join thousands of producers who trust SampleVault for their sound design needs.</p>
          <div class="hero-actions">
            <a href="#packs" class="btn btn-primary btn-large">
              Explore All Packs
            </a>
            <a href="/about" class="btn btn-secondary btn-large">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
