import { Title } from "@solidjs/meta";
import { onMount, createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useCart } from "~/lib/cart";
import { supabase } from "~/lib/supabase";

export default function CheckoutSuccess() {
  const cart = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);
  const [countdown, setCountdown] = createSignal(5);

  onMount(async () => {
    // Clear the cart after successful payment
    cart.clear();
    
    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session?.user);
    
    // If logged in, countdown and redirect to vault
    if (session?.user) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/vault", { replace: true });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  });

  return (
    <main class="checkout-result">
      <Title>Payment Successful! - TRNDFY</Title>
      <section class="checkout-result-inner">
        <div class="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        
        <h1>Payment Successful!</h1>
        <p class="success-message">
          Thank you for your purchase! Your samples are now available in your vault.
        </p>
        
        <Show when={isLoggedIn()}>
          <p class="redirect-notice">
            Redirecting to your vault in <strong>{countdown()}</strong> seconds...
          </p>
        </Show>
        
        <div class="success-actions">
          <Show when={isLoggedIn()} fallback={
            <>
              <p class="email-notice">
                We've also sent a download link to your email.
              </p>
              <a class="btn btn-primary" href="/login">
                Log in to access your vault
              </a>
              <a class="btn btn-secondary" href="/">
                Continue browsing
              </a>
            </>
          }>
            <a class="btn btn-primary" href="/vault">
              Go to My Vault Now
            </a>
            <a class="btn btn-secondary" href="/">
              Browse more samples
            </a>
          </Show>
        </div>
      </section>
      
      <style>{`
        .checkout-result {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(180deg, rgba(255,50,50,0.05) 0%, transparent 50%);
        }
        
        .checkout-result-inner {
          text-align: center;
          max-width: 500px;
          padding: 3rem;
          background: rgba(255,255,255,0.03);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        
        .success-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: scaleIn 0.5s ease-out;
        }
        
        .success-icon svg {
          width: 40px;
          height: 40px;
          color: white;
        }
        
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .checkout-result h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .success-message {
          color: rgba(255,255,255,0.7);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .redirect-notice {
          color: #ff3232;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255,50,50,0.1);
          border-radius: 8px;
        }
        
        .email-notice {
          color: rgba(255,255,255,0.6);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        
        .success-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .success-actions .btn {
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .success-actions .btn-primary {
          background: #ff3232;
          color: white;
          border: none;
        }
        
        .success-actions .btn-primary:hover {
          background: #ff4545;
          transform: translateY(-2px);
        }
        
        .success-actions .btn-secondary {
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.2);
        }
        
        .success-actions .btn-secondary:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }
      `}</style>
    </main>
  );
}
