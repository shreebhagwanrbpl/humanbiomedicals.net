import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { fetchDistricts } from "@/lib/admin-api";
import { isEligibleForSitemap } from "@/lib/seo-quality";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap() {
  const baseUrl = "https://humanbiomedicals.net";
  const urls = [];
  const now = new Date();

  // Static Core Canonical Pages (Highest Priority)
  urls.push(
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/items`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }
  );

  try {
    // 1. Fetch & Include Valid Canonical Products
    const products = await fetchFullCatalog();
    const processedSlugs = new Set();

    products.forEach((product) => {
      const slug = product.slug;
      if (!slug || processedSlugs.has(slug)) return;
      processedSlugs.add(slug);

      // Quality Gate Verification
      const isQualityPass = isEligibleForSitemap({
        title: product.title,
        description: product.description || product.desc,
        content: `${product.title} ${product.brand || ""} ${product.description || ""}`,
        hasCanonical: true,
        hasImages: true,
        hasInternalLinks: true,
        isPublished: product.isPublished !== false,
      });

      if (isQualityPass) {
        urls.push({
          url: `${baseUrl}/items/${slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        });
      }
    });

    // 2. Fetch & Include Serviceable District Hub Pages from SQLite Admin API
    const districts = await fetchDistricts();
    districts.forEach((docData) => {
      const slug = docData.slug || docData.id || docData.district;
      if (!slug) return;

      urls.push({
        url: `${baseUrl}/${slug.toLowerCase().replace(/\s+/g, "-")}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error("Sitemap Generation Error:", error);
  }

  return urls;
}