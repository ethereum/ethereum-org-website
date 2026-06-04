import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, ToCItem } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import PageHero from "@/components/Hero/PageHero"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import { LinkWithArrow } from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"

import DifferencesTable from "./_components/DifferencesTable"
import EthereumVsBitcoinPageJsonLD from "./page-jsonld"

import enterpriseEthImg from "@/public/images/enterprise-eth.png"
import ethdotorgLogoImg from "@/public/images/eth-org-logo.png"
import heroImg from "@/public/images/ethereum-vs-bitcoin/bitcoin-vs-ethereum-robots.png"
import hackathonImg from "@/public/images/hackathon_transparent.png"
import guidesHubHeroImg from "@/public/images/heroes/guides-hub-hero.jpg"
import layer2HeroImg from "@/public/images/heroes/layer-2-hub-hero.png"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("page-ethereum-vs-bitcoin")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("ethereum-vs-bitcoin", locale as Lang)

  const tocItems: ToCItem[] = [
    {
      title: t("page-ethereum-vs-bitcoin-title"),
      url: "#ethereum-vs-bitcoin",
    },
    {
      title: t("page-ethereum-vs-bitcoin-bitcoin-section-title"),
      url: "#bitcoin",
    },
    {
      title: t("page-ethereum-vs-bitcoin-ethereum-section-title"),
      url: "#ethereum",
    },
    {
      title: t("page-ethereum-vs-bitcoin-differences-section-title"),
      url: "#differences",
    },
  ]

  const getId = (input: string) => {
    const parts = input.split("#")
    return parts.length > 1 ? parts[1] : ""
  }

  return (
    <>
      <EthereumVsBitcoinPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <PageHero
        breadcrumbs={{ slug: "learn/ethereum-vs-bitcoin", startDepth: 1 }}
        heroImg={heroImg}
        title={t("page-ethereum-vs-bitcoin-title")}
        description={t("page-ethereum-vs-bitcoin-description-1")}
      />
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
            <p>
              {t.rich("page-ethereum-vs-bitcoin-section-1", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-ethereum-vs-bitcoin-section-2")}</p>
          </Section>

          <Section id={getId(tocItems[1].url)}>
            <h2>{tocItems[1].title}</h2>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-bitcoin-section-1", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-bitcoin-section-2", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-ethereum-vs-bitcoin-bitcoin-section-3")}</p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-bitcoin-section-4", {
                strong: Strong,
              })}
            </p>
          </Section>

          <Section id={getId(tocItems[2].url)}>
            <Image
              src={ethdotorgLogoImg}
              alt="ethereum.org Logo"
              className="mx-auto"
              sizes="281px"
            />
            <h2>{tocItems[2].title}</h2>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-ethereum-section-1", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-ethereum-section-2", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-ethereum-section-3", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-ethereum-vs-bitcoin-ethereum-section-4")}</p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-ethereum-section-5", {
                strong: Strong,
              })}
            </p>
            <LinkWithArrow href="/what-is-ethereum/">
              {t("page-ethereum-vs-bitcoin-ethereum-section-6")}
            </LinkWithArrow>
          </Section>

          <Section id={getId(tocItems[3].url)}>
            <h2>{tocItems[3].title}</h2>
            <p>{t("page-ethereum-vs-bitcoin-differences-section-1")}</p>
            <DifferencesTable />
          </Section>

          <Section>
            <h3>{t("page-ethereum-vs-bitcoin-purpose-title")}</h3>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-purpose-1", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-purpose-2", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-ethereum-vs-bitcoin-purpose-3")}</p>
            <p>{t("page-ethereum-vs-bitcoin-purpose-4")}</p>
          </Section>

          <Section>
            <Image
              src={layer2HeroImg}
              alt="Layer 2 Hub Hero"
              className="mx-auto"
              sizes={`(max-width: 832px) calc(100vw - 32px), (max-width: ${screens.lg}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            />
            <h3>{t("page-ethereum-vs-bitcoin-usecases-and-adoption-title")}</h3>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-usecases-and-adoption-1", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-usecases-and-adoption-2", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-usecases-and-adoption-3", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-usecases-and-adoption-4", {
                strong: Strong,
              })}
            </p>
            <LinkWithArrow href="/what-is-ethereum/">
              {t("page-ethereum-vs-bitcoin-usecases-and-adoption-5")}
            </LinkWithArrow>
          </Section>

          <Section>
            <h3>{t("page-ethereum-vs-bitcoin-monetary-policy-title")}</h3>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-monetary-policy-1", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-ethereum-vs-bitcoin-monetary-policy-2")}</p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-monetary-policy-3", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-ethereum-vs-bitcoin-monetary-policy-4")}</p>
          </Section>

          <Section>
            <Image
              src={guidesHubHeroImg}
              alt="Guides Hub Hero"
              className="mx-auto"
              sizes={`(max-width: 832px) calc(100vw - 32px), (max-width: ${screens.lg}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            />
            <h3>{t("page-ethereum-vs-bitcoin-developer-ecosystem-title")}</h3>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-developer-ecosystem-1", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-ethereum-vs-bitcoin-developer-ecosystem-2")}</p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-developer-ecosystem-3", {
                strong: Strong,
              })}
            </p>
            <LinkWithArrow href="/developers/">
              {t("page-ethereum-vs-bitcoin-developer-ecosystem-4")}
            </LinkWithArrow>
          </Section>

          <Section>
            <h3>
              {t("page-ethereum-vs-bitcoin-security-and-consensus-title")}
            </h3>
            <p>{t("page-ethereum-vs-bitcoin-security-and-consensus-1")}</p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-security-and-consensus-2", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-security-and-consensus-3", {
                strong: Strong,
              })}
            </p>
            <LinkWithArrow href="/developers/docs/consensus-mechanisms/">
              {t("page-ethereum-vs-bitcoin-security-and-consensus-4")}
            </LinkWithArrow>
          </Section>

          <Section>
            <Image
              src={enterpriseEthImg}
              alt="Enterprise ETH"
              className="mx-auto w-[350px] max-w-full"
              sizes="(max-width: 350px) 100vw, 350px"
            />
            <h3>{t("page-ethereum-vs-bitcoin-underlying-technology-title")}</h3>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-underlying-technology-1", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-ethereum-vs-bitcoin-underlying-technology-2")}</p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-underlying-technology-3", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-ethereum-vs-bitcoin-underlying-technology-4")}</p>
            <LinkWithArrow href="/developers/docs/">
              {t("page-ethereum-vs-bitcoin-underlying-technology-5")}
            </LinkWithArrow>
          </Section>

          <Section>
            <h3>{t("page-ethereum-vs-bitcoin-decentralization-title")}</h3>
            <p>{t("page-ethereum-vs-bitcoin-decentralization-1")}</p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-decentralization-2", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-decentralization-3", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-decentralization-4", {
                strong: Strong,
              })}
            </p>
          </Section>

          <Section>
            <Image
              src={hackathonImg}
              alt="Enterprise ETH"
              className="mx-auto w-[350px] max-w-full"
              sizes="(max-width: 350px) 100vw, 350px"
            />
            <h3>{t("page-ethereum-vs-bitcoin-environmental-impact-title")}</h3>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-environmental-impact-1", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-ethereum-vs-bitcoin-environmental-impact-2")}</p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-environmental-impact-3", {
                strong: Strong,
              })}
            </p>
            <p>{t("page-ethereum-vs-bitcoin-environmental-impact-4")}</p>
            <LinkWithArrow href="https://consensys.io/blog/ethereum-blockchain-eliminates-99-99-of-its-carbon-footprint-overnight-after-a-successful-merge-according-to-new-report">
              {t("page-ethereum-vs-bitcoin-environmental-impact-5")}
            </LinkWithArrow>
          </Section>

          <Section>
            <h3>{t("page-ethereum-vs-bitcoin-future-outlook-title")}</h3>
            <p>{t("page-ethereum-vs-bitcoin-future-outlook-1")}</p>
            <p>{t("page-ethereum-vs-bitcoin-future-outlook-2")}</p>
            <p>
              {t.rich("page-ethereum-vs-bitcoin-future-outlook-3", {
                strong: Strong,
              })}
            </p>
            <LinkWithArrow href="/roadmap/">
              {t("page-ethereum-vs-bitcoin-future-outlook-4")}
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

  const t = await getTranslations("page-ethereum-vs-bitcoin")

  return await getMetadata({
    locale,
    slug: ["ethereum-vs-bitcoin"],
    title: t("page-ethereum-vs-bitcoin-meta-title"),
    description: t("page-ethereum-vs-bitcoin-meta-description"),
    twitterDescription: t("page-ethereum-vs-bitcoin-twitter-meta-description"),
    image: "/images/ethereum-vs-bitcoin/bitcoin-vs-ethereum-robots.png",
  })
}

export default Page
