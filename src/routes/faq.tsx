import { createSignal, For } from "solid-js";
import SEO, { FAQSchema } from "~/components/SEO";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  // Licensing
  {
    category: "Licensing",
    question: "Are your samples royalty-free?",
    answer: "Yes! All TRNDFY samples are 100% royalty-free. Once you purchase a sample, you can use it in unlimited commercial projects without paying any additional fees or royalties."
  },
  {
    category: "Licensing",
    question: "Can I use the samples in commercial music releases?",
    answer: "Absolutely! You can use our samples in songs released on Spotify, Apple Music, YouTube, and all other streaming platforms. You can also use them in sync licensing for TV, film, and advertising."
  },
  {
    category: "Licensing",
    question: "Do I need to credit TRNDFY when using samples?",
    answer: "No credit is required. You're free to use our samples without any attribution. However, we always appreciate a shoutout if you want to share the love with fellow producers!"
  },
  {
    category: "Licensing",
    question: "Can I share or resell the samples?",
    answer: "No. Your license is personal and non-transferable. You cannot redistribute, resell, or share the original samples with others. You also cannot use them to create competing sample packs."
  },
  {
    category: "Licensing",
    question: "Will I get copyright claims on YouTube?",
    answer: "No. Our samples are not registered with Content ID or any audio fingerprinting services. You should not receive copyright claims when using our samples in your music."
  },
  
  // Downloads
  {
    category: "Downloads",
    question: "How do I access my purchased samples?",
    answer: "After purchase, your samples are instantly available in your Vault. Simply log in to your account and visit the Vault page to download your files. No email links required!"
  },
  {
    category: "Downloads",
    question: "Is there a download limit?",
    answer: "No! You can download your purchased samples unlimited times. They're yours forever and will always be available in your Vault."
  },
  {
    category: "Downloads",
    question: "What file format are the samples?",
    answer: "All samples are delivered in high-quality WAV format (44.1kHz/24-bit), which is compatible with all major DAWs and professional production workflows."
  },
  {
    category: "Downloads",
    question: "What if I lose my downloaded files?",
    answer: "No problem! Just log back into your account and re-download from your Vault. We keep your purchases available indefinitely."
  },
  
  // Compatibility
  {
    category: "Compatibility",
    question: "Which DAWs are compatible?",
    answer: "Our WAV samples work with every major DAW including Ableton Live, FL Studio, Logic Pro, Pro Tools, Cubase, Studio One, Reason, GarageBand, and more."
  },
  {
    category: "Compatibility",
    question: "Do you offer MIDI files?",
    answer: "Some packs include MIDI files where applicable. Check the individual pack descriptions for details on what's included."
  },
  
  // Account & Payment
  {
    category: "Account",
    question: "Do I need an account to purchase?",
    answer: "Yes, you need to create a free account to purchase samples. This ensures your purchases are securely saved to your Vault for unlimited access and re-downloads."
  },
  {
    category: "Account",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and other payment methods through Stripe, our secure payment processor."
  },
  {
    category: "Account",
    question: "Can I get a refund?",
    answer: "Due to the digital nature of our products, all sales are final. We don't offer refunds once samples are made available in your Vault. Please preview samples before purchasing to ensure they meet your needs."
  },
  {
    category: "Account",
    question: "How do I delete my account?",
    answer: "Contact us at vaidas@coded.ws to request account deletion. Note that deleting your account will remove access to your purchased samples, so make sure to download them first."
  }
];

