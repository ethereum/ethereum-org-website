// Serializable config passed from the server table to the client filter UI.
// All user-facing strings are resolved on the server (getTranslations) so the
// client components stay free of intl context and message payloads.

export type WalletFilterOptionConfig = {
  key: string
  label: string
}

export type WalletFilterItemConfig = {
  key: string
  label: string
  description?: string
  kind: "switch" | "language" | "layer2"
  options?: WalletFilterOptionConfig[]
  optionsLegend?: string
}

export type WalletFilterGroupConfig = {
  id: string
  title: string
  items: WalletFilterItemConfig[]
}

export type WalletPersonaConfig = {
  title: string
  description: string
  /** sr-only count template, e.g. "{count} wallets available" with count appended */
  countLabelTemplate: string
}

export type WalletLanguageOption = {
  langCode: string
  name: string
  count: number
}

export type WalletNetworkOption = {
  name: string
  chainName: string
}

/** UI-chrome strings for the client filter components. */
export type FindWalletsStrings = {
  filters: string
  active: string
  resetFilters: string
  personaLegend: string
  searchLanguages: string
  popularLanguages: string
  mobileFiltersLabel: string
  emptyTitle: string
  emptyDescription: string
  emptyResetLabel: string
  showingCountLabel: string
}
