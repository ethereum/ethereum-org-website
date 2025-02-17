import { BaseHTMLAttributes, ComponentPropsWithRef } from "react"
import { GetStaticProps } from "next/types"

import { BasePageProps, Lang, Params } from "@/lib/types"

import Callout from "@/components/Callout"
import Card from "@/components/Card"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import GhostCard from "@/components/GhostCard"
import HorizontalCard from "@/components/HorizontalCard"
import { Image } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import MainArticle from "@/components/MainArticle"
import PageHero from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Flex, FlexProps } from "@/components/ui/flex"
import InlineLink, { BaseLink } from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { useTranslation } from "@/hooks/useTranslation"
import loadNamespaces from "@/i18n/loadNamespaces"
// Static assets
import dogeComputerImg from "@/public/images/doge-computer.png"
import ethImg from "@/public/images/eth.png"
import infrastructureTransparentImg from "@/public/images/infrastructure_transparent.png"
import walletImg from "@/public/images/wallet.png"
import whatIsEthereumImg from "@/public/images/what-is-ethereum.png"

const Content = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLDivElement>) => (
  <div className={cn("w-full px-8", className)} {...props} />
)

const Page = ({ className, ...props }: FlexProps) => (
  <Flex
    asChild
    className={cn("mx-auto my-0 w-full flex-col items-center", className)}
  >
    <MainArticle {...props} />
  </Flex>
)

export const StyledCard = (props: ComponentPropsWithRef<typeof Card>) => (
  <Card
    className="min-w-[280px] max-w-full flex-[1_0_30%] p-6 md:max-w-[46%]"
    {...props}
  />
)

const H2 = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("mb-8 mt-12 text-2xl md:text-3xl", className)} {...props} />
)

const H3 = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("mb-8 mt-10 text-xl md:text-2xl", className)} {...props} />
)

export async function getStaticPaths() {
  return {
    paths: LOCALES_CODES.map((locale) => ({ params: { locale } })),
    fallback: false,
  }
}

