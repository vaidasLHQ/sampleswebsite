import { Title } from "@solidjs/meta";
import { createResource, For, Show } from "solid-js";
import { getArticles, type Article } from "~/lib/articles";

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
      <Title>Articles - SampleVault</Title>
      
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
        {/* Featured Article - Full Width Showcase */}
        <Show when={featuredArticle()}>
          <section class="featured-article">
            <a href={`/articles/${featuredArticle()!.slug}`} class="featured-link">
              <div class="featured-image-container">
                <img 
                  src={featuredArticle()!.cover_image} 
                  alt={featuredArticle()!.title}
                  class="featured-image"
                />
                <div class="featured-overlay" />
                <span class="featured-badge">Featured</span>
              </div>
              <div class="featured-content">
                <div class="featured-meta">
                  <span class="article-category">{featuredArticle()!.category}</span>
                  <span class="article-dot">·</span>
                  <span class="article-read-time">{featuredArticle()!.read_time} min read</span>
                </div>
                <h2 class="featured-title">{featuredArticle()!.title}</h2>
                <p class="featured-excerpt">{featuredArticle()!.excerpt}</p>
                <div class="featured-author">
                  <img 
                    src={featuredArticle()!.author_avatar} 
                    alt={featuredArticle()!.author_name}
                    class="author-avatar"
                  />
                  <div class="author-info">
                    <span class="author-name">{featuredArticle()!.author_name}</span>
                    <span class="article-date">{formatDate(featuredArticle()!.created_at)}</span>
                  </div>
                </div>
              </div>
            </a>
          </section>
        </Show>

        {/* Articles Grid - Magazine Style */}
        <section class="articles-grid-section">
          <div class="articles-grid">
            <For each={otherArticles()}>
              {(article, index) => (
                <a 
                  href={`/articles/${article.slug}`} 
                  class={`article-card ${index() === 0 ? 'article-card-large' : ''}`}
                >
                  <div class="article-image-container">
                    <img 
                      src={article.cover_image} 
                      alt={article.title}
                      class="article-image"
                    />
                    <div class="article-image-overlay" />
                    <span class="article-category-tag">{article.category}</span>
                  </div>
                  <div class="article-content">
                    <div class="article-meta-row">
                      <span class="article-read-time">{article.read_time} min read</span>
                      <span class="article-date">{formatDate(article.created_at)}</span>
                    </div>
                    <h3 class="article-title">{article.title}</h3>
                    <p class="article-excerpt">{article.excerpt}</p>
                    <div class="article-author">
                      <img 
                        src={article.author_avatar} 
                        alt={article.author_name}
                        class="author-avatar-small"
                      />
                      <span class="author-name-small">{article.author_name}</span>
                    </div>
                  </div>
                  <div class="article-hover-line" />
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

