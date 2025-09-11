import { getTranslations, setRequestLocale } from "next-intl/server"

import type { CommitHistory, Lang, ToCItem } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"

import DifferencesTable from "./_components/DifferencesTable"

import enterpriseEthImg from "@/public/images/enterprise-eth.png"
import ethdotorgLogoImg from "@/public/images/eth-org-logo.png"
import heroImg from "@/public/images/ethereum-vs-bitcoin/bitcoin-vs-ethereum-robots.png"
import hackathonImg from "@/public/images/hackathon_transparent.png"
import guidesHubHeroImg from "@/public/images/heroes/guides-hub-hero.jpg"
import layer2HeroImg from "@/public/images/heroes/layer-2-hub-hero.jpg"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations({
    locale,
    namespace: "page-ethereum-vs-bitcoin",
  })

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "ethereum-vs-bitcoin",
      locale as Lang,
      commitHistoryCache
    )

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

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: "learn/ethereum-vs-bitcoin", startDepth: 1 },
    heroImg,
    title: t("page-ethereum-vs-bitcoin-title"),
    description: (
      <>
        <p>{t("page-ethereum-vs-bitcoin-description-1")}</p>
      </>
    ),
  }

  const getId = (input: string) => {
    const parts = input.split("#")
    return parts.length > 1 ? parts[1] : ""
  }

  return (
    <>
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
          <TableOfContents variant="beginner" items={tocItems} isMobile />
          <TableOfContents variant="beginner" items={tocItems} />
        </div>

        <div className="max-w-[50rem] space-y-14 lg:col-start-1 lg:row-start-2">
          <Section id={getId(tocItems[0].url)} className="space-y-6">
            <p>{t("page-ethereum-vs-bitcoin-section-1")}</p>
            <p>{t("page-ethereum-vs-bitcoin-section-2")}</p>
          </Section>

          <Section
            id={getId(tocItems[1].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <div className="space-y-6">
              <h2 id={getId(tocItems[1].url)} className="scroll-mt-28">
                {tocItems[1].title}
              </h2>
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
            </div>
          </Section>

          <Section
            id={getId(tocItems[2].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <Image
              src={ethdotorgLogoImg}
              alt="ethereum.org Logo"
              className="mx-auto"
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[2].url)} className="scroll-mt-28">
                {tocItems[2].title}
              </h2>
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
              <p>
                {t.rich("page-ethereum-vs-bitcoin-ethereum-section-6", {
                  "what-is-ethereum": (chunks) => (
                    <Link href="/what-is-ethereum/">{chunks}</Link>
                  ),
                })}
              </p>
            </div>
          </Section>

          <Section
            id={getId(tocItems[3].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <div className="space-y-6">
              <h2 id={getId(tocItems[3].url)} className="scroll-mt-28">
                {tocItems[3].title}
              </h2>
              <p>{t("page-ethereum-vs-bitcoin-differences-section-1")}</p>
              <DifferencesTable />
            </div>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <div className="space-y-6">
              <h3 className="scroll-mt-28">
                {t("page-ethereum-vs-bitcoin-purpose-title")}
              </h3>
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
            </div>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <Image
              src={layer2HeroImg}
              alt="Layer 2 Hub Hero"
              className="mx-auto"
            />
            <div className="space-y-6">
              <h3 className="scroll-mt-28">
                {t("page-ethereum-vs-bitcoin-usecases-and-adoption-title")}
              </h3>
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
              <p>
                {t.rich("page-ethereum-vs-bitcoin-usecases-and-adoption-5", {
                  "what-is-ethereum": (chunks) => (
                    <Link href="/what-is-ethereum/">{chunks}</Link>
                  ),
                })}
              </p>
            </div>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <div className="space-y-6">
              <h3 className="scroll-mt-28">
                {t("page-ethereum-vs-bitcoin-monetary-policy-title")}
              </h3>
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
            </div>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <Image
              src={guidesHubHeroImg}
              alt="Guides Hub Hero"
              className="mx-auto"
            />
            <div className="space-y-6">
              <h3 className="scroll-mt-28">
                {t("page-ethereum-vs-bitcoin-developer-ecosystem-title")}
              </h3>
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
              <p>
                {t.rich("page-ethereum-vs-bitcoin-developer-ecosystem-4", {
                  developers: (chunks) => (
                    <Link href="/developers/">{chunks}</Link>
                  ),
                })}
              </p>
            </div>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <div className="space-y-6">
              <h3 className="scroll-mt-28">
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
              <p>
                {t.rich("page-ethereum-vs-bitcoin-security-and-consensus-4", {
                  "consensus-mechanisms": (chunks) => (
                    <Link href="/developers/docs/consensus-mechanisms/">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <Image
              src={enterpriseEthImg}
              alt="Enterprise ETH"
              className="mx-auto max-w-[350px]"
            />
            <div className="space-y-6">
              <h3 className="scroll-mt-28">
                {t("page-ethereum-vs-bitcoin-underlying-technology-title")}
              </h3>
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
              <p>
                {t.rich("page-ethereum-vs-bitcoin-underlying-technology-5", {
                  "developers-docs": (chunks) => (
                    <Link href="/developers/docs/">{chunks}</Link>
                  ),
                })}
              </p>
            </div>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <div className="space-y-6">
              <h3 className="scroll-mt-28">
                {t("page-ethereum-vs-bitcoin-decentralization-title")}
              </h3>
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
            </div>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <Image
              src={hackathonImg}
              alt="Enterprise ETH"
              className="mx-auto max-w-[350px]"
            />
            <div className="space-y-6">
              <h3 className="scroll-mt-28">
                {t("page-ethereum-vs-bitcoin-environmental-impact-title")}
              </h3>
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
              <p>
                {t.rich("page-ethereum-vs-bitcoin-environmental-impact-5", {
                  "energy-consumption": (chunks) => (
                    <Link href="https://consensys.io/blog/ethereum-blockchain-eliminates-99-99-of-its-carbon-footprint-overnight-after-a-successful-merge-according-to-new-report">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <div className="space-y-6">
              <h3 className="scroll-mt-28">
                {t("page-ethereum-vs-bitcoin-future-outlook-title")}
              </h3>
              <p>{t("page-ethereum-vs-bitcoin-future-outlook-1")}</p>
              <p>{t("page-ethereum-vs-bitcoin-future-outlook-2")}</p>
              <p>
                {t.rich("page-ethereum-vs-bitcoin-future-outlook-3", {
                  strong: Strong,
                })}
              </p>
              <p>
                {t.rich("page-ethereum-vs-bitcoin-future-outlook-4", {
                  roadmap: (chunks) => <Link href="/roadmap/">{chunks}</Link>,
                })}
              </p>
            </div>
          </Section>
        </div>
      </MainArticle>
    </>
  )
}

export default Page
