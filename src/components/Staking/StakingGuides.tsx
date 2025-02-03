import { useTranslation } from "next-i18next"

import CardList, { type CardProps } from "@/components/CardList"

const StakingGuides = () => {
  const { t } = useTranslation("page-staking")

  const guides: CardProps[] = [
    {
      title: t("page-staking-guide-title-coincashew-ethereum"),
      link: "https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet",
      description: t("page-staking-guide-description-linux"),
    },
    {
      title: t("page-staking-guide-title-somer-esat"),
      link: "https://github.com/SomerEsat/ethereum-staking-guide",
      description: t("page-staking-guide-description-linux"),
    },
    {
      title: t("page-staking-guide-title-rocket-pool"),
      link: "https://docs.rocketpool.net/guides/node/responsibilities",
      description: t("page-staking-guide-description-mac-linux"),
    },
    {
      title: t("page-staking-guide-title-stakewise"),
      link: "https://docs.stakewise.io/guides/staking#liquid-solo-staking",
      description: t("page-staking-guide-description-mac-linux-windows"),
    },
  ]

  return <CardList className="flex flex-col gap-4" items={guides} />
}

export default StakingGuides
