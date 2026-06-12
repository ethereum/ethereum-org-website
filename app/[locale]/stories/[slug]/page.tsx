import { pick } from "lodash"
import type { Metadata } from "next"
import { getMessages, setRequestLocale } from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"

import { dateToString } from "@/lib/utils/date"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import SlugJsonLD from "../../[...slug]/page-jsonld"
import { getStorySlugs } from "../utils"

import { componentsMapping, TutorialLayout } from "@/layouts"
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

  const pageData = await getPageData({
    locale,
    slug: fullSlug,
    baseComponents: mdComponents,
    componentsMapping,
    layout: "tutorial",
  })

  const {
    content,
    frontmatter,
    tocItems,
    lastEditLocaleTimestamp,
    isTranslated,
    contributors,
    timeToRead,
  } = pageData

  // Normalize the YAML date to a string before it crosses into the client
  // TutorialMetadata component, matching the shared [...slug] route.
  if ("published" in frontmatter) {
    frontmatter.published = dateToString(frontmatter.published)
  }

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(fullSlug, "tutorial")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <>
      <SlugJsonLD
        locale={locale}
        slug={fullSlug}
        frontmatter={frontmatter}
        contributors={contributors}
      />
      <I18nProvider locale={locale} messages={messages}>
        <TutorialLayout
          slug={fullSlug}
          frontmatter={frontmatter}
          tocItems={tocItems}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          contentNotTranslated={!isTranslated}
          contributors={contributors}
          timeToRead={Math.round(timeToRead.minutes)}
        >
          {content}
        </TutorialLayout>
      </I18nProvider>
    </>
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

  return await getMdMetadata({
    locale,
    slug: ["stories", slug],
  })
}

export default StoryPage
