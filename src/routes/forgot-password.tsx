import { createSignal, Show } from "solid-js";
import { A } from "@solidjs/router";
import { resetPassword } from "~/lib/supabase";
import SEO from "~/components/SEO";

export default function ForgotPassword() {
  const [email, setEmail] = createSignal("");
  const [error, setError] = createSignal("");
  const [success, setSuccess] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email().includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } = await resetPassword(email());
      
      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main class="auth-page">
      <SEO 
        title="Reset Password"
        description="Reset your TRNDFY account password."
        path="/forgot-password"
        noindex={true}
      />
      
      {/* Background Effects */}
      <div class="auth-bg">
        <div class="auth-bg-gradient" />
        <div class="auth-bg-grid" />
      </div>
      
      <section class="auth-section-v12">
        <div class="auth-container-v12">
          {/* Logo - TRNDFY waveform bars */}
          <div class="auth-logo">
            <svg class="trndfy-logo-svg" viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="height: 32px; width: auto;">
              {/* Dot */}
              <rect x="0" y="20" width="4" height="4" rx="1" fill="#ff3232"/>
              {/* Short bar */}
              <rect x="6" y="12" width="4" height="12" rx="1" fill="#ff3232"/>
              {/* Tall bar */}
              <rect x="12" y="4" width="4" height="20" rx="1" fill="#ff3232"/>
              {/* Medium bar */}
              <rect x="18" y="8" width="4" height="16" rx="1" fill="#ff3232"/>
              {/* TRNDFY text */}
              <text x="28" y="22" font-family="'Inter', 'Segoe UI', sans-serif" font-size="18" font-weight="700" fill="#ff3232">TRNDFY</text>
            </svg>
          </div>
          
          <div class="auth-header-v12">
            <h1>Reset your password</h1>
            <p>Enter your email and we'll send you a reset link</p>
          </div>

          <Show when={success()}>
            <div class="auth-success-v12">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <h2>Check your email</h2>
              <p>We've sent a password reset link to <strong>{email()}</strong></p>
              <p class="auth-note">Didn't receive the email? Check your spam folder or try again.</p>
              <A href="/login" class="btn btn-primary btn-large btn-full" style="margin-top: 1rem;">
                Back to Login
              </A>
            </div>
          </Show>

          <Show when={!success()}>
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
                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                    <path d="M3 7l9 6 9-6"/>
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

              <button
                type="submit"
                class="btn btn-primary btn-large btn-full"
                disabled={loading()}
              >
                <Show when={loading()} fallback="Send Reset Link">
                  <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
                  </svg>
                  Sending...
                </Show>
              </button>
            </form>

            <p class="auth-footer-link">
              Remember your password? <A href="/login">Sign in</A>
            </p>
          </Show>
        </div>
      </section>
    </main>
  );
}


