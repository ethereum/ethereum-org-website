import { getTranslations, setRequestLocale } from "next-intl/server"

import type { CommitHistory, Lang, ToCItem } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
// import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import { Card } from "@/components/ui/card"
// import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import heroImg from "@/public/images/ethereum-history-founder-and-ownership/ethereum-history-founder-and-ownership-hero.png"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations({
    locale,
    namespace: "page-ethereum-history-founder-and-ownership",
  })

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "ethereum-history-founder-and-ownership",
      locale as Lang,
      commitHistoryCache
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
  ]

  const heroProps: ContentHeroProps = {
    breadcrumbs: {
      slug: "ethereum-history-founder-and-ownership",
      startDepth: 1,
    },
    heroImg,
    title: t("page-ethereum-history-founder-and-ownership-title"),
    description: (
      <>
        <p>{t("page-ethereum-history-founder-and-ownership-description-1")}</p>
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
            <p>
              {t.rich(
                "page-ethereum-history-founder-and-ownership-who-founded-ethereum-description-1",
                {
                  strong: Strong,
                }
              )}
            </p>
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
                {t(
                  "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-description-3"
                )}
              </p>
              <p>
                {t(
                  "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-description-4"
                )}
              </p>
              <Card className="mx-auto h-fit max-w-[400px] space-y-1 rounded-2xl border bg-background-highlight p-6 [&_[data-label='avatar']]:bg-accent-c">
                <div className="space-y-6">
                  <p>
                    {t(
                      "page-ethereum-history-founder-and-ownership-who-founded-ethereum-launch-description-5"
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <div
                    data-label="avatar"
                    className="grid size-8 place-items-center rounded-full text-body-inverse"
                  >
                    V
                  </div>
                  <div>
                    <p className="font-bold">Vitalik Buterin</p>
                    <p className="text-sm text-body-medium">
                      {t(
                        "page-ethereum-history-founder-and-ownership-Founder of Ethereum"
                      )}
                    </p>
                  </div>
                </div>
              </Card>
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
    namespace: "page-ethereum-history-founder-and-ownership",
  })

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
