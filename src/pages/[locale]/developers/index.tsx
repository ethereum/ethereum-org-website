import { HTMLAttributes, ReactNode } from "react"
import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import Callout from "@/components/Callout"
import Card, { CardProps } from "@/components/Card"
import FeedbackCard from "@/components/FeedbackCard"
import Heading from "@/components/Heading"
import HubHero from "@/components/Hero/HubHero"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex, Stack, VStack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import SpeedRunEthereumImage from "@/public/images/dev-tools/speed-run-ethereum-banner.png"
import DevelopersImage from "@/public/images/developers-eth-blocks.png"
import DogeImage from "@/public/images/doge-computer.png"
import HeroImage from "@/public/images/heroes/developers-hub-hero.jpg"

const Page = (props: ChildOnlyProp) => (
  <VStack className="mx-auto my-0 w-full" {...props} />
)

const GrayContainer = (props: ChildOnlyProp) => (
  <div
    className="mt-8 w-full border-t bg-background-highlight px-0 py-16 shadow-table-item-box"
    {...props}
  />
)

const Content = (props: ChildOnlyProp) => (
  <MainArticle className="w-full px-8 py-4" {...props} />
)

const Subtitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <p className={cn("leading-xs text-body-medium", className)} {...props} />
)

const MonoSubtitle = (props: ChildOnlyProp) => (
  <h2 className="mb-0 mt-12" {...props} />
)

const H2 = (props: ChildOnlyProp) => <h2 className="mb-8 mt-12" {...props} />

const H3 = (props: ChildOnlyProp) => <h3 className="mb-8 mt-10" {...props} />

const Text = (props: ChildOnlyProp) => <p className="mb-6" {...props} />

const StyledCardContainer = (props: ChildOnlyProp) => (
  <div
    className="-mx-4 mb-12 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    {...props}
  />
)

const TwoColumnContent = (props: ChildOnlyProp) => (
  <Flex
    className="w-full flex-col items-start justify-between lg:flex-row lg:items-center"
    {...props}
  />
)

const ThreeColumnContent = (props: ChildOnlyProp) => (
  <Flex
    className="flex-col items-start justify-between px-8 py-0 lg:flex-row"
    {...props}
  />
)

const Column = (props: ChildOnlyProp) => (
  <div className="mb-6 me-8 w-full flex-1 basis-1/3" {...props} />
)
const RightColumn = (props: ChildOnlyProp) => (
  <div className="mb-6 me-0 w-full flex-1 basis-1/3" {...props} />
)
const IntroColumn = (props: ChildOnlyProp) => (
  <div
    className="mb-6 me-0 mt-0 w-full flex-1 basis-1/3 sm:me-8 lg:mt-32"
    {...props}
  />
)

const StyledCard = (props: CardProps) => {
  return (
    <Card
      className={`m-4 p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.1)] transition-transform duration-100 hover:scale-105 hover:rounded hover:bg-background-highlight hover:shadow-[0px_8px_17px_rgba(0,0,0,0.15)] dark:shadow-[0px_1px_3px_rgba(60,60,60,0.1)]`}
      {...props}
    />
  )
}

const SpeedRunEthereumBanner = ({
  title,
  linkLabel,
}: {
  title: string
  linkLabel: string
}) => (
  <div className="relative xl:mb-12">
    <TwImage
      className="h-[450px] xl:h-auto"
      src={SpeedRunEthereumImage}
      alt="SpeedRunEthereum banner"
      sizes="100vw"
      style={{ width: "100vw", objectFit: "cover", objectPosition: "20%" }}
    />
    <Stack className="absolute top-0 max-w-lg items-start space-y-3 break-words p-6 md:top-12 md:ms-8 md:space-y-4 lg:p-8 xl:max-w-xl">
      <Heading>{title}</Heading>
      <ButtonLink href="https://speedrunethereum.com/">{linkLabel}</ButtonLink>
    </Stack>
  </div>
)

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/developers")

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

interface IDevelopersPath {
  emoji: string
  title: ReactNode
  description: ReactNode
  url: string
  button: ReactNode
}

