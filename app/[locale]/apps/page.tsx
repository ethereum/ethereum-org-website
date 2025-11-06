import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { CommitHistory, Lang, PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import { SimpleHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import SubpageCard from "@/components/SubpageCard"

import {
  extractAppsData,
  getDevconnectApps,
  getDiscoverApps,
  getHighlightedApps,
} from "@/lib/utils/apps"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { extractCommunityPicks } from "@/lib/utils/data/refactor/extractExternalData"
import { getExternalData } from "@/lib/utils/data/refactor/getExternalData"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { appsCategories } from "@/data/apps/categories"

import AppCard from "./_components/AppCard"
import AppsHighlight from "./_components/AppsHighlight"
import CommunityPicks from "./_components/CommunityPicks"
import DevconnectBanner from "./_components/DevconnectBanner"
import SuggestAnApp from "./_components/SuggestAnApp"
import TopApps from "./_components/TopApps"
import AppsJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch daily data (apps and community picks) with 24-hour revalidation
  const dailyData = await getExternalData(["appsData", "communityPicks"], 86400)

  // Extract apps data
  const appsDataRaw = dailyData?.appsData as
    | { value: Record<string, unknown> }
    | { error: string }
    | undefined
  const appsData = extractAppsData(appsDataRaw)

  // Extract community picks
  const communityPicks = extractCommunityPicks(dailyData)

  // Get 3 random highlighted apps
  const highlightedApps = getHighlightedApps(appsData, 3)

  // Get 6 random staff pick apps
  const discoverApps = getDiscoverApps(appsData, 6)

  // get devconnect apps
  const devconnectApps = getDevconnectApps(appsData)

  // Get translations
  const t = await getTranslations({ locale, namespace: "page-apps" })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/apps")
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "apps",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <>
      <AppsJsonLD locale={locale} contributors={contributors} />
      <I18nProvider locale={locale} messages={messages}>
        <SimpleHero
          breadcrumbs={<Breadcrumbs slug={"/apps"} />}
          title={t("page-apps-title")}
          subtitle={t("page-apps-subtitle")}
          buttons={[
            {
              href: "/what-are-apps/",
              label: t("page-apps-learn-button"),
              variant: "outline",
              isSecondary: true,
            },
          ]}
        />

        <MainArticle className="flex flex-col gap-32 py-10">
          <div className="flex flex-col gap-8 px-4 md:px-8">
            <h2>{t("page-apps-highlights-title")}</h2>
            <AppsHighlight apps={highlightedApps} matomoCategory="apps" />
          </div>

          <div className="flex flex-col gap-4 px-4 md:px-8">
            <DevconnectBanner apps={devconnectApps} />
          </div>

          <div className="flex flex-col gap-4 px-4 md:px-8">
            <h2>{t("page-apps-discover-title")}</h2>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {discoverApps.map((app) => (
                <AppCard
                  key={app.name}
                  app={app}
                  imageSize={24}
                  showDescription={true}
                  matomoCategory="apps"
                  matomoAction="staff"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 px-4 md:px-8">
            <h2>{t("page-apps-applications-title")}</h2>
            <TopApps appsData={appsData} />
          </div>

          {/* Note: Implemented this instead of swiper from design to allow for SSR */}
          <div className="flex flex-col gap-4 px-4 md:px-8">
            <h2>{t("page-apps-categories-title")}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.values(appsCategories).map((category) => (
                <SubpageCard
                  key={category.slug}
                  title={t(category.name)}
                  description={t(category.description)}
                  icon={<category.icon className="h-8 w-8" />}
                  href={`/apps/categories/${category.slug}`}
                  matomoEvent={{
                    eventCategory: "apps",
                    eventAction: "categories",
                    eventName: `category name ${t(category.name)}`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 px-4 md:px-8">
            <h2>{t("page-apps-community-picks-title")}</h2>
            <CommunityPicks
              communityPicks={communityPicks}
              appsData={appsData}
            />
          </div>

          <div className="flex flex-col px-4 md:px-8">
            <SuggestAnApp />
          </div>
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: "page-apps" })

  return await getMetadata({
    locale,
    slug: ["apps"],
    title: t("page-apps-meta-title"),
    description: t("page-apps-meta-description"),
  })
}

export default Page
