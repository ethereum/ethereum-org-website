import pick from "lodash.pick"
import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import CommunityPage from "./_components/community"

import { loadMessages } from "@/i18n/loadMessages"

export default async function Page({
  params,
}: {
  params: { locale: Lang }
}) {
  const { locale } = params

  // Get i18n messages
  const allMessages = await loadMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage("/community")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={pickedMessages}>
      <CommunityPage />
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({ locale, namespace: "page-community" })

  return await getMetadata({
    locale,
    slug: ["community"],
    title: t("page-community-meta-title"),
    description: t("page-community-meta-description"),
  })
}
