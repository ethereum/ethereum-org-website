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

import Acknowledgements from "./_components/acknowledgements"
import AcknowledgementsJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/contributing/translation-program/acknowledgements"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "contributing/translation-program/acknowledgements",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <>
      <AcknowledgementsJsonLD locale={locale} contributors={contributors} />
      <I18nProvider locale={locale} messages={messages}>
        <Acknowledgements />
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
    namespace: "page-contributing-translation-program-acknowledgements",
  })

  return await getMetadata({
    locale,
    slug: ["contributing", "translation-program", "acknowledgements"],
    title: t(
      "page-contributing-translation-program-acknowledgements-meta-title"
    ),
    description: t(
      "page-contributing-translation-program-acknowledgements-meta-description"
    ),
  })
}

export default Page
