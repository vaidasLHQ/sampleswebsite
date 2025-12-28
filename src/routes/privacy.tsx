import SEO from "~/components/SEO";

export default function Privacy() {
  return (
    <main class="legal-page">
      <SEO 
        title="Privacy Policy"
        description="TRNDFY privacy policy. Learn how we collect, use, and protect your personal information."
        path="/privacy"
      />
      
      <div class="legal-container">
        <div class="legal-header">
          <h1>Privacy Policy</h1>
          <p class="legal-subtitle">How We Collect, Use, and Protect Your Data</p>
          <p class="legal-updated">Last updated: December 22, 2024</p>
        </div>

        <div class="legal-content">
          <section class="legal-section">
            <h2>1. Introduction</h2>
            <p>
              UAB Coded ("TRNDFY", "we", "us") respects your privacy and is committed to protecting 
              your personal data. This Privacy Policy explains how we collect, use, and safeguard 
              your information when you use our website and services.
            </p>
          </section>

          <section class="legal-section">
            <h2>2. Information We Collect</h2>
            
            <h3>Account Information</h3>
            <p>When you create an account, we collect:</p>
            <ul>
              <li>Email address</li>
              <li>Password (encrypted)</li>
            </ul>
            
            <h3>Payment Information</h3>
            <p>
              Payment processing is handled by Stripe. We do not store your credit card details. 
              Stripe may collect payment card information in accordance with their 
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer"> Privacy Policy</a>.
            </p>
            
            <h3>Purchase History</h3>
            <p>We maintain records of your purchases to:</p>
            <ul>
              <li>Provide access to your purchased samples</li>
              <li>Generate receipts and order history</li>
              <li>Provide customer support</li>
            </ul>
            
            <h3>Usage Data</h3>
            <p>We automatically collect:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Device information</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Process your purchases and provide access to samples</li>
              <li>Send transactional emails (purchase confirmations, password resets)</li>
              <li>Provide customer support</li>
              <li>Improve our website and services</li>
              <li>Analyze usage patterns and optimize user experience</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>4. Third-Party Services</h2>
            <p>We use the following third-party services that may collect data:</p>
            
            <div class="legal-service">
              <h4>Supabase</h4>
              <p>Database and authentication services. Stores your account data and purchase history.</p>
            </div>
            
            <div class="legal-service">
              <h4>Stripe</h4>
              <p>Payment processing. Handles all payment transactions securely.</p>
            </div>
            
            <div class="legal-service">
              <h4>Google Analytics</h4>
              <p>Website analytics to understand how visitors use our site. Collects anonymized usage data.</p>
            </div>
            
            <div class="legal-service">
              <h4>Cloudflare</h4>
              <p>Website hosting and security. May collect IP addresses for security purposes.</p>
            </div>
          </section>

          <section class="legal-section">
            <h2>5. Cookies</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Keep you signed in to your account</li>
              <li>Remember your preferences</li>
              <li>Analyze website traffic (Google Analytics)</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling cookies may affect 
              some functionality of the website.
            </p>
          </section>

          <section class="legal-section">
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to 
              provide services. Purchase records are kept indefinitely to ensure continued access 
              to your samples.
            </p>
            <p>
              If you request account deletion, we will delete your personal data within 30 days, 
              except where we are required to retain it for legal or legitimate business purposes.
            </p>
          </section>

          <section class="legal-section">
            <h2>7. Your Rights (GDPR)</h2>
            <p>If you are in the European Economic Area (EEA), you have the right to:</p>
            <ul>
              <li><strong>Access</strong> - Request a copy of your personal data</li>
              <li><strong>Rectification</strong> - Request correction of inaccurate data</li>
              <li><strong>Erasure</strong> - Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Portability</strong> - Request your data in a machine-readable format</li>
              <li><strong>Object</strong> - Object to processing of your data</li>
              <li><strong>Withdraw Consent</strong> - Withdraw consent where processing is based on consent</li>
            </ul>
            <p>
              To exercise these rights, contact us at <a href="mailto:vaidas@coded.ws">vaidas@coded.ws</a>.
            </p>
          </section>

          <section class="legal-section">
            <h2>8. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your data, including:
            </p>
            <ul>
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Secure password hashing</li>
              <li>Access controls and authentication</li>
              <li>Regular security updates</li>
            </ul>
            <p>
              However, no method of transmission over the Internet is 100% secure. We cannot 
              guarantee absolute security of your data.
            </p>
          </section>

          <section class="legal-section">
            <h2>9. International Transfers</h2>
            <p>
              Your data may be transferred to and processed in countries outside your country of 
              residence, including the United States (where some of our service providers are located). 
              We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section class="legal-section">
            <h2>10. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 18. We do not knowingly collect data 
              from children. If you believe we have collected data from a child, please contact us 
              immediately.
            </p>
          </section>

          <section class="legal-section">
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant 
              changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section class="legal-section">
            <h2>12. Contact Us</h2>
            <p>
              For privacy-related questions or to exercise your data rights, contact:
            </p>
            <div class="legal-contact">
              <p><strong>UAB Coded</strong></p>
              <p>Data Protection Contact</p>
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
        
        .legal-section h3 {
          font-size: 1.1rem;
          color: #fff;
          margin: 1.5rem 0 0.75rem;
        }
        
        .legal-section h4 {
          font-size: 1rem;
          color: #ff3232;
          margin: 0 0 0.25rem;
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
        
        .legal-service {
          padding: 1rem;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          margin-bottom: 0.75rem;
        }
        
        .legal-service p {
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
        }
      `}</style>
    </main>
  );
}


