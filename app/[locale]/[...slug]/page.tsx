import { CommitHistory, Lang, ToCItem } from "@/lib/types"

import mdComponents from "@/components/MdComponents"

import { getFileContributorInfo } from "@/lib/utils/contributors"
import { getContent } from "@/lib/utils/md"
import { getLocaleTimestamp } from "@/lib/utils/time"

import { LOCALES_CODES } from "@/lib/constants"

import { StaticLayout } from "@/layouts"
import { compile } from "@/lib/md/compile"
import { importMd } from "@/lib/md/import"

const commitHistoryCache: CommitHistory = {}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug: slugArray } = await params

  const slug = slugArray.join("/")

  const { markdown, isTranslated } = await importMd(locale, slug)

  const { content, frontmatter, tocNodeItems } = await compile({
    markdown,
    slugArray,
    locale,
    // TODO: Address component typing error here (flip `FC` types to prop object types)
    // @ts-expect-error Incompatible component function signatures
    components: { ...mdComponents },
  })

  // ignore the first item if there is only one as it is the main heading for the article
  const tocItems =
    tocNodeItems.length === 1 && "items" in tocNodeItems[0]
      ? tocNodeItems[0].items
      : tocNodeItems

  // TODO make this dynamic
  const layout = "static"

  const { lastUpdatedDate } = await getFileContributorInfo(
    slug,
    locale,
    frontmatter.lang,
    layout as never, // TODO: fix
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
      contentNotTranslated={!isTranslated}
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
