import ProductDetails from "./ProductDetails";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import {
  formatTitleCase,
  getCanonicalUrl,
  getProductSchema,
  getBreadcrumbSchema,
} from "@/lib/seo-helpers";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const catalog = await fetchFullCatalog();
  const product = catalog.find((p) => p.slug === slug);

  const productName = product?.title || formatTitleCase(slug);
  const brandName = product?.brand ? `${product.brand} ` : "";
  const title = `${brandName}${productName} Supplier in India | Price & Quotation | Human Biomedical`;
  const description =
    product?.description ||
    `Buy ${brandName}${productName} at best price in India. Authorised supplier, dealer, and distributor for pathology labs, hospitals, and diagnostic centers.`;
  const canonicalUrl = getCanonicalUrl(`/items/${slug}`);

  return {
    title,
    description,
    keywords: [
      productName,
      `${productName} Supplier`,
      `${productName} Dealer`,
      `${productName} Distributor`,
      `${productName} Price India`,
      `${productName} Laboratory Equipment`,
      "Biomedical Equipment Supplier India",
      "Human Biomedical",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Human Biomedical",
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const catalog = await fetchFullCatalog();
  const product = catalog.find((p) => p.slug === slug);

  const productName = product?.title || formatTitleCase(slug);

  const productSchema = getProductSchema(product || { title: productName, slug });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Products", path: "/items" },
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
      <ProductDetails slug={slug} />
    </>
  );
}