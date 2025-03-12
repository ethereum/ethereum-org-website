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

  const { markdown } = await importMd(locale, slug)
  const { frontmatter } = await compile({
    markdown,
    slugArray: slug.split("/"),
    locale,
    components: {},
  })

  const title = frontmatter.metaTitle ?? frontmatter.title
  const description = frontmatter.description
  const image = frontmatter.image
  const author = frontmatter.author

  return await getMetadata({
    locale,
    slug: slugArray,
    title,
    description,
    image,
    author,
  })
}
