import { getManifestEntry } from "../content/lookup"
import { getMetadata } from "../utils/metadata"

export const getMdMetadata = async ({
  locale,
  slug: slugArray,
}: {
  locale: string
  slug: string[]
}) => {
  const slug = slugArray.join("/")

  const entry = getManifestEntry(locale, slug)
  if (!entry) {
    // Slug is not in the manifest — let the catch-all's notFound() path
    // surface this; metadata callers handle the throw via their try/catch.
    throw new Error(`No content manifest entry for slug "${slug}"`)
  }
  const { frontmatter } = entry

  const title = frontmatter.metaTitle ?? frontmatter.title
  const pageTitle = title.includes("ethereum.org")
    ? title
    : `${title} | ethereum.org`
  const description = frontmatter.description
  const image = frontmatter.image
  const author = frontmatter.author

  return getMetadata({
    locale,
    slug: slugArray,
    title: pageTitle,
    description,
    image,
    author: typeof author === "string" ? author : undefined,
  })
}
