import React, { ReactNode } from "react"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { Box, Flex, Grid, Heading, useToken } from "@chakra-ui/react"

import ButtonDropdown, {
  List as ButtonDropdownList,
} from "../../components/ButtonDropdown"
import ButtonLink from "../../components/ButtonLink"
import Card from "../../components/Card"
import Link from "../../components/Link"
import PageHero from "../../components/PageHero"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import FeedbackCard from "../../components/FeedbackCard"
import ExpandableCard from "../../components/ExpandableCard"
import StakingStatsBox from "../../components/Staking/StakingStatsBox"
import StakingHierarchy from "../../components/Staking/StakingHierarchy"
import StakingHomeTableOfContents from "../../components/Staking/StakingHomeTableOfContents"
import StakingCommunityCallout from "../../components/Staking/StakingCommunityCallout"

import { getImage } from "../../utils/image"

import type { ChildOnlyProp, Context } from "../../types"

const Content = (props: ChildOnlyProp) => (
  <Box p="1rem 2rem" w="full" {...props} />
)

const PageContainer = (props: ChildOnlyProp) => (
  <Flex flexDir="column" alignItems="center" w="full" m="0 auto" {...props} />
)

const Divider = () => (
  <Box mb={16} mt={16} w="10%" height="0.25rem" bgColor="homeDivider" />
)

const HeroStatsWrapper = (props: ChildOnlyProp) => (
  <Flex
    direction="column"
    alignItems="center"
    bg="layer2Gradient"
    pb={8}
    w="full"
    {...props}
  />
)

const Page = (props: ChildOnlyProp) => (
  <Flex
    w="full"
    justifyContent="space-between"
    m="0 auto 4rem"
    pt={16}
    flexDirection={{ base: "column", lg: "row" }}
    {...props}
  />
)

const InfoTitle = (props: ChildOnlyProp) => (
  <Heading
    fontSize="5xl"
    fontWeight="700"
    lineHeight={1.4}
    textAlign="right"
    mt={0}
    display={{ base: "none", lg: "block" }}
    {...props}
  />
)

// InfoColumn shows above xl
const InfoColumn = (props: ChildOnlyProp) => (
  <Flex
    flexDir="column"
    position="sticky"
    top="6.25rem"
    height="calc(100vh - 80px)"
    flex="0 1 330px"
    mx={8}
    display={{ base: "none", lg: "initial" }}
    {...props}
  />
)

const StyledButtonDropdown = ({
  list,
  ...rest
}: {
  list: ButtonDropdownList
}) => (
  <Flex
    justifyContent="flex-end"
    textAlign="center"
    alignSelf={{ base: "auto", lg: "flex-end" }}
    mb={8}
    {...rest}
  >
    <ButtonDropdown list={list} />
  </Flex>
)

// ButtonDropdown for mobile only
const MobileButton = ({ list, ...rest }: { list: ButtonDropdownList }) => {
  const borderBoxShadowColor = useToken("colors", "border")

  return (
    <Box
      position="sticky"
      bottom="0"
      w="full"
      bg="background"
      boxShadow={`0 -1px 0px ${borderBoxShadowColor}`}
      zIndex="99"
      p={8}
      mb={0}
      display={{ base: "block", lg: "none" }}
      {...rest}
    >
      <ButtonDropdown list={list} />
    </Box>
  )
}

const ContentContainer = (props: { children: ReactNode; id: string }) => {
  const [mdBp, lgBp] = useToken("breakpoints", ["md", "lg"])

  return (
    <Flex
      flex={`1 1 ${lgBp}`}
      flexBasis={mdBp}
      position="relative"
      padding={{ base: 0, md: "0 2rem 2rem" }}
      gap={8}
      direction="column"
      alignItems="center"
      sx={{
        "h2:first-of-type, & > div:first-of-type": {
          mt: 0,
          pt: 0,
        },
      }}
      {...props}
    ></Flex>
  )
}

