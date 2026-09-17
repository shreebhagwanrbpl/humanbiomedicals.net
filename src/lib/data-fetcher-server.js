import { fetchFullCatalog as fetchFullCatalogRaw } from "./data-fetcher";
import { cache } from "react";

// Per-request React cache (deduplicates calls within the same SSR render cycle without keeping stale data across requests)
export const fetchFullCatalog = cache(async () => {
  const start = performance.now();
  const products = await fetchFullCatalogRaw();
  const end = performance.now();
  console.log(`[data-fetcher-server] fetchFullCatalog took ${(end - start).toFixed(2)}ms, loaded ${products.length} products`);
  return products;
});

