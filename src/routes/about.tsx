import SEO from "~/components/SEO";

export default function About() {
  return (
    <main>
      <SEO 
        title="About TRNDFY - Premium Sample Packs by Grammy-Winning Producers"
        description="Founded in 2020, TRNDFY creates high-quality royalty-free sample packs crafted by Grammy-winning producers. Our sounds power thousands of releases from underground tracks to Billboard hits."
        path="/about"
        keywords={["about trndfy", "music production company", "sample pack creators", "grammy winning producers"]}
      />
      
      <section class="hero" style={{ "min-height": "auto", "padding-bottom": "var(--space-3xl)" }}>
        <div class="grid-pattern" />
        
        <div class="hero-content">
          <h1 class="animate-fade-in-up">
            Crafted by <em>producers</em>, for producers.
          </h1>
          
          <p class="hero-description animate-fade-in-up delay-1">
            We're a team of Grammy-winning producers and sound designers dedicated to 
            creating the highest quality sample packs for modern music production.
          </p>
        </div>
      </section>
      
      <section class="features-section">
        <div class="container">
          <div class="section-header">
            <h2>Our Story</h2>
          </div>
          
          <div style={{ "max-width": "700px", margin: "0 auto", "text-align": "center" }}>
            <p style={{ "margin-bottom": "var(--space-lg)", "font-size": "1.125rem" }}>
              Founded in 2020, TRNDFY was born from a simple frustration: finding 
              high-quality, truly usable samples was too hard. So we built what we wished existed.
            </p>
            
            <p style={{ "margin-bottom": "var(--space-lg)", "font-size": "1.125rem" }}>
              Every sample in our collection is meticulously crafted, recorded with premium 
              gear, and processed through analog hardware. We don't do filler sounds — 
              every sample is designed to inspire and be production-ready.
            </p>
            
            <p style={{ "font-size": "1.125rem" }}>
              Today, our sounds have been used in thousands of releases, from underground 
              tracks to Billboard-charting hits. We're proud to be a part of your creative journey.
            </p>
          </div>
        </div>
      </section>
      
      <section class="cta-section">
        <div class="cta-content">
          <h2>Join our community.</h2>
          <p>Get exclusive samples, production tips, and early access to new releases.</p>
          <div class="hero-actions">
            <a href="/" class="btn btn-primary btn-large">
              Browse Packs
            </a>
            <a href="/" class="btn btn-secondary btn-large">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
