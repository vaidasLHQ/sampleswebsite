import { Title } from "@solidjs/meta";
import { For } from "solid-js";

// VARIANT 5: VISUAL ART - BUSINESS THEMED
// Clean lines, geometric patterns, abstract data visualization, professional
export default function LandingBusinessArt() {
  return (
    <main class="landing-v5">
      <Title>TRNDFY - Professional Audio Solutions</Title>
      
      <section class="v5-hero">
        {/* Business-themed art background */}
        <div class="v5-art-bg">
          {/* Abstract chart/graph elements */}
          <svg class="v5-chart-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="v5-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#d4af37;stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:#aa8c2c;stop-opacity:0.4" />
              </linearGradient>
              <linearGradient id="v5-silver" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#c0c0c0;stop-opacity:0.6" />
                <stop offset="100%" style="stop-color:#808080;stop-opacity:0.2" />
              </linearGradient>
            </defs>
            
            {/* Rising bar chart */}
            <rect class="v5-bar" x="50" y="400" width="40" height="100" fill="url(#v5-gold)" opacity="0.3" />
            <rect class="v5-bar" x="100" y="350" width="40" height="150" fill="url(#v5-gold)" opacity="0.4" />
            <rect class="v5-bar" x="150" y="280" width="40" height="220" fill="url(#v5-gold)" opacity="0.5" />
            <rect class="v5-bar" x="200" y="200" width="40" height="300" fill="url(#v5-gold)" opacity="0.6" />
            
            {/* Growth line */}
            <path class="v5-growth-line" d="M50,450 L150,380 L300,320 L500,200 L700,150 L900,80" stroke="url(#v5-gold)" stroke-width="2" fill="none" />
            
            {/* Geometric shapes */}
            <polygon class="v5-diamond" points="900,300 950,350 900,400 850,350" fill="url(#v5-silver)" opacity="0.3" />
            <polygon class="v5-diamond v5-diamond-2" points="800,150 830,180 800,210 770,180" fill="url(#v5-gold)" opacity="0.4" />
          </svg>
          
          {/* Grid pattern */}
          <div class="v5-grid">
            <For each={Array(12).fill(0)}>
              {(_, i) => (
                <>
                  <div class="v5-grid-h" style={{ top: `${i() * 8.33}%` }} />
                  <div class="v5-grid-v" style={{ left: `${i() * 8.33}%` }} />
                </>
              )}
            </For>
          </div>
          
          {/* Corner accents */}
          <div class="v5-corner-accent v5-corner-tl" />
          <div class="v5-corner-accent v5-corner-br" />
        </div>
        
        <div class="v5-content">
          <div class="v5-badge">
            <span class="v5-badge-icon">★</span>
            <span class="v5-badge-text">PREMIUM QUALITY</span>
          </div>
          
          <h1 class="v5-title">
            <span class="v5-title-main">Sample Packs</span>
            <span class="v5-title-mid">of Trending</span>
            <span class="v5-title-highlight">Spotify Songs</span>
          </h1>
          
          <div class="v5-divider">
            <span class="v5-divider-line" />
            <span class="v5-divider-text">ROYALTY FREE</span>
            <span class="v5-divider-line" />
          </div>
          
          <p class="v5-description">
            Elevate your production with professional-grade samples.<br />
            Trusted by 100,000+ industry professionals worldwide.
          </p>
          
          <div class="v5-stats-row">
            <div class="v5-stat">
              <span class="v5-stat-value">50K+</span>
              <span class="v5-stat-label">Samples</span>
            </div>
            <div class="v5-stat-divider" />
            <div class="v5-stat">
              <span class="v5-stat-value">100%</span>
              <span class="v5-stat-label">Royalty Free</span>
            </div>
            <div class="v5-stat-divider" />
            <div class="v5-stat">
              <span class="v5-stat-value">4.9★</span>
              <span class="v5-stat-label">Rating</span>
            </div>
          </div>
          
          <div class="v5-cta-area">
            <a href="/register" class="v5-cta-primary">
              Get Started
              <span class="v5-arrow">→</span>
            </a>
            <a href="/about" class="v5-cta-secondary">
              Learn More
            </a>
          </div>
          
          <div class="v5-trust">
            <span>Secure Payment</span>
            <span>•</span>
            <span>Instant Access</span>
            <span>•</span>
            <span>Money-Back Guarantee</span>
          </div>
        </div>
      </section>
      
      <div class="v5-nav-links">
        <p>View other variants:</p>
        <a href="/v3">V3 - Original Art</a>
        <a href="/v4">V4 - Music</a>
        <a href="/v5">V5 - Business (current)</a>
        <a href="/v6">V6 - High Tech</a>
        <a href="/">Original Homepage</a>
      </div>
    </main>
  );
}





