import { For, createSignal, onMount, Show, createEffect } from "solid-js";
import { isServer } from "solid-js/web";
import SampleRowV12 from "~/components/SampleRowV12";
import SEO from "~/components/SEO";
import { samples, sampleCategories } from "~/data/samples";
import { useDemoPlayer, queuePreload, setGlobalVolume } from "~/lib/demoPlayer";
import { supabase } from "~/lib/supabase";

// BROWSE SAMPLES PAGE - Full-page sample browser with search and filters
export default function Browse() {
  const [selectedCategory, setSelectedCategory] = createSignal("All");
  const [sortBy, setSortBy] = createSignal("newest");
  const [volume, setVolume] = createSignal(80);
  const [showSortDropdown, setShowSortDropdown] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [selectedKey, setSelectedKey] = createSignal("All");
  const [bpmRange, setBpmRange] = createSignal<[number, number]>([0, 200]);
  const [showKeyDropdown, setShowKeyDropdown] = createSignal(false);
  const [showBpmDropdown, setShowBpmDropdown] = createSignal(false);
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
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  // Extract unique keys from samples
  const availableKeys = () => {
    const keys = new Set<string>();
    keys.add("All");
    samples.forEach(s => {
      if (s.key && s.key !== "—") {
        keys.add(s.key);
      }
    });
    return Array.from(keys);
  };

  const bpmPresets = [
    { label: "All BPM", range: [0, 200] as [number, number] },
    { label: "Slow (60-90)", range: [60, 90] as [number, number] },
    { label: "Medium (90-120)", range: [90, 120] as [number, number] },
    { label: "Fast (120-150)", range: [120, 150] as [number, number] },
    { label: "Very Fast (150+)", range: [150, 200] as [number, number] },
  ];
  
  const filteredAndSortedSamples = () => {
    let result = [...samples];
    
    // Filter by category
    if (selectedCategory() !== "All") {
      result = result.filter(s => s.category === selectedCategory());
    }
    
    // Filter by search query
    if (searchQuery().trim()) {
      const query = searchQuery().toLowerCase();
      result = result.filter(s => 
        s.packName.toLowerCase().includes(query) ||
        s.filename.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query) ||
        s.key.toLowerCase().includes(query)
      );
    }
    
    // Filter by key
    if (selectedKey() !== "All") {
      result = result.filter(s => s.key === selectedKey());
    }
    
    // Filter by BPM range
    const [minBpm, maxBpm] = bpmRange();
    if (minBpm > 0 || maxBpm < 200) {
      result = result.filter(s => {
        if (s.bpm === 0) return minBpm === 0; // Include samples without BPM only if min is 0
        return s.bpm >= minBpm && s.bpm <= maxBpm;
      });
    }
    
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
      case "price-asc":
        result = result.sort((a, b) => a.priceUsdCents - b.priceUsdCents);
        break;
      case "price-desc":
        result = result.sort((a, b) => b.priceUsdCents - a.priceUsdCents);
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

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSelectedKey("All");
    setBpmRange([0, 200]);
    setSortBy("newest");
  };

  const hasActiveFilters = () => {
    return selectedCategory() !== "All" || 
           searchQuery().trim() !== "" || 
           selectedKey() !== "All" || 
           bpmRange()[0] !== 0 || 
           bpmRange()[1] !== 200;
  };
  
  // Check auth status and preload audio files
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
      queuePreload(samples.slice(0, 10));
      setTimeout(() => {
        queuePreload(samples.slice(10));
      }, 2000);
    }, 500);

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.browse-dropdown-wrapper')) {
        setShowSortDropdown(false);
        setShowKeyDropdown(false);
        setShowBpmDropdown(false);
      }
    });
  });

  return (
    <main class="browse-page">
      <SEO 
        title="Browse Samples | TRNDFY"
        description="Browse our complete library of royalty-free sample packs. Search by genre, BPM, key, and more. Hip hop, trap, house, EDM & more."
        path="/browse"
        keywords={["browse samples", "sample library", "royalty free samples", "music samples"]}
      />
      
      {/* Hero Section */}
      <section class="browse-hero">
        <div class="browse-hero-content">
          <h1 class="browse-title">Sample Library</h1>
          <p class="browse-subtitle">
            {samples.length} royalty-free samples ready for your next hit
          </p>
        </div>
      </section>
      
      {/* Search & Filters Bar */}
      <section class="browse-filters-section">
        <div class="browse-filters-container">
          {/* Search Bar */}
          <div class="browse-search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search samples, packs, genres..."
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              class="browse-search-input"
            />
            <Show when={searchQuery()}>
              <button class="browse-search-clear" onClick={() => setSearchQuery("")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </Show>
          </div>
          
          {/* Filter Controls Row */}
          <div class="browse-controls">
            {/* Key Filter */}
            <div class="browse-dropdown-wrapper">
              <button 
                class={`browse-filter-btn ${selectedKey() !== "All" ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowKeyDropdown(!showKeyDropdown());
                  setShowSortDropdown(false);
                  setShowBpmDropdown(false);
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18V5l12-2v13"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="16" r="3"/>
                </svg>
                <span>Key: {selectedKey()}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <Show when={showKeyDropdown()}>
                <div class="browse-dropdown">
                  <For each={availableKeys()}>
                    {(key) => (
                      <button 
                        class={`browse-dropdown-option ${selectedKey() === key ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedKey(key);
                          setShowKeyDropdown(false);
                        }}
                      >
                        {key}
                      </button>
                    )}
                  </For>
                </div>
              </Show>
            </div>

            {/* BPM Filter */}
            <div class="browse-dropdown-wrapper">
              <button 
                class={`browse-filter-btn ${bpmRange()[0] !== 0 || bpmRange()[1] !== 200 ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBpmDropdown(!showBpmDropdown());
                  setShowSortDropdown(false);
                  setShowKeyDropdown(false);
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>
                  {bpmRange()[0] === 0 && bpmRange()[1] === 200 
                    ? "All BPM" 
                    : `${bpmRange()[0]}-${bpmRange()[1]} BPM`}
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <Show when={showBpmDropdown()}>
                <div class="browse-dropdown">
                  <For each={bpmPresets}>
                    {(preset) => (
                      <button 
                        class={`browse-dropdown-option ${
                          bpmRange()[0] === preset.range[0] && bpmRange()[1] === preset.range[1] 
                            ? 'active' 
                            : ''
                        }`}
                        onClick={() => {
                          setBpmRange(preset.range);
                          setShowBpmDropdown(false);
                        }}
                      >
                        {preset.label}
                      </button>
                    )}
                  </For>
                </div>
              </Show>
            </div>
            
            {/* Sort Dropdown */}
            <div class="browse-dropdown-wrapper">
              <button 
                class="browse-filter-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSortDropdown(!showSortDropdown());
                  setShowKeyDropdown(false);
                  setShowBpmDropdown(false);
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="4" y1="6" x2="20" y2="6"/>
                  <line x1="4" y1="12" x2="16" y2="12"/>
                  <line x1="4" y1="18" x2="12" y2="18"/>
                </svg>
                <span>{sortOptions.find(o => o.value === sortBy())?.label}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <Show when={showSortDropdown()}>
                <div class="browse-dropdown">
                  <For each={sortOptions}>
                    {(option) => (
                      <button 
                        class={`browse-dropdown-option ${sortBy() === option.value ? 'active' : ''}`}
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
            
            {/* Volume Slider */}
            <div class="browse-volume">
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
                class="browse-volume-slider"
              />
            </div>

            {/* Clear Filters */}
            <Show when={hasActiveFilters()}>
              <button class="browse-clear-btn" onClick={clearFilters}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Clear filters
              </button>
            </Show>
          </div>
        </div>
      </section>
      
      {/* Category Pills */}
      <section class="browse-categories-section">
        <div class="browse-categories-container">
          <div class="browse-category-pills">
            <For each={sampleCategories}>
              {(category) => (
                <button
                  class={`browse-pill ${selectedCategory() === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              )}
            </For>
          </div>
        </div>
      </section>
      
      {/* Results Header */}
      <section class="browse-results-header">
        <div class="browse-results-container">
          <div class="browse-results-info">
            <span class="browse-results-count">
              {filteredAndSortedSamples().length} samples
            </span>
            <Show when={selectedCategory() !== "All"}>
              <span class="browse-results-category">in "{selectedCategory()}"</span>
            </Show>
            <Show when={searchQuery()}>
              <span class="browse-results-query">matching "{searchQuery()}"</span>
            </Show>
          </div>
        </div>
      </section>
      
      {/* Sample List */}
      <section class="browse-samples-section">
        <div class="browse-samples-container">
          {/* Column Headers */}
          <div class="browse-list-header">
            <span class="browse-col-play"></span>
            <span class="browse-col-artwork"></span>
            <span class="browse-col-info">Title</span>
            <span class="browse-col-tags">Tags</span>
            <span class="browse-col-duration">Duration</span>
            <span class="browse-col-waveform">Preview</span>
            <span class="browse-col-actions"></span>
          </div>
          
          {/* Sample List */}
          <div class="browse-sample-list">
            <Show 
              when={filteredAndSortedSamples().length > 0}
              fallback={
                <div class="browse-no-results">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <h3>No samples found</h3>
                  <p>Try adjusting your filters or search query</p>
                  <button class="browse-reset-btn" onClick={clearFilters}>
                    Reset Filters
                  </button>
                </div>
              }
            >
              <For each={filteredAndSortedSamples()}>
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
            </Show>
          </div>
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section class="browse-cta-section">
        <div class="browse-cta-content">
          <h2>Ready to create your next hit?</h2>
          <p>All samples are 100% royalty-free and cleared for commercial use</p>
          <a href="/cart" class="browse-cta-btn">
            View Cart
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}


