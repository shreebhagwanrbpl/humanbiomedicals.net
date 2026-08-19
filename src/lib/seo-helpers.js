/**
 * Technical SEO Helpers for Human Biomedical
 * Provides standardized metadata formatting, canonical generation, and JSON-LD structured schemas.
 */

const BASE_URL = "https://humanbiomedicals.net";

/**
 * Clean & Format Text
 */
export function formatTitleCase(str = "") {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/**
 * Generate Canonical URL
 */
export function getCanonicalUrl(path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${cleanPath === "/" ? "" : cleanPath}`;
}

/**
 * Build Organization JSON-LD Schema
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Human Biomedical",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "Premier supplier and distributor of biomedical equipment, pathology laboratory instruments, hematology analyzers, and biochemistry systems across India.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "F-4, 1st Floor, Plot No. 16, D-Block Tagore Nagar, 200 Feet Bypass Rd",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302021",
      addressCountry: "IN",
    },
    telephone: ["+91 9983123469", "+91 9983333489"],
    email: "rajbiosis@yahoo.in",
    priceRange: "₹₹",
    openingHours: "Mo-Sa 09:00-19:00",
  };
}

/**
 * Build Location / LocalBusiness Schema
 */
export function getLocalBusinessSchema(districtName = "") {
  const org = getOrganizationSchema();
  if (!districtName) return org;

  return {
    "@context": "https://schema.org",
    "@type": "MedicalEquipmentSupplier",
    name: `Human Biomedical - ${districtName}`,
    url: getCanonicalUrl(`/${districtName.toLowerCase().replace(/\s+/g, "-")}`),
    logo: `${BASE_URL}/logo.png`,
    description: `Biomedical equipment, laboratory instruments, and diagnostic analyzer supplier serving ${districtName} and nearby healthcare facilities.`,
    areaServed: {
      "@type": "AdministrativeArea",
      name: districtName,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: districtName,
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    telephone: ["+91 9983123469", "+91 9983333489"],
    email: "rajbiosis@yahoo.in",
    parentOrganization: {
      "@type": "MedicalBusiness",
      name: "Human Biomedical",
      url: BASE_URL,
    },
  };
}

/**
 * Build Product Schema JSON-LD
 */
export function getProductSchema(product, district = null) {
  if (!product) return null;

  const title = product.title || "Biomedical Equipment";
  const brand = product.brand || "Human Biomedical";
  const model = product.model || "";
  const slug = product.slug || "";
  const imageUrl = product.images?.[0] || product.image || `${BASE_URL}/logo.png`;
  const absoluteImageUrl = imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`;
  const canonicalUrl = getCanonicalUrl(`/items/${slug}`);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    image: [absoluteImageUrl],
    description:
      product.description ||
      product.desc ||
      `High precision ${title} supplied by Human Biomedical for hospitals, diagnostic centers, and laboratory research.`,
    category: product.category || "Biomedical Equipment",
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "MedicalBusiness",
        name: "Human Biomedical",
        url: BASE_URL,
      },
    },
  };

  if (model) {
    schema.mpn = model;
    schema.model = model;
  }

  if (district) {
    const districtName = formatTitleCase(district);
    schema.areaServed = districtName;
  }

  return schema;
}

/**
 * Build BreadcrumbList Schema JSON-LD
 */
export function getBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}
