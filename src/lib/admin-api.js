/**
 * SQLite Admin API Client
 * Replaces Firebase Firestore with direct connection to the SQLite Admin backend.
 */

export const ADMIN_API_BASE_URL =
  process.env.ADMIN_API_BASE_URL ||
  process.env.ADMIN_API_URL ||
  process.env.SQLITE_ADMIN_API_URL ||
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  process.env.NEXT_PUBLIC_ADMIN_API_URL ||
  "https://admin.rajbiosis.app";

export const WEBSITE_ID =
  process.env.WEBSITE_ID ||
  process.env.NEXT_PUBLIC_WEBSITE_ID ||
  "humanbiomedicalsnet";

export const COMPANY_ID =
  process.env.COMPANY_ID ||
  process.env.NEXT_PUBLIC_COMPANY_ID ||
  "human";

const SITE_WEBSITE_IDS = [WEBSITE_ID, "humanbiomedicals.net", "all"];

export const makeSlug = (text = "") =>
  String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

/**
 * Check if an item (product, category, subcategory) is visible on this website
 */
export function isVisibleOnSite(item) {
  if (!item) return false;
  if (item.isPublished === false) return false;
  const websiteIds = Array.isArray(item.websiteIds)
    ? item.websiteIds
    : item.websiteIds
    ? [item.websiteIds]
    : [];

  if (websiteIds.length === 0) return true;
  return websiteIds.some((site) => SITE_WEBSITE_IDS.includes(site));
}

/**
 * Standardize product object formatting across all sources
 */
export function formatProduct(item, categoryName = "", subCategoryName = "", defaultSource = "master") {
  if (!item) return null;

  const rawTitle = item.title || item.name || "Untitled Product";
  const slug = item.slug || makeSlug(rawTitle);
  const images = Array.isArray(item.images)
    ? item.images.filter(Boolean)
    : item.image
    ? [item.image]
    : [];
  const primaryImage = images[0] || item.image || "";

  const catName = item.category || categoryName || "Other Products";
  const subCatName = item.subCategory || item.subcategory || subCategoryName || catName;

  return {
    ...item,
    id: item.id || item.categoryProductId || item.productId || slug,
    categoryProductId: item.categoryProductId || item.productId || item.id || "",
    productId: item.productId || item.categoryProductId || item.id || "",
    title: rawTitle,
    name: rawTitle,
    slug,
    price: item.price ? String(item.price) : "",
    desc: item.desc || item.description || "",
    description: item.description || item.desc || "",
    brand: item.brand || "",
    model: item.model || "",
    capacity: item.capacity || "",
    throughput: item.throughput || "",
    instrument: item.instrument || "",
    usage: item.usage || "",
    parameters: item.parameters || "",
    automation: item.automation || "",
    availability: item.availability || "",
    size: item.size || "",
    category: catName,
    subCategory: subCatName,
    categoryId: item.categoryId || makeSlug(catName),
    subcategoryId: item.subcategoryId || makeSlug(subCatName),
    images,
    image: primaryImage,
    video: item.video || "",
    pdf: item.pdf || "",
    isPublished: item.isPublished !== false,
    websiteIds: Array.isArray(item.websiteIds) ? item.websiteIds : ["all"],
    source: defaultSource,
  };
}

/**
 * Helper to fetch a single document from SQLite Admin API
 */
export async function fetchDoc(path) {
  if (!path) return null;
  const cleanPath = String(path).split("/").filter(Boolean).join("/");
  const url = `${ADMIN_API_BASE_URL}/api/local-firestore?op=get&path=${encodeURIComponent(cleanPath)}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { Pragma: "no-cache" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.exists && json?.data ? json.data : null;
  } catch (err) {
    console.error(`[admin-api] Error fetching doc at ${cleanPath}:`, err.message);
    return null;
  }
}

/**
 * Helper to fetch a collection from SQLite Admin API
 */
export async function fetchCollection(path, constraints = {}) {
  if (!path) return [];
  const cleanPath = String(path).split("/").filter(Boolean).join("/");
  const filters = constraints.filters || [];
  const order = constraints.order || [];
  const limit = constraints.limit;

  let url = `${ADMIN_API_BASE_URL}/api/local-firestore?op=collection&path=${encodeURIComponent(cleanPath)}&filters=${encodeURIComponent(
    JSON.stringify(filters)
  )}&order=${encodeURIComponent(JSON.stringify(order))}`;

  if (limit) {
    url += `&limit=${encodeURIComponent(limit)}`;
  }

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { Pragma: "no-cache" },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.docs) ? json.docs : [];
  } catch (err) {
    console.error(`[admin-api] Error fetching collection at ${cleanPath}:`, err.message);
    return [];
  }
}

/**
 * Helper to save a document or query into SQLite Admin API
 */
export async function saveDoc(path, data, merge = true) {
  if (!path) throw new Error("Path is required");
  const cleanPath = String(path).split("/").filter(Boolean).join("/");
  const url = `${ADMIN_API_BASE_URL}/api/local-firestore`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      op: "set",
      path: cleanPath,
      data,
      merge: Boolean(merge),
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to save document to ${cleanPath}: ${errText}`);
  }

  return res.json();
}

