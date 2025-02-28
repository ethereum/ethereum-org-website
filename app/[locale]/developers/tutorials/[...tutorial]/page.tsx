import { join } from "path"

import pick from "lodash.pick"
import { getMessages, setRequestLocale } from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"

import { dateToString } from "@/lib/utils/date"
import { getPostSlugs } from "@/lib/utils/md"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { LOCALES_CODES } from "@/lib/constants"

import { TutorialLayout, tutorialsComponents } from "@/layouts"
import { getPageData } from "@/lib/md/data"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; tutorial: string[] }>
}) {
  const { locale, tutorial: tutorialArray } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const slug = join("developers/tutorials", ...tutorialArray)

  const layout = "tutorial"

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
    components: { ...mdComponents, ...tutorialsComponents },
    layout,
  })

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
      <TutorialLayout
        slug={slug}
        frontmatter={frontmatter}
        tocItems={tocItems}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
        contentNotTranslated={!isTranslated}
        timeToRead={2}
      >
        {content}
      </TutorialLayout>
    </I18nProvider>
  )
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs("/developers/tutorials")

  return LOCALES_CODES.flatMap((locale) =>
    slugs.map((slug) => ({
      tutorial: slug.replace("/developers/tutorials", "").split("/").slice(1),
      locale,
    }))
  )
}

export const dynamicParams = false
