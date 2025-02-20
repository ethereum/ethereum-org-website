import { join } from "path"

import { SerializeOptions } from "next-mdx-remote/dist/types"
import { compileMDX, MDXRemote } from "next-mdx-remote/rsc"
import remarkSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkHeadingId from "remark-heading-id"

import { CommitHistory, Lang, TocNodeType } from "@/lib/types"
import { StaticFrontmatter } from "@/lib/interfaces"

import mdComponents from "@/components/MdComponents"

import { getFileContributorInfo } from "@/lib/utils/contributors"
import { getContent } from "@/lib/utils/md"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { remapTableOfContents } from "@/lib/utils/toc"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { StaticLayout } from "@/layouts"
import rehypeImg from "@/lib/md/rehypeImg"
import remarkInferToc from "@/lib/md/remarkInferToc"

const commitHistoryCache: CommitHistory = {}

// Preprocess the markdown content
function preprocessMarkdown(content: string) {
  // Replace heading IDs without escaping to escaped version
  // TODO: move to a separate file and test it more
  return content.replace(/^(#{1,6}.*?)\{(#[\w-]+)\}/gm, "$1\\{$2\\}")
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug: slugArray } = await params

  const slug = slugArray.join("/")

  let markdown = ""
  let contentNotTranslated = false
  if (locale === DEFAULT_LOCALE) {
    markdown = (await import(`../../../public/content/${slug}/index.md`))
      .default
  } else {
    try {
      markdown = (
        await import(
          `../../../public/content/translations/${locale}/${slug}/index.md`
        )
      ).default
    } catch (error) {
      markdown = (await import(`../../../public/content/${slug}/index.md`))
        .default
      contentNotTranslated = true
    }
  }

  let tocNodeItems: TocNodeType[] = []
  const tocCallback = (toc: TocNodeType): void => {
    tocNodeItems = "items" in toc ? toc.items : []
  }

  const source = preprocessMarkdown(markdown)

  const { frontmatter } = await compileMDX<StaticFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  })

  // TODO: double check if this is the correct path
  const mdPath = join("/content", ...slugArray)
  const mdDir = join("public", mdPath)

  const mdxOptions = {
    remarkPlugins: [
      remarkGfm,
      remarkHeadingId,
      remarkSlug,
      [remarkInferToc, { callback: tocCallback }],
    ],
    rehypePlugins: [[rehypeImg, { dir: mdDir, srcPath: mdPath, locale }]],
  } satisfies SerializeOptions["mdxOptions"]

  const tocItems = remapTableOfContents(tocNodeItems, source)

  const layout = "static"

  const { lastUpdatedDate } = await getFileContributorInfo(
    mdDir,
    mdPath,
    slug,
    locale!,
    frontmatter.lang,
    layout as never,
    commitHistoryCache
  )
  const lastEditLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastUpdatedDate
  )

  return (
    <StaticLayout
      frontmatter={frontmatter}
      slug={slug}
      tocItems={tocItems}
      lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      contentNotTranslated={contentNotTranslated}
    >
      <MDXRemote
        source={source}
        components={{ ...mdComponents }}
        options={{ parseFrontmatter: true, mdxOptions }}
      />
    </StaticLayout>
  )
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
