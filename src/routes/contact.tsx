import SEO from "~/components/SEO";

export default function Contact() {
  return (
    <main class="contact-page">
      <SEO 
        title="Contact Us"
        description="Get in touch with TRNDFY. Contact us for support, licensing questions, or partnership inquiries."
        path="/contact"
      />
      
      <div class="contact-container">
        <div class="contact-header">
          <h1>Contact Us</h1>
          <p>Have questions? We're here to help.</p>
        </div>
        
        <div class="contact-content">
          <div class="contact-card contact-card-main">
            <div class="contact-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h2>Email Us</h2>
            <p>For all inquiries, reach out to our team:</p>
            <a href="mailto:vaidas@coded.ws" class="contact-email">
              vaidas@coded.ws
            </a>
            <p class="contact-response">We typically respond within 24-48 hours</p>
          </div>
          
          <div class="contact-cards-row">
            <div class="contact-card">
              <div class="contact-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3>Support</h3>
              <p>Having trouble with downloads or your account? Check our FAQ first, then email us if you need help.</p>
              <a href="/faq">View FAQ →</a>
            </div>
            
            <div class="contact-card">
              <div class="contact-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3>Licensing</h3>
              <p>Questions about commercial use, sync licensing, or specific use cases? We're happy to clarify.</p>
              <a href="/license">View License →</a>
            </div>
            
            <div class="contact-card">
              <div class="contact-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Partnerships</h3>
              <p>Interested in collaborating or featuring your samples on TRNDFY? Let's talk.</p>
              <a href="mailto:vaidas@coded.ws">Get in touch →</a>
            </div>
          </div>
        </div>
        
        <div class="contact-business">
          <h3>Business Information</h3>
          <p><strong>UAB Coded</strong></p>
          <p>Operating as TRNDFY</p>
        </div>
      </div>

      <style>{`
        .contact-page {
          min-height: 100vh;
          padding: 2rem 1rem 4rem;
          background: linear-gradient(180deg, rgba(255,50,50,0.03) 0%, transparent 30%);
        }
        
        .contact-container {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .contact-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .contact-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .contact-header p {
          color: rgba(255,255,255,0.6);
          font-size: 1.1rem;
        }
        
        .contact-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .contact-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.2s ease;
        }
        
        .contact-card:hover {
          border-color: rgba(255,50,50,0.3);
        }
        
        .contact-card-main {
          text-align: center;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, rgba(255,50,50,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border-color: rgba(255,50,50,0.2);
        }
        
        .contact-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 1.5rem;
          background: rgba(255,50,50,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff3232;
        }
        
        .contact-card-main h2 {
          font-size: 1.5rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        
        .contact-card-main > p {
          color: rgba(255,255,255,0.6);
          margin-bottom: 1rem;
        }
        
        .contact-email {
          display: inline-block;
          font-size: 1.5rem;
          font-weight: 600;
          color: #ff3232;
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          background: rgba(255,50,50,0.1);
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .contact-email:hover {
          background: rgba(255,50,50,0.2);
          transform: translateY(-2px);
        }
        
        .contact-response {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.5);
        }
        
        .contact-cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        
        .contact-card-icon {
          width: 48px;
          height: 48px;
          background: rgba(255,50,50,0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff3232;
          margin-bottom: 1rem;
        }
        
        .contact-card h3 {
          font-size: 1.1rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        
        .contact-card p {
          color: rgba(255,255,255,0.6);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .contact-card a {
          color: #ff3232;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .contact-card a:hover {
          text-decoration: underline;
        }
        
        .contact-business {
          margin-top: 3rem;
          padding: 1.5rem;
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
          text-align: center;
        }
        
        .contact-business h3 {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.75rem;
        }
        
        .contact-business p {
          color: rgba(255,255,255,0.7);
          margin: 0.25rem 0;
        }
        
        @media (max-width: 768px) {
          .contact-header h1 {
            font-size: 1.8rem;
          }
          
          .contact-cards-row {
            grid-template-columns: 1fr;
          }
          
          .contact-email {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </main>
  );
}

