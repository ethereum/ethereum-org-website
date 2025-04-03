import pick from "lodash.pick"
import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import Contributors from "./_components/contributors"

import { loadMessages } from "@/i18n/loadMessages"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  // Get i18n messages
  const allMessages = await loadMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/contributing/translation-program/contributors"
  )
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <Contributors />
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
    namespace: "page-contributing-translation-program-contributors",
  })

  return await getMetadata({
    locale,
    slug: ["contributing", "translation-program", "contributors"],
    title: t("page-contributing-translation-program-contributors-meta-title"),
    description: t(
      "page-contributing-translation-program-contributors-meta-description"
    ),
  })
}

export default Page
