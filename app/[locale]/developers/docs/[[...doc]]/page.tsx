import { join } from "path"

import pick from "lodash.pick"
import { getMessages, setRequestLocale } from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"

import { getPostSlugs } from "@/lib/utils/md"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { LOCALES_CODES } from "@/lib/constants"

import { docsComponents, DocsLayout } from "@/layouts"
import { getPageData } from "@/lib/md/data"
import { getMdMetadata } from "@/lib/md/metadata"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; doc?: string[] }>
}) {
  const { locale, doc: docArray } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const slug = join("developers/docs", ...(docArray || []))

  const layout = "docs"

  const {
    content,
    frontmatter,
    tocItems,
    lastEditLocaleTimestamp,
    contributors,
    isTranslated,
  } = await getPageData({
    locale,
    slug,
    // TODO: Address component typing error here (flip `FC` types to prop object types)
    // @ts-expect-error Incompatible component function signatures
    components: { ...mdComponents, ...docsComponents },
    layout,
  })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(slug, layout)
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <DocsLayout
        slug={slug}
        frontmatter={frontmatter}
        tocItems={tocItems}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
        contentNotTranslated={!isTranslated}
      >
        {content}
      </DocsLayout>
    </I18nProvider>
  )
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs("/developers/docs")

  // Generate page paths for each supported locale
  return LOCALES_CODES.flatMap((locale) =>
    slugs.map((slug) => {
      return {
        // Splitting nested paths to generate proper slug
        doc: slug.replace("/developers/docs", "").split("/").slice(1),
        locale,
      }
    })
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string[] }>
}) {
  const { locale, doc } = await params
  const slug = ["developers/docs", ...(doc || [])]

  return await getMdMetadata({
    locale,
    slug,
  })
}

export const dynamicParams = false
