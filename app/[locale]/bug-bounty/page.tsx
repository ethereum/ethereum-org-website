import pick from "lodash.pick"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { type Params } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import BugBountiesPage from "./_components/bug-bounty"

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/bug-bounty")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <BugBountiesPage />
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "page-bug-bounty" })

  return await getMetadata({
    locale,
    slug: ["bug-bounty"],
    title: t("page-upgrades-bug-bounty-meta-title"),
    description: t("page-upgrades-bug-bounty-meta-description"),
  })
}
