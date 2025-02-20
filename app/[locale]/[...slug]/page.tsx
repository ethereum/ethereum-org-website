import { join } from "path"

import { SerializeOptions } from "next-mdx-remote/dist/types"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkHeadingId from "remark-heading-id"

import { CommitHistory, Lang, ToCItem, TocNodeType } from "@/lib/types"
import { StaticFrontmatter } from "@/lib/interfaces"

import mdComponents from "@/components/MdComponents"

import { getFileContributorInfo } from "@/lib/utils/contributors"
import { getContent } from "@/lib/utils/md"
import { getLocaleTimestamp } from "@/lib/utils/time"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { staticComponents, StaticLayout } from "@/layouts"
import rehypeImg from "@/lib/md/rehypeImg"
import remarkInferToc from "@/lib/md/remarkInferToc"
import { remarkPreserveJsx } from "@/lib/md/remarkPreserveJsx"

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

  // TODO: double check if this is the correct path
  const mdPath = join("/content", ...slugArray)
  const mdDir = join("public", mdPath)

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
    // TODO: Address component typing error here (flip `FC` types to prop object types)
    // @ts-expect-error Incompatible component function signatures
    components: { ...mdComponents, ...staticComponents },
    options: {
      parseFrontmatter: true,
      mdxOptions,
    },
  })

  const tocItems =
    tocNodeItems.length === 1 && "items" in tocNodeItems[0]
      ? tocNodeItems[0].items
      : tocNodeItems

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
      slug={slug}
      frontmatter={frontmatter}
      tocItems={tocItems as ToCItem[]}
      lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      contentNotTranslated={contentNotTranslated}
    >
      {content}
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
