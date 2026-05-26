import type { HTMLAttributes } from "react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, StaticFrontmatter } from "@/lib/interfaces"

import Breadcrumbs from "@/components/Breadcrumbs"
import Callout from "@/components/Callout"
import Contributors from "@/components/Contributors"
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import GlossaryDefinition from "@/components/Glossary/GlossaryDefinition"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import { HubHero } from "@/components/Hero"
import NetworkUpgradeSummary from "@/components/History/NetworkUpgradeSummary"
import ListenToPlayer from "@/components/ListenToPlayer"
import Logo from "@/components/Logo"
import MainArticle from "@/components/MainArticle"
import MatomoOptOut from "@/components/MatomoOptOut"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/MdComponents"
import PageActions from "@/components/PageActions"
import SocialListItem from "@/components/SocialListItem"
import TableOfContents from "@/components/TableOfContents"
import TranslationChartImage from "@/components/TranslationChartImage"
import { Alert } from "@/components/ui/alert"
import { Flex } from "@/components/ui/flex"
import Link from "@/components/ui/Link"
import WhitepaperBridge from "@/components/WhitepaperBridge"

import { getEditPath } from "@/lib/utils/editPath"

import { getPlaylistBySlug } from "@/data/listen-to-feature/playlist"

import GuideHeroImage from "@/public/images/heroes/guides-hub-hero.jpg"

const Heading1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading1 className="mt-0 mb-4 md:text-5xl" {...props} />
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

// Static layout components.
export const staticComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  Alert,
  Callout,
  Contributors,
  EnergyConsumptionChart,
  GlossaryDefinition,
  GlossaryTooltip,
  Link,
  Logo,
  MatomoOptOut,
  NetworkUpgradeSummary,
  SocialListItem,
  TranslationChartImage,
  ListenToPlayer,
  WhitepaperBridge,
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
  const absoluteEditPath = getEditPath(slug)
  const hasListenToPlaylist = getPlaylistBySlug(slug).index !== -1

  const isGuidesHub = slug === "/guides/" || slug === "guides"

  return (
    <div className="w-full">
      <Flex
        className="mx-auto mb-16 w-full justify-between p-8 lg:pt-16"
        dir={contentNotTranslated ? "ltr" : "unset"}
      >
        <div className="w-full">
          {isGuidesHub ? (
            <HubHero
              heroImg={GuideHeroImage}
              header={frontmatter.title}
              description={frontmatter.description}
            />
          ) : (
            <div className="mb-6 max-w-3xl lg:mb-8">
              <Breadcrumbs slug={slug} />
            </div>
          )}

          <MainArticle
            className={
              isGuidesHub
                ? "mt-12 max-w-3xl [&>h1:first-of-type]:hidden"
                : "flex max-w-3xl flex-col [&>h1:first-of-type]:-order-1"
            }
          >
            {!isGuidesHub && (
              <PageActions
                slug={slug}
                isTranslated={!contentNotTranslated}
                editPath={absoluteEditPath}
                hideEditButton={!!frontmatter.hideEditButton}
                className="mb-6"
              >
                {hasListenToPlaylist && <ListenToPlayer slug={slug} />}
              </PageActions>
            )}
            <div className="mb-8 lg:hidden">
              <TableOfContents
                items={tocItems}
                maxDepth={frontmatter.sidebarDepth || 2}
                isMobile
              />
            </div>
            {children}

            {!frontmatter.hideEditButton && (
              <FileContributors
                className="my-10 border-t"
                contributors={contributors}
                lastEditLocaleTimestamp={lastEditLocaleTimestamp}
              />
            )}
            <FeedbackCard isArticle />
          </MainArticle>
        </div>
        <TableOfContents
          items={tocItems}
          maxDepth={frontmatter.sidebarDepth || 2}
        />
      </Flex>
    </div>
  )
}
