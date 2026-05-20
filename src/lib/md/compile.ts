import fs from "fs"
import { join } from "path"

import sizeOf from "image-size"
import { compileMDX, MDXRemoteProps } from "next-mdx-remote/rsc"
import { getPlaiceholder } from "plaiceholder"
import remarkSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkHeadingId from "remark-heading-id"

import { Frontmatter, Layout, TocNodeType } from "../types"

import { escapeHeadingIds } from "@/lib/md/escapeHeadingIds"
import rehypeImg from "@/lib/md/rehypeImg"
import remarkInferToc from "@/lib/md/remarkInferToc"
import { remarkPreserveJsx } from "@/lib/md/remarkPreserveJsx"

type SerializeOptions = NonNullable<MDXRemoteProps["options"]>

export const compile = async ({
  markdown,
  slugArray,
  locale,
  components = {},
  scope = {},
}: {
  markdown: string
  slugArray: string[]
  locale: string
  components: MDXRemoteProps["components"]
  scope?: Record<string, unknown>
}) => {
  let tocNodeItems: TocNodeType[] = []
  const tocCallback = (toc: TocNodeType): void => {
    tocNodeItems = "items" in toc ? toc.items : []
  }

  const mdPath = join("/content", ...slugArray)
  const mdDir = join("public/content", ...slugArray)

  const mdxOptions = {
    remarkPlugins: [
      remarkGfm,
      remarkHeadingId,
      remarkSlug,
      [remarkInferToc, { callback: tocCallback }],
      remarkPreserveJsx,
    ],
    rehypePlugins: [[rehypeImg, { dir: mdDir, srcPath: mdPath, locale }]],
  } satisfies SerializeOptions["mdxOptions"]

  const source = escapeHeadingIds(markdown)

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions,
      scope,
    },
  })

  // If the page has a hero image, derive its intrinsic dimensions and
  // generate a blurDataURL for it.
  if ("image" in frontmatter) {
    const heroImagePath = join(process.cwd(), "public", frontmatter.image)
    const imageBuffer = fs.readFileSync(heroImagePath)
    const { width, height } = sizeOf(imageBuffer)
    if (width && height) {
      frontmatter.imageWidth = width
      frontmatter.imageHeight = height
    }
    const { base64 } = await getPlaiceholder(imageBuffer, { size: 16 })
    frontmatter.blurDataURL = base64
  }

  return {
    content,
    frontmatter,
    tocNodeItems,
  }
}

export const extractLayoutFromMarkdown = async (
  markdown: string
): Promise<Layout | undefined> => {
  const source = escapeHeadingIds(markdown)

  const { frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
  })
  return frontmatter.template
}
