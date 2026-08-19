import { formatTitleCase } from "@/lib/seo-helpers";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const districtName = formatTitleCase(district);

  return {
    title: {
      default: `Biomedical & Diagnostic Equipment Supplier in ${districtName} | Human Biomedical`,
      template: `%s | ${districtName} | Human Biomedical`,
    },
    description: `Human Biomedical supplies diagnostic machines, laboratory equipment, reagents and biomedical products in ${districtName}.`,
    keywords: [
      `Biomedical Equipment ${districtName}`,
      `Diagnostic Machines ${districtName}`,
      `Laboratory Equipment ${districtName}`,
      `Pathology Equipment ${districtName}`,
      `Biomedical Supplier ${districtName}`,
    ],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Biomedical Equipment in ${districtName}`,
      description: `Diagnostic laboratory equipment supplier in ${districtName}.`,
      type: "website",
    },
  };
}

export default function DistrictLayout({ children }) {
  return children;
}