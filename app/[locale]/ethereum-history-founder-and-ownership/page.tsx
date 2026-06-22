import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, ToCItem } from "@/lib/types"

import CommentCard from "@/components/CommentCard"
import PageHero from "@/components/Hero/PageHero"
import { Image } from "@/components/Image"
import { Emphasis, Strong } from "@/components/IntlStringElements"
import Link, { LinkWithArrow } from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import EthereumOrgLogo from "@/public/images/eth-home-icon.png"
import heroImg from "@/public/images/ethereum-history-founder-and-ownership/ethereum-history-founder-and-ownership-hero.png"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("page-ethereum-history-founder-and-ownership")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "ethereum-history-founder-and-ownership",
      locale as Lang
    )

  const tocItems: ToCItem[] = [
    {
      title: t("page-ethereum-history-founder-and-ownership-title"),
      url: "#ethereum-history-founder-and-ownership",
    },
    {
      title: t(
        "page-ethereum-history-founder-and-ownership-who-founded-ethereum"
      ),
      url: "#who-founded-ethereum",
    },
    {
      title: t(
        "page-ethereum-history-founder-and-ownership-when-ethereum-when-did-ethereum-launch"
      ),
      url: "#when-ethereum-when-did-ethereum-launch",
    },
    {
      title: t(
        "page-ethereum-history-founder-and-ownership-who-owns-and-runs-ethereum-now"
      ),
      url: "#who-owns-and-runs-ethereum-now",
    },
    {
      title: t("page-ethereum-history-founder-and-ownership-conclusion"),
      url: "#conclusion",
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
            breadcrumbs={{
              slug: "ethereum-history-founder-and-ownership",
              startDepth: 1,
            }}
            heroImg={heroImg}
            title={t("page-ethereum-history-founder-and-ownership-title")}
            description={t(
              "page-ethereum-history-founder-and-ownership-description-1"
            )}
          />
        }
        tocItems={tocItems}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      >
        <Section id={getId(tocItems[0].url)}>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-who-founded-ethereum-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
        </Section>

        <Section id={getId(tocItems[1].url)}>
          <h2>{tocItems[1].title}</h2>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t(
              "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-description-2"
            )}
          </p>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-description-3",
              {
                em: Emphasis,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-description-4",
              {
                whitepaper: (chunks) => (
                  <Link href="/whitepaper/">{chunks}</Link>
                ),
              }
            )}
          </p>
          <CommentCard
            description={t(
              "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-description-5"
            )}
            name="Vitalik Buterin"
            title={t(
              "page-ethereum-history-founder-and-ownership-founder-of-ethereum"
            )}
          />
          <p>
            {t(
              "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-description-6"
            )}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-vitalik-buterin",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-gavin-wood",
                {
                  strong: Strong,
                  solidity: (chunks) => (
                    <Link href="https://soliditylang.org/">{chunks}</Link>
                  ),
                  ethereumYellowPaper: (chunks) => (
                    <Link href="https://ethereum.github.io/yellowpaper/paper.pdf">
                      {chunks}
                    </Link>
                  ),
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-joseph-lubin",
                {
                  strong: Strong,
                  consensys: (chunks) => (
                    <Link href="https://consensys.net/">{chunks}</Link>
                  ),
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-jeffrey-wilcke",
                {
                  strong: Strong,
                  geth: (chunks) => (
                    <Link href="https://geth.ethereum.org/">{chunks}</Link>
                  ),
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-mihai-alisie",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-anthony-di-lorio",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-amir-chetrit",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-charles-hoskinson",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
          </UnorderedList>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-description-7",
              {
                strong: Strong,
              }
            )}
          </p>
        </Section>

        <Section aria-labelledby={getId(tocItems[2].url)}>
          <Image
            src={EthereumOrgLogo}
            alt=""
            sizes="128px"
            className="mx-auto max-w-32"
          />
          <h2 id={getId(tocItems[2].url)}>{tocItems[2].title}</h2>
          <p>
            {t(
              "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-1"
            )}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-2",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-3",
                {
                  strong: Strong,
                  announcement: (chunks) => (
                    <Link href="https://www.youtube.com/watch?v=l9dpjN3Mwps">
                      {chunks}
                    </Link>
                  ),
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-4",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-5",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-6",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-7",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
          </UnorderedList>
          <CommentCard
            description={t(
              "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-8"
            )}
            name="Joseph Lubin"
            title={t(
              "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-9"
            )}
          />
          <p>
            {t(
              "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-10"
            )}
          </p>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-11",
              {
                genesisBlock: (chunks) => (
                  <Link href="https://eth.blockscout.com/block/0">
                    {chunks}
                  </Link>
                ),
              }
            )}
          </p>
          <div>
            <LinkWithArrow href="/ethereum-forks/">
              {t(
                "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-12"
              )}
            </LinkWithArrow>
            <LinkWithArrow href="/roadmap/">
              {t(
                "page-ethereum-history-founder-and-ownership-when-did-ethereum-launch-description-13"
              )}
            </LinkWithArrow>
          </div>
        </Section>

        <Section id={getId(tocItems[3].url)}>
          <h2>{tocItems[3].title}</h2>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-who-owns-and-runs-ethereum-now-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-owns-and-runs-ethereum-now-description-2",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-owns-and-runs-ethereum-now-description-3",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-owns-and-runs-ethereum-now-description-4",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
          </UnorderedList>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-who-owns-and-runs-ethereum-now-description-5",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t(
              "page-ethereum-history-founder-and-ownership-who-owns-and-runs-ethereum-now-description-6"
            )}
          </p>

          <h3>
            {t(
              "page-ethereum-history-founder-and-ownership-ethereum-foundation"
            )}
          </h3>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-ethereum-foundation-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
          <UnorderedList>
            <ListItem>
              {t(
                "page-ethereum-history-founder-and-ownership-ethereum-foundation-description-2"
              )}
            </ListItem>
            <ListItem>
              {t(
                "page-ethereum-history-founder-and-ownership-ethereum-foundation-description-3"
              )}
            </ListItem>
            <ListItem>
              {t(
                "page-ethereum-history-founder-and-ownership-ethereum-foundation-description-4"
              )}
            </ListItem>
            <ListItem>
              {t(
                "page-ethereum-history-founder-and-ownership-ethereum-foundation-description-5"
              )}
            </ListItem>
          </UnorderedList>

          <h3>
            {t("page-ethereum-history-founder-and-ownership-core-developers")}
          </h3>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-core-developers-description-1"
            )}
          </p>

          <h3>{t("page-ethereum-history-founder-and-ownership-eip")}</h3>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-eip-description-1",
              {
                strong: Strong,
                eips: (chunks) => (
                  <Link href="https://eips.ethereum.org/">{chunks}</Link>
                ),
              }
            )}
          </p>

          <h3>{t("page-ethereum-history-founder-and-ownership-validators")}</h3>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-validators-description-1",
              {
                strong: Strong,
                beaconchain: (chunks) => (
                  <Link href="https://beaconcha.in/">{chunks}</Link>
                ),
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-validators-description-2",
              {
                strong: Strong,
              }
            )}
          </p>
          <CommentCard
            description={t(
              "page-ethereum-history-founder-and-ownership-validators-description-3"
            )}
            name="Vitalik Buterin"
            title={t(
              "page-ethereum-history-founder-and-ownership-founder-of-ethereum"
            )}
          />
        </Section>

        <Section id={getId(tocItems[4].url)}>
          <h2>{tocItems[4].title}</h2>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-conclusion-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-conclusion-description-2"
            )}
          </p>
          <p>
            {t.rich(
              "page-ethereum-history-founder-and-ownership-conclusion-description-3",
              {
                strong: Strong,
              }
            )}
          </p>
          <LinkWithArrow href="/governance/">
            {t(
              "page-ethereum-history-founder-and-ownership-conclusion-description-4"
            )}
          </LinkWithArrow>
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

  const t = await getTranslations("page-ethereum-history-founder-and-ownership")

  return await getMetadata({
    locale,
    slug: ["ethereum-history-founder-and-ownership"],
    title: t("page-ethereum-history-founder-and-ownership-meta-title"),
    description: t(
      "page-ethereum-history-founder-and-ownership-meta-description"
    ),
    twitterDescription: t(
      "page-ethereum-history-founder-and-ownership-twitter-meta-description"
    ),
    image:
      "/images/ethereum-history-founder-and-ownership/ethereum-history-founder-and-ownership-hero.png",
  })
}

export default Page
