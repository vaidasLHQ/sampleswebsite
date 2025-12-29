import type { APIEvent } from "@solidjs/start/server";
import { requireServerEnv } from "~/lib/serverEnv";

/**
 * POST /api/connect/exchange
 * 
 * Exchange OAuth authorization code for connected account ID
 * 
 * This endpoint is called after Stripe redirects back to our callback URL
 * with an authorization code. We exchange this code for the connected
 * account ID which we can then use for destination charges.
 */
export async function POST(event: APIEvent) {
  try {
    const body = await event.request.json();
    const { code, state } = body;

    if (!code) {
      return new Response(
        JSON.stringify({ error: "Authorization code is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get Stripe credentials
    const secretKey = requireServerEnv("STRIPE_SECRET_KEY");
    const clientId = requireServerEnv("STRIPE_CLIENT_ID");

    // Exchange the authorization code for connected account
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
    });

    const response = await fetch("https://connect.stripe.com/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Stripe OAuth error:", data);
      return new Response(
        JSON.stringify({ 
          error: data.error_description || data.error || "Failed to connect account" 
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const accountId = data.stripe_user_id;

    if (!accountId) {
      return new Response(
        JSON.stringify({ error: "No account ID received from Stripe" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // TODO: Save the accountId to your database
    // Example with Supabase:
    // await supabase.from('connected_accounts').insert({
    //   user_id: state, // if state contains user ID
    //   stripe_account_id: accountId,
    //   connected_at: new Date().toISOString()
    // });

    console.log("Successfully connected Stripe account:", accountId);

    return new Response(
      JSON.stringify({
        success: true,
        accountId,
        state,
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Connect exchange error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Internal server error" 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

