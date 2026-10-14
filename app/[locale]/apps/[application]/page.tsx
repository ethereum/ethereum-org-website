import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type {
  AppData,
  CatalogItem,
  ChainName,
  Lang,
  PageParams,
} from "@/lib/types"

import AppCard from "@/components/AppCard"
import CatalogItemLayout, {
  CatalogItemLanguages,
  RelatedCatalogItems,
} from "@/components/CatalogItem"
import I18nProvider from "@/components/I18nProvider"

import { APP_TAG_VARIANTS } from "@/lib/utils/apps"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { formatDaysAgo, getLocaleYear, isValidDate } from "@/lib/utils/date"
import { getLocalizedDescription } from "@/lib/utils/i18n-descriptions"
import { getMetadata } from "@/lib/utils/metadata"
import {
  formatLanguageNames,
  getRequiredNamespacesForPage,
} from "@/lib/utils/translations"
import { slugify, toCatalogItemLink } from "@/lib/utils/url"

import { DEFAULT_LOCALE } from "@/lib/constants"

import AppsAppJsonLD from "./page-jsonld"

import { getAppsData } from "@/lib/data"

// Rendered on demand and revalidated daily to pick up apps data updates.
// Without generateStaticParams this route would render on every request.
export const revalidate = 86400
export const dynamicParams = true

const findApp = (appsData: Record<string, AppData[]>, slug: string) =>
  Object.values(appsData)
    .flat()
    .find((app) => slugify(app.name) === slug)

const Page = async (props: {
  params: Promise<PageParams & { application: string }>
}) => {
  const { locale, application } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-apps")
  const tCommon = await getTranslations("common")
  const tItem = await getTranslations("component-catalog-item")
  const appDescriptions = await getTranslations("page-app-descriptions")

  const allMessages = await getMessages({ locale })
  const messages = pick(allMessages, getRequiredNamespacesForPage("/apps"))

  const appsData = await getAppsData()
  if (!appsData) {
    throw new Error("Failed to fetch apps data")
  }

  const app = findApp(appsData, application)
  if (!app) {
    notFound()
  }

  const describe = (a: AppData) =>
    getLocalizedDescription(appDescriptions, "app", a.name, a.description)

  const categoryApps = [...(appsData[app.category] ?? [])].sort(
    (a, b) => b.sortingWeight - a.sortingWeight || a.name.localeCompare(b.name)
  )
  const index = categoryApps.indexOf(app)
  const nextApp =
    categoryApps.length > 1
      ? categoryApps[(index + 1) % categoryApps.length]
      : undefined
  const relatedApps = categoryApps
    .filter(
      (a) =>
        a !== app &&
        a !== nextApp &&
        a.subCategory.some((sub) => app.subCategory.includes(sub))
    )
    .slice(0, 3)

  const viewerLanguage = formatLanguageNames([locale])[0]
  const languages = formatLanguageNames(app.languages).sort(
    (a, b) => Number(b === viewerLanguage) - Number(a === viewerLanguage)
  )
  const lastUpdated = formatDaysAgo(locale, app.lastUpdated)

  const item: CatalogItem = {
    kind: "app",
    slug: application,
    name: app.name,
    logo: app.image || undefined,
    banner: app.bannerImage || undefined,
    screenshots: app.screenshots,
    tags: [{ label: app.category, status: APP_TAG_VARIANTS[app.category] }],
    chains: app.networks as ChainName[],
    description: describe(app),
    primaryLink: { href: app.url, label: tItem("catalog-item-visit-website") },
    socialLinks: [
      toCatalogItemLink("x", app.twitter),
      toCatalogItemLink("discord", app.discord),
      toCatalogItemLink("github", app.github),
    ].filter((link) => link !== undefined),
    infoRows: [
      isValidDate(app.dateOfLaunch) && {
        label: t("page-apps-info-founded"),
        value: getLocaleYear(locale, app.dateOfLaunch),
      },
      app.parentCompany && {
        label: t("page-apps-info-creator"),
        value: app.parentCompany,
      },
      languages.length > 0 && {
        label: t("page-apps-info-languages"),
        value: <CatalogItemLanguages names={languages} />,
      },
      lastUpdated && {
        label: t("page-apps-info-last-updated"),
        value: lastUpdated,
      },
    ].filter((row) => !!row),
    breadcrumbs: [
      { label: "ethereum.org", href: "/" },
      { label: tCommon("apps"), href: "/apps/" },
    ],
    next: nextApp && {
      name: nextApp.name,
      href: `/apps/${slugify(nextApp.name)}/`,
    },
  }

  const { contributors } = await getAppPageContributorInfo(
    "apps/[application]",
    locale as Lang
  )

  return (
    <>
      <AppsAppJsonLD
        locale={locale}
        app={app}
        contributors={contributors}
        description={describe(app)}
      />
      <I18nProvider locale={locale} messages={messages}>
        <CatalogItemLayout
          item={item}
          related={
            relatedApps.length > 0 && (
              <RelatedCatalogItems title={t("page-apps-more-apps-like-this")}>
                {relatedApps.map((relatedApp) => (
                  <AppCard
                    key={relatedApp.name}
                    name={relatedApp.name}
                    description={describe(relatedApp)}
                    thumbnail={relatedApp.image}
                    category={relatedApp.category}
                    categoryTagStatus={APP_TAG_VARIANTS[relatedApp.category]}
                    tags={relatedApp.subCategory}
                    href={`/apps/${slugify(relatedApp.name)}`}
                    imageSize="large"
                    className="hover:bg-background-highlight/50"
                    customEventOptions={{
                      eventCategory: "detail",
                      eventAction: "more_apps",
                      eventName: `app name ${relatedApp.name}`,
                    }}
                    descriptionTracking={{
                      eventCategory: "detail",
                      eventAction: "more_apps_show_more",
                      eventName: `app description ${relatedApp.name}`,
                    }}
                  />
                ))}
              </RelatedCatalogItems>
            )
          }
        />
      </I18nProvider>
    </>
  )
}

export function generateStaticParams() {
  return []
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; application: string }>
}) {
  const { locale, application } = await props.params
  setRequestLocale(locale)

  try {
    const appsData = await getAppsData()
    if (!appsData) {
      throw new Error("Failed to fetch apps data")
    }

    const app = findApp(appsData, application)
    if (!app) {
      throw new Error(`App not found: ${application}`)
    }

    const t = await getTranslations("page-apps")
    const appDescriptions = await getTranslations("page-app-descriptions")

    return await getMetadata({
      locale,
      slug: ["apps", application],
      title: t("page-apps-detail-meta-title", { name: app.name }),
      description: getLocalizedDescription(
        appDescriptions,
        "app",
        app.name,
        app.description
      ),
    })
  } catch {
    const t = await getTranslations({
      locale: DEFAULT_LOCALE,
      namespace: "common",
    })

    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
}

export default Page
