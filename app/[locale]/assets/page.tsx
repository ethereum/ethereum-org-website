import pick from "lodash.pick"
import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import AssetsPage from "./_components/assets"

import { loadMessages } from "@/i18n/loadMessages"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Lang }>
}) {
  const { locale } = await params

  // Get i18n messages
  const allMessages = await loadMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage("/assets")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <AssetsPage />
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "page-assets" })

  return await getMetadata({
    locale,
    slug: ["assets"],
    title: t("page-assets-meta-title"),
    description: t("page-assets-meta-description"),
  })
}