const ComparisonGrid = (props: ChildOnlyProp) => {
  const gridAreas = {
    base: `"solo-title"
        "solo-rewards"
        "solo-risks"
        "solo-reqs"
        "solo-cta"
        "saas-title"
        "saas-rewards"
        "saas-risks"
        "saas-reqs"
        "saas-cta"
        "pool-title"
        "pool-rewards"
        "pool-risks"
        "pool-reqs"
        "pool-cta";`,
    lg: `"solo-title saas-title pool-title"
        "solo-rewards saas-rewards pool-rewards"
        "solo-risks saas-risks pool-risks"
        "solo-reqs saas-reqs pool-reqs"
        "solo-cta saas-cta pool-cta"`,
  }
  return (
    <Grid
      columnGap={12}
      gridAutoRows="minmax(64px, auto)"
      gridTemplateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
      gridTemplateAreas={gridAreas}
      sx={{
        h4: {
          color: "#787878",
        },
      }}
      {...props}
    ></Grid>
  )
}

const ColorH3 = (props: { color: string; id: TranslationKey }) => (
  <Heading as="h3" fontSize="2xl" color={props.color}>
    <Translation id={props.id} />
  </Heading>
)

const StyledButtonLink = (props: { to: string; id: TranslationKey }) => {
  return (
    <ButtonLink to={props.to} sx={{ width: { base: "100%", sm: "initial" } }}>
      <Translation id={props.id} />
    </ButtonLink>
  )
}

const CardGrid = (props: ChildOnlyProp) => (
  <Grid
    gap={8}
    templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
    {...props}
  />
)

const StyledCard = (props: {
  title: string
  emoji: string
  description: string
  key: number
  children: ReactNode
}) => (
  <Card
    title={props.title}
    emoji={props.emoji}
    key={props.key}
    description={props.description}
    sx={{
      justifyContent: "flex-start",
      h3: {
        fontWeight: "700",
        margin: "0 0 1rem",
      },
    }}
  >
    {props.children}
  </Card>
)

type BenefitsType = {
  title: string
  emoji: string
  description: string
  linkText?: string
  to?: string
}

