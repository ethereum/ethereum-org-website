import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, StaticFrontmatter } from "@/lib/interfaces"

import Breadcrumbs from "@/components/Breadcrumbs"
import ContentFeedback from "@/components/ContentFeedback"
import Contributors from "@/components/Contributors"
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart"
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

import { cn } from "@/lib/utils/cn"
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
    <Flex
      className="justify-between p-8 lg:py-16"
      dir={contentNotTranslated ? "ltr" : "unset"}
    >
      <main className="max-w-3xl">
        {isGuidesHub ? (
          <HubHero
            heroImg={GuideHeroImage}
            header={frontmatter.title}
            description={frontmatter.description}
          />
        ) : (
          <>
            <Breadcrumbs slug={slug} />
            <h1 className="mt-6 lg:mt-8">{frontmatter.title}</h1>
            <PageActions
              slug={slug}
              isTranslated={!contentNotTranslated}
              editPath={absoluteEditPath}
              hideEditButton={!!frontmatter.hideEditButton}
              className="my-4"
            />
          </>
        )}

        <MainArticle
          className={cn(
            "flow",
            isGuidesHub && "mt-12",
            "**:[h1]:hidden" // TODO: Remove when non-English Static markdown update to remove `#` h1 line
          )}
        >
          <TableOfContents
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth || 2}
            isMobile
            className="mb-8 lg:hidden"
          />

          {children}

          {!frontmatter.hideEditButton && (
            <FileContributors
              className="my-10 border-t"
              contributors={contributors}
              lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            />
          )}
        </MainArticle>

        {/* End-of-page actions */}
        <ContentFeedback isArticle />
      </main>
      <TableOfContents
        items={tocItems}
        maxDepth={frontmatter.sidebarDepth || 2}
      />
    </Flex>
  )
}
