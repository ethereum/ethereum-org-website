import pick from "lodash.pick"
import { getMessages, setRequestLocale } from "next-intl/server"

import { CommitHistory, Lang, ToCItem } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"

import { getFileContributorInfo } from "@/lib/utils/contributors"
import { getPostSlugs } from "@/lib/utils/md"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { LOCALES_CODES } from "@/lib/constants"

import { componentsMapping, layoutMapping } from "@/layouts"
import { compile } from "@/lib/md/compile"
import { importMd } from "@/lib/md/import"

const commitHistoryCache: CommitHistory = {}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug: slugArray } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const slug = slugArray.join("/")

  const { markdown, isTranslated } = await importMd(locale, slug)

  const { content, frontmatter, tocNodeItems } = await compile({
    markdown,
    slugArray,
    locale,
    // TODO: Address component typing error here (flip `FC` types to prop object types)
    // @ts-expect-error Incompatible component function signatures
    components: { ...mdComponents, ...componentsMapping },
  })

  // ignore the first item if there is only one as it is the main heading for the article
  const tocItems =
    tocNodeItems.length === 1 && "items" in tocNodeItems[0]
      ? tocNodeItems[0].items
      : tocNodeItems

  const layout = frontmatter.template || "static"
  const Layout = layoutMapping[layout]

  const { lastUpdatedDate } = await getFileContributorInfo(
    slug,
    locale,
    frontmatter.lang,
    layout,
    commitHistoryCache
  )
  const lastEditLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastUpdatedDate
  )

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(slug, layout)
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <Layout
        slug={slug}
        frontmatter={frontmatter}
        tocItems={tocItems as ToCItem[]}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contentNotTranslated={!isTranslated}
      >
        {content}
      </Layout>
    </I18nProvider>
  )
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs("/", /\/developers/)

  // Generate page paths for each supported locale
  return LOCALES_CODES.flatMap((locale) =>
    slugs.map((slug) => {
      return {
        // Splitting nested paths to generate proper slug
        slug: slug.split("/").slice(1),
        locale,
      }
    })
  )
}

export const dynamicParams = false
