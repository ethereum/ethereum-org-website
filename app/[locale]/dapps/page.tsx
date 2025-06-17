import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { HubHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { DAPPS_STAFF_PICK_DATA } from "@/data/dapps"

import DappCard from "./_components/DappCard"
import DappsHighlight from "./_components/DappsHighlight"
import TopDapps from "./_components/TopDapps"

import DappsHeroImage from "@/public/images/dapps/dapps-hero.png"

const Page = async ({ params }: { params: { locale: string } }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/dapps")
  const messages = pick(allMessages, requiredNamespaces)
  return (
    <I18nProvider locale={locale} messages={messages}>
      <HubHero
        title="Use"
        header="Dapp store"
        description="Discover the best decentralized applications on Ethereum"
        heroImg={DappsHeroImage}
      />

      <MainArticle className="flex flex-col gap-32 py-10">
        <div className="flex flex-col gap-8 px-4 md:px-8">
          <h2>Highlights</h2>
          <DappsHighlight />
        </div>

        <div className="flex flex-col gap-4 px-4 md:px-8">
          <h2>Staff picks</h2>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {DAPPS_STAFF_PICK_DATA.map((dapp) => (
              <DappCard
                key={dapp.name}
                dapp={dapp}
                imageSize={24}
                showDescription={true}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 md:px-8">
          <h2>Top applications</h2>
          <TopDapps />
        </div>
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: "page-dapps",
  })

  return await getMetadata({
    locale,
    slug: ["dapps"],
    title: t("page-dapps-meta-title"),
    description: t("page-dapps-meta-description"),
  })
}

export default Page
