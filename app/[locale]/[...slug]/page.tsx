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

import { getExternalData } from "@/lib/utils/data/getExternalData"
import { dateToString } from "@/lib/utils/date"
import { getLayoutFromSlug } from "@/lib/utils/layout"
import { checkPathValidity, getPostSlugs } from "@/lib/utils/md"
import { every } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { LOCALES_CODES } from "@/lib/constants"

import SlugJsonLD from "./page-jsonld"

import { componentsMapping, layoutMapping } from "@/layouts"
import { getPageData } from "@/lib/md/data"
import { getMdMetadata } from "@/lib/md/metadata"

export default async function Page({ params }: { params: SlugPageParams }) {
  const { locale, slug: slugArray } = params

  // Check if this specific path is in our valid paths
  const validPaths = (await generateStaticParams()) as SlugPageParams[]
  const isValidPath = checkPathValidity(validPaths, params)

  if (!isValidPath) notFound()

  // Enable static rendering
  setRequestLocale(locale)

  // Fetch daily data (GitHub good first issues) with 24-hour revalidation
  const { gfissues: gfissuesResponse } =
    (await getExternalData(["gfissues"], every("day"))) || {}
  const gfissues =
    gfissuesResponse && "value" in gfissuesResponse
      ? (gfissuesResponse.value as GHIssue[])
      : []

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
    // TODO: Address component typing error here (flip `FC` types to prop object types)
    // @ts-expect-error Incompatible component function signatures
    baseComponents: mdComponents,
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
  try {
    const slugs = await getPostSlugs("/")

    return LOCALES_CODES.flatMap((locale) =>
      slugs.map((slug) => ({
        slug: slug.split("/").slice(1),
        locale,
      }))
    )
  } catch (error) {
    // If content directory doesn't exist (e.g., in Netlify serverless environment),
    // return empty array to allow ISR to handle all routes dynamically
    console.warn(
      "Content directory not found, enabling full dynamic routing:",
      error
    )
    return []
  }
}

export async function generateMetadata({ params }: { params: SlugPageParams }) {
  const { locale, slug } = params

  try {
    return await getMdMetadata({
      locale,
      slug,
    })
  } catch (error) {
    const t = await getTranslations({ locale, namespace: "common" })

    // Return basic metadata for invalid paths
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
}
