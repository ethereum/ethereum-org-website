import { getLocale } from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"

import { getWidgetMessages } from "../shared/widget-messages"

import BrowserFingerprintLazy from "./lazy"

/**
 * Live browser fingerprint, for any page (markdown or React). Brings its own
 * messages, so the host page doesn't need to load the namespace.
 */
const BrowserFingerprint = async ({
  hideLearnMore,
}: {
  /** Set on /privacy/online/, which the closing link points to */
  hideLearnMore?: boolean
}) => {
  const locale = await getLocale()
  const messages = await getWidgetMessages(
    locale,
    "component-privacy-fingerprint"
  )
  return (
    <I18nProvider locale={locale} messages={messages}>
      <BrowserFingerprintLazy
        variant="standalone"
        hideLearnMore={hideLearnMore}
      />
    </I18nProvider>
  )
}

export default BrowserFingerprint
