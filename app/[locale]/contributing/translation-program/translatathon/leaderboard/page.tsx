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

import { Leaderboard } from "./_components/Leaderboard"

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

  // JSON-LD structured data for the translatathon leaderboard page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/contributing/translation-program/translatathon/leaderboard/`,
    name: "2025 Ethereum.org Translatathon Leaderboard",
    description:
      "Leaderboard for the 2025 Ethereum.org Translatathon showing translation progress and participant rankings",
    url: `https://ethereum.org/${locale}/contributing/translation-program/translatathon/leaderboard/`,
    inLanguage: locale,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://ethereum.org/${locale}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contributing",
          item: `https://ethereum.org/${locale}/contributing/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Translation Program",
          item: `https://ethereum.org/${locale}/contributing/translation-program/`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Translatathon",
          item: `https://ethereum.org/${locale}/contributing/translation-program/translatathon/`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Leaderboard",
          item: `https://ethereum.org/${locale}/contributing/translation-program/translatathon/leaderboard/`,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Ethereum Foundation",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  const competitionJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "2025 Ethereum.org Translatathon",
    description:
      "Translation competition for the Ethereum.org website with participant leaderboard and rankings",
    url: `https://ethereum.org/${locale}/contributing/translation-program/translatathon/leaderboard/`,
    organizer: {
      "@type": "Organization",
      name: "Ethereum Foundation",
      url: "https://ethereum.org",
    },
    startDate: "2025-08-08T00:00:00",
    endDate: "2025-08-08T00:00:00",
    location: {
      "@type": "VirtualLocation",
      name: "Online",
      url: `https://ethereum.org/${locale}/contributing/translation-program/translatathon/`,
    },
    image: ["https://ethereum.org/images/heroes/translatathon-hero.png"],
    award: "Recognition and prizes for top translators",
    eventStatus: "https://schema.org/EventScheduled",
  }

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
      <script
        id="jsonld-webpage-translatathon-leaderboard"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />
      <script
        id="jsonld-competition-translatathon"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(competitionJsonLd),
        }}
      />
      <div className="relative mt-4">
        <ContentHero {...heroProps} />
      </div>

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
