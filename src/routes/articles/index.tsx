import { createResource, For, Show } from "solid-js";
import { getArticles, type Article } from "~/lib/articles";
import SEO from "~/components/SEO";

export default function Articles() {
  const [articles] = createResource(getArticles);
  
  const featuredArticle = () => articles()?.find(a => a.featured);
  const otherArticles = () => articles()?.filter(a => !a.featured || a.id !== featuredArticle()?.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <main>
      <SEO 
        title="Music Production Articles & Tutorials"
        description="Deep dives into music production, sound design, mixing techniques, and the music industry. Learn from professional producers and elevate your craft."
        path="/articles"
        keywords={["music production tutorials", "sound design tips", "mixing techniques", "producer tips", "sample pack tutorials"]}
      />
      
      {/* Hero Header */}
      <section class="articles-hero">
        <div class="articles-hero-content">
          <span class="articles-label">The Vault</span>
          <h1>Production <em>Insights</em></h1>
          <p>Deep dives into music production, sound design, and the industry. Written by producers, for producers.</p>
        </div>
        <div class="articles-hero-decoration">
          <div class="floating-note note-1">♪</div>
          <div class="floating-note note-2">♫</div>
          <div class="floating-note note-3">♬</div>
        </div>
      </section>

      <Show when={!articles.loading} fallback={
        <div class="articles-loading">
          <div class="loading-pulse" />
          <p>Loading articles...</p>
        </div>
      }>
        {/* Articles Grid - Two Column Horizontal Cards */}
        <section class="articles-grid-section">
          <div class="articles-grid-two-column">
            <For each={articles()}>
              {(article) => (
                <a 
                  href={`/articles/${article.slug}`} 
                  class="article-card-horizontal"
                >
                  <div class="article-image-wrapper">
                    <img 
                      src={article.cover_image} 
                      alt={article.title}
                      class="article-image-horizontal"
                    />
                  </div>
                  <div class="article-content-horizontal">
                    <h3 class="article-title-horizontal">{article.title}</h3>
                    <span class="article-badge">{article.category}</span>
                    <p class="article-excerpt-horizontal">{article.excerpt}</p>
                  </div>
                </a>
              )}
            </For>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section class="articles-newsletter">
          <div class="newsletter-content">
            <div class="newsletter-icon">📬</div>
            <h2>Stay in the loop</h2>
            <p>Get the latest production tips, new sample pack releases, and exclusive content delivered to your inbox.</p>
            <form class="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="your@email.com" 
                class="newsletter-input"
              />
              <button type="submit" class="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </section>
      </Show>
    </main>
  );
}


