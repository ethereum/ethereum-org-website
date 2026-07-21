import { Handshake, Lightbulb } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, ToCItem } from "@/lib/types"

import PathwayCard from "@/components/cards/pathway-card"
import CategoryAppsGrid from "@/components/Content/apps/CategoryAppsGrid"
import PageHero from "@/components/Hero/PageHero"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Link, { LinkWithArrow } from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"
import VideoWatch from "@/components/Videos/VideoWatch"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getIdFromHash } from "@/lib/utils/url"

import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import heroImg from "@/public/images/infrastructure_transparent.png"
import privacyWhyImg from "@/public/images/three-people-cat-butterflies-petting-dog.png"
import walletHeroImg from "@/public/images/wallets/wallet-hero.png"

// Recommended-reading external links (title href pulled from the Figma).
const READING_LINKS: { key: string; href: string }[] = [
  {
    key: "page-privacy-ethereum-reading-1",
    href: "https://www.eff.org/deeplinks/2025/12/10-not-so-hidden-dangers-age-verification",
  },
  {
    key: "page-privacy-ethereum-reading-2",
    href: "https://americandragnet.org/",
  },
  {
    key: "page-privacy-ethereum-reading-3",
    href: "https://www.hks.harvard.edu/centers/carr-ryan/our-work/carr-ryan-commentary/defending-privacy-digital-age-reflections-data",
  },
  {
    key: "page-privacy-ethereum-reading-4",
    href: "https://internetpolicy.mit.edu/blog-2018-fb-cambridgeanalytica/",
  },
  {
    key: "page-privacy-ethereum-reading-5",
    href: "https://www.eff.org/issues/privacy",
  },
  {
    key: "page-privacy-ethereum-reading-6",
    href: "https://docs.railgun.org/wiki/assurance/private-proofs-of-innocence",
  },
  {
    key: "page-privacy-ethereum-reading-7",
    href: "https://www.quicknode.com/guides/ethereum-development/wallets/how-to-use-stealth-addresses-on-ethereum-eip-5564",
  },
  {
    key: "page-privacy-ethereum-reading-8",
    href: "https://ethereum-magicians.org/t/pse-roadmap-2025-and-beyond/25423",
  },
  {
    key: "page-privacy-ethereum-reading-9",
    href: "https://www.eff.org/deeplinks/2021/05/surveillance-self-defense-playlist-getting-know-your-phone",
  },
  {
    key: "page-privacy-ethereum-reading-10",
    href: "https://www.eff.org/issues/mass-surveillance-technologies",
  },
  {
    key: "page-privacy-ethereum-reading-11",
    href: "https://www.eff.org/wp/tackling-arbitrary-digital-surveillance-americas",
  },
  {
    key: "page-privacy-ethereum-reading-12",
    href: "https://www.internetsociety.org/blog/2024/10/understanding-digital-footprints/",
  },
  {
    key: "page-privacy-ethereum-reading-13",
    href: "https://openlibrary.org/books/OL27930301M/The_Age_of_Surveillance_Capitalism",
  },
  {
    key: "page-privacy-ethereum-reading-14",
    href: "https://www.amnesty.org/en/latest/news/2019/07/the-great-hack-facebook-cambridge-analytica/",
  },
  {
    key: "page-privacy-ethereum-reading-15",
    href: "https://vitalik.eth.limo/general/2025/04/14/privacy.html",
  },
  {
    key: "page-privacy-ethereum-reading-16",
    href: "https://pse.dev/projects/zk-id",
  },
]

