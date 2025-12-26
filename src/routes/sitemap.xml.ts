import { APIEvent } from "@solidjs/start/server";
import { samples, sampleCategories } from "~/data/samples";
import { getMockArticles } from "~/lib/articles";

// Base URL - update this when you have a custom domain
const BASE_URL = "https://website-solidstart.pages.dev";

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map((url) => {
      let entry = `  <url>\n    <loc>${url.loc}</loc>`;
      if (url.lastmod) {
        entry += `\n    <lastmod>${url.lastmod}</lastmod>`;
      }
      if (url.changefreq) {
        entry += `\n    <changefreq>${url.changefreq}</changefreq>`;
      }
      if (url.priority !== undefined) {
        entry += `\n    <priority>${url.priority.toFixed(1)}</priority>`;
      }
      entry += `\n  </url>`;
      return entry;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export async function GET({ request }: APIEvent) {
  const today = new Date().toISOString().split("T")[0];
  
  const urls: SitemapUrl[] = [];

  // Static pages
  urls.push({
    loc: BASE_URL,
    lastmod: today,
    changefreq: "daily",
    priority: 1.0,
  });

  urls.push({
    loc: `${BASE_URL}/about`,
    lastmod: today,
    changefreq: "monthly",
    priority: 0.6,
  });

  urls.push({
    loc: `${BASE_URL}/browse`,
    lastmod: today,
    changefreq: "daily",
    priority: 0.9,
  });

  urls.push({
    loc: `${BASE_URL}/articles`,
    lastmod: today,
    changefreq: "weekly",
    priority: 0.8,
  });

  // Legal pages
  urls.push({
    loc: `${BASE_URL}/license`,
    lastmod: today,
    changefreq: "monthly",
    priority: 0.5,
  });

  urls.push({
    loc: `${BASE_URL}/terms`,
    lastmod: today,
    changefreq: "monthly",
    priority: 0.4,
  });

  urls.push({
    loc: `${BASE_URL}/privacy`,
    lastmod: today,
    changefreq: "monthly",
    priority: 0.4,
  });

  urls.push({
    loc: `${BASE_URL}/faq`,
    lastmod: today,
    changefreq: "weekly",
    priority: 0.6,
  });

  urls.push({
    loc: `${BASE_URL}/contact`,
    lastmod: today,
    changefreq: "monthly",
    priority: 0.5,
  });

  // Category pages (these will be created - add them to sitemap for future)
  const categories = sampleCategories.filter(c => c !== "All");
  for (const category of categories) {
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    urls.push({
      loc: `${BASE_URL}/sample-packs/${slug}`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.8,
    });
  }

  // Individual sample pack pages (when created)
  const uniquePacks = new Map<number, typeof samples[0]>();
  for (const sample of samples) {
    if (!uniquePacks.has(sample.packId)) {
      uniquePacks.set(sample.packId, sample);
    }
  }
  
  for (const [_, sample] of uniquePacks) {
    const slug = sample.packName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    urls.push({
      loc: `${BASE_URL}/sample-packs/${slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.7,
    });
  }

  // Articles
  const articles = getMockArticles();
  for (const article of articles) {
    urls.push({
      loc: `${BASE_URL}/articles/${article.slug}`,
      lastmod: article.created_at.split("T")[0],
      changefreq: "monthly",
      priority: 0.7,
    });
  }

  const sitemap = generateSitemapXml(urls);

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
}

