import { createSignal, Show, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { updatePassword, supabase } from "~/lib/supabase";
import SEO from "~/components/SEO";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [success, setSuccess] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [showPassword, setShowPassword] = createSignal(false);
  const [isValidSession, setIsValidSession] = createSignal(false);
  const [checkingSession, setCheckingSession] = createSignal(true);

  onMount(async () => {
    // Check if user came from a valid reset link (they'll have a session)
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsValidSession(true);
    }
    setCheckingSession(false);
  });

  const passwordStrength = () => {
    const pwd = password();
    if (pwd.length === 0) return { level: 0, text: "" };
    if (pwd.length < 6) return { level: 1, text: "Too short" };
    if (pwd.length < 8) return { level: 2, text: "Weak" };
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    if (hasNumber && hasSpecial && hasUpper && pwd.length >= 10) return { level: 4, text: "Strong" };
    if ((hasNumber || hasSpecial) && pwd.length >= 8) return { level: 3, text: "Good" };
    return { level: 2, text: "Weak" };
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");

    if (password() !== confirmPassword()) {
      setError("Passwords do not match");
      return;
    }

    if (password().length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await updatePassword(password());
      
      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess(true);
      
      // Redirect to vault after 2 seconds
      setTimeout(() => {
        navigate("/vault", { replace: true });
      }, 2000);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main class="auth-page">
      <SEO 
        title="Set New Password"
        description="Set a new password for your TRNDFY account."
        path="/reset-password"
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

          <Show when={checkingSession()}>
            <div class="auth-header-v12">
              <h1>Checking session...</h1>
              <p>Please wait</p>
            </div>
          </Show>

          <Show when={!checkingSession() && !isValidSession()}>
            <div class="auth-header-v12">
              <h1>Invalid or expired link</h1>
              <p>This password reset link is invalid or has expired.</p>
            </div>
            <a href="/forgot-password" class="btn btn-primary btn-large btn-full" style="margin-top: 1rem;">
              Request new reset link
            </a>
          </Show>

          <Show when={!checkingSession() && isValidSession() && success()}>
            <div class="auth-success-v12">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <h2>Password updated!</h2>
              <p>Your password has been successfully changed. Redirecting to your vault...</p>
            </div>
          </Show>

          <Show when={!checkingSession() && isValidSession() && !success()}>
            <div class="auth-header-v12">
              <h1>Set new password</h1>
              <p>Enter your new password below</p>
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
                <label for="password">New Password</label>
                <div class="input-wrapper">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="5" y="11" width="14" height="10" rx="2"/>
                    <path d="M12 16v2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M8 11V7a4 4 0 1 1 8 0v4"/>
                  </svg>
                  <input
                    id="password"
                    type={showPassword() ? "text" : "password"}
                    placeholder="••••••••"
                    value={password()}
                    onInput={(e) => setPassword(e.currentTarget.value)}
                    required
                    autocomplete="new-password"
                  />
                  <button
                    type="button"
                    class="toggle-password"
                    onClick={() => setShowPassword(!showPassword())}
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
                
                {/* Password Strength Indicator */}
                <Show when={password().length > 0}>
                  <div class="password-strength">
                    <div class="strength-bars">
                      <div class={`strength-bar ${passwordStrength().level >= 1 ? 'active' : ''} ${passwordStrength().level >= 3 ? 'good' : ''} ${passwordStrength().level >= 4 ? 'strong' : ''}`} />
                      <div class={`strength-bar ${passwordStrength().level >= 2 ? 'active' : ''} ${passwordStrength().level >= 3 ? 'good' : ''} ${passwordStrength().level >= 4 ? 'strong' : ''}`} />
                      <div class={`strength-bar ${passwordStrength().level >= 3 ? 'active good' : ''} ${passwordStrength().level >= 4 ? 'strong' : ''}`} />
                      <div class={`strength-bar ${passwordStrength().level >= 4 ? 'active strong' : ''}`} />
                    </div>
                    <span class="strength-text">{passwordStrength().text}</span>
                  </div>
                </Show>
              </div>

              <div class="form-group-v12">
                <label for="confirmPassword">Confirm New Password</label>
                <div class="input-wrapper">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="5" y="11" width="14" height="10" rx="2"/>
                    <path d="M12 16v2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M8 11V7a4 4 0 1 1 8 0v4"/>
                  </svg>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword()}
                    onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                    required
                    autocomplete="new-password"
                  />
                  <Show when={confirmPassword().length > 0 && password() === confirmPassword()}>
                    <svg class="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </Show>
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-large btn-full"
                disabled={loading()}
              >
                <Show when={loading()} fallback="Update Password">
                  <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
                  </svg>
                  Updating...
                </Show>
              </button>
            </form>
          </Show>
        </div>
      </section>
    </main>
  );
}


