import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import Breadcrumbs from "@/components/Breadcrumbs"
import { SimpleHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import SubpageCard from "@/components/SubpageCard"

import { getDiscoverApps, getHighlightedApps } from "@/lib/utils/apps"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { appsCategories } from "@/data/apps/categories"

import { BASE_TIME_UNIT } from "@/lib/constants"

import AppCard from "./_components/AppCard"
import AppsHighlight from "./_components/AppsHighlight"
import CommunityPicks from "./_components/CommunityPicks"
import SuggestAnApp from "./_components/SuggestAnApp"
import TopApps from "./_components/TopApps"

import { fetchApps } from "@/lib/api/fetchApps"
import { fetchCommunityPicks } from "@/lib/api/fetchCommunityPicks"

// 24 hours
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const loadData = dataLoader(
  [
    ["appsData", fetchApps],
    ["communityPicks", fetchCommunityPicks],
  ],
  REVALIDATE_TIME * 1000
)

const Page = async ({ params }: { params: { locale: string } }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const [appsData, communityPicks] = await loadData()

  // Get 3 random highlighted apps
  const highlightedApps = getHighlightedApps(appsData, 3)

  // Get 6 random staff pick apps
  const discoverApps = getDiscoverApps(appsData, 6)

  // Get translations
  const t = await getTranslations({ locale, namespace: "page-apps" })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/apps")
  const messages = pick(allMessages, requiredNamespaces)

  // JSON-LD structured data for the apps page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/apps/`,
    name: t("page-apps-meta-title"),
    description: t("page-apps-meta-description"),
    url: `https://ethereum.org/${locale}/apps/`,
    inLanguage: locale,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://ethereum.org/${locale}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: t("page-apps-meta-title"),
          item: `https://ethereum.org/${locale}/apps/`,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Ethereum Foundation",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  const appCategoriesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("page-apps-categories-title"),
    description: t("page-apps-meta-description"),
    url: `https://ethereum.org/${locale}/apps/`,
    numberOfItems: Object.keys(appsCategories).length,
    itemListElement: Object.values(appsCategories).map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t(category.name),
      description: t(category.description),
      url: `https://ethereum.org/${locale}/apps/categories/${category.slug}`,
    })),
  }

  return (
    <>
      <script
        id="jsonld-webpage-apps"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />
      <script
        id="jsonld-categories-apps"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(appCategoriesJsonLd),
        }}
      />
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
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "page-apps" })

  return await getMetadata({
    locale,
    slug: ["apps"],
    title: t("page-apps-meta-title"),
    description: t("page-apps-meta-description"),
  })
}

export default Page
