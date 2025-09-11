import { getTranslations, setRequestLocale } from "next-intl/server"

import type { CommitHistory, Lang, ToCItem } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import { Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"

import heroImg from "@/public/images/ethereum-vs-bitcoin/bitcoin-vs-ethereum-robots.png"

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
        </div>
      </MainArticle>
    </>
  )
}

export default Page
