import { useTranslation } from "next-i18next"

export const WalletFilters = () => {
  const { t } = useTranslation("page-wallets-find-wallet")
  return [
    {
      title: t("page-find-wallet-device"),
    },
    {
      title: t("page-find-wallet-languages-supported"),
    },
    {
      title: `${t("page-find-wallet-buy-crypto")} / ${t(
        "page-find-wallet-sell-for-fiat"
      )}`,
    },
    {
      title: t("page-find-wallet-features"),
    },
    {
      title: t("page-find-wallet-security"),
    },
    {
      title: t("page-find-wallet-smart-contract"),
    },
    {
      title: t("page-find-wallet-advanced"),
    },
  ]
}
