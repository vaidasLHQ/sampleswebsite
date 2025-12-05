import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, Show, createSignal, onMount } from "solid-js";
import { supabase } from "~/lib/supabase";
import type { User } from "@supabase/supabase-js";
import "./app.css";

export default function App() {
  const [user, setUser] = createSignal<User | null>(null);
  const [loading, setLoading] = createSignal(true);

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
          <Title>SampleVault - Premium Music Sample Packs</Title>
          
          {/* Header */}
          <header class="header">
            <div class="header-inner">
              <a href="/" class="logo">
                <div class="logo-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" fill="white"/>
                  </svg>
                </div>
                SampleVault
              </a>
              
              <nav class="nav">
                <ul class="nav-links">
                  <li><a href="/" class="nav-link">Packs</a></li>
                  <li><a href="/articles" class="nav-link">Articles</a></li>
                  <li><a href="/about" class="nav-link">About</a></li>
                  <li><a href="/about" class="nav-link">Pricing</a></li>
                </ul>
                
                <div class="nav-actions">
                  <Show when={!loading()}>
                    <Show 
                      when={user()} 
                      fallback={
                        <>
                          <a href="/login" class="btn btn-secondary">Log In</a>
                          <a href="/register" class="btn btn-primary">Get Started</a>
                        </>
                      }
                    >
                      <div class="user-menu">
                        <span class="user-email">{user()?.email}</span>
                        <button onClick={handleSignOut} class="btn btn-secondary">
                          Sign Out
                        </button>
                      </div>
                    </Show>
                  </Show>
                </div>
              </nav>
            </div>
          </header>
          
          <Suspense>{props.children}</Suspense>
          
          {/* Footer */}
          <footer class="footer">
            <div class="footer-inner">
              <div class="footer-brand">
                <a href="/" class="logo">
                  <div class="logo-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" fill="white"/>
                    </svg>
                  </div>
                  SampleVault
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
              <p>© 2024 SampleVault. All rights reserved.</p>
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
