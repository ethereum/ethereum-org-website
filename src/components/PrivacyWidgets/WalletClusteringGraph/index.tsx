import { getLocale } from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"

import { getWidgetMessages } from "../shared/widget-messages"

import WalletClusteringGraphLazy from "./lazy"

const NAMESPACE = "component-wallet-clustering"

/**
 * "Seven wallets, one person": steps through the heuristics analysts use to
 * join addresses into one cluster. Standalone version for any page or MDX;
 * the Public by Default lesson renders the client component directly.
 */
const WalletClusteringGraph = async ({ className }: { className?: string }) => {
  const locale = await getLocale()
  const messages = await getWidgetMessages(locale, NAMESPACE)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <WalletClusteringGraphLazy variant="standalone" className={className} />
    </I18nProvider>
  )
}

export default WalletClusteringGraph
