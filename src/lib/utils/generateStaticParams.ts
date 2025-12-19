/**
 * Generate static params for all locale-based pages during static export
 * For static export, we only build the English version to reduce build time
 */
export async function generateLocaleParams() {
  return [{ locale: "en" }]
}
