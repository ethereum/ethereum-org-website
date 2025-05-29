import { TranslationKey } from "@/lib/types"

export type CategoryNameType = "dapps" | "buy" | "earn" | "generate"

type AccordionButtonContentType = {
  emoji: string
  title: TranslationKey
  tag?: {
    status: string
    name: TranslationKey
  }
  textPreview: TranslationKey
}

export const accordionButtonContent: {
  [key in CategoryNameType]: AccordionButtonContentType
} = {
  dapps: {
    emoji: ":twisted_rightwards_arrows:",
    title: "page-stablecoins-accordion-swap-title",
    tag: {
      status: "success",
      name: "page-stablecoins-accordion-swap-pill",
    },
    textPreview: "page-stablecoins-accordion-swap-text-preview",
  },
  buy: {
    emoji: ":shopping_bags:",
    title: "page-stablecoins-accordion-buy-title",
    textPreview: "page-stablecoins-accordion-buy-text-preview",
  },
  earn: {
    emoji: ":money_bag:",
    title: "page-stablecoins-accordion-earn-title",
    textPreview: "page-stablecoins-accordion-earn-text-preview",
  },
  generate: {
    emoji: ":handshake:",
    title: "page-stablecoins-accordion-borrow-title",
    tag: {
      status: "warning",
      name: "page-stablecoins-accordion-borrow-pill",
    },
    textPreview: "page-stablecoins-accordion-borrow-text-preview",
  },
}
