import pick from "lodash.pick"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import Acknowledgements from "./_components/acknowledgements"

import { getMessages } from "@/i18n/loadMessages"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  // Get i18n messages
  const allMessages = await getMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/contributing/translation-program/acknowledgements"
  )
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <Acknowledgements />
    </I18nProvider>
  )
}

export default Page
