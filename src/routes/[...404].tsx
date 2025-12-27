import { Title, Meta } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="not-found-page">
      <Title>Page Not Found | TRNDFY</Title>
      <Meta name="robots" content="noindex, nofollow" />
      <HttpStatusCode code={404} />
      
      <section class="not-found-content">
        <div class="not-found-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <div class="not-found-actions">
          <A href="/" class="btn btn-primary">Go Home</A>
          <A href="/browse" class="btn btn-secondary">Browse Samples</A>
        </div>
      </section>
    </main>
  );
}