export const getStaticProps = (async ({ params }) => {
  const { locale = DEFAULT_LOCALE } = params || {}

  const requiredNamespaces = getRequiredNamespacesForPage("/gas")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const messages = await loadNamespaces(locale, requiredNamespaces)

  return {
    props: {
      messages,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps, Params>

const GasPage = () => {
  const { t } = useTranslation("page-gas")

  const benefits = [
    {
      emoji: "🪪",
      description: (
        <Translation id="page-gas:page-gas-benefits-1-description" />
      ),
    },
    {
      emoji: ":money_with_wings:",
      description: t("page-gas-benefits-2-description"),
    },
    {
      emoji: ":hourglass_flowing_sand:",
      description: t("page-gas-benefits-3-description"),
    },
  ]

  const heroContent = {
    title: t("page-gas-hero-title"),
    header: t("page-gas-hero-header"),
    image: infrastructureTransparentImg,
    alt: "Hero header image",
    buttons: [
      {
        content: t("page-gas-hero-button-1-content"),
        toId: "what-is-gas",
        matomo: {
          eventCategory: "gas hero buttons",
          eventAction: "click",
          eventName: "what is gas",
        },
      },
    ],
  }

  return (
    <Page>
      <PageMetadata
        title={t("page-gas-meta-title")}
        description={t("page-gas-meta-description")}
      />
      <div className="w-full bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20">
        <div className="pb-8">
          <PageHero
            content={{
              subtitle: (
                <>
                  {t("page-gas-hero-subtitle-1")}
                  <br />
                  {t("page-gas-hero-subtitle-2")}
                </>
              ),
              ...heroContent,
            }}
          />
        </div>
      </div>
      <Content className="mb-16 mt-16 lg:mb-32">
        <Flex className="w-full flex-col items-center lg:flex-row lg:items-start">
          <div className="me-auto w-full flex-[60%] lg:me-2">
            <InfoBanner className="mb-8" title={t("page-gas-summary-title")}>
              <UnorderedList>
                <ListItem>{t("page-gas-summary-item-1")}</ListItem>
                <ListItem>{t("page-gas-summary-item-2")}</ListItem>
                <ListItem>{t("page-gas-summary-item-3")}</ListItem>
              </UnorderedList>
            </InfoBanner>
            <H2 className="mt-0" id="what-is-gas">
              {t("page-gas-what-are-gas-fees-header")}
            </H2>
            <p className="mb-6">{t("page-gas-what-are-gas-fees-text-1")}</p>
            <p className="mb-6">
              <Translation id="page-gas:page-gas-what-are-gas-fees-text-2" />
            </p>
          </div>

          <div className="hidden max-h-[450px] flex-[50%] justify-center lg:flex">
            <Image src={walletImg} alt="A robot" className="object-contain" />
          </div>
        </Flex>
      </Content>
      <Content className="mb-16 lg:mb-32">
        <Flex className="w-full flex-col items-center justify-center lg:flex-row">
          <div className="w-full">
            <H2 className="mt-0">
              {t("page-gas-how-do-i-pay-less-gas-header")}
            </H2>
            <p className="mb-6">{t("page-gas-how-do-i-pay-less-gas-text")}</p>
            <Flex className="my-4 flex-wrap gap-8 lg:my-0">
              <StyledCard
                emoji=":alarm_clock:"
                title={t("page-gas-how-do-i-pay-less-gas-card-1-title")}
                description={t(
                  "page-gas-how-do-i-pay-less-gas-card-1-description"
                )}
              ></StyledCard>
              <StyledCard
                emoji=":robot:"
                title={t("page-gas-how-do-i-pay-less-gas-card-2-title")}
                description={t(
                  "page-gas-how-do-i-pay-less-gas-card-2-description"
                )}
              ></StyledCard>
              <StyledCard
                emoji=":rocket:"
                title={t("page-gas-how-do-i-pay-less-gas-card-3-title")}
                description={t(
                  "page-gas-how-do-i-pay-less-gas-card-3-description"
                )}
              >
                <ButtonLink className="w-fit" href="/layer-2/">
                  {t("page-gas-try-layer-2")}
                </ButtonLink>
              </StyledCard>
            </Flex>
          </div>
        </Flex>
      </Content>
      <Content className="mb-16 lg:mb-32">
        <Flex className="w-full flex-col items-start lg:flex-row">
          <div className="me-auto ms-auto w-full flex-[60%] lg:me-16 lg:ms-0">
            <H3 className="mt-0">
              {t("page-gas-what-causes-high-gas-fees-header")}
            </H3>
            <p className="mb-6">
              {t("page-gas-what-causes-high-gas-fees-text-1")}
            </p>
            <p className="mb-6">
              <Translation id="page-gas:page-gas-what-causes-high-gas-fees-text-2" />
            </p>
            <p className="mb-6">
              {t("page-gas-what-causes-high-gas-fees-text-3")}
            </p>
            <p className="mb-6">
              {t("page-gas-want-to-dive-deeper")}{" "}
              <InlineLink href="/developers/docs/gas/">
                {t("page-gas-check-out-the-developer-docs")}
              </InlineLink>
            </p>
          </div>
          <GhostCard className="mt-16 max-w-[640px] self-center md:w-2/5 lg:mt-2">
            <Emoji text=":cat:" className="text-5xl" />
            <H3>{t("page-gas-attack-of-the-cryptokitties-header")}</H3>
            <p className="mb-6">
              {t("page-gas-attack-of-the-cryptokitties-text")}
            </p>
          </GhostCard>
        </Flex>
      </Content>
      <Content className="mb-16 lg:mb-32">
        <Flex className="me-0 w-full flex-col items-start lg:me-8 lg:flex-row">
          <div className="me-auto w-full lg:me-8">
            <div>
              <H2 className="mt-0">
                {t("page-gas-why-do-we-need-gas-header")}
              </H2>
              <p className="mb-6">{t("page-gas-why-do-we-need-gas-text")}</p>
            </div>
            {benefits.map((benefit, index) => (
              <div key={index} className="my-2 min-w-full">
                <HorizontalCard
                  key={benefit.emoji}
                  emoji={benefit.emoji}
                  description={benefit.description}
                />
              </div>
            ))}
          </div>
          <div className="w-full">
            <Image className="object-contain" src={ethImg} alt="" width={600} />
          </div>
        </Flex>
      </Content>
      <Content className="mb-16 lg:mb-32">
        <Flex className="flex-col items-start lg:flex-row">
          <div className="me-auto w-full lg:me-8">
            <Flex className="items-start">
              <H2 className="mt-0">
                {t("page-gas-how-is-gas-calculated-header")}
              </H2>

              <Tag className="ms-4 mt-0.5" status="warning">
                {t("page-gas-advanced")}
              </Tag>
            </Flex>
            <p className="mb-6">{t("page-gas-how-is-gas-calculated-text-1")}</p>
            <UnorderedList className="ms-6 gap-3">
              <ListItem>
                <Translation id="page-gas:page-gas-how-is-gas-calculated-item-1" />
              </ListItem>
              <ListItem>
                <Translation id="page-gas:page-gas-how-is-gas-calculated-item-2" />
              </ListItem>
              <ListItem>
                <Translation id="page-gas:page-gas-how-is-gas-calculated-item-3" />
                <UnorderedList className="ms-6 list-none gap-3">
                  <ListItem className="text-sm text-body-medium">
                    <Translation id="page-gas:page-gas-how-is-gas-calculated-list-item-1" />
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
            <p className="mb-6">
              <Translation id="page-gas:page-gas-how-is-gas-calculated-text-2" />
            </p>
          </div>
          <Table className="min-w-[auto] max-w-full">
            <TableCaption className="caption-bottom">
              <Translation id="page-gas:page-gas-table-figure" />
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t("page-gas-table-header-1")}</TableHead>
                <TableHead>{t("page-gas-table-header-2")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  {t("page-gas-table-item-1-transaction-type")}
                </TableCell>
                <TableCell>21,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {t("page-gas-table-item-2-transaction-type")}
                </TableCell>
                <TableCell>65,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {t("page-gas-table-item-3-transaction-type")}
                </TableCell>
                <TableCell>84,904</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {t("page-gas-table-item-4-transaction-type")}
                </TableCell>
                <TableCell>184,523</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Flex>
      </Content>
      <Content>
        <H2 className="mt-0">{t("page-gas-faq-header")}</H2>
        {/* MaxWidth will be enforced by FAQ component once implemented */}
        <div className="max-w-[832px]">
          <ExpandableCard title={t("page-gas-faq-question-1-q")}>
            <p className="mb-6">
              <Translation id="page-gas:page-gas-faq-question-1-a-1" />
            </p>
            <p className="mb-6">
              <Translation id="page-gas:page-gas-faq-question-1-a-2" />
            </p>
          </ExpandableCard>
          <ExpandableCard title={t("page-gas-faq-question-2-q")}>
            <p className="mb-6">
              <Translation id="page-gas:page-gas-faq-question-2-a-1" />
            </p>
            <BaseLink href="/eth/">
              <Translation id="page-gas:page-gas-faq-question-2-a-2" />
            </BaseLink>
          </ExpandableCard>
          <ExpandableCard title={t("page-gas-faq-question-3-q")}>
            <p className="mb-6">
              <Translation id="page-gas:page-gas-faq-question-3-a-1" />
            </p>
            <p className="mb-6">{t("page-gas-faq-question-3-a-2")}</p>
          </ExpandableCard>
        </div>
      </Content>
      <Divider />
      <Content>
        <Flex className="-mx-4 flex-wrap">
          <Callout
            className="min-h-full flex-[1_1_416px]"
            image={whatIsEthereumImg}
            titleKey={t("page-gas-how-do-i-pay-less-gas-card-3-title")}
            alt=""
            descriptionKey={t(
              "page-gas-how-do-i-pay-less-gas-card-3-description"
            )}
          >
            <div>
              <ButtonLink href="/layer-2/">
                {t("page-gas-use-layer-2")}
              </ButtonLink>
            </div>
          </Callout>
          <Callout
            className="min-h-full flex-[1_1_416px]"
            image={dogeComputerImg}
            titleKey={t("page-community:page-community-explore-dapps-title")}
            alt={t("page-community:page-community-explore-dapps-alt")}
            descriptionKey={t(
              "page-community:page-community-explore-dapps-description"
            )}
          >
            <div>
              <ButtonLink href="/dapps/">
                {t("page-community:page-community-explore-dapps")}
              </ButtonLink>
            </div>
          </Callout>
        </Flex>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default GasPage
