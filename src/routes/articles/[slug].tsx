import { createResource, Show, Suspense } from "solid-js";
import { useParams, A } from "@solidjs/router";
import { Title, Meta } from "@solidjs/meta";
import { getArticleBySlug } from "~/lib/articles";
import SEO, { ArticleSchema, BreadcrumbSchema } from "~/components/SEO";

export default function ArticleDetail() {
  const params = useParams();
  const [article] = createResource(() => params.slug, getArticleBySlug);
  
  // Format slug for default title (e.g., "808-programming-guide" -> "808 Programming Guide")
  const defaultTitle = () => {
    return params.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <main>
      {/* Default SEO that renders immediately for crawlers */}
      <Show when={!article()}>
        <Title>{defaultTitle()} | TRNDFY</Title>
        <Meta name="description" content={`Read our article about ${defaultTitle()}. Music production tips, tutorials, and insights from TRNDFY.`} />
      </Show>

      <Show when={article.loading}>
        <div class="article-loading">
          <div class="loading-pulse" />
          <p>Loading article...</p>
        </div>
      </Show>

      <Show when={article.error}>
        <div class="article-error">
          <h1>Article not found</h1>
          <p>Sorry, we couldn't find the article you're looking for.</p>
          <A href="/articles" class="btn btn-primary">Back to Articles</A>
        </div>
      </Show>

      <Show when={article()}>
        {/* SEO Meta Tags - replaces default when article loads */}
        <SEO 
          title={article()!.title}
          description={article()!.excerpt}
          path={`/articles/${article()!.slug}`}
          image={article()!.cover_image}
          type="article"
          publishedTime={article()!.created_at}
          author={article()!.author_name}
          keywords={[article()!.category, "music production", "tutorial", "sample packs"]}
        />
        
        {/* Article Schema */}
        <ArticleSchema 
          headline={article()!.title}
          description={article()!.excerpt}
          image={article()!.cover_image}
          datePublished={article()!.created_at}
          authorName={article()!.author_name}
          url={`https://website-solidstart.pages.dev/articles/${article()!.slug}`}
        />
        
        {/* Breadcrumb Schema */}
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://website-solidstart.pages.dev" },
          { name: "Articles", url: "https://website-solidstart.pages.dev/articles" },
          { name: article()!.title, url: `https://website-solidstart.pages.dev/articles/${article()!.slug}` }
        ]} />
        
        {/* Article Header */}
        <article class="article-detail">
          <header class="article-header">
            <A href="/articles" class="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Back to Articles
            </A>
            
            <div class="article-header-meta">
              <span class="article-category-badge">{article()!.category}</span>
              <span class="article-dot">·</span>
              <span>{article()!.read_time} min read</span>
            </div>
            
            <h1 class="article-detail-title">{article()!.title}</h1>
            
            <p class="article-detail-excerpt">{article()!.excerpt}</p>
            
            <div class="article-detail-author">
              <img 
                src={article()!.author_avatar} 
                alt={article()!.author_name}
                class="author-avatar-large"
              />
              <div class="author-details">
                <span class="author-name-large">{article()!.author_name}</span>
                <span class="article-date-large">{formatDate(article()!.created_at)}</span>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div class="article-cover">
            <img 
              src={article()!.cover_image} 
              alt={article()!.title}
              class="article-cover-image"
            />
          </div>

          {/* Article Content */}
          <div class="article-body" innerHTML={parseMarkdown(article()!.content)} />

          {/* Article Footer */}
          <footer class="article-footer">
            <div class="article-tags">
              <span class="tag">{article()!.category}</span>
              <span class="tag">Music Production</span>
              <span class="tag">Tutorial</span>
            </div>
            
            <div class="article-share">
              <span>Share this article</span>
              <div class="share-buttons">
                <button class="share-btn" aria-label="Share on Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button class="share-btn" aria-label="Share on LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button class="share-btn" aria-label="Copy link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </button>
              </div>
            </div>
          </footer>

          {/* Read More CTA */}
          <div class="read-more-section">
            <h3>Keep learning</h3>
            <p>Explore more articles on music production, mixing, and sound design.</p>
            <A href="/articles" class="btn btn-primary btn-large">View All Articles</A>
          </div>
        </article>
      </Show>
    </main>
  );
}

// Simple markdown parser for article content
function parseMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Code blocks
    .replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // Line breaks
    .replace(/\n\n/gim, '</p><p>')
    // Wrap in paragraphs
    .replace(/^(.+)$/gim, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/gim, '')
    .replace(/<p>(<h[1-6]>)/gim, '$1')
    .replace(/(<\/h[1-6]>)<\/p>/gim, '$1')
    .replace(/<p>(<pre>)/gim, '$1')
    .replace(/(<\/pre>)<\/p>/gim, '$1');
}


