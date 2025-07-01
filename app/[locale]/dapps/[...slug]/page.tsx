import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import Breadcrumbs from "@/components/Breadcrumbs"
import { ChevronNext } from "@/components/Chevron"
import I18nProvider from "@/components/I18nProvider"
import Discord from "@/components/icons/discord.svg"
import Github from "@/components/icons/github.svg"
import Twitter from "@/components/icons/twitter.svg"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tag } from "@/components/ui/tag"

import { DAPP_TAG_VARIANTS, getDappSlug } from "@/lib/utils/dapps"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import { fetchDapps } from "@/lib/api/fetchDapps"

// 24 hours
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const loadData = dataLoader([["dappsData", fetchDapps]], REVALIDATE_TIME * 1000)

const Page = async ({
  params,
}: {
  params: { locale: string; slug: string[] }
}) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/dapps")
  const messages = pick(allMessages, requiredNamespaces)

  const [dappSlug] = slug
  const [dappsData] = await loadData()
  const dapp = Object.values(dappsData)
    .flat()
    .find((dapp) => getDappSlug(dapp.name) === dappSlug)!

  if (!dapp) {
    notFound()
  }

  // Find the next dapp in the same category
  const findNextDapp = () => {
    const categoryDapps = dappsData[dapp.category] || []
    const currentIndex = categoryDapps.findIndex(
      (d) => getDappSlug(d.name) === dappSlug
    )

    if (currentIndex === -1) return null

    // If it's the last item, return the first item, otherwise return the next item
    const nextIndex =
      currentIndex === categoryDapps.length - 1 ? 0 : currentIndex + 1
    return categoryDapps[nextIndex]
  }

  const nextDapp = findNextDapp()

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="flex flex-col gap-10 py-10">
        <div className="flex flex-col gap-10 px-4 md:px-10">
          <Breadcrumbs slug={`/dapps/`} />
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-10">
              <div>
                <Image
                  src={dapp.image}
                  alt={dapp.name}
                  width={124}
                  height={124}
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div>
                    <Tag status={DAPP_TAG_VARIANTS[dapp.category]}>
                      {dapp.category}
                    </Tag>
                  </div>
                  <h1 className="mt-0">{dapp.name}</h1>
                </div>
                <div className="flex flex-row gap-4">
                  <ButtonLink href={dapp.url} target="_blank" hideArrow>
                    Visit {dapp.name}
                  </ButtonLink>
                  {dapp.twitter && (
                    <ButtonLink
                      href={dapp.twitter}
                      target="_blank"
                      variant="outline"
                      hideArrow
                    >
                      <Twitter />
                    </ButtonLink>
                  )}
                  {dapp.discord && (
                    <ButtonLink
                      href={dapp.discord}
                      target="_blank"
                      variant="outline"
                      hideArrow
                    >
                      <Discord />
                    </ButtonLink>
                  )}
                  {dapp.github && (
                    <ButtonLink
                      href={dapp.github}
                      target="_blank"
                      variant="outline"
                      hideArrow
                    >
                      <Github />
                    </ButtonLink>
                  )}
                </div>
              </div>
            </div>
            {nextDapp && (
              <LinkBox className="group flex flex-row items-center rounded-lg p-3 hover:bg-background-highlight">
                <div className="mr-2 flex flex-col text-right">
                  <p className="text-sm text-gray-500">See next</p>
                  <p className="text-primary group-hover:text-primary-hover">
                    {nextDapp.name}
                  </p>
                  <LinkOverlay href={`/dapps/${getDappSlug(nextDapp.name)}`} />
                </div>
                <div className="flex gap-2">
                  <ChevronNext className="h-8 w-8 text-gray-400 group-hover:text-primary" />
                </div>
              </LinkBox>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-11 bg-background-highlight px-4 py-10 md:px-8">
          <p>{dapp.description}</p>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl">Gallery</h2>
            <div className="flex flex-row gap-4">
              {dapp.screenshots.map((screenshot) => (
                <Image
                  key={screenshot}
                  src={screenshot}
                  alt={dapp.name}
                  width={340}
                  height={700}
                  className="h-[350px] w-[170px] rounded-lg object-cover"
                  unoptimized
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col px-4 md:px-8">
          <h2>More dapps like this</h2>
        </div>
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
    namespace: "page-dapps",
  })

  const [dappsData] = await loadData()

  const dapp = Object.values(dappsData)
    .flat()
    .find((dapp) => getDappSlug(dapp.name) === firstSegment)!

  if (!dapp) {
    notFound()
  }

  // Format dapp name for display (capitalize first letter)
  const formattedDapp =
    firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1)

  const title = t("page-dapps-meta-title", { dapp: formattedDapp })
  const description = t("page-dapps-meta-description", { dapp: formattedDapp })

  return await getMetadata({
    locale,
    slug: ["dapps", ...slug],
    title,
    description,
  })
}

export default Page
