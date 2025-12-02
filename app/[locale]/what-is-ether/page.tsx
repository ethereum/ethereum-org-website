import { Landmark, SquareCode, User } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { CommitHistory, Lang, ToCItem } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import {
  HighlightCard,
  HighlightCardContent,
  HighlightStack,
  IconBox,
} from "@/components/HighlightCard"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import { Alert, AlertContent, AlertEmoji } from "@/components/ui/alert"
import { CardTitle } from "@/components/ui/card"
import Link, { LinkWithArrow } from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import GasTable from "./_components/GasTable"
import WhatIsEtherPageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/eth.png"
import ethOrgLogo from "@/public/images/eth-org-logo.png"
import developersHubHero from "@/public/images/heroes/developers-hub-hero.png"
import impactTransparent from "@/public/images/impact_transparent.png"
import infrastructureTransparent from "@/public/images/infrastructure_transparent.png"

const Page = async ({ params }: { params: { locale: Lang } }) => {
  const { locale } = params

  const t = await getTranslations({
    namespace: "page-what-is-ether",
  })

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "what-is-ether",
      locale as Lang,
      commitHistoryCache
    )

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
        <div
          data-label="extras"
          className="mb-8 space-y-4 lg:col-start-1 lg:row-start-1 lg:mb-10"
        >
          <FileContributors
            className="!py-0 [&>div]:mt-0"
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
        </div>

        <div className="row-start-1 lg:col-start-2 lg:row-span-2">
          <TableOfContents variant="card" items={tocItems} isMobile />
          <TableOfContents variant="card" items={tocItems} />
        </div>

        <div className="max-w-[50rem] space-y-14 lg:col-start-1 lg:row-start-2">
          <Section id={getId(tocItems[0].url)} className="space-y-6">
            <p>{t("page-what-is-ether-what-is-ether-description-1")}</p>
            <p>
              {t.rich("page-what-is-ether-what-is-ether-description-2", {
                strong: Strong,
              })}
            </p>
            <OrderedList className="[&>li]:mb-0.5">
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
            <div className="py-14">
              <HighlightStack data-label="ethereum-network-table">
                <HighlightCard>
                  <IconBox>
                    <User className="text-accent-a" />
                  </IconBox>
                  <div>
                    <CardTitle className="mb-2">
                      {t("page-what-is-ether-what-is-ether-description-6")}
                    </CardTitle>
                    <HighlightCardContent>
                      <p>
                        {t("page-what-is-ether-what-is-ether-description-7")}
                      </p>
                    </HighlightCardContent>
                  </div>
                </HighlightCard>
                <HighlightCard>
                  <IconBox>
                    <SquareCode className="text-accent-b" />
                  </IconBox>
                  <div>
                    <CardTitle className="mb-2">
                      {t("page-what-is-ether-what-is-ether-description-8")}
                    </CardTitle>
                    <HighlightCardContent>
                      <p>
                        {t("page-what-is-ether-what-is-ether-description-9")}
                      </p>
                    </HighlightCardContent>
                  </div>
                </HighlightCard>
                <HighlightCard>
                  <IconBox>
                    <Landmark className="text-accent-c" />
                  </IconBox>
                  <div>
                    <CardTitle className="mb-2">
                      {t("page-what-is-ether-what-is-ether-description-10")}
                    </CardTitle>
                    <HighlightCardContent>
                      <p>
                        {t("page-what-is-ether-what-is-ether-description-11")}
                      </p>
                    </HighlightCardContent>
                  </div>
                </HighlightCard>
              </HighlightStack>
            </div>
            <LinkWithArrow href="/staking/">
              {t("page-what-is-ether-what-is-ether-description-12")}
            </LinkWithArrow>
          </Section>

          <Section id={getId(tocItems[1].url)} className="space-y-6">
            <h2 id={getId(tocItems[1].url)} className="scroll-mt-28">
              {tocItems[1].title}
            </h2>
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
                <UnorderedList className="mb-0 mt-2 [&>li]:mb-0.5">
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

          <Section id={getId(tocItems[2].url)} className="space-y-14">
            <Image
              src={ethOrgLogo}
              alt="Ethereum.org Logo"
              className="mx-auto max-w-[123px]"
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[2].url)} className="scroll-mt-28">
                {tocItems[2].title}
              </h2>
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
                    {t(
                      "page-what-is-ether-how-to-send-and-receive-eth-callout"
                    )}
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
            </div>
          </Section>

          <Section id={getId(tocItems[3].url)} className="space-y-6">
            <h2 id={getId(tocItems[1].url)} className="scroll-mt-28">
              {tocItems[3].title}
            </h2>
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

          <Section
            id={getId(tocItems[4].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <Image
              src={infrastructureTransparent}
              alt="Ethereum.org Logo"
              className="mx-auto max-w-[330px]"
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[4].url)} className="scroll-mt-28">
                {tocItems[4].title}
              </h2>
              <p>
                {t.rich(
                  "page-what-is-ether-how-much-does-it-cost-to-send-eth-description-1",
                  {
                    strong: Strong,
                  }
                )}
              </p>
              <GasTable />
            </div>
          </Section>

          <Section className="space-y-6">
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

          <Section
            id={getId(tocItems[5].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <Image
              src={developersHubHero}
              alt="Ethereum.org Logo"
              className="mx-auto"
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[5].url)} className="scroll-mt-28">
                {tocItems[5].title}
              </h2>
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
            </div>
          </Section>

          <Section id={getId(tocItems[6].url)} className="space-y-6">
            <h2 id={getId(tocItems[6].url)} className="scroll-mt-28">
              {tocItems[6].title}
            </h2>
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

          <Section className="space-y-6">
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

          <Section className="space-y-14">
            <Image
              src={impactTransparent}
              alt="Ethereum.org Logo"
              className="mx-auto max-w-[214px]"
            />
            <div className="space-y-6">
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
            </div>
          </Section>

          <Section className="space-y-6">
            <h3>{t("page-what-is-ether-distribution")}</h3>
            <p>{t("page-what-is-ether-distribution-description-1")}</p>
          </Section>

          <Section id={getId(tocItems[7].url)} className="space-y-6">
            <h2 id={getId(tocItems[7].url)} className="scroll-mt-28">
              {tocItems[7].title}
            </h2>
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

          <Section id={getId(tocItems[8].url)} className="space-y-6">
            <h2 id={getId(tocItems[8].url)} className="scroll-mt-28">
              {tocItems[8].title}
            </h2>
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

  const t = await getTranslations({
    locale,
    namespace: "page-what-is-ether",
  })

  return await getMetadata({
    locale,
    slug: ["what-is-ether"],
    title: t("page-what-is-ether-meta-title"),
    description: t("page-what-is-ether-meta-description"),
    twitterDescription: t("page-what-is-ether-twitter-meta-description"),
  })
}

export default Page
