import { MDXRemoteProps } from "next-mdx-remote"

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

import { getEditPath } from "@/lib/utils/editPath"
import { addSlashes } from "@/lib/utils/url"

const BackToTop = (props: ChildOnlyProp) => (
  <div className="display-none mt-12 flex border-t pt-8" {...props}>
    <InlineLink href="#top">
      <Translation id="page-developers-docs:back-to-top" /> ↑
    </InlineLink>
  </div>
)

export const docsComponents = {
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
        <MainArticle className="flow min-w-0 flex-1 px-8 pt-8 pb-8 md:px-16 md:pt-12 md:pb-16">
          <h1 id="top">{frontmatter.title}</h1>
          {!frontmatter.hideEditButton && (
            <FileContributors
              contributors={contributors}
              lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            />
          )}
          <TableOfContents
            editPath={absoluteEditPath}
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth!}
            hideEditButton={!!frontmatter.hideEditButton}
            isMobile
          />
          {children}
          {isPageIncomplete && <CallToContribute editPath={absoluteEditPath} />}
          <BackToTop />
          <FeedbackCard isArticle />
          <DocsNav contentNotTranslated={contentNotTranslated} />
        </MainArticle>
        {tocItems && (
          <TableOfContents
            className={isPageIncomplete ? "pt-20" : "pt-12"}
            editPath={absoluteEditPath}
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth!}
            hideEditButton={!!frontmatter.hideEditButton}
          />
        )}
      </div>
    </div>
  )
}
