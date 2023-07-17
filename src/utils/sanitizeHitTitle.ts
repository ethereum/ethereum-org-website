export const sanitizeHitTitle = (value: string): string => {
  const newValue = value.replaceAll("&quot;", '"').replaceAll("&amp;", "&")
  const siteNameIndex = value.lastIndexOf(" | ")
  if (siteNameIndex < 0) return newValue
  return newValue.substring(0, siteNameIndex)
}
