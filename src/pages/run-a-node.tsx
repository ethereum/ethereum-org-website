import { HTMLAttributes } from "react"
import type { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import type { ReactNode } from "react"
import { FaDiscord } from "react-icons/fa"

import type { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import type { IconBaseType } from "@/components/icons/icon-base"
import {
  DecentralizationGlyphIcon,
  DownloadGlyphIcon,
  EarthGlyphIcon,
  HardwareGlyphIcon,
  MegaphoneGlyphIcon,
  PrivacyGlyphIcon,
  SovereigntyGlyphIcon,
  VoteGlyphIcon,
} from "@/components/icons/run-a-node"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageHero from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import { StandaloneQuizWidget as QuizWidget } from "@/components/Quiz/QuizWidget"
import Translation from "@/components/Translation"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Center, Flex, Stack, VStack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { InfoGrid } from "@/layouts/md/Staking"
import community from "@/public/images/enterprise-eth.png"
import hackathon from "@/public/images/hackathon_transparent.png"
import impact from "@/public/images/impact_transparent.png"
import Dappnode from "@/public/images/run-a-node/dappnode.svg"
import Dapptap from "@/public/images/run-a-node/dapptap.svg"
import ethereumInside from "@/public/images/run-a-node/ethereum-inside.png"
import Terminal from "@/public/images/run-a-node/terminal.svg"
import leslie from "@/public/images/upgrades/upgrade_rhino.png"

const GappedPage = (props: ChildOnlyProp) => (
  <MainArticle
    className="mx-auto my-0 flex w-full scroll-mt-[5.5rem] flex-col items-center gap-12 lg:gap-16"
    {...props}
  />
)

const GappedContent = (props: ChildOnlyProp) => (
  <Flex
    className="w-full flex-col gap-8 px-0 py-4 md:px-8 lg:gap-12 lg:px-16"
    {...props}
  />
)

const Content = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="w-full px-8 py-4" {...props} />
)

const TwoColumnContent = (props: ChildOnlyProp) => (
  <Flex
    className="mb-8 flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
    {...props}
  />
)

const SplitContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <VStack className={cn("w-full gap-8 md:flex-row", className)} {...props} />
)

const Column = (props: ChildOnlyProp) => <div className="flex-1" {...props} />

const SoftwareHighlight = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Center
    className={cn(
      "relative isolate !ml-0 w-full flex-col-reverse gap-8 rounded-sm border border-border-high-contrast p-8 pe-16 ps-16 text-body after:absolute after:inset-0 after:-z-10 after:bg-inherit after:blur-xl after:content-[''] md:mx-24 md:flex-row",
      className
    )}
    {...props}
  />
)

const ColumnFill = (props: ChildOnlyProp) => (
  <div className="flex-1 list-none" {...props} />
)

const ColumnNarrow = (props: ChildOnlyProp) => (
  <Flex
    className="inset-auto box-border items-center justify-center"
    {...props}
  />
)

const FlexContent = (props: ChildOnlyProp) => (
  <Flex className="w-full flex-col px-8 py-4" {...props} />
)

const FlexContainer = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Flex className={cn("flex-col gap-8 lg:flex-row", className)} {...props} />
)

const MarginFlex = (props: ChildOnlyProp) => (
  <FlexContainer className="my-12" {...props} />
)

const Container = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Flex
    className={cn(
      "rounded-md border border-border-high-contrast bg-background-highlight px-8 py-0 text-body",
      className
    )}
    {...props}
  />
)

const BuildBox = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Container
    className={cn("flex-1 flex-col bg-background-highlight p-8", className)}
    {...props}
  />
)

const BuildBoxSpace = (props: ChildOnlyProp) => (
  <BuildBox
    className="justify-between duration-100 hover:scale-[102%]"
    {...props}
  />
)

const FullyLoaded = (props: ChildOnlyProp) => (
  <Container
    className="flex-1 flex-col justify-between p-8 leading-loose duration-100 hover:scale-[102%]"
    {...props}
  />
)

const SvgTitle = (props: ChildOnlyProp) => (
  <Flex className="items-center gap-4" {...props} />
)

