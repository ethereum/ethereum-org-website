import { getLocale } from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"

import { getWidgetMessages } from "../shared/widget-messages"

import SandwichAttackDemoLazy from "./lazy"

/**
 * Sandwich attack demo, standalone (e.g. the MEV developer docs). Brings its
 * own strings, so it works on any page or in markdown.
 */
const SandwichAttackDemo = async ({ className }: { className?: string }) => {
  const locale = await getLocale()
  const messages = await getWidgetMessages(locale, "component-sandwich-attack")

  return (
    <I18nProvider locale={locale} messages={messages}>
      <SandwichAttackDemoLazy variant="standalone" className={className} />
    </I18nProvider>
  )
}

export default SandwichAttackDemo
