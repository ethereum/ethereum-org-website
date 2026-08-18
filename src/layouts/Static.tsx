import type { StaticImageData } from "next/image"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, StaticFrontmatter } from "@/lib/interfaces"

import ContentFeedback from "@/components/ContentFeedback"
import Contributors from "@/components/Contributors"
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart"
import FileContributors from "@/components/FileContributors"
import GlossaryDefinition from "@/components/Glossary/GlossaryDefinition"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import { HubHero, PageHero } from "@/components/Hero"
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

import guideHeroImg from "@/public/images/heroes/guides-hub-hero.jpg"
import civicInfrastructureImg from "@/public/images/organizations/detail-pages/civic-infrastructure.png"
import credentialsAndConfidentialityImg from "@/public/images/organizations/detail-pages/credentials-and-confidentiality.png"
import marketSystemsImg from "@/public/images/organizations/detail-pages/market-systems.png"
import resilientOperationsImg from "@/public/images/organizations/detail-pages/resilient-operations.png"
import sharedInfrastructureImg from "@/public/images/organizations/detail-pages/shared-infrastructure.png"

type OrganizationPageDesign = {
  heroClassName: string
  mainClassName: string
  articleClassName: string
  heroImage: StaticImageData
}

const organizationPageDesigns: Record<string, OrganizationPageDesign> = {
  "enterprise/why-ethereum": {
    heroClassName:
      "border-y bg-linear-to-br from-accent-a/15 via-background to-background",
    mainClassName: "bg-background",
    articleClassName: "max-w-4xl",
    heroImage: sharedInfrastructureImg,
  },
  "enterprise/use-cases": {
    heroClassName: "border-y bg-background-highlight",
    mainClassName: "bg-background-low/40",
    articleClassName: "max-w-4xl",
    heroImage: marketSystemsImg,
  },
  "enterprise/digital-assets": {
    heroClassName:
      "border-y bg-linear-to-br from-accent-b/10 via-background to-background",
    mainClassName: "bg-background",
    articleClassName: "max-w-3xl border-s-2 border-accent-b ps-space-2x",
    heroImage: marketSystemsImg,
  },
  "enterprise/onchain-markets": {
    heroClassName: "border-y bg-background-highlight",
    mainClassName: "bg-background-low/40",
    articleClassName: "max-w-4xl",
    heroImage: marketSystemsImg,
  },
  "enterprise/verifiable-credentials": {
    heroClassName: "border-y bg-card-gradient-secondary",
    mainClassName: "bg-background",
    articleClassName: "max-w-3xl border-s-2 border-primary ps-space-2x",
    heroImage: credentialsAndConfidentialityImg,
  },
  "enterprise/architecture": {
    heroClassName:
      "border-y bg-linear-to-br from-accent-a/15 via-background to-background",
    mainClassName: "bg-background-low/40",
    articleClassName: "max-w-4xl",
    heroImage: sharedInfrastructureImg,
  },
  "enterprise/confidential-systems": {
    heroClassName: "border-y bg-card-gradient-secondary",
    mainClassName: "bg-background",
    articleClassName: "max-w-3xl border-s-2 border-primary ps-space-2x",
    heroImage: credentialsAndConfidentialityImg,
  },
  "enterprise/operational-resilience": {
    heroClassName:
      "border-y bg-linear-to-br from-primary/10 via-background to-background",
    mainClassName: "bg-background-low/40",
    articleClassName: "max-w-4xl",
    heroImage: resilientOperationsImg,
  },
  "enterprise/due-diligence": {
    heroClassName:
      "border-y bg-linear-to-br from-primary/10 via-background to-background",
    mainClassName: "bg-background",
    articleClassName: "max-w-3xl border-s-2 border-primary ps-space-2x",
    heroImage: resilientOperationsImg,
  },
  "enterprise/get-started": {
    heroClassName:
      "border-y bg-linear-to-br from-primary/10 via-background to-background",
    mainClassName: "bg-background-low/40",
    articleClassName: "max-w-4xl",
    heroImage: resilientOperationsImg,
  },
  "enterprise/evidence-and-data": {
    heroClassName:
      "border-y bg-linear-to-br from-accent-a/15 via-background to-background",
    mainClassName: "bg-background",
    articleClassName: "max-w-3xl border-s-2 border-accent-a ps-space-2x",
    heroImage: sharedInfrastructureImg,
  },
  "institutions/civil-society-and-development": {
    heroClassName:
      "border-y bg-linear-to-br from-accent-c/15 via-background to-background",
    mainClassName: "bg-background-low/40",
    articleClassName: "max-w-4xl",
    heroImage: civicInfrastructureImg,
  },
  "institutions/policy-and-procurement": {
    heroClassName:
      "border-y bg-linear-to-br from-accent-c/15 via-background to-background",
    mainClassName: "bg-background",
    articleClassName: "max-w-3xl border-s-2 border-accent-c ps-space-2x",
    heroImage: civicInfrastructureImg,
  },
  "institutions/evidence-and-case-studies": {
    heroClassName:
      "border-y bg-linear-to-br from-accent-c/15 via-background to-background",
    mainClassName: "bg-background-low/40",
    articleClassName: "max-w-4xl",
    heroImage: civicInfrastructureImg,
  },
}

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
  const organizationPageDesign = organizationPageDesigns[slug]
  const heroImg = frontmatter.heroImage
    ? {
        src: frontmatter.heroImage,
        width: frontmatter.heroImageWidth ?? 760,
        height: frontmatter.heroImageHeight ?? 450,
      }
    : undefined
  const organizationHeroImage = organizationPageDesign?.heroImage || heroImg

  return (
    <div dir={contentNotTranslated ? "ltr" : "unset"}>
      {isGuidesHub ? (
        <HubHero
          heroImg={guideHeroImg}
          header={frontmatter.title}
          description={frontmatter.description}
        />
      ) : (
        <PageHero
          breadcrumbs={{ slug }}
          heroImg={organizationHeroImage}
          blurDataURL={frontmatter.heroBlurDataURL}
          title={frontmatter.title}
          description={
            organizationPageDesign ? frontmatter.description : undefined
          }
          variant="no-divider"
          className={organizationPageDesign?.heroClassName}
        />
      )}

      <main
        className={cn(
          "px-page pb-page",
          isGuidesHub && "pt-page",
          organizationPageDesign?.mainClassName
        )}
      >
        <Flex className="w-full justify-between gap-x-space-3x max-lg:flex-col">
          <TableOfContents
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth || 2}
            isMobile
          />

          <MainArticle
            className={cn(
              "flow max-w-3xl",
              organizationPageDesign?.articleClassName,
              "**:[h1]:hidden" // TODO: Remove when non-English Static markdown update to remove `#` h1 line
            )}
          >
            <PageActions
              slug={slug}
              isTranslated={!contentNotTranslated}
              editPath={absoluteEditPath}
              hideEditButton={!!frontmatter.hideEditButton}
              className="my-4"
            />

            {children}

            {!frontmatter.hideEditButton && (
              <FileContributors
                className="mt-space-3x border-t"
                contributors={contributors}
                lastEditLocaleTimestamp={lastEditLocaleTimestamp}
              />
            )}
          </MainArticle>

          <TableOfContents
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth || 2}
          />
        </Flex>

        {/* End-of-page actions */}
        <ContentFeedback isArticle />
      </main>
    </div>
  )
}