const paths: Array<IDevelopersPath> = [
  {
    emoji: ":woman_student:",
    title: <Translation id="page-developers-index:page-developers-learn" />,
    description: (
      <Translation id="page-developers-index:page-developers-learn-desc" />
    ),
    url: "/developers/docs/",
    button: (
      <Translation id="page-developers-index:page-developers-read-docs" />
    ),
  },
  {
    emoji: ":woman_teacher:",
    title: (
      <Translation id="page-developers-index:page-developers-learn-tutorials" />
    ),
    description: (
      <Translation id="page-developers-index:page-developers-learn-tutorials-desc" />
    ),
    url: "/developers/tutorials/",
    button: (
      <Translation id="page-developers-index:page-developers-learn-tutorials-cta" />
    ),
  },
  {
    emoji: ":woman_scientist:",
    title: <Translation id="page-developers-index:page-developers-start" />,
    description: (
      <Translation id="page-developers-index:page-developers-start-desc" />
    ),
    url: "/developers/learning-tools/",
    button: (
      <Translation id="page-developers-index:page-developers-play-code" />
    ),
  },
  {
    emoji: ":construction_worker:",
    title: <Translation id="page-developers-index:page-developers-set-up" />,
    description: (
      <Translation id="page-developers-index:page-developers-setup-desc" />
    ),
    url: "/developers/local-environment/",
    button: (
      <Translation id="page-developers-index:page-developers-choose-stack" />
    ),
  },
]

