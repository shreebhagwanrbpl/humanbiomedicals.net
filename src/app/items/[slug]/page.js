import Link from "next/link";
import ProductDetails from "./ProductDetails";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import {
  formatTitleCase,
  getCanonicalUrl,
  getProductSchema,
  getBreadcrumbSchema,
} from "@/lib/seo-helpers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const catalog = await fetchFullCatalog();
  const product = catalog.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return {
      title: "Product Not Found | Human Biomedical",
      description: "The requested medical equipment is currently unavailable in our catalog.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productName = product?.title || formatTitleCase(slug);
  const brandName = product?.brand ? `${product.brand} ` : "";
  const title = `${brandName}${productName} Supplier in India | Price & Quotation | Human Biomedical`;
  const description =
    product?.description ||
    product?.desc ||
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
  const product = catalog.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-slate-50">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-2xl mb-4 font-bold">
          !
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h1>
        <p className="text-slate-600 max-w-md mb-6 text-sm">
          The product you are looking for may have been removed, unassigned, or is temporarily unavailable.
        </p>
        <Link
          href="/items"
          className="bg-[#00B7A0] hover:bg-[#009b88] text-white px-6 py-2.5 rounded-xl font-medium transition shadow-sm text-sm"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

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
      <ProductDetails slug={slug} initialProduct={product} />
    </>
  );
}