import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"
// import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { getDappSlug } from "@/lib/utils/dapps"
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

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="flex flex-col gap-10 py-10">
        <div className="flex flex-col px-4 md:px-8">
          {/* <Image src={dapp.image} alt={dapp.name} width={100} height={100} /> */}
          <h1>{dapp.name}</h1>
          <div>
            <ButtonLink href={dapp.url} target="_blank">
              Try out {dapp.name}
            </ButtonLink>
          </div>
        </div>

        <div className="flex flex-col px-4 md:px-8">
          <p>{dapp.description}</p>
        </div>

        <div className="flex flex-col px-4 md:px-8">
          <h2>Screenshots</h2>
        </div>

        <div className="flex flex-col px-4">
          <hr />
        </div>

        <div className="flex flex-col px-4 md:px-8">
          <h2>Similar dapps</h2>
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
