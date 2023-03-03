import React, { ComponentPropsWithRef, ReactNode } from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  BoxProps,
  Center,
  Divider,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Img,
  ImgProps,
  List,
  ListItem,
  Text,
  useToken,
} from "@chakra-ui/react"

import ButtonLink from "../../components/ButtonLink"
import Card from "../../components/Card"
import ActionCard from "../../components/ActionCard"
import CalloutBanner from "../../components/CalloutBanner"
import Emoji from "../../components/OldEmoji"
import UpgradeArticles from "../../components/UpgradeArticles"
import ExpandableCard from "../../components/ExpandableCard"
import GhostCard from "../../components/GhostCard"
import InfoBanner from "../../components/InfoBanner"
import Link from "../../components/Link"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import PageHero, {
  IContent as IPageHeroContent,
} from "../../components/PageHero"
import FeedbackCard from "../../components/FeedbackCard"

import { getImage } from "../../utils/image"
import Button from "../../components/Button"

import type { ChildOnlyProp } from "../../types"

const PageDivider = () => (
  <Divider
    my={16}
    w="10%"
    borderBottomWidth="0.25rem"
    borderColor="homeDivider"
  />
)

const Content = (props: BoxProps) => <Box py={4} px={8} w="full" {...props} />

const CardContainer = (props: FlexProps) => (
  <Flex flexWrap="wrap" mx={-4} {...props} />
)

const Row = (props: ChildOnlyProp) => (
  <Flex
    align="flex-start"
    direction={{ base: "column", lg: "row" }}
    {...props}
  />
)

const H2 = (props: HeadingProps) => (
  <Heading
    as="h2"
    mt={0}
    mb={4}
    fontSize={{ base: "2xl", md: "2rem" }}
    fontWeight="semibold"
    lineHeight={1.4}
    {...props}
  />
)

const H3 = (props: HeadingProps) => (
  <Heading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    fontWeight="semibold"
    lineHeight={1.4}
    {...props}
  />
)

const H4 = (props: HeadingProps) => (
  <Heading
    as="h4"
    fontSize={{ base: "md", md: "xl" }}
    fontWeight="medium"
    lineHeight={1.4}
    {...props}
  />
)

const H6 = (props: HeadingProps) => (
  <Heading
    as="h6"
    fontSize="0.9rem"
    fontWeight="normal"
    lineHeight={1.4}
    {...props}
  />
)

const PageCard = (props: ComponentPropsWithRef<typeof Card>) => (
  <Card flex="1 1 30%" minW="240px" m={4} p={6} {...props} />
)

const CentreCard = (props: ComponentPropsWithRef<typeof PageCard>) => (
  <PageCard textAlign="center" {...props} />
)

const StyledCard = (props: ComponentPropsWithRef<typeof PageCard>) => {
  const tableBoxShadow = useToken("colors", "tableBoxShadow")

  return (
    <PageCard
      boxShadow={tableBoxShadow}
      transition="transform 0.1s"
      _hover={{
        borderRadius: "4px",
        boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
        background: "tableBackgroundHover",
        transform: "scale(1.02)",
      }}
      {...props}
    />
  )
}

const Disclaimer = (props: ChildOnlyProp) => (
  <Center textAlign="center" my={0} mx={{ base: 8, lg: 4 * 12 }} {...props} />
)

const ContributeCard = (props: ChildOnlyProp) => (
  <Flex
    direction={{ base: "column", lg: "row" }}
    align={{ base: "flex-start", lg: "center" }}
    justify="space-between"
    borderRadius="2px"
    border="1px solid"
    borderColor="border"
    p={8}
    mt={0}
    mb={8}
    mx={{ base: 0, lg: "auto" }}
    maxW="100ch"
    {...props}
  />
)

interface IStyledCalloutProps {
  image: IGatsbyImageData
  alt: string
  titleKey: string
  descriptionKey: string
  children: ReactNode
}

const StyledCallout = (props: IStyledCalloutProps) => (
  <Img as={CalloutBanner} mx={0} {...props} />
)

const ContributeButton = (props) => (
  <Button
    as={ButtonLink}
    w={{ base: "full", lg: "auto" }}
    mt={{ base: 6, lg: 0 }}
    {...props}
  />
)

const Staking = (props: ChildOnlyProp) => (
  <Flex
    w="full"
    mt={8}
    p={{ base: 8, lg: 16 }}
    direction="column"
    background="cardGradient"
    {...props}
  />
)

