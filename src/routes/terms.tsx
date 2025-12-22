import SEO from "~/components/SEO";

export default function Terms() {
  return (
    <main class="legal-page">
      <SEO 
        title="Terms of Service"
        description="TRNDFY terms of service. Read our terms and conditions for using the TRNDFY platform and purchasing sample packs."
        path="/terms"
      />
      
      <div class="legal-container">
        <div class="legal-header">
          <h1>Terms of Service</h1>
          <p class="legal-subtitle">Terms and Conditions for Using TRNDFY</p>
          <p class="legal-updated">Last updated: December 22, 2024</p>
        </div>

        <div class="legal-content">
          <section class="legal-section">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using TRNDFY (the "Service"), operated by UAB Coded ("Company", "we", "us"), 
              you agree to be bound by these Terms of Service. If you do not agree to these terms, 
              please do not use our Service.
            </p>
          </section>

          <section class="legal-section">
            <h2>2. Account Registration</h2>
            <p>
              To purchase samples, you must create an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized account use</li>
            </ul>
            <p>
              You must be at least 18 years old or have parental consent to create an account.
            </p>
          </section>

          <section class="legal-section">
            <h2>3. Purchases and Payments</h2>
            <p>
              All purchases are processed securely through Stripe. By making a purchase, you agree that:
            </p>
            <ul>
              <li>You are authorized to use the payment method provided</li>
              <li>All payment information is accurate and complete</li>
              <li>You will pay all charges at the prices in effect when incurred</li>
              <li>Prices are listed in USD and may be subject to applicable taxes</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>4. Digital Products</h2>
            <p>
              TRNDFY sells digital audio samples. Upon successful payment:
            </p>
            <ul>
              <li>Products are immediately available in your Vault</li>
              <li>You receive a perpetual license to use the samples (see <a href="/license">License Agreement</a>)</li>
              <li>Downloads are available indefinitely from your account</li>
              <li>We recommend keeping backup copies of purchased files</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>5. Refund Policy</h2>
            <p>
              <strong>All sales are final.</strong> Due to the digital nature of our products, 
              we do not offer refunds once a purchase is completed and samples are made available 
              in your Vault.
            </p>
            <p>
              Please preview all samples before purchasing. If you experience technical issues 
              accessing your purchases, contact us at <a href="mailto:vaidas@coded.ws">vaidas@coded.ws</a> 
              and we will assist you.
            </p>
          </section>

          <section class="legal-section">
            <h2>6. Intellectual Property</h2>
            <p>
              All content on TRNDFY, including but not limited to audio samples, graphics, logos, 
              and website design, is owned by UAB Coded or our licensors and is protected by 
              copyright and other intellectual property laws.
            </p>
            <p>
              Your purchase grants you a license to use the samples as outlined in our 
              <a href="/license">License Agreement</a>, but does not transfer ownership of 
              the underlying intellectual property.
            </p>
          </section>

          <section class="legal-section">
            <h2>7. Prohibited Uses</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Share your account credentials with others</li>
              <li>Redistribute, resell, or share purchased samples</li>
              <li>Use automated systems to access the Service</li>
              <li>Attempt to circumvent any security measures</li>
              <li>Use the Service for any illegal purpose</li>
              <li>Interfere with or disrupt the Service</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>8. Service Availability</h2>
            <p>
              We strive to maintain Service availability but do not guarantee uninterrupted access. 
              We may modify, suspend, or discontinue any aspect of the Service at any time.
            </p>
            <p>
              We are not liable for any loss resulting from Service unavailability, including 
              inability to access purchased content. We recommend maintaining local backups of 
              your purchased samples.
            </p>
          </section>

          <section class="legal-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, UAB Coded shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages arising from 
              your use of the Service.
            </p>
            <p>
              Our total liability for any claim arising from your use of the Service shall not 
              exceed the amount you paid to us in the 12 months preceding the claim.
            </p>
          </section>

          <section class="legal-section">
            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless UAB Coded, its officers, directors, 
              employees, and agents from any claims, damages, or expenses arising from your 
              use of the Service or violation of these Terms.
            </p>
          </section>

          <section class="legal-section">
            <h2>11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Republic of Lithuania. Any disputes 
              shall be resolved in the courts of Lithuania.
            </p>
          </section>

          <section class="legal-section">
            <h2>12. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Continued use of the Service after changes 
              constitutes acceptance of the new Terms. We encourage you to review these Terms 
              periodically.
            </p>
          </section>

          <section class="legal-section">
            <h2>13. Contact</h2>
            <p>
              For questions about these Terms, please contact:
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
        
        .legal-section ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .legal-section li {
          margin-bottom: 0.5rem;
          color: rgba(255,255,255,0.8);
        }
        
        .legal-section a {
          color: #ff3232;
          text-decoration: none;
        }
        
        .legal-section a:hover {
          text-decoration: underline;
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
        }
      `}</style>
    </main>
  );
}

