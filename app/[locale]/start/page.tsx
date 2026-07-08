import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import Callout from "@/components/ui/callout"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getNewToCryptoWallets } from "@/lib/utils/wallets"

import StartWithEthereumFlow from "./_components/StartWithEthereumFlow"
import ShareModal from "./_components/StartWithEthereumFlow/ShareModal"
import PageJsonLD from "./page-jsonld"

import HeroImage from "@/public/images/heroes/developers-hub-hero.png"
import ManDogeImage from "@/public/images/start-with-ethereum/man-doge-playing.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations("page-start")

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/start")
  const messages = pick(allMessages, requiredNamespaces)

  const newToCryptoWallets = getNewToCryptoWallets()
  const wallets = newToCryptoWallets.map((wallet) => ({
    ...wallet,
    supportedLanguages: [],
  }))

  const { contributors } = await getAppPageContributorInfo(
    "start",
    locale as Lang
  )

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <Image
        src={HeroImage}
        alt={t("page-start-hero-alt")}
        sizes="(max-width: 1504px) 100vw, 1504px"
        className="mb-space-3x h-60 w-full object-cover md:h-96"
        preload
      />
      <div className="flow mx-auto max-w-3xl px-page text-center">
        <h1>{t("page-start-title")}</h1>
        <p>{t("page-start-subtitle")}</p>
      </div>

      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="space-y-space-2x overflow-x-hidden px-page py-page-2x">
          <Section id="start-with-ethereum-flow">
            <StartWithEthereumFlow newToCryptoWallets={wallets} />
          </Section>

          <Callout
            title={t("page-start-share-section-title")}
            description={t("page-start-share-section-description")}
            image={ManDogeImage}
          >
            <ShareModal />
          </Callout>
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-start")

  return await getMetadata({
    locale,
    slug: ["start"],
    title: t("page-start-meta-title"),
    description: t("page-start-meta-description"),
    image: "/images/heroes/developers-hub-hero.png",
  })
}

export default Page
