import { useTranslation } from "next-i18next"

type Item = {
  key: string
  label: string
  content: string[]
}

export type Pairing = {
  legacy: Item
  ethereum: Item
}

export const useValuesMarquee = () => {
  const { t, i18n } = useTranslation("page-index")
  const locale = i18n.language

  const pairings: Pairing[] = [
    {
      legacy: {
        key: "ownership-legacy",
        label: t("page-index-values-ownership-legacy-label"),
        content: [
          t("page-index-values-ownership-legacy-content-0"),
          t("page-index-values-ownership-legacy-content-1"),
        ],
      },
      ethereum: {
        key: "ownership-ethereum",
        label: t("page-index-values-ownership-ethereum-label"),
        content: [t("page-index-values-ownership-ethereum-content-0")],
      },
    },
    {
      legacy: {
        key: "fairness-legacy",
        label: t("page-index-values-fairness-legacy-label"),
        content: [t("page-index-values-fairness-legacy-content-0")],
      },
      ethereum: {
        key: "fairness-ethereum",
        label: t("page-index-values-fairness-ethereum-label"),
        content: [t("page-index-values-fairness-ethereum-content-0")],
      },
    },
    {
      legacy: {
        key: "privacy-legacy",
        label: t("page-index-values-privacy-legacy-label"),
        content: [
          t("page-index-values-privacy-legacy-content-0"),
          t("page-index-values-privacy-legacy-content-1"),
        ],
      },
      ethereum: {
        key: "privacy-ethereum",
        label: t("page-index-values-privacy-ethereum-label"),
        content: [t("page-index-values-privacy-ethereum-content-0")],
      },
    },
    {
      legacy: {
        key: "integration-legacy",
        label: t("page-index-values-integration-legacy-label"),
        content: [t("page-index-values-integration-legacy-content-0")],
      },
      ethereum: {
        key: "integration-ethereum",
        label: t("page-index-values-integration-ethereum-label"),
        content: [t("page-index-values-integration-ethereum-content-0")],
      },
    },
    {
      legacy: {
        key: "decentralization-legacy",
        label: t("page-index-values-decentralization-legacy-label"),
        content: [t("page-index-values-decentralization-legacy-content-0")],
      },
      ethereum: {
        key: "decentralization-ethereum",
        label: t("page-index-values-decentralization-ethereum-label"),
        content: [t("page-index-values-decentralization-ethereum-content-0")],
      },
    },
    {
      legacy: {
        key: "censorship-legacy",
        label: t("page-index-values-censorship-legacy-label"),
        content: [t("page-index-values-censorship-legacy-content-0")],
      },
      ethereum: {
        key: "censorship-ethereum",
        label: t("page-index-values-censorship-ethereum-label"),
        content: [
          t("page-index-values-censorship-ethereum-content-0"),
          t("page-index-values-censorship-ethereum-content-1"),
        ],
      },
    },
    {
      legacy: {
        key: "open-legacy",
        label: t("page-index-values-open-legacy-label"),
        content: [t("page-index-values-open-legacy-content-0")],
      },
      ethereum: {
        key: "open-ethereum",
        label: t("page-index-values-open-ethereum-label"),
        content: [t("page-index-values-open-ethereum-content-0")],
      },
    },
  ]

  return { t, pairings, locale }
}
