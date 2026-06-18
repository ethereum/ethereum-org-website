import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import ExpandableCard from "@/components/ExpandableCard"
import FileContributors from "@/components/FileContributors"
import PageHero from "@/components/Hero/PageHero"
import HorizontalCard from "@/components/HorizontalCard"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import Translation from "@/components/Translation"
import { AccordionContainer } from "@/components/ui/accordion"
import { Alert, AlertContent, AlertTitle } from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import { Divider } from "@/components/ui/divider"
import { Grid } from "@/components/ui/grid"
import InlineLink, { BaseLink } from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"
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

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import PageJsonLD from "./page-jsonld"

import dogeComputerImg from "@/public/images/doge-computer.png"
import ethImg from "@/public/images/eth.png"
import heroImg from "@/public/images/infrastructure_transparent.png"
import robotImg from "@/public/images/wallet.png"
import bazaarImg from "@/public/images/what-is-ethereum.png"

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

  return (
    <>
      <PageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <PageHero
        breadcrumbs={{ slug: "gas" }}
        heroImg={heroImg}
        title={t("page-gas-hero-header")}
        description={
          <>
            {t("page-gas-hero-subtitle-1")}
            <br />
            {t("page-gas-hero-subtitle-2")}
          </>
        }
        buttons={[
          {
            content: t("page-gas-hero-button-1-content"),
            toId: "what-is-gas",
            matomo: {
              eventCategory: "gas hero buttons",
              eventAction: "click",
              eventName: "what is gas",
            },
          },
        ]}
      />

      <main className="px-page pt-page-2x pb-page">
        <I18nProvider locale={locale} messages={messages}>
          <MainArticle className="flow *:[section]:py-space">
            {/* What is gas */}
            <Section
              id="what-is-gas"
              data-flow="skip"
              className="flex gap-space-2x *:flex-1 max-lg:flex-col"
            >
              <div className="flow">
                <Alert variant="update">
                  <AlertContent className="flow">
                    <AlertTitle>{t("page-gas-summary-title")}</AlertTitle>
                    <UnorderedList className="mb-0">
                      <ListItem>{t("page-gas-summary-item-1")}</ListItem>
                      <ListItem>{t("page-gas-summary-item-2")}</ListItem>
                      <ListItem>{t("page-gas-summary-item-3")}</ListItem>
                    </UnorderedList>
                  </AlertContent>
                </Alert>
                <h2>{t("page-gas-what-are-gas-fees-header")}</h2>
                <p>{t("page-gas-what-are-gas-fees-text-1")}</p>
                <p>
                  <Translation id="page-gas:page-gas-what-are-gas-fees-text-2" />
                </p>
              </div>

              <div className="relative hidden lg:block">
                <Image
                  src={robotImg}
                  alt=""
                  className="absolute inset-0 size-full object-contain"
                  sizes="(max-width: 991px) 1px, (max-width: 1536px) 50vw, 768px"
                />
              </div>
            </Section>

            {/* How do I pay less gas */}
            <Section id="optimize">
              <h2>{t("page-gas-how-do-i-pay-less-gas-header")}</h2>
              <p>{t("page-gas-how-do-i-pay-less-gas-text")}</p>
              <Grid columns={3}>
                <MarkdownCard
                  emoji=":alarm_clock:"
                  title={t("page-gas-how-do-i-pay-less-gas-card-1-title")}
                  description={t(
                    "page-gas-how-do-i-pay-less-gas-card-1-description"
                  )}
                />
                <MarkdownCard
                  emoji=":robot:"
                  title={t("page-gas-how-do-i-pay-less-gas-card-2-title")}
                  description={t(
                    "page-gas-how-do-i-pay-less-gas-card-2-description"
                  )}
                />
                <MarkdownCard
                  emoji=":rocket:"
                  title={t("page-gas-how-do-i-pay-less-gas-card-3-title")}
                  description={t(
                    "page-gas-how-do-i-pay-less-gas-card-3-description"
                  )}
                  ctaLabel={t("page-gas-try-layer-2")}
                  href="/layer-2/"
                />
              </Grid>

              {/* What causes high gas fees */}
              <Section
                id="gas-spike-cause"
                data-flow="skip"
                className="flex gap-space-2x max-lg:flex-col"
              >
                <div className="flow flex-1">
                  <h3>{t("page-gas-what-causes-high-gas-fees-header")}</h3>
                  <p>{t("page-gas-what-causes-high-gas-fees-text-1")}</p>
                  <p>
                    <Translation id="page-gas:page-gas-what-causes-high-gas-fees-text-2" />
                  </p>
                  <p>{t("page-gas-what-causes-high-gas-fees-text-3")}</p>
                  <p>
                    {t("page-gas-want-to-dive-deeper")}{" "}
                    <InlineLink href="/developers/docs/gas/">
                      {t("page-gas-check-out-the-developer-docs")}
                    </InlineLink>
                  </p>
                </div>
                <MarkdownCard
                  className="lg:max-w-md"
                  emoji=":cat:"
                  title={t("page-gas-attack-of-the-cryptokitties-header")}
                  description={t("page-gas-attack-of-the-cryptokitties-text")}
                />
              </Section>
            </Section>

            {/* Why do we need gas */}
            <Section
              data-flow="skip"
              className="flex gap-space-2x *:flex-1 max-lg:flex-col-reverse"
            >
              <div className="flow">
                <h2>{t("page-gas-why-do-we-need-gas-header")}</h2>
                <p>{t("page-gas-why-do-we-need-gas-text")}</p>
                {benefits.map((benefit) => (
                  <HorizontalCard
                    key={benefit.emoji}
                    emoji={benefit.emoji}
                    description={benefit.description}
                  />
                ))}
              </div>
              <div className="relative max-lg:min-h-64">
                <Image
                  className="absolute inset-0 size-full object-contain"
                  src={ethImg}
                  alt=""
                />
              </div>
            </Section>

            {/* How is gas calculated */}
            <Section
              data-flow="skip"
              className="flex gap-space-2x *:flex-1 max-lg:flex-col"
            >
              <div className="flow">
                <div className="flex items-start gap-4">
                  <h2>{t("page-gas-how-is-gas-calculated-header")}</h2>
                  <Tag className="mt-0.5" status="warning">
                    {t("page-gas-advanced")}
                  </Tag>
                </div>
                <p>{t("page-gas-how-is-gas-calculated-text-1")}</p>
                <UnorderedList>
                  <ListItem>
                    <Translation id="page-gas:page-gas-how-is-gas-calculated-item-1" />
                  </ListItem>
                  <ListItem>
                    <Translation id="page-gas:page-gas-how-is-gas-calculated-item-2" />
                  </ListItem>
                  <ListItem>
                    <Translation id="page-gas:page-gas-how-is-gas-calculated-item-3" />
                    <UnorderedList className="list-none">
                      <ListItem className="text-sm text-body-medium">
                        <Translation id="page-gas:page-gas-how-is-gas-calculated-list-item-1" />
                      </ListItem>
                    </UnorderedList>
                  </ListItem>
                </UnorderedList>
                <p>
                  <Translation id="page-gas:page-gas-how-is-gas-calculated-text-2" />
                </p>
              </div>
              <Table variant="minimal" className="max-w-full min-w-auto">
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
            </Section>

            {/* FAQ */}
            <Section id="faq">
              <h2>{t("page-gas-faq-header")}</h2>
              <AccordionContainer>
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
              </AccordionContainer>
            </Section>

            <Divider className="mx-auto" />

            {/* Next steps */}
            <Section id="callouts">
              <Grid columns={2} size="wide">
                <Callout
                  title={t("page-gas-how-do-i-pay-less-gas-card-3-title")}
                  description={t(
                    "page-gas-how-do-i-pay-less-gas-card-3-description"
                  )}
                  image={bazaarImg}
                >
                  <ButtonLink href="/layer-2/">
                    {t("page-gas-use-layer-2")}
                  </ButtonLink>
                </Callout>
                <Callout
                  title={tCommunity("page-community-explore-dapps-title")}
                  description={tCommunity(
                    "page-community-explore-dapps-description"
                  )}
                  image={dogeComputerImg}
                >
                  <ButtonLink href="/apps/">
                    {tCommunity("page-community-explore-dapps")}
                  </ButtonLink>
                </Callout>
              </Grid>
            </Section>

            <Section id="quiz-section">
              <StandaloneQuizWidget quizKey="gas" />
            </Section>

            <FileContributors
              className="border-t"
              contributors={contributors}
              lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            />
          </MainArticle>
        </I18nProvider>

        {/* End-of-page actions */}
        <ContentFeedback />
      </main>
    </>
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
