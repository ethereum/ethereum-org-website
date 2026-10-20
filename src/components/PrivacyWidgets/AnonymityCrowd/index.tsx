import { getLocale } from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"

import { getWidgetMessages } from "../shared/widget-messages"

import AnonymityCrowdLazy from "./lazy"

/**
 * The anonymity-set crowd slider, for use on any page or in markdown. Brings
 * its own strings, so it works where the page doesn't load its namespace.
 */
const AnonymityCrowdWidget = async ({ className }: { className?: string }) => {
  const locale = await getLocale()
  const messages = await getWidgetMessages(locale, "component-anonymity-crowd")

  return (
    <I18nProvider locale={locale} messages={messages}>
      <AnonymityCrowdLazy variant="standalone" className={className} />
    </I18nProvider>
  )
}

export default AnonymityCrowdWidget
