import Home from "@/app/page";
import { formatTitleCase, getCanonicalUrl, getLocalBusinessSchema } from "@/lib/seo-helpers";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const districtName = formatTitleCase(district);
  const canonicalUrl = getCanonicalUrl(`/${district}`);

  return {
    title: `Biomedical Equipment Supplier in ${districtName} | Human Biomedical`,
    description: `Leading biomedical and laboratory equipment supplier in ${districtName}. Premium hematology cell counters, biochemistry analyzers, and pathology instruments.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Biomedical Equipment Supplier in ${districtName}`,
      description: `Trusted diagnostic and laboratory equipment supplier serving healthcare facilities in ${districtName}.`,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function DistrictPage({ params }) {
  const { district = "jaipur" } = await params;
  const city = formatTitleCase(district);
  const localSchema = getLocalBusinessSchema(city);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <Home city={city} />
    </>
  );
}