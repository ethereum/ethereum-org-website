import { useLocale } from "next-intl"
import type { HTMLAttributes } from "react"

import type { ChildOnlyProp, Lang } from "@/lib/types"
import type { MdPageContent, StaticFrontmatter } from "@/lib/interfaces"

import { Flex, Stack } from "@/components/atoms/flex"
import Link from "@/components/atoms/Link"
import Breadcrumbs from "@/components/molecules/Breadcrumbs"
import Callout from "@/components/molecules/Callout"
import Contributors from "@/components/molecules/Contributors"
import FeedbackCard from "@/components/molecules/FeedbackCard"
import FileContributors from "@/components/molecules/FileContributors"
import Logo from "@/components/molecules/Logo"
import MainArticle from "@/components/molecules/MainArticle"
import SocialListItem from "@/components/molecules/SocialListItem"
import TranslationChartImage from "@/components/molecules/TranslationChartImage"
import EventsOrganizerBanner from "@/components/organisms/Banners/EventsOrganizerBanner"
import EnergyConsumptionChart from "@/components/organisms/EnergyConsumptionChart"
import GlossaryDefinition from "@/components/organisms/Glossary/GlossaryDefinition"
import GlossaryTooltip from "@/components/organisms/Glossary/GlossaryTooltip"
import { HubHero } from "@/components/organisms/Hero"
import NetworkUpgradeSummary from "@/components/organisms/History/NetworkUpgradeSummary"
import ListenToPlayer from "@/components/organisms/ListenToPlayer"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/organisms/MdComponents"
import TableOfContents from "@/components/organisms/TableOfContents"
import { Alert } from "@/components/ui/alert"
import MatomoOptOut from "@/components/utilities/MatomoOptOut"
import Translation from "@/components/utilities/Translation"

import { getEditPath } from "@/lib/utils/editPath"
import { isLangRightToLeft } from "@/lib/utils/translations"

import GuideHeroImage from "@/public/images/heroes/guides-hub-hero.jpg"

const Heading1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading1 className="md:text-5xl" {...props} />
)
const Heading2 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading2 className="max-md:text-2xl" {...props} />
)
const Heading3 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading3 className="max-md:text-xl" {...props} />
)
const Heading4 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading4 className="max-md:text-md" {...props} />
)

// Static layout components
export const staticComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  Alert,
  Callout,
  Contributors,
  EnergyConsumptionChart,
  EventsOrganizerBanner,
  GlossaryDefinition,
  GlossaryTooltip,
  Link,
  Logo,
  MatomoOptOut,
  NetworkUpgradeSummary,
  SocialListItem,
  TranslationChartImage,
  ListenToPlayer,
}

type StaticLayoutProps = ChildOnlyProp &
  Pick<
    MdPageContent,
    | "slug"
    | "tocItems"
    | "lastEditLocaleTimestamp"
    | "contentNotTranslated"
    | "contributors"
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
  contributors,
}: StaticLayoutProps) => {
  const locale = useLocale()

  const absoluteEditPath = getEditPath(slug)

  return (
    <div className="w-full">
      <Flex
        className="mx-auto mb-16 w-full justify-between p-8 lg:pt-16"
        dir={contentNotTranslated ? "ltr" : "unset"}
      >
        <div className="w-full">
          {slug === "/guides/" ? (
            <HubHero
              heroImg={GuideHeroImage}
              header={frontmatter.title}
              description={frontmatter.description}
            />
          ) : (
            <Stack className="gap-8">
              <Breadcrumbs slug={slug} />

              {!slug.includes("/whitepaper") && (
                <p
                  className="text-body-medium"
                  dir={isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"}
                >
                  <Translation id="page-last-updated" />:{" "}
                  {lastEditLocaleTimestamp}
                </p>
              )}
            </Stack>
          )}

          <MainArticle className="max-w-3xl">
            <TableOfContents
              className="relative"
              items={tocItems}
              maxDepth={frontmatter.sidebarDepth || 2}
              hideEditButton={!!frontmatter.hideEditButton}
              isMobile
            />
            {children}

            <FileContributors
              className="my-10 border-t"
              contributors={contributors}
              lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            />
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
