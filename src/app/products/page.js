import ProductsPage from "@/app/items/page";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function generateMetadata() {
  const canonicalUrl = getCanonicalUrl("/items");
  return {
    title: "Biomedical & Diagnostic Equipment Catalog | Human Biomedical",
    description: "Browse our complete catalog of hematology cell counters, biochemistry analyzers, electrolyte units, and pathology laboratory equipment.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function RedirectProductsPage(props) {
  return <ProductsPage {...props} />;
}
