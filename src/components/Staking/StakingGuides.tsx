import { Stack } from "@chakra-ui/react"
import CardList from "@/components/CardList"

const StakingGuides: React.FC = () => {
  // TODO: Re-enable after i18n is implemented
  // const { t } = useTranslation()
  const guides = [
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
  // TODO: Revert to <Stack as={CardList}> once merged with Gatsby repo (content => items)
  return <CardList as={Stack} flexDirection="column" gap={4} content={guides} />
}

export default StakingGuides
