export const getLayoutFromSlug = (slug: string) => {
  if (slug.includes("developers/docs")) return "docs"
  if (slug.includes("developers/tutorials")) return "tutorial"
  if (slug.includes("developers/blog")) return "blog"
  return "static"
}