const StakingCard = (props: ComponentPropsWithRef<typeof StyledCard>) => (
  <StyledCard m={0} {...props} />
)

const StakingColumns = (props: ChildOnlyProp) => (
  <Flex direction={{ base: "column", lg: "row" }} {...props} />
)

const StakingLeftColumn = (props: ChildOnlyProp) => <Box {...props} />

const StakingRightColumn = (props: ChildOnlyProp) => (
  <Flex
    align={{ basae: "flex-start", lg: "center" }}
    direction={{ base: "column-reverse", lg: "column" }}
    m={{ base: 0, lg: "0 2rem" }}
    mt={{ base: 8, lg: 0 }}
    ml={{ base: 0, lg: 32 }}
    {...props}
  />
)

interface IStakingImageProps extends ImgProps {
  image: IGatsbyImageData
  alt: string
}

const StakingImage = (props: IStakingImageProps) => (
  <Img
    as={GatsbyImage}
    my={12}
    mx={0}
    alignSelf="center"
    w="full"
    maxW="320px"
    {...props}
  />
)

const LeftColumn = (props: ChildOnlyProp) => <Box w="full" {...props} />

const RightColumn = (props: ChildOnlyProp) => (
  <Box w="full" ml={{ base: 0, lg: 8 }} {...props} />
)

const Faq = (props: ChildOnlyProp) => (
  <Flex
    align={{ base: "flex-start", lg: "normal" }}
    direction={{ base: "column", lg: "row" }}
    mt={16}
    {...props}
  />
)

const ResearchContainer = (props: ChildOnlyProp) => <Box mt={8} {...props} />

const paths = [
  {
    emoji: ":rocket:",
    title: <Translation id="page-upgrades-scalable" />,
    description: <Translation id="page-upgrades-scalable-desc" />,
  },
  {
    emoji: ":shield:",
    title: <Translation id="page-upgrades-secure" />,
    description: <Translation id="page-upgrades-secure-desc" />,
  },
  {
    emoji: ":evergreen_tree:",
    title: <Translation id="page-upgrades-index-staking-sustainability" />,
    description: <Translation id="page-upgrades-sustainable-desc" />,
  },
]

