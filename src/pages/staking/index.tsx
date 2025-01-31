import { type HTMLAttributes, ReactNode } from "react"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type {
  BasePageProps,
  ChildOnlyProp,
  EpochResponse,
  EthStoreResponse,
  Lang,
  StakingStatsData,
} from "@/lib/types"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import Card from "@/components/Card"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import LeftNavBar from "@/components/LeftNavBar"
import { ContentContainer, Page } from "@/components/MdComponents"
import MobileButtonDropdown from "@/components/MobileButtonDropdown"
import PageHero from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import StakingCommunityCallout from "@/components/Staking/StakingCommunityCallout"
import StakingHierarchy from "@/components/Staking/StakingHierarchy"
import StakingStatsBox from "@/components/Staking/StakingStatsBox"
import Translation from "@/components/Translation"
import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Flex, Stack, VStack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import rhino from "@/public/images/upgrades/upgrade_rhino.png"

type BenefitsType = {
  title: string
  emoji: string
  description: ReactNode
  linkText?: string
  href?: string
}

const PageContainer = (props: ChildOnlyProp) => (
  <VStack className="mx-auto w-full gap-0" {...props} />
)

const HeroStatsWrapper = (props: ChildOnlyProp) => (
  <VStack className="w-full gap-0 bg-main-gradient" {...props} />
)

const ComparisonGrid = (props: ChildOnlyProp) => {
  return (
    <div
      className="grid auto-rows-[minmax(64px,_auto)] grid-cols-[1fr] gap-x-12 [grid-template-areas:'solo-title''solo-rewards''solo-risks''solo-reqs''solo-cta''saas-title''saas-rewards''saas-risks''saas-reqs''saas-cta''pool-title''pool-rewards''pool-risks''pool-reqs''pool-cta'] xl:grid-cols-[repeat(3,_1fr)] xl:[grid-template-areas:'solo-title_saas-title_pool-title''solo-rewards_saas-rewards_pool-rewards''solo-risks_saas-risks_pool-risks''solo-reqs_saas-reqs_pool-reqs''solo-cta_saas-cta_pool-cta'] [&_h4]:text-[#787878]"
      {...props}
    />
  )
}

const H2 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="mb-8 mt-0 text-2xl leading-xs md:text-[2rem]" {...props} />
)

const ColorH3 = ({
  color,
  children,
}: {
  color: `text-${string} dark:text-${string}`
  children: ReactNode
}) => <h3 className={cn("my-8", color)}>{children}</h3>

const H4 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className="my-8" {...props} />
)

const StyledButtonLink = ({
  href,
  children,
}: Pick<ButtonLinkProps, "href" | "children">) => (
  <ButtonLink href={href}>{children}</ButtonLink>
)

const CardGrid = (props: ChildOnlyProp) => (
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-3" {...props} />
)

const StyledCard = (props: {
  title: string
  emoji: string
  description: ReactNode
  key: number
  children: ReactNode
}) => (
  <Card
    title={props.title}
    emoji={props.emoji}
    key={props.key}
    description={props.description}
    className="justify-start [&_h3]:mb-1 [&_h3]:mt-0 [&_h3]:font-bold"
  >
    {props.children}
  </Card>
)

const fetchBeaconchainData = async (): Promise<StakingStatsData> => {
  // Fetch Beaconcha.in data
  const base = "https://beaconcha.in"
  const { href: ethstore } = new URL("api/v1/ethstore/latest", base)
  const { href: epoch } = new URL("api/v1/epoch/latest", base)

  // Get total ETH staked and current APR from ethstore endpoint
  const ethStoreResponse = await fetch(ethstore)
  if (!ethStoreResponse.ok)
    throw new Error("Network response from Beaconcha.in ETHSTORE was not ok")
  const ethStoreResponseJson: EthStoreResponse = await ethStoreResponse.json()
  const {
    data: { apr, effective_balances_sum_wei },
  } = ethStoreResponseJson
  const totalEffectiveBalance = effective_balances_sum_wei * 1e-18
  const totalEthStaked = Math.floor(totalEffectiveBalance)

  // Get total active validators from latest epoch endpoint
  const epochResponse = await fetch(epoch)
  if (!epochResponse.ok)
    throw new Error("Network response from Beaconcha.in EPOCH was not ok")
  const epochResponseJson: EpochResponse = await epochResponse.json()
  const {
    data: { validatorscount },
  } = epochResponseJson

  return { totalEthStaked, validatorscount, apr }
}

