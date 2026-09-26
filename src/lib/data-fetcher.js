/**
 * Data Fetcher module connecting to SQLite Admin API
 * Completely replaces Firebase Firestore with SQLite Admin API.
 */

import {
  ADMIN_API_BASE_URL,
  WEBSITE_ID,
  COMPANY_ID,
  makeSlug,
  isVisibleOnSite,
  formatProduct,
  fetchDoc,
  fetchCollection,
  saveDoc,
  submitContactQuery,
  submitProductQuery,
  fetchFullCatalog,
  fetchProductBySlug,
  fetchSiteData,
  fetchHomeData,
  fetchContactData,
  fetchServicesData,
  fetchAboutData,
  fetchDistrictData,
  fetchDistricts,
} from "./admin-api";

export {
  ADMIN_API_BASE_URL,
  WEBSITE_ID,
  COMPANY_ID,
  makeSlug,
  isVisibleOnSite,
  formatProduct,
  fetchDoc,
  fetchCollection,
  saveDoc,
  submitContactQuery,
  submitProductQuery,
  fetchFullCatalog,
  fetchProductBySlug,
  fetchSiteData,
  fetchHomeData,
  fetchContactData,
  fetchServicesData,
  fetchAboutData,
  fetchDistrictData,
  fetchDistricts,
};

// In-memory cache for fetchDocCached
const docCache = {};

export async function fetchDocCached(path) {
  if (docCache[path]) {
    return docCache[path];
  }
  try {
    const data = await fetchDoc(path);
    if (data) {
      docCache[path] = data;
    }
    return data;
  } catch (err) {
    console.error(`Error in fetchDocCached at ${path}:`, err);
    return null;
  }
}
