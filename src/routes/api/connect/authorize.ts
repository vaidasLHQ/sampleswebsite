import type { APIEvent } from "@solidjs/start/server";
import { requireServerEnv } from "~/lib/serverEnv";

/**
 * GET /api/connect/authorize
 * 
 * Initiate Stripe Connect OAuth flow
 * 
 * Redirects the user to Stripe's OAuth authorization page where they
 * can connect their Stripe account to your platform.
 * 
 * Query params:
 * - state: Optional state parameter for CSRF protection (e.g., user ID)
 * - email: Optional email to pre-fill in Stripe onboarding
 */
export async function GET(event: APIEvent) {
  try {
    const url = new URL(event.request.url);
    const state = url.searchParams.get("state") || "";
    const email = url.searchParams.get("email") || "";

    const clientId = requireServerEnv("STRIPE_CLIENT_ID");
    
    // Build the redirect URI (where Stripe sends the user after authorization)
    const origin = url.origin;
    const redirectUri = `${origin}/connect/callback`;

    // Build Stripe OAuth URL
    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: "read_write",
      redirect_uri: redirectUri,
    });

    if (state) {
      params.set("state", state);
    }

    if (email) {
      params.set("stripe_user[email]", email);
    }

    // Suggest capabilities for Standard Connect
    params.append("suggested_capabilities[]", "transfers");
    params.append("suggested_capabilities[]", "card_payments");

    const stripeOAuthUrl = `https://connect.stripe.com/oauth/authorize?${params.toString()}`;

    // Redirect to Stripe
    return new Response(null, {
      status: 302,
      headers: {
        Location: stripeOAuthUrl,
      },
    });

  } catch (error) {
    console.error("Connect authorize error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Internal server error" 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

