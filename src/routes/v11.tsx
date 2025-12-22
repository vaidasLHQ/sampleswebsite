import { Title } from "@solidjs/meta";
import { For, createSignal } from "solid-js";
import SampleRow from "~/components/SampleRow";
import { samples, sampleCategories } from "~/data/samples";
import { useDemoPlayer } from "~/lib/demoPlayer";

// VARIANT 11: SPLIT LAYOUT - V7 Techno Hero Left + Sample Browser Right
// Based on V7 with 60/40 split layout
export default function LandingV11Split() {
  const [selectedCategory, setSelectedCategory] = createSignal("All");
  const demo = useDemoPlayer();
  
  const filteredSamples = () => {
    if (selectedCategory() === "All") {
      return samples;
    }
    return samples.filter(sample => sample.category === selectedCategory());
  };

  const handleSamplePlay = (sampleId: number) => {
    const s = samples.find((x) => x.id === sampleId);
    if (!s?.previewUrl) return;
    demo.toggle(sampleId, s.previewUrl);
  };

  return (
    <main class="landing-v11">
      <Title>TRNDFY - Sample Packs of Trending Spotify Songs | Royalty Free</Title>
      
      <section class="v11-hero">
        {/* Industrial grid background - full width */}
        <div class="v11-grid-bg">
          <For each={Array(20).fill(0)}>
            {(_, i) => (
              <div class="v11-grid-line-h" style={{ top: `${i() * 5}%` }} />
            )}
          </For>
          <For each={Array(20).fill(0)}>
            {(_, i) => (
              <div class="v11-grid-line-v" style={{ left: `${i() * 5}%` }} />
            )}
          </For>
        </div>
        
        {/* Strobe flash */}
        <div class="v11-strobe" />
        
        {/* Split Container: 60% Left / 40% Right */}
        <div class="v11-split-container">
          
          {/* LEFT SIDE - Hero Content (60%) */}
          <div class="v11-left">
            {/* Kick drum pulse circles */}
            <div class="v11-kick-container">
              <div class="v11-kick v11-kick-1" />
              <div class="v11-kick v11-kick-2" />
              <div class="v11-kick v11-kick-3" />
              <div class="v11-kick-center" />
            </div>
            
            {/* Rotating geometric shapes */}
            <div class="v11-geo v11-geo-1">
              <div class="v11-geo-inner" />
            </div>
            <div class="v11-geo v11-geo-2">
              <div class="v11-geo-inner" />
            </div>
            
            {/* BPM counter */}
            <div class="v11-bpm">
              <span class="v11-bpm-value">128</span>
              <span class="v11-bpm-label">BPM</span>
            </div>
            
            {/* Hero Content */}
            <div class="v11-content">
              <div class="v11-label">
                <span class="v11-label-line" />
                <span class="v11-label-text">UNDERGROUND SOUND</span>
                <span class="v11-label-line" />
              </div>
              
              <h1 class="v11-title">
                <span class="v11-title-top">SAMPLE PACKS</span>
                <span class="v11-title-mid">OF TRENDING</span>
                <span class="v11-title-main">SPOTIFY SONGS</span>
              </h1>
              
              <div class="v11-divider">
                <For each={Array(5).fill(0)}>
                  {() => <span class="v11-divider-block" />}
                </For>
              </div>
              
              <p class="v11-tagline">ROYALTY FREE</p>
              
              <p class="v11-description">
                Dark. Minimal. Relentless.<br />
                Industrial-grade samples for the underground.
              </p>
              
              <div class="v11-cta-area">
                <a href="#samples" class="v11-cta">
                  <span class="v11-cta-text">ENTER THE VAULT</span>
                </a>
                <a href="/about" class="v11-cta-secondary">
                  <span>HOW IT WORKS</span>
                </a>
              </div>
              
              <div class="v11-footer-info">
                <span>BERLIN</span>
                <span>•</span>
                <span>DETROIT</span>
                <span>•</span>
                <span>AMSTERDAM</span>
              </div>
            </div>
          </div>
          
          {/* RIGHT SIDE - Sample Browser (40%) */}
          <div class="v11-right" id="samples">
            <div class="v11-browser">
              <div class="v11-browser-header">
                <div class="v11-browser-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff3232" stroke-width="2">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                  <span>Sample Library</span>
                </div>
                <div class="v11-browser-stats">
                  <span class="v11-stat">
                    <span class="v11-stat-value">5,000+</span>
                    <span class="v11-stat-label">SAMPLES</span>
                  </span>
                  <span class="v11-stat">
                    <span class="v11-stat-value">100%</span>
                    <span class="v11-stat-label">ROYALTY FREE</span>
                  </span>
                </div>
              </div>
              
              {/* Category Pills */}
              <div class="v11-category-pills">
                <For each={sampleCategories.slice(0, 7)}>
                  {(category) => (
                    <button
                      class={`v11-pill ${selectedCategory() === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  )}
                </For>
                <button class="v11-pill v11-pill-more">
                  +{sampleCategories.length - 7}
                </button>
              </div>
              
              {/* Sample List */}
              <div class="v11-sample-list">
                <For each={filteredSamples().slice(0, 6)}>
                  {(sample) => (
                    <SampleRow
                      sample={sample}
                      isPlaying={demo.playingSampleId() === sample.id}
                      onPlay={() => handleSamplePlay(sample.id)}
                    />
                  )}
                </For>
              </div>
              
              {/* Browser Footer */}
              <div class="v11-browser-footer">
                <span class="v11-browser-note">
                  {filteredSamples().length} samples in "{selectedCategory()}"
                </span>
                <a href="#" class="v11-view-all">
                  View All
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom waveform */}
        <div class="v11-waveform">
          <For each={Array(100).fill(0)}>
            {(_, i) => (
              <div 
                class="v11-wave-bar"
                style={{ 
                  "--delay": `${i() * 0.02}s`,
                  "--h": `${10 + Math.abs(Math.sin(i() * 0.2)) * 40}px`
                }}
              />
            )}
          </For>
        </div>
      </section>
      
      <div class="v11-nav-links">
        <p>View variants:</p>
        <a href="/v7">V7 - Techno</a>
        <a href="/v11">V11 - Split (current)</a>
        <a href="/">Homepage</a>
      </div>
    </main>
  );
}
