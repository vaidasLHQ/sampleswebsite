import { createEffect, createSignal, Show } from "solid-js";
import { useSearchParams, useNavigate } from "@solidjs/router";
import { Title } from "@solidjs/meta";

/**
 * Stripe Connect OAuth Callback Handler
 * 
 * This route handles the redirect from Stripe after a seller authorizes
 * their account connection via OAuth.
 * 
 * Flow:
 * 1. User clicks "Connect Stripe" → redirected to Stripe OAuth
 * 2. User authorizes on Stripe
 * 3. Stripe redirects here with ?code=xxx&state=xxx
 * 4. We exchange the code for connected account ID
 * 5. Save account ID and redirect to dashboard
 */
export default function ConnectCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = createSignal<"loading" | "success" | "error">("loading");
  const [message, setMessage] = createSignal("");
  const [accountId, setAccountId] = createSignal<string | null>(null);

  createEffect(async () => {
    const code = searchParams.code;
    const state = searchParams.state;
    const error = searchParams.error;
    const errorDescription = searchParams.error_description;

    // Handle OAuth errors
    if (error) {
      setStatus("error");
      setMessage(errorDescription || error || "Authorization was denied");
      return;
    }

    // Validate code exists
    if (!code) {
      setStatus("error");
      setMessage("No authorization code received from Stripe");
      return;
    }

    try {
      // Exchange the authorization code for connected account ID
      const response = await fetch("/api/connect/exchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, state }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to connect Stripe account");
      }

      setAccountId(data.accountId);
      setStatus("success");
      setMessage("Your Stripe account has been connected successfully!");

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate("/dashboard?connected=true");
      }, 3000);

    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  });

  return (
    <>
      <Title>Connect Stripe - TRNDFY</Title>
      
      <div class="connect-callback-page">
        <style>{`
          .connect-callback-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            padding: 20px;
          }
          
          .callback-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 48px;
            max-width: 480px;
            width: 100%;
            text-align: center;
          }
          
          .callback-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            font-size: 40px;
          }
          
          .callback-icon.loading {
            background: rgba(99, 102, 241, 0.2);
            animation: pulse 2s ease-in-out infinite;
          }
          
          .callback-icon.success {
            background: rgba(34, 197, 94, 0.2);
          }
          
          .callback-icon.error {
            background: rgba(239, 68, 68, 0.2);
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
          
          .callback-title {
            font-size: 24px;
            font-weight: 700;
            color: #fff;
            margin-bottom: 12px;
          }
          
          .callback-message {
            color: rgba(255, 255, 255, 0.7);
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 24px;
          }
          
          .callback-account-id {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 12px 16px;
            font-family: monospace;
            font-size: 14px;
            color: #22c55e;
            margin-bottom: 24px;
            word-break: break-all;
          }
          
          .callback-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-top-color: #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          .callback-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #ff3232;
            color: #fff;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
          }
          
          .callback-button:hover {
            background: #e02020;
            transform: translateY(-2px);
          }
          
          .callback-redirect-text {
            color: rgba(255, 255, 255, 0.5);
            font-size: 14px;
            margin-top: 16px;
          }
        `}</style>

        <div class="callback-card">
          <Show when={status() === "loading"}>
            <div class="callback-icon loading">
              <div class="callback-spinner" />
            </div>
            <h1 class="callback-title">Connecting Your Account</h1>
            <p class="callback-message">
              Please wait while we complete the connection with Stripe...
            </p>
          </Show>

          <Show when={status() === "success"}>
            <div class="callback-icon success">✓</div>
            <h1 class="callback-title">Successfully Connected!</h1>
            <p class="callback-message">{message()}</p>
            <Show when={accountId()}>
              <div class="callback-account-id">
                Account ID: {accountId()}
              </div>
            </Show>
            <a href="/dashboard" class="callback-button">
              Go to Dashboard →
            </a>
            <p class="callback-redirect-text">
              Redirecting automatically in 3 seconds...
            </p>
          </Show>

          <Show when={status() === "error"}>
            <div class="callback-icon error">✕</div>
            <h1 class="callback-title">Connection Failed</h1>
            <p class="callback-message">{message()}</p>
            <a href="/" class="callback-button">
              Try Again
            </a>
          </Show>
        </div>
      </div>
    </>
  );
}

