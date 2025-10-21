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

import Contributors from "./_components/contributors"
import ContributorsJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "contributing/translation-program/contributors",
    locale as Lang,
    commitHistoryCache
  )

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/contributing/translation-program/contributors"
  )
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <>
      <ContributorsJsonLD locale={locale} contributors={contributors} />
      <I18nProvider locale={locale} messages={messages}>
        <Contributors />
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
