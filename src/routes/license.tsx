import SEO from "~/components/SEO";

export default function License() {
  return (
    <main class="legal-page">
      <SEO 
        title="License Agreement - Royalty-Free Sample License"
        description="TRNDFY sample license agreement. 100% royalty-free samples cleared for commercial use in music production, streaming, and sync licensing."
        path="/license"
      />
      
      <div class="legal-container">
        <div class="legal-header">
          <h1>Sample License Agreement</h1>
          <p class="legal-subtitle">100% Royalty-Free License for All TRNDFY Samples</p>
          <p class="legal-updated">Last updated: December 22, 2024</p>
        </div>

        <div class="legal-content">
          <section class="legal-section">
            <h2>1. License Grant</h2>
            <p>
              Upon purchase, UAB Coded ("TRNDFY", "we", "us") grants you a non-exclusive, 
              worldwide, perpetual license to use the purchased audio samples ("Samples") 
              in your music productions under the following terms.
            </p>
          </section>

          <section class="legal-section">
            <h2>2. What You CAN Do</h2>
            <div class="legal-list allowed">
              <div class="legal-list-item">
                <span class="legal-icon">✓</span>
                <div>
                  <strong>Commercial Music Releases</strong>
                  <p>Use in songs released on Spotify, Apple Music, YouTube Music, Tidal, Amazon Music, and all other streaming platforms.</p>
                </div>
              </div>
              <div class="legal-list-item">
                <span class="legal-icon">✓</span>
                <div>
                  <strong>YouTube & Social Media</strong>
                  <p>Use in monetized YouTube videos, TikTok, Instagram Reels, and other social media content.</p>
                </div>
              </div>
              <div class="legal-list-item">
                <span class="legal-icon">✓</span>
                <div>
                  <strong>Sync Licensing</strong>
                  <p>Use in TV shows, films, commercials, video games, and other sync licensing opportunities.</p>
                </div>
              </div>
              <div class="legal-list-item">
                <span class="legal-icon">✓</span>
                <div>
                  <strong>Live Performances</strong>
                  <p>Use in DJ sets, live performances, and radio broadcasts.</p>
                </div>
              </div>
              <div class="legal-list-item">
                <span class="legal-icon">✓</span>
                <div>
                  <strong>Unlimited Projects</strong>
                  <p>Use the same sample in unlimited songs and projects. No per-track fees.</p>
                </div>
              </div>
              <div class="legal-list-item">
                <span class="legal-icon">✓</span>
                <div>
                  <strong>Modify & Process</strong>
                  <p>Chop, stretch, pitch, layer, and apply any effects to the samples.</p>
                </div>
              </div>
            </div>
          </section>

          <section class="legal-section">
            <h2>3. What You CANNOT Do</h2>
            <div class="legal-list forbidden">
              <div class="legal-list-item">
                <span class="legal-icon">✗</span>
                <div>
                  <strong>Resell or Redistribute</strong>
                  <p>You may not sell, lease, license, or give away the original samples to others.</p>
                </div>
              </div>
              <div class="legal-list-item">
                <span class="legal-icon">✗</span>
                <div>
                  <strong>Create Competing Products</strong>
                  <p>You may not use our samples to create other sample packs, loop libraries, or virtual instruments for sale.</p>
                </div>
              </div>
              <div class="legal-list-item">
                <span class="legal-icon">✗</span>
                <div>
                  <strong>Claim Ownership</strong>
                  <p>You may not register the original, unmodified samples as your own intellectual property.</p>
                </div>
              </div>
              <div class="legal-list-item">
                <span class="legal-icon">✗</span>
                <div>
                  <strong>Share Account Access</strong>
                  <p>Your license is personal and non-transferable. Do not share your account or downloads.</p>
                </div>
              </div>
            </div>
          </section>

          <section class="legal-section">
            <h2>4. No Credit Required</h2>
            <p>
              You are <strong>not required</strong> to credit TRNDFY or UAB Coded when using our samples 
              in your productions. However, we always appreciate a shoutout if you'd like to share 
              the love with fellow producers!
            </p>
          </section>

          <section class="legal-section">
            <h2>5. Ownership & Copyright</h2>
            <p>
              You own the copyright to your original musical compositions that incorporate our samples. 
              We retain ownership of the original sample recordings. This license grants you usage rights, 
              not ownership of the source material.
            </p>
          </section>

          <section class="legal-section">
            <h2>6. Content ID & Copyright Claims</h2>
            <p>
              Our samples are <strong>not registered</strong> with Content ID or any audio fingerprinting services. 
              You should not receive copyright claims on platforms like YouTube when using our samples in your music.
            </p>
            <p>
              If you ever receive a claim related to a TRNDFY sample, please contact us at{" "}
              <a href="mailto:vaidas@coded.ws">vaidas@coded.ws</a> with your order details and we will 
              help resolve it.
            </p>
          </section>

          <section class="legal-section">
            <h2>7. License Validity</h2>
            <p>
              This license is perpetual and does not expire. Once purchased, you may use the samples 
              forever, even if TRNDFY ceases operations. We recommend keeping backup copies of your 
              purchased samples.
            </p>
          </section>

          <section class="legal-section">
            <h2>8. Refund Policy</h2>
            <p>
              Due to the digital nature of our products, <strong>all sales are final</strong>. 
              We do not offer refunds once samples have been downloaded or made available in your Vault.
            </p>
            <p>
              Please preview samples before purchasing to ensure they meet your needs. If you experience 
              technical issues with your download, contact us and we'll help resolve the problem.
            </p>
          </section>

          <section class="legal-section">
            <h2>9. Contact</h2>
            <p>
              For licensing questions or copyright inquiries, please contact:
            </p>
            <div class="legal-contact">
              <p><strong>UAB Coded</strong></p>
              <p>Email: <a href="mailto:vaidas@coded.ws">vaidas@coded.ws</a></p>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        .legal-page {
          min-height: 100vh;
          padding: 2rem 1rem 4rem;
          background: linear-gradient(180deg, rgba(255,50,50,0.03) 0%, transparent 30%);
        }
        
        .legal-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .legal-header {
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .legal-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .legal-subtitle {
          font-size: 1.1rem;
          color: #ff3232;
          margin-bottom: 0.5rem;
        }
        
        .legal-updated {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
        }
        
        .legal-content {
          color: rgba(255,255,255,0.85);
          line-height: 1.8;
        }
        
        .legal-section {
          margin-bottom: 2.5rem;
        }
        
        .legal-section h2 {
          font-size: 1.3rem;
          color: #fff;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255,50,50,0.3);
        }
        
        .legal-section p {
          margin-bottom: 1rem;
        }
        
        .legal-section a {
          color: #ff3232;
          text-decoration: none;
        }
        
        .legal-section a:hover {
          text-decoration: underline;
        }
        
        .legal-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .legal-list-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        
        .legal-icon {
          font-size: 1.2rem;
          font-weight: 700;
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .allowed .legal-icon {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }
        
        .forbidden .legal-icon {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .legal-list-item strong {
          display: block;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        
        .legal-list-item p {
          margin: 0;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
        }
        
        .legal-contact {
          padding: 1.5rem;
          background: rgba(255,50,50,0.05);
          border-radius: 12px;
          border: 1px solid rgba(255,50,50,0.2);
        }
        
        .legal-contact p {
          margin: 0.25rem 0;
        }
        
        @media (max-width: 640px) {
          .legal-header h1 {
            font-size: 1.8rem;
          }
          
          .legal-list-item {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </main>
  );
}

