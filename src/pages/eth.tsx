import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import type { ComponentProps, HTMLAttributes } from "react"

import type { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import ActionCard from "@/components/ActionCard"
import CalloutBanner from "@/components/CalloutBanner"
import Card from "@/components/Card"
import CardList from "@/components/CardList"
import EthPriceCard from "@/components/EthPriceCard"
import EthVideo from "@/components/EthVideo"
import FeedbackCard from "@/components/FeedbackCard"
import HorizontalCard from "@/components/HorizontalCard"
import { TwImage } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Flex, VStack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import eth from "@/public/images/eth.png"
import ethCat from "@/public/images/eth-gif-cat.png"
import defi from "@/public/images/finance_transparent.png"
import ethereum from "@/public/images/what-is-ethereum.png"

const Page = (props: ChildOnlyProp) => (
  <MainArticle
    className="mx-auto my-0 flex w-full flex-col items-center"
    {...props}
  />
)

const Content = (props: ChildOnlyProp) => (
  <div className="w-full px-8 py-4" {...props} />
)

const GrayContainer = (props: ChildOnlyProp) => (
  <div
    className="mt-8 w-full border-t bg-background-highlight py-16 shadow-table-item-box"
    {...props}
  />
)

const Intro = (props: ChildOnlyProp) => (
  <div className="mb-12 max-w-[608px] sm:mb-16" {...props} />
)

const StyledCard = (props: ComponentProps<typeof Card>) => (
  <Card
    className="m-4 min-w-[280px] max-w-full flex-[1_0_30%] bg-background p-6 md:max-w-[46%] lg:max-w-[31%]"
    {...props}
  />
)

const Slogan = (props: ChildOnlyProp) => (
  <h3 className="mb-6 leading-xs" {...props} />
)

const Title = (props: ChildOnlyProp) => (
  <h1
    className="mb-4 mt-0 text-md font-normal uppercase !leading-xs"
    {...props}
  />
)

const Subtitle = (props: ChildOnlyProp) => (
  <Text className="mb-0 leading-xs text-body-medium" {...props} />
)

const Text = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <p className={cn("mb-6", className)} {...props} />
)

export const TwoColumnContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Flex
    className={cn(
      "mb-12 w-full flex-col justify-between p-8 lg:flex-row",
      className
    )}
    {...props}
  />
)

export const LeftColumn = (props: ChildOnlyProp) => (
  <div
    className="max-w-full flex-none basis-1/2 lg:me-16 lg:max-w-[75%]"
    {...props}
  />
)

export const RightColumn = (props: ChildOnlyProp) => (
  <Flex
    className="mt-12 max-w-full flex-shrink flex-grow-0 basis-1/2 flex-col justify-center lg:mt-0 lg:max-w-[75%]"
    {...props}
  />
)

const SubtitleTwo = (props: ChildOnlyProp) => (
  <Text className="mb-8 leading-xs text-body-menu-medium" {...props} />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    className="flex-col-reverse items-center justify-between md:flex-row"
    {...props}
  />
)

const Hero = (props: ChildOnlyProp) => (
  <div
    className="ms-0 max-w-[800px] flex-1 basis-full bg-cover bg-no-repeat md:ms-8"
    {...props}
  />
)

const Header = (props: ChildOnlyProp) => (
  <div className="mt-6 min-w-[300px] flex-1 basis-1/2 md:mt-32" {...props} />
)

const H2 = (props: ChildOnlyProp) => (
  <h2 className="mb-8 mt-0 leading-xs" {...props} />
)

const H3 = (props: ChildOnlyProp) => (
  <h3 className="mb-8 mt-10 leading-xs" {...props} />
)

const H4 = (props: ChildOnlyProp) => (
  <h4 className="my-8 leading-xs" {...props} />
)

const CardContainer = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Flex className={cn("-mx-4 flex-wrap", className)} {...props} />
)

const TokenCard = (props: ComponentProps<typeof HorizontalCard>) => (
  <HorizontalCard
    className={cn("mx-0 my-2 min-w-full rounded-none", props.className)}
    emojiClassName="text-[5rem]"
    {...props}
  />
)
const TextDivider = () => (
  <div className="my-8 w-[10%] bg-search-background lg:items-start" />
)

const CentralColumn = (props: ChildOnlyProp) => (
  <VStack className="mx-auto my-16 max-w-[960px]" {...props} />
)

