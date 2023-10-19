import { Stack } from "@chakra-ui/react"
import CardList, { CardListItem } from "@/components/CardList"

const StakingGuides: React.FC = () => {
  // TODO: Re-enable after i18n is implemented
  // const { t } = useTranslation()
  const guides: Array<CardListItem> = [
    {
      title: "page-staking-guide-title-coincashew-ethereum", // t("page-staking-guide-title-coincashew-ethereum"),
      link: "https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet",
      description: "page-staking-guide-description-linux", // t("page-staking-guide-description-linux"),
    },
    {
      title: "page-staking-guide-title-somer-esat", // t("page-staking-guide-title-somer-esat"),
      link: "https://github.com/SomerEsat/ethereum-staking-guide",
      description: "page-staking-guide-description-linux", // t("page-staking-guide-description-linux"),
    },
    {
      title: "page-staking-guide-title-rocket-pool", // t("page-staking-guide-title-rocket-pool"),
      link: "https://rocketpool.net/node-operators",
      description: "page-staking-guide-description-mac-linux", // t("page-staking-guide-description-mac-linux"),
    },
  ]

  return <Stack as={CardList} direction="column" gap={4} items={guides} />
}

export default StakingGuides
