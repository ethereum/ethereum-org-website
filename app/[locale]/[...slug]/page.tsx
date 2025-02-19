import { compileMDX } from "next-mdx-remote/rsc"
import remarkSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkHeadingId from "remark-heading-id"

import { getContent } from "@/lib/utils/md"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import remarkInferToc from "@/lib/rehype/remarkInferToc"

// Preprocess the markdown content
function preprocessMarkdown(content: string) {
  // Replace heading IDs without escaping to escaped version
  // TODO: move to a separate file and test it more
  return content.replace(/^(#{1,6}.*?)\{(#[\w-]+)\}/gm, "$1\\{$2\\}")
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  let markdown = ""
  if (locale === DEFAULT_LOCALE) {
    markdown = (await import(`../../../public/content/${slug}/index.md`))
      .default
  } else {
    markdown = (
      await import(
        `../../../public/content/translations/${locale}/${slug}/index.md`
      )
    ).default
  }

  const { content, frontmatter } = await compileMDX({
    source: preprocessMarkdown(markdown),
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkHeadingId,
          [remarkInferToc, { callback: (toc) => console.log("toc", toc) }],
        ],
        rehypePlugins: [remarkSlug],
      },
    },
  })

  console.log("frontmatter", frontmatter)

  return <div>{content}</div>
}

export async function generateStaticParams() {
  const contentFiles = getContent("/")

  // Generate page paths for each supported locale
  return LOCALES_CODES.flatMap((locale) =>
    contentFiles.map((file) => ({
      params: {
        // Splitting nested paths to generate proper slug
        slug: file.slug.split("/").slice(1),
        locale,
      },
    }))
  )
}

export const dynamicParams = false
