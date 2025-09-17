import { setRequestLocale } from "next-intl/server"

import { CommitHistory, Lang } from "@/lib/types"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import { ApplyNow } from "@/components/Translatathon/ApplyNow"
import { APPLICATION_END_DATE } from "@/components/Translatathon/constants"
import PaperformCallToAction from "@/components/Translatathon/PaperformCallToAction"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { isDateReached } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"

import { BASE_TIME_UNIT } from "@/lib/constants"

import { Leaderboard } from "./_components/Leaderboard"
import TranslatathonLeaderboardJsonLD from "./page-jsonld"

import { fetchTranslatathonTranslators } from "@/lib/api/fetchTranslatathonTranslators"
import heroImg from "@/public/images/heroes/translatathon-hero.png"

// 24 hours
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const loadData = dataLoader(
  [["translatathonTranslators", fetchTranslatathonTranslators]],
  REVALIDATE_TIME * 1000
)

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const [translatathonTranslators] = await loadData()

  const heroProps = {
    title: "2025 Ethereum.org Translatathon",
    breadcrumbs: {
      slug: "/contributing/translation-program/translatathon/leaderboard",
      startDepth: 1,
    },
    heroImg: heroImg,
    description: (
      <>
        <p>Leaderboard for the 2025 Ethereum.org Translatathon</p>
      </>
    ),
    buttons: [
      <PaperformCallToAction
        key="apply"
        content="Apply to translate"
        variant="solid"
      />,
    ],
  } satisfies ContentHeroProps

  const dropdownLinks: ButtonDropdownList = {
    text: "Translatathon menu",
    ariaLabel: "Translatathon menu",
    items: [
      {
        text: "Translatathon",
        href: "/contributing/translation-program/translatathon",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "translatathon translatathon hub",
        },
      },
      {
        text: "Leaderboard",
        href: "/contributing/translation-program/translatathon/leaderboard",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "translatathon leaderboard",
        },
      },
      {
        text: "Details and submission criteria",
        href: "/contributing/translation-program/translatathon/details",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "translatathon details and submission criteria",
        },
      },
      {
        text: "Terms and conditions",
        href: "/contributing/translation-program/translatathon/terms-and-conditions",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "translatathon terms and conditions",
        },
      },
    ],
  }

  const tocItems = [
    {
      title: "Leaderboard",
      url: "#leaderboard",
    },
  ]

  if (isDateReached(APPLICATION_END_DATE)) {
    tocItems.push({
      title: "Apply now",
      url: "#apply-now",
    })
  }

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "contributing/translation-program/translatathon/leaderboard",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <>
      <TranslatathonLeaderboardJsonLD
        locale={locale}
        contributors={contributors}
      />
      <div className="relative mt-4">
        <ContentHero {...heroProps} />
      </div>

      <div className="mx-auto mb-16 flex w-full flex-col justify-between lg:flex-row lg:pt-16 lg:first-of-type:[&_h2]:mt-0">
        <TableOfContents
          dropdownLinks={dropdownLinks}
          items={tocItems}
          variant="left"
        />
        <MainArticle className="relative flex-[1_1_992px] px-8 pb-8">
          <div className="flex flex-col gap-4">
            <h2 id="leaderboard">Leaderboard</h2>
            <p>
              The leaderboard shows all translations submitted by Translatathon
              participants across all eligible projects during the translation
              period. It is updated once daily and may not reflect the real-time
              scores.
            </p>
            <p>
              None of the scores below are final and do not include any bonus
              points, potential disqualifications, or other adjustments.
            </p>
            <p>
              Final scores will be announced after all the evaluations are
              completed!
            </p>
            {translatathonTranslators.length > 0 ? (
              <Leaderboard translators={translatathonTranslators} />
            ) : (
              <div className="text-center text-body-medium">
                No data available
              </div>
            )}
          </div>
          {isDateReached(APPLICATION_END_DATE) && (
            <div id="apply-now">
              <ApplyNow />
            </div>
          )}
        </MainArticle>
      </div>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return await getMetadata({
    locale,
    slug: ["translatathon"],
    title: "2025 Ethereum.org Translatathon",
    description: "2025 Ethereum.org Translatathon",
  })
}

export default Page
