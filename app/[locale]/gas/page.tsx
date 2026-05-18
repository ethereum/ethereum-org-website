import { type BaseHTMLAttributes, type ComponentPropsWithRef } from "react"
import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import Callout from "@/components/Callout"
import Card from "@/components/Card"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import GhostCard from "@/components/GhostCard"
import HorizontalCard from "@/components/HorizontalCard"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageHero from "@/components/PageHero"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import Translation from "@/components/Translation"
import { Alert, AlertContent, AlertTitle } from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Flex, type FlexProps } from "@/components/ui/flex"
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
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import GasPageJsonLD from "./page-jsonld"

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

const PageContainer = ({ className, ...props }: FlexProps) => (
  <Flex
    asChild
    className={cn("mx-auto my-0 w-full flex-col items-center", className)}
  >
    <MainArticle {...props} />
  </Flex>
)

const StyledCard = (props: ComponentPropsWithRef<typeof Card>) => (
  <Card
    className="max-w-full min-w-[280px] flex-[1_0_30%] p-6 md:max-w-[46%]"
    {...props}
  />
)

const H2 = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("mt-12 mb-8 text-2xl md:text-3xl", className)} {...props} />
)

const H3 = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("mt-10 mb-8 text-xl md:text-2xl", className)} {...props} />
)

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/gas")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("gas", locale as Lang)

  const t = await getTranslations("page-gas")
  const tCommunity = await getTranslations("page-community")

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
    <I18nProvider locale={locale} messages={messages}>
      <GasPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />
      <PageContainer>
        <div className="w-full bg-linear-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20">
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
        <Content className="mt-16 mb-16 lg:mb-32">
          <Flex className="w-full flex-col items-center lg:flex-row lg:items-start">
            <div className="me-auto w-full flex-[60%] lg:me-2">
              <Alert variant="update" className="mb-8">
                <AlertContent>
                  <AlertTitle className="mb-6">
                    {t("page-gas-summary-title")}
                  </AlertTitle>
                  <UnorderedList className="mb-0">
                    <ListItem>{t("page-gas-summary-item-1")}</ListItem>
                    <ListItem>{t("page-gas-summary-item-2")}</ListItem>
                    <ListItem>{t("page-gas-summary-item-3")}</ListItem>
                  </UnorderedList>
                </AlertContent>
              </Alert>
              <H2 className="mt-0" id="what-is-gas">
                {t("page-gas-what-are-gas-fees-header")}
              </H2>
              <p className="mb-6">{t("page-gas-what-are-gas-fees-text-1")}</p>
              <p className="mb-6">
                <Translation id="page-gas:page-gas-what-are-gas-fees-text-2" />
              </p>
            </div>

            <div className="hidden max-h-[450px] flex-[50%] justify-center lg:flex">
              <Image
                src={walletImg}
                alt="A robot"
                className="object-contain"
                sizes="(max-width: 991px) 1px, (max-width: 1536px) 50vw, 768px"
              />
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
                />
                <StyledCard
                  emoji=":robot:"
                  title={t("page-gas-how-do-i-pay-less-gas-card-2-title")}
                  description={t(
                    "page-gas-how-do-i-pay-less-gas-card-2-description"
                  )}
                />
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
            <div className="ms-auto me-auto w-full flex-[60%] lg:ms-0 lg:me-16">
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
              <Image
                className="object-contain"
                src={ethImg}
                alt=""
                width={600}
              />
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
              <p className="mb-6">
                {t("page-gas-how-is-gas-calculated-text-1")}
              </p>
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
            <Table className="max-w-full min-w-[auto]">
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
          <div className="max-w-[832px] space-y-4">
            <ExpandableCard title={t("page-gas-faq-question-1-q")}>
              <p>
                <Translation id="page-gas:page-gas-faq-question-1-a-1" />
              </p>
              <p>
                <Translation id="page-gas:page-gas-faq-question-1-a-2" />
              </p>
            </ExpandableCard>
            <ExpandableCard title={t("page-gas-faq-question-2-q")}>
              <p>
                <Translation id="page-gas:page-gas-faq-question-2-a-1" />
              </p>
              <BaseLink href="/eth/">
                <Translation id="page-gas:page-gas-faq-question-2-a-2" />
              </BaseLink>
            </ExpandableCard>
            <ExpandableCard title={t("page-gas-faq-question-3-q")}>
              <p>
                <Translation id="page-gas:page-gas-faq-question-3-a-1" />
              </p>
              <p>{t("page-gas-faq-question-3-a-2")}</p>
            </ExpandableCard>
          </div>
        </Content>
        <Divider />
        <Content>
          <Flex className="-mx-4 flex-wrap">
            <Callout
              className="min-h-full flex-[1_1_416px]"
              image={whatIsEthereumImg}
              titleKey={"page-gas:page-gas-how-do-i-pay-less-gas-card-3-title"}
              alt=""
              descriptionKey={
                "page-gas:page-gas-how-do-i-pay-less-gas-card-3-description"
              }
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
              titleKey={"page-community:page-community-explore-dapps-title"}
              alt={tCommunity("page-community-explore-dapps-alt")}
              descriptionKey={
                "page-community:page-community-explore-dapps-description"
              }
            >
              <div>
                <ButtonLink href="/apps/">
                  {tCommunity("page-community-explore-dapps")}
                </ButtonLink>
              </div>
            </Callout>
          </Flex>
        </Content>
        <Content>
          <StandaloneQuizWidget quizKey="gas" />
        </Content>
        <Content>
          <FileContributors
            className="my-10 border-t"
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
          <FeedbackCard />
        </Content>
      </PageContainer>
    </I18nProvider>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-gas")

  return await getMetadata({
    locale,
    slug: ["gas"],
    title: t("page-gas-meta-title"),
    description: t("page-gas-meta-description"),
  })
}

export default Page
