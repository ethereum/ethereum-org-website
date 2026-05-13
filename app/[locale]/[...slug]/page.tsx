import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { GHIssue, SlugPageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"
import VideoWatch from "@/components/Videos/VideoWatch"

import { dateToString } from "@/lib/utils/date"
import { getLayoutFromSlug } from "@/lib/utils/layout"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { getGFIs } from "@/data-layer"

import SlugJsonLD from "./page-jsonld"

import { componentsMapping, layoutMapping } from "@/layouts"
import { getPageData } from "@/lib/md/data"
import {
  contentSource,
  getContentSource,
  isCanonicalSlug,
  prerenderLocaleParams,
} from "@/lib/poc-fumadocs/source"

// PoC(hybrid): page existence + metadata come from `.source/manifest.json`
// (built by `src/lib/poc-fumadocs/build-manifest.mjs` at postinstall).
// Body compilation stays on the legacy `importMd` + `compile` path inside
// `getPageData()`. `dynamicParams=true` lets locales outside
// NEXT_PUBLIC_PRERENDER_LOCALES render on first request and be cached by
// Netlify Durable; the function bundle must include public/content/**/*.md
// for those on-demand renders to work (see netlify.toml [functions]).
export const dynamicParams = true

export default async function Page(props: { params: Promise<SlugPageParams> }) {
  const params = await props.params
  const { locale, slug: slugArray } = params

  // Fast manifest lookup — no fs access. The canonical EN slug set is
  // the source of truth: orphan translations (EN deleted, translation
  // lingering) 404 the same way they did under the legacy fs-walk.
  if (!isCanonicalSlug(slugArray)) notFound()

  // Enable static rendering
  setRequestLocale(locale)

  let gfissues: GHIssue[] = []
  try {
    gfissues = (await getGFIs()) ?? []
  } catch (error) {
    console.warn("Failed to fetch GFIs for slug page:", error)
  }

  const slug = slugArray.join("/")

  const {
    content,
    frontmatter,
    tocItems,
    lastEditLocaleTimestamp,
    isTranslated,
    contributors,
    timeToRead,
  } = await getPageData({
    locale,
    slug,
    baseComponents: { ...mdComponents, VideoWatch },
    componentsMapping,
    scope: {
      gfissues,
    },
  })

  // Determine the actual layout after we have the frontmatter
  const layout = frontmatter.template || getLayoutFromSlug(slug)
  const Layout = layoutMapping[layout]

  // If the page has a published date, format it
  if ("published" in frontmatter) {
    frontmatter.published = dateToString(frontmatter.published)
  }

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(slug, layout)
  const messages = pick(allMessages, requiredNamespaces)

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
          {content}
        </Layout>
      </I18nProvider>
    </>
  )
}

export async function generateStaticParams() {
  return prerenderLocaleParams()
}

export async function generateMetadata(props: {
  params: Promise<SlugPageParams>
}) {
  const params = await props.params
  const { locale, slug: slugArray } = params

  // Canonical EN gate: same orphan-translation rule as the page handler.
  const enPage = contentSource?.getPage(slugArray)
  const localeSource = getContentSource(locale)
  const page = enPage ? (localeSource?.getPage(slugArray) ?? enPage) : undefined
  if (!page) {
    const t = await getTranslations("common")
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }

  const fm = page.data
  const rawTitle = (fm.metaTitle ?? fm.title) as string | undefined
  const title = rawTitle ?? ""
  const pageTitle =
    title.includes("ethereum.org") || !title ? title : `${title} | ethereum.org`

  return await getMetadata({
    locale,
    slug: slugArray,
    title: pageTitle,
    description: fm.description as string | undefined,
    image: fm.image as string | undefined,
    author: fm.author as string | undefined,
  })
}
