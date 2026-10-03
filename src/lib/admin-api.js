/**
 * Human Biomedicals Net -> SuperAdmin MongoDB API client.
 */

export const DEFAULT_COMPANY_ID = "human";
export const DEFAULT_WEBSITE_ID = "humanbiomedicalsnet";
export const DEFAULT_ADMIN_API_BASE_URL = "https://admin.rajbiosis.app";

export const COMPANY_ID = DEFAULT_COMPANY_ID;
export const WEBSITE_ID = DEFAULT_WEBSITE_ID;
export const ADMIN_API_BASE_URL = DEFAULT_ADMIN_API_BASE_URL;

export function getAdminApiBaseUrl() {
  const url =
    process.env.ADMIN_API_BASE_URL ||
    process.env.ADMIN_API_URL ||
    DEFAULT_ADMIN_API_BASE_URL;

  return url.replace(/\/+$/, "");
}

export function normalizeWebsiteId(str = "") {
  if (!str || typeof str !== "string") return DEFAULT_WEBSITE_ID;
  return str
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/[^a-z0-9]/g, "");
}

function noCacheFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      Pragma: "no-cache",
      ...(options.headers || {}),
    },
  });
}

async function readJson(url, options) {
  const response = await noCacheFetch(url, options);
  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }
  if (!response.ok) {
    console.error(`[admin-api] ${response.status} from ${url}`, body);
    return null;
  }
  return body;
}

/**
 * Reads the master catalog from SuperAdmin's MongoDB-backed collection API.
 */
export async function fetchAdminCatalog({
  companyId = DEFAULT_COMPANY_ID,
  websiteId = DEFAULT_WEBSITE_ID,
} = {}) {
  const baseUrl = getAdminApiBaseUrl();
  const siteId = normalizeWebsiteId(websiteId);
  const url = `${baseUrl}/api/${encodeURIComponent(companyId)}/catalog?websiteId=${encodeURIComponent(siteId)}`;
  const json = await readJson(url);

  if (!json?.success) return [];
  if (Array.isArray(json.products)) return json.products;
  if (Array.isArray(json.data)) return json.data;
  return [];
}

/**
 * Reads page content from SuperAdmin's MongoDB pages collection.
 */
export async function fetchAdminSiteData(pageType = "home", {
  companyId = DEFAULT_COMPANY_ID,
  websiteId = DEFAULT_WEBSITE_ID,
  district = "",
  page = "",
} = {}) {
  const baseUrl = getAdminApiBaseUrl();
  const siteId = normalizeWebsiteId(websiteId);

  if (pageType === "districts" || pageType === "district") {
    const params = new URLSearchParams({
      type: pageType,
      companyId,
      websiteId: siteId,
    });
    if (district) params.set("district", district);
    const legacyUrl = `${baseUrl}/api/site-data?${params.toString()}`;
    const legacyJson = await readJson(legacyUrl);
    if (!legacyJson?.success) return null;
    return legacyJson.data !== undefined ? legacyJson.data : legacyJson.districts ?? null;
  }

  const requestedPage = page || pageType;
  const params = new URLSearchParams({ websiteId: siteId });
  if (requestedPage) params.set("page", requestedPage);

  const url = `${baseUrl}/api/${encodeURIComponent(companyId)}/site-data?${params.toString()}`;
  const json = await readJson(url);
  if (!json?.success) return null;

  if (requestedPage) return json.data ?? null;
  return json.pages ?? json;
}

export async function fetchAdminDistricts({
  companyId = DEFAULT_COMPANY_ID,
  websiteId = DEFAULT_WEBSITE_ID,
} = {}) {
  const data = await fetchAdminSiteData("districts", { companyId, websiteId });
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.districts)) return data.districts;
  return [];
}

export const fetchDistricts = fetchAdminDistricts;

export async function fetchAdminDistrict(district = "", {
  companyId = DEFAULT_COMPANY_ID,
  websiteId = DEFAULT_WEBSITE_ID,
} = {}) {
  if (!district) return null;
  return fetchAdminSiteData("district", { district, companyId, websiteId });
}

export const fetchDistrict = fetchAdminDistrict;

/**
 * Sends contact & lead queries directly to MongoDB
 */
export async function submitAdminQuery(data = {}, type = "contact") {
  const baseUrl = getAdminApiBaseUrl();
  const websiteId = normalizeWebsiteId(data.websiteId || DEFAULT_WEBSITE_ID);
  const url = `${baseUrl}/api/${encodeURIComponent(data.companyId || DEFAULT_COMPANY_ID)}/query?websiteId=${encodeURIComponent(websiteId)}`;

  const payload = {
    ...data,
    type,
    companyId: data.companyId || DEFAULT_COMPANY_ID,
    websiteId,
    createdAt: data.createdAt || new Date().toISOString(),
  };

  const json = await readJson(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (json?.ok || json?.success) return { success: true, ...json };
  return {
    success: false,
    message: "Unable to submit your enquiry. Please try again.",
  };
}

export function submitProductQuery(data = {}) {
  return submitAdminQuery(data, "product");
}

export function submitContactQuery(data = {}) {
  return submitAdminQuery(data, "contact");
}
