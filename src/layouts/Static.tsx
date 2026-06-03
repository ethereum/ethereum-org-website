import { useLocale } from "next-intl"

import type { ChildOnlyProp, Lang } from "@/lib/types"
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
import SocialListItem from "@/components/SocialListItem"
import TableOfContents from "@/components/TableOfContents"
import Translation from "@/components/Translation"
import TranslationChartImage from "@/components/TranslationChartImage"
import { Alert } from "@/components/ui/alert"
import Callout from "@/components/ui/callout"
import { Flex, Stack } from "@/components/ui/flex"
import Link from "@/components/ui/Link"
import WhitepaperBridge from "@/components/WhitepaperBridge"

import { getEditPath } from "@/lib/utils/editPath"
import { isLangRightToLeft } from "@/lib/utils/translations"

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

              {!slug.includes("/whitepaper") && lastEditLocaleTimestamp && (
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

          <MainArticle className="flow max-w-3xl">
            <TableOfContents
              className="relative"
              items={tocItems}
              maxDepth={frontmatter.sidebarDepth || 2}
              hideEditButton={!!frontmatter.hideEditButton}
              isMobile
            />
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
          editPath={absoluteEditPath}
          items={tocItems}
          maxDepth={frontmatter.sidebarDepth || 2}
          hideEditButton={!!frontmatter.hideEditButton}
        />
      </Flex>
    </div>
  )
}
