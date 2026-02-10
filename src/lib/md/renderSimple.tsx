import { compileMDX, type MDXRemoteProps } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import { htmlElements } from "@/components/MdComponents"

/**
 * Renders markdown to React components using htmlElements.
 *
 * @param markdown - The markdown string to render
 * @param componentOverrides - Optional component overrides
 * @returns React element with rendered markdown
 */
export async function renderSimpleMarkdown(
  markdown: string,
  componentOverrides?: MDXRemoteProps["components"]
) {
  const { content } = await compileMDX({
    source: markdown,
    components: {
      ...(htmlElements as unknown as MDXRemoteProps["components"]),
      ...componentOverrides,
    },
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })

  return content
}
