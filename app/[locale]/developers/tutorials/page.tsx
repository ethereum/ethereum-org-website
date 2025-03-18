import pick from "lodash.pick"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getTutorialsData } from "@/lib/utils/md"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import Tutorials from "./_components/tutorials"

import { getMessages } from "@/i18n/loadMessages"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  // Get i18n messages
  const allMessages = await getMessages(locale)
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

export default Page
