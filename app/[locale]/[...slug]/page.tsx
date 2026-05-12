import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Frontmatter, Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"
import VideoWatch from "@/components/Videos/VideoWatch"

import { getMarkdownFileContributorInfo } from "@/lib/utils/contributors"
import { dateToString } from "@/lib/utils/date"
import { getLayoutFromSlug } from "@/lib/utils/layout"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import SlugJsonLD from "./page-jsonld"

import { componentsMapping, layoutMapping } from "@/layouts"
import {
  allLocaleParams,
  contentSource,
  getContentSource,
} from "@/lib/poc-fumadocs/source"
import { fumadocsTocToCItems } from "@/lib/poc-fumadocs/toc"

type Params = { locale: string; slug: string[] }

// PoC: this catch-all is served entirely by Fumadocs. There are 25 collections
// (one per locale); the route picks the right source for the request's locale.
// When a translation is missing, fall back to the English source and pass
// `contentNotTranslated={true}` so the layout renders the "not translated"
// banner (matches today's `getPageData` behaviour).
export default async function Page(props: { params: Promise<Params> }) {
  const { locale, slug: slugArray } = await props.params

  const localeSource = getContentSource(locale)
  if (!localeSource) notFound()

  // Fall back to EN when the translation is missing — but only if EN is in
  // the build (NEXT_PUBLIC_BUILD_LOCALES could exclude it).
  const page =
    localeSource.getPage(slugArray) ?? contentSource?.getPage(slugArray)
  const isTranslated = Boolean(localeSource.getPage(slugArray))
  if (!page) notFound()

  setRequestLocale(locale)

  const slug = slugArray.join("/")
  // Async-mode collections expose body/toc behind `data.load()` (lazy body
  // import) instead of as eager fields on `data` itself. The schema only
  // types the frontmatter, so cast `load()` here.
  const loaded = (await (
    page.data as unknown as {
      load: () => Promise<{
        body: (p: { components: Record<string, unknown> }) => React.ReactNode
        toc?: { title: unknown; url: string; depth: number }[]
      }>
    }
  ).load()) as {
    body: (p: { components: Record<string, unknown> }) => React.ReactNode
    toc?: { title: unknown; url: string; depth: number }[]
  }
  const MDXContent = loaded.body
  const tocItems = fumadocsTocToCItems(loaded.toc)

  // Source frontmatter from the fumadocs eager export — no filesystem reads.
  // The schema in source.config.ts does no runtime validation, so every YAML
  // key survives the import. Strip the doc-collection methods/info so we
  // don't carry functions across the RSC boundary or into JSON-LD.
  const DOC_ENTRY_KEYS = new Set(["load", "getText", "getMDAST", "info"])
  const frontmatter = Object.fromEntries(
    Object.entries(page.data as unknown as Record<string, unknown>).filter(
      ([k]) => !DOC_ENTRY_KEYS.has(k)
    )
  ) as unknown as Frontmatter

  const layout = frontmatter.template || getLayoutFromSlug(slug)
  const Layout = layoutMapping[layout]

  const { contributors, lastUpdatedDate } =
    await getMarkdownFileContributorInfo(
      slug,
      locale,
      frontmatter.lang as string
    )
  const lastEditLocaleTimestamp = lastUpdatedDate
    ? getLocaleTimestamp(locale as Lang, lastUpdatedDate)
    : undefined

  // PoC test stub: hardcoded so we can validate the ISR path without porting
  // reading-time computation off the raw markdown yet. Real fix would be a
  // remark plugin that stuffs `timeToRead` into the eager frontmatter.
  const timeToRead = { minutes: 5 }

  if ("published" in frontmatter) {
    frontmatter.published = dateToString(frontmatter.published)
  }

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(slug, layout)
  const messages = pick(allMessages, requiredNamespaces)

  const components = {
    ...mdComponents,
    VideoWatch,
    ...(componentsMapping[layout] ?? {}),
  }

  return (
    <>
      <SlugJsonLD
        locale={locale}
        slug={slug}
        frontmatter={frontmatter}
        contributors={contributors}
      />
      <I18nProvider locale={locale} messages={messages}>
        <Layout
          slug={slug}
          frontmatter={frontmatter}
          tocItems={tocItems}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          contentNotTranslated={!isTranslated}
          contributors={contributors}
          timeToRead={Math.round(timeToRead.minutes)}
        >
          <MDXContent components={components} />
        </Layout>
      </I18nProvider>
    </>
  )
}

export async function generateStaticParams() {
  return allLocaleParams()
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { locale, slug } = await props.params
  const src = getContentSource(locale)
  const page =
    src?.getPage(slug) ?? (src ? contentSource?.getPage(slug) : undefined)
  if (!page) {
    const t = await getTranslations("common")
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
  return {
    title: page.data.title,
    description: page.data.description,
  }
}
