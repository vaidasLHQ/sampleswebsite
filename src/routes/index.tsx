import { Title } from "@solidjs/meta";
import { For, createSignal, Show } from "solid-js";
import SampleRow from "~/components/SampleRow";
import { samples, sampleCategories } from "~/data/samples";
import { features, testimonials } from "~/data/packs";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = createSignal("Hip Hop");
  const [playingSampleId, setPlayingSampleId] = createSignal<number | null>(null);
  
  const filteredSamples = () => {
    if (selectedCategory() === "All") {
      return samples;
    }
    return samples.filter(sample => sample.category === selectedCategory());
  };

  const handleSamplePlay = (sampleId: number) => {
    if (playingSampleId() === sampleId) {
      setPlayingSampleId(null);
    } else {
      setPlayingSampleId(sampleId);
    }
  };

  return (
    <main>
      <Title>SampleVault - Premium Music Sample Packs</Title>
      
      {/* Hero Section */}
      <section class="hero">
        <div class="grid-pattern" />
        
        <div class="hero-content">
          <div class="hero-badge animate-fade-in-up">
            <span class="hero-badge-new">New</span>
            <span>Trap Kingdom pack just dropped • Metro Boomin</span>
          </div>
          
          <h1 class="hero-title animate-fade-in-up delay-1">
            Discover premium samples from <em>industry-leading producers</em>
          </h1>
          
          <p class="hero-description animate-fade-in-up delay-2">
            Our catalog is stacked with samples from Grammy-winning producers and industry legends. 
            Yours to flip, chop, and turn into your next banger.
          </p>
          
          <div class="hero-actions animate-fade-in-up delay-3">
            <a href="#packs" class="btn btn-primary btn-large">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5.14v14l11-7-11-7z" fill="currentColor"/>
              </svg>
              Try Free Samples
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
      
      {/* Sample Library Browser */}
      <section id="samples" class="sample-library-section">
        <div class="sample-library-header">
          <h2>Sample Library</h2>
        </div>
        
        {/* Category Pills */}
        <div class="sample-category-pills">
          <For each={sampleCategories}>
            {(category) => (
              <button
                class={`sample-pill ${selectedCategory() === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            )}
          </For>
          <button class="sample-pill more-pill">
            90+ more
          </button>
        </div>
        
        {/* Sample List */}
        <div class="sample-list">
          <For each={filteredSamples()}>
            {(sample) => (
              <SampleRow
                artwork={sample.artwork}
                filename={sample.filename}
                packName={sample.packName}
                bpm={sample.bpm}
                key={sample.key}
                isPlaying={playingSampleId() === sample.id}
                onPlay={() => handleSamplePlay(sample.id)}
              />
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
      
      {/* Testimonials Section */}
      <section class="testimonials-section">
        <div class="section-header">
          <h2>Trusted by Industry Legends</h2>
          <p>See what top producers are saying about SampleVault</p>
        </div>
        
        <div class="testimonials-grid">
          <For each={testimonials}>
            {(testimonial) => (
              <div class="testimonial-card">
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
      <section class="cta-section">
        <div class="cta-content">
          <h2>Start creating today.</h2>
          <p>Join over 100,000 producers who trust SampleVault for their sound design needs.</p>
          <div class="hero-actions">
            <a href="/register" class="btn btn-primary btn-large">
              Get Started Free
            </a>
            <a href="#packs" class="btn btn-secondary btn-large">
              Browse Packs
            </a>
          </div>
          <p class="cta-note">✓ No credit card required • ✓ 3 free sample packs included</p>
        </div>
      </section>
    </main>
  );
}
