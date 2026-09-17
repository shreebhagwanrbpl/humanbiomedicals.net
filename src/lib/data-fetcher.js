import { db } from "./firebase.js";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

const SITE_WEBSITE_IDS = ["humanbiomedicalsnet", "humanbiomedicals.net", "all"];

export const makeSlug = (text = "") =>
  String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

/**
 * Check if an item (product, category, subcategory) is visible on humanbiomedicals.net
 */
export function isVisibleOnSite(item) {
  if (!item) return false;
  if (item.isPublished === false) return false;
  const websiteIds = Array.isArray(item.websiteIds)
    ? item.websiteIds
    : item.websiteIds
    ? [item.websiteIds]
    : [];

  if (websiteIds.length === 0) return true; // Default visible if not constrained
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
 * Fetch full multi-source catalog from Firestore:
 * 1. companies/human/categories & subcategories
 * 2. companies/human/products
 * 3. websites/humanbiomedicalsnet/pages/categoryproducts/categories & subcategories
 * 4. websites/humanbiomedicalsnet/pages/products
 */
export async function fetchFullCatalog() {
  const startTime = performance.now();
  const productsMap = new Map();
  const categoriesMap = new Map();

  try {
    // -------------------------------------------------------------
    // Source 1: companies/human/categories (Central Master Catalog)
    // -------------------------------------------------------------
    try {
      const compCatsSnap = await getDocs(collection(db, "companies", "human", "categories"));
      
      await Promise.all(
        compCatsSnap.docs.map(async (catDoc) => {
          const catData = catDoc.data();
          const categoryName = catData.name || catData.category || catDoc.id;
          const isCatVisible = isVisibleOnSite(catData);

          if (!isCatVisible) return;

          if (!categoriesMap.has(catDoc.id)) {
            categoriesMap.set(catDoc.id, {
              id: catDoc.id,
              name: categoryName,
              category: categoryName,
              slug: catData.slug || catDoc.id,
              websiteIds: catData.websiteIds || ["all"],
              subcategories: [],
            });
          }

          // Fetch Subcategories under this category
          try {
            const subsSnap = await getDocs(
              collection(db, "companies", "human", "categories", catDoc.id, "subcategories")
            );

            subsSnap.docs.forEach((subDoc) => {
              const subData = subDoc.data();
              const subCategoryName = subData.name || subData.subCategory || subDoc.id;
              const isSubVisible = isVisibleOnSite(subData);

              if (!isSubVisible) return;

              // Products inside subcategory
              const rawProducts = Array.isArray(subData.products) ? subData.products : [];
              rawProducts.forEach((p, idx) => {
                if (!isVisibleOnSite(p)) return;

                const formatted = formatProduct(p, categoryName, subCategoryName, "company-subcategory");
                formatted.uid = `comp-${catDoc.id}-${subDoc.id}-${p.id || idx}`;

                const key = formatted.slug || formatted.id;
                if (!productsMap.has(key)) {
                  productsMap.set(key, formatted);
                }
              });
            });
          } catch (subErr) {
            console.error(`Error fetching subcategories for companies/human/categories/${catDoc.id}:`, subErr);
          }

          // Direct products under category doc if any
          if (Array.isArray(catData.products)) {
            catData.products.forEach((p, idx) => {
              if (!isVisibleOnSite(p)) return;
              const formatted = formatProduct(p, categoryName, categoryName, "company-category-direct");
              formatted.uid = `comp-${catDoc.id}-direct-${p.id || idx}`;
              const key = formatted.slug || formatted.id;
              if (!productsMap.has(key)) {
                productsMap.set(key, formatted);
              }
            });
          }
        })
      );
    } catch (compErr) {
      console.error("Error fetching companies/human/categories:", compErr);
    }

    // -------------------------------------------------------------
    // Source 2: companies/human/products (Master standalone products)
    // -------------------------------------------------------------
    try {
      const compProdsSnap = await getDocs(collection(db, "companies", "human", "products"));
      compProdsSnap.docs.forEach((pDoc) => {
        const pData = pDoc.data();
        if (!isVisibleOnSite(pData)) return;

        const formatted = formatProduct(pData, pData.category || "General", pData.subCategory || "General", "company-products");
        formatted.uid = `comp-prod-${pDoc.id}`;
        const key = formatted.slug || formatted.id;
        if (!productsMap.has(key)) {
          productsMap.set(key, formatted);
        }
      });
    } catch (prodsErr) {
      console.error("Error fetching companies/human/products:", prodsErr);
    }

    // -------------------------------------------------------------
    // Source 3: websites/humanbiomedicalsnet/pages/categoryproducts/categories
    // -------------------------------------------------------------
    try {
      const webCatsSnap = await getDocs(
        collection(db, "websites", "humanbiomedicalsnet", "pages", "categoryproducts", "categories")
      );

      await Promise.all(
        webCatsSnap.docs.map(async (catDoc) => {
          const catData = catDoc.data();
          const categoryName = catData.category || catData.name || catDoc.id;
          if (!isVisibleOnSite(catData)) return;

          try {
            const subSnap = await getDocs(
              collection(
                db,
                "websites",
                "humanbiomedicalsnet",
                "pages",
                "categoryproducts",
                "categories",
                catDoc.id,
                "subcategories"
              )
            );

            subSnap.docs.forEach((subDoc) => {
              const subData = subDoc.data();
              const subCategoryName = subData.subCategory || subData.name || subDoc.id;
              if (!isVisibleOnSite(subData)) return;

              const prods = Array.isArray(subData.products) ? subData.products : [];
              prods.forEach((p, idx) => {
                if (!isVisibleOnSite(p)) return;
                const formatted = formatProduct(p, categoryName, subCategoryName, "website-categoryproducts");
                formatted.uid = `web-${catDoc.id}-${subDoc.id}-${p.id || idx}`;
                const key = formatted.slug || formatted.id;
                if (!productsMap.has(key)) {
                  productsMap.set(key, formatted);
                }
              });
            });
          } catch (webSubErr) {
            console.error(`Error fetching subcategories for website category ${catDoc.id}:`, webSubErr);
          }

          if (Array.isArray(catData.products)) {
            catData.products.forEach((p, idx) => {
              if (!isVisibleOnSite(p)) return;
              const formatted = formatProduct(p, categoryName, categoryName, "website-category-direct");
              formatted.uid = `web-${catDoc.id}-direct-${p.id || idx}`;
              const key = formatted.slug || formatted.id;
              if (!productsMap.has(key)) {
                productsMap.set(key, formatted);
              }
            });
          }
        })
      );
    } catch (webCatsErr) {
      console.error("Error fetching website categoryproducts:", webCatsErr);
    }

    // -------------------------------------------------------------
    // Source 4: websites/humanbiomedicalsnet/pages/products (Legacy)
    // -------------------------------------------------------------
    try {
      const oldSnap = await getDoc(
        doc(db, "websites", "humanbiomedicalsnet", "pages", "products")
      );

      if (oldSnap.exists()) {
        const oldProducts = Array.isArray(oldSnap.data().products) ? oldSnap.data().products : [];
        oldProducts.forEach((p, idx) => {
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
      console.error("Error fetching legacy products:", oldErr);
    }

    const allProducts = Array.from(productsMap.values());
    const duration = performance.now() - startTime;
    console.log(`[data-fetcher] Loaded ${allProducts.length} multi-source products in ${duration.toFixed(2)}ms`);

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
 * Simple in-memory cache for Firestore documents
 */
const docCache = {};

export async function fetchDocCached(path) {
  if (docCache[path]) {
    return docCache[path];
  }
  try {
    const parts = path.split("/");
    const docRef = doc(db, ...parts);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      docCache[path] = data;
      return data;
    }
    return null;
  } catch (err) {
    console.error(`Error fetching doc at ${path}:`, err);
    throw err;
  }
}

export async function fetchHomeData() {
  return fetchDocCached("websites/humanbiomedicalsnet/pages/home");
}

export async function fetchContactData() {
  return fetchDocCached("websites/humanbiomedicalsnet/pages/contact");
}

export async function fetchServicesData() {
  return fetchDocCached("websites/humanbiomedicalsnet/pages/services");
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  return fetchDocCached(`websites/humanbiomedicalsnet/districts/${district}`);
}

