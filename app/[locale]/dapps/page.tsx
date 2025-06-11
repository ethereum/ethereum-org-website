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

      <MainArticle className="flex flex-col gap-10 py-10">
        <div className="flex flex-col px-4 md:px-8">
          <h2>Highlights</h2>
        </div>

        <div className="flex flex-col px-4 md:px-8">
          <h2>Staff picks</h2>
        </div>

        <div className="flex flex-col px-4 md:px-8">
          <h2>All dapps</h2>
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
