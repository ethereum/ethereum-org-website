import { MDXRemoteProps } from "next-mdx-remote"

import { ChildOnlyProp } from "@/lib/types"
import type { DocsFrontmatter, MdPageContent } from "@/lib/interfaces"

import CallToContribute from "@/components/CallToContribute"
import ContentFeedback from "@/components/ContentFeedback"
import DeveloperDocsLinks from "@/components/DeveloperDocsLinks"
import DocsNav from "@/components/DocsNav"
import Emoji from "@/components/Emoji"
import FileContributors from "@/components/FileContributors"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import PageActions from "@/components/PageActions"
import { PieChart } from "@/components/PieChart"
import SideNav from "@/components/SideNav"
import SideNavMobile from "@/components/SideNavMobile"
import TableOfContents from "@/components/TableOfContents"
import Translation from "@/components/Translation"
import { Alert } from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { mdxTableComponents } from "@/components/ui/mdx-table-components"
import YouTube from "@/components/YouTube"

import { getEditPath } from "@/lib/utils/editPath"
import { addSlashes } from "@/lib/utils/url"

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

        <main className="min-w-0 flex-1 p-8 xl:p-16">
          <MainArticle className="flow">
            <h1 id="top">{frontmatter.title}</h1>
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
          {isPageIncomplete && <CallToContribute editPath={absoluteEditPath} />}
          <DocsNav contentNotTranslated={contentNotTranslated} />
          <ContentFeedback isArticle />
        </main>

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
