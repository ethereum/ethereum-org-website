import { useRouter } from "next/router"
import { type HeadingProps } from "@chakra-ui/react"

import type { ChildOnlyProp, Lang } from "@/lib/types"
import type { MdPageContent, StaticFrontmatter } from "@/lib/interfaces"

import Breadcrumbs from "@/components/Breadcrumbs"
import Callout from "@/components/Callout"
import Contributors from "@/components/Contributors"
import DevconGrantsBanner from "@/components/DevconGrantsBanner"
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart"
import FeedbackCard from "@/components/FeedbackCard"
import GlossaryDefinition from "@/components/Glossary/GlossaryDefinition"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import { HubHero } from "@/components/Hero"
import NetworkUpgradeSummary from "@/components/History/NetworkUpgradeSummary"
import Logo from "@/components/Logo"
import MainArticle from "@/components/MainArticle"
import MatomoOptOut from "@/components/MatomoOptOut"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/MdComponents"
import MeetupList from "@/components/MeetupList"
import SocialListItem from "@/components/SocialListItem"
import TableOfContents from "@/components/TableOfContents"
import { TranslatathonBanner } from "@/components/Translatathon/TranslatathonBanner"
import Translation from "@/components/Translation"
import TranslationChartImage from "@/components/TranslationChartImage"
import { Flex, Stack } from "@/components/ui/flex"
import Link from "@/components/ui/Link"
import UpcomingEventsList from "@/components/UpcomingEventsList"

import { getEditPath } from "@/lib/utils/editPath"
import { isLangRightToLeft } from "@/lib/utils/translations"

import GuideHeroImage from "@/public/images/heroes/guides-hub-hero.jpg"

const Heading1 = (props: HeadingProps) => (
  <MdHeading1 fontSize={{ base: "2.5rem", md: "5xl" }} {...props} />
)
const Heading2 = (props: HeadingProps) => (
  <MdHeading2 fontSize={{ base: "2xl", md: "2rem" }} {...props} />
)
const Heading3 = (props: HeadingProps) => (
  <MdHeading3 fontSize={{ base: "xl", md: "2xl" }} {...props} />
)
const Heading4 = (props: HeadingProps) => (
  <MdHeading4 fontSize={{ base: "md", md: "xl" }} {...props} />
)

// Static layout components
export const staticComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  Callout,
  Contributors,
  EnergyConsumptionChart,
  GlossaryDefinition,
  GlossaryTooltip,
  Link,
  Logo,
  MatomoOptOut,
  MeetupList,
  NetworkUpgradeSummary,
  SocialListItem,
  TranslationChartImage,
  UpcomingEventsList,
}

type StaticLayoutProps = ChildOnlyProp &
  Pick<
    MdPageContent,
    "slug" | "tocItems" | "lastEditLocaleTimestamp" | "contentNotTranslated"
  > & {
    frontmatter: StaticFrontmatter
  }
export const StaticLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  lastEditLocaleTimestamp,
  contentNotTranslated,
}: StaticLayoutProps) => {
  const { locale, asPath } = useRouter()

  const absoluteEditPath = getEditPath(slug)

  return (
    <div className="w-full">
      <TranslatathonBanner pathname={asPath} />
      <DevconGrantsBanner pathname={asPath} />
      <Flex
        className="mx-auto mb-16 w-full justify-between p-8 lg:pt-16"
        dir={contentNotTranslated ? "ltr" : "unset"}
      >
        <div className="w-full">
          {slug === "/guides/" ? (
            <HubHero
              heroImg={GuideHeroImage}
              header={frontmatter.title}
              title={""}
              description={frontmatter.description}
            />
          ) : (
            <Stack className="gap-8">
              <Breadcrumbs slug={slug} />

              <p
                className="text-sm text-[#666] dark:text-[#b2b2b2]"
                dir={isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"}
              >
                <Translation id="page-last-updated" />:{" "}
                {lastEditLocaleTimestamp}
              </p>
            </Stack>
          )}

          <MainArticle className="max-w-3xl">
            <TableOfContents
              position="relative"
              zIndex={2}
              items={tocItems}
              isMobile
              maxDepth={frontmatter.sidebarDepth || 2}
              hideEditButton={!!frontmatter.hideEditButton}
            />
            {children}

            <FeedbackCard isArticle />
          </MainArticle>
        </div>
        <TableOfContents
          editPath={absoluteEditPath}
          items={tocItems}
          maxDepth={frontmatter.sidebarDepth || 2}
          hideEditButton={!!frontmatter.hideEditButton}
        />
      </Flex>
    </div>
  )
}
