import Link from "next/link";
import ProductDetails from "../../../items/[slug]/ProductDetails";
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
  const { slug, district } = await params;
  const catalog = await fetchFullCatalog();
  const product = catalog.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return {
      title: "Product Not Found | Human Biomedical",
      description: "The requested medical equipment is currently unavailable.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

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
  const product = catalog.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-slate-50">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-2xl mb-4 font-bold">
          !
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h1>
        <p className="text-slate-600 max-w-md mb-6 text-sm">
          The product you are looking for may have been removed or is temporarily unavailable.
        </p>
        <Link
          href={`/${district}/items`}
          className="bg-[#00B7A0] hover:bg-[#009b88] text-white px-6 py-2.5 rounded-xl font-medium transition shadow-sm text-sm"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

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
      <ProductDetails slug={slug} district={district} initialProduct={product} />
    </>
  );
}