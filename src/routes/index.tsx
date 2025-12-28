import { For, createSignal, onMount, Show } from "solid-js";
import { isServer } from "solid-js/web";
import SampleRowV12 from "~/components/SampleRowV12";
import SEO, { OrganizationSchema, WebSiteSchema, FAQSchema } from "~/components/SEO";
import { samples, sampleCategories } from "~/data/samples";
import { features, testimonials } from "~/data/packs";
import { useDemoPlayer, queuePreload, setGlobalVolume } from "~/lib/demoPlayer";
import { supabase } from "~/lib/supabase";

// MAIN HOMEPAGE - V15 Final Release
// 50/50 Split Layout with Full Titles
// Updated: December 28, 2024
export default function Home() {
  const [selectedCategory, setSelectedCategory] = createSignal("All");
  const [sortBy, setSortBy] = createSignal("newest");
  const [volume, setVolume] = createSignal(80);
  const [showSortDropdown, setShowSortDropdown] = createSignal(false);
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);
  const [ownedSampleIds, setOwnedSampleIds] = createSignal<Set<number>>(new Set());
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
  
  // Check auth status and preload audio files after page renders
  onMount(async () => {
    if (isServer) return;
    
    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session?.user);
    
    // Fetch owned samples if logged in
    if (session?.user) {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          order_items (
            sample_id
          )
        `)
        .or(`user_id.eq.${session.user.id},email.eq.${session.user.email}`)
        .eq('status', 'paid');
      
      if (!error && data) {
        const ownedIds = new Set<number>();
        data.forEach((order: any) => {
          order.order_items?.forEach((item: any) => {
            ownedIds.add(item.sample_id);
          });
        });
        setOwnedSampleIds(ownedIds);
      }
    }
    
    // Preload audio files
    setTimeout(() => {
      const visibleSamples = samples.slice(0, 8);
      queuePreload(visibleSamples);
      
      setTimeout(() => {
        const remainingSamples = samples.slice(8);
        queuePreload(remainingSamples);
      }, 2000);
    }, 500);
  });

  // Homepage FAQ items for Schema
  const homepageFAQ = [
    {
      question: "What are royalty-free sample packs?",
      answer: "Royalty-free sample packs are audio files you can use in your music productions without paying ongoing royalties. Once purchased from TRNDFY, you can use them in commercial releases, streaming, and sync licensing without additional fees."
    },
    {
      question: "Are TRNDFY samples cleared for commercial use?",
      answer: "Yes! All TRNDFY sample packs are 100% royalty-free and cleared for commercial use. You can use them in songs you release on Spotify, Apple Music, YouTube, and any other platform."
    },
    {
      question: "What DAWs are compatible with your samples?",
      answer: "Our samples are provided in WAV format, which is compatible with all major DAWs including FL Studio, Ableton Live, Logic Pro, Pro Tools, Cubase, Studio One, and more."
    },
    {
      question: "How do I download my purchased samples?",
      answer: "After purchase, you'll receive instant access to download your samples. Simply log into your TRNDFY account and visit your Vault to download your files."
    }
  ];

  return (
    <main class="landing-v12 v15-layout">
      {/* SEO Meta Tags */}
      <SEO 
        title="TRNDFY - Sample Packs of Trending Spotify Songs | Royalty Free"
        description="Download professional royalty-free sample packs inspired by trending Spotify hits. Hip hop, trap, house, EDM & more. Instant download, 100% cleared for commercial use."
        path="/"
      />
      
      {/* Schema.org Structured Data */}
      <OrganizationSchema />
      <WebSiteSchema />
      <FAQSchema items={homepageFAQ} />
      
      {/* V15 specific styles */}
      <style>{`
        /* V15: 50/50 Split Layout */
        .v15-layout .v12-split-container {
          grid-template-columns: 50% 50%;
        }
        
        /* V15: Ensure left side content is compact */
        .v15-layout .v12-left {
          padding: 2rem;
        }
        
        /* V15: Adjust hero content for narrower space */
        .v15-layout .v12-title-top {
          font-size: clamp(1rem, 2vw, 1.5rem);
          letter-spacing: 6px;
        }
        
        .v15-layout .v12-title-mid {
          font-size: clamp(1.2rem, 2.5vw, 2rem);
          letter-spacing: 3px;
        }
        
        .v15-layout .v12-title-main {
          font-size: clamp(2rem, 4vw, 3.5rem);
        }
        
        /* V15: Wider sample row with full titles */
        .v15-layout .sample-row-v12 {
          grid-template-columns: 32px 32px minmax(140px, 1fr) 80px 50px 70px 95px;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
        }
        
        /* V15: Full title display */
        .v15-layout .v12-info {
          min-width: 140px;
        }
        
        .v15-layout .v12-filename {
          white-space: normal;
          overflow: visible;
          text-overflow: clip;
          line-height: 1.3;
          font-size: 0.75rem;
        }
        
        .v15-layout .v12-pack-name {
          font-size: 0.65rem;
        }
        
        /* V15: Compact tags */
        .v15-layout .v12-tags {
          gap: 0.25rem;
        }
        
        .v15-layout .v12-tag {
          font-size: 0.6rem;
          padding: 0.15rem 0.4rem;
        }
        
        /* V15: Compact waveform */
        .v15-layout .v12-waveform {
          width: 70px;
        }
        
        /* V15: Compact actions */
        .v15-layout .v12-actions {
          gap: 0.4rem;
        }
        
        .v15-layout .v12-price {
          font-size: 0.75rem;
        }
        
        .v15-layout .v12-add-btn {
          padding: 0.35rem 0.6rem;
          font-size: 0.65rem;
          gap: 0.25rem;
        }
        
        .v15-layout .v12-add-btn svg {
          width: 12px;
          height: 12px;
        }
        
        /* V15: Compact browser header */
        .v15-layout .v12-browser-header {
          padding: 0.75rem 1rem;
        }
        
        .v15-layout .v12-browser-title {
          font-size: 0.85rem;
        }
        
        .v15-layout .v12-browser-title svg {
          width: 16px;
          height: 16px;
        }
        
        /* V15: Compact category pills */
        .v15-layout .v12-pill {
          font-size: 0.65rem;
          padding: 0.35rem 0.7rem;
        }
        
        /* V15: Compact list header */
        .v15-layout .v12-list-header {
          grid-template-columns: 32px 32px minmax(140px, 1fr) 80px 50px 70px 95px;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.6rem;
        }
        
        /* V15: Hide some elements to save space */
        .v15-layout .v12-kick-container {
          display: none;
        }
        
        .v15-layout .v12-geo {
          display: none;
        }
        
        .v15-layout .v12-bpm {
          top: 10px;
          right: 10px;
          font-size: 3rem;
        }
        
        .v15-layout .v12-bpm-label {
          font-size: 0.6rem;
        }
        
        /* V15: Smaller CTA buttons */
        .v15-layout .v12-cta,
        .v15-layout .v12-cta-secondary {
          padding: 0.75rem 1.5rem;
          font-size: 0.75rem;
        }
        
        /* V15: Footer info smaller */
        .v15-layout .v12-footer-info {
          font-size: 0.65rem;
        }
        
        /* V15: Red pulsing live dot - PROMINENT */
        .v15-live-dot {
          display: block !important;
          width: 12px !important;
          height: 12px !important;
          min-width: 12px !important;
          min-height: 12px !important;
          background: #ff3232 !important;
          border-radius: 50% !important;
          animation: v15-pulse-dot 1s ease-in-out infinite !important;
          box-shadow: 0 0 12px #ff3232, 0 0 24px rgba(255, 50, 50, 0.6) !important;
          flex-shrink: 0 !important;
          position: absolute !important;
          top: 1.25rem !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
        
        @keyframes v15-pulse-dot {
          0%, 100% { 
            opacity: 1;
            box-shadow: 0 0 12px #ff3232, 0 0 24px rgba(255, 50, 50, 0.6);
          }
          50% { 
            opacity: 0.4;
            box-shadow: 0 0 6px #ff3232, 0 0 12px rgba(255, 50, 50, 0.3);
          }
        }
        
        /* Ensure browser header has position relative for the dot */
        .v15-layout .v12-browser-header {
          position: relative !important;
        }
        
        /* Ensure browser stats uses flexbox with alignment */
        .v15-layout .v12-browser-stats {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        /* V15: Responsive - stack on smaller screens */
        @media (max-width: 1200px) {
          .v15-layout .v12-split-container {
            grid-template-columns: 45% 55%;
          }
          
          .v15-layout .sample-row-v12 {
            grid-template-columns: 32px 32px minmax(120px, 1fr) 50px 80px;
          }
          
          .v15-layout .v12-tags,
          .v15-layout .v12-waveform {
            display: none;
          }
          
          .v15-layout .v12-list-header {
            grid-template-columns: 32px 32px minmax(120px, 1fr) 50px 80px;
          }
          
          .v15-layout .v12-col-tags,
          .v15-layout .v12-col-waveform {
            display: none;
          }
        }
        
        @media (max-width: 1024px) {
          .v15-layout .v12-split-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
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
        
        {/* Split Container: 50% Left / 50% Right */}
        <div class="v12-split-container">
          
          {/* LEFT SIDE - Hero Content (50%) */}
          <div class="v12-left">
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
                <a href={isLoggedIn() ? "/vault" : "/login"} class="v12-cta">
                  <span class="v12-cta-text">{isLoggedIn() ? "MY VAULT" : "ENTER THE VAULT"}</span>
                </a>
                <a href="/browse" class="v12-cta-secondary">
                  <span>BROWSE SAMPLES</span>
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
          
          {/* RIGHT SIDE - Enhanced Sample Browser (50%) */}
          <div class="v12-right" id="samples">
            <div class="v12-browser">
              {/* Browser Header */}
              <div class="v12-browser-header">
                {/* Red pulsing live dot */}
                <div class="v15-live-dot" />
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
                      isOwned={ownedSampleIds().has(sample.id)}
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
                <a href="/browse" class="v12-view-all">
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
            <a href="/browse" class="v12-cta-secondary">
              <span>BROWSE PACKS</span>
            </a>
          </div>
          <p class="cta-note">✓ No credit card required • ✓ 3 free sample packs included</p>
        </div>
      </section>
    </main>
  );
}