/**
 * Submit Contact Query
 */
export async function submitContactQuery(queryData) {
  const queryId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `cq_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  const path = `websitesQueries/${WEBSITE_ID}/contactQueries/${queryId}`;
  const payload = {
    ...queryData,
    websiteId: WEBSITE_ID,
    createdAt: new Date().toISOString(),
    id: queryId,
  };

  return saveDoc(path, payload, false);
}

/**
 * Submit Product Query
 */
export async function submitProductQuery(queryData) {
  const queryId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `pq_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  const path = `websitesQueries/${WEBSITE_ID}/productQueries/${queryId}`;
  const payload = {
    ...queryData,
    websiteId: WEBSITE_ID,
    createdAt: new Date().toISOString(),
    id: queryId,
  };

  return saveDoc(path, payload, false);
}

/**
 * Fetch Full Multi-source Catalog from SQLite Admin API
 */
export async function fetchFullCatalog() {
  const startTime = performance.now();
  const productsMap = new Map();

  try {
    // Attempt direct /api/catalog endpoint first
    try {
      const catUrl = `${ADMIN_API_BASE_URL}/api/catalog?websiteId=${encodeURIComponent(WEBSITE_ID)}`;
      const catRes = await fetch(catUrl, {
        cache: "no-store",
        headers: { Pragma: "no-cache" },
      });

      if (catRes.ok) {
        const catJson = await catRes.json();
        const rawProducts = Array.isArray(catJson.products)
          ? catJson.products
          : Array.isArray(catJson.data)
          ? catJson.data
          : [];

        if (rawProducts.length > 0) {
          rawProducts.forEach((p, idx) => {
            if (!isVisibleOnSite(p)) return;
            const formatted = formatProduct(p, p.category, p.subCategory, "admin-catalog");
            formatted.uid = formatted.uid || `admin-${formatted.slug || idx}`;
            const key = formatted.slug || formatted.id;
            if (!productsMap.has(key)) {
              productsMap.set(key, formatted);
            }
          });
        }
      }
    } catch (directErr) {
      console.warn("[admin-api] Direct /api/catalog fetch failed, falling back to multi-source queries:", directErr.message);
    }

    // Source 1: companies/human/categories (Central Master Catalog)
    try {
      const compCats = await fetchCollection(`companies/${COMPANY_ID}/categories`);
      await Promise.all(
        compCats.map(async (catItem) => {
          const catData = catItem.data || {};
          const catId = catItem.id || catData.id;
          const categoryName = catData.name || catData.category || catId;
          if (!isVisibleOnSite(catData)) return;

          // Fetch Subcategories under this category
          try {
            const subDocs = await fetchCollection(`companies/${COMPANY_ID}/categories/${catId}/subcategories`);
            subDocs.forEach((subDoc) => {
              const subData = subDoc.data || {};
              const subCategoryName = subData.name || subData.subCategory || subDoc.id;
              if (!isVisibleOnSite(subData)) return;

              const rawProds = Array.isArray(subData.products) ? subData.products : [];
              rawProds.forEach((p, idx) => {
                if (!isVisibleOnSite(p)) return;
                const formatted = formatProduct(p, categoryName, subCategoryName, "company-subcategory");
                formatted.uid = `comp-${catId}-${subDoc.id}-${p.id || idx}`;
                const key = formatted.slug || formatted.id;
                if (!productsMap.has(key)) {
                  productsMap.set(key, formatted);
                }
              });
            });
          } catch (subErr) {
            console.error(`Error fetching subcategories for companies/${COMPANY_ID}/categories/${catId}:`, subErr.message);
          }

          // Direct products under category
          if (Array.isArray(catData.products)) {
            catData.products.forEach((p, idx) => {
              if (!isVisibleOnSite(p)) return;
              const formatted = formatProduct(p, categoryName, categoryName, "company-category-direct");
              formatted.uid = `comp-${catId}-direct-${p.id || idx}`;
              const key = formatted.slug || formatted.id;
              if (!productsMap.has(key)) {
                productsMap.set(key, formatted);
              }
            });
          }
        })
      );
    } catch (compErr) {
      console.error(`Error fetching companies/${COMPANY_ID}/categories:`, compErr.message);
    }

    // Source 2: companies/human/products (Master standalone products)
    try {
      const compProds = await fetchCollection(`companies/${COMPANY_ID}/products`);
      compProds.forEach((pDoc) => {
        const pData = pDoc.data || {};
        if (!isVisibleOnSite(pData)) return;

        const formatted = formatProduct(pData, pData.category || "General", pData.subCategory || "General", "company-products");
        formatted.uid = `comp-prod-${pDoc.id}`;
        const key = formatted.slug || formatted.id;
        if (!productsMap.has(key)) {
          productsMap.set(key, formatted);
        }
      });
    } catch (prodsErr) {
      console.error(`Error fetching companies/${COMPANY_ID}/products:`, prodsErr.message);
    }

    // Source 3: websites/humanbiomedicalsnet/pages/categoryproducts/categories
    try {
      const webCats = await fetchCollection(`websites/${WEBSITE_ID}/pages/categoryproducts/categories`);
      await Promise.all(
        webCats.map(async (catItem) => {
          const catData = catItem.data || {};
          const catId = catItem.id || catData.id;
          const categoryName = catData.category || catData.name || catId;
          if (!isVisibleOnSite(catData)) return;

          try {
            const subDocs = await fetchCollection(
              `websites/${WEBSITE_ID}/pages/categoryproducts/categories/${catId}/subcategories`
            );
            subDocs.forEach((subDoc) => {
              const subData = subDoc.data || {};
              const subCategoryName = subData.subCategory || subData.name || subDoc.id;
              if (!isVisibleOnSite(subData)) return;

              const prods = Array.isArray(subData.products) ? subData.products : [];
              prods.forEach((p, idx) => {
                if (!isVisibleOnSite(p)) return;
                const formatted = formatProduct(p, categoryName, subCategoryName, "website-categoryproducts");
                formatted.uid = `web-${catId}-${subDoc.id}-${p.id || idx}`;
                const key = formatted.slug || formatted.id;
                if (!productsMap.has(key)) {
                  productsMap.set(key, formatted);
                }
              });
            });
          } catch (webSubErr) {
            console.error(`Error fetching subcategories for website category ${catId}:`, webSubErr.message);
          }

          if (Array.isArray(catData.products)) {
            catData.products.forEach((p, idx) => {
              if (!isVisibleOnSite(p)) return;
              const formatted = formatProduct(p, categoryName, categoryName, "website-category-direct");
              formatted.uid = `web-${catId}-direct-${p.id || idx}`;
              const key = formatted.slug || formatted.id;
              if (!productsMap.has(key)) {
                productsMap.set(key, formatted);
              }
            });
          }
        })
      );
    } catch (webCatsErr) {
      console.error("Error fetching website categoryproducts:", webCatsErr.message);
    }

    // Source 4: websites/humanbiomedicalsnet/pages/products (Legacy)
    try {
      const oldDoc = await fetchDoc(`websites/${WEBSITE_ID}/pages/products`);
      if (oldDoc && Array.isArray(oldDoc.products)) {
        oldDoc.products.forEach((p, idx) => {
          if (!isVisibleOnSite(p)) return;
          const formatted = formatProduct(p, "Other Products", "Other Products", "website-legacy");
          formatted.uid = `legacy-${p.id || idx}`;
          const key = formatted.slug || formatted.id;
          if (!productsMap.has(key)) {
            productsMap.set(key, formatted);
          }
        });
      }
    } catch (oldErr) {
      console.error("Error fetching legacy products:", oldErr.message);
    }

    const allProducts = Array.from(productsMap.values());
    const duration = performance.now() - startTime;
    console.log(`[admin-api] Loaded ${allProducts.length} multi-source products in ${duration.toFixed(2)}ms`);

    return allProducts;
  } catch (err) {
    console.error("Error in fetchFullCatalog:", err);
    return [];
  }
}

