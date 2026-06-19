import { type ReactNode } from "react"
import { pick } from "lodash"
import { TriangleAlert } from "lucide-react"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FileContributors from "@/components/FileContributors"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import Discord from "@/components/icons/discord.svg"
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
import { Image } from "@/components/Image"
import { Emphasis, Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import { StandaloneQuizWidget as QuizWidget } from "@/components/Quiz/QuizWidget"
import Translation from "@/components/Translation"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardContent,
  CardEmoji,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Divider } from "@/components/ui/divider"
import { Grid } from "@/components/ui/grid"
import InlineLink, { BaseLink, LinkWithArrow } from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import RunANodePageJsonLD from "./page-jsonld"

import community from "@/public/images/enterprise-eth.png"
import hackathon from "@/public/images/hackathon_transparent.png"
import impact from "@/public/images/impact_transparent.png"
import Dappnode from "@/public/images/run-a-node/dappnode.svg"
import Dapptap from "@/public/images/run-a-node/dapptap.svg"
import heroImg from "@/public/images/run-a-node/ethereum-inside.png"
import Terminal from "@/public/images/run-a-node/terminal.svg"
import leslie from "@/public/images/upgrades/upgrade_rhino.png"

type RunANodeCard = {
  Svg: React.FC<React.SVGProps<SVGElement>>
  title: string
  preview: ReactNode
  body: string[]
  alt: string
}

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/run-a-node")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("run-a-node", locale as Lang)

  const t = await getTranslations("page-run-a-node")

  const whyRunANodeCards: RunANodeCard[] = [
    {
      Svg: PrivacyGlyphIcon,
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
      Svg: MegaphoneGlyphIcon,
      title: t("page-run-a-node-censorship-resistance-title"),
      preview: t("page-run-a-node-censorship-resistance-preview"),
      body: [
        t("page-run-a-node-censorship-resistance-1"),
        t("page-run-a-node-censorship-resistance-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-censorship-resistance"),
    },
    {
      Svg: EarthGlyphIcon,
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
      Svg: DecentralizationGlyphIcon,
      title: t("page-run-a-node-decentralized-title"),
      preview: t("page-run-a-node-decentralized-preview"),
      body: [
        t("page-run-a-node-decentralized-1"),
        t("page-run-a-node-decentralized-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-decentralization"),
    },
    {
      Svg: VoteGlyphIcon,
      title: t("page-run-a-node-voice-your-choice-title"),
      preview: t("page-run-a-node-voice-your-choice-preview"),
      body: [
        t("page-run-a-node-voice-your-choice-1"),
        t("page-run-a-node-voice-your-choice-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-vote"),
    },
    {
      Svg: SovereigntyGlyphIcon,
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
    <>
      <RunANodePageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <PageHero
        header={t("page-run-a-node-title")}
        heroImg={heroImg}
        title={<Translation id="page-run-a-node:page-run-a-node-hero-header" />}
        description={t("page-run-a-node-hero-subtitle")}
        buttons={[
          {
            content: t("page-run-a-node-hero-cta-1"),
            toId: "what-is-a-node",
            matomo: {
              eventCategory: "run a node hero buttons",
              eventAction: "click",
              eventName: "learn more",
            },
          },
        ]}
      />

      <main className="p-page pt-page-2x">
        <I18nProvider locale={locale} messages={messages}>
          <MainArticle className="flow space-y-space-4x">
            <Section
              id="what-is-a-node"
              className="flex gap-8 max-lg:flex-col lg:items-center"
            >
              <div className="flow flex-1">
                <h2>{t.rich("page-run-a-node-what-title", { i: Emphasis })}</h2>
                <h3>{t("page-run-a-node-what-1-subtitle")}</h3>
                <p>
                  <Translation id="page-run-a-node:page-run-a-node-what-1-text" />
                </p>
                <h3>{t("page-run-a-node-what-2-subtitle")}</h3>
                <p>{t("page-run-a-node-what-2-text")}</p>
                <h3>{t("page-run-a-node-what-3-subtitle")}</h3>
                <p>{t("page-run-a-node-what-3-text")}</p>
              </div>
              <div className="grid place-items-center">
                <Image
                  src={hackathon}
                  alt=""
                  sizes="(max-width: 480px) calc(100vw - 64px), 512px"
                  className="w-full max-w-lg lg:max-w-[40vw]"
                />
              </div>
            </Section>

            <Section
              id="who"
              className="mx-auto max-w-4xl rounded-2xl bg-linear-to-br from-blue-500/20 from-10% to-pink-600/20 to-90% p-page **:[p]:max-w-3xl"
            >
              <div className="mb-space flex items-center justify-between gap-8 border-b pb-space max-md:flex-col md:gap-12">
                <Image
                  src={impact}
                  alt=""
                  sizes="300px"
                  style={{ width: "300px", height: "auto" }}
                />
                <div className="flow">
                  <h2>
                    {t.rich("page-run-a-node-who-title", { i: Emphasis })}
                  </h2>
                  <p className="text-body-medium">
                    <Translation id="page-run-a-node:page-run-a-node-who-preview" />
                  </p>
                </div>
              </div>
              <p className="mb-6">
                <Translation id="page-run-a-node:page-run-a-node-who-copy-1" />
              </p>
              <p className="mb-6">{t("page-run-a-node-who-copy-2")}</p>
              <p className="mb-6">{t("page-run-a-node-who-copy-3")}</p>
              <p className="text-h3">
                <strong>{t("page-run-a-node-who-copy-bold")}</strong>
              </p>
            </Section>

            <Section id="why">
              <h2>{t.rich("page-run-a-node-why-title", { i: Emphasis })}</h2>
              <Grid columns={3} size="wider">
                {whyRunANodeCards.map(({ Svg, title, preview, body }) => (
                  <ExpandableCard
                    contentPreview={preview}
                    title={title}
                    svg={
                      <Svg className="size-16" aria-hidden focusable="false" />
                    }
                    key={title}
                  >
                    {body.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </ExpandableCard>
                ))}
              </Grid>
            </Section>

            <Divider />

            <Section id="getting-started">
              <h2>{t("page-run-a-node-getting-started-title")}</h2>
              <div
                className={cn(
                  "mx-auto max-w-5xl space-y-space-2x",
                  // Children divs (colored boxes)
                  "*:flex *:items-center *:gap-page *:rounded-2xl *:p-page max-md:*:flex-col!"
                )}
              >
                <div className="bg-accent-a/10 md:flex-row-reverse dark:bg-accent-a/20">
                  <div data-label="decoration">
                    <Terminal aria-hidden focusable="false" />
                  </div>
                  <div data-label="content" className="flow">
                    <p>
                      {t("page-run-a-node-getting-started-software-section-1")}
                    </p>
                    <p className="flex gap-4 font-mono">
                      <TriangleAlert className="shrink-0" />
                      {t(
                        "page-run-a-node-getting-started-software-section-1-alert"
                      )}
                    </p>
                    <LinkWithArrow href="/developers/docs/nodes-and-clients/run-a-node/">
                      {t(
                        "page-run-a-node-getting-started-software-section-1-link"
                      )}
                    </LinkWithArrow>
                  </div>
                </div>

                <div className="bg-accent-b/10 dark:bg-accent-b/20">
                  <div data-label="decoration">
                    <Dappnode aria-hidden focusable="false" />
                  </div>
                  <p data-label="content">
                    {t.rich(
                      "page-run-a-node-getting-started-software-section-2",
                      { b: Strong }
                    )}
                  </p>
                </div>

                <div className="bg-accent-c/10 md:flex-row-reverse dark:bg-accent-c/20">
                  <div data-label="decoration">
                    <Dapptap aria-hidden focusable="false" />
                  </div>
                  <div data-label="content" className="flow">
                    <p>
                      {t("page-run-a-node-getting-started-software-section-3a")}
                    </p>
                    <p>
                      <Translation id="page-run-a-node:page-run-a-node-getting-started-software-section-3b" />
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="choose-your-adventure" className="*:[p]:max-w-3xl">
              <h2>{t("page-run-a-node-choose-your-adventure-title")}</h2>
              <p>{t("page-run-a-node-choose-your-adventure-1")}</p>
              <p>{t("page-run-a-node-choose-your-adventure-2")}</p>
              <Grid balanced={2}>
                <Card>
                  <CardHeader>
                    <CardEmoji text=":shopping_cart:" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>
                      {t("page-run-a-node-buy-fully-loaded-title")}
                    </CardTitle>
                    <CardParagraph>
                      {t("page-run-a-node-buy-fully-loaded-description")}
                    </CardParagraph>
                    <UnorderedList>
                      <ListItem>
                        {t("page-run-a-node-buy-fully-loaded-note-1")}
                      </ListItem>
                      <ListItem>
                        {t("page-run-a-node-buy-fully-loaded-note-2")}
                      </ListItem>
                      <ListItem className="font-mono">
                        {t("page-run-a-node-buy-fully-loaded-note-3")}
                      </ListItem>
                    </UnorderedList>
                  </CardContent>
                  <CardFooter buttons="full">
                    <ButtonLink href="https://dappnode.com/collections/frontpage">
                      {t("page-run-a-node-shop-dappnode")}
                    </ButtonLink>
                    <ButtonLink href="https://ava.do/">
                      {t("page-run-a-node-shop-avado")}
                    </ButtonLink>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardEmoji text=":building_construction:" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>
                      {t("page-run-a-node-build-your-own-title")}
                    </CardTitle>
                    <CardParagraph>
                      {t("page-run-a-node-choose-your-adventure-build-1")}
                    </CardParagraph>
                    <UnorderedList>
                      <ListItem>
                        {t(
                          "page-run-a-node-choose-your-adventure-build-bullet-1"
                        )}
                      </ListItem>
                      <ListItem>
                        {t(
                          "page-run-a-node-choose-your-adventure-build-bullet-2"
                        )}
                      </ListItem>
                      <ListItem>
                        {t(
                          "page-run-a-node-choose-your-adventure-build-bullet-3"
                        )}
                      </ListItem>
                    </UnorderedList>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" toId="build-your-own">
                      {t("page-run-a-node-shop-dappnode")}
                    </Button>
                  </CardFooter>
                </Card>
              </Grid>
            </Section>

            <Section id="build-your-own">
              <h2>{t("page-run-a-node-build-your-own-title")}</h2>

              <div className="mt-space-2x flex items-center gap-4">
                <HardwareGlyphIcon
                  className="size-12"
                  aria-hidden
                  focusable="false"
                />
                <h3>{t("page-run-a-node-build-your-own-hardware-title")}</h3>
              </div>

              <Grid balanced={2}>
                <Card>
                  <CardContent>
                    <CardTitle asChild>
                      <h4>
                        {t("page-run-a-node-build-your-own-minimum-specs")}
                      </h4>
                    </CardTitle>
                    <UnorderedList>
                      <ListItem>
                        <CardParagraph>
                          {t("page-run-a-node-build-your-own-min-ram")}
                        </CardParagraph>
                        <CardParagraph>
                          <BaseLink href="#plan-on-staking">
                            {t("page-run-a-node-build-your-own-ram-note-1")}
                          </BaseLink>
                        </CardParagraph>
                        <CardParagraph>
                          <BaseLink href="#rasp-pi">
                            {t("page-run-a-node-build-your-own-ram-note-2")}
                          </BaseLink>
                        </CardParagraph>
                      </ListItem>
                      <ListItem>
                        <CardParagraph>
                          {t("page-run-a-node-build-your-own-min-ssd")}
                        </CardParagraph>
                        <CardParagraph size="sm" variant="subtitle">
                          {t("page-run-a-node-build-your-own-ssd-note")}
                        </CardParagraph>
                      </ListItem>
                    </UnorderedList>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <CardTitle asChild>
                      <h4>{t("page-run-a-node-build-your-own-recommended")}</h4>
                    </CardTitle>
                    <UnorderedList>
                      <ListItem>
                        {t("page-run-a-node-build-your-own-nuc")}
                        <CardParagraph size="sm">
                          {t("page-run-a-node-build-your-own-nuc-small")}
                        </CardParagraph>
                      </ListItem>
                      <ListItem>
                        {t("page-run-a-node-build-your-own-connection")}
                        <CardParagraph size="sm">
                          {t("page-run-a-node-build-your-own-connection-small")}
                        </CardParagraph>
                      </ListItem>
                      <ListItem>
                        {t("page-run-a-node-build-your-own-peripherals")}
                        <CardParagraph size="sm">
                          {t(
                            "page-run-a-node-build-your-own-peripherals-small"
                          )}
                        </CardParagraph>
                      </ListItem>
                    </UnorderedList>
                  </CardContent>
                </Card>
              </Grid>

              <div className="mt-space-2x flex items-center gap-4">
                <DownloadGlyphIcon
                  className="size-12"
                  aria-hidden
                  focusable="false"
                />
                <h3>{t("page-run-a-node-build-your-own-software")}</h3>
              </div>

              <Grid balanced={2}>
                <Card>
                  <CardContent>
                    <CardTitle asChild>
                      <h4>
                        {t(
                          "page-run-a-node-build-your-own-software-option-1-title"
                        )}
                      </h4>
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        "page-run-a-node-build-your-own-software-option-1-description"
                      )}
                    </CardParagraph>
                  </CardContent>
                  <CardFooter>
                    <ButtonLink href="https://docs.dappnode.io">
                      {t(
                        "page-run-a-node-build-your-own-software-option-1-button"
                      )}
                    </ButtonLink>
                  </CardFooter>
                </Card>

                <Card>
                  <CardContent>
                    <CardTitle asChild>
                      <h4>
                        {t(
                          "page-run-a-node-build-your-own-software-option-2-title"
                        )}
                      </h4>
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        "page-run-a-node-build-your-own-software-option-2-description-1"
                      )}
                    </CardParagraph>
                    <CardParagraph>
                      {t(
                        "page-run-a-node-build-your-own-software-option-2-description-2"
                      )}
                    </CardParagraph>
                  </CardContent>
                  <CardFooter>
                    <ButtonLink
                      href="/developers/docs/nodes-and-clients/run-a-node/#spinning-up-node"
                      variant="outline"
                      className="font-mono"
                    >
                      {t(
                        "page-run-a-node-build-your-own-software-option-2-button"
                      )}
                    </ButtonLink>
                  </CardFooter>
                </Card>
              </Grid>
            </Section>

            <Section
              id="help"
              className="flex w-full items-center gap-8 *:flex-1 max-md:flex-col-reverse"
            >
              <div className="flow">
                <h2>{t("page-run-a-node-community-title")}</h2>
                <p>{t("page-run-a-node-community-description-1")}</p>
                <p>{t("page-run-a-node-community-description-2")}</p>
                <div className="flex gap-4 text-center max-lg:flex-col">
                  <ButtonLink href="https://discord.com/invite/dappnode">
                    <Discord />
                    &nbsp;
                    {t("page-run-a-node-community-link-1")}
                  </ButtonLink>
                  <ButtonLink
                    href="/community/online/"
                    variant="outline"
                    isSecondary
                  >
                    {t("page-run-a-node-community-link-2")}
                  </ButtonLink>
                </div>
              </div>
              <Image
                src={community}
                alt=""
                sizes="(max-width: 480px) calc(100vw - 64px), (max-width: 1280px) calc((100vw - 96px) / 2), 624px"
                style={{ width: "624px", height: "auto" }}
              />
            </Section>

            <Section id="further-reading">
              <h2>{t("page-run-a-node-further-reading-title")}</h2>
              <UnorderedList>
                <ListItem>
                  <InlineLink href="https://github.com/ethereumbook/ethereumbook/blob/openedition/03clients.asciidoc#should-i-run-a-full-node">
                    {t("page-run-a-node-further-reading-1-link")}
                  </InlineLink>{" "}
                  - <i>{t("page-run-a-node-further-reading-1-author")}</i>
                </ListItem>
                <ListItem>
                  <InlineLink href="https://ethereum-on-arm-documentation.readthedocs.io/en/latest/">
                    {t("page-run-a-node-further-reading-2-link")}
                  </InlineLink>
                </ListItem>
                <ListItem>
                  <InlineLink href="https://vitalik.eth.limo/general/2021/05/23/scaling.html">
                    {t("page-run-a-node-further-reading-3-link")}
                  </InlineLink>{" "}
                  - <i>{t("page-run-a-node-further-reading-3-author")}</i>
                </ListItem>
              </UnorderedList>
            </Section>

            <Divider />

            <Section id="staking" className="space-y-space-2x">
              <Callout
                image={leslie}
                title={t("page-run-a-node-staking-title")}
                description={t("page-run-a-node-staking-description")}
              >
                <ButtonLink href="/staking/">
                  {t("page-run-a-node-staking-link")}
                </ButtonLink>
              </Callout>

              <div className="flow max-w-3xl">
                <h3 id="plan-on-staking" className="flex items-center gap-4">
                  <Emoji text=":cut_of_meat:" />
                  {t("page-run-a-node-staking-plans-title")}
                </h3>
                <p>
                  <Translation id="page-run-a-node:page-run-a-node-staking-plans-description" />
                </p>
                <p>
                  {t(
                    "page-run-a-node-staking-plans-ethstaker-link-description"
                  )}{" "}
                  -{" "}
                  <InlineLink href="https://youtu.be/C2wwu1IlhDc">
                    {t("page-run-a-node-staking-plans-ethstaker-link-label")}
                  </InlineLink>
                </p>

                <h3 id="rasp-pi" className="flex items-center gap-4">
                  <Emoji text=":pie:" />
                  {t("page-run-a-node-rasp-pi-title")}
                </h3>
                <p>{t("page-run-a-node-rasp-pi-description")}</p>
                <UnorderedList>
                  <ListItem>
                    <InlineLink href="https://ethereum-on-arm-documentation.readthedocs.io/en/latest">
                      {t("page-run-a-node-rasp-pi-note-2-link")}
                    </InlineLink>{" "}
                    - <i>{t("page-run-a-node-rasp-pi-note-2-description")}</i>
                  </ListItem>
                  <ListItem>
                    <InlineLink href="/developers/tutorials/run-node-raspberry-pi">
                      {t("page-run-a-node-rasp-pi-note-3-link")}
                    </InlineLink>{" "}
                    - <i>{t("page-run-a-node-rasp-pi-note-3-description")}</i>
                  </ListItem>
                </UnorderedList>
              </div>
            </Section>

            <Section>
              <QuizWidget quizKey="run-a-node" />
            </Section>

            <FileContributors
              className="my-10 border-t"
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

  const t = await getTranslations("page-run-a-node")

  return await getMetadata({
    locale,
    slug: ["run-a-node"],
    title: t("page-run-a-node-meta-title"),
    description: t("page-run-a-node-meta-description"),
    image: "/images/run-a-node/ethereum-inside.png",
  })
}

export default Page