const ButtonContainer = (props: ChildOnlyProp) => (
  <Flex className="mt-auto flex-col gap-4 lg:flex-row" {...props} />
)

const BuildContainer = (props: ChildOnlyProp) => (
  <Container
    className="flex-col rounded-none border-none bg-inherit px-0 py-8 md:px-8"
    {...props}
  />
)

const StakingCalloutContainer = (props: ChildOnlyProp) => (
  <SplitContent className="bg-gradient-main p-8" {...props} />
)

const H2 = (props: ChildOnlyProp) => (
  <h2 className="mb-8 mt-12 leading-xs" {...props} />
)

const H3 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("mb-8 mt-10 leading-xs", className)} {...props} />
)

const H4 = (props: ChildOnlyProp) => (
  <h4 className="my-8 leading-xs" {...props} />
)

const Text = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <p className={cn("mb-6", className)} {...props} />
)

const Width60 = (props: ChildOnlyProp) => (
  <div className="w-full flex-[3]" {...props} />
)

const Width40 = (props: ChildOnlyProp) => (
  <Center className="w-full flex-[2]" {...props} />
)

type RunANodeCard = {
  image: IconBaseType
  title: string
  preview: ReactNode
  body: string[]
  alt: string
}

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/run-a-node")

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

const RunANodePage = () => {
  const { t } = useTranslation("page-run-a-node")
  const heroContent = {
    title: t("page-run-a-node-title"),
    header: <Translation id="page-run-a-node:page-run-a-node-hero-header" />,
    subtitle: t("page-run-a-node-hero-subtitle"),
    image: ethereumInside,
    alt: t("page-run-a-node-hero-alt"),
    buttons: [
      {
        content: t("page-run-a-node-hero-cta-1"),
        toId: "what-is-a-node",
        matomo: {
          eventCategory: "run a node hero buttons",
          eventAction: "click",
          eventName: "learn more",
        },
      },
    ],
  }

  const whyRunANodeCards: RunANodeCard[] = [
    {
      image: PrivacyGlyphIcon,
      title: t("page-run-a-node-privacy-title"),
      preview: t("page-run-a-node-privacy-preview"),
      body: [
        t("page-run-a-node-privacy-1"),
        t("page-run-a-node-privacy-2"),
        t("page-run-a-node-privacy-3"),
      ],
      alt: t("page-run-a-node-glyph-alt-privacy"),
    },
    {
      image: MegaphoneGlyphIcon,
      title: t("page-run-a-node-censorship-resistance-title"),
      preview: t("page-run-a-node-censorship-resistance-preview"),
      body: [
        t("page-run-a-node-censorship-resistance-1"),
        t("page-run-a-node-censorship-resistance-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-censorship-resistance"),
    },
    {
      image: EarthGlyphIcon,
      title: t("page-run-a-node-participate-title"),
      preview: (
        <Translation id="page-run-a-node:page-run-a-node-participate-preview" />
      ),
      body: [
        t("page-run-a-node-participate-1"),
        t("page-run-a-node-participate-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-earth"),
    },
    {
      image: DecentralizationGlyphIcon,
      title: t("page-run-a-node-decentralized-title"),
      preview: t("page-run-a-node-decentralized-preview"),
      body: [
        t("page-run-a-node-decentralized-1"),
        t("page-run-a-node-decentralized-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-decentralization"),
    },
    {
      image: VoteGlyphIcon,
      title: t("page-run-a-node-voice-your-choice-title"),
      preview: t("page-run-a-node-voice-your-choice-preview"),
      body: [
        t("page-run-a-node-voice-your-choice-1"),
        t("page-run-a-node-voice-your-choice-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-vote"),
    },
    {
      image: SovereigntyGlyphIcon,
      title: t("page-run-a-node-sovereignty-title"),
      preview: t("page-run-a-node-sovereignty-preview"),
      body: [
        t("page-run-a-node-sovereignty-1"),
        t("page-run-a-node-sovereignty-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-sovereignty"),
    },
  ]

  return (
    <GappedPage>
      <PageMetadata
        title={t("page-run-a-node-meta-title")}
        description={t("page-run-a-node-meta-description")}
        image="/images/run-a-node/ethereum-inside.png"
      />
      <div className="w-full bg-gradient-to-br from-accent-b/5 via-primary/10 to-accent-b/15 dark:from-accent-b/20 dark:via-primary/15 dark:to-accent-a/20">
        <div className="pb-8">
          <PageHero content={heroContent} isReverse />
        </div>
      </div>

      <Content id="what-is-a-node">
        <TwoColumnContent>
          <Width60>
            <H2>
              <Translation id="page-run-a-node:page-run-a-node-what-title" />
            </H2>
            <H3>{t("page-run-a-node-what-1-subtitle")}</H3>
            <Text>{t("page-run-a-node-what-1-text")}</Text>
            <H3>{t("page-run-a-node-what-2-subtitle")}</H3>
            <Text>{t("page-run-a-node-what-2-text")}</Text>
            <H3>{t("page-run-a-node-what-3-subtitle")}</H3>
            <Text>{t("page-run-a-node-what-3-text")}</Text>
          </Width60>
          <Width40>
            <TwImage
              src={hackathon}
              alt=""
              sizes="624px"
              style={{ width: "624px", height: "auto" }}
            />
          </Width40>
        </TwoColumnContent>
      </Content>

      <FlexContent>
        <VStack
          className={cn(
            "relative mb-0 w-full gap-0 self-center rounded-sm border p-6 md:mb-4 md:w-[90%]",
            "bg-gradient-to-br from-blue-500/20 from-10% to-pink-600/20 to-90%"
          )}
        >
          <Stack className="flex-col items-center justify-between gap-8 md:flex-row md:gap-12">
            <TwImage
              src={impact}
              alt=""
              sizes="300px"
              style={{ width: "300px", height: "auto" }}
            />
            <div className="me-4">
              <h2 className="mb-5 mt-4 text-2xl font-semibold leading-[1.4] md:text-[2rem]">
                <Translation id="page-run-a-node:page-run-a-node-who-title" />
              </h2>
              <p className="body-medium mb-0">
                <Translation id="page-run-a-node:page-run-a-node-who-preview" />
              </p>
            </div>
          </Stack>
          <div className="mt-8 border-t pt-6">
            <p className="mb-6">
              <Translation id="page-run-a-node:page-run-a-node-who-copy-1" />
            </p>
            <p className="mb-6">{t("page-run-a-node-who-copy-2")}</p>
            <p className="mb-6">{t("page-run-a-node-who-copy-3")}</p>
            <p className="mb-6 text-[150%] font-semibold leading-none">
              {t("page-run-a-node-who-copy-bold")}
            </p>
          </div>
        </VStack>
      </FlexContent>

      <Content>
        <H2>
          <Translation id="page-run-a-node:page-run-a-node-why-title" />
        </H2>
        <InfoGrid>
          {whyRunANodeCards.map(({ image, title, preview, body, alt }) => (
            <ExpandableCard
              contentPreview={preview}
              title={title}
              // TODO: make a11y svgs (using <title>)
              // @ts-expect-error alt does not exist as a valid prop
              alt={alt}
              svg={image}
              key={title}
            >
              {body.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </ExpandableCard>
          ))}
        </InfoGrid>
      </Content>

      <Divider />

      <Content id="getting-started">
        <H2>{t("page-run-a-node-getting-started-title")}</H2>
        <GappedContent>
          <SoftwareHighlight className="bg-[#ccfcff] dark:bg-[#293233]">
            <ColumnFill>
              <Text>
                {t("page-run-a-node-getting-started-software-section-1")}
              </Text>
              <Text>
                <code>
                  <Emoji text=":warning:" className="me-4 text-md" />
                  {t(
                    "page-run-a-node-getting-started-software-section-1-alert"
                  )}
                </code>
              </Text>
              <InlineLink href="/developers/docs/nodes-and-clients/run-a-node/">
                {t("page-run-a-node-getting-started-software-section-1-link")}
              </InlineLink>
            </ColumnFill>
            <ColumnNarrow>
              <Terminal
                // TODO: make a11y svgs (using <title>)
                // @ts-expect-error alt does not exist as a valid prop
                alt={t("page-run-a-node-glyph-alt-terminal")}
              />
            </ColumnNarrow>
          </SoftwareHighlight>

          <SoftwareHighlight className="flex-col bg-[#FFE3D3] dark:bg-[#332821]">
            <ColumnNarrow>
              <Dappnode
                // TODO: make a11y svgs (using <title>)
                // @ts-expect-error alt does not exist as a valid prop
                alt={t("page-run-a-node-glyph-alt-dappnode")}
              />
            </ColumnNarrow>
            <ColumnFill>
              <Text>
                <Translation id="page-run-a-node:page-run-a-node-getting-started-software-section-2" />
              </Text>
            </ColumnFill>
          </SoftwareHighlight>

          <SoftwareHighlight className="bg-[#E8E8FF] dark:bg-[#212132]">
            <ColumnFill>
              <Text>
                {t("page-run-a-node-getting-started-software-section-3a")}
              </Text>
              <Text>
                <Translation id="page-run-a-node:page-run-a-node-getting-started-software-section-3b" />
              </Text>
            </ColumnFill>
            <ColumnNarrow>
              <Dapptap
                // TODO: make a11y svgs (using <title>)
                // @ts-expect-error alt does not exist as a valid prop
                alt={t("page-run-a-node-glyph-alt-phone")}
              />
            </ColumnNarrow>
          </SoftwareHighlight>
        </GappedContent>
      </Content>

      <Content>
        <H2>{t("page-run-a-node-choose-your-adventure-title")}</H2>
        <Text>{t("page-run-a-node-choose-your-adventure-1")}</Text>
        <Text>{t("page-run-a-node-choose-your-adventure-2")}</Text>
        <MarginFlex>
          <FullyLoaded>
            <div>
              <H3>
                <Emoji text=":shopping_cart:" className="me-4 text-[2rem]" />
                {t("page-run-a-node-buy-fully-loaded-title")}
              </H3>
              <Text>{t("page-run-a-node-buy-fully-loaded-description")}</Text>
              <ul>
                <li>{t("page-run-a-node-buy-fully-loaded-note-1")}</li>
                <li>{t("page-run-a-node-buy-fully-loaded-note-2")}</li>
                <li className="mb-0 font-bold">
                  <code>{t("page-run-a-node-buy-fully-loaded-note-3")}</code>
                </li>
              </ul>
            </div>
            <ButtonContainer>
              <ButtonLink href="https://shop.dappnode.io/">
                {t("page-run-a-node-shop-dappnode")}
              </ButtonLink>
              <ButtonLink href="https://ava.do/">
                {t("page-run-a-node-shop-avado")}
              </ButtonLink>
            </ButtonContainer>
          </FullyLoaded>

          <FullyLoaded>
            <div>
              <H3>
                <Emoji
                  text=":building_construction:"
                  className="me-4 text-[2rem]"
                />
                {t("page-run-a-node-build-your-own-title")}
              </H3>
              <Text>{t("page-run-a-node-choose-your-adventure-build-1")}</Text>
              <ul>
                <li>
                  {t("page-run-a-node-choose-your-adventure-build-bullet-1")}
                </li>
                <li>
                  {t("page-run-a-node-choose-your-adventure-build-bullet-2")}
                </li>
                <li className="mb-0">
                  {t("page-run-a-node-choose-your-adventure-build-bullet-3")}
                </li>
              </ul>
            </div>
            <Button variant="outline" toId="build-your-own">
              {t("page-run-a-node-choose-your-adventure-build-start")}
            </Button>
          </FullyLoaded>
        </MarginFlex>
      </Content>

      <Content id="build-your-own">
        <H2>{t("page-run-a-node-build-your-own-title")}</H2>

        <BuildContainer>
          <SvgTitle>
            <HardwareGlyphIcon
              // TODO: make a11y svgs (using <title>)
              // @ts-expect-error alt does not exist as a valid prop
              alt={t("page-run-a-node-glyph-alt-hardware")}
            />
            <H3>{t("page-run-a-node-build-your-own-hardware-title")}</H3>
          </SvgTitle>

          <FlexContainer>
            <BuildBox>
              <H4>{t("page-run-a-node-build-your-own-minimum-specs")}</H4>
              <ul>
                <li>
                  <Text>{t("page-run-a-node-build-your-own-min-ram")}</Text>
                  <Text>
                    <InlineLink href="#plan-on-staking">
                      {t("page-run-a-node-build-your-own-ram-note-1")}
                    </InlineLink>
                  </Text>
                  <Text>
                    <InlineLink href="#rasp-pi">
                      {t("page-run-a-node-build-your-own-ram-note-2")}
                    </InlineLink>
                  </Text>
                </li>
                <li className="mb-0">
                  <Text>{t("page-run-a-node-build-your-own-min-ssd")}</Text>
                  <Text>
                    <small>
                      <em className="mb-8">
                        {t("page-run-a-node-build-your-own-ssd-note")}
                      </em>
                    </small>
                  </Text>
                </li>
              </ul>
            </BuildBox>

            <BuildBox>
              <H4>{t("page-run-a-node-build-your-own-recommended")}</H4>
              <ul>
                <li>
                  {t("page-run-a-node-build-your-own-nuc")}
                  <Text>
                    <small>
                      {t("page-run-a-node-build-your-own-nuc-small")}
                    </small>
                  </Text>
                </li>
                <li>
                  {t("page-run-a-node-build-your-own-connection")}
                  <Text>
                    <small>
                      {t("page-run-a-node-build-your-own-connection-small")}
                    </small>
                  </Text>
                </li>
                <li className="mb-0">
                  {t("page-run-a-node-build-your-own-peripherals")}
                  <Text>
                    <small className="mb-8">
                      {t("page-run-a-node-build-your-own-peripherals-small")}
                    </small>
                  </Text>
                </li>
              </ul>
            </BuildBox>
          </FlexContainer>
        </BuildContainer>

        <BuildContainer>
          <SvgTitle>
            <DownloadGlyphIcon
              // TODO: make a11y svgs (using <title>)
              // @ts-expect-error alt does not exist as a valid prop
              alt={t("page-run-a-node-glyph-alt-software")}
            />
            <H3>{t("page-run-a-node-build-your-own-software")}</H3>
          </SvgTitle>

          <FlexContainer>
            <BuildBoxSpace>
              <div>
                <H4>
                  {t("page-run-a-node-build-your-own-software-option-1-title")}
                </H4>
                <Text>
                  {t(
                    "page-run-a-node-build-your-own-software-option-1-description"
                  )}
                </Text>
              </div>
              <ButtonContainer>
                <ButtonLink href="https://docs.dappnode.io">
                  {t("page-run-a-node-build-your-own-software-option-1-button")}
                </ButtonLink>
              </ButtonContainer>
            </BuildBoxSpace>

            <BuildBoxSpace>
              <div>
                <H4>
                  {t("page-run-a-node-build-your-own-software-option-2-title")}
                </H4>
                <Text>
                  {t(
                    "page-run-a-node-build-your-own-software-option-2-description-1"
                  )}
                </Text>
                <Text>
                  {t(
                    "page-run-a-node-build-your-own-software-option-2-description-2"
                  )}
                </Text>
              </div>
              <ButtonContainer>
                <ButtonLink
                  href="/developers/docs/nodes-and-clients/run-a-node/#spinning-up-node"
                  variant="outline"
                >
                  <code>
                    {t(
                      "page-run-a-node-build-your-own-software-option-2-button"
                    )}
                  </code>
                </ButtonLink>
              </ButtonContainer>
            </BuildBoxSpace>
          </FlexContainer>
        </BuildContainer>
      </Content>

      <Content>
        <SplitContent className="flex-col-reverse md:flex-row">
          <Column>
            <H2>{t("page-run-a-node-community-title")}</H2>
            <Text>{t("page-run-a-node-community-description-1")}</Text>
            <Text>{t("page-run-a-node-community-description-2")}</Text>
            <ButtonContainer>
              <ButtonLink href="https://discord.com/invite/dappnode">
                <FaDiscord />
                {t("page-run-a-node-community-link-1")}
              </ButtonLink>
              <ButtonLink
                href="/community/online/"
                variant="outline"
                isSecondary
              >
                {t("page-run-a-node-community-link-2")}
              </ButtonLink>
            </ButtonContainer>
          </Column>
          <Column>
            <TwImage
              src={community}
              alt=""
              sizes="624px"
              style={{ width: "624px", height: "auto" }}
            />
          </Column>
        </SplitContent>
      </Content>

      <Content>
        <H2>{t("page-run-a-node-further-reading-title")}</H2>
        <ul>
          <li>
            <InlineLink href="https://github.com/ethereumbook/ethereumbook/blob/develop/03clients.asciidoc#should-i-run-a-full-node">
              {t("page-run-a-node-further-reading-1-link")}
            </InlineLink>{" "}
            - <i>{t("page-run-a-node-further-reading-1-author")}</i>
          </li>
          <li>
            <InlineLink href="https://ethereum-on-arm-documentation.readthedocs.io/en/latest/">
              {t("page-run-a-node-further-reading-2-link")}
            </InlineLink>
          </li>
          <li>
            <InlineLink href="https://vitalik.eth.limo/general/2021/05/23/scaling.html">
              {t("page-run-a-node-further-reading-3-link")}
            </InlineLink>{" "}
            - <i>{t("page-run-a-node-further-reading-3-author")}</i>
          </li>
        </ul>
      </Content>

      <Divider />

      <StakingCalloutContainer>
        <Column>
          <TwImage
            className="-translate-y-12 -scale-x-100 transform lg:-translate-x-8 lg:translate-y-0 lg:scale-[115%] lg:-scale-x-[115%]"
            src={leslie}
            alt=""
            sizes="624px"
            style={{ width: "624px", height: "auto" }}
          />
        </Column>
        <Column>
          <H2>{t("page-run-a-node-staking-title")}</H2>
          <Text>{t("page-run-a-node-staking-description")}</Text>
          <ButtonContainer>
            <ButtonLink href="/staking/">
              {t("page-run-a-node-staking-link")}
            </ButtonLink>
          </ButtonContainer>
        </Column>
      </StakingCalloutContainer>
      <Content>
        <H3 id="plan-on-staking" className="flex items-center">
          <Emoji text=":cut_of_meat:" className="me-4 text-[2rem]" />
          {t("page-run-a-node-staking-plans-title")}
        </H3>
        <Text>
          <Translation id="page-run-a-node:page-run-a-node-staking-plans-description" />
        </Text>
        <Text>
          {t("page-run-a-node-staking-plans-ethstaker-link-description")} -{" "}
          <InlineLink href="https://youtu.be/C2wwu1IlhDc">
            {t("page-run-a-node-staking-plans-ethstaker-link-label")}
          </InlineLink>
        </Text>
        <H3 id="rasp-pi" className="flex items-center">
          <Emoji text=":pie:" className="me-4 text-[2rem]" />
          {t("page-run-a-node-rasp-pi-title")}
        </H3>
        <Text>{t("page-run-a-node-rasp-pi-description")}</Text>
        <ul>
          <li>
            <InlineLink href="https://ethereum-on-arm-documentation.readthedocs.io/en/latest">
              {t("page-run-a-node-rasp-pi-note-2-link")}
            </InlineLink>{" "}
            - <i>{t("page-run-a-node-rasp-pi-note-2-description")}</i>
          </li>
          <li>
            <InlineLink href="/developers/tutorials/run-node-raspberry-pi">
              {t("page-run-a-node-rasp-pi-note-3-link")}
            </InlineLink>{" "}
            - <i>{t("page-run-a-node-rasp-pi-note-3-description")}</i>
          </li>
        </ul>
      </Content>
      <Content>
        <QuizWidget quizKey="run-a-node" />
        <FeedbackCard />
      </Content>
    </GappedPage>
  )
}

export default RunANodePage
