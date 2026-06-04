import { MDXRemoteProps } from "next-mdx-remote"
import type { HTMLAttributes } from "react"

import { ChildOnlyProp } from "@/lib/types"
import type { DocsFrontmatter, MdPageContent } from "@/lib/interfaces"

import CallToContribute from "@/components/CallToContribute"
import DeveloperDocsLinks from "@/components/DeveloperDocsLinks"
import DocsNav from "@/components/DocsNav"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/MdComponents"
import PageActions from "@/components/PageActions"
import { PieChart } from "@/components/PieChart"
import SideNav from "@/components/SideNav"
import SideNavMobile from "@/components/SideNavMobile"
import TableOfContents from "@/components/TableOfContents"
import Translation from "@/components/Translation"
import { Alert } from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import InlineLink from "@/components/ui/Link"
import { mdxTableComponents } from "@/components/ui/mdx-table-components"
import YouTube from "@/components/YouTube"

import { cn } from "@/lib/utils/cn"
import { getEditPath } from "@/lib/utils/editPath"
import { addSlashes } from "@/lib/utils/url"

const baseHeadingClasses = "scroll-mt-40 break-words"

const H1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading1
    className={cn(baseHeadingClasses, "mt-0 mb-3 max-md:text-[2rem]")}
    {...props}
  />
)

const H2 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading2
    className={cn(
      baseHeadingClasses,
      "mt-12 border-b border-[#e5e5e5] pb-2 text-2xl max-md:leading-4xs dark:border-[#333]"
    )}
    {...props}
  />
)

const baseSubHeadingClasses = "leading-xs break-words"

const H3 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading3 className={cn(baseSubHeadingClasses, "mt-12")} {...props} />
)

const H4 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading4 className={baseSubHeadingClasses} {...props} />
)

const BackToTop = (props: ChildOnlyProp) => (
  <div className="display-none mt-12 flex border-t pt-8" {...props}>
    <InlineLink href="#top">
      <Translation id="page-developers-docs:back-to-top" /> ↑
    </InlineLink>
  </div>
)

export const docsComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  ...mdxTableComponents,
  ButtonLink,
  Card: MarkdownCard,
  CallToContribute,
  DeveloperDocsLinks,
  Divider,
  Emoji,
  GlossaryTooltip,
  PieChart,
  YouTube,
} as MDXRemoteProps["components"]

type DocsLayoutProps = Pick<
  MdPageContent,
  | "slug"
  | "tocItems"
  | "lastEditLocaleTimestamp"
  | "contributors"
  | "contentNotTranslated"
> &
  ChildOnlyProp & {
    frontmatter: DocsFrontmatter
  }

export const DocsLayout = ({
  children,
  slug,
  frontmatter,
  tocItems,
  lastEditLocaleTimestamp,
  contributors,
  contentNotTranslated,
}: DocsLayoutProps) => {
  const isPageIncomplete = !!frontmatter.incomplete
  const absoluteEditPath = getEditPath(slug)

  return (
    <div className="flex w-full flex-col border-b">
      <SideNavMobile path={slug} />
      {isPageIncomplete && (
        <Alert variant="banner">
          <Translation id="page-developers-docs:banner-page-incomplete" />
        </Alert>
      )}
      <div
        className="flex justify-between bg-background-highlight lg:pe-8"
        dir={contentNotTranslated ? "ltr" : "unset"}
      >
        <SideNav path={addSlashes(slug)} />
        <MainArticle className="min-w-0 flex-1 px-8 pt-8 pb-8 md:px-16 md:pt-12 md:pb-16">
          <H1 id="top">{frontmatter.title}</H1>
          <PageActions
            slug={slug}
            isTranslated={!contentNotTranslated}
            editPath={absoluteEditPath}
            hideEditButton={!!frontmatter.hideEditButton}
            className="-ms-2 mb-10 lg:mb-12"
          />
          <TableOfContents
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth!}
            isMobile
          />
          <div className="prose prose-lg max-w-none break-words">
            {children}
          </div>
          {isPageIncomplete && <CallToContribute editPath={absoluteEditPath} />}
          {!frontmatter.hideEditButton && (
            <FileContributors
              className="my-10 border-t"
              contributors={contributors}
              lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            />
          )}
          <BackToTop />
          <FeedbackCard isArticle />
          <DocsNav contentNotTranslated={contentNotTranslated} />
        </MainArticle>
        {tocItems && (
          <TableOfContents
            className={isPageIncomplete ? "pt-20" : "pt-12"}
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth!}
          />
        )}
      </div>
    </div>
  )
}