const DevelopersPage = () => {
  const { t } = useTranslation("page-developers-index")

  return (
    <Page>
      <PageMetadata
        title={t("page-developers-index:page-developer-meta-title")}
        description={t("page-developers-index:page-developers-meta-desc")}
      />
      <HubHero
        heroImg={HeroImage}
        header={`${t("page-developers-index:page-developers-title-1")} ${t(
          "page-developers-index:page-developers-title-2"
        )} ${t("page-developers-index:page-developers-title-3")}`}
        title={t("common:developers")}
        description={t("page-developers-index:page-developers-subtitle")}
      />
      <Content>
        <MonoSubtitle>
          <Translation id="page-developers-index:page-developers-get-started" />
        </MonoSubtitle>
        <StyledCardContainer>
          {paths.map((path, idx) => (
            <StyledCard
              key={idx}
              emoji={path.emoji}
              title={path.title}
              description={path.description}
            >
              <ButtonLink href={path.url}>{path.button}</ButtonLink>
            </StyledCard>
          ))}
        </StyledCardContainer>
        <SpeedRunEthereumBanner
          title={t(
            "page-developers-index:page-developers-speedrunethereum-title"
          )}
          linkLabel={t(
            "page-developers-index:page-developers-speedrunethereum-link"
          )}
        />
        <TwoColumnContent>
          <IntroColumn>
            <H2>
              <Translation id="page-developers-index:page-developers-about" />
            </H2>
            <Subtitle className="mb-6">
              <Translation id="page-developers-index:page-developers-about-desc" />
            </Subtitle>
            <Text>
              <Translation id="page-developers-index:page-developers-about-desc-2" />
            </Text>
            <Text>
              <Translation id="page-developers-index:page-developers-feedback" />{" "}
              <InlineLink href="https://discord.gg/ethereum-org">
                <Translation id="page-developers-index:page-developers-discord" />
              </InlineLink>
            </Text>
          </IntroColumn>
          <Callout
            className="flex-auto md:flex-[1_1_416px]"
            image={DevelopersImage}
            titleKey="page-developers-index:page-developers-improve-ethereum"
            descriptionKey="page-developers-index:page-developers-improve-ethereum-desc"
            alt={t("page-developers-index:alt-eth-blocks")}
          >
            <div>
              <ButtonLink href="https://github.com/ethereum/ethereum-org-website">
                <Translation id="page-developers-index:page-developers-contribute" />
              </ButtonLink>
            </div>
          </Callout>
        </TwoColumnContent>
      </Content>
      <GrayContainer>
        <Content>
          <H2>
            <Translation id="page-developers-index:page-developers-explore-documentation" />
          </H2>
        </Content>

        <ThreeColumnContent>
          <Column>
            <H3>
              <Translation id="page-developers-index:page-developers-docs-introductions" />
            </H3>
            <InlineLink href="/developers/docs/intro-to-ethereum/">
              <Translation id="page-developers-index:page-developers-intro-eth-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-into-eth-desc" />
            </Text>

            <InlineLink href="/developers/docs/intro-to-ether/">
              <Translation id="page-developers-index:page-developers-intro-ether-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-intro-ether-desc" />
            </Text>

            <InlineLink href="/developers/docs/dapps/">
              <Translation id="page-developers-index:page-developers-intro-dapps-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-intro-dapps-desc" />
            </Text>

            <InlineLink href="/developers/docs/ethereum-stack/">
              <Translation id="page-developers-index:page-developers-intro-stack" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-intro-stack-desc" />
            </Text>

            <InlineLink href="/developers/docs/web2-vs-web3/">
              <Translation id="page-developers-index:page-developers-web3-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-web3-desc" />
            </Text>

            <InlineLink href="/developers/docs/programming-languages/">
              <Translation id="page-developers-index:page-developers-languages" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-language-desc" />
            </Text>
            <TwImage
              className="mt-16 hidden max-w-[400px] lg:block"
              src={DogeImage}
              alt={t("page-assets-doge")}
            />
          </Column>
          <Column>
            <H3>
              <Translation id="page-developers-index:page-developers-fundamentals" />
            </H3>
            <InlineLink href="/developers/docs/accounts/">
              <Translation id="page-developers-index:page-developers-accounts-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-account-desc" />
            </Text>

            <InlineLink href="/developers/docs/transactions/">
              <Translation id="page-developers-index:page-developers-transactions-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-transactions-desc" />
            </Text>

            <InlineLink href="/developers/docs/blocks/">
              <Translation id="page-developers-index:page-developers-blocks-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-block-desc" />
            </Text>

            <InlineLink href="/developers/docs/evm/">
              <Translation id="page-developers-index:page-developers-evm-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-evm-desc" />
            </Text>

            <InlineLink href="/developers/docs/gas/">
              <Translation id="page-developers-index:page-developers-gas-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-gas-desc" />
            </Text>

            <InlineLink href="/developers/docs/nodes-and-clients/">
              <Translation id="page-developers-index:page-developers-node-clients-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-node-clients-desc" />
            </Text>

            <InlineLink href="/developers/docs/networks/">
              <Translation id="page-developers-index:page-developers-networks-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-networks-desc" />
            </Text>

            <InlineLink href="/developers/docs/consensus-mechanisms/pow/mining/">
              <Translation id="page-developers-index:page-developers-mining-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-mining-desc" />
            </Text>

            <InlineLink href="/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/">
              <Translation id="page-developers-index:page-developers-mining-algorithms-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-mining-algorithms-desc" />
            </Text>
          </Column>
          <RightColumn>
            <H3>
              <Translation id="page-developers-index:page-developers-stack" />
            </H3>
            <InlineLink href="/developers/docs/smart-contracts/">
              <Translation id="page-developers-index:page-developers-smart-contracts-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-smart-contracts-desc" />
            </Text>
            <InlineLink href="/developers/docs/frameworks/">
              <Translation id="page-developers-index:page-developers-frameworks-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-frameworks-desc" />
            </Text>
            <InlineLink href="/developers/docs/apis/javascript/">
              <Translation id="page-developers-index:page-developers-js-libraries-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-js-libraries-desc" />
            </Text>
            <InlineLink href="/developers/docs/apis/backend/">
              <Translation id="page-developers-index:page-developers-api-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-api-desc" />
            </Text>
            <InlineLink href="/developers/docs/data-and-analytics/block-explorers/">
              <Translation id="page-developers-index:page-developers-block-explorers-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-block-explorers-desc" />
            </Text>
            <InlineLink href="/developers/docs/smart-contracts/security/">
              <Translation id="page-developers-index:page-developers-smart-contract-security-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-smart-contract-security-desc" />
            </Text>
            <InlineLink href="/developers/docs/storage/">
              <Translation id="page-developers-index:page-developers-storage-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-storage-desc" />
            </Text>
            <InlineLink href="/developers/docs/ides/">
              <Translation id="page-developers-index:page-developers-dev-env-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-dev-env-desc" />
            </Text>
            <H3>
              <Translation id="page-developers-index:page-developers-advanced" />
            </H3>
            <InlineLink href="/developers/docs/standards/tokens/">
              <Translation id="page-developers-index:page-developers-token-standards-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-token-standards-desc" />
            </Text>
            <InlineLink href="/developers/docs/mev/">
              <Translation id="page-developers-index:page-developers-mev-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-mev-desc" />
            </Text>
            <InlineLink href="/developers/docs/oracles/">
              <Translation id="page-developers-index:page-developers-oracles-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-oracle-desc" />
            </Text>
            <InlineLink href="/developers/docs/scaling/">
              <Translation id="page-developers-index:page-developers-scaling-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-scaling-desc" />
            </Text>
            <InlineLink href="/developers/docs/networking-layer/">
              <Translation id="page-developers-index:page-developers-networking-layer-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-networking-layer-desc" />
            </Text>
            <InlineLink href="/developers/docs/data-structures-and-encoding/">
              <Translation id="page-developers-index:page-developers-data-structures-and-encoding-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-data-structures-and-encoding-desc" />
            </Text>
          </RightColumn>
        </ThreeColumnContent>
      </GrayContainer>
      <FeedbackCard />
    </Page>
  )
}

export default DevelopersPage
