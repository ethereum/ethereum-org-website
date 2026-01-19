import { AppWindowMac } from "lucide-react"
import Image from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageParams } from "@/lib/types"

import { ContentHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import SubpageCard from "@/components/SubpageCard"
import { CardBanner, CardParagraph, CardTitle } from "@/components/ui/card"
import { Divider } from "@/components/ui/divider"
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Section } from "@/components/ui/section"
import { Tag, TagsInlineText } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { getMetadata } from "@/lib/utils/metadata"

import { fetchDeveloperApps } from "@/data-layer/fetchers/fetchDeveloperApps"
import { fetchDeveloperAppsGitHub } from "@/data-layer/fetchers/fetchDeveloperAppsGitHub"

import AppModal from "../_components/Modal"
import { DEV_APP_CATEGORIES } from "../constants"
import type { DeveloperAppCategorySlug } from "../types"
import { transformDeveloperAppsData } from "../utils"

import { routing } from "@/i18n/routing"

const Page = async ({
  params,
  searchParams,
}: {
  params: PageParams & { category: DeveloperAppCategorySlug }
  searchParams: { appId?: string }
}) => {
  const { locale, category } = params
  const { appId } = searchParams

  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "page-developers-apps" })
  const tCommon = await getTranslations({ locale, namespace: "common" })

  // const appsData = await getDeveloperAppsData() // TODO: data-layer
  const rawData = await fetchDeveloperApps() // TODO: Trim mock data
  if (!rawData) throw Error("No developer apps data available")
  const enrichedData = await fetchDeveloperAppsGitHub(rawData)
  const dataByCategory = transformDeveloperAppsData(enrichedData)
  const categoryData = dataByCategory[category]

  const activeApp = enrichedData.find((app) => app.id === appId)

  const featuredNames = ["ZK Email", "Hardhat", "Updraft"] // TODO: determine logic, make DRY
  const highlights = rawData.filter(({ name }) => featuredNames.includes(name))

  return (
    <>
      <ContentHero
        breadcrumbs={{
          slug: `/developers/apps/${t(`page-developers-apps-category-${category}-breadcrumb`)}`,
        }}
        title={t(`page-developers-apps-category-${category}-title`)}
        description={t(`page-developers-apps-category-${category}-description`)} // TODO: Confirm
      />
      <MainArticle className="space-y-20 px-4 py-10 md:px-8">
        {/* Featured developer tools */}
        <Section id="highlights" className="space-y-4">
          <h2>{t("page-developers-apps-highlights")}</h2>
          <EdgeScrollContainer>
            {highlights.map((app) => (
              <EdgeScrollItem
                key={app.id}
                asChild
                className="ms-6 w-[calc(100%-4rem)] max-w-md md:min-w-96 md:flex-1 lg:max-w-[33%]"
              >
                <LinkBox
                  className={cn(
                    "group rounded-xl p-2",
                    "hover:bg-background-highlight"
                  )}
                >
                  <LinkOverlay
                    href={`?appId=${app.id}`}
                    scroll={false}
                    className="space-y-6 no-underline"
                  >
                    <div className="space-y-4">
                      <CardBanner background="accent-a">
                        <Image
                          src={app.banner_url!}
                          alt=""
                          className="object-cover"
                          sizes="(max-width: 420px) 100vw, 420px"
                          width={420}
                          height={200}
                        />
                      </CardBanner>
                      <CardParagraph variant="base" className="line-clamp-2">
                        {app.description}
                      </CardParagraph>
                    </div>
                    <div className="flex flex-nowrap items-center gap-3 p-2">
                      <CardBanner size="thumbnail">
                        <Image
                          src={app.thumbnail_url!}
                          alt={tCommon("item-logo", { item: app.name })}
                          sizes="3.75rem"
                          width={3.75 * 16}
                          height={3.75 * 16}
                        />
                      </CardBanner>

                      <div className="space-y-1.5">
                        <Tag
                          size="small"
                          status="tag-red" // TODO: tag colors
                          className="py-0"
                        >
                          {app.category}
                        </Tag>
                        <CardTitle>{app.name}</CardTitle>
                        <TagsInlineText
                          list={app.tags.map((tag) =>
                            t(`page-developers-app-tag-${tag}`)
                          )}
                          max={3} // TODO: Confirm / sort?
                          variant="light"
                          className="lowercase"
                        />
                      </div>
                    </div>
                  </LinkOverlay>
                </LinkBox>
              </EdgeScrollItem>
            ))}
          </EdgeScrollContainer>
        </Section>

        <Section id="apps" className="space-y-4">
          <h2 className="sr-only">
            {t("page-developers-apps-applications-title")}
          </h2>

          {/* // TODO: "Filter by / showing (n)" bar, replace Divider */}
          <Divider />

          <div className="grid grid-cols-fill-3 gap-x-8">
            {categoryData.map((app) => (
              <LinkBox
                key={app.id}
                className="h-fit rounded-xl p-6 hover:bg-background-highlight"
              >
                <LinkOverlay
                  href={`?appId=${app.id}`}
                  scroll={false}
                  className="flex gap-x-3 no-underline"
                >
                  <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg border">
                    {app.thumbnail_url ? (
                      <Image
                        src={app.thumbnail_url}
                        alt=""
                        width={58}
                        height={58}
                      />
                    ) : (
                      <AppWindowMac className="size-12" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-body">{app.name}</p>
                    <TagsInlineText
                      list={app.tags.map((tag) =>
                        t(`page-developers-app-tag-${tag}`)
                      )}
                      variant="light"
                      className="lowercase"
                    />
                  </div>
                </LinkOverlay>
              </LinkBox>
            ))}
          </div>
        </Section>

        <Section id="categories" className="space-y-4">
          <h2>{t("page-developers-apps-categories-title-other")}</h2>
          <div className="grid grid-cols-fill-4 gap-8">
            {DEV_APP_CATEGORIES.filter(({ slug }) => slug !== category).map(
              ({ slug, Icon }) => (
                <SubpageCard
                  key={slug}
                  title={t(`page-developers-apps-category-${slug}-title`)}
                  description={t(
                    `page-developers-apps-category-${slug}-description`
                  )}
                  icon={<Icon className="size-8" />}
                  href={`/developers/apps/${slug}`}
                  matomoEvent={{
                    // TODO: Confirm all
                    eventCategory: "developer-apps",
                    eventAction: "categories",
                    eventName: `category name ${slug}`,
                  }}
                />
              )
            )}
          </div>
        </Section>
      </MainArticle>

      <AppModal open={!!activeApp}>Hola mundo</AppModal>
    </>
  )
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => {
    return DEV_APP_CATEGORIES.map(({ slug }) => ({ category: slug, locale }))
  })
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; category: string }
}) {
  const { locale, category } = params
  const t = await getTranslations({ locale, namespace: "page-developers-apps" })

  return await getMetadata({
    locale,
    slug: ["developers", "apps", category],
    title: t(`page-developers-apps-category-${category}-title`),
    description: t(
      `page-developers-apps-category-${category}-meta-description`
    ),
  })
}

export default Page
