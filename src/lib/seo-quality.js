/**
 * Programmatic SEO Quality Control Gate Engine
 * Ensures only high-value, non-thin, non-duplicate pages are indexed and included in sitemaps.
 */

/**
 * Calculate SEO Quality Score (0 - 100)
 */
export function calculatePageQualityScore({
  title = "",
  description = "",
  content = "",
  hasCanonical = true,
  hasImages = true,
  hasInternalLinks = true,
  isDuplicate = false,
  isPublished = true,
}) {
  if (!isPublished) return 0;
  if (isDuplicate) return 20;

  let score = 0;

  // Technical SEO (20 Points)
  if (hasCanonical) score += 10;
  if (hasImages) score += 10;

  // Content Quality & Word Count (20 Points)
  const wordCount = content ? content.trim().split(/\s+/).length : 0;
  if (wordCount > 300) score += 20;
  else if (wordCount > 150) score += 12;
  else if (wordCount > 50) score += 6;

  // Search Intent & Metadata (25 Points)
  if (title && title.length >= 20 && title.length <= 70) score += 12;
  if (description && description.length >= 50 && description.length <= 160) score += 13;

  // Internal Linking & Structure (20 Points)
  if (hasInternalLinks) score += 20;

  // Rich Context (15 Points)
  score += 15;

  return Math.min(100, score);
}

/**
 * Determine if a page is eligible for Sitemap Inclusion
 */
export function isEligibleForSitemap(pageQualityMetrics) {
  const score = calculatePageQualityScore(pageQualityMetrics);
  return score >= 50;
}
