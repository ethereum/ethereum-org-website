import { getMetadata } from "../utils/metadata"

import { compile } from "./compile"
import { importMd } from "./import"

export const getMdMetadata = async ({
  locale,
  slug: slugArray,
}: {
  locale: string
  slug: string[]
}) => {
  const slug = slugArray.join("/")

  const { markdown, isTranslated } = await importMd(locale, slug)
  const { frontmatter } = await compile({
    markdown,
    slugArray: slug.split("/"),
    locale,
    components: {},
  })

  const title = frontmatter.metaTitle ?? frontmatter.title
  const pageTitle = title.includes("ethereum.org")
    ? title
    : `${title} | ethereum.org`
  const description = frontmatter.description
  const image = frontmatter.image
  const author = frontmatter.author

  const metadata = await getMetadata({
    locale,
    slug: slugArray,
    title: pageTitle,
    description,
    image,
    author,
    shouldIndex: isTranslated,
  })
  return metadata
}