const Eth2IndexPage = ({ data }: PageProps<Queries.UpgradesPageQuery>) => {
  const { t } = useTranslation()

  const heroContent: IPageHeroContent = {
    title: t("page-upgrades-upgrades"),
    header: t("page-upgrades-upgrading"),
    subtitle: t("page-upgrades-upgrade-desc"),
    image: getImage(data.merge)!,
    alt: t("page-dapps-doge-img-alt"),
    buttons: [
      {
        content: t("page-upgrades-explore-btn"),
        to: "/upgrades/beacon-chain/",
      },
      {
        content: t("page-upgrades-whats-ethereum"),
        to: "/what-is-ethereum/",
        variant: "outline",
      },
    ],
  }

  const upgrades = [
    {
      image: getImage(data.beaconchain),
      title: <Translation id="page-upgrades-beacon-chain-title" />,
      description: <Translation id="page-upgrades-beacon-chain-desc" />,
      to: "/upgrades/beacon-chain/",
      date: <Translation id="page-upgrades-beacon-chain-estimate" />,
    },
    {
      image: getImage(data.themerge),
      title: <Translation id="page-upgrades-docking" />,
      description: <Translation id="page-upgrades-merge-desc" />,
      to: "/upgrades/merge/",
      date: <Translation id="page-upgrades-merge-estimate" />,
    },
    {
      image: getImage(data.shards),
      title: <Translation id="page-upgrades-shard-title" />,
      description: <Translation id="page-upgrades-shard-desc" />,
      to: "/upgrades/sharding/",
      date: <Translation id="page-upgrades-shard-estimate" />,
    },
  ]

  return (
    <Flex direction="column" align="center" w="full">
      <PageMetadata
        title={t("page-upgrades-meta-title")}
        description={t("page-upgrades-meta-desc")}
      />
      <PageHero content={heroContent} />
      <PageDivider />
      <Content>
        <Row>
          <GhostCard>
            <H2>
              <Translation id="page-upgrades-whats-next" />
            </H2>
            <Translation id="page-upgrades-whats-next-desc" /> <br />
            <Link to="/history/">
              <Translation id="page-upgrades-whats-next-history" />
            </Link>
          </GhostCard>
          <InfoBanner isWarning={true}>
            <H2>
              <Translation id="page-upgrades-what-to-do" />
            </H2>
            <Translation id="page-upgrades-what-to-do-desc" /> <br />
            <Link to="/upgrades/get-involved/">
              <Translation id="page-upgrades-get-involved" />
            </Link>
          </InfoBanner>
        </Row>
        <Box mt={16}>
          <H2>
            <Translation id="page-upgrades-vision" />
            <Emoji ml={`0.5rem`} text=":sparkles:" />
          </H2>
          <Text>
            <Translation id="page-upgrades-vision-desc" />
          </Text>
          <CardContainer>
            {paths.map((path, idx) => (
              <CentreCard
                key={idx}
                emoji={path.emoji}
                title={path.title}
                description={path.description}
              />
            ))}
          </CardContainer>
        </Box>
      </Content>
      <StyledCallout
        image={getImage(data.oldship)!}
        alt={t("page-eth-whats-eth-hero-alt")}
        titleKey={"page-upgrades-dive"}
        descriptionKey={"page-upgrades-dive-desc"}
      >
        <Box>
          <ButtonLink to="/upgrades/vision/">
            <Translation id="page-upgrades-vision-btn" />
          </ButtonLink>
        </Box>
      </StyledCallout>
      <Content>
        <H2>
          <Translation id="page-upgrades-the-upgrades" />
        </H2>
        <Text>
          <Translation id="page-upgrades-the-upgrades-desc" />
        </Text>
        <CardContainer mt={8} mb={12}>
          {upgrades.map((upgrade, idx) => (
            <ActionCard
              isRight
              key={idx}
              image={upgrade.image!}
              title={upgrade.title}
              description={upgrade.description}
              to={upgrade.to}
            >
              <H6>{upgrade.date}</H6>
            </ActionCard>
          ))}
        </CardContainer>
      </Content>
      <Content id="eth2">
        <ContributeCard>
          <Box>
            <H2>
              <Translation id="page-upgrades-what-happened-to-eth2-title" />
            </H2>
            <Text>
              <Translation id="page-upgrades-what-happened-to-eth2-1" />{" "}
              <Link to="/upgrades/merge">
                <Translation id="page-upgrades-what-happened-to-eth2-1-more" />
              </Link>
            </Text>
            <Text>
              <Translation id="page-upgrades-what-happened-to-eth2-2" />
            </Text>
            <Text>
              <Translation id="page-upgrades-what-happened-to-eth2-3" />
            </Text>
            <List listStyleType="disc">
              <ListItem>
                <Translation id="page-upgrades-what-happened-to-eth2-3-1" />
              </ListItem>
              <ListItem>
                <Translation id="page-upgrades-what-happened-to-eth2-3-2" />
              </ListItem>
            </List>
            <Text>
              <Translation id="page-upgrades-what-happened-to-eth2-4" />
            </Text>
            <Text>
              <Link to="https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/">
                <Translation id="page-upgrades-what-happened-to-eth2-5" />
              </Link>
            </Text>
            <H3>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-title" />
            </H3>
            <H4>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-mental-models-title" />
            </H4>
            <Text>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-mental-models-description" />
            </Text>
            <H4>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-inclusivity-title" />
            </H4>
            <Text>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-inclusivity-description" />
            </Text>
            <H4>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-scam-prevention-title" />
            </H4>
            <Text>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-scam-prevention-description" />
            </Text>
            <H4>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-staking-clarity-title" />
            </H4>
            <Text>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-staking-clarity-description" />
            </Text>
          </Box>
        </ContributeCard>
        <ContributeCard>
          <Box>
            <H2>
              <Translation id="page-upgrades-help" />
            </H2>
            <Translation id="page-upgrades-help-desc" />
          </Box>
          <ContributeButton variant="outline" to="/upgrades/get-involved/">
            <Translation id="page-upgrades-get-involved-2" />
          </ContributeButton>
        </ContributeCard>
        <Disclaimer>
          <Text as="em">
            <Translation id="page-upgrades-unofficial-roadmap" />
          </Text>
        </Disclaimer>
      </Content>

      <Staking>
        <H2>
          <Translation id="page-upgrades-index-staking" />
        </H2>
        <StakingColumns>
          <StakingLeftColumn>
            <Text>
              <Translation id="page-upgrades-index-staking-desc" />
            </Text>
            <H3>
              <Translation id="page-upgrades-index-staking-step-1" />
            </H3>
            <Text>
              <Translation id="page-upgrades-index-staking-step-1-desc" />
            </Text>
            <ButtonLink to="https://launchpad.ethereum.org">
              <Translation id="page-upgrades-index-staking-step-1-btn" />
            </ButtonLink>
            <H3>
              <Translation id="page-upgrades-index-staking-step-2" />
            </H3>
            <Text>
              <Translation id="page-upgrades-index-staking-step-2-desc" />
            </Text>
            <ButtonLink to="/staking/deposit-contract/">
              <Translation id="page-upgrades-index-staking-step-2-btn" />
            </ButtonLink>
          </StakingLeftColumn>
          <StakingRightColumn>
            <StakingCard
              emoji=":money_with_wings:"
              title={t("page-upgrades-index-staking-learn")}
              description={t("page-upgrades-index-staking-learn-desc")}
            >
              <ButtonLink to="/staking/">
                <Translation id="page-staking-deposit-contract-staking-more-link" />
              </ButtonLink>
            </StakingCard>
            <StakingImage image={getImage(data.rhino)!} alt="" />
          </StakingRightColumn>
        </StakingColumns>
      </Staking>
      <PageDivider />
      <Content>
        <H2 textAlign="center">
          <Translation id="page-upgrades-question-title" />
        </H2>
        <Faq>
          <LeftColumn>
            <ExpandableCard
              contentPreview={t("page-upgrades-question-1-desc")}
              title={t("page-upgrades-question-1-title")}
            >
              <Link to="/upgrades/beacon-chain/">
                <Translation id="page-upgrades-beacon-chain-title" />
              </Link>
              <Text>
                <Translation id="page-upgrades-beacon-chain-date" />
              </Text>
              <Link to="/upgrades/merge/">
                <Translation id="page-upgrades-docking" />
              </Link>
              <Text>
                <Translation id="page-upgrades-merge-answer-1" />{" "}
              </Text>
              <Link to="/upgrades/sharding/">
                <Translation id="page-upgrades-shard-title" />
              </Link>
              <Text>
                <Translation id="page-upgrades-shard-date" />
              </Text>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={t("page-upgrades-question-2-desc")}
              title={t("page-upgrades-question-2-title")}
            >
              <Text>
                <Translation id="page-upgrades-answer-1" />{" "}
              </Text>
              <Text>
                <Translation id="page-upgrades-answer-2" />{" "}
                <Link to="/upgrades/merge/">
                  <Translation id="page-upgrades-merge-btn" />
                </Link>
              </Text>
              <Text>
                <Translation id="page-upgrades-answer-4" />{" "}
                <Link to="/roadmap/vision/">
                  <Translation id="page-upgrades-vision-btn" />
                </Link>
              </Text>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={t("page-upgrades-question-3-desc")}
              title={t("page-upgrades-question-3-title")}
            >
              <Text>
                <Translation id="page-upgrades-question3-answer-1" />{" "}
                <Link to="/security/">
                  <Translation id="page-upgrades-security-link" />
                </Link>
              </Text>
              <Text>
                <Translation id="page-upgrades-question-3-answer-2a" />
              </Text>
              <List listStyleType="disc">
                <ListItem>
                  <Link to="/upgrades/merge/">
                    <Translation id="page-upgrades-merge-btn" />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">
                    <Translation id="page-upgrades-question-3-answer-2a-link" />
                  </Link>
                </ListItem>
              </List>
              <Text>
                <Translation id="page-upgrades-question-3-answer-2b" />
              </Text>
              <List listStyleType="disc">
                <ListItem>
                  <Link to="/upgrades/sharding/">
                    <Translation id="page-upgrades-shard-lower" />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/layer-2/">
                    <Translation id="page-upgrades-layer-2-rollups" />
                  </Link>
                </ListItem>
              </List>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={t("page-upgrades-question-4-desc")}
              title={t("page-upgrades-question-4-title")}
            >
              <Text>
                <Translation id="page-upgrades-question-4-answer-1" />{" "}
                <Link to="/glossary/#mainnet">
                  <Translation id="page-upgrades-merge-mainnet" />
                </Link>
              </Text>
              <Text>
                <Translation id="page-upgrades-question-4-answer-3" />{" "}
                <Link to="/developers/docs/consensus-mechanisms/pos/">
                  <Translation id="page-upgrades-proof-stake-link" />
                </Link>
              </Text>
              <Text>
                <Translation id="page-upgrades-question-4-answer-6" />{" "}
                <Link to="/staking/">
                  <Translation id="page-upgrades-question-4-answer-7" />
                </Link>
              </Text>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={t("page-upgrades-question-5-desc")}
              title={t("page-upgrades-question-5-title")}
            >
              <Text>
                <Translation id="page-upgrades-question-5-answer-1" />
              </Text>
              <Text>
                <Link to="/staking/">
                  <Translation id="page-staking-deposit-contract-staking-more-link" />
                </Link>
              </Text>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={t("page-upgrades-question-11-desc")}
              title={t("page-upgrades-question-11-title")}
            >
              <Text>
                <Translation id="page-upgrades-question-11-answer-1" />
                <Link to="/security/#eth2-token-scam/">
                  <Translation id="page-upgrades-question-11-answer-2" />
                </Link>
              </Text>
            </ExpandableCard>
          </LeftColumn>
          <RightColumn>
            <ExpandableCard
              contentPreview={t("page-upgrades-question-6-desc")}
              title={t("page-upgrades-question-6-title")}
            >
              <Text>
                <Translation id="page-upgrades-question-6-answer-1" />
              </Text>
              <Text>
                <Link to="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">
                  <Translation id="page-upgrades-question-6-answer-1-link" />
                </Link>
              </Text>
              <Text>
                <Translation id="page-upgrades-question-6-answer-2" />
              </Text>
              <List listStyleType="disc">
                <ListItem>
                  <Translation id="page-upgrades-question-6-answer-3" />{" "}
                  <Link to="https://blog.ethereum.org">
                    <Translation id="page-upgrades-eth-blog" />
                  </Link>
                </ListItem>
                <ListItem>
                  <Translation id="page-upgrades-question-6-answer-4" />{" "}
                  <Link to="https://eth2.news">
                    <Translation id="page-upgrades-whats-new" />
                  </Link>
                </ListItem>
                <ListItem>
                  <Translation id="page-upgrades-question-6-answer-5" />{" "}
                  <Link to="https://ethresear.ch">
                    <Translation id="page-upgrades-question-3-answer-3-link" />
                  </Link>
                </ListItem>
              </List>
              <Text>
                <Link to="/upgrades/merge/">
                  <Translation id="page-upgrades-merge-btn" />
                </Link>
              </Text>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={t("page-upgrades-question-7-desc")}
              title={t("page-upgrades-question-7-title")}
            >
              <Text>
                <Translation id="page-upgrades-question-7-teams" />
              </Text>
              <List listStyleType="disc">
                <ListItem>
                  <Link to="https://sigmaprime.io/">
                    <Translation id="page-upgrades-question-7-lighthouse" />
                  </Link>{" "}
                  <Translation id="page-upgrades-question-7-lighthouse-lang" />
                </ListItem>
                <ListItem>
                  <Link to="https://nimbus.team/">
                    <Translation id="page-upgrades-question-7-nimbus" />
                  </Link>{" "}
                  <Translation id="page-upgrades-question-7-nimbus-lang" />
                </ListItem>
                <ListItem>
                  <Link to="https://prysmaticlabs.com/">
                    <Translation id="page-upgrades-question-7-prysm" />
                  </Link>{" "}
                  <Translation id="page-upgrades-question-7-prysm-lang" />
                </ListItem>
                <ListItem>
                  <Link to="https://pegasys.tech/teku-ethereum-2-for-enterprise/">
                    <Translation id="page-upgrades-question-7-teku" />
                  </Link>{" "}
                  <Translation id="page-upgrades-question-7-teku-lang" />
                </ListItem>
                <ListItem>
                  <Link to="https://github.com/chainsafe/lodestar#getting-started">
                    <Translation id="page-upgrades-question-7-lodestar" />
                  </Link>{" "}
                  <Translation id="page-upgrades-question-7-lodestar-lang" />
                </ListItem>
              </List>
              f
              <Text>
                <Link to="/developers/docs/nodes-and-clients/">
                  <Translation id="page-upgrades-question-7-clients" />
                </Link>
              </Text>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={t("page-upgrades-question-8-desc")}
              title={t("page-upgrades-question-8-title")}
            >
              <Text>
                <Translation id="page-upgrades-question-8-answer-1" />
              </Text>
              <Text>
                <Translation id="page-upgrades-question-8-answer-2" />{" "}
              </Text>
              <Text>
                <Translation id="page-upgrades-question-8-answer-3" />{" "}
                <Link to="/energy-consumption/">
                  <Translation id="page-upgrades-energy-consumption" />
                </Link>
              </Text>
              <Text>
                <Translation id="page-upgrades-question-8-answer-4" />
              </Text>
              <Text>
                <ButtonLink to="/upgrades/vision/">
                  <Translation id="page-upgrades-question-8-answer-6" />
                </ButtonLink>
              </Text>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={t("page-upgrades-question-9-desc")}
              title={t("page-upgrades-question-9-title")}
            >
              <Text>
                <Translation id="page-upgrades-question-9-answer-1" />{" "}
                <Link to="/staking/">
                  <Translation id="page-upgrades-question-9-stake-eth" />
                </Link>
              </Text>
              <Text>
                <Translation id="page-upgrades-question-9-answer-2" />{" "}
                <Link to="/upgrades/get-involved/">
                  <Translation id="page-upgrades-clients" />
                </Link>
              </Text>
              <Text>
                <Translation id="page-upgrades-question-9-answer-3" />{" "}
                <Link to="/bug-bounty/">
                  <Translation id="page-upgrades-bug-bounty" />
                </Link>
              </Text>
              <Text>
                <Translation id="page-upgrades-question-9-answer-4" />{" "}
                <Link to="https://ethresear.ch">
                  <Translation id="page-upgrades-question-3-answer-3-link" />
                </Link>
              </Text>
              <Text>
                <Link to="/community/get-involved/">
                  <Translation id="page-upgrades-question-9-more" />
                </Link>
              </Text>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={t("page-upgrades-question-10-desc")}
              title={t("page-upgrades-question-10-title")}
            >
              <Text>
                <Translation id="page-upgrades-question-10-answer-0" />
              </Text>

              <Text>
                <Translation id="page-upgrades-question-10-answer-1" />{" "}
                <Link to="/upgrades/beacon-chain/">
                  <Translation id="page-upgrades-question-10-answer-1-link" />
                </Link>
              </Text>
              <Text>
                <Translation id="page-upgrades-question-10-answer-2" />
              </Text>
              <Text>
                <Translation id="page-upgrades-question-10-answer-3" />
              </Text>
              <Text>
                <Translation id="page-upgrades-question-10-answer-5" />
              </Text>
              <Text>
                <Translation id="page-upgrades-question-10-answer-6" />{" "}
                <Link to="/developers/docs/consensus-mechanisms/pos/">
                  <Translation id="page-upgrades-proof-stake-link" />
                </Link>
              </Text>
              <Text>
                <Translation id="page-upgrades-question-10-answer-7" />{" "}
                <Link to="/upgrades/sharding/#code-execution">
                  <Translation id="page-upgrades-question-10-answer-8" />
                </Link>
              </Text>
            </ExpandableCard>
          </RightColumn>
        </Faq>
      </Content>
      <PageDivider />
      <Content>
        <H2>
          <Translation id="page-upgrades-stay-up-to-date" />
        </H2>
        <Text>
          <Translation id="page-upgrades-stay-up-to-date-desc" />
        </Text>
        <UpgradeArticles />
        <ResearchContainer>
          <H2>
            <Translation id="page-upgrades-take-part" />
          </H2>
          <Text>
            <Translation id="page-upgrades-take-part-desc" />
          </Text>
          <ButtonLink to="https://ethresear.ch/">
            <Translation id="page-upgrades-head-to-ethresearch" />
          </ButtonLink>
        </ResearchContainer>
      </Content>
      <FeedbackCard />
    </Flex>
  )
}

export default Eth2IndexPage

export const query = graphql`
  query UpgradesPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-upgrades-index", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    oldship: file(relativePath: { eq: "upgrades/oldship.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    rhino: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    merge: file(relativePath: { eq: "upgrades/merge.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    beaconchain: file(relativePath: { eq: "upgrades/core.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 420
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    shards: file(relativePath: { eq: "upgrades/newrings.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 420
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    themerge: file(relativePath: { eq: "upgrades/merge.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 420
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
