import { getTranslations, setRequestLocale } from "next-intl/server"

import type { CommitHistory, Lang, ToCItem } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import heroImg from "@/public/images/eth.png"

const Page = async ({ params }: { params: { locale: Lang } }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations({
    locale,
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
      {/* <WhatIsEtherPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      /> */}

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
