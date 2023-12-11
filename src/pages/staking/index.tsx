import { ReactNode } from "react"
import { SSRConfig, useTranslation } from "next-i18next"
import { Box, Flex, Grid, Show, useToken } from "@chakra-ui/react"

import type { ChildOnlyProp, TranslationKey } from "@/lib/types"

import { ButtonDropdownList as ButtonDropdownList } from "@/components/ButtonDropdown"
import ButtonLink, { ButtonLinkProps } from "@/components/Buttons/ButtonLink"
import Card from "@/components/Card"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import LeftNavBar from "@/components/LeftNavBar"
import InlineLink from "@/components/Link"
import {
  ContentContainer,
  MobileButton,
  MobileButtonDropdown,
  Page,
} from "@/components/MdComponents"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageHero from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import StakingCommunityCallout from "@/components/Staking/StakingCommunityCallout"
import StakingHierarchy from "@/components/Staking/StakingHierarchy"
import StakingStatsBox from "@/components/Staking/StakingStatsBox"
import Translation from "@/components/Translation"

import rhino from "@/public/upgrades/upgrade_rhino.png"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const PageContainer = (props: ChildOnlyProp) => (
  <Flex flexDir="column" alignItems="center" w="full" m="0 auto" {...props} />
)

const Divider = () => (
  <Box
    my={8}
    w="10%"
    height="0.25rem"
    bgColor="homeDivider"
    alignSelf="center"
  />
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
    xl: `"solo-title saas-title pool-title"
        "solo-rewards saas-rewards pool-rewards"
        "solo-risks saas-risks pool-risks"
        "solo-reqs saas-reqs pool-reqs"
        "solo-cta saas-cta pool-cta"`,
  }
  return (
    <Grid
      columnGap={12}
      gridAutoRows="minmax(64px, auto)"
      gridTemplateColumns={{ base: "1fr", xl: "repeat(3, 1fr)" }}
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

const H2 = (props) => (
  <OldHeading
    fontSize={{ base: "2xl", md: "2rem" }}
    lineHeight={1.4}
    mt={0}
    {...props}
  />
)

const ColorH3 = (props: { color: string; id: TranslationKey }) => (
  <OldHeading as="h3" fontSize="2xl" color={props.color}>
    <Translation id={props.id} />
  </OldHeading>
)

const StyledButtonLink = (
  props: Pick<ButtonLinkProps, "href"> & { id: TranslationKey }
) => (
  <ButtonLink href={props.href}>
    <Translation id={props.id} />
  </ButtonLink>
)

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

type Props = SSRConfig & {
  // lastDeployDate: string
}
export const getStaticProps = (async (context) => {
  const { locale } = context
  const lastDeployDate = getLastDeployDate()

  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPage("/staking")

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<Props>

const StakingPage = (): InferGetStaticPropsType<typeof getStaticProps> => {
  const { t } = useTranslation("page-staking")

  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  const heroContent = {
    title: t("page-staking-hero-title"),
    header: t("page-staking-hero-header"),
    subtitle: t("page-staking-hero-subtitle"),
    image: rhino,
    alt: t("page-staking-image-alt"),
    buttons: [],
  }

  const benefits: BenefitsType[] = [
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
    text: t("page-staking-dropdown-staking-options"),
    ariaLabel: t("page-staking-dropdown-staking-options-alt"),
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
        text: t("page-staking-dropdown-withdrawals"),
        to: "/staking/withdrawals/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked about withdrawals",
        },
      },
      {
        text: t("page-staking-dropdown-dvt"),
        to: "/staking/dvt/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked about dvt",
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
  } as const

  const tocArray = Object.keys(tocItems).map((key) => {
    const { id, title } = tocItems[key as keyof typeof tocItems]
    return { title, url: "#" + id }
  })

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
        {/* TODO: Switch to `above="lg"` after completion of Chakra Migration */}
        <LeftNavBar
          dropdownLinks={dropdownLinks}
          tocItems={tocArray}
          hideBelow={lgBp}
        />
        <ContentContainer id="content">
          <Flex direction="column" gap={16} mt={{ base: 16, lg: 0 }}>
            <Box>
              <H2 id={tocItems.whatIsStaking.id}>
                {tocItems.whatIsStaking.title}
              </H2>
              <Text>
                <Translation id="page-staking-description" />
              </Text>
              <Text>
                <InlineLink href="/get-eth/">
                  <Translation id="page-staking-section-what-link" />
                </InlineLink>
              </Text>
            </Box>
            <Box>
              <H2 id={tocItems.whyStakeYourEth.id}>
                {tocItems.whyStakeYourEth.title}
              </H2>
              <CardGrid>
                {benefits.map(
                  ({ title, description, emoji, linkText, to }, idx) => (
                    <StyledCard
                      title={title}
                      emoji={emoji}
                      key={idx}
                      description={description}
                    >
                      {to && linkText && (
                        <InlineLink href={to}>{linkText}</InlineLink>
                      )}
                    </StyledCard>
                  )
                )}
              </CardGrid>
            </Box>
            <Box>
              <H2 id={tocItems.howToStakeYourEth.id}>
                {tocItems.howToStakeYourEth.title}
              </H2>
              <Text>
                <Translation id="page-staking-section-why-p1" />
              </Text>
              <Text>
                <Translation id="page-staking-section-why-p2" />
              </Text>
            </Box>
            <StakingHierarchy />
            <Box>
              <p style={{ marginTop: "1rem" }}>
                <Translation id="page-staking-hierarchy-subtext" />
              </p>
            </Box>
            <Divider />
            <Box>
              <H2 id={tocItems.comparisonOfOptions.id}>
                {tocItems.comparisonOfOptions.title}
              </H2>
              <Text>
                <Translation id="page-staking-section-comparison-subtitle" />
              </Text>
              <ComparisonGrid>
                <ColorH3 color="stakingGold" id="page-staking-dropdown-solo" />
                <div
                  style={{
                    gridArea: "solo-rewards",
                    borderBottom: "1px solid #3335",
                  }}
                >
                  <OldHeading as="h4">
                    <Translation id="page-staking-section-comparison-rewards-title" />
                  </OldHeading>
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
                  <OldHeading as="h4">
                    <Translation id="page-staking-section-comparison-risks-title" />
                  </OldHeading>
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
                  <OldHeading as="h4">
                    <Translation id="page-staking-section-comparison-requirements-title" />
                  </OldHeading>
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
                    href="/staking/solo/"
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
                  <OldHeading as="h4">
                    <Translation id="page-staking-section-comparison-rewards-title" />
                  </OldHeading>
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
                  <OldHeading as="h4">
                    <Translation id="page-staking-section-comparison-risks-title" />
                  </OldHeading>
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
                  <OldHeading as="h4">
                    <Translation id="page-staking-section-comparison-requirements-title" />
                  </OldHeading>
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
                    href="/staking/saas"
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
                  <OldHeading as="h4">
                    <Translation id="page-staking-section-comparison-rewards-title" />
                  </OldHeading>
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
                  <OldHeading as="h4">
                    <Translation id="page-staking-section-comparison-risks-title" />
                  </OldHeading>
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
                  <OldHeading as="h4">
                    <Translation id="page-staking-section-comparison-requirements-title" />
                  </OldHeading>
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
                    href="/staking/pools/"
                    id="page-staking-more-on-pools"
                  />
                </div>
              </ComparisonGrid>
            </Box>
            <Divider />
            <StakingCommunityCallout id={tocItems.joinTheCommunity.id} />
            <Box>
              <H2 id={tocItems.faq.id}>{tocItems.faq.title}</H2>
              <ExpandableCard title={t("page-staking-faq-4-question")}>
                <Text>
                  <Translation id="page-staking-faq-4-answer-p1" />
                </Text>
                <Text>
                  <Translation id="page-staking-faq-4-answer-p2" />
                </Text>
                <Text>
                  <Translation id="page-staking-faq-4-answer-p3" />
                </Text>
                <ButtonLink href="/roadmap/merge/">
                  <Translation id="page-upgrades-merge-btn" />
                </ButtonLink>
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-5-question")}>
                <Text>
                  <Translation id="page-staking-faq-5-answer-p1" />
                </Text>
                <Text>
                  <Translation id="page-staking-faq-5-answer-p2" />
                </Text>
                <ButtonLink href="/staking/withdrawals/">
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
                <Text>
                  <Translation id="page-staking-faq-3-answer-p1" />
                </Text>
                <Text>
                  <Translation id="page-staking-faq-3-answer-p2" />
                </Text>
              </ExpandableCard>
            </Box>
            <Box>
              <H2 id={tocItems.further.id}>{tocItems.further.title}</H2>
              <ul>
                <li>
                  <InlineLink href="https://vitalik.ca/general/2020/11/06/pos2020.html">
                    <Translation id="page-staking-further-reading-1-link" />
                  </InlineLink>{" "}
                  -{" "}
                  <i>
                    <Translation id="page-staking-further-reading-author-vitalik-buterin" />
                  </i>
                </li>
                <li>
                  <InlineLink href="https://notes.ethereum.org/9l707paQQEeI-GPzVK02lA?view#">
                    <Translation id="page-staking-further-reading-2-link" />
                  </InlineLink>{" "}
                  -{" "}
                  <i>
                    <Translation id="page-staking-further-reading-author-vitalik-buterin" />
                  </i>
                </li>
                <li>
                  <InlineLink href="https://vitalik.ca/general/2017/12/31/pos_faq.html">
                    <Translation id="page-staking-further-reading-3-link" />
                  </InlineLink>{" "}
                  -{" "}
                  <i>
                    <Translation id="page-staking-further-reading-author-vitalik-buterin" />
                  </i>
                </li>
                <li>
                  <InlineLink href="https://hackmd.io/@benjaminion/eth2_news">
                    <Translation id="page-staking-further-reading-4-link" />
                  </InlineLink>{" "}
                  -{" "}
                  <i>
                    <Translation id="page-staking-further-reading-4-author" />
                  </i>
                </li>
                <li>
                  <InlineLink href="https://blog.ethereum.org/2022/01/31/finalized-no-33/">
                    <Translation id="page-staking-further-reading-5-link" />
                  </InlineLink>{" "}
                  -{" "}
                  <i>
                    <Translation id="page-staking-further-reading-5-author" />
                  </i>
                </li>
                <li>
                  <InlineLink href="https://www.attestant.io/posts/">
                    <Translation id="page-staking-further-reading-6-link" />
                  </InlineLink>
                </li>
                <li>
                  <InlineLink href="https://kb.beaconcha.in/">
                    <Translation id="page-staking-further-reading-7-link" />
                  </InlineLink>
                </li>
                <li>
                  <InlineLink href="https://beaconcha.in/education">
                    <Translation id="page-staking-further-reading-8-link" />
                  </InlineLink>
                </li>
                <li>
                  <InlineLink href="https://launchpad.ethereum.org/en/faq">
                    <Translation id="page-staking-further-reading-9-link" />
                  </InlineLink>
                </li>
                <li>
                  <InlineLink href="https://ethstaker.gitbook.io/ethstaker-knowledge-base/">
                    <Translation id="page-staking-further-reading-10-link" />
                  </InlineLink>
                </li>
              </ul>
            </Box>
            <Box>
              <FeedbackCard />
            </Box>
          </Flex>
        </ContentContainer>
        {/* // TODO: Switch to `above="lg"` after completion of Chakra Migration */}
        <Show below={lgBp}>
          <MobileButton>
            <MobileButtonDropdown list={dropdownLinks} />
          </MobileButton>
        </Show>
      </Page>
    </PageContainer>
  )
}

export default StakingPage
