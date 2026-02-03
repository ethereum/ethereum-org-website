import { redirect } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import AppCard from "@/components/AppCard"
import { ContentHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import SubpageCard from "@/components/SubpageCard"
import { Button } from "@/components/ui/buttons/Button"
import { Card } from "@/components/ui/card"
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import AppModalContents from "./_components/AppModalContents"
import AppModalWrapper from "./_components/AppModalWrapper"
import HighlightsSection from "./_components/HighlightsSection"
import { DEV_APP_CATEGORIES } from "./constants"
import DevelopersAppsJsonLD from "./page-jsonld"
import type { DeveloperAppsByCategory } from "./types"

import { getDeveloperToolsData } from "@/lib/data"

const Page = async ({
  params,
  searchParams,
}: {
  params: PageParams
  searchParams: { appId?: string }
}) => {
  const { locale } = params
  const { appId } = searchParams

  setRequestLocale(locale)
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  const data = await getDeveloperToolsData()
  if (!data) throw Error("No developer apps data available")

  const { appsById, selections } = data

  const activeApp = appId ? appsById[appId] : undefined

  // Clean up invalid appId by redirecting
  if (appId && !activeApp) {
    redirect("/developers/apps")
  }

  // Resolve highlight IDs to full app objects
  const highlights = selections.mainPageHighlights
    .map((id) => appsById[id])
    .filter(Boolean)

  // Resolve preview IDs per category
  const previewsByCategory = Object.fromEntries(
    DEV_APP_CATEGORIES.map(({ slug }) => [
      slug,
      (selections.categoryPreviews[slug] || [])
        .map((id) => appsById[id])
        .filter(Boolean),
    ])
  ) as DeveloperAppsByCategory

  // Get contributor info for JSON-LD
  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "developers/apps",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <>
      <DevelopersAppsJsonLD locale={locale} contributors={contributors} />
      <ContentHero
        breadcrumbs={{ slug: "/developers/tools" }}
        title={t("page-developers-tools-title")}
        description={t("page-developers-tools-subtitle")}
        className="border-none pb-0"
      />
      <MainArticle className="space-y-20 px-4 py-10 md:px-8">
        <HighlightsSection apps={highlights} />

        <Section id="apps" className="space-y-4">
          <h2>{t("page-developers-tools-applications-title")}</h2>
          <EdgeScrollContainer>
            {DEV_APP_CATEGORIES.map(({ slug, Icon }) => (
              <EdgeScrollItem
                key={slug}
                asChild
                className="ms-6 w-[calc(100%-4rem)] max-w-md md:min-w-96 md:flex-1 lg:max-w-[33%]"
              >
                <Card className="h-fit overflow-hidden border">
                  <LinkBox className="p-4 hover:bg-background-highlight">
                    <LinkOverlay
                      href={`/developers/apps/${slug}`}
                      className="text-body no-underline"
                    >
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg border p-2">
                          <Icon className="size-6" />
                        </div>
                        <h3 className="flex-1 text-md">
                          {t(`page-developers-tools-category-${slug}-title`)}
                        </h3>
                        <Button
                          variant="outline"
                          isSecondary
                          size="sm"
                          className="shrink-0 text-sm"
                        >
                          {t("page-developers-tools-see-all")}
                        </Button>
                      </div>
                    </LinkOverlay>
                  </LinkBox>

                  {previewsByCategory[slug].map((app) => (
                    <AppCard
                      key={app.id}
                      name={app.name}
                      thumbnail={app.thumbnail_url}
                      tags={app.tags.map((tag) =>
                        t(`page-developers-tools-tag-${tag}`)
                      )}
                      href={`?appId=${app.id}`}
                      layout="horizontal"
                      imageSize="thumbnail"
                      className="rounded-none border-t p-4"
                    />
                  ))}
                </Card>
              </EdgeScrollItem>
            ))}
          </EdgeScrollContainer>
        </Section>

        <Section id="categories" className="space-y-4">
          <h2>{t("page-developers-tools-categories-title")}</h2>
          <div className="grid grid-cols-fill-4 gap-8">
            {DEV_APP_CATEGORIES.map(({ slug, Icon }) => (
              <SubpageCard
                key={slug}
                title={t(`page-developers-tools-category-${slug}-title`)}
                description={t(
                  `page-developers-tools-category-${slug}-description`
                )}
                icon={<Icon className="size-8" />}
                href={`/developers/apps/${slug}`}
              />
            ))}
          </div>
        </Section>
      </MainArticle>

      <AppModalWrapper variant="unstyled" open={!!activeApp}>
        {activeApp && <AppModalContents app={activeApp} />}
      </AppModalWrapper>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  return await getMetadata({
    locale,
    slug: ["developers", "tools"],
    title: t("page-developers-tools-meta-title"),
    description: t("page-developers-tools-meta-description"),
  })
}

export default Page
