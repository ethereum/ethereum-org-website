import { useTranslation } from "next-i18next"

import { ChildOnlyProp } from "@/lib/types"

import Card from "@/components/Card"
import CardList, { type CardListItem } from "@/components/CardList"
import Translation from "@/components/Translation"

import { ButtonLink } from "./ui/buttons/Button"
import { Flex } from "./ui/flex"

import beaconchain from "@/public/images/upgrades/beaconchainemoji.png"
import beaconscan from "@/public/images/upgrades/etherscan.png"

const H3 = ({ children }: ChildOnlyProp) => (
  <h3 className="mb-8 mt-10 text-2xl font-bold [&_a]:hidden">{children}</h3>
)

const BeaconChainActions = () => {
  const { t } = useTranslation(["page-upgrades-index", "page-upgrades"])

  const datapoints: CardListItem[] = [
    {
      title: t("page-upgrades:consensus-beaconscan-title"),
      image: beaconscan,
      alt: "",
      link: "https://beaconscan.com",
      description: t("page-upgrades:consensus-beaconscan-desc"),
    },
    {
      title: t("page-upgrades:consensus-beaconscan-in-title"),
      image: beaconchain,
      alt: "",
      link: "https://beaconcha.in",
      description: t("page-upgrades:consensus-beaconcha-in-desc"),
    },
  ]

  //TODO: we should refactor the naming here instead of using authors into the description field
  const reads: CardListItem[] = [
    {
      title: t("page-upgrade-article-title-two-point-oh"),
      description: t("page-upgrade-article-author-status"),
      link: "https://our.status.im/two-point-oh-the-beacon-chain/",
    },
    {
      title: t("page-upgrade-article-title-beacon-chain-explainer"),
      description: t("page-upgrade-article-author-ethos-dev"),
      link: "https://ethos.dev/beacon-chain/",
    },
    {
      title: t("page-upgrade-article-title-sharding-consensus"),
      description: t("page-upgrade-article-author-ethereum-foundation"),
      link: "https://blog.ethereum.org/2020/03/27/sharding-consensus/",
    },
  ]

  return (
    <div className="mb-16">
      <Flex className="flex-col pt-4 md:flex-row">
        <Card
          w="full"
          ms={0}
          me={{ base: 0, md: 4 }}
          mb={{ base: 8, md: 0 }}
          emoji=":money_with_wings:"
          title={t("page-upgrades:consensus-become-staker")}
          description={t("page-upgrades:consensus-become-staker-desc")}
        >
          <ButtonLink className="mb-3" href="https://launchpad.ethereum.org">
            <Translation id="get-started" />
          </ButtonLink>
          <ButtonLink variant="outline" href="/staking/">
            <Translation id="page-upgrades-index:page-upgrades-index-staking-learn" />
          </ButtonLink>
        </Card>
      </Flex>
      <H3>
        <Translation id="page-upgrades:consensus-explore" />
      </H3>

      <CardList items={datapoints} />
      <H3>
        <Translation id="page-upgrades:read-more" />
      </H3>
      <CardList items={reads} />
    </div>
  )
}

export default BeaconChainActions
