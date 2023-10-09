import { Box, Flex } from "@chakra-ui/react"

import CardList, { type CardListItem } from "@/components/CardList"
import Card from "@/components/Card"
import { ButtonLink } from "@/components/Buttons"
// TODO: Re-enable after i18n implemented
// import Translation from "@/components/Translation"
import OldHeading from "@/components/OldHeading"

import beaconscan from "@/../public/upgrades/etherscan.png"
import beaconchain from "@/../public/upgrades/beaconchainemoji.png"

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <OldHeading
    as="h3"
    fontSize="2xl"
    fontWeight="bold"
    mb={8}
    sx={{ a: { display: "none" } }}
  >
    {children}
  </OldHeading>
)

// export const DataLogo = graphql`
//   fragment DataLogo on File {
//     childImageSharp {
//       gatsbyImageData(
//         width: 24
//         layout: FIXED
//         placeholder: BLURRED
//         quality: 100
//       )
//     }
//   }
// `


// type BeaconQueryTypes = {
//   beaconscan: ImageDataLike | null
//   beaconchain: ImageDataLike | null
// }

const BeaconChainActions: React.FC = () => {
  // TODO: Re-enable after i18n implemented
  // const { t } = useTranslation()

  const datapoints: Array<CardListItem> = [
    {
      title: "consensus-beaconscan-title", // t("consensus-beaconscan-title"),
      image: beaconscan,
      alt: "",
      link: "https://beaconscan.com",
      description: "consensus-beaconscan-desc", // t("consensus-beaconscan-desc"),
    },
    {
      title: "consensus-beaconscan-in-title", // t("consensus-beaconscan-in-title"),
      image: beaconchain,
      alt: "",
      link: "https://beaconcha.in",
      description: "consensus-beaconcha-in-desc", // t("consensus-beaconcha-in-desc"),
    },
  ]

  //TODO: we should refactor the naming here instead of using authors into the description field
  const reads: Array<CardListItem> = [
    {
      title: "page-upgrade-article-title-two-point-oh", // t("page-upgrade-article-title-two-point-oh"),
      description: "page-upgrade-article-author-status", // t("page-upgrade-article-author-status"),
      link: "https://our.status.im/two-point-oh-the-beacon-chain/",
    },
    {
      title: "page-upgrade-article-title-beacon-chain-explainer", // t("page-upgrade-article-title-beacon-chain-explainer"),
      description: "page-upgrade-article-author-ethos-dev", // t("page-upgrade-article-author-ethos-dev"),
      link: "https://ethos.dev/beacon-chain/",
    },
    {
      title: "page-upgrade-article-title-sharding-consensus", // t("page-upgrade-article-title-sharding-consensus"),
      description: "page-upgrade-article-author-ethereum-foundation", // t("page-upgrade-article-author-ethereum-foundation"),
      link: "https://blog.ethereum.org/2020/03/27/sharding-consensus/",
    },
  ]

  return (
    <Box mb={16}>
      <Flex flexDir={{ base: "column", md: "row" }} pt={4}>
        <Card
          w="full"
          ml={0}
          mr={{ base: 0, md: 4 }}
          mb={{ base: 8, md: 0 }}
          emoji=":money_with_wings:"
          title="consensus-become-staker"// {t("consensus-become-staker")}
          description="consensus-become-staker-desc"// {t("consensus-become-staker-desc")}
        >
          <ButtonLink mb={3} to="https://launchpad.ethereum.org">
            {/* TODO */}
            {/* <Translation id="get-started" /> */}
            Get started
          </ButtonLink>
          <ButtonLink variant="outline" to="/staking/">
            {/* <Translation id="page-upgrades-index-staking-learn" /> */}
            Learn about staking
          </ButtonLink>
        </Card>
      </Flex>
      <H3>
        {/* <Translation id="consensus-explore" /> */}
        Explore the data
      </H3>

      <CardList content={datapoints} />
      <H3>
        {/* <Translation id="read-more" /> */}
        Read more
      </H3>
      <CardList content={reads} />
    </Box>
  )
}

export default BeaconChainActions
