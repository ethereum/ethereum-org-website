import pick from "lodash.pick"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import WalletsPage from "./_components/wallets"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/wallets")
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getPageContributorInfo("wallets", locale as Lang, commitHistoryCache)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <WalletsPage
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      />
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "page-wallets" })

  return await getMetadata({
    locale,
    slug: ["wallets"],
    title: t("page-wallets-meta-title"),
    description: t("page-wallets-meta-description"),
    image: "/images/wallets/wallet-hero.png",
  })
}

export default Page
