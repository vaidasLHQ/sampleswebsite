import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, Show, createSignal, onMount } from "solid-js";
import { supabase } from "~/lib/supabase";
import type { User } from "@supabase/supabase-js";
import PromoBanner from "~/components/PromoBanner";
import { useCart } from "~/lib/cart";
import "./app.css";

// TRNDFY Logo Component - Exact logo: dot + 3 bars + TRNDFY text
// Pattern: small dot, short bar, tall bar, medium bar, then "TRNDFY" text

export default function App() {
  const [user, setUser] = createSignal<User | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);
  const cart = useCart();

  onMount(async () => {
    // Get initial session
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>TRNDFY - Premium Music Sample Packs</Title>
          
          {/* Promo Banner */}
          <PromoBanner />
          
          {/* Header */}
          <header class="header sticky-header">
            <div class="header-inner">
              <a href="/" class="logo trndfy-logo">
                {/* Exact TRNDFY logo: dot + short bar + tall bar + medium bar + text */}
                <svg class="trndfy-logo-svg" viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Dot */}
                  <rect x="0" y="20" width="4" height="8" fill="#ff3232"/>
                  {/* Short bar */}
                  <rect x="8" y="12" width="4" height="16" fill="#ff3232"/>
                  {/* Tall bar */}
                  <rect x="16" y="4" width="4" height="24" fill="#ff3232"/>
                  {/* Medium bar */}
                  <rect x="24" y="8" width="4" height="20" fill="#ff3232"/>
                  {/* TRNDFY text */}
                  <text x="36" y="24" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="0.5" fill="#ff3232">TRNDFY</text>
                </svg>
              </a>
              
              {/* Mobile Menu Toggle */}
              <button 
                class="mobile-menu-toggle" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen())}
                aria-label="Toggle menu"
              >
                <Show when={mobileMenuOpen()} fallback={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                }>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </Show>
              </button>
              
              <nav class={`nav ${mobileMenuOpen() ? 'mobile-open' : ''}`}>
                <ul class="nav-links">
                  <li><a href="/" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Packs</a></li>
                  <li><a href="/articles" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Articles</a></li>
                  <li><a href="/about" class="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a></li>
                  <li><a href="/about" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a></li>
                </ul>
                
                <div class="nav-actions">
                  <Show when={!loading()}>
                    <Show 
                      when={user()} 
                      fallback={
                        <>
                          <a href="/cart" class="btn btn-secondary cart-btn" onClick={() => setMobileMenuOpen(false)}>
                            Cart
                            <Show when={cart.itemCount() > 0}>
                              <span class="cart-badge">{cart.itemCount()}</span>
                            </Show>
                          </a>
                          <a href="/login" class="btn btn-secondary" onClick={() => setMobileMenuOpen(false)}>Log In</a>
                          <a href="/register" class="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Get Started</a>
                        </>
                      }
                    >
                      <div class="user-menu">
                        <a href="/cart" class="btn btn-secondary cart-btn" onClick={() => setMobileMenuOpen(false)}>
                          Cart
                          <Show when={cart.itemCount() > 0}>
                            <span class="cart-badge">{cart.itemCount()}</span>
                          </Show>
                        </a>
                        <span class="user-email">{user()?.email}</span>
                        <button onClick={handleSignOut} class="btn btn-secondary">
                          Sign Out
                        </button>
                      </div>
                    </Show>
                  </Show>
                </div>
              </nav>
              
              {/* Mobile Menu Overlay */}
              <Show when={mobileMenuOpen()}>
                <div class="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />
              </Show>
            </div>
          </header>
          
          <Suspense>{props.children}</Suspense>
          
          {/* Footer */}
          <footer class="footer">
            <div class="footer-inner">
              <div class="footer-brand">
                <a href="/" class="logo trndfy-logo">
                  {/* Exact TRNDFY logo: dot + short bar + tall bar + medium bar + text */}
                  <svg class="trndfy-logo-svg" viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Dot */}
                    <rect x="0" y="20" width="4" height="8" fill="#ff3232"/>
                    {/* Short bar */}
                    <rect x="8" y="12" width="4" height="16" fill="#ff3232"/>
                    {/* Tall bar */}
                    <rect x="16" y="4" width="4" height="24" fill="#ff3232"/>
                    {/* Medium bar */}
                    <rect x="24" y="8" width="4" height="20" fill="#ff3232"/>
                    {/* TRNDFY text */}
                    <text x="36" y="24" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="0.5" fill="#ff3232">TRNDFY</text>
                  </svg>
                </a>
                <p>Premium sample packs crafted by world-class producers. Elevate your sound.</p>
              </div>
              
              <div class="footer-links">
                <div class="footer-column">
                  <h4>Products</h4>
                  <ul>
                    <li><a href="/">Sample Packs</a></li>
                    <li><a href="/">Presets</a></li>
                    <li><a href="/">MIDI Kits</a></li>
                    <li><a href="/">Bundles</a></li>
                  </ul>
                </div>
                
                <div class="footer-column">
                  <h4>Resources</h4>
                  <ul>
                    <li><a href="/">Tutorials</a></li>
                    <li><a href="/">Blog</a></li>
                    <li><a href="/">FAQ</a></li>
                    <li><a href="/">License</a></li>
                  </ul>
                </div>
                
                <div class="footer-column">
                  <h4>Company</h4>
                  <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/">Contact</a></li>
                    <li><a href="/">Careers</a></li>
                    <li><a href="/">Press</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="footer-bottom">
              <p>© 2024 TRNDFY. All rights reserved.</p>
              <p>Privacy · Terms · Cookies</p>
            </div>
          </footer>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
