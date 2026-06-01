import {
  Castle,
  Landmark,
  LockKeyhole,
  Shield,
  SquareCode,
  User,
} from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { Lang, PageParams, ToCItem } from "@/lib/types"

import DocLink from "@/components/DocLink"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import {
  HighlightCard,
  HighlightStack,
  IconBox,
} from "@/components/HighlightCard"
import { Image } from "@/components/Image"
import { Emphasis, Strong } from "@/components/IntlStringElements"
import ListenToPlayer from "@/components/ListenToPlayer/lazy"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import Link, { LinkWithArrow } from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"

import { ENTERPRISE_ETHEREUM_URL } from "@/lib/constants"

import WhatIsEthereumPageJsonLD from "./page-jsonld"

import contributionBanner from "@/public/images/doge-shiba-robot-suit-at-computer.png"
import etherBanner from "@/public/images/eth-glyph-hands-palms-up.png"
import whatBanner from "@/public/images/four-people-doge-pink-3d-floating-eth-glyph.png"
import networksBanner from "@/public/images/heroes/futuristic-community-center-floating-glyph-talking-foreground.png"
import startBanner from "@/public/images/heroes/futuristic-marketplace-hub-counters-people-robots.jpg"
import howBanner from "@/public/images/person-repairing-vintage-computer-screwdriver.png"
import heroImg from "@/public/images/man-viewing-bazaar-through-three-windows.png"
import whenWhoBanner from "@/public/images/two-people-walking-and-talking.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations("page-what-is-ethereum")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("what-is-ethereum", locale as Lang)

  const tocItems: ToCItem[] = [
    { title: t("page-what-is-ethereum-toc-ethereum"), url: "#ethereum" },
    { title: t("page-what-is-ethereum-toc-network"), url: "#network" },
    { title: t("page-what-is-ethereum-toc-ether"), url: "#ether" },
    { title: t("page-what-is-ethereum-toc-how"), url: "#how" },
    { title: t("page-what-is-ethereum-toc-what"), url: "#what" },
    { title: t("page-what-is-ethereum-toc-start"), url: "#start" },
    {
      title: t("page-what-is-ethereum-toc-bitcoin"),
      url: "#bitcoin",
    },
    {
      title: t("page-what-is-ethereum-toc-when-who"),
      url: "#when-who",
    },
    { title: t("page-what-is-ethereum-toc-roadmap"), url: "#roadmap" },
  ]

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: "learn/what-is-ethereum", startDepth: 1 },
    heroImg,
    title: tocItems[0].title,
    description: (
      <>
        <p>{t("page-what-is-ethereum-hero-description-1")}</p>
        <p>{t("page-what-is-ethereum-hero-description-2")}</p>
      </>
    ),
  }

  const getId = (input: string) => {
    const parts = input.split("#")
    return parts.length > 1 ? parts[1] : ""
  }
  return (
    <>
      <WhatIsEthereumPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <div>
        <ContentHero {...heroProps} />

        <MainArticle className="grid w-full grid-cols-1 gap-x-20 px-4 py-8 lg:grid-cols-[1fr_auto] lg:px-10 lg:py-10">
          <div
            data-label="extras"
            className="mb-8 space-y-4 lg:col-start-1 lg:row-start-1 lg:mb-10"
          >
            <FileContributors
              className="!py-0 [&>div]:mt-0"
              contributors={contributors}
              lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            />

            <ListenToPlayer slug="what-is-ethereum" />
          </div>

          <div className="row-start-1 lg:col-start-2 lg:row-span-2">
            <TableOfContents variant="card" items={tocItems} isMobile />
            <TableOfContents variant="card" items={tocItems} />
          </div>

          <div className="max-w-[50rem] space-y-14 lg:col-start-1 lg:row-start-2">
            <Section id={getId(tocItems[0].url)} className="space-y-6">
              <p>
                {t.rich("page-what-is-ethereum-ethereum-intro-1", {
                  strong: Strong,
                  a: (chunks) => <Link href="/">{chunks}</Link>,
                })}
              </p>
              <p>
                {t.rich("page-what-is-ethereum-ethereum-intro-2", {
                  a: (chunks) => <Link href="/smart-contracts/">{chunks}</Link>,
                })}
              </p>
              <p>
                {t.rich("page-what-is-ethereum-ethereum-intro-3", {
                  strong: Strong,
                })}
              </p>
              <p>
                {t.rich("page-what-is-ethereum-ethereum-intro-4", {
                  strong: Strong,
                })}
              </p>
              <p>
                {t.rich("page-what-is-ethereum-ethereum-intro-5", {
                  strong: Strong,
                })}
              </p>
              <p>
                {t.rich("page-what-is-ethereum-ethereum-intro-6", {
                  millions: (chunks) => (
                    <Link href="https://tokenterminal.com/explorer/projects/ethereum/metrics/all">
                      {chunks}
                    </Link>
                  ),
                  billions: (chunks) => (
                    <Link href="https://defillama.com/chain/ethereum">
                      {chunks}
                    </Link>
                  ),
                  trillions: (chunks) => (
                    <Link href="https://www.gate.com/post/status/11248290">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
              <p>
                {t.rich("page-what-is-ethereum-ethereum-intro-7", {
                  strong: Strong,
                })}
              </p>
            </Section>

            <Section className="-scroll-mt-80 space-y-14">
              <Image
                src={networksBanner}
                alt={t("page-what-is-ethereum-banner-networks-alt")}
                sizes={`(max-width: 800px) 100vw, (max-width: ${screens.xl}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
              />

              <div className="space-y-6">
                <h2 id={getId(tocItems[1].url)} className="scroll-mt-28">
                  {tocItems[1].title}
                </h2>

                <p>
                  {t.rich("page-what-is-ethereum-network-intro-1", {
                    strong: Strong,
                  })}
                </p>

                <p>
                  {t.rich("page-what-is-ethereum-network-intro-2", {
                    strong: Strong,
                  })}
                </p>

                <p>
                  {t.rich("page-what-is-ethereum-network-intro-3", {
                    strong: Strong,
                  })}
                </p>
              </div>

              <HighlightStack data-label="ethereum-network-table">
                <HighlightCard>
                  <IconBox>
                    <Shield className="text-accent-a" />
                  </IconBox>
                  <CardContent spacing="md">
                    <CardTitle>
                      {t("page-what-is-ethereum-network-censorship-title")}
                    </CardTitle>
                    <CardParagraph>
                      {t("page-what-is-ethereum-network-censorship-desc-1")}
                    </CardParagraph>
                    <CardParagraph>
                      {t("page-what-is-ethereum-network-censorship-desc-2")}
                    </CardParagraph>
                  </CardContent>
                </HighlightCard>
                <HighlightCard>
                  <IconBox>
                    <LockKeyhole className="text-accent-b" />
                  </IconBox>
                  <CardContent spacing="md">
                    <CardTitle>
                      {t("page-what-is-ethereum-network-security-title")}
                    </CardTitle>
                    <CardParagraph>
                      {t("page-what-is-ethereum-network-security-desc-1")}
                    </CardParagraph>
                    <CardParagraph>
                      {t("page-what-is-ethereum-network-security-desc-2")}
                    </CardParagraph>
                  </CardContent>
                </HighlightCard>
                <HighlightCard>
                  <IconBox>
                    <Castle className="text-accent-c" />
                  </IconBox>
                  <CardContent spacing="md">
                    <CardTitle>
                      {t("page-what-is-ethereum-network-reliability-title")}
                    </CardTitle>
                    <CardParagraph>
                      {t.rich(
                        "page-what-is-ethereum-network-reliability-desc-1",
                        {
                          a: (chunks) => <Link href="#">{chunks}</Link>,
                        }
                      )}
                    </CardParagraph>
                    <CardParagraph>
                      {t("page-what-is-ethereum-network-reliability-desc-2")}
                    </CardParagraph>
                  </CardContent>
                </HighlightCard>
              </HighlightStack>

              <div data-label="layer-2-callout">
                <h3 className="mb-5 text-xl">
                  {t("page-what-is-ethereum-network-layer2-title")}
                </h3>

                <div className="space-y-6">
                  <p>{t("page-what-is-ethereum-network-layer2-desc-1")}</p>

                  <p>
                    {t.rich("page-what-is-ethereum-network-layer2-desc-2", {
                      optimism: (chunks) => (
                        <Link href="https://www.optimism.io/">{chunks}</Link>
                      ),
                      arbitrum: (chunks) => (
                        <Link href="https://arbitrum.io/">{chunks}</Link>
                      ),
                      zksync: (chunks) => (
                        <Link href="https://www.zksync.io/">{chunks}</Link>
                      ),
                      base: (chunks) => (
                        <Link href="https://www.base.org/">{chunks}</Link>
                      ),
                    })}
                  </p>
                </div>
              </div>

              <LinkWithArrow href="/what-is-the-ethereum-network/">
                {t("page-what-is-ethereum-network-learn-more")}
              </LinkWithArrow>
            </Section>

            <Section
              id={getId(tocItems[2].url)}
              className="space-y-8 rounded-4xl border border-accent-a/20 bg-linear-to-b from-accent-a/5 to-accent-a/15 px-4 py-6 lg:p-12"
            >
              <div className="flex flex-col items-center justify-center gap-4 xl:flex-row">
                <Image
                  src={etherBanner}
                  alt={t("page-what-is-ethereum-banner-ether-alt")}
                  sizes="224px"
                  className="w-56"
                />
                <h2 className="w-full text-3xl font-black lg:text-5xl">
                  {tocItems[2].title}
                </h2>
              </div>

              <div className="space-y-6">
                <p>{t("page-what-is-ethereum-ether-intro-1")}</p>
                <p>
                  {t.rich("page-what-is-ethereum-ether-intro-2", {
                    strong: Strong,
                  })}
                </p>
                <p>
                  {t.rich("page-what-is-ethereum-ether-intro-3", {
                    strong: Strong,
                  })}
                </p>
                <p>
                  {t.rich("page-what-is-ethereum-ether-intro-4", {
                    strong: Strong,
                  })}
                </p>
                <p>
                  {t.rich("page-what-is-ethereum-ether-intro-5", {
                    strong: Strong,
                  })}
                </p>
                <p>{t("page-what-is-ethereum-ether-intro-6")}</p>
              </div>

              <LinkWithArrow href="/eth/">
                {t("page-what-is-ethereum-ether-learn-more")}
              </LinkWithArrow>
            </Section>

            <Section
              id={getId(tocItems[3].url)}
              className="space-y-8 rounded-4xl border border-accent-c/20 bg-linear-to-b from-accent-c/5 to-accent-c/15 px-4 py-6 lg:p-12"
            >
              <div className="flex flex-col items-center gap-4 xl:flex-row-reverse">
                <Image
                  src={howBanner}
                  alt={t("page-what-is-ethereum-banner-how-alt")}
                  sizes="288px"
                  className="w-full max-w-72"
                />
                <h2 className="w-full text-3xl font-black lg:text-5xl">
                  {tocItems[3].title}
                </h2>
              </div>

              <div className="space-y-6">
                <p>
                  {t.rich("page-what-is-ethereum-how-intro-1", {
                    strong: Strong,
                  })}
                </p>
                <p>{t("page-what-is-ethereum-how-intro-2")}</p>
                <p>
                  {t.rich("page-what-is-ethereum-how-intro-3", {
                    strong: Strong,
                    a: (chunks) => (
                      <Link href="/energy-consumption/">{chunks}</Link>
                    ),
                  })}
                </p>
                <p>{t("page-what-is-ethereum-how-intro-4")}</p>
                <p>{t("page-what-is-ethereum-how-intro-5")}</p>
                <p className="text-lg font-bold">
                  {t("page-what-is-ethereum-how-example-1-title")}
                </p>
                <OrderedList className="[&>li]:mb-0.5">
                  <ListItem>
                    {t("page-what-is-ethereum-how-example-1-step-1")}
                  </ListItem>
                  <ListItem>
                    {t("page-what-is-ethereum-how-example-1-step-2")}
                  </ListItem>
                  <ListItem>
                    {t("page-what-is-ethereum-how-example-1-step-3")}
                  </ListItem>
                  <ListItem>
                    {t("page-what-is-ethereum-how-example-1-step-4")}
                  </ListItem>
                  <ListItem>
                    {t("page-what-is-ethereum-how-example-1-step-5")}
                  </ListItem>
                  <ListItem>
                    {t("page-what-is-ethereum-how-example-1-step-6")}
                  </ListItem>
                </OrderedList>
                <p className="text-lg font-bold">
                  {t("page-what-is-ethereum-how-example-2-title")}
                </p>
                <OrderedList className="[&>li]:mb-0">
                  <ListItem>
                    {t("page-what-is-ethereum-how-example-2-step-1")}
                  </ListItem>
                  <ListItem>
                    {t("page-what-is-ethereum-how-example-2-step-2")}
                  </ListItem>
                  <ListItem>
                    {t("page-what-is-ethereum-how-example-2-step-3")}
                  </ListItem>
                  <ListItem>
                    {t("page-what-is-ethereum-how-example-2-step-4")}
                  </ListItem>
                  <ListItem>
                    {t("page-what-is-ethereum-how-example-2-step-5")}
                  </ListItem>
                </OrderedList>
                <p>{t("page-what-is-ethereum-how-outro-1")}</p>
                <p>
                  {t.rich("page-what-is-ethereum-how-outro-2", {
                    strong: Strong,
                  })}
                </p>
                <div>
                  <LinkWithArrow href="/learn/">
                    {t("page-what-is-ethereum-how-learn-more-1")}
                  </LinkWithArrow>
                  <LinkWithArrow href="/developers/docs/">
                    {t("page-what-is-ethereum-how-learn-more-2")}
                  </LinkWithArrow>
                </div>
              </div>
            </Section>

            <Section id={getId(tocItems[4].url)} className="space-y-14">
              <Image
                src={whatBanner}
                alt={t("page-what-is-ethereum-banner-what-alt")}
                sizes="320px"
                className="mx-auto w-80 -scale-x-100"
              />
              <h2 className="w-full text-3xl/snug font-bold lg:text-4xl/tight">
                {tocItems[4].title}
              </h2>
              <div className="space-y-6">
                <p>{t("page-what-is-ethereum-what-intro-1")}</p>
                <p>
                  {t.rich("page-what-is-ethereum-what-intro-2", {
                    strong: Strong,
                    insurance: (chunks) => (
                      <Link href="https://blog.etherisc.com/etherisc-teams-up-with-chainlink-to-deliver-crop-insurance-in-kenya-137e433c29dc">
                        {chunks}
                      </Link>
                    ),
                    payment: (chunks) => (
                      <Link href="https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.19881.html">
                        {chunks}
                      </Link>
                    ),
                    aid: (chunks) => (
                      <Link href="https://www.wfp.org/building-blocks">
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
                <p>{t("page-what-is-ethereum-what-intro-3")}</p>
                <p>{t("page-what-is-ethereum-what-intro-4")}</p>
              </div>
              <HighlightStack data-label="what-is-table">
                <HighlightCard>
                  <IconBox>
                    <User className="text-accent-a" />
                  </IconBox>
                  <CardContent spacing="md">
                    <CardTitle>
                      {t("page-what-is-ethereum-what-consumers-title")}
                    </CardTitle>
                    <CardParagraph>
                      {t("page-what-is-ethereum-what-consumers-desc-1")}
                    </CardParagraph>
                    <CardParagraph>
                      {t("page-what-is-ethereum-what-consumers-desc-2")}
                    </CardParagraph>
                    <UnorderedList className="space-y-0.5! text-body-medium">
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-consumers-benefit-1",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-consumers-benefit-2",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-consumers-benefit-3",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t("page-what-is-ethereum-what-consumers-benefit-4")}
                      </ListItem>
                    </UnorderedList>
                  </CardContent>
                </HighlightCard>
                <HighlightCard>
                  <IconBox>
                    <SquareCode className="text-accent-b" />
                  </IconBox>
                  <CardContent spacing="md">
                    <CardTitle>
                      {t("page-what-is-ethereum-what-businesses-title")}
                    </CardTitle>
                    <UnorderedList className="space-y-0.5! text-body-medium">
                      <ListItem>
                        {t("page-what-is-ethereum-what-businesses-benefit-1")}
                      </ListItem>
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-businesses-benefit-2",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t("page-what-is-ethereum-what-businesses-benefit-3")}
                      </ListItem>
                    </UnorderedList>
                    <CardParagraph>
                      {t.rich("page-what-is-ethereum-what-businesses-example", {
                        a: (chunks) => (
                          <Link href="https://newsroom.paypal-corp.com/2023-08-07-PayPal-Launches-U-S-Dollar-Stablecoin">
                            {chunks}
                          </Link>
                        ),
                      })}
                    </CardParagraph>
                  </CardContent>
                </HighlightCard>
                <HighlightCard>
                  <IconBox>
                    <Landmark className="text-accent-c" />
                  </IconBox>
                  <CardContent spacing="md">
                    <CardTitle>
                      {t("page-what-is-ethereum-what-governments-title")}
                    </CardTitle>
                    <CardParagraph>
                      {t("page-what-is-ethereum-what-governments-intro")}
                    </CardParagraph>
                    <UnorderedList className="space-y-0.5! text-body-medium">
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-governments-benefit-1",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-governments-benefit-2",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-governments-benefit-3",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                    </UnorderedList>
                    <CardParagraph>
                      {t.rich(
                        "page-what-is-ethereum-what-governments-example-1",
                        {
                          a: (chunks) => (
                            <Link href="https://www.weforum.org/stories/2023/03/the-role-cryptocurrency-crypto-huge-in-ukraine-war-russia/">
                              {chunks}
                            </Link>
                          ),
                        }
                      )}
                    </CardParagraph>
                    <CardParagraph>
                      {t("page-what-is-ethereum-what-governments-example-2")}
                    </CardParagraph>
                  </CardContent>
                </HighlightCard>
              </HighlightStack>

              {/* // TODO: Re-enable when page ready */}
              {/* <LinkWithArrow href="/todo-add-path-when-ready/">
                {t("page-what-is-ethereum-what-learn-more")}
              </LinkWithArrow> */}
            </Section>

            <Section id={getId(tocItems[5].url)} className="space-y-14">
              <Image
                src={startBanner}
                alt={t("page-what-is-ethereum-banner-start-alt")}
                sizes={`(max-width: 800px) 100vw, (max-width: ${screens.xl}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
              />
              <div>
                <h2 className="mb-2 w-full text-3xl/snug font-bold lg:text-4xl/tight">
                  {tocItems[5].title}
                </h2>
                <div className="space-y-6">
                  <p>{t("page-what-is-ethereum-start-intro-1")}</p>
                  <p>{t("page-what-is-ethereum-start-intro-2")}</p>
                </div>
              </div>

              <Card variant="header-bar" size="lg">
                <CardHeader>
                  <User className="size-8 text-accent-a" />
                  <CardTitle>
                    {t("page-what-is-ethereum-start-individuals-title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardParagraph>
                    <strong>
                      {t("page-what-is-ethereum-start-individuals-desc-1")}
                    </strong>
                  </CardParagraph>

                  <CardParagraph>
                    {t.rich("page-what-is-ethereum-start-individuals-desc-3", {
                      zerion: (chunks) => (
                        <Link href="https://zerion.io/">{chunks}</Link>
                      ),
                      rainbow: (chunks) => (
                        <Link href="https://rainbow.me/">{chunks}</Link>
                      ),
                      coinbase: (chunks) => (
                        <Link href="https://www.coinbase.com/wallet">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </CardParagraph>

                  <UnorderedList className="space-y-0!">
                    <ListItem>
                      {t("page-what-is-ethereum-start-individuals-step-1")}
                    </ListItem>
                    <ListItem>
                      {t("page-what-is-ethereum-start-individuals-step-2")}
                    </ListItem>
                    <ListItem>
                      {t.rich(
                        "page-what-is-ethereum-start-individuals-step-3",
                        {
                          zora: (chunks) => (
                            <Link href="https://zora.co/">{chunks}</Link>
                          ),
                          uniswap: (chunks) => (
                            <Link href="https://app.uniswap.org/">
                              {chunks}
                            </Link>
                          ),
                          farcaster: (chunks) => (
                            <Link href="https://farcaster.xyz/">{chunks}</Link>
                          ),
                        }
                      )}
                    </ListItem>
                  </UnorderedList>

                  <CardParagraph>
                    {t("page-what-is-ethereum-start-individuals-desc-4")}
                  </CardParagraph>
                  <CardParagraph>
                    {t("page-what-is-ethereum-start-individuals-desc-5")}
                  </CardParagraph>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-4">
                    <ButtonLink href="/start/">
                      {t("page-what-is-ethereum-start-individuals-cta-1")}
                    </ButtonLink>
                    <ButtonLink href="/apps/" variant="outline">
                      {t("page-what-is-ethereum-start-individuals-cta-2")}
                    </ButtonLink>
                  </div>
                </CardFooter>
              </Card>

              <Card variant="header-bar" size="lg">
                <CardHeader>
                  <SquareCode className="size-8 text-accent-b" />
                  <CardTitle>
                    {t("page-what-is-ethereum-start-developers-title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardParagraph>
                    {t("page-what-is-ethereum-start-developers-desc-1")}
                  </CardParagraph>
                  <CardParagraph>
                    {t.rich("page-what-is-ethereum-start-developers-desc-2", {
                      a: (chunks) => (
                        <Link href="/developers/docs/">{chunks}</Link>
                      ),
                    })}
                  </CardParagraph>
                  <CardParagraph>
                    {t.rich("page-what-is-ethereum-start-developers-desc-3", {
                      hardhat: (chunks) => (
                        <Link href="https://hardhat.org/">{chunks}</Link>
                      ),
                      foundry: (chunks) => (
                        <Link href="https://getfoundry.sh/">{chunks}</Link>
                      ),
                      ethers: (chunks) => (
                        <Link href="https://docs.ethers.org/">{chunks}</Link>
                      ),
                      thirdweb: (chunks) => (
                        <Link href="https://thirdweb.com/">{chunks}</Link>
                      ),
                      moralis: (chunks) => (
                        <Link href="https://moralis.com/">{chunks}</Link>
                      ),
                    })}
                  </CardParagraph>
                  <CardParagraph>
                    {t("page-what-is-ethereum-start-developers-desc-4")}
                  </CardParagraph>
                </CardContent>
                <CardFooter>
                  <ButtonLink href="/developers/">
                    {t("page-what-is-ethereum-start-developers-cta")}
                  </ButtonLink>
                </CardFooter>
              </Card>

              <Card variant="header-bar" size="lg">
                <CardHeader>
                  <Landmark className="size-8 text-accent-c" />
                  <CardTitle>
                    {t("page-what-is-ethereum-start-business-title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardParagraph>
                    {t("page-what-is-ethereum-start-business-desc-1")}
                  </CardParagraph>
                  <CardParagraph>
                    {t("page-what-is-ethereum-start-business-desc-2")}
                  </CardParagraph>
                  <CardParagraph>
                    {t("page-what-is-ethereum-start-business-desc-3")}
                  </CardParagraph>
                  <UnorderedList className="*:[li]:mb-0">
                    <ListItem>
                      {t("page-what-is-ethereum-start-business-benefit-1")}
                    </ListItem>
                    <ListItem>
                      {t("page-what-is-ethereum-start-business-benefit-2")}
                    </ListItem>
                    <ListItem>
                      {t("page-what-is-ethereum-start-business-benefit-3")}
                    </ListItem>
                  </UnorderedList>
                  <CardParagraph>
                    {t.rich("page-what-is-ethereum-start-business-example", {
                      a: (chunks) => (
                        <Link href="https://www.shopify.com/news/stablecoins-on-shopify">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </CardParagraph>
                </CardContent>
                <CardFooter>
                  <ButtonLink href={ENTERPRISE_ETHEREUM_URL}>
                    {t("page-what-is-ethereum-start-business-cta")}
                  </ButtonLink>
                </CardFooter>
              </Card>
            </Section>

            <Section id={getId(tocItems[6].url)}>
              <h2 className="mb-4 w-full text-3xl/snug font-bold lg:text-4xl/tight">
                {tocItems[6].title}
              </h2>

              <div className="space-y-6">
                <p>{t("page-what-is-ethereum-bitcoin-intro-1")}</p>

                <p>
                  {t.rich("page-what-is-ethereum-bitcoin-intro-2", {
                    strong: Strong,
                  })}
                </p>

                <div>
                  <h3 className="mt-12 mb-1 text-xl">
                    {t("page-what-is-ethereum-bitcoin-comparison-1-title")}
                  </h3>
                  <p>{t("page-what-is-ethereum-bitcoin-comparison-1-desc")}</p>
                </div>

                <div>
                  <h3 className="mt-12 mb-1 text-xl">
                    {t("page-what-is-ethereum-bitcoin-comparison-2-title")}
                  </h3>
                  <p>{t("page-what-is-ethereum-bitcoin-comparison-2-desc")}</p>
                </div>

                <div>
                  <h3 className="mt-12 mb-1 text-xl">
                    {t("page-what-is-ethereum-bitcoin-comparison-3-title")}
                  </h3>
                  <div className="space-y-6">
                    <p>
                      {t("page-what-is-ethereum-bitcoin-comparison-3-desc-1")}
                    </p>
                    <p>
                      {t("page-what-is-ethereum-bitcoin-comparison-3-desc-2")}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mt-12 mb-1 text-xl">
                    {t("page-what-is-ethereum-bitcoin-comparison-4-title")}
                  </h3>
                  <div className="space-y-6">
                    <p>
                      {t.rich(
                        "page-what-is-ethereum-bitcoin-comparison-4-desc-1",
                        { strong: Strong }
                      )}
                    </p>
                    <p>
                      {t("page-what-is-ethereum-bitcoin-comparison-4-desc-2")}
                    </p>
                    <p>
                      {t("page-what-is-ethereum-bitcoin-comparison-4-desc-3")}
                    </p>
                  </div>
                </div>

                <LinkWithArrow href="/ethereum-vs-bitcoin/">
                  {t("page-what-is-ethereum-bitcoin-learn-more")}
                </LinkWithArrow>
              </div>
            </Section>

            <Section id={getId(tocItems[7].url)} className="space-y-14">
              <Image
                src={whenWhoBanner}
                alt={t("page-what-is-ethereum-banner-when-who-alt")}
                sizes="176px"
                className="mx-auto w-44"
              />

              <div className="space-y-4">
                <h2 className="w-full text-3xl/snug font-bold lg:text-4xl/tight">
                  {tocItems[7].title}
                </h2>
                <div className="space-y-8">
                  <div className="space-y-6">
                    <p>{t("page-what-is-ethereum-when-who-intro-1")}</p>
                    <p>{t("page-what-is-ethereum-when-who-intro-2")}</p>
                    <p>{t("page-what-is-ethereum-when-who-intro-3")}</p>
                    <p>{t("page-what-is-ethereum-when-who-intro-4")}</p>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl">
                      {t("page-what-is-ethereum-when-who-history-title")}
                    </h3>
                    <OrderedList className="m-0 list-none [&>li]:mb-0">
                      <ListItem>
                        <span className="font-bold text-body-medium">
                          2013:
                        </span>{" "}
                        {t("page-what-is-ethereum-when-who-history-2013")}
                      </ListItem>
                      <ListItem>
                        <span className="font-bold text-body-medium">
                          2014:
                        </span>{" "}
                        {t("page-what-is-ethereum-when-who-history-2014")}
                      </ListItem>
                      <ListItem>
                        <span className="font-bold text-body-medium">
                          2015:
                        </span>{" "}
                        {t.rich("page-what-is-ethereum-when-who-history-2015", {
                          em: Emphasis,
                        })}
                      </ListItem>
                      <ListItem>
                        <span className="font-bold text-body-medium">
                          2016:
                        </span>{" "}
                        {t("page-what-is-ethereum-when-who-history-2016")}{" "}
                      </ListItem>
                      <ListItem>
                        <span className="font-bold text-body-medium">
                          2020:
                        </span>{" "}
                        {t("page-what-is-ethereum-when-who-history-2020")}{" "}
                      </ListItem>
                      <ListItem>
                        <span className="font-bold text-body-medium">
                          2021:
                        </span>{" "}
                        {t.rich("page-what-is-ethereum-when-who-history-2021", {
                          em: Emphasis,
                        })}{" "}
                      </ListItem>
                      <ListItem>
                        <span className="font-bold text-body-medium">
                          2022:
                        </span>{" "}
                        {t.rich("page-what-is-ethereum-when-who-history-2022", {
                          em: Emphasis,
                        })}{" "}
                      </ListItem>
                      <ListItem>
                        <span className="font-bold text-body-medium">
                          2025:
                        </span>{" "}
                        {t.rich("page-what-is-ethereum-when-who-history-2025", {
                          em: Emphasis,
                        })}{" "}
                      </ListItem>
                    </OrderedList>
                    <p>{t("page-what-is-ethereum-when-who-governance-1")}</p>
                  </div>
                  <Image
                    src={contributionBanner}
                    alt={t("page-what-is-ethereum-banner-contributing-alt")}
                    sizes="208px"
                    className="mx-auto w-52"
                  />
                  <div className="space-y-6">
                    <h3 className="text-xl">
                      {t("page-what-is-ethereum-when-who-contributors-title")}
                    </h3>
                    <UnorderedList className="[&>li]:mb-0">
                      <ListItem>
                        {t("page-what-is-ethereum-when-who-contributors-1")}
                      </ListItem>
                      <ListItem>
                        {t("page-what-is-ethereum-when-who-contributors-2")}
                      </ListItem>
                      <ListItem>
                        {" "}
                        {t("page-what-is-ethereum-when-who-contributors-3")}
                      </ListItem>
                      <ListItem>
                        {t("page-what-is-ethereum-when-who-contributors-4")}
                      </ListItem>
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-when-who-contributors-5",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                    </UnorderedList>
                    <p>
                      {t.rich("page-what-is-ethereum-when-who-governance-2", {
                        strong: Strong,
                      })}
                    </p>
                    <p>
                      {t.rich("page-what-is-ethereum-when-who-governance-3", {
                        eips: (chunks) => (
                          <Link href="https://eips.ethereum.org/">
                            {chunks}
                          </Link>
                        ),
                        governance: (chunks) => (
                          <Link href="/governance/#formal-process">
                            {chunks}
                          </Link>
                        ),
                      })}
                    </p>
                    <p>{t("page-what-is-ethereum-when-who-governance-4")}</p>
                  </div>
                  <LinkWithArrow href="/ethereum-history-founder-and-ownership/">
                    {t("page-what-is-ethereum-when-who-learn-more")}
                  </LinkWithArrow>
                </div>
              </div>
            </Section>

            <Section id={getId(tocItems[8].url)} className="space-y-4">
              <h2 className="w-full text-3xl/snug font-bold lg:text-4xl/tight">
                {tocItems[8].title}
              </h2>
              <div className="space-y-8">
                <div className="space-y-6">
                  <p>{t("page-what-is-ethereum-roadmap-intro-1")}</p>
                  <p>{t("page-what-is-ethereum-roadmap-intro-2")} </p>
                  <p>
                    {t.rich("page-what-is-ethereum-roadmap-intro-3", {
                      a: (chunks) => (
                        <Link href="/roadmap/pectra/">{chunks}</Link>
                      ),
                    })}
                  </p>
                  <p>
                    {t.rich("page-what-is-ethereum-roadmap-priorities-intro", {
                      a: (chunks) => (
                        <Link href="https://blog.ethereum.org/2025/04/28/next-chapter">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>

                  <UnorderedList className="[&>li]:mb-0">
                    <ListItem>
                      {t("page-what-is-ethereum-roadmap-priority-1")}
                    </ListItem>
                    <ListItem>
                      {t("page-what-is-ethereum-roadmap-priority-2")}
                    </ListItem>
                  </UnorderedList>

                  <p>{t("page-what-is-ethereum-roadmap-outro-1")}</p>
                  <p>
                    {t.rich("page-what-is-ethereum-roadmap-outro-2", {
                      a: (chunks) => <Link href="/community/">{chunks}</Link>,
                    })}
                  </p>
                </div>

                <LinkWithArrow href="/roadmap/">
                  {t("page-what-is-ethereum-roadmap-learn-more")}
                </LinkWithArrow>
              </div>
            </Section>

            <Section id="further-reading" className="space-y-8">
              <h2 className="w-full text-3xl/snug font-bold lg:text-4xl/tight">
                {t("page-what-is-ethereum-further-reading-title")}
              </h2>
              <UnorderedList className="ms-0 list-none">
                <ListItem>
                  <DocLink href="/wallets/">
                    {t("page-what-is-ethereum-further-reading-wallets")}
                  </DocLink>
                </ListItem>
                <ListItem>
                  <DocLink href="/eth/">
                    {t("page-what-is-ethereum-further-reading-eth")}
                  </DocLink>
                </ListItem>
                <ListItem>
                  <DocLink href="/web3/">
                    {t("page-what-is-ethereum-further-reading-web3")}
                  </DocLink>
                </ListItem>
                <ListItem>
                  <DocLink href="/layer-2/networks/">
                    {t("page-what-is-ethereum-further-reading-networks")}
                  </DocLink>
                </ListItem>
              </UnorderedList>
            </Section>

            <FeedbackCard />
          </div>
        </MainArticle>
      </div>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-what-is-ethereum")

  return await getMetadata({
    locale,
    slug: ["what-is-ethereum"],
    title: t("page-what-is-ethereum-meta-title"),
    description: t("page-what-is-ethereum-meta-description"),
    image: "/images/man-viewing-bazaar-through-three-windows.png",
  })
}

export default Page
