import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { isEligibleForSitemap } from "@/lib/seo-quality";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

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

    // 2. Fetch & Include Serviceable District Hub Pages
    const districtSnap = await getDocs(
      collection(db, "websites", "humanbiomedicalsnet", "districts")
    );

    districtSnap.docs.forEach((docSnap) => {
      const data = docSnap.data();
      const slug = data.slug || docSnap.id;
      if (!slug) return;

      urls.push({
        url: `${baseUrl}/${slug}`,
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