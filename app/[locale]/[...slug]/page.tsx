import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { SlugPageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { dateToString } from "@/lib/utils/date"
import { getLayoutFromSlug } from "@/lib/utils/layout"
import { checkPathValidity, getPostSlugs } from "@/lib/utils/md"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { LOCALES_CODES } from "@/lib/constants"

import { componentsMapping, layoutMapping } from "@/layouts"
import { fetchGFIs } from "@/lib/api/fetchGFIs"
import { getPageData } from "@/lib/md/data"
import { getMdMetadata } from "@/lib/md/metadata"

const loadData = dataLoader([["gfissues", fetchGFIs]])

export default async function Page({
  params,
}: {
  params: Promise<SlugPageParams>
}) {
  const { locale, slug: slugArray } = await params

  // Check if this specific path is in our valid paths
  const validPaths = await generateStaticParams()
  const isValidPath = checkPathValidity(validPaths, await params)

  if (!isValidPath) notFound()

  // Enable static rendering
  setRequestLocale(locale)

  const [gfissues] = await loadData()

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

  // Generate breadcrumb items for the slug path
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `https://ethereum.org/${locale}/`,
    },
  ]

  // Add breadcrumb items for each part of the slug path
  const slugParts = slug.split("/").filter(Boolean)
  let currentPath = ""

  slugParts.forEach((part, index) => {
    currentPath += "/" + part
    breadcrumbItems.push({
      "@type": "ListItem",
      position: index + 2,
      name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
      item: `https://ethereum.org/${locale}${currentPath}/`,
    })
  })

  // JSON-LD structured data for the slug page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/${slug}/`,
    name: frontmatter.title,
    description: frontmatter.description,
    url: `https://ethereum.org/${locale}/${slug}/`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
  }

  // JSON-LD for the article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image
      ? `https://ethereum.org${frontmatter.image}`
      : undefined,
    author: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    dateModified: frontmatter.published,
    mainEntityOfPage: `https://ethereum.org/${locale}/${slug}/`,
    about: {
      "@type": "Thing",
      name: frontmatter.title,
      description: frontmatter.description,
    },
  }

  return (
    <>
      <script
        id="jsonld-webpage-slug"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <script
        id="jsonld-article-slug"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
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

export async function generateMetadata({
  params,
}: {
  params: Promise<SlugPageParams>
}) {
  const { locale, slug } = await params

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
