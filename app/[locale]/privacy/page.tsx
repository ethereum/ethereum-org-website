import { pick } from "lodash"
import {
  ArrowLeftRight,
  ChartNoAxesCombined,
  Handshake,
  Lightbulb,
  Sparkle,
} from "lucide-react"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, ToCItem } from "@/lib/types"

import BigNumber from "@/components/BigNumber"
import PathwayCard from "@/components/cards/pathway-card"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import Link from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"
import VideoWatch from "@/components/Videos/VideoWatch"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { numberFormat, numberToPercent } from "@/lib/utils/numbers"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import developersEthBlocksImg from "@/public/images/developers-eth-blocks.png"
import heroImg from "@/public/images/three-people-cat-butterflies-petting-dog.png"
import walletHeroImg from "@/public/images/wallets/wallet-hero.png"

const Page = async (props: { params: Promise<{ locale: Lang }> }) => {
  const params = await props.params
  const { locale } = params
  setRequestLocale(locale)

  const t = await getTranslations("page-privacy")

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/privacy/")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("privacy", locale)

  const tocItems: ToCItem[] = [
    {
      title: t("page-privacy-data-against-you-title"),
      url: "#when-your-personal-data-is-used-against-you",
    },
    {
      title: t("page-privacy-private-moments-title"),
      url: "#selling-your-private-moments",
    },
    {
      title: t("page-privacy-targeting-title"),
      url: "#how-targeting-reaches-vulnerability",
    },
    {
      title: t("page-privacy-nothing-to-hide-title"),
      url: "#why-i-have-nothing-to-hide-misses-the-point",
    },
    {
      title: t("page-privacy-what-protects-title"),
      url: "#what-privacy-really-protects",
    },
    {
      title: t("page-privacy-default-title"),
      url: "#privacy-can-be-the-default",
    },
    {
      title: t("page-privacy-getting-started-title"),
      url: "#getting-started",
    },
  ]

  const getId = (input: string) => {
    const parts = input.split("#")
    return parts.length > 1 ? parts[1] : ""
  }

  return (
    <>
      <PageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <ContentLayout
        heroSection={
          <PageHero
            breadcrumbs={{ slug: "privacy" }}
            heroImg={heroImg}
            title={t("page-privacy-title")}
            description={t("page-privacy-hero-description")}
            buttons={[
              {
                content: t("page-privacy-hero-cta"),
                href: tocItems[0].url,
              },
            ]}
          />
        }
        tocItems={tocItems}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        variant="narrow"
      >
        <Card size="lg">
          <CardContent>
            <CardTitle size="lg" asChild>
              <h2>{t("page-privacy-summary-title")}</h2>
            </CardTitle>
            <UnorderedList className="mb-0">
              <ListItem>
                {t.rich("page-privacy-summary-item-1", { strong: Strong })}
              </ListItem>
              <ListItem>
                {t.rich("page-privacy-summary-item-2", { strong: Strong })}
              </ListItem>
              <ListItem>
                {t.rich("page-privacy-summary-item-3", { strong: Strong })}
              </ListItem>
              <ListItem>
                {t.rich("page-privacy-summary-item-4", { strong: Strong })}
              </ListItem>
            </UnorderedList>
          </CardContent>
        </Card>

        <Section id={getId(tocItems[0].url)}>
          <h2>{tocItems[0].title}</h2>
          <p>
            {t.rich("page-privacy-data-against-you-description-1", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-privacy-data-against-you-description-2", {
              strong: Strong,
              reported: (chunks) => (
                <Link href="https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-surveillance-pricing-study-indicates-wide-range-personal-data-used-set-individualized-consumer">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <VideoWatch slug="why-privacy-matters" />
          <p>
            {t.rich("page-privacy-data-against-you-description-3", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-privacy-data-against-you-description-4", {
              strong: Strong,
            })}
          </p>
          <Alert variant="warning">
            <AlertIcon className="[&>svg]:size-10 [&>svg]:text-body!">
              <Lightbulb />
            </AlertIcon>
            <AlertContent>
              <AlertTitle size="lg" className="text-pretty">
                {t("page-privacy-remember-data-title")}
              </AlertTitle>
              <p className="mt-2">
                {t.rich("page-privacy-remember-data-description-1", {
                  strong: Strong,
                })}
              </p>
              <p className="mt-2">
                {t("page-privacy-remember-data-description-2")}
              </p>
              <p className="mt-2">
                {t.rich("page-privacy-remember-data-description-3", {
                  strong: Strong,
                })}
              </p>
            </AlertContent>
          </Alert>
        </Section>

        <Section id={getId(tocItems[1].url)}>
          <h2>{tocItems[1].title}</h2>
          <p>
            {t.rich("page-privacy-private-moments-description-1", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-privacy-private-moments-description-2", {
              strong: Strong,
            })}
          </p>
          <Card className="my-space-2x">
            <CardContent>
              <Grid
                columns={3}
                size="narrow"
                className="*:max-w-64 *:py-0 **:data-[label=value]:text-primary"
              >
                <BigNumber
                  value={t("page-privacy-metric-value-times", { value: 747 })}
                >
                  {t("page-privacy-metric-1-description")}
                </BigNumber>
                <BigNumber value={numberToPercent(0.74, locale)}>
                  {t("page-privacy-metric-2-description")}
                </BigNumber>
                <BigNumber
                  value={t("page-privacy-metric-value-plus", {
                    value: numberFormat(locale, {
                      notation: "compact",
                      maximumSignificantDigits: 1,
                    }).format(20 * 1e9),
                  })}
                >
                  {t("page-privacy-metric-3-description")}
                </BigNumber>
              </Grid>
            </CardContent>
          </Card>
          <p>
            {t.rich("page-privacy-private-moments-description-3", {
              strong: Strong,
              nccStudy: (chunks) => (
                <Link href="https://storage02.forbrukerradet.no/media/2020/01/2020-01-14-out-of-control-final-version.pdf">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <p>
            {t.rich("page-privacy-private-moments-description-4", {
              strong: Strong,
              ftcReport: (chunks) => (
                <Link href="https://www.ftc.gov/system/files/documents/reports/data-brokers-call-transparency-accountability-report-federal-trade-commission-may-2014/140527databrokerreport.pdf">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <VideoWatch slug="metadata-surveillance-and-nym" />
        </Section>

        <Section id={getId(tocItems[2].url)}>
          <h2>{tocItems[2].title}</h2>
          <p>
            {t.rich("page-privacy-targeting-description-1", {
              manipulate: (chunks) => (
                <Link href="https://magazine.columbia.edu/article/digital-footprint-sandra-matz-mindmasters">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <p>
            {t.rich("page-privacy-targeting-description-2", { strong: Strong })}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-privacy-targeting-list-1", { strong: Strong })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-targeting-list-2", { strong: Strong })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-targeting-list-3", { strong: Strong })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-targeting-list-4", { strong: Strong })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-targeting-list-5", { strong: Strong })}
            </ListItem>
          </UnorderedList>
          <Grid balanced={2}>
            <Card size="md">
              <CardContent>
                <CardParagraph>
                  {t.rich("page-privacy-targeting-example-1", {
                    strong: Strong,
                  })}
                </CardParagraph>
              </CardContent>
            </Card>
            <Card size="md">
              <CardContent>
                <CardParagraph>
                  {t.rich("page-privacy-targeting-example-2", {
                    strong: Strong,
                  })}
                </CardParagraph>
              </CardContent>
            </Card>
          </Grid>
        </Section>

        <Section id={getId(tocItems[3].url)}>
          <h2>{tocItems[3].title}</h2>
          <p>{t("page-privacy-nothing-to-hide-description-1")}</p>
          <p>
            {t.rich("page-privacy-nothing-to-hide-description-2", {
              strong: Strong,
            })}
          </p>
          <Alert variant="warning">
            <AlertIcon className="[&>svg]:size-10 [&>svg]:text-body!">
              <Lightbulb />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>
                {t("page-privacy-remember-surveillance-title")}
              </AlertTitle>
              <p>{t("page-privacy-remember-surveillance-description")}</p>
            </AlertContent>
          </Alert>
          <VideoWatch slug="why-your-online-security-matters" />
          <p>
            {t.rich("page-privacy-nothing-to-hide-description-3", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-privacy-nothing-to-hide-description-4", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-privacy-nothing-to-hide-description-5", {
              strong: Strong,
              dragnet: (chunks) => (
                <Link href="https://americandragnet.org/">{chunks}</Link>
              ),
              harvest: (chunks) => (
                <Link href="https://www.mprnews.org/episode/2026/01/12/how-ice-uses-phone-and-internet-data-to-identify-and-track-people">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <Alert variant="update">
            <AlertIcon className="[&>svg]:size-12">
              <Handshake />
            </AlertIcon>
            <AlertContent>
              <AlertTitle size="lg">{t("page-privacy-crowd-title")}</AlertTitle>
              <p className="mt-2">{t("page-privacy-crowd-description-1")}</p>
              <p className="mt-2">{t("page-privacy-crowd-description-2")}</p>
            </AlertContent>
          </Alert>
        </Section>

        <Section id={getId(tocItems[4].url)}>
          <h2>{tocItems[4].title}</h2>
          <p>{t("page-privacy-what-protects-description-1")}</p>
          <p>
            {t.rich("page-privacy-what-protects-description-2", {
              strong: Strong,
            })}
          </p>
          <Grid columns={3} size="narrow">
            <Card>
              <CardContent>
                <Sparkle className="size-12 text-primary" />
                <CardTitle>
                  {t("page-privacy-what-protects-card-1-title")}
                </CardTitle>
                <CardParagraph>
                  {t("page-privacy-what-protects-card-1-description")}
                </CardParagraph>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <ChartNoAxesCombined className="size-12 text-primary" />
                <CardTitle>
                  {t("page-privacy-what-protects-card-2-title")}
                </CardTitle>
                <CardParagraph>
                  {t("page-privacy-what-protects-card-2-description")}
                </CardParagraph>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <ArrowLeftRight className="size-12 text-primary" />
                <CardTitle>
                  {t("page-privacy-what-protects-card-3-title")}
                </CardTitle>
                <CardParagraph>
                  {t("page-privacy-what-protects-card-3-description")}
                </CardParagraph>
              </CardContent>
            </Card>
          </Grid>
          <VideoWatch slug="surveillance-silence-reclaiming-privacy" />
        </Section>

        <Section id={getId(tocItems[5].url)}>
          <h2>{tocItems[5].title}</h2>
          <p>
            {t.rich("page-privacy-default-description-1", { strong: Strong })}
          </p>
          <p>
            {t.rich("page-privacy-default-description-2", { strong: Strong })}
          </p>
          <p>
            {t.rich("page-privacy-default-description-3", { strong: Strong })}
          </p>
        </Section>

        <Section id={getId(tocItems[6].url)}>
          <h2>{tocItems[6].title}</h2>
          <p>{t("page-privacy-getting-started-description-1")}</p>
          <p>{t("page-privacy-getting-started-description-2")}</p>
          <PathwayCard
            href="/apps/categories/privacy/"
            title={t("page-privacy-pathway-1-title")}
            description={t("page-privacy-pathway-1-description")}
            badge={{ label: t("page-privacy-pathway-1-badge") }}
            banner={<Image src={walletHeroImg} alt="" sizes="160px" />}
          />
          <PathwayCard
            href="/privacy/ethereum/"
            title={t("page-privacy-pathway-2-title")}
            description={t("page-privacy-pathway-2-description")}
            banner={<Image src={developersEthBlocksImg} alt="" sizes="160px" />}
          />
        </Section>

        <Section id="quiz-section">
          <I18nProvider locale={locale} messages={messages}>
            <StandaloneQuizWidget quizKey="privacy" />
          </I18nProvider>
        </Section>
      </ContentLayout>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("page-privacy")

  return await getMetadata({
    locale,
    slug: ["privacy"],
    title: t("page-privacy-meta-title"),
    description: t("page-privacy-meta-description"),
  })
}

export default Page
