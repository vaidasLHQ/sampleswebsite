import { Title } from "@solidjs/meta";

// VARIANT 1: CONSERVATIVE - Clean, minimal, professional
export default function LandingConservative() {
  return (
    <main class="landing-v1">
      <Title>TRNDFY - Professional Sample Packs</Title>
      
      <section class="v1-hero">
        <div class="v1-container">
          <div class="v1-badge">
            <span>Trusted by 100,000+ Producers</span>
          </div>
          
          <h1 class="v1-title">
            Sample Packs of Trending<br />
            <span class="v1-highlight">Spotify Songs.</span><br />
            Royalty Free.
          </h1>
          
          <p class="v1-description">
            Create your next hit with professionally crafted samples from the hottest songs on Spotify. 
            100% royalty-free. Instant download. Use commercially without limitations.
          </p>
          
          <div class="v1-actions">
            <a href="/register" class="v1-btn-primary">
              Get Started Free
            </a>
            <a href="/about" class="v1-btn-secondary">
              Learn More →
            </a>
          </div>
          
          <div class="v1-trust">
            <span>✓ No credit card required</span>
            <span>✓ 3 free packs included</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
        
        {/* Minimal geometric decoration */}
        <div class="v1-decoration">
          <div class="v1-circle v1-circle-1" />
          <div class="v1-circle v1-circle-2" />
          <div class="v1-line v1-line-1" />
          <div class="v1-line v1-line-2" />
        </div>
      </section>
      
      {/* Stats bar */}
      <section class="v1-stats">
        <div class="v1-stat">
          <span class="v1-stat-number">50,000+</span>
          <span class="v1-stat-label">Samples</span>
        </div>
        <div class="v1-stat">
          <span class="v1-stat-number">500+</span>
          <span class="v1-stat-label">Sample Packs</span>
        </div>
        <div class="v1-stat">
          <span class="v1-stat-number">100K+</span>
          <span class="v1-stat-label">Producers</span>
        </div>
        <div class="v1-stat">
          <span class="v1-stat-number">4.9★</span>
          <span class="v1-stat-label">Rating</span>
        </div>
      </section>
      
      <div class="v1-nav-links">
        <p>View other variants:</p>
        <a href="/v1">V1 - Conservative (current)</a>
        <a href="/v2">V2 - Live & Catchy</a>
        <a href="/v3">V3 - Visual Art</a>
        <a href="/">Original Homepage</a>
      </div>
    </main>
  );
}





