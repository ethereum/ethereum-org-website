import pick from "lodash.pick"
import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import {
  getNonSupportedLocaleWallets,
  getSupportedLanguages,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

import FindWalletPage from "./_components/find-wallet"

import { getMessages } from "@/i18n/loadMessages"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

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
  const allMessages = await getMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/wallets/find-wallet"
  )
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <FindWalletPage wallets={wallets} />
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
