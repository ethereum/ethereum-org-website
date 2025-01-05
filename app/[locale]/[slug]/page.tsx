import fs from "fs/promises"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import rehypeHeadingIds from "@/lib/rehype/rehypeHeadingIds"
import remarkInferToc from "@/lib/rehype/remarkInferToc"
import { DEFAULT_LOCALE } from "@/lib/constants"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  const path =
    locale === DEFAULT_LOCALE
      ? `./content/${slug}/index.md`
      : `./content/translations/${locale}/${slug}/index.md`

  const markdown = await fs.readFile(path, "utf8")

  const { content, frontmatter } = await compileMDX({
    source: markdown,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          [remarkInferToc, { callback: (toc) => console.log("toc", toc) }],
        ],
        rehypePlugins: [rehypeHeadingIds],
      },
    },
  })

  return <div>{content}</div>
}

export function generateStaticParams() {
  return [
    { locale: "en", slug: "bridges" },
    { locale: "en", slug: "about" },
  ]
}

export const dynamicParams = false
