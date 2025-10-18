import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import EthPage from "./_components/eth"
import EthPageJsonLD from "./page-jsonld"

export default async function Page({ params }: { params: PageParams }) {
  const { locale } = params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/eth")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("eth", locale as Lang, commitHistoryCache)

  return (
    <>
      <EthPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <I18nProvider locale={locale} messages={pickedMessages}>
        <EthPage
          contributors={contributors}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          locale={locale}
        />
      </I18nProvider>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({ locale, namespace: "page-eth" })

  return await getMetadata({
    locale,
    slug: ["eth"],
    title: t("page-eth-whats-eth-meta-title"),
    description: t("page-eth-whats-eth-meta-desc"),
    image: "/images/eth.png",
  })
}
