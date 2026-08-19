import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "./ProductsClient";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const revalidate = 3600; // Revalidate cache every hour

export async function generateMetadata() {
  const canonicalUrl = getCanonicalUrl("/items");
  return {
    title: "Biomedical Equipment Catalog | Hematology & Biochemistry Analyzers | Human Biomedical",
    description: "Explore advanced 3-Part & 5-Part hematology analyzers, biochemistry systems, electrolyte analyzers, and pathology equipment supplied across India.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Biomedical Equipment Catalog | Human Biomedical",
      description: "Premier supplier of laboratory analyzers, medical equipment, and diagnostic consumables across India.",
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function ProductsPage({ district = null, city = null }) {
  // Fetch full catalog from server cache
  const allProducts = await fetchFullCatalog();

  return (
    <ProductsClient
      initialProducts={allProducts}
      district={district}
      city={city}
    />
  );
}