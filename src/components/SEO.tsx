import { Title, Meta, Link } from "@solidjs/meta";

// Base URL - update when you have a custom domain
const BASE_URL = "https://website-solidstart.pages.dev";
const SITE_NAME = "TRNDFY";
// Using a high-quality Unsplash image as default OG image until you create a custom one
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=630&fit=crop";
const LOGO_URL = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop";

export interface SEOProps {
  title: string;
  description: string;
  /** Canonical URL path (e.g., "/about" or "/articles/my-post") */
  path?: string;
  /** Open Graph image URL */
  image?: string;
  /** Content type: "website" | "article" | "product" */
  type?: "website" | "article" | "product";
  /** For articles: publish date */
  publishedTime?: string;
  /** For articles: author name */
  author?: string;
  /** For products: price in USD */
  price?: number;
  /** Prevent indexing (for private pages) */
  noindex?: boolean;
  /** Additional keywords */
  keywords?: string[];
}

/**
 * Comprehensive SEO component for TRNDFY
 * Handles: Title, Meta Description, Open Graph, Twitter Cards, Canonical URLs
 * 
 * Usage:
 * <SEO 
 *   title="Hip Hop Sample Packs" 
 *   description="Download royalty-free hip hop samples..."
 *   path="/sample-packs/hip-hop"
 * />
 */
export default function SEO(props: SEOProps) {
  const fullTitle = () => 
    props.title.includes(SITE_NAME) 
      ? props.title 
      : `${props.title} | ${SITE_NAME}`;
  
  const canonicalUrl = () => 
    props.path ? `${BASE_URL}${props.path}` : BASE_URL;
  
  const ogImage = () => props.image || DEFAULT_IMAGE;
  const ogType = () => props.type || "website";

  return (
    <>
      {/* Primary Meta Tags */}
      <Title>{fullTitle()}</Title>
      <Meta name="description" content={props.description} />
      
      {/* Canonical URL */}
      <Link rel="canonical" href={canonicalUrl()} />
      
      {/* Robots */}
      {props.noindex ? (
        <Meta name="robots" content="noindex, nofollow" />
      ) : (
        <Meta name="robots" content="index, follow" />
      )}
      
      {/* Keywords (less important now but still used) */}
      {props.keywords && props.keywords.length > 0 && (
        <Meta name="keywords" content={props.keywords.join(", ")} />
      )}

      {/* Open Graph / Facebook */}
      <Meta property="og:type" content={ogType()} />
      <Meta property="og:url" content={canonicalUrl()} />
      <Meta property="og:title" content={fullTitle()} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:image" content={ogImage()} />
      <Meta property="og:site_name" content={SITE_NAME} />
      <Meta property="og:locale" content="en_US" />
      
      {/* Article-specific Open Graph */}
      {props.type === "article" && props.publishedTime && (
        <Meta property="article:published_time" content={props.publishedTime} />
      )}
      {props.type === "article" && props.author && (
        <Meta property="article:author" content={props.author} />
      )}
      
      {/* Product-specific Open Graph */}
      {props.type === "product" && props.price && (
        <>
          <Meta property="product:price:amount" content={props.price.toString()} />
          <Meta property="product:price:currency" content="USD" />
        </>
      )}

      {/* Twitter Card */}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:url" content={canonicalUrl()} />
      <Meta name="twitter:title" content={fullTitle()} />
      <Meta name="twitter:description" content={props.description} />
      <Meta name="twitter:image" content={ogImage()} />
      {/* Add your Twitter handle when you have one */}
      {/* <Meta name="twitter:site" content="@TRNDFY" /> */}
      {/* <Meta name="twitter:creator" content="@TRNDFY" /> */}
    </>
  );
}

/**
 * Schema.org JSON-LD component for structured data
 */
export interface SchemaOrgProps {
  type: "Organization" | "WebSite" | "Product" | "Article" | "FAQPage" | "BreadcrumbList";
  data: Record<string, unknown>;
}

export function SchemaOrg(props: SchemaOrgProps) {
  const jsonLd = () => JSON.stringify({
    "@context": "https://schema.org",
    "@type": props.type,
    ...props.data,
  });

  // Use a workaround for script innerHTML in SolidJS
  return (
    <script 
      type="application/ld+json" 
      textContent={jsonLd()} 
    />
  );
}

/**
 * Pre-built Schema.org for Organization (use on homepage)
 */
export function OrganizationSchema() {
  return (
    <SchemaOrg
      type="Organization"
      data={{
        name: "TRNDFY",
        url: BASE_URL,
        logo: LOGO_URL,
        description: "Premium royalty-free sample packs inspired by trending Spotify songs. Professional audio samples for music producers.",
        sameAs: [
          // Add your social media URLs when you have them
          // "https://twitter.com/TRNDFY",
          // "https://instagram.com/TRNDFY",
          // "https://youtube.com/TRNDFY",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "vaidas@coded.ws",
        },
      }}
    />
  );
}

/**
 * Pre-built Schema.org for WebSite with SearchAction (use on homepage)
 */
export function WebSiteSchema() {
  return (
    <SchemaOrg
      type="WebSite"
      data={{
        name: "TRNDFY",
        url: BASE_URL,
        description: "Premium royalty-free sample packs inspired by trending Spotify songs.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${BASE_URL}/sample-packs?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

/**
 * Product Schema for sample packs
 */
export interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  url: string;
}

export function ProductSchema(props: ProductSchemaProps) {
  return (
    <SchemaOrg
      type="Product"
      data={{
        name: props.name,
        description: props.description,
        image: props.image,
        category: props.category,
        url: props.url,
        brand: {
          "@type": "Brand",
          name: "TRNDFY",
        },
        offers: {
          "@type": "Offer",
          price: props.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "TRNDFY",
          },
        },
      }}
    />
  );
}

/**
 * Article Schema for blog posts
 */
export interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
}

export function ArticleSchema(props: ArticleSchemaProps) {
  return (
    <SchemaOrg
      type="Article"
      data={{
        headline: props.headline,
        description: props.description,
        image: props.image,
        datePublished: props.datePublished,
        dateModified: props.dateModified || props.datePublished,
        author: {
          "@type": "Person",
          name: props.authorName,
        },
        publisher: {
          "@type": "Organization",
          name: "TRNDFY",
          logo: {
            "@type": "ImageObject",
            url: LOGO_URL,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": props.url,
        },
      }}
    />
  );
}

/**
 * Breadcrumb Schema
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema(props: { items: BreadcrumbItem[] }) {
  return (
    <SchemaOrg
      type="BreadcrumbList"
      data={{
        itemListElement: props.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

/**
 * FAQ Schema
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema(props: { items: FAQItem[] }) {
  return (
    <SchemaOrg
      type="FAQPage"
      data={{
        mainEntity: props.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

