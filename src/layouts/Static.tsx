import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, StaticFrontmatter } from "@/lib/interfaces"

import Breadcrumbs from "@/components/Breadcrumbs"
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
import PageActions from "@/components/PageActions"
import SocialListItem from "@/components/SocialListItem"
import TableOfContents from "@/components/TableOfContents"
import TranslationChartImage from "@/components/TranslationChartImage"
import { Alert } from "@/components/ui/alert"
import Callout from "@/components/ui/callout"
import { Flex } from "@/components/ui/flex"
import Link from "@/components/ui/Link"
import WhitepaperBridge from "@/components/WhitepaperBridge"

import { getEditPath } from "@/lib/utils/editPath"

import GuideHeroImage from "@/public/images/heroes/guides-hub-hero.jpg"

// Static layout components
export const staticComponents = {
  Alert,
  Callout,
  Contributors,
  EnergyConsumptionChart,
  GlossaryDefinition,
  GlossaryTooltip,
  Link, // TODO: Refactor /community/online/ `Link` usage to `[]()` then deprecate this
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
                ? "flow mt-12 max-w-3xl [&>h1:first-of-type]:hidden"
                : "flow flex max-w-3xl flex-col [&>h1:first-of-type]:-order-1"
            }
          >
            {!isGuidesHub && (
              <PageActions
                slug={slug}
                isTranslated={!contentNotTranslated}
                editPath={absoluteEditPath}
                hideEditButton={!!frontmatter.hideEditButton}
                className="-ms-2 mb-6"
              />
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
