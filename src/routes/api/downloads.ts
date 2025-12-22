// Token-based downloads are deprecated
// All downloads now happen through the authenticated Vault page
// This endpoint is kept for backwards compatibility but returns a redirect message

export async function GET() {
  return new Response(
    JSON.stringify({
      error: "Token downloads are no longer available",
      message: "Please log in to access your purchases in your Vault",
      redirect: "/vault"
    }),
    { 
      status: 410, // Gone
      headers: { "Content-Type": "application/json" }
    }
  );
}





