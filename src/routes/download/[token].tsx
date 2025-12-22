import { Title } from "@solidjs/meta";
import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

// Token-based downloads are deprecated
// All downloads now happen through the authenticated Vault
export default function DownloadPage() {
  const navigate = useNavigate();

  onMount(() => {
    // Redirect to vault - users must be logged in to access downloads
    navigate("/vault", { replace: true });
  });

  return (
    <main class="download-page">
      <Title>Downloads Moved - TRNDFY</Title>

      <section class="download-inner">
        <h1>Downloads Have Moved</h1>
        <p>All your purchased samples are now available in your Vault.</p>
        <p>Redirecting you now...</p>
        <a href="/vault" class="btn btn-primary">Go to My Vault</a>
      </section>
    </main>
  );
}





