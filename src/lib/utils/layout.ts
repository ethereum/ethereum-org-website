export const getLayoutFromSlug = (slug: string) => {
  if (slug.includes("developers/docs")) return "docs"
  if (slug.includes("developers/tutorials")) return "tutorial"
  if (slug.includes("latest")) return "blog"
  return "static"
}
