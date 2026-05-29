import { pick } from "lodash"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"

import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { getStorySlugs } from "../utils"

import { componentsMapping, StaticLayout } from "@/layouts"
import { getPageData } from "@/lib/md/data"
import { getMdMetadata } from "@/lib/md/metadata"

const StoryPage = async (props: {
  params: Promise<{ locale: string; slug: string }>
}) => {
  const { locale, slug } = await props.params

  setRequestLocale(locale)

  // Story content lives at public/content/stories/{slug}/index.md, so it slots
  // straight into the shared markdown pipeline once we prefix the slug.
  const fullSlug = `stories/${slug}`

  let pageData
  try {
    pageData = await getPageData({
      locale,
      slug: fullSlug,
      baseComponents: mdComponents,
      componentsMapping,
      layout: "static",
    })
  } catch {
    notFound()
  }

  const {
    content,
    frontmatter,
    tocItems,
    lastEditLocaleTimestamp,
    isTranslated,
    contributors,
  } = pageData

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(fullSlug, "static")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <StaticLayout
        slug={fullSlug}
        frontmatter={frontmatter}
        tocItems={tocItems}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contentNotTranslated={!isTranslated}
        contributors={contributors}
      >
        {content}
      </StaticLayout>
    </I18nProvider>
  )
}

export async function generateStaticParams() {
  const slugs = await getStorySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await props.params

  try {
    return await getMdMetadata({
      locale,
      slug: ["stories", slug],
    })
  } catch {
    const t = await getTranslations("common")
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
}

export default StoryPage