const CentralActionCard = (props: ComponentProps<typeof ActionCard>) => (
  <ActionCard className="my-8" imageWidth={260} {...props} />
)

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/eth")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const EthPage = () => {
  const { t } = useTranslation("page-eth")

  const tokens = [
    {
      emoji: ":scales:",
      title: t("page-eth-stablecoins"),
      description: t("page-eth-stablecoins-desc"),
    },
    {
      emoji: ":ballot_box_with_ballot:",
      title: t("page-eth-gov-tokens"),
      description: t("page-eth-gov-tokens-desc"),
    },
    {
      emoji: ":pile_of_poo:",
      title: t("page-eth-shit-coins"),
      description: t("page-eth-shit-coins-desc"),
    },
    {
      emoji: ":frame_with_picture:",
      title: t("page-eth-collectible-tokens"),
      description: t("page-eth-collectible-tokens-desc"),
    },
  ]

  const benefits = [
    {
      emoji: ":woman_technologist:",
      title: t("page-eth-yours"),
      description: <Translation id="page-eth:page-eth-yours-desc" />,
    },
    {
      emoji: ":shield:",
      title: t("page-eth-cryptography"),
      description: <Translation id="page-eth:page-eth-cryptography-desc" />,
    },
    {
      emoji: ":handshake:",
      title: t("page-eth-p2p-payments"),
      description: t("page-eth-p2p-payments-desc"),
    },
    {
      emoji: ":money_with_wings:",
      title: t("page-eth-no-centralized"),
      description: t("page-eth-no-centralized-desc"),
    },
    {
      emoji: ":signal_strength:",
      title: t("page-eth-open"),
      description: t("page-eth-open-desc"),
    },
    {
      emoji: ":shortcake:",
      title: t("page-eth-flexible-amounts"),
      description: t("page-eth-flexible-amounts-desc"),
    },
  ]

  const tokenLinks = [
    {
      link: "/stablecoins/",
      caption: "",
      title: t("page-eth-tokens-stablecoins"),
      description: t("page-eth-tokens-stablecoins-description"),
    },
    {
      link: "/defi/",
      caption: "",
      title: t("page-eth-tokens-defi"),
      description: t("page-eth-tokens-defi-description"),
    },
    {
      link: "/nft/",
      caption: "",
      title: t("page-eth-tokens-nft"),
      description: t("page-eth-tokens-nft-description"),
    },
    {
      link: "/dao/",
      caption: "",
      title: t("page-eth-tokens-dao"),
      description: t("page-eth-tokens-dao-description"),
    },
  ]

  const cardListContent = [
    {
      link: "https://medium.com/ethhub/why-ether-is-valuable-2b4e39e01eb3",
      title: t("page-eth-value"),
      description: "Anthony Sassano",
      caption: t("page-eth-last-updated"),
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={t("page-eth-whats-eth-meta-title")}
        description={t("page-eth-whats-eth-meta-desc")}
        image="/images/eth.png"
      />
      <Content>
        <HeroContainer>
          <Header>
            <Title>{t("page-eth-whats-eth")}</Title>
            <Slogan>{t("page-eth-currency-for-future")}</Slogan>
            <Subtitle>{t("page-eth-is-money")}</Subtitle>
            <SubtitleTwo>{t("page-eth-currency-for-apps")}</SubtitleTwo>
            <EthPriceCard className="mb-8" />
            <ButtonLink href="/get-eth/">
              {t("page-eth-button-buy-eth")}
            </ButtonLink>
          </Header>
          <Hero>
            <TwImage
              src={eth}
              // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
              sizes="(max-width: 768px) 100vw, 800px"
              alt={t("page-eth-whats-eth-hero-alt")}
              priority
            />
          </Hero>
        </HeroContainer>
      </Content>
      <GrayContainer>
        <Content>
          <Intro>
            <Text>{t("page-eth-description")} </Text>
          </Intro>
          <CardContainer className="mb-8">
            {benefits.map((benefits, idx) => (
              <StyledCard
                key={idx}
                emoji={benefits.emoji}
                title={benefits.title}
                description={benefits.description}
              />
            ))}
          </CardContainer>
          <InfoBanner emoji=":wave:" shouldCenter>
            <b>{t("page-eth-buy-some")}</b>{" "}
            <Translation id="page-eth:page-eth-buy-some-desc" />{" "}
            <InlineLink href="/what-is-ethereum/">
              {t("page-eth-more-on-ethereum-link")}
            </InlineLink>
            {t("page-eth-period")}
          </InfoBanner>
        </Content>
      </GrayContainer>
      <Content>
        <CentralColumn>
          <H2>{t("page-eth-whats-unique")}</H2>
          <Text>{t("page-eth-whats-unique-desc")}</Text>
          <EthVideo />
          <div>
            <H4>{t("page-eth-fuels")}</H4>
            <Text>{t("page-eth-fuels-desc")}</Text>
            <Text>{t("page-eth-fuels-desc-2")}</Text>
            <Text>
              <Translation id="page-eth:page-eth-fuels-desc-3" />{" "}
              <b>{t("page-eth-powers-ethereum")}</b>
              {t("page-eth-period")}
            </Text>
            <Text>
              {t("page-eth-fuels-staking")}{" "}
              <InlineLink href="/staking/">
                {t("page-eth-fuels-more-staking")}
              </InlineLink>
            </Text>
          </div>
          <CentralActionCard
            href="/what-is-ethereum/"
            title={t("page-eth-whats-ethereum")}
            description={t("page-eth-whats-ethereum-desc")}
            image={ethereum}
          />
          <TextDivider />
          <div>
            <H4>{t("page-eth-underpins")}</H4>
            <Text>
              <Translation id="page-eth:page-eth-underpins-desc" />
            </Text>
            <Text>{t("page-eth-underpins-desc-2")}</Text>
            <CentralActionCard
              href="/defi/"
              title={t("page-eth-whats-defi")}
              description={t("page-eth-whats-defi-description")}
              image={defi}
            />
            <InfoBanner isWarning>
              <Translation id="page-eth:page-eth-weth" />
            </InfoBanner>
          </div>
          <TextDivider />
          <div>
            <H4>{t("page-eth-uses")}</H4>
            <Text>{t("page-eth-uses-desc")}</Text>
            <Text>{t("page-eth-uses-desc-2")} </Text>
            <UnorderedList>
              <ListItem>
                <InlineLink href="https://sablier.com">
                  {t("page-eth-stream-link")}
                </InlineLink>{" "}
                – {t("page-eth-uses-desc-3")}
              </ListItem>
              <ListItem>
                <InlineLink href="/get-eth/#dex">
                  {t("page-eth-trade-link-2")}
                </InlineLink>{" "}
                – {t("page-eth-uses-desc-4")}
              </ListItem>
              <ListItem>
                <InlineLink href="https://app.compound.finance/">
                  {t("page-eth-earn-interest-link")}
                </InlineLink>{" "}
                – {t("page-eth-uses-desc-5")}
              </ListItem>
              <ListItem>
                <InlineLink href="/stablecoins/">
                  {t("page-eth-stablecoins-link")}
                </InlineLink>{" "}
                – {t("page-eth-uses-desc-6")}
              </ListItem>
            </UnorderedList>
          </div>
          <Divider />
        </CentralColumn>
        <CalloutBanner
          className="mx-0 my-20"
          titleKey={"page-eth:page-eth-where-to-buy"}
          descriptionKey={"page-eth:page-eth-where-to-buy-desc"}
          image={ethCat}
          alt={t("page-eth-cat-img-alt")}
          imageWidth={300}
        >
          <div>
            <ButtonLink href="/get-eth/">
              {t("page-eth-get-eth-btn")}
            </ButtonLink>
          </div>
        </CalloutBanner>
      </Content>

      <TwoColumnContent>
        <LeftColumn>
          <H3>{t("page-eth-has-value")}</H3>
          <Text>{t("page-eth-has-value-desc")}</Text>
          <Text>{t("page-eth-has-value-desc-2")}</Text>
          <Text>{t("page-eth-has-value-desc-3")}</Text>
          <Text>{t("page-eth-has-value-desc-4")}</Text>
          <Text>{t("page-eth-has-value-desc-5")}</Text>
        </LeftColumn>
        <RightColumn>
          <CardList items={cardListContent} />
        </RightColumn>
      </TwoColumnContent>
      <TwoColumnContent className="items-start" id="tokens">
        <LeftColumn>
          <H3>{t("page-eth-not-only-crypto")}</H3>
          <Text>{t("page-eth-not-only-crypto-desc")} </Text>
          <Text>{t("page-eth-not-only-crypto-desc-2")}</Text>
          <H4>{t("page-eth-more-on-tokens")}</H4>
          <CardList items={tokenLinks} />
        </LeftColumn>
        <RightColumn>
          <H3>{t("page-eth-popular-tokens")}</H3>
          {tokens.map((token, idx) => (
            <TokenCard
              key={idx}
              emoji={token.emoji}
              title={token.title}
              description={token.description}
            />
          ))}
        </RightColumn>
      </TwoColumnContent>
      <Content>
        <StandaloneQuizWidget quizKey="what-is-ether" />
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default EthPage
