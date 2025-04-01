import pick from "lodash.pick"
import { notFound } from "next/navigation"
import { getMessages, setRequestLocale } from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { dateToString } from "@/lib/utils/date"
import { getMdSlugs, getPostSlugs } from "@/lib/utils/md"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { componentsMapping, layoutMapping } from "@/layouts"
import { fetchGFIs } from "@/lib/api/fetchGFIs"
import { getPageData } from "@/lib/md/data"
import { getMdMetadata } from "@/lib/md/metadata"

const loadData = dataLoader([["gfissues", fetchGFIs]])

function getLayoutFromSlug(slug: string) {
  if (slug.includes("developers/docs")) {
    return "docs"
  }

  if (slug.includes("developers/tutorials")) {
    return "tutorial"
  }

  return "static"
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug: slugArray } = await params

  // Check if this specific path is in our valid paths
  const validPaths = await getPostSlugs("/")
  const isValidPath = validPaths.some(
    (path) => path.split("/").filter(Boolean).join("/") === slugArray.join("/")
  )

  if (!isValidPath) {
    notFound()
  }

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
  } = await getPageData({
    locale,
    slug,
    // TODO: Address component typing error here (flip `FC` types to prop object types)
    // @ts-expect-error Incompatible component function signatures
    components: { ...mdComponents, ...componentsMapping },
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
    <I18nProvider locale={locale} messages={messages}>
      <Layout
        slug={slug}
        frontmatter={frontmatter}
        tocItems={tocItems}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contentNotTranslated={!isTranslated}
        contributors={contributors}
        // TODO: Remove this once we have a real timeToRead value
        timeToRead={2}
      >
        {content}
      </Layout>
    </I18nProvider>
  )
}

export async function generateStaticParams() {
  const sourceSlugs = await getPostSlugs("/")

  // build statically only those pages that have an existing md file,
  // the rest is built on demand
  const mdPaths = await getMdSlugs("/")

  return mdPaths
    .map((path) => {
      const slugArray = path.split("/").filter(Boolean)
      const [translationFolder, locale, ...slug] = slugArray

      if (translationFolder === "translations") {
        const sourceSlug = sourceSlugs.find(
          (s) => s.split("/").filter(Boolean).join("/") === slug.join("/")
        )

        if (!sourceSlug) {
          return null
        }

        return {
          slug,
          locale,
        }
      }

      return {
        slug: slugArray,
        locale: DEFAULT_LOCALE,
      }
    })
    .filter(Boolean)
}

export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug } = await params

  return await getMdMetadata({
    locale,
    slug,
  })
}
