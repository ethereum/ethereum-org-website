import { getLocale } from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"

import { getWidgetMessages } from "../shared/widget-messages"

import AddressPoisoningQuizLazy from "./lazy"

/**
 * "Which one is really Sam?" Standalone address-poisoning quiz, with its own
 * strings, for use outside the Public by Default lesson (e.g. /security/).
 */
const AddressPoisoningQuiz = async ({ className }: { className?: string }) => {
  const locale = await getLocale()
  const messages = await getWidgetMessages(
    locale,
    "component-address-poisoning"
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <AddressPoisoningQuizLazy variant="standalone" className={className} />
    </I18nProvider>
  )
}

export default AddressPoisoningQuiz
