import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { signIn } from "~/lib/supabase";
import SEO from "~/components/SEO";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [showPassword, setShowPassword] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await signIn(email(), password());
      
      if (authError) {
        setError(authError.message);
        return;
      }

      if (data.session) {
        navigate("/vault", { replace: true });
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main class="auth-page">
      <SEO 
        title="Log In"
        description="Sign in to your TRNDFY account to access your purchased sample packs and downloads."
        path="/login"
        noindex={true}
      />
      
      {/* Background Effects */}
      <div class="auth-bg">
        <div class="auth-bg-gradient" />
        <div class="auth-bg-grid" />
      </div>
      
      <section class="auth-section-v12">
        <div class="auth-container-v12">
          {/* Logo */}
          <div class="auth-logo">
            <div class="auth-logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" fill="#ff3232"/>
              </svg>
            </div>
            <span>TRNDFY</span>
          </div>
          
          <div class="auth-header-v12">
            <h1>Welcome back</h1>
            <p>Sign in to access your vault</p>
          </div>

          <form class="auth-form-v12" onSubmit={handleSubmit}>
            <Show when={error()}>
              <div class="auth-error-v12">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>
                <span>{error()}</span>
              </div>
            </Show>

            <div class="form-group-v12">
              <label for="email">Email</label>
              <div class="input-wrapper">
                <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email()}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  required
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="form-group-v12">
              <div class="label-row">
                <label for="password">Password</label>
                <a href="/forgot-password" class="forgot-link">Forgot password?</a>
              </div>
              <div class="input-wrapper">
                <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  id="password"
                  type={showPassword() ? "text" : "password"}
                  placeholder="••••••••"
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  required
                  autocomplete="current-password"
                />
                <button 
                  type="button" 
                  class="toggle-password"
                  onClick={() => setShowPassword(!showPassword())}
                  aria-label={showPassword() ? "Hide password" : "Show password"}
                >
                  <Show when={showPassword()} fallback={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  }>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  </Show>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              class="auth-submit-btn"
              disabled={loading()}
            >
              <Show when={loading()} fallback="Sign In">
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4" stroke-dashoffset="10"/>
                </svg>
                Signing in...
              </Show>
            </button>
          </form>

          <div class="auth-divider-v12">
            <span>or continue with</span>
          </div>

          <div class="auth-social-v12">
            <button type="button" class="social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button type="button" class="social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          <div class="auth-footer-v12">
            <p>
              Don't have an account?{" "}
              <a href="/register">Create one</a>
            </p>
          </div>
        </div>
        
        {/* Side decoration */}
        <div class="auth-decoration">
          <div class="auth-deco-text">
            <span class="auth-deco-label">YOUR SAMPLES</span>
            <span class="auth-deco-title">AWAIT</span>
          </div>
        </div>
      </section>
    </main>
  );
}
