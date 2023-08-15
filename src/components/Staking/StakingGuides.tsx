// Libraries
import React from "react"

// Components
import CardList from "../CardList"
import { Stack } from "@chakra-ui/react"
import { useTranslation } from "gatsby-plugin-react-i18next"

export interface IProps {}

const StakingGuides: React.FC<IProps> = () => {
  const { t } = useTranslation()
  const guides = [
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
      link: "https://rocketpool.net/node-operators",
      description: t("page-staking-guide-description-mac-linux"),
    },
  ]

  return <Stack as={CardList} direction="column" gap={4} content={guides} />
}

export default StakingGuides
