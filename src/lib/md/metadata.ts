import { getMetadata } from "../utils/metadata"

import { compile } from "./compile"
import { importMd } from "./import"

export const getMdMetadata = async ({
  locale,
  slug: slugArray,
  timeToRead,
}: {
  locale: string
  slug: string[]
  timeToRead?: string
}) => {
  const slug = slugArray.join("/")

  const { markdown } = await importMd(locale, slug)
  const { frontmatter } = await compile({
    markdown,
    slugArray,
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
  const tags = frontmatter.tags
  const skill = frontmatter.skill

  return await getMetadata({
    locale,
    slug: slugArray,
    title: pageTitle,
    description,
    image,
    author,
    tags,
    skill,
    timeToRead,
  })
}
