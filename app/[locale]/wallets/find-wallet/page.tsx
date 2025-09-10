import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FindWalletProductTable from "@/components/FindWalletProductTable/lazy"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import {
  getNonSupportedLocaleWallets,
  getSupportedLanguages,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

import FindWalletPageJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  setRequestLocale(locale)

  const supportedLocaleWallets = getSupportedLocaleWallets(locale!)
  const noSupportedLocaleWallets = getNonSupportedLocaleWallets(locale!)
  const walletsData = supportedLocaleWallets.concat(noSupportedLocaleWallets)

  const wallets = walletsData.map((wallet) => ({
    ...wallet,
    supportedLanguages: getSupportedLanguages(
      wallet.languages_supported,
      locale!
    ),
  }))

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/wallets/find-wallet"
  )
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <>
      <FindWalletPageJsonLD locale={locale} wallets={wallets} />

      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="relative flex flex-col">
          <div className="flex w-full flex-col gap-8 px-4 pb-4 pt-11 md:w-1/2">
            <Breadcrumbs slug="wallets/find-wallet" />
            <h1 className="text-[2.5rem] leading-[1.4] md:text-5xl">
              {t("page-find-wallet-title")}
            </h1>
            <p className="mb-6 text-xl leading-[1.4] text-body-medium last:mb-8">
              {t("page-find-wallet-description")}
            </p>
          </div>

          <FindWalletProductTable wallets={wallets} />
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

  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  return await getMetadata({
    locale,
    slug: ["wallets", "find-wallet"],
    title: t("page-find-wallet-meta-title"),
    description: t("page-find-wallet-meta-description"),
    image: "/images/wallets/wallet-hero.png",
  })
}

export default Page
