import matter from "gray-matter"
import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import readingTime from "reading-time"

import type { Frontmatter, Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"
import VideoWatch from "@/components/Videos/VideoWatch"

import { getMarkdownFileContributorInfo } from "@/lib/utils/contributors"
import { dateToString } from "@/lib/utils/date"
import { getLayoutFromSlug } from "@/lib/utils/layout"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import SlugJsonLD from "./page-jsonld"

import { componentsMapping, layoutMapping } from "@/layouts"
import { importMd } from "@/lib/md/import"
import { contentSource } from "@/lib/poc-fumadocs/source"
import { fumadocsTocToCItems } from "@/lib/poc-fumadocs/toc"

type Params = { locale: string; slug: string[] }

// PoC cutover: this catch-all is served entirely by Fumadocs for English.
// Non-English locales 404 here until the i18n adapter lands — see
// docs/poc/fumadocs-evaluation.md for the open i18n question.
export default async function Page(props: { params: Promise<Params> }) {
  const { locale, slug: slugArray } = await props.params

  if (locale !== "en") notFound()

  const page = contentSource.getPage(slugArray)
  if (!page) notFound()

  setRequestLocale(locale)

  const slug = slugArray.join("/")
  const MDXContent = page.data.body
  const tocItems = fumadocsTocToCItems(
    page.data.toc as
      | { title: unknown; url: string; depth: number }[]
      | undefined
  )

  // Pull frontmatter from the raw markdown so we don't carry `page.data.body`
  // (a function) or `page.data.toc` (React nodes) into the Layout's client
  // boundary — RSC can't serialize functions as props to client components.
  const { markdown } = await importMd(locale, slug)
  const { data: frontmatterData } = matter(markdown)
  const frontmatter = frontmatterData as Frontmatter

  // Layout selection: frontmatter.template wins, else heuristic from slug.
  const layout = frontmatter.template || getLayoutFromSlug(slug)
  const Layout = layoutMapping[layout]

  // Contributors + last-edit timestamp via filesystem + git scan.
  const { contributors, lastUpdatedDate } =
    await getMarkdownFileContributorInfo(
      slug,
      locale,
      frontmatter.lang as string
    )
  const lastEditLocaleTimestamp = lastUpdatedDate
    ? getLocaleTimestamp(locale as Lang, lastUpdatedDate)
    : undefined

  const timeToRead = readingTime(markdown)

  if ("published" in frontmatter) {
    frontmatter.published = dateToString(frontmatter.published)
  }

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(slug, layout)
  const messages = pick(allMessages, requiredNamespaces)

  // Components: base (mdComponents + VideoWatch) + layout-specific overrides.
  const components = {
    ...mdComponents,
    VideoWatch,
    ...(componentsMapping[layout] ?? {}),
  }

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
          contentNotTranslated={false}
          contributors={contributors}
          timeToRead={Math.round(timeToRead.minutes)}
        >
          <MDXContent components={components} />
        </Layout>
      </I18nProvider>
    </>
  )
}

export async function generateStaticParams() {
  // English only; non-EN locales return notFound() above.
  return contentSource.generateParams().map((p) => ({
    ...p,
    locale: "en",
  }))
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { locale, slug } = await props.params
  if (locale !== "en") {
    const t = await getTranslations("common")
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
  const page = contentSource.getPage(slug)
  if (!page) {
    const t = await getTranslations("common")
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
  return {
    title: page.data.title,
    description: page.data.description,
  }
}
