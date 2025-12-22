import { Title } from "@solidjs/meta";
import { For, createSignal, onMount, Show } from "solid-js";
import { isServer } from "solid-js/web";
import SampleRowV12 from "~/components/SampleRowV12";
import { samples, sampleCategories } from "~/data/samples";
import { features, testimonials } from "~/data/packs";
import { useDemoPlayer, queuePreload, setGlobalVolume } from "~/lib/demoPlayer";

// V12 - Enhanced Split Layout with Artlist-inspired UI
// Features: Duration, NEW badges, Favorites, Volume, Sort, Tags, Actions
export default function V12() {
  const [selectedCategory, setSelectedCategory] = createSignal("All");
  const [sortBy, setSortBy] = createSignal("newest");
  const [volume, setVolume] = createSignal(80);
  const [showSortDropdown, setShowSortDropdown] = createSignal(false);
  const demo = useDemoPlayer();
  
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Popular" },
    { value: "bpm-asc", label: "BPM: Low to High" },
    { value: "bpm-desc", label: "BPM: High to Low" },
    { value: "duration", label: "Duration" },
    { value: "name", label: "Name A-Z" },
  ];
  
  const filteredAndSortedSamples = () => {
    let result = selectedCategory() === "All" 
      ? [...samples] 
      : samples.filter(s => s.category === selectedCategory());
    
    // Sort
    switch (sortBy()) {
      case "newest":
        result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "popular":
        result = result.sort((a, b) => a.id - b.id);
        break;
      case "bpm-asc":
        result = result.sort((a, b) => a.bpm - b.bpm);
        break;
      case "bpm-desc":
        result = result.sort((a, b) => b.bpm - a.bpm);
        break;
      case "duration":
        result = result.sort((a, b) => b.duration - a.duration);
        break;
      case "name":
        result = result.sort((a, b) => a.packName.localeCompare(b.packName));
        break;
    }
    
    return result;
  };

  const handleSamplePlay = (sampleId: number) => {
    const s = samples.find((x) => x.id === sampleId);
    if (!s?.previewUrl) return;
    demo.toggle(sampleId, s.previewUrl);
  };
  
  const handleVolumeChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const newVolume = parseInt(target.value);
    setVolume(newVolume);
    setGlobalVolume(newVolume / 100);
  };
  
  // Preload audio files after page renders
  onMount(() => {
    if (isServer) return;
    
    setTimeout(() => {
      const visibleSamples = samples.slice(0, 8);
      queuePreload(visibleSamples);
      
      setTimeout(() => {
        const remainingSamples = samples.slice(8);
        queuePreload(remainingSamples);
      }, 2000);
    }, 500);
  });

  return (
    <main class="landing-v12">
      <Title>TRNDFY V12 - Enhanced Sample Browser</Title>
      
      <section class="v12-hero">
        {/* Industrial grid background */}
        <div class="v12-grid-bg">
          <For each={Array(20).fill(0)}>
            {(_, i) => (
              <div class="v12-grid-line-h" style={{ top: `${i() * 5}%` }} />
            )}
          </For>
          <For each={Array(20).fill(0)}>
            {(_, i) => (
              <div class="v12-grid-line-v" style={{ left: `${i() * 5}%` }} />
            )}
          </For>
        </div>
        
        {/* Strobe flash */}
        <div class="v12-strobe" />
        
        {/* Split Container: 60% Left / 40% Right */}
        <div class="v12-split-container">
          
          {/* LEFT SIDE - Hero Content (60%) */}
          <div class="v12-left">
            {/* Kick drum pulse circles */}
            <div class="v12-kick-container">
              <div class="v12-kick v12-kick-1" />
              <div class="v12-kick v12-kick-2" />
              <div class="v12-kick v12-kick-3" />
              <div class="v12-kick-center" />
            </div>
            
            {/* Geometric shapes */}
            <div class="v12-geo v12-geo-1">
              <div class="v12-geo-inner" />
            </div>
            <div class="v12-geo v12-geo-2">
              <div class="v12-geo-inner" />
            </div>
            
            {/* BPM counter */}
            <div class="v12-bpm">
              <span class="v12-bpm-value">128</span>
              <span class="v12-bpm-label">BPM</span>
            </div>
            
            {/* Hero Content */}
            <div class="v12-content">
              <div class="v12-label">
                <span class="v12-label-line" />
                <span class="v12-label-text">UNDERGROUND SOUND</span>
                <span class="v12-label-line" />
              </div>
              
              <h1 class="v12-title">
                <span class="v12-title-top">SAMPLE PACKS</span>
                <span class="v12-title-mid">OF TRENDING</span>
                <span class="v12-title-main">SPOTIFY SONGS</span>
              </h1>
              
              <div class="v12-divider">
                <For each={Array(5).fill(0)}>
                  {() => <span class="v12-divider-block" />}
                </For>
              </div>
              
              <p class="v12-tagline">ROYALTY FREE</p>
              
              <p class="v12-description">
                Dark. Minimal. Relentless.<br />
                Industrial-grade samples for the underground.
              </p>
              
              <div class="v12-cta-area">
                <a href="#samples" class="v12-cta">
                  <span class="v12-cta-text">ENTER THE VAULT</span>
                </a>
                <a href="/about" class="v12-cta-secondary">
                  <span>HOW IT WORKS</span>
                </a>
              </div>
              
              <div class="v12-footer-info">
                <span>BERLIN</span>
                <span>•</span>
                <span>DETROIT</span>
                <span>•</span>
                <span>AMSTERDAM</span>
              </div>
            </div>
          </div>
          
          {/* RIGHT SIDE - Enhanced Sample Browser (40%) */}
          <div class="v12-right" id="samples">
            <div class="v12-browser">
              {/* Browser Header */}
              <div class="v12-browser-header">
                <div class="v12-browser-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff3232" stroke-width="2">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                  <span>Sample Library</span>
                </div>
                <div class="v12-browser-stats">
                  <span class="v12-stat">
                    <span class="v12-stat-value">5,000+</span>
                    <span class="v12-stat-label">SAMPLES</span>
                  </span>
                </div>
              </div>
              
              {/* Filter Row: Categories + Volume + Sort */}
              <div class="v12-filter-row">
                {/* Category Pills */}
                <div class="v12-category-pills">
                  <For each={sampleCategories.slice(0, 5)}>
                    {(category) => (
                      <button
                        class={`v12-pill ${selectedCategory() === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    )}
                  </For>
                  <button class="v12-pill v12-pill-more">
                    +{sampleCategories.length - 5}
                  </button>
                </div>
                
                {/* Controls Row */}
                <div class="v12-controls">
                  {/* Volume Slider */}
                  <div class="v12-volume">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <Show when={volume() > 0}>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      </Show>
                      <Show when={volume() > 50}>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                      </Show>
                    </svg>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume()}
                      onInput={handleVolumeChange}
                      class="v12-volume-slider"
                    />
                  </div>
                  
                  {/* Sort Dropdown */}
                  <div class="v12-sort-wrapper">
                    <button 
                      class="v12-sort-btn"
                      onClick={() => setShowSortDropdown(!showSortDropdown())}
                    >
                      <span>Sort: {sortOptions.find(o => o.value === sortBy())?.label}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    
                    <Show when={showSortDropdown()}>
                      <div class="v12-sort-dropdown">
                        <For each={sortOptions}>
                          {(option) => (
                            <button 
                              class={`v12-sort-option ${sortBy() === option.value ? 'active' : ''}`}
                              onClick={() => {
                                setSortBy(option.value);
                                setShowSortDropdown(false);
                              }}
                            >
                              {option.label}
                            </button>
                          )}
                        </For>
                      </div>
                    </Show>
                  </div>
                </div>
              </div>
              
              {/* Column Headers */}
              <div class="v12-list-header">
                <span class="v12-col-play"></span>
                <span class="v12-col-artwork"></span>
                <span class="v12-col-info">Title</span>
                <span class="v12-col-tags">Tags</span>
                <span class="v12-col-duration">Duration</span>
                <span class="v12-col-waveform">Preview</span>
                <span class="v12-col-actions"></span>
              </div>
              
              {/* Sample List */}
              <div class="v12-sample-list">
                <For each={filteredAndSortedSamples().slice(0, 8)}>
                  {(sample) => (
                    <SampleRowV12
                      sample={sample}
                      isPlaying={demo.playingSampleId() === sample.id}
                      isLoading={demo.loadingId() === sample.id}
                      isNew={sample.isNew}
                      onPlay={() => handleSamplePlay(sample.id)}
                    />
                  )}
                </For>
              </div>
              
              {/* Browser Footer */}
              <div class="v12-browser-footer">
                <span class="v12-browser-note">
                  {filteredAndSortedSamples().length} samples in "{selectedCategory()}"
                </span>
                <a href="#" class="v12-view-all">
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
        <div class="v12-waveform-bottom">
          <For each={Array(100).fill(0)}>
            {(_, i) => (
              <div 
                class="v12-wave-bar"
                style={{ 
                  "--delay": `${i() * 0.02}s`,
                  "--h": `${10 + Math.abs(Math.sin(i() * 0.2)) * 40}px`
                }}
              />
            )}
          </For>
        </div>
      </section>
      
      {/* Features Section */}
      <section class="features-section v12-features-section">
        <div class="section-header">
          <h2>Why Producers Choose TRNDFY</h2>
          <p>Professional-grade samples from trending hits. Ready to use in your DAW.</p>
        </div>
        
        <div class="features-grid">
          <For each={features}>
            {(feature) => (
              <div class="feature-card v12-card">
                <div class="feature-icon">{feature.icon}</div>
                <h3 class="feature-title">{feature.title}</h3>
                <p class="feature-description">{feature.description}</p>
              </div>
            )}
          </For>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section class="testimonials-section v12-testimonials-section">
        <div class="section-header">
          <h2>Used by Chart-Topping Producers</h2>
          <p>The same samples powering hits on Billboard and Spotify</p>
        </div>
        
        <div class="testimonials-grid">
          <For each={testimonials}>
            {(testimonial) => (
              <div class="testimonial-card v12-card">
                <div class="testimonial-quote">"{testimonial.quote}"</div>
                <div class="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            )}
          </For>
        </div>
      </section>

      {/* CTA Section */}
      <section class="cta-section v12-cta-section">
        <div class="cta-content">
          <h2>Turn Spotify Hits Into Your Next Track</h2>
          <p>Join 100,000+ producers creating chart-ready music with our royalty-free sample packs.</p>
          <div class="v12-cta-area" style={{ "justify-content": "center" }}>
            <a href="/register" class="v12-cta">
              <span class="v12-cta-text">GET STARTED FREE</span>
            </a>
            <a href="#samples" class="v12-cta-secondary">
              <span>BROWSE PACKS</span>
            </a>
          </div>
          <p class="cta-note">✓ No credit card required • ✓ 3 free sample packs included</p>
        </div>
      </section>
    </main>
  );
}




