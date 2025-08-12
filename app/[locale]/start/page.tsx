import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import StartWithEthereumFlow from "@/components/StartWithEthereumFlow"
import ShareModal from "@/components/StartWithEthereumFlow/ShareModal"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getNewToCryptoWallets } from "@/lib/utils/wallets"

import HeroImage from "@/public/images/heroes/developers-hub-hero.jpg"
import ManDogeImage from "@/public/images/start-with-ethereum/man-doge-playing.png"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "page-start" })

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

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="flex w-full flex-col items-center overflow-x-hidden">
        <div className="mb-16 h-[240px] w-full md:h-[380px] lg:h-[398px]">
          <Image
            src={HeroImage}
            alt={t("page-start-hero-alt")}
            sizes="(max-width: 1504px) 100vw, 1504px"
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="mb-36 flex flex-col gap-12 overflow-x-hidden px-8">
          <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-4 text-center">
            <h1>{t("page-start-title")}</h1>
            <p>{t("page-start-subtitle")}</p>
          </div>

          <div id="start-with-ethereum-flow" className="flex flex-col gap-12">
            <StartWithEthereumFlow
              locale={locale}
              newToCryptoWallets={wallets}
            />
          </div>

          <div className="flex w-full flex-col gap-12 rounded-2xl border border-accent-c/10 bg-gradient-to-t from-accent-c/10 from-20% to-accent-c/5 to-60% px-12 py-16 md:flex-row dark:from-accent-c/20 dark:to-accent-c/10">
            <div className="flex flex-1 flex-col gap-8">
              <h2 className="">{t("page-start-share-section-title")}</h2>
              <p>{t("page-start-share-section-description")}</p>
              <div className="flex w-full md:w-auto">
                <ShareModal />
              </div>
            </div>
            <div className="flex max-w-[450px] flex-col items-center justify-center">
              <Image src={ManDogeImage} alt={t("page-start-man-doge-alt")} />
            </div>
          </div>
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

  const t = await getTranslations({ locale, namespace: "page-start" })

  return await getMetadata({
    locale,
    slug: ["start"],
    title: t("page-start-meta-title"),
    description: t("page-start-meta-description"),
    image: "/images/heroes/developers-hub-hero.jpg",
  })
}

export default Page
