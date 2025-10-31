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

import CommunityPage from "./_components/community"
import CommunityJsonLD from "./page-jsonld"

import { areNamespacesTranslated } from "@/i18n/translationStatus"

export default async function Page({ params }: { params: PageParams }) {
  const { locale } = params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/community")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "community",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <>
      <CommunityJsonLD locale={locale} contributors={contributors} />
      <I18nProvider locale={locale} messages={pickedMessages}>
        <CommunityPage />
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

  const t = await getTranslations({ locale, namespace: "page-community" })
  const isTranslated = await areNamespacesTranslated(locale, ["page-community"])
  const base = await getMetadata({
    locale,
    slug: ["community"],
    title: t("page-community-meta-title"),
    description: t("page-community-meta-description"),
  })
  return isTranslated ? base : { ...base, robots: { index: false } }
}