/**
 * Fetch a single product by slug
 */
export async function fetchProductBySlug(slug) {
  if (!slug) return null;
  const catalog = await fetchFullCatalog();
  return catalog.find((p) => p.slug === slug || p.id === slug) || null;
}

/**
 * Fetch Site Data for specific page types (home, contact, services, about, districts)
 */
export async function fetchSiteData(type, params = {}) {
  if (!type) return null;

  // Try direct /api/site-data endpoint
  try {
    let url = `${ADMIN_API_BASE_URL}/api/site-data?websiteId=${encodeURIComponent(WEBSITE_ID)}&type=${encodeURIComponent(type)}`;
    if (params.district) {
      url += `&district=${encodeURIComponent(params.district)}`;
    }

    const res = await fetch(url, {
      cache: "no-store",
      headers: { Pragma: "no-cache" },
    });

    if (res.ok) {
      const json = await res.json();
      if (json?.data) return json.data;
    }
  } catch (err) {
    console.warn(`[admin-api] /api/site-data?type=${type} error:`, err.message);
  }

  // Fallback to local-firestore document path
  if (type === "districts") {
    if (params.district) {
      return fetchDoc(`websites/${WEBSITE_ID}/districts/${params.district}`);
    }
    const docs = await fetchCollection(`websites/${WEBSITE_ID}/districts`);
    return docs.map((d) => d.data || d);
  }

  return fetchDoc(`websites/${WEBSITE_ID}/pages/${type}`);
}

export async function fetchHomeData() {
  return fetchSiteData("home");
}

export async function fetchContactData() {
  return fetchSiteData("contact");
}

export async function fetchServicesData() {
  return fetchSiteData("services");
}

export async function fetchAboutData() {
  return fetchSiteData("about");
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  return fetchSiteData("districts", { district });
}

export async function fetchDistricts() {
  const result = await fetchSiteData("districts");
  return Array.isArray(result) ? result : [];
}
