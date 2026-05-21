import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Frontmatter, Lang, Layout, SlugPageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import mdComponents from "@/components/MdComponents"
import StakingCommunityCallout from "@/components/Staking/StakingCommunityCallout"
import VideoWatch from "@/components/Videos/VideoWatch"

import { getMarkdownFileContributorInfo } from "@/lib/utils/contributors"
import { dateToString } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { topics } from "@/data/topics"

import SlugJsonLD from "./page-jsonld"

import { componentsMapping, layoutMapping, TopicLayout } from "@/layouts"
import { getCompiledPage, getEnglishPageSlugs } from "@/lib/md/getCompiledPage"
import MdxContent from "@/lib/md/MdxContent"

const resolveLayout = (template: string | undefined): Layout => {
  if (template && template in layoutMapping) return template as Layout
  return "static"
}

export default async function Page(props: { params: Promise<SlugPageParams> }) {
  const params = await props.params
  const { locale, slug: slugArray } = params
  const slug = slugArray.join("/")

  const page = getCompiledPage(locale, slug)
  if (!page) notFound()

  // Enable static rendering
  setRequestLocale(locale)

  const layout = resolveLayout(page.template)
  const topicConfig = topics[layout]

  // Contributors + last-edit timestamp: runtime lookup is cheap (single
  // data-layer fetch cached for the process, then O(1) per-file lookup).
  const { contributors, lastUpdatedDate } =
    await getMarkdownFileContributorInfo(
      slug,
      locale,
      (page.lang as string) ?? locale
    )
  const lastEditLocaleTimestamp = lastUpdatedDate
    ? getLocaleTimestamp(locale as Lang, lastUpdatedDate)
    : undefined

  // Compose components: base (server-only inline embeds) + layout overrides.
  const components = {
    ...mdComponents,
    VideoWatch,
    ...(componentsMapping[layout] ?? {}),
  }

  // Shape `frontmatter` the way layouts + JSON-LD expect. The Velite Page
  // type carries strictly-optional fields, but the legacy Frontmatter union
  // marks several as required; we cast through `unknown` since the layouts
  // tolerate undefined for fields they don't display.
  const frontmatter = {
    ...page,
    published: page.published
      ? dateToString(page.published as unknown as string | Date)
      : undefined,
  } as unknown as Frontmatter

  // i18n messages for the route
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(slug, layout)
  const messages = pick(allMessages, requiredNamespaces)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tocItems = (page.toc as any)?.items ?? []
  const content = <MdxContent body={page.body} components={components} />

  if (topicConfig) {
    const afterContent =
      layout === "staking" ? (
        <StakingCommunityCallout className="my-16" />
      ) : undefined

    return (
      <>
        <SlugJsonLD
          locale={locale}
          slug={slug}
          frontmatter={frontmatter}
          contributors={contributors}
        />
        <I18nProvider locale={locale} messages={messages}>
          <TopicLayout
            slug={slug}
            frontmatter={frontmatter}
            tocItems={tocItems}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            contentNotTranslated={!page.isTranslated}
            contributors={contributors}
            config={topicConfig}
          >
            {content}
            {afterContent}
          </TopicLayout>
        </I18nProvider>
      </>
    )
  }

  const Layout = layoutMapping[layout]

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
          contentNotTranslated={!page.isTranslated}
          contributors={contributors}
          timeToRead={page.timeToRead}
        >
          {content}
        </Layout>
      </I18nProvider>
    </>
  )
}

export function generateStaticParams() {
  return getEnglishPageSlugs().map((slug) => ({
    slug: slug.split("/"),
  }))
}

export async function generateMetadata(props: {
  params: Promise<SlugPageParams>
}) {
  const params = await props.params
  const { locale, slug: slugArray } = params
  const slug = slugArray.join("/")

  const page = getCompiledPage(locale, slug)
  if (!page) {
    const t = await getTranslations("common")
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }

  const title = page.metaTitle ?? page.title ?? ""
  const pageTitle = title.includes("ethereum.org")
    ? title
    : `${title} | ethereum.org`

  return getMetadata({
    locale,
    slug: slugArray,
    title: pageTitle,
    description: page.description ?? undefined,
    image: page.image,
    author: page.author,
  })
}
