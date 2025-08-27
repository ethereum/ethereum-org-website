import { setRequestLocale } from "next-intl/server"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import LeftNavBar from "@/components/LeftNavBar"
import MainArticle from "@/components/MainArticle"
import { ApplyNow } from "@/components/Translatathon/ApplyNow"
import PaperformCallToAction from "@/components/Translatathon/PaperformCallToAction"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"

import { BASE_TIME_UNIT } from "@/lib/constants"

import { fetchTranslatathonTranslators } from "@/lib/api/fetchTranslatathonTranslators"

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
    heroImg: "/images/heroes/translatathon-hero.svg",
    blurDataURL: "",
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

  return (
    <>
      <ContentHero {...heroProps} />

      <div className="mx-auto mb-16 flex w-full flex-col justify-between lg:flex-row lg:pt-16 lg:first-of-type:[&_h2]:mt-0">
        <LeftNavBar
          className="max-lg:hidden"
          dropdownLinks={dropdownLinks}
          tocItems={[
            {
              title: "Leaderboard",
              url: "#leaderboard",
            },
            {
              title: "Apply now",
              url: "#apply-now",
            },
          ]}
          maxDepth={0}
        />
        <MainArticle className="relative flex-[1_1_992px] px-8 pb-8">
          <div className="flex flex-col gap-4">
            <h2 id="leaderboard">Leaderboard</h2>
            {translatathonTranslators.length > 0 ? (
              <div>
                {translatathonTranslators.map((translator) => (
                  <div key={translator.username}>
                    <p>{translator.username}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">No data available</div>
            )}
          </div>
          <div id="apply-now">
            <ApplyNow />
          </div>
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
