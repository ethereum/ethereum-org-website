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
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { getGFIs } from "@/data-layer"

import SlugJsonLD from "./page-jsonld"

import { componentsMapping, layoutMapping } from "@/layouts"
import {
  allSlugs,
  getManifestEntry,
  hasContentSlug,
} from "@/lib/content/lookup"
import { getPageData } from "@/lib/md/data"
import { getMdMetadata } from "@/lib/md/metadata"

export default async function Page(props: { params: Promise<SlugPageParams> }) {
  const params = await props.params
  const { locale, slug: slugArray } = params
  const slug = slugArray.join("/")

  if (!hasContentSlug(slug)) notFound()

  // Enable static rendering
  setRequestLocale(locale)

  let gfissues: GHIssue[] = []
  try {
    gfissues = (await getGFIs()) ?? []
  } catch (error) {
    console.warn("Failed to fetch GFIs for slug page:", error)
  }

  const manifestEntry = getManifestEntry(locale, slug)

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
    manifestEntry,
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
  return allSlugs.map((slug) => ({
    slug: slug.split("/"),
  }))
}

export async function generateMetadata(props: {
  params: Promise<SlugPageParams>
}) {
  const params = await props.params
  const { locale, slug } = params

  try {
    return await getMdMetadata({
      locale,
      slug,
    })
  } catch (error) {
    const t = await getTranslations("common")

    // Return basic metadata for invalid paths
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
}
