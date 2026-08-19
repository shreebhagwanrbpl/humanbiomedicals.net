import ProductsPage from "@/app/items/page";
import { getCanonicalUrl } from "@/lib/seo-helpers";

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