const Page = async (props: { params: Promise<{ locale: Lang }> }) => {
  const params = await props.params
  const { locale } = params
  setRequestLocale(locale)

  const t = await getTranslations("page-privacy-ethereum")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("privacy/ethereum", locale)

  const tocItems: ToCItem[] = [
    {
      title: t("page-privacy-ethereum-data-terms-title"),
      url: "#your-data-your-terms",
    },
    {
      title: t("page-privacy-ethereum-challenge-title"),
      url: "#the-challenge-privacy-on-public-blockchains",
    },
    {
      title: t("page-privacy-ethereum-transition-title"),
      url: "#ethereums-transition-to-privacy-by-default",
    },
    {
      title: t("page-privacy-ethereum-protecting-title"),
      url: "#protecting-your-digital-privacy-on-ethereum-today",
    },
    {
      title: t("page-privacy-ethereum-selective-title"),
      url: "#selective-disclosure",
    },
    {
      title: t("page-privacy-ethereum-whats-next-title"),
      url: "#whats-next",
    },
  ]

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
            breadcrumbs={{ slug: "privacy/ethereum" }}
            heroImg={heroImg}
            title={t("page-privacy-ethereum-title")}
            description={t("page-privacy-ethereum-hero-description")}
            buttons={[
              {
                content: t("page-privacy-ethereum-hero-cta"),
                href: tocItems[0].url,
                size: "lg",
              },
            ]}
          />
        }
        tocItems={tocItems}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      >
        <Card size="lg">
          <CardContent>
            <CardTitle size="lg" asChild>
              <h2>{t("page-privacy-ethereum-summary-title")}</h2>
            </CardTitle>
            <UnorderedList className="mb-0">
              <ListItem>
                {t.rich("page-privacy-ethereum-summary-item-1", {
                  strong: Strong,
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-privacy-ethereum-summary-item-2", {
                  strong: Strong,
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-privacy-ethereum-summary-item-3", {
                  strong: Strong,
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-privacy-ethereum-summary-item-4", {
                  strong: Strong,
                })}
              </ListItem>
            </UnorderedList>
          </CardContent>
        </Card>

        <Section id={getIdFromHash(tocItems[0].url)}>
          <h2>{tocItems[0].title}</h2>
          <p>
            {t.rich("page-privacy-ethereum-data-terms-description-1", {
              strong: Strong,
              predatory: (chunks) => <Link href="/privacy/">{chunks}</Link>,
            })}
          </p>
          <p>{t("page-privacy-ethereum-data-terms-description-2")}</p>
          <p>{t("page-privacy-ethereum-data-terms-description-3")}</p>
          <Alert variant="warning">
            <AlertIcon className="[&>svg]:size-10 [&>svg]:text-body!">
              <Lightbulb />
            </AlertIcon>
            <AlertContent>
              <AlertDescription>
                <p className="text-pretty">
                  &ldquo;{t("page-privacy-ethereum-mandate-quote-1")}
                </p>
                <p className="text-pretty">
                  {t.rich("page-privacy-ethereum-mandate-quote-2", {
                    strong: Strong,
                  })}
                  &rdquo;
                </p>
                <p className="italic">
                  &mdash;{" "}
                  <Link href="/foundation/mandate/">
                    {t("page-privacy-ethereum-mandate-source")}
                  </Link>
                </p>
              </AlertDescription>
            </AlertContent>
          </Alert>
        </Section>

        <Section id={getIdFromHash(tocItems[1].url)}>
          <h2>{tocItems[1].title}</h2>
          <p>{t("page-privacy-ethereum-challenge-description-1")}</p>
          <p>
            {t.rich("page-privacy-ethereum-challenge-description-2", {
              publicKey: (chunks) => (
                <Link href="/decentralized-identity/#public-key-cryptography">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <VideoWatch slug="privacy-is-existential" />
          <p>{t("page-privacy-ethereum-challenge-description-3")}</p>
          <p>
            {t.rich("page-privacy-ethereum-challenge-description-4", {
              strong: Strong,
            })}
          </p>
        </Section>

        <Section id={getIdFromHash(tocItems[2].url)}>
          <h2>{tocItems[2].title}</h2>
          <p>
            {t.rich("page-privacy-ethereum-transition-description-1", {
              aggregated: (chunks) => (
                <Link href="https://vitalik.eth.limo/general/2025/04/14/privacy.html">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-privacy-ethereum-transition-list-reads", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-ethereum-transition-list-writes", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-ethereum-transition-list-proving", {
                strong: Strong,
              })}
            </ListItem>
          </UnorderedList>
          <ButtonLink href="/roadmap/privacy/" size="lg">
            {t("page-privacy-ethereum-transition-roadmap-cta")}
          </ButtonLink>
          {/* // TODO: Replace with chosen Web3Privacy Now video */}
          <VideoWatch slug="privacy-is-existential" />
        </Section>

        {/* Umbrella section: the app categories below are h3 subsections of this h2 */}
        <Section id={getIdFromHash(tocItems[3].url)}>
          <h2>{tocItems[3].title}</h2>
          <p>
            {t.rich("page-privacy-ethereum-protecting-description-1", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-privacy-ethereum-protecting-description-2")}</p>

          <h3>{t("page-privacy-ethereum-identity-title")}</h3>
          <p>
            {t.rich("page-privacy-ethereum-identity-description-1", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-privacy-ethereum-identity-description-2", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-privacy-ethereum-identity-description-3", {
              zkp: (chunks) => (
                <Link href="/zero-knowledge-proofs/">{chunks}</Link>
              ),
            })}
          </p>
          {/* // TODO: QuarkID video -- transcript to be added separately */}
          <VideoWatch slug="quarkid-south-america-ssi" />
          <Alert variant="update">
            <AlertIcon className="[&>svg]:size-12">
              <Handshake />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>
                {t("page-privacy-ethereum-identity-case-study-title")}
              </AlertTitle>
              <AlertDescription>
                <p>{t("page-privacy-ethereum-identity-case-study-body")}</p>
                <p>
                  {t.rich("page-privacy-ethereum-identity-case-study-cta", {
                    link: (chunks) => (
                      <LinkWithArrow
                        href="/decentralized-identity/"
                        className="inline"
                      >
                        {chunks}
                      </LinkWithArrow>
                    ),
                  })}
                </p>
              </AlertDescription>
            </AlertContent>
          </Alert>
          <h4>{t("page-privacy-ethereum-identity-apps-title")}</h4>
          <CategoryAppsGrid category="privacy" subcategory="identity" />
          <ButtonLink href="/decentralized-identity/" size="lg">
            {t("page-privacy-ethereum-identity-apps-cta")}
          </ButtonLink>

          <h3>{t("page-privacy-ethereum-governance-title")}</h3>
          <p>
            {t.rich("page-privacy-ethereum-governance-description-1", {
              strong: Strong,
              daos: (chunks) => <Link href="/dao/">{chunks}</Link>,
            })}
          </p>
          <p>{t("page-privacy-ethereum-governance-description-2")}</p>
          <UnorderedList>
            <ListItem>{t("page-privacy-ethereum-governance-list-1")}</ListItem>
            <ListItem>{t("page-privacy-ethereum-governance-list-2")}</ListItem>
            <ListItem>{t("page-privacy-ethereum-governance-list-3")}</ListItem>
          </UnorderedList>
          <p>{t("page-privacy-ethereum-governance-description-3")}</p>
          <p>
            {t.rich("page-privacy-ethereum-governance-description-4", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-privacy-ethereum-governance-description-5", {
              strong: Strong,
              freedomTool: (chunks) => (
                <Link href="https://freedomtool.org/">{chunks}</Link>
              ),
            })}
          </p>
          <p>
            {t.rich("page-privacy-ethereum-governance-description-6", {
              maci: (chunks) => (
                <Link href="https://pse.dev/projects/maci">{chunks}</Link>
              ),
            })}
          </p>
          <h4>{t("page-privacy-ethereum-governance-apps-title")}</h4>
          <CategoryAppsGrid category="privacy" subcategory="governance" />

          <h3>{t("page-privacy-ethereum-communication-title")}</h3>
          <p>{t("page-privacy-ethereum-communication-description-1")}</p>
          <Alert variant="warning">
            <AlertIcon className="[&>svg]:size-10 [&>svg]:text-body!">
              <Lightbulb />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>
                {t("page-privacy-ethereum-communication-remember-title")}
              </AlertTitle>
              <AlertDescription>
                <p>
                  {t.rich("page-privacy-ethereum-communication-remember-body", {
                    strong: Strong,
                  })}
                </p>
              </AlertDescription>
            </AlertContent>
          </Alert>
          <p>
            {t.rich("page-privacy-ethereum-communication-description-2", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-privacy-ethereum-communication-description-3", {
              strong: Strong,
              tlsnotary: (chunks) => (
                <Link href="https://tlsnotary.org/">{chunks}</Link>
              ),
            })}
          </p>
          <h4>{t("page-privacy-ethereum-communication-apps-title")}</h4>
          <CategoryAppsGrid category="privacy" subcategory="communication" />

          <h3>{t("page-privacy-ethereum-stealth-title")}</h3>
          <p>
            {t.rich("page-privacy-ethereum-stealth-description-1", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-privacy-ethereum-stealth-description-2")}</p>
          <p>
            {t.rich("page-privacy-ethereum-stealth-description-3", {
              strong: Strong,
              erc5564: (chunks) => (
                <Link href="https://eips.ethereum.org/EIPS/eip-5564">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <h4>{t("page-privacy-ethereum-stealth-apps-title")}</h4>
          <CategoryAppsGrid category="privacy" subcategory="stealth address" />
          {/* // TODO: confirm href -- no dedicated "payments on Ethereum" page */}
          <ButtonLink href="/payments/" size="lg">
            {t("page-privacy-ethereum-stealth-apps-cta")}
          </ButtonLink>

          <h3>{t("page-privacy-ethereum-payments-title")}</h3>
          <p>{t("page-privacy-ethereum-payments-description-1")}</p>
          <p>
            {t.rich("page-privacy-ethereum-payments-description-2", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-privacy-ethereum-payments-description-3", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-privacy-ethereum-payments-description-4")}</p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-privacy-ethereum-payments-list-poi", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-ethereum-payments-list-asp", {
                strong: Strong,
              })}
            </ListItem>
          </UnorderedList>
          <p>{t("page-privacy-ethereum-payments-description-5")}</p>
          <h4>{t("page-privacy-ethereum-payments-apps-title")}</h4>
          <CategoryAppsGrid category="privacy" subcategory="payments" />

          <h3>{t("page-privacy-ethereum-l2-title")}</h3>
          <p>{t("page-privacy-ethereum-l2-description-1")}</p>
          <p>
            {t.rich("page-privacy-ethereum-l2-description-2", {
              zkrollups: (chunks) => (
                <Link href="/developers/docs/scaling/zk-rollups/">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          {/* // TODO: "How to make a guerilla L2" (Web3Privacy Now) */}
          <VideoWatch slug="how-to-make-a-guerilla-l2" />
          <p>
            {t.rich("page-privacy-ethereum-l2-description-3", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-privacy-ethereum-l2-description-4")}</p>
          <h4>{t("page-privacy-ethereum-l2-list-title")}</h4>
          <UnorderedList>
            <ListItem>
              {t.rich("page-privacy-ethereum-l2-list-aztec", {
                link: (chunks) => (
                  <Link href="https://aztec.network/">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-ethereum-l2-list-fairblock", {
                link: (chunks) => (
                  <Link href="https://www.fairblock.network/">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-ethereum-l2-list-silentdata", {
                link: (chunks) => (
                  <Link href="https://www.silentdata.com/">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-ethereum-l2-list-starknet", {
                link: (chunks) => (
                  <Link href="https://www.starknet.io/">{chunks}</Link>
                ),
              })}
            </ListItem>
          </UnorderedList>
          <ButtonLink href="/layer-2/" size="lg">
            {t("page-privacy-ethereum-l2-cta")}
          </ButtonLink>
        </Section>

        <Section id={getIdFromHash(tocItems[4].url)}>
          <h2>{tocItems[4].title}</h2>
          <p>{t("page-privacy-ethereum-selective-description-1")}</p>
          <UnorderedList>
            <ListItem>{t("page-privacy-ethereum-selective-list-1")}</ListItem>
            <ListItem>{t("page-privacy-ethereum-selective-list-2")}</ListItem>
            <ListItem>{t("page-privacy-ethereum-selective-list-3")}</ListItem>
          </UnorderedList>
          <p>{t("page-privacy-ethereum-selective-description-2")}</p>
        </Section>

        <Section id={getIdFromHash(tocItems[5].url)}>
          <h2>{tocItems[5].title}</h2>
          <p>{t("page-privacy-ethereum-whats-next-description-1")}</p>
          <p>{t("page-privacy-ethereum-whats-next-description-2")}</p>
          <p>{t("page-privacy-ethereum-whats-next-description-3")}</p>
        </Section>

        <Section>
          <h2>{t("page-privacy-ethereum-reading-title")}</h2>
          <UnorderedList>
            {READING_LINKS.map(({ key, href }) => (
              <ListItem key={key}>
                {t.rich(key, {
                  link: (chunks) => <Link href={href}>{chunks}</Link>,
                })}
              </ListItem>
            ))}
          </UnorderedList>
        </Section>

        <Section>
          <PathwayCard
            href="/apps/categories/privacy/"
            title={t("page-privacy-ethereum-pathway-1-title")}
            description={t("page-privacy-ethereum-pathway-1-description")}
            badge={{ label: t("page-privacy-ethereum-pathway-1-badge") }}
            banner={<Image src={walletHeroImg} alt="" sizes="160px" />}
          />
          <PathwayCard
            href="/privacy/"
            title={t("page-privacy-ethereum-pathway-2-title")}
            description={t("page-privacy-ethereum-pathway-2-description")}
            banner={<Image src={privacyWhyImg} alt="" sizes="160px" />}
          />
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

  const t = await getTranslations("page-privacy-ethereum")

  return await getMetadata({
    locale,
    slug: ["privacy", "ethereum"],
    title: t("page-privacy-ethereum-meta-title"),
    description: t("page-privacy-ethereum-meta-description"),
  })
}

export default Page
