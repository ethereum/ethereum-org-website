import type { getTranslations } from "next-intl/server"

import { CROPS_PROPERTIES } from "@/data/wallets/features"

import type { WalletModalLabels } from "./WalletDetailModal"

type Translator = Awaited<ReturnType<typeof getTranslations>>

/** Shared by the catalog and the standalone page so both modals read the same. */
export function buildWalletModalLabels(
  t: Translator,
  tCommon: Translator
): WalletModalLabels {
  return {
    close: tCommon("close"),
    yes: tCommon("yes"),
    no: tCommon("no"),
    networkSupport: t("page-find-wallet-network-support"),
    device: t("page-find-wallet-device"),
    languages: t("page-find-wallet-languages-supported"),
    fees: t("page-find-wallet-fee-row-label"),
    feesTooltip: t("page-find-wallet-fee-row-tooltip"),
    fullDetails: t("page-find-wallet-full-details"),
    getWallet: t.raw("page-find-wallet-get-wallet"),
    crops: CROPS_PROPERTIES.map(({ key, labelKey, descKey }) => ({
      key,
      label: t(labelKey),
      tooltip: t(descKey),
    })),
  }
}
