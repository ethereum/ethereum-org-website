import { join } from "path"

import { SerializeOptions } from "next-mdx-remote/dist/types"
import { compileMDX, MDXRemoteProps } from "next-mdx-remote/rsc"
import remarkSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkHeadingId from "remark-heading-id"

import { CONTENT_DIR, CONTENT_PATH } from "../constants"
import { StaticFrontmatter } from "../interfaces"
import { TocNodeType } from "../types"

import rehypeImg from "@/lib/md/rehypeImg"
import remarkInferToc from "@/lib/md/remarkInferToc"
import { remarkPreserveJsx } from "@/lib/md/remarkPreserveJsx"

// Preprocess the markdown content
function preprocessMarkdown(content: string) {
  // Replace heading IDs without escaping to escaped version
  // TODO: move to a separate file and test it more
  return content.replace(/^(#{1,6}.*?)\{(#[\w-]+)\}/gm, "$1\\{$2\\}")
}

export const compile = async ({
  markdown,
  slugArray,
  locale,
  components = {},
}: {
  markdown: string
  slugArray: string[]
  locale: string
  components: MDXRemoteProps["components"]
}) => {
  let tocNodeItems: TocNodeType[] = []
  const tocCallback = (toc: TocNodeType): void => {
    tocNodeItems = "items" in toc ? toc.items : []
  }

  const mdPath = join(CONTENT_PATH, ...slugArray)
  const mdDir = join(CONTENT_DIR, ...slugArray)

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

  const source = preprocessMarkdown(markdown)

  const { content, frontmatter } = await compileMDX<StaticFrontmatter>({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions,
    },
  })

  return {
    content,
    frontmatter,
    tocNodeItems,
  }
}