const StakingPage = ({
  data,
}: PageProps<Queries.StakingPageIndexQuery, Context>) => {
  const { t } = useTranslation()

  const heroContent = {
    title: t("page-staking-hero-title"),
    header: t("page-staking-hero-header"),
    subtitle: t("page-staking-hero-subtitle"),
    image: getImage(data.rhino)!,
    alt: t("page-staking-image-alt"),
    buttons: [],
  }

  const benefits: Array<BenefitsType> = [
    {
      title: t("page-staking-benefits-1-title"),
      emoji: "💰",
      description: t("page-staking-benefits-1-description"),
    },
    {
      title: t("page-staking-benefits-2-title"),
      emoji: ":shield:",
      description: t("page-staking-benefits-2-description"),
    },
    {
      title: t("page-staking-benefits-3-title"),
      emoji: "🍃",
      description: t("page-staking-benefits-3-description"),
      linkText: t("page-staking-benefits-3-link"),
      to: "/energy-consumption",
    },
  ]

  const dropdownLinks: ButtonDropdownList = {
    text: "Staking Options",
    ariaLabel: "Staking options dropdown menu",
    items: [
      {
        text: t("page-staking-dropdown-home"),
        to: "/staking/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking home",
        },
      },
      {
        text: t("page-staking-dropdown-solo"),
        to: "/staking/solo/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked solo staking",
        },
      },
      {
        text: t("page-staking-dropdown-saas"),
        to: "/staking/saas/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking as a service",
        },
      },
      {
        text: t("page-staking-dropdown-pools"),
        to: "/staking/pools/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked pooled staking",
        },
      },
      {
        text: "page-staking-dropdown-withdrawals",
        to: "/staking/withdrawals/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked about withdrawals",
        },
      },
    ],
  }

  const tocItems = {
    whatIsStaking: {
      id: "what-is-staking",
      title: t("page-staking-section-what-title"),
    },
    whyStakeYourEth: {
      id: "why-stake-your-eth",
      title: t("page-staking-section-why-title"),
    },
    howToStakeYourEth: {
      id: "how-to-stake-your-eth",
      title: t("page-staking-toc-how-to-stake-your-eth"),
    },
    comparisonOfOptions: {
      id: "comparison-of-options",
      title: t("page-staking-toc-comparison-of-options"),
    },
    joinTheCommunity: {
      id: "join-the-community",
      title: t("page-staking-join-community"),
    },
    faq: {
      id: "faq",
      title: t("page-staking-toc-faq"),
    },
    further: {
      id: "further",
      title: t("page-staking-toc-further"),
    },
  }

  const tocArray = Object.values(tocItems)

  return (
    <PageContainer>
      <PageMetadata
        title={t("page-staking-meta-title")}
        description={t("page-staking-meta-description")}
      />
      <HeroStatsWrapper>
        <PageHero content={heroContent} />
        <StakingStatsBox />
      </HeroStatsWrapper>
      <Page>
        <InfoColumn>
          <StyledButtonDropdown list={dropdownLinks} />
          <InfoTitle>
            <Translation id="page-staking-dom-info-title" />
          </InfoTitle>
          <StakingHomeTableOfContents items={tocArray} />
        </InfoColumn>
        <ContentContainer id="content">
          <Content>
            <h2 id={tocItems.whatIsStaking.id}>
              {tocItems.whatIsStaking.title}
            </h2>
            <p>
              <Translation id="page-staking-description" />
            </p>
            <p>
              <Link to="/get-eth/">
                <Translation id="page-staking-section-what-link" />
              </Link>
            </p>
          </Content>
          <Content>
            <h2 id={tocItems.whyStakeYourEth.id}>
              {tocItems.whyStakeYourEth.title}
            </h2>
            <CardGrid>
              {benefits.map(
                ({ title, description, emoji, linkText, to }, idx) => (
                  <StyledCard
                    title={title}
                    emoji={emoji}
                    key={idx}
                    description={description}
                  >
                    {to && linkText && <Link to={to}>{linkText}</Link>}
                  </StyledCard>
                )
              )}
            </CardGrid>
          </Content>
          <Content>
            <h2 id={tocItems.howToStakeYourEth.id}>
              {tocItems.howToStakeYourEth.title}
            </h2>
            <p>
              <Translation id="page-staking-section-why-p1" />
            </p>
            <p>
              <Translation id="page-staking-section-why-p2" />
            </p>
          </Content>
          <StakingHierarchy />
          <Content>
            <p style={{ marginTop: "1rem" }}>
              <Translation id="page-staking-hierarchy-subtext" />
            </p>
          </Content>
          <Divider />
          <Content>
            <h2 id={tocItems.comparisonOfOptions.id}>
              {tocItems.comparisonOfOptions.title}
            </h2>
            <p>
              <Translation id="page-staking-section-comparison-subtitle" />
            </p>
            <ComparisonGrid>
              <ColorH3 color="stakingGold" id="page-staking-dropdown-solo" />
              <div
                style={{
                  gridArea: "solo-rewards",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-rewards-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-rewards-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-rewards-li2" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-rewards-li3" />
                  </li>
                </ul>
              </div>
              <div
                style={{
                  gridArea: "solo-risks",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-risks-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-risks-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-risks-li2" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-risks-li3" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "solo-reqs" }}>
                <h4>
                  <Translation id="page-staking-section-comparison-requirements-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-requirements-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-requirements-li2" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-requirements-li3" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "solo-cta" }}>
                <StyledButtonLink
                  to="/staking/solo/"
                  id="page-staking-more-on-solo"
                />
              </div>
              <ColorH3 color="stakingGreen" id="page-staking-dropdown-saas" />
              <div
                style={{
                  gridArea: "saas-rewards",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-rewards-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-rewards-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-rewards-li2" />
                  </li>
                </ul>
              </div>
              <div
                style={{
                  gridArea: "saas-risks",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-risks-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-risks-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-risks-li2" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "saas-reqs" }}>
                <h4>
                  <Translation id="page-staking-section-comparison-requirements-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-requirements-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-requirements-li2" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-requirements-li3" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "saas-cta" }}>
                <StyledButtonLink
                  to="/staking/saas"
                  id="page-staking-more-on-saas"
                />
              </div>

              <ColorH3 color="stakingBlue" id="page-staking-dropdown-pools" />
              <div
                style={{
                  gridArea: "pool-rewards",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-rewards-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-rewards-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-rewards-li2" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-rewards-li3" />
                  </li>
                </ul>
              </div>
              <div
                style={{
                  gridArea: "pool-risks",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-risks-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-risks-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-risks-li2" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "pool-reqs" }}>
                <h4>
                  <Translation id="page-staking-section-comparison-requirements-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-requirements-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-requirements-li2" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "pool-cta" }}>
                <StyledButtonLink
                  to="/staking/pools/"
                  id="page-staking-more-on-pools"
                />
              </div>
            </ComparisonGrid>
          </Content>
          <Divider />
          <StakingCommunityCallout id={tocItems.joinTheCommunity.id} />
          <Content>
            <h2 id={tocItems.faq.id}>{tocItems.faq.title}</h2>
            <ExpandableCard title={t("page-staking-faq-4-question")}>
              <p>
                <Translation id="page-staking-faq-4-answer-p1" />
              </p>
              <p>
                <Translation id="page-staking-faq-4-answer-p2" />
              </p>
              <p>
                <Translation id="page-staking-faq-4-answer-p3" />
              </p>
              <ButtonLink to="/upgrades/merge/">
                <Translation id="page-upgrades-merge-btn" />
              </ButtonLink>
            </ExpandableCard>
            <ExpandableCard title={t("page-staking-faq-5-question")}>
              <p>
                <Translation id="page-staking-faq-5-answer-p1" />
              </p>
              <p>
                <Translation id="page-staking-faq-5-answer-p2" />
              </p>
              <ButtonLink to="/staking/withdrawals/">
                <Translation id="page-staking-faq-5-answer-link" />
              </ButtonLink>
            </ExpandableCard>
            <ExpandableCard title={t("page-staking-faq-1-question")}>
              <Translation id="page-staking-faq-1-answer" />
            </ExpandableCard>
            <ExpandableCard title={t("page-staking-faq-2-question")}>
              <Translation id="page-staking-faq-2-answer" />
            </ExpandableCard>
            <ExpandableCard title={t("page-staking-faq-3-question")}>
              <p>
                <Translation id="page-staking-faq-3-answer-p1" />
              </p>
              <p>
                <Translation id="page-staking-faq-3-answer-p2" />
              </p>
            </ExpandableCard>
          </Content>
          <Content>
            <h2 id={tocItems.further.id}>{tocItems.further.title}</h2>
            <ul>
              <li>
                <Link to="https://vitalik.ca/general/2020/11/06/pos2020.html">
                  <Translation id="page-staking-further-reading-1-link" />
                </Link>{" "}
                -{" "}
                <i>
                  <Translation id="page-staking-further-reading-author-vitalik-buterin" />
                </i>
              </li>
              <li>
                <Link to="https://notes.ethereum.org/9l707paQQEeI-GPzVK02lA?view#">
                  <Translation id="page-staking-further-reading-2-link" />
                </Link>{" "}
                -{" "}
                <i>
                  <Translation id="page-staking-further-reading-author-vitalik-buterin" />
                </i>
              </li>
              <li>
                <Link to="https://vitalik.ca/general/2017/12/31/pos_faq.html">
                  <Translation id="page-staking-further-reading-3-link" />
                </Link>{" "}
                -{" "}
                <i>
                  <Translation id="page-staking-further-reading-author-vitalik-buterin" />
                </i>
              </li>
              <li>
                <Link to="https://hackmd.io/@benjaminion/eth2_news">
                  <Translation id="page-staking-further-reading-4-link" />
                </Link>{" "}
                -{" "}
                <i>
                  <Translation id="page-staking-further-reading-4-author" />
                </i>
              </li>
              <li>
                <Link to="https://blog.ethereum.org/2022/01/31/finalized-no-33/">
                  <Translation id="page-staking-further-reading-5-link" />
                </Link>{" "}
                -{" "}
                <i>
                  <Translation id="page-staking-further-reading-5-author" />
                </i>
              </li>
              <li>
                <Link to="https://www.attestant.io/posts/">
                  <Translation id="page-staking-further-reading-6-link" />
                </Link>
              </li>
              <li>
                <Link to="https://kb.beaconcha.in/">
                  <Translation id="page-staking-further-reading-7-link" />
                </Link>
              </li>
              <li>
                <Link to="https://beaconcha.in/education">
                  <Translation id="page-staking-further-reading-8-link" />
                </Link>
              </li>
              <li>
                <Link to="https://launchpad.ethereum.org/en/faq">
                  <Translation id="page-staking-further-reading-9-link" />
                </Link>
              </li>
              <li>
                <Link to="https://ethstaker.gitbook.io/ethstaker-knowledge-base/">
                  <Translation id="page-staking-further-reading-10-link" />
                </Link>
              </li>
            </ul>
          </Content>
          <Content>
            <FeedbackCard />
          </Content>
        </ContentContainer>
        <MobileButton list={dropdownLinks} />
      </Page>
    </PageContainer>
  )
}

export default StakingPage

export const query = graphql`
  query StakingPageIndex($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-staking", "common"] }
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
    rhino: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 500
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
