import pick from "lodash.pick"
import { notFound } from "next/navigation"
import { getMessages, setRequestLocale } from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getPostSlugs } from "@/lib/utils/md"
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
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug: slugArray } = await params

  // Check if this specific path is in our valid paths
  const validPaths = await generateStaticParams()
  const isValidPath = validPaths.some(
    (path) =>
      path.locale === locale && path.slug.join("/") === slugArray.join("/")
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
  const layout = frontmatter.template || "static"
  const Layout = layoutMapping[layout]

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
      >
        {content}
      </Layout>
    </I18nProvider>
  )
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs("/", /\/developers/)

  return LOCALES_CODES.flatMap((locale) =>
    slugs.map((slug) => ({
      slug: slug.split("/").slice(1),
      locale,
    }))
  )
}

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