type Props = BasePageProps & {
  data: StakingStatsData
}

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader(
  [["stakingStatsData", fetchBeaconchainData]],
  REVALIDATE_TIME * 1000
)

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/staking")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const [data] = await loadData()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      data,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<Props>

const StakingPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation("page-staking")

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
      description: (
        <Translation id="page-staking:page-staking-benefits-1-description" />
      ),
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
      href: "/energy-consumption",
    },
  ]

  const dropdownLinks: ButtonDropdownList = {
    text: t("page-staking-dropdown-staking-options"),
    ariaLabel: t("page-staking-dropdown-staking-options-alt"),
    items: [
      {
        text: t("page-staking-dropdown-home"),
        href: "/staking/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking home",
        },
      },
      {
        text: t("page-staking-dropdown-solo"),
        href: "/staking/solo/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked solo staking",
        },
      },
      {
        text: t("page-staking-dropdown-saas"),
        href: "/staking/saas/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking as a service",
        },
      },
      {
        text: t("page-staking-dropdown-pools"),
        href: "/staking/pools/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked pooled staking",
        },
      },
      {
        text: t("page-staking-dropdown-withdrawals"),
        href: "/staking/withdrawals/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked about withdrawals",
        },
      },
      {
        text: t("page-staking-dropdown-dvt"),
        href: "/staking/dvt/",
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
        image="/images/upgrades/upgrade_rhino.png"
      />
      <HeroStatsWrapper>
        <PageHero content={heroContent} />
        <StakingStatsBox data={data} />
      </HeroStatsWrapper>
      <Page>
        <LeftNavBar
          dropdownLinks={dropdownLinks}
          tocItems={tocArray}
          // TODO: Remove bang after this component is migrated to Tailwind
          className="max-lg:!hidden"
        />
        <ContentContainer>
          <Flex className="mt-16 flex-col gap-16 lg:mt-0">
            <div>
              <H2 id={tocItems.whatIsStaking.id}>
                {tocItems.whatIsStaking.title}
              </H2>
              <p>
                <Translation id="page-staking:page-staking-description" />
              </p>
            </div>
            <div>
              <H2 id={tocItems.whyStakeYourEth.id}>
                {tocItems.whyStakeYourEth.title}
              </H2>
              <CardGrid>
                {benefits.map(
                  ({ title, description, emoji, linkText, href }, idx) => (
                    <StyledCard
                      title={title}
                      emoji={emoji}
                      key={idx}
                      description={description}
                    >
                      {href && linkText && (
                        <InlineLink href={href}>{linkText}</InlineLink>
                      )}
                    </StyledCard>
                  )
                )}
              </CardGrid>
            </div>
            <div>
              <H2 id={tocItems.howToStakeYourEth.id}>
                {tocItems.howToStakeYourEth.title}
              </H2>
              <Stack className="gap-[1.45rem]">
                <p>{t("page-staking-section-why-p1")}</p>
                <p>{t("page-staking-section-why-p2")}</p>
              </Stack>
            </div>
            <StakingHierarchy />
            <div>
              <p className="mt-4">
                <Translation id="page-staking:page-staking-hierarchy-subtext" />
              </p>
            </div>
            <Divider />
            <div>
              <H2 id={tocItems.comparisonOfOptions.id}>
                {tocItems.comparisonOfOptions.title}
              </H2>
              <p className="mb-[1.45rem]">
                {t("page-staking-section-comparison-subtitle")}
              </p>
              <ComparisonGrid>
                <ColorH3 color="text-[#be8d10] dark:text-[#f2bb2f]">
                  {t("page-staking-dropdown-solo")}
                </ColorH3>
                <div className="border-b-[1px] border-b-[#3335] [grid-area:solo-rewards]">
                  <H4>{t("page-staking-section-comparison-rewards-title")}</H4>
                  <UnorderedList>
                    <ListItem>
                      {t("page-staking-section-comparison-solo-rewards-li1")}
                    </ListItem>
                    <ListItem>
                      {t("page-staking-section-comparison-solo-rewards-li2")}
                    </ListItem>
                    <ListItem>
                      {t("page-staking-section-comparison-solo-rewards-li3")}
                    </ListItem>
                  </UnorderedList>
                </div>
                <div className="border-b-[1px] border-b-[#3335] [grid-area:solo-risks]">
                  <H4>{t("page-staking-section-comparison-risks-title")}</H4>
                  <UnorderedList>
                    <ListItem>
                      {t("page-staking-section-comparison-solo-risks-li1")}
                    </ListItem>
                    <ListItem>
                      {t("page-staking-section-comparison-solo-risks-li2")}
                    </ListItem>
                    <ListItem>
                      {t("page-staking-section-comparison-solo-risks-li3")}
                    </ListItem>
                    <ListItem>
                      {t("page-staking-section-comparison-solo-risks-li4")}
                    </ListItem>
                  </UnorderedList>
                </div>
                <div className="[grid-area:solo-reqs]">
                  <H4>
                    {t("page-staking-section-comparison-requirements-title")}
                  </H4>
                  <UnorderedList>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-solo-requirements-li1" />
                    </ListItem>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-solo-requirements-li2" />
                    </ListItem>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-solo-requirements-li3" />
                    </ListItem>
                  </UnorderedList>
                </div>
                <div className="[grid-area:solo-cta]">
                  <StyledButtonLink href="/staking/solo/">
                    {t("page-staking-more-on-solo")}
                  </StyledButtonLink>
                </div>
                <ColorH3 color="text-[#129e5b] dark:text-[#49de96]">
                  {t("page-staking-dropdown-saas")}
                </ColorH3>
                <div className="border-b-[1px] border-b-[#3335] [grid-area:saas-rewards]">
                  <H4>{t("page-staking-section-comparison-rewards-title")}</H4>
                  <UnorderedList>
                    <ListItem>
                      {t("page-staking-section-comparison-saas-rewards-li1")}
                    </ListItem>
                    <ListItem>
                      {t("page-staking-section-comparison-saas-rewards-li2")}
                    </ListItem>
                  </UnorderedList>
                </div>
                <div className="border-b-[1px] border-b-[#3335] [grid-area:saas-risks]">
                  <H4>{t("page-staking-section-comparison-risks-title")}</H4>
                  <UnorderedList>
                    <ListItem>
                      {t("page-staking-section-comparison-saas-risks-li1")}
                    </ListItem>
                    <ListItem>
                      {t("page-staking-section-comparison-saas-risks-li2")}
                    </ListItem>
                  </UnorderedList>
                </div>
                <div className="[grid-area:saas-reqs]">
                  <H4>
                    {t("page-staking-section-comparison-requirements-title")}
                  </H4>
                  <UnorderedList>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-saas-requirements-li1" />
                    </ListItem>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-saas-requirements-li2" />
                    </ListItem>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-saas-requirements-li3" />
                    </ListItem>
                  </UnorderedList>
                </div>
                <div className="[grid-area:saas-cta]">
                  <StyledButtonLink href="/staking/saas">
                    {t("page-staking-more-on-saas")}
                  </StyledButtonLink>
                </div>

                <ColorH3 color="text-[#0b83dc] dark:text-[#a9d3f2]">
                  {t("page-staking-dropdown-pools")}
                </ColorH3>
                <div className="border-b-[1px] border-b-[#3335] [grid-area:pool-rewards]">
                  <H4>{t("page-staking-section-comparison-rewards-title")}</H4>
                  <UnorderedList>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-pools-rewards-li1" />
                    </ListItem>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-pools-rewards-li2" />
                    </ListItem>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-pools-rewards-li3" />
                    </ListItem>
                  </UnorderedList>
                </div>
                <div className="border-b-[1px] border-b-[#3335] [grid-area:pool-risks]">
                  <H4>{t("page-staking-section-comparison-risks-title")}</H4>
                  <UnorderedList>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-pools-risks-li1" />
                    </ListItem>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-pools-risks-li2" />
                    </ListItem>
                  </UnorderedList>
                </div>
                <div className="[grid-area:pool-reqs]">
                  <H4>
                    {t("page-staking-section-comparison-requirements-title")}
                  </H4>
                  <UnorderedList>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-pools-requirements-li1" />
                    </ListItem>
                    <ListItem>
                      <Translation id="page-staking:page-staking-section-comparison-pools-requirements-li2" />
                    </ListItem>
                  </UnorderedList>
                </div>
                <div className="[grid-area:pool-cta]">
                  <StyledButtonLink href="/staking/pools/">
                    {t("page-staking-more-on-pools")}
                  </StyledButtonLink>
                </div>
              </ComparisonGrid>
            </div>
            <Divider />
            <StakingCommunityCallout id={tocItems.joinTheCommunity.id} />
            <div>
              <H2 id={tocItems.faq.id}>{tocItems.faq.title}</H2>
              <ExpandableCard title={t("page-staking-faq-4-question")}>
                <Stack className="gap-[1.45rem]">
                  <p>{t("page-staking-faq-4-answer-p1")}</p>
                  <p>{t("page-staking-faq-4-answer-p2")}</p>
                  <p>{t("page-staking-faq-4-answer-p3")}</p>
                  <ButtonLink className="self-start" href="/roadmap/merge/">
                    {t("page-upgrades-merge-btn")}
                  </ButtonLink>
                </Stack>
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-5-question")}>
                <Stack className="gap-[1.45rem]">
                  <p>{t("page-staking-faq-5-answer-p1")}</p>
                  <p>{t("page-staking-faq-5-answer-p2")}</p>
                  <ButtonLink
                    className="self-start"
                    href="/staking/withdrawals/"
                  >
                    {t("page-staking-faq-5-answer-link")}
                  </ButtonLink>
                </Stack>
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-1-question")}>
                <Translation id="page-staking:page-staking-faq-1-answer" />
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-2-question")}>
                {t("page-staking-faq-2-answer")}
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-3-question")}>
                <Stack className="gap-[1.45rem]">
                  <p>{t("page-staking-faq-3-answer-p1")}</p>
                  <p>
                    <Translation id="page-staking:page-staking-faq-3-answer-p2" />
                  </p>
                </Stack>
              </ExpandableCard>
            </div>
            <div>
              <H2 id={tocItems.further.id}>{tocItems.further.title}</H2>
              <UnorderedList>
                <ListItem>
                  <InlineLink href="https://notes.ethereum.org/9l707paQQEeI-GPzVK02lA?view#">
                    {t("page-staking-further-reading-2-link")}
                  </InlineLink>{" "}
                  -{" "}
                  <i>
                    {t("page-staking-further-reading-author-vitalik-buterin")}
                  </i>
                </ListItem>
                <ListItem>
                  <InlineLink href="https://hackmd.io/@benjaminion/eth2_news">
                    {t("page-staking-further-reading-4-link")}
                  </InlineLink>{" "}
                  - <i>{t("page-staking-further-reading-4-author")}</i>
                </ListItem>
                <ListItem>
                  <InlineLink href="https://blog.ethereum.org/2022/01/31/finalized-no-33/">
                    {t("page-staking-further-reading-5-link")}
                  </InlineLink>{" "}
                  - <i>{t("page-staking-further-reading-5-author")}</i>
                </ListItem>
                <ListItem>
                  <InlineLink href="https://www.attestant.io/posts/">
                    {t("page-staking-further-reading-6-link")}
                  </InlineLink>
                </ListItem>
                <ListItem>
                  <InlineLink href="https://beaconcha.in/education">
                    {t("page-staking-further-reading-8-link")}
                  </InlineLink>
                </ListItem>
                <ListItem>
                  <InlineLink href="https://launchpad.ethereum.org/en/faq">
                    {t("page-staking-further-reading-9-link")}
                  </InlineLink>
                </ListItem>
                <ListItem>
                  <InlineLink href="https://ethstaker.gitbook.io/ethstaker-knowledge-base/">
                    {t("page-staking-further-reading-10-link")}
                  </InlineLink>
                </ListItem>
              </UnorderedList>
            </div>
            <div>
              <FeedbackCard />
            </div>
          </Flex>
        </ContentContainer>
        <MobileButtonDropdown list={dropdownLinks} />
      </Page>
    </PageContainer>
  )
}

export default StakingPage
