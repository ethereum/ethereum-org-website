import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { ChainName } from "@/lib/types"

import { ChainImages } from "@/components/ChainImages"
import { ChevronNext } from "@/components/Chevron"
import I18nProvider from "@/components/I18nProvider"
import Discord from "@/components/icons/discord.svg"
import Github from "@/components/icons/github.svg"
import Twitter from "@/components/icons/twitter.svg"
import { LanguagesIcon } from "@/components/icons/wallets"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { SupportedLanguagesTooltip } from "@/components/SupportedLanguagesTooltip"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tag } from "@/components/ui/tag"

import { APP_TAG_VARIANTS } from "@/lib/utils/apps"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import {
  formatLanguageNames,
  getRequiredNamespacesForPage,
} from "@/lib/utils/translations"
import { slugify } from "@/lib/utils/url"
import { formatStringList } from "@/lib/utils/wallets"

import { BASE_TIME_UNIT } from "@/lib/constants"

import AppCard from "../_components/AppCard"

import ScreenshotSwiper from "./_components/ScreenshotSwiper"

import { fetchApps } from "@/lib/api/fetchApps"

// 24 hours
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const loadData = dataLoader([["appsData", fetchApps]], REVALIDATE_TIME * 1000)

const Page = async ({
  params,
}: {
  params: { locale: string; slug: string[] }
}) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/apps")
  const messages = pick(allMessages, requiredNamespaces)

  const [appSlug] = slug
  const [appsData] = await loadData()
  const app = Object.values(appsData)
    .flat()
    .find((app) => slugify(app.name) === appSlug)!

  if (!app) {
    notFound()
  }

  // Find the next app in the same category
  const findNextApp = () => {
    const categoryApps = appsData[app.category] || []
    const currentIndex = categoryApps.findIndex(
      (a) => slugify(a.name) === appSlug
    )

    if (currentIndex === -1) return null

    // If it's the last item, return the first item, otherwise return the next item
    const nextIndex =
      currentIndex === categoryApps.length - 1 ? 0 : currentIndex + 1
    return categoryApps[nextIndex]
  }

  const nextApp = findNextApp()

  // Find related apps with matching subcategories
  const getRelatedApps = () => {
    const categoryApps = appsData[app.category] || []
    const currentSubcategories = app.subCategory

    return categoryApps
      .filter((a) => {
        // Exclude the current app
        if (slugify(a.name) === appSlug) return false

        // Check if this app has at least one matching subcategory
        return a.subCategory.some((sub) => currentSubcategories.includes(sub))
      })
      .slice(0, 3) // Limit to 3 apps
  }

  const relatedApps = getRelatedApps()

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "1 day ago"
    return `${diffInDays} days ago`
  }

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="flex flex-col gap-10 py-10">
        <div className="flex flex-col gap-10 px-4 md:px-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/apps">ALL APPS</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="me-[0.625rem] ms-[0.625rem] text-gray-400">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{app.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col items-start justify-between sm:flex-row lg:items-center">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
              <div>
                <Image
                  src={app.image}
                  alt={app.name}
                  width={124}
                  height={124}
                  className="h-16 w-16 rounded-xl object-cover xl:h-[124px] xl:w-[124px]"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div>
                    <Tag status={APP_TAG_VARIANTS[app.category]}>
                      {app.category}
                    </Tag>
                  </div>
                  <h1 className="mt-0 text-xl lg:text-5xl">{app.name}</h1>
                  <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
                    <div className="flex flex-row items-center gap-2">
                      <ChainImages
                        chains={app.networks as ChainName[]}
                        className="mt-2"
                      />
                      <p className="text-sm text-body-medium">
                        by {app.parentCompany}
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
                      <LanguagesIcon className="size-6" />
                      <p className="text-sm text-body-medium">
                        {formatStringList(
                          formatLanguageNames(app.languages),
                          5
                        )}{" "}
                        <SupportedLanguagesTooltip
                          supportedLanguages={formatLanguageNames(
                            app.languages
                          )}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 lg:flex-row">
                  <ButtonLink href={app.url} target="_blank" hideArrow>
                    Visit {app.name}
                  </ButtonLink>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-row flex-wrap gap-4">
                      {app.twitter && (
                        <ButtonLink
                          href={app.twitter}
                          target="_blank"
                          variant="outline"
                          isSecondary
                          hideArrow
                        >
                          <Twitter />
                        </ButtonLink>
                      )}
                      {app.discord && (
                        <ButtonLink
                          href={app.discord}
                          target="_blank"
                          variant="outline"
                          isSecondary
                          hideArrow
                        >
                          <Discord />
                        </ButtonLink>
                      )}
                      {app.github && (
                        <ButtonLink
                          href={app.github}
                          target="_blank"
                          variant="outline"
                          isSecondary
                          hideArrow
                        >
                          <Github />
                        </ButtonLink>
                      )}
                    </div>
                    {nextApp && (
                      <LinkBox className="group flex flex-row items-center rounded-lg p-3 hover:bg-background-highlight sm:hidden">
                        <div className="mr-2 flex flex-col text-right">
                          <p className="text-sm text-gray-500">See next</p>
                          <p className="text-primary group-hover:text-primary-hover">
                            {nextApp.name}
                          </p>
                          <LinkOverlay
                            href={`/apps/${slugify(nextApp.name)}`}
                          />
                        </div>
                        <div className="flex gap-2">
                          <ChevronNext className="h-8 w-8 text-gray-400 group-hover:text-primary" />
                        </div>
                      </LinkBox>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {nextApp && (
              <LinkBox className="group hidden flex-row items-center rounded-lg p-3 hover:bg-background-highlight sm:flex">
                <div className="mr-2 flex flex-col text-right">
                  <p className="text-sm text-gray-500">See next</p>
                  <p className="text-primary group-hover:text-primary-hover">
                    {nextApp.name}
                  </p>
                  <LinkOverlay href={`/apps/${slugify(nextApp.name)}`} />
                </div>
                <div className="flex gap-2">
                  <ChevronNext className="h-8 w-8 text-gray-400 group-hover:text-primary" />
                </div>
              </LinkBox>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10 bg-background-highlight px-4 py-10 md:flex-row md:px-8">
          <div className="flex flex-1 flex-col gap-11">
            <p className="max-w-3xl">{app.description}</p>
            <div className="flex h-fit w-full flex-col gap-4 rounded-2xl border bg-background p-8 md:hidden md:w-44">
              <h3 className="text-lg">Info</h3>
              <div>
                <p className="text-sm text-body-medium">Founded</p>
                <p className="text-sm">
                  {new Date(app.dateOfLaunch).getFullYear()}
                </p>
              </div>
              <div>
                <p className="text-sm text-body-medium">Creator</p>
                <p className="text-sm">{app.parentCompany}</p>
              </div>
              <div>
                <p className="text-sm text-body-medium">Last updated</p>
                <p className="text-sm">{getTimeAgo(app.lastUpdated)}</p>
              </div>
            </div>
            {app.screenshots.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl">Gallery</h3>
                <ScreenshotSwiper
                  screenshots={app.screenshots}
                  appName={app.name}
                />
              </div>
            )}
          </div>
          <div className="hidden h-fit w-full flex-col gap-4 rounded-2xl border bg-background p-8 md:flex md:w-44">
            <h3 className="text-lg">Info</h3>
            <div>
              <p className="text-sm text-body-medium">Founded</p>
              <p className="text-sm">
                {new Date(app.dateOfLaunch).getFullYear()}
              </p>
            </div>
            <div>
              <p className="text-sm text-body-medium">Creator</p>
              <p className="text-sm">{app.parentCompany}</p>
            </div>
            <div>
              <p className="text-sm text-body-medium">Last updated</p>
              <p className="text-sm">{getTimeAgo(app.lastUpdated)}</p>
            </div>
          </div>
        </div>

        {relatedApps.length > 0 && (
          <div className="flex flex-col px-4 py-10 md:px-8">
            <div className="flex w-full flex-col items-center gap-8 rounded-2xl bg-gradient-to-t from-blue-500/20 from-10% to-blue-500/5 to-90% p-12 px-4 md:px-8">
              <h2>More apps like this</h2>
              <div className="flex w-full flex-col gap-4 lg:flex-row">
                {relatedApps.map((relatedApp) => (
                  <div
                    key={relatedApp.name}
                    className="flex-1 lg:w-1/3 lg:flex-none"
                  >
                    <AppCard
                      app={relatedApp}
                      imageSize={24}
                      showDescription={true}
                      hoverClassName="hover:bg-background-highlight/50"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug } = await params
  const [firstSegment] = slug

  const t = await getTranslations({
    locale,
    namespace: "page-apps",
  })

  const [appsData] = await loadData()

  const app = Object.values(appsData)
    .flat()
    .find((app) => slugify(app.name) === firstSegment)!

  if (!app) {
    notFound()
  }

  // Format app name for display (capitalize first letter)
  const formattedApp =
    firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1)

  const title = t("page-apps-meta-title", { app: formattedApp })
  const description = t("page-apps-meta-description", { app: formattedApp })

  return await getMetadata({
    locale,
    slug: ["apps", ...slug],
    title,
    description,
  })
}

export default Page
