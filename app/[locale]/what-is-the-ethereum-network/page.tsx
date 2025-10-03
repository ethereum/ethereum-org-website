import { getTranslations } from "next-intl/server"

import type { CommitHistory, Lang, ToCItem } from "@/lib/types"

import CommentCard from "@/components/CommentCard"
import DocLink from "@/components/DocLink"
import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import Link, { LinkWithArrow } from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"

import WhatIsTheEthereumNetworkPageJsonLD from "./page-jsonld"

import developersHubImg from "@/public/images/heroes/developers-hub-hero.png"
import layer2HubImg from "@/public/images/heroes/layer-2-hub-hero.png"
import layer2LearnHeroImg from "@/public/images/layer-2/learn-hero.png"
import manDogPlayingImg from "@/public/images/man-and-dog-playing.png"
import computerImg from "@/public/images/what-is-ethereum-network/computer_alone.png"
import heroImg from "@/public/images/what-is-ethereum-network/what-is-ethereum-network.png"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  const t = await getTranslations({
    namespace: "page-what-is-the-ethereum-network",
  })

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "what-is-the-ethereum-network",
      locale as Lang,
      commitHistoryCache
    )

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: "learn/what-is-the-ethereum-network", startDepth: 1 },
    heroImg,
    title: t("page-what-is-ethereum-network-title"),
    description: (
      <>
        <p>{t("page-what-is-ethereum-network-description-1")}</p>
        <p>{t("page-what-is-ethereum-network-description-2")}</p>
      </>
    ),
  }

  const tocItems: ToCItem[] = [
    {
      title: t("page-what-is-ethereum-network-title"),
      url: "#ethereum-network",
    },
    {
      title: t("page-what-is-ethereum-network-section-network-fees-title"),
      url: "#network-fees",
    },
    {
      title: t("page-what-is-ethereum-network-section-staking-title"),
      url: "#staking",
    },
    {
      title: t("page-what-is-ethereum-network-section-layer-2s-title"),
      url: "#layer-2s",
    },
    {
      title: t("page-what-is-ethereum-network-section-live-network-data-title"),
      url: "#live-network-data",
    },
  ]

  const getId = (input: string) => {
    const parts = input.split("#")
    return parts.length > 1 ? parts[1] : ""
  }

  return (
    <>
      <WhatIsTheEthereumNetworkPageJsonLD
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
            <p>{t("page-what-is-ethereum-network-section-description-1")}</p>
            <p>
              {t.rich("page-what-is-ethereum-network-section-description-2", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-what-is-ethereum-network-section-description-3", {
                strong: Strong,
              })}
            </p>
            <Image
              src={computerImg}
              alt="Computer"
              className="mx-auto"
              sizes="301px"
            />
            <p>{t("page-what-is-ethereum-network-section-description-4")}</p>
            <UnorderedList>
              <ListItem>
                {t("page-what-is-ethereum-network-section-description-5")}
              </ListItem>
              <ListItem>
                {t("page-what-is-ethereum-network-section-description-6")}
              </ListItem>
              <ListItem>
                {t("page-what-is-ethereum-network-section-description-7")}
              </ListItem>
              <ListItem>
                {t("page-what-is-ethereum-network-section-description-8")}
              </ListItem>
            </UnorderedList>
            <p>{t("page-what-is-ethereum-network-section-description-9")}</p>
            <p>
              {t.rich("page-what-is-ethereum-network-section-description-10", {
                a: (chunks) => <Link href="/wallets/">{chunks}</Link>,
                strong: Strong,
              })}
            </p>
            <p>{t("page-what-is-ethereum-network-section-description-11")}</p>
            <p>
              {t.rich("page-what-is-ethereum-network-section-description-12", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-what-is-ethereum-network-section-description-13")}</p>
            <p>{t("page-what-is-ethereum-network-section-description-14")}</p>
            <UnorderedList>
              <ListItem>
                {t("page-what-is-ethereum-network-section-description-15")}
              </ListItem>
              <ListItem>
                {t("page-what-is-ethereum-network-section-description-16")}
              </ListItem>
              <ListItem>
                {t("page-what-is-ethereum-network-section-description-17")}
              </ListItem>
            </UnorderedList>
            <p>{t("page-what-is-ethereum-network-section-description-18")}</p>
            <p>
              {t.rich("page-what-is-ethereum-network-section-description-19", {
                strong: Strong,
              })}
            </p>
          </Section>

          <Section
            id={getId(tocItems[1].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <Image
              src={developersHubImg}
              alt="Developers Hub"
              className="mx-auto"
              sizes={`(max-width: 832px) calc(100vw - 32px), (max-width: ${screens.lg}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[1].url)} className="scroll-mt-28">
                {tocItems[1].title}
              </h2>
              <p>
                {t("page-what-is-ethereum-network-gas-section-description-1")}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-gas-section-description-2",
                  {
                    strong: Strong,
                  }
                )}
              </p>
              <CommentCard
                description={t(
                  "page-what-is-ethereum-network-gas-section-description-3"
                )}
                name="Tim Beiko"
                title="Protocol Coordination, Ethereum Foundation"
              />
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-gas-section-description-4",
                  {
                    strong: Strong,
                  }
                )}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-gas-section-description-5",
                  {
                    strong: Strong,
                  }
                )}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-gas-section-description-6",
                  {
                    blog: (chunks) => (
                      <Link href="https://blog.ethereum.org/2021/07/15/london-mainnet-announcement">
                        {chunks}
                      </Link>
                    ),
                    beaconchain: (chunks) => (
                      <Link href="https://beaconcha.in/burn">{chunks}</Link>
                    ),
                    ultrasound: (chunks) => (
                      <Link href="https://ultrasound.money">{chunks}</Link>
                    ),
                    strong: Strong,
                  }
                )}
              </p>
              <p>
                {t("page-what-is-ethereum-network-gas-section-description-7")}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-gas-section-description-8",
                  {
                    strong: Strong,
                  }
                )}
              </p>
              <p>
                {t("page-what-is-ethereum-network-gas-section-description-9")}
              </p>
              <LinkWithArrow href="/gas">
                {t("page-what-is-ethereum-network-gas-section-description-10")}
              </LinkWithArrow>
            </div>
          </Section>

          <Section
            id={getId(tocItems[2].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <Image
              src={manDogPlayingImg}
              alt="Man and Dog Playing"
              className="mx-auto"
              sizes="(max-width: 461px) 100vw, 461px"
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[2].url)} className="scroll-mt-28">
                {tocItems[2].title}
              </h2>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-staking-section-description-1",
                  {
                    strong: Strong,
                  }
                )}
              </p>
              <p>
                {t(
                  "page-what-is-ethereum-network-staking-section-description-2"
                )}
              </p>
              <p>
                {t(
                  "page-what-is-ethereum-network-staking-section-description-3"
                )}
              </p>
              <p>
                {t(
                  "page-what-is-ethereum-network-staking-section-description-4"
                )}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-staking-section-description-5",
                  {
                    strong: Strong,
                  }
                )}
              </p>
              <CommentCard
                description={t(
                  "page-what-is-ethereum-network-staking-section-description-6"
                )}
                name="Barnabé Monnot"
                title="Protocol Architecture, Ethereum Foundation"
              />
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-staking-section-description-7",
                  {
                    validators: (chunks) => (
                      <Link href="https://beaconcha.in/charts/validators">
                        {chunks}
                      </Link>
                    ),
                    stakedEther: (chunks) => (
                      <Link href="https://beaconcha.in/charts/staked_ether">
                        {chunks}
                      </Link>
                    ),
                    strong: Strong,
                  }
                )}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-staking-section-description-8",
                  {
                    strong: Strong,
                  }
                )}
              </p>
              <p>
                {t(
                  "page-what-is-ethereum-network-staking-section-description-9"
                )}
              </p>
              <p>
                {t(
                  "page-what-is-ethereum-network-staking-section-description-10"
                )}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-staking-section-description-11",
                  {
                    lido: (chunks) => (
                      <Link href="https://lido.fi/ethereum">{chunks}</Link>
                    ),
                    rocketpool: (chunks) => (
                      <Link href="https://www.rocketpool.net/">{chunks}</Link>
                    ),
                    strong: Strong,
                  }
                )}
              </p>
              <div>
                <LinkWithArrow href="/staking">
                  {t(
                    "page-what-is-ethereum-network-staking-section-description-12"
                  )}
                </LinkWithArrow>
                <LinkWithArrow href="/run-a-node">
                  {t(
                    "page-what-is-ethereum-network-staking-section-description-13"
                  )}
                </LinkWithArrow>
              </div>
            </div>
          </Section>

          <Section
            id={getId(tocItems[3].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <Image
              src={layer2HubImg}
              alt="Layer 2 Hub"
              className="mx-auto"
              sizes={`(max-width: 832px) calc(100vw - 32px), (max-width: ${screens.lg}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[2].url)} className="scroll-mt-28">
                {tocItems[3].title}
              </h2>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-layer-2s-section-description-1",
                  {
                    strong: Strong,
                  }
                )}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-layer-2s-section-description-2",
                  {
                    strong: Strong,
                  }
                )}
              </p>
              <p>
                {t(
                  "page-what-is-ethereum-network-layer-2s-section-description-3"
                )}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-layer-2s-section-description-4",
                  {
                    strong: Strong,
                  }
                )}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-layer-2s-section-description-5",
                  {
                    l2fees: (chunks) => (
                      <Link href="https://l2fees.info/">{chunks}</Link>
                    ),
                    strong: Strong,
                  }
                )}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-layer-2s-section-description-6",
                  {
                    l2beat: (chunks) => (
                      <Link href="https://l2beat.com/scaling/summary">
                        {chunks}
                      </Link>
                    ),
                  }
                )}
              </p>
              <p>
                {t(
                  "page-what-is-ethereum-network-layer-2s-section-description-7"
                )}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-layer-2s-section-description-8",
                  {
                    robinhood: (chunks) => (
                      <Link href="https://newsroom.aboutrobinhood.com/robinhood-launches-stock-tokens-reveals-layer-2-blockchain-and-expands-crypto-suite-in-eu-and-us-with-perpetual-futures-and-staking/">
                        {chunks}
                      </Link>
                    ),
                    paypal: (chunks) => (
                      <Link href="https://www.coindesk.com/tech/2025/07/17/paypal-pyusd-goes-live-on-arbitrum">
                        {chunks}
                      </Link>
                    ),
                    shopify: (chunks) => (
                      <Link href="https://www.shopify.com/news/stablecoins-on-shopify">
                        {chunks}
                      </Link>
                    ),
                  }
                )}
              </p>
              <p>
                {t.rich(
                  "page-what-is-ethereum-network-layer-2s-section-description-9",
                  {
                    superbridge: (chunks) => (
                      <Link href="https://superbridge.app/">{chunks}</Link>
                    ),
                    portal: (chunks) => (
                      <Link href="https://portal.zksync.io/bridge/">
                        {chunks}
                      </Link>
                    ),
                    hop: (chunks) => (
                      <Link href="https://hop.exchange/">{chunks}</Link>
                    ),
                    across: (chunks) => (
                      <Link href="https://across.to/">{chunks}</Link>
                    ),
                  }
                )}
              </p>
              <LinkWithArrow href="/layer-2/">
                {t(
                  "page-what-is-ethereum-network-layer-2s-section-description-10"
                )}
              </LinkWithArrow>
            </div>
          </Section>

          <Section
            id={getId(tocItems[4].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <Image
              src={layer2LearnHeroImg}
              alt="Layer 2 Learn Hero"
              className="mx-auto"
              sizes={`(max-width: 832px) calc(100vw - 32px), (max-width: ${screens.lg}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[4].url)} className="scroll-mt-28">
                {tocItems[4].title}
              </h2>
              <p>
                {t(
                  "page-what-is-ethereum-network-live-network-data-section-description-1"
                )}
              </p>
              <p>
                {t(
                  "page-what-is-ethereum-network-live-network-data-section-description-2"
                )}
              </p>
              <UnorderedList>
                <ListItem>
                  {t(
                    "page-what-is-ethereum-network-live-network-data-section-description-3"
                  )}
                </ListItem>
                <ListItem>
                  {t(
                    "page-what-is-ethereum-network-live-network-data-section-description-4"
                  )}
                </ListItem>
                <ListItem>
                  {t(
                    "page-what-is-ethereum-network-live-network-data-section-description-5"
                  )}
                </ListItem>
              </UnorderedList>
              <p>
                {t(
                  "page-what-is-ethereum-network-live-network-data-section-description-6"
                )}
              </p>
              <p>
                {t(
                  "page-what-is-ethereum-network-live-network-data-section-description-7"
                )}
              </p>
              <p>
                {t(
                  "page-what-is-ethereum-network-live-network-data-section-description-8"
                )}
              </p>
              <UnorderedList>
                <ListItem>
                  {t.rich(
                    "page-what-is-ethereum-network-live-network-data-section-description-9",
                    {
                      etherscan: (chunks) => (
                        <Link href="https://etherscan.io/">{chunks}</Link>
                      ),
                    }
                  )}
                </ListItem>
                <ListItem>
                  {t.rich(
                    "page-what-is-ethereum-network-live-network-data-section-description-10",
                    {
                      beaconcha: (chunks) => (
                        <Link href="https://beaconcha.in/">{chunks}</Link>
                      ),
                    }
                  )}
                </ListItem>
                <ListItem>
                  {t.rich(
                    "page-what-is-ethereum-network-live-network-data-section-description-11",
                    {
                      ultrasound: (chunks) => (
                        <Link href="https://ultrasound.money/">{chunks}</Link>
                      ),
                    }
                  )}
                </ListItem>
                <ListItem>
                  {t.rich(
                    "page-what-is-ethereum-network-live-network-data-section-description-12",
                    {
                      l2fees: (chunks) => (
                        <Link href="https://l2fees.info/">{chunks}</Link>
                      ),
                    }
                  )}
                </ListItem>
                <ListItem>
                  {t.rich(
                    "page-what-is-ethereum-network-live-network-data-section-description-13",
                    {
                      l2beat: (chunks) => (
                        <Link href="https://l2beat.com/">{chunks}</Link>
                      ),
                    }
                  )}
                </ListItem>
                <ListItem>
                  {t.rich(
                    "page-what-is-ethereum-network-live-network-data-section-description-14",
                    {
                      growthepie: (chunks) => (
                        <Link href="https://growthepie.com/">{chunks}</Link>
                      ),
                    }
                  )}
                </ListItem>
                <ListItem>
                  {t.rich(
                    "page-what-is-ethereum-network-live-network-data-section-description-15",
                    {
                      dune: (chunks) => (
                        <Link href="https://dune.com/">{chunks}</Link>
                      ),
                    }
                  )}
                </ListItem>
                <ListItem>
                  {t.rich(
                    "page-what-is-ethereum-network-live-network-data-section-description-16",
                    {
                      tokenterminal: (chunks) => (
                        <Link href="https://tokenterminal.com/">{chunks}</Link>
                      ),
                    }
                  )}
                </ListItem>
                <ListItem>
                  {t.rich(
                    "page-what-is-ethereum-network-live-network-data-section-description-17",
                    {
                      nansen: (chunks) => (
                        <Link href="https://nansen.ai/">{chunks}</Link>
                      ),
                    }
                  )}
                </ListItem>
              </UnorderedList>
              <p>
                {t(
                  "page-what-is-ethereum-network-live-network-data-section-description-18"
                )}
              </p>
              <p>
                {t(
                  "page-what-is-ethereum-network-live-network-data-section-description-19"
                )}
              </p>
              <LinkWithArrow href="/resources/#network">
                {t(
                  "page-what-is-ethereum-network-live-network-data-section-description-20"
                )}
              </LinkWithArrow>
            </div>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <div className="space-y-6">
              <h2 className="scroll-mt-28">
                {t("page-what-is-ethereum-network-read-next-title")}
              </h2>
              <UnorderedList className="ms-0 list-none">
                <ListItem>
                  <DocLink href="/wallets">
                    {t("page-what-is-ethereum-network-read-next-item-1")}
                  </DocLink>
                </ListItem>
                <ListItem>
                  <DocLink href="/what-is-ether">
                    {t("page-what-is-ethereum-network-read-next-item-2")}
                  </DocLink>
                </ListItem>
                <ListItem>
                  <DocLink href="/web3">
                    {t("page-what-is-ethereum-network-read-next-item-3")}
                  </DocLink>
                </ListItem>
                <ListItem>
                  <DocLink href="/what-is-ethereum">
                    {t("page-what-is-ethereum-network-read-next-item-4")}
                  </DocLink>
                </ListItem>
              </UnorderedList>
            </div>
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
    namespace: "page-what-is-the-ethereum-network",
  })

  return await getMetadata({
    locale,
    slug: ["what-is-ethereum-network"],
    title: t("page-what-is-ethereum-network-meta-title"),
    description: t("page-what-is-ethereum-network-meta-description"),
    twitterDescription: t(
      "page-what-is-ethereum-network-twitter-meta-description"
    ),
    image: "/images/what-is-ethereum-network.png",
  })
}

export default Page
