// Shared DOM ids linking delegated-tooltip triggers (data-tooltip-ref /
// aria-describedby) to their hidden content elements.

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-")

export const chainTooltipId = (chainName: string) =>
  `fw-chain-${slugify(chainName)}`

export const featureTooltipId = (filterKey: string) =>
  `fw-desc-${slugify(filterKey)}`

export const walletLanguagesTooltipId = (walletIndex: number) =>
  `fw-langs-${walletIndex}`
