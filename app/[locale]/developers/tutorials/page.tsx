import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { pick } from "@/lib/utils/lodash"
import { getTutorialsData } from "@/lib/utils/md"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import Tutorials from "./_components/tutorials"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/tutorials"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return (
    <I18nProvider locale={locale} messages={messages}>
      <Tutorials
        internalTutorials={getTutorialsData(locale)}
        contentNotTranslated={contentNotTranslated}
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

  const t = await getTranslations({
    locale,
    namespace: "page-developers-tutorials",
  })

  return await getMetadata({
    locale,
    slug: ["developers", "tutorials"],
    title: t("page-tutorials-meta-title"),
    description: t("page-tutorials-meta-description"),
  })
}

export default Page