const categories = ["All", "Licensing", "Downloads", "Compatibility", "Account"];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = createSignal("All");
  const [openItem, setOpenItem] = createSignal<number | null>(null);
  
  const filteredFAQ = () => {
    if (activeCategory() === "All") return faqItems;
    return faqItems.filter(item => item.category === activeCategory());
  };
  
  const toggleItem = (index: number) => {
    setOpenItem(openItem() === index ? null : index);
  };
  
  // Format FAQ for schema
  const schemaFAQ = faqItems.map(item => ({
    question: item.question,
    answer: item.answer
  }));

  return (
    <main class="faq-page">
      <SEO 
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about TRNDFY sample packs, licensing, downloads, and more."
        path="/faq"
      />
      <FAQSchema items={schemaFAQ} />
      
      <div class="faq-container">
        <div class="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our samples and services</p>
        </div>
        
        <div class="faq-categories">
          <For each={categories}>
            {(category) => (
              <button
                class={`faq-category ${activeCategory() === category ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenItem(null);
                }}
              >
                {category}
              </button>
            )}
          </For>
        </div>
        
        <div class="faq-list">
          <For each={filteredFAQ()}>
            {(item, index) => (
              <div class={`faq-item ${openItem() === index() ? 'open' : ''}`}>
                <button 
                  class="faq-question"
                  onClick={() => toggleItem(index())}
                >
                  <span class="faq-category-tag">{item.category}</span>
                  <span class="faq-question-text">{item.question}</span>
                  <svg 
                    class="faq-chevron" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div class="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            )}
          </For>
        </div>
        
        <div class="faq-contact">
          <h3>Still have questions?</h3>
          <p>Can't find the answer you're looking for? We're here to help.</p>
          <a href="/contact" class="faq-contact-btn">Contact Us</a>
        </div>
      </div>

      <style>{`
        .faq-page {
          min-height: 100vh;
          padding: 2rem 1rem 4rem;
          background: linear-gradient(180deg, rgba(255,50,50,0.03) 0%, transparent 30%);
        }
        
        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .faq-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .faq-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .faq-header p {
          color: rgba(255,255,255,0.6);
          font-size: 1.1rem;
        }
        
        .faq-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 2rem;
        }
        
        .faq-category {
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .faq-category:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        
        .faq-category.active {
          background: #ff3232;
          border-color: #ff3232;
          color: #fff;
        }
        
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .faq-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s ease;
        }
        
        .faq-item:hover {
          border-color: rgba(255,50,50,0.3);
        }
        
        .faq-item.open {
          border-color: rgba(255,50,50,0.5);
          background: rgba(255,50,50,0.05);
        }
        
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: none;
          border: none;
          color: #fff;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .faq-category-tag {
          font-size: 0.7rem;
          padding: 0.25rem 0.5rem;
          background: rgba(255,50,50,0.2);
          color: #ff3232;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }
        
        .faq-question-text {
          flex: 1;
          font-size: 1rem;
          font-weight: 500;
        }
        
        .faq-chevron {
          flex-shrink: 0;
          color: rgba(255,255,255,0.5);
          transition: transform 0.3s ease;
        }
        
        .faq-item.open .faq-chevron {
          transform: rotate(180deg);
          color: #ff3232;
        }
        
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }
        
        .faq-item.open .faq-answer {
          max-height: 500px;
          padding: 0 1.25rem 1.25rem;
        }
        
        .faq-answer p {
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          margin: 0;
          padding-left: calc(1rem + 60px);
        }
        
        .faq-contact {
          margin-top: 3rem;
          padding: 2rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          text-align: center;
        }
        
        .faq-contact h3 {
          font-size: 1.3rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        
        .faq-contact p {
          color: rgba(255,255,255,0.6);
          margin-bottom: 1.5rem;
        }
        
        .faq-contact-btn {
          display: inline-block;
          padding: 0.875rem 2rem;
          background: #ff3232;
          color: #fff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .faq-contact-btn:hover {
          background: #ff4545;
          transform: translateY(-2px);
        }
        
        @media (max-width: 640px) {
          .faq-header h1 {
            font-size: 1.8rem;
          }
          
          .faq-question {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          
          .faq-category-tag {
            order: -1;
          }
          
          .faq-question-text {
            width: 100%;
            order: 1;
          }
          
          .faq-chevron {
            order: 0;
            margin-left: auto;
          }
          
          .faq-answer p {
            padding-left: 0;
          }
        }
      `}</style>
    </main>
  );
}

