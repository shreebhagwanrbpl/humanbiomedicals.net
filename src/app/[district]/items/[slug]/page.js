import ProductDetails from "../../../items/[slug]/ProductDetails";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import {
  formatTitleCase,
  getCanonicalUrl,
  getProductSchema,
  getBreadcrumbSchema,
} from "@/lib/seo-helpers";

export async function generateMetadata({ params }) {
  const { slug, district } = await params;
  const catalog = await fetchFullCatalog();
  const product = catalog.find((p) => p.slug === slug);

  const productName = product?.title || formatTitleCase(slug);
  const districtName = formatTitleCase(district);
  const title = `${productName} Supplier in ${districtName} | Human Biomedical`;
  const description = `Buy ${productName} in ${districtName}. Authorised biomedical equipment dealer, distributor and service provider in ${districtName}, Rajasthan. Contact for price quote and installation details.`;
  // Canonical URL points to the main authoritative product page to prevent duplicate content issues
  const canonicalUrl = getCanonicalUrl(`/items/${slug}`);

  return {
    title,
    description,
    keywords: [
      `${productName} ${districtName}`,
      `${productName} Supplier ${districtName}`,
      `${productName} Dealer ${districtName}`,
      `Biomedical Equipment ${districtName}`,
      "Human Biomedical",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const { slug, district } = await params;
  const catalog = await fetchFullCatalog();
  const product = catalog.find((p) => p.slug === slug);

  const productName = product?.title || formatTitleCase(slug);
  const districtName = formatTitleCase(district);

  const productSchema = getProductSchema(product || { title: productName, slug }, districtName);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: districtName, path: `/${district}` },
    { name: "Products", path: `/${district}/items` },
    { name: productName, path: `/items/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetails slug={slug} district={district} />
    </>
  );
}