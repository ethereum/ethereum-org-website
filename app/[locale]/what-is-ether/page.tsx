import { Landmark, SquareCode, User } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, ToCItem } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import {
  HighlightCard,
  HighlightStack,
  IconBox,
} from "@/components/HighlightCard"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import { Alert, AlertContent, AlertEmoji } from "@/components/ui/alert"
import { CardParagraph, CardTitle } from "@/components/ui/card"
import Link, { LinkWithArrow } from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import GasTable from "./_components/GasTable"
import WhatIsEtherPageJsonLD from "./page-jsonld"

import { getEthPrice, getGasPriceData } from "@/lib/data"
import heroImg from "@/public/images/eth.png"
import ethOrgLogo from "@/public/images/eth-org-logo.png"
import developersHubHero from "@/public/images/heroes/developers-hub-hero.png"
import impactTransparent from "@/public/images/impact_transparent.png"
import infrastructureTransparent from "@/public/images/infrastructure_transparent.png"

const Page = async (props: { params: Promise<{ locale: Lang }> }) => {
  const params = await props.params
  const { locale } = params
  setRequestLocale(locale)

  const t = await getTranslations("page-what-is-ether")

  const [
    { contributors, lastEditLocaleTimestamp },
    gasPriceData,
    ethPriceData,
  ] = await Promise.all([
    getAppPageContributorInfo("what-is-ether", locale as Lang),
    getGasPriceData(),
    getEthPrice(),
  ])

  const gasTableInitialData =
    gasPriceData && ethPriceData && !("error" in ethPriceData)
      ? { gasPrice: gasPriceData.gasPrice, ethPriceUSD: ethPriceData.value }
      : null

  const heroProps: ContentHeroProps = {
    breadcrumbs: {
      slug: "what-is-ether",
      startDepth: 1,
    },
    heroImg,
    title: t("page-what-is-ether-title"),
    description: (
      <>
        <p>{t("page-what-is-ether-hero-description-1")}</p>
      </>
    ),
  }

  const tocItems: ToCItem[] = [
    { title: t("page-what-is-ether-title"), url: "#what-is-ether" },
    { title: t("page-what-is-ether-how-to-buy-eth"), url: "#how-to-buy-eth" },
    {
      title: t("page-what-is-ether-how-to-send-and-receive-eth"),
      url: "#how-to-send-and-receive-eth",
    },
    {
      title: t("page-what-is-ether-how-long-does-it-take-to-send-eth"),
      url: "#how-long-does-it-take-to-send-eth",
    },
    {
      title: t("page-what-is-ether-how-much-does-it-cost-to-send-eth"),
      url: "#how-much-does-it-cost-to-send-eth",
    },
    {
      title: t("page-what-is-ether-what-is-the-eth-supply"),
      url: "#what-is-the-eth-supply",
    },
    {
      title: t("page-what-is-ether-what-is-the-distribution-of-eth"),
      url: "#what-is-the-distribution-of-eth",
    },
    {
      title: t("page-what-is-ether-what-makes-eth-valuable"),
      url: "#what-makes-eth-valuable",
    },
    {
      title: t("page-what-is-ether-what-is-wrapping-eth"),
      url: "#what-is-wrapping-eth",
    },
  ]

  const getId = (input: string) => {
    const parts = input.split("#")
    return parts.length > 1 ? parts[1] : ""
  }

  return (
    <>
      <WhatIsEtherPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <ContentHero {...heroProps} />
      <MainArticle className="grid w-full grid-cols-1 gap-x-20 px-4 py-8 lg:grid-cols-[1fr_auto] lg:px-10 lg:py-10">
        <FileContributors
          className="mb-8 py-0! lg:col-start-1 lg:row-start-1 lg:mb-10 [&>div]:mt-0"
          contributors={contributors}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        />

        <div className="row-start-1 lg:col-start-2 lg:row-span-2">
          <TableOfContents variant="card" items={tocItems} isMobile />
          <TableOfContents variant="card" items={tocItems} />
        </div>

        <div className="flow max-w-3xl lg:col-start-1 lg:row-start-2">
          <Section id={getId(tocItems[0].url)}>
            <p>{t("page-what-is-ether-what-is-ether-description-1")}</p>
            <p>
              {t.rich("page-what-is-ether-what-is-ether-description-2", {
                strong: Strong,
              })}
            </p>
            <OrderedList>
              <ListItem>
                {t("page-what-is-ether-what-is-ether-description-3")}
              </ListItem>
              <ListItem>
                {t("page-what-is-ether-what-is-ether-description-4")}
              </ListItem>
            </OrderedList>
            <p>
              {t.rich("page-what-is-ether-what-is-ether-description-5", {
                assets: (chunks) => (
                  <Link href="https://companiesmarketcap.com/assets-by-market-cap/">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <HighlightStack data-label="ethereum-network-table">
              <HighlightCard>
                <IconBox>
                  <User className="text-accent-a" />
                </IconBox>
                <div className="space-y-2!">
                  <CardTitle>
                    {t("page-what-is-ether-what-is-ether-description-6")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-what-is-ether-what-is-ether-description-7")}
                  </CardParagraph>
                </div>
              </HighlightCard>
              <HighlightCard>
                <IconBox>
                  <SquareCode className="text-accent-b" />
                </IconBox>
                <div className="space-y-2!">
                  <CardTitle>
                    {t("page-what-is-ether-what-is-ether-description-8")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-what-is-ether-what-is-ether-description-9")}
                  </CardParagraph>
                </div>
              </HighlightCard>
              <HighlightCard>
                <IconBox>
                  <Landmark className="text-accent-c" />
                </IconBox>
                <div className="space-y-2!">
                  <CardTitle>
                    {t("page-what-is-ether-what-is-ether-description-10")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-what-is-ether-what-is-ether-description-11")}
                  </CardParagraph>
                </div>
              </HighlightCard>
            </HighlightStack>
            <LinkWithArrow href="/staking/">
              {t("page-what-is-ether-what-is-ether-description-12")}
            </LinkWithArrow>
          </Section>

          <Section id={getId(tocItems[1].url)}>
            <h2>{tocItems[1].title}</h2>
            <p>
              {t.rich("page-what-is-ether-how-to-buy-eth-description-1", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-what-is-ether-how-to-buy-eth-description-2")}</p>
            <Alert variant="warning">
              <AlertEmoji text="💡" />
              <AlertContent>
                <p>
                  {t.rich("page-what-is-ether-how-to-buy-eth-description-3", {
                    strong: Strong,
                  })}
                </p>
                <p className="mt-2">
                  {t.rich("page-what-is-ether-how-to-buy-eth-description-4", {
                    strong: Strong,
                  })}
                </p>
                <UnorderedList className="mt-2 mb-0 [&>li]:mb-0.5">
                  <ListItem>
                    {t.rich("page-what-is-ether-how-to-buy-eth-description-5", {
                      strong: Strong,
                    })}
                  </ListItem>
                  <ListItem>
                    {t.rich("page-what-is-ether-how-to-buy-eth-description-6", {
                      strong: Strong,
                    })}
                  </ListItem>
                </UnorderedList>
              </AlertContent>
            </Alert>
            <p className="text-xl">
              <strong>
                {t("page-what-is-ether-how-to-buy-eth-description-7")}
              </strong>
            </p>
            <UnorderedList>
              <ListItem>
                {t.rich("page-what-is-ether-how-to-buy-eth-description-8", {
                  strong: Strong,
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-what-is-ether-how-to-buy-eth-description-9", {
                  strong: Strong,
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-what-is-ether-how-to-buy-eth-description-10", {
                  strong: Strong,
                })}
              </ListItem>
            </UnorderedList>
            <p>
              {t.rich("page-what-is-ether-how-to-buy-eth-description-11", {
                strong: Strong,
              })}
            </p>
            <p className="text-xl">
              <strong>
                {t("page-what-is-ether-how-to-buy-eth-description-12")}
              </strong>
            </p>
            <UnorderedList>
              <ListItem>
                {t.rich("page-what-is-ether-how-to-buy-eth-description-13", {
                  strong: Strong,
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-what-is-ether-how-to-buy-eth-description-14", {
                  strong: Strong,
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-what-is-ether-how-to-buy-eth-description-15", {
                  strong: Strong,
                })}
              </ListItem>
            </UnorderedList>
            <LinkWithArrow href="/get-eth/">
              {t("page-what-is-ether-how-to-buy-eth-description-16")}
            </LinkWithArrow>
          </Section>

          <Section id={getId(tocItems[2].url)}>
            <Image
              src={ethOrgLogo}
              alt="Ethereum.org Logo"
              className="mx-auto max-w-[123px]"
              sizes="123px"
            />
            <h2>{tocItems[2].title}</h2>
            <p>
              {t.rich(
                "page-what-is-ether-how-to-send-and-receive-eth-description-1",
                {
                  strong: Strong,
                }
              )}
            </p>
            <p>
              {t.rich(
                "page-what-is-ether-how-to-send-and-receive-eth-description-2",
                {
                  strong: Strong,
                }
              )}
            </p>
            <p>
              {t.rich(
                "page-what-is-ether-how-to-send-and-receive-eth-description-3",
                {
                  strong: Strong,
                  howToUseWallet: (chunks) => (
                    <Link href="/guides/how-to-use-a-wallet/">{chunks}</Link>
                  ),
                }
              )}
            </p>
            <Alert variant="warning">
              <AlertEmoji text="💡" />
              <AlertContent>
                <p>
                  {t.rich("page-what-is-ether-how-to-buy-eth-description-3", {
                    strong: Strong,
                  })}
                </p>
                <p>
                  {t("page-what-is-ether-how-to-send-and-receive-eth-callout")}
                </p>
              </AlertContent>
            </Alert>
            <p>
              {t(
                "page-what-is-ether-how-to-send-and-receive-eth-description-7"
              )}
            </p>
            <LinkWithArrow href="/what-is-ethereum/">
              {t(
                "page-what-is-ether-how-to-send-and-receive-eth-description-8"
              )}
            </LinkWithArrow>
          </Section>

          <Section id={getId(tocItems[3].url)}>
            <h2>{tocItems[3].title}</h2>
            <p>
              {t(
                "page-what-is-ether-how-long-does-it-take-to-send-eth-description-1"
              )}
            </p>
            <p>
              {t(
                "page-what-is-ether-how-long-does-it-take-to-send-eth-description-2"
              )}
            </p>
            <p>
              {t(
                "page-what-is-ether-how-long-does-it-take-to-send-eth-description-3"
              )}
            </p>
          </Section>

          <Section id={getId(tocItems[4].url)}>
            <Image
              src={infrastructureTransparent}
              alt="Ethereum.org Logo"
              className="mx-auto max-w-[330px]"
              sizes="330px"
            />
            <h2>{tocItems[4].title}</h2>
            <p>
              {t.rich(
                "page-what-is-ether-how-much-does-it-cost-to-send-eth-description-1",
                {
                  strong: Strong,
                }
              )}
            </p>
            <GasTable
              labels={{
                transactionType: t(
                  "page-what-is-ether-gas-table-transaction-type"
                ),
                typicalCostRange: t(
                  "page-what-is-ether-gas-table-typical-cost-range"
                ),
                estimatedGasUnits: t(
                  "page-what-is-ether-gas-table-estimated-gas-units"
                ),
                row1: t("page-what-is-ether-gas-table-row-1-1"),
                row2: t("page-what-is-ether-gas-table-row-2-1"),
                row3: t("page-what-is-ether-gas-table-row-3-1"),
              }}
              locale={locale}
              initialData={gasTableInitialData}
            />
          </Section>

          <Section>
            <h3>{t("page-what-is-ether-l2s")}</h3>
            <p>
              {t.rich("page-what-is-ether-l2s-description-1", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-what-is-ether-l2s-description-2", {
                strong: Strong,
                optimism: (chunks) => (
                  <Link href="https://optimism.io/">{chunks}</Link>
                ),
                arbitrum: (chunks) => (
                  <Link href="https://arbitrum.io/">{chunks}</Link>
                ),
              })}
            </p>
            <p>{t("page-what-is-ether-l2s-description-3")}</p>
            <p>
              {t.rich("page-what-is-ether-l2s-description-4", {
                strong: Strong,
              })}
            </p>
          </Section>

          <Section id={getId(tocItems[5].url)}>
            <Image
              src={developersHubHero}
              alt="Ethereum.org Logo"
              className="mx-auto"
              sizes={`(max-width: 832px) calc(100vw - 32px), 800px`}
            />
            <h2>{tocItems[5].title}</h2>
            <p>
              {t("page-what-is-ether-what-is-the-eth-supply-description-1")}
            </p>
            <UnorderedList>
              <ListItem>
                {t("page-what-is-ether-what-is-the-eth-supply-description-2")}
              </ListItem>
              <ListItem>
                {t("page-what-is-ether-what-is-the-eth-supply-description-3")}
              </ListItem>
              <ListItem>
                {t("page-what-is-ether-what-is-the-eth-supply-description-4")}
              </ListItem>
            </UnorderedList>
            <p>
              {t.rich(
                "page-what-is-ether-what-is-the-eth-supply-description-5",
                {
                  strong: Strong,
                }
              )}
            </p>
            <p>
              {t.rich(
                "page-what-is-ether-what-is-the-eth-supply-description-6",
                {
                  etherscan: (chunks) => (
                    <Link href="https://etherscan.io/">{chunks}</Link>
                  ),
                  ultrasound: (chunks) => (
                    <Link href="https://ultrasound.money/">{chunks}</Link>
                  ),
                }
              )}
            </p>
          </Section>

          <Section id={getId(tocItems[6].url)}>
            <h2>{tocItems[6].title}</h2>
            <p>
              {t.rich(
                "page-what-is-ether-what-is-the-distribution-of-eth-description-1",
                {
                  etherscan: (chunks) => (
                    <Link href="https://etherscan.io/chart/address">
                      {chunks}
                    </Link>
                  ),
                }
              )}
            </p>
          </Section>

          <Section>
            <h3>{t("page-what-is-ether-breakdown")}</h3>
            <UnorderedList>
              <ListItem>
                {t.rich("page-what-is-ether-breakdown-description-1", {
                  strong: Strong,
                  beaconchain: (chunks) => (
                    <Link href="https://beaconcha.in/">{chunks}</Link>
                  ),
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-what-is-ether-breakdown-description-2", {
                  strong: Strong,
                  unchained: (chunks) => (
                    <Link href="https://unchainedcrypto.com/amount-of-bitcoin-and-ether-on-exchanges-reach-record-multi-year-lows/">
                      {chunks}
                    </Link>
                  ),
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-what-is-ether-breakdown-description-3", {
                  strong: Strong,
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-what-is-ether-breakdown-description-4", {
                  strong: Strong,
                  ef: (chunks) => (
                    <Link href="https://ethereum.foundation/report-2024.pdf">
                      {chunks}
                    </Link>
                  ),
                })}
              </ListItem>
            </UnorderedList>
          </Section>

          <Section>
            <Image
              src={impactTransparent}
              alt="Ethereum.org Logo"
              className="mx-auto max-w-[214px]"
              sizes="214px"
            />
            <h3>{t("page-what-is-ether-who-holds-most")}</h3>
            <p>{t("page-what-is-ether-who-holds-most-description-1")}</p>
            <p>{t("page-what-is-ether-who-holds-most-description-2")}</p>
            <UnorderedList>
              <ListItem>
                {t.rich("page-what-is-ether-who-holds-most-description-3", {
                  staked: (chunks) => <Link href="/staking/">{chunks}</Link>,
                })}
              </ListItem>
              <ListItem>
                {t("page-what-is-ether-who-holds-most-description-4")}
              </ListItem>
              <ListItem>
                {t("page-what-is-ether-who-holds-most-description-5")}
              </ListItem>
            </UnorderedList>
            <p>
              {t.rich("page-what-is-ether-who-holds-most-description-6", {
                etherscan: (chunks) => (
                  <Link href="https://etherscan.io/accounts">{chunks}</Link>
                ),
              })}
            </p>
          </Section>

          <Section>
            <h3>{t("page-what-is-ether-distribution")}</h3>
            <p>{t("page-what-is-ether-distribution-description-1")}</p>
          </Section>

          <Section id={getId(tocItems[7].url)}>
            <h2>{tocItems[7].title}</h2>
            <p>
              {t("page-what-is-ether-what-makes-eth-valuable-description-1")}
            </p>
            <p>
              {t.rich(
                "page-what-is-ether-what-makes-eth-valuable-description-2",
                {
                  strong: Strong,
                }
              )}
            </p>
            <p>
              {t.rich(
                "page-what-is-ether-what-makes-eth-valuable-description-3",
                {
                  strong: Strong,
                }
              )}
            </p>
            <p>
              {t.rich(
                "page-what-is-ether-what-makes-eth-valuable-description-4",
                {
                  strong: Strong,
                }
              )}
            </p>
            <p>
              {t.rich(
                "page-what-is-ether-what-makes-eth-valuable-description-5",
                {
                  strong: Strong,
                  ultrasound: (chunks) => (
                    <Link href="https://ultrasound.money/?timeFrame=since_burn">
                      {chunks}
                    </Link>
                  ),
                }
              )}
            </p>
          </Section>

          <Section id={getId(tocItems[8].url)}>
            <h2>{tocItems[8].title}</h2>
            <p>{t("page-what-is-ether-what-is-wrapping-eth-description-1")}</p>
            <p>{t("page-what-is-ether-what-is-wrapping-eth-description-2")}</p>
            <UnorderedList>
              <ListItem>
                {t.rich(
                  "page-what-is-ether-what-is-wrapping-eth-description-3",
                  {
                    strong: Strong,
                    uniswap: (chunks) => (
                      <Link href="https://uniswap.org/">{chunks}</Link>
                    ),
                  }
                )}
              </ListItem>
              <ListItem>
                {t.rich(
                  "page-what-is-ether-what-is-wrapping-eth-description-4",
                  {
                    strong: Strong,
                    aave: (chunks) => (
                      <Link href="https://aave.com/">{chunks}</Link>
                    ),
                  }
                )}
              </ListItem>
              <ListItem>
                {t.rich(
                  "page-what-is-ether-what-is-wrapping-eth-description-5",
                  {
                    strong: Strong,
                    opensea: (chunks) => (
                      <Link href="https://opensea.io/">{chunks}</Link>
                    ),
                  }
                )}
              </ListItem>
            </UnorderedList>
            <p>{t("page-what-is-ether-what-is-wrapping-eth-description-6")}</p>
            <LinkWithArrow href="/wrapped-eth/">
              {t("page-what-is-ether-what-is-wrapping-eth-description-7")}
            </LinkWithArrow>
          </Section>
        </div>
      </MainArticle>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations("page-what-is-ether")

  return await getMetadata({
    locale,
    slug: ["what-is-ether"],
    title: t("page-what-is-ether-meta-title"),
    description: t("page-what-is-ether-meta-description"),
    twitterDescription: t("page-what-is-ether-twitter-meta-description"),
  })
}

export default Page
