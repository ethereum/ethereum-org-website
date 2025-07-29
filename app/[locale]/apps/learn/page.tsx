import { pick } from "lodash"
import { notFound } from "next/navigation"
import { getMessages, setRequestLocale } from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"

import { getLayoutFromSlug } from "@/lib/utils/layout"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { componentsMapping, layoutMapping } from "@/layouts"
import { getPageData } from "@/lib/md/data"
import { getMdMetadata } from "@/lib/md/metadata"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Lang }>
}) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const slug = "apps/learn"

  try {
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
    })

    // Determine the actual layout after we have the frontmatter
    const layout = frontmatter.template || getLayoutFromSlug(slug)
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
          contributors={contributors}
          timeToRead={Math.round(timeToRead.minutes)}
        >
          {content}
        </Layout>
      </I18nProvider>
    )
  } catch (error) {
    console.error("Error loading apps/learn page:", error)
    notFound()
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  try {
    return await getMdMetadata({
      locale,
      slug: "apps/learn".split("/"),
    })
  } catch (error) {
    console.error("Error generating metadata for apps/learn:", error)
    notFound()
  }
}
