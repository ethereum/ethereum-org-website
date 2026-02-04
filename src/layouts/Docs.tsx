import { MDXRemoteProps } from "next-mdx-remote"
import type { HTMLAttributes } from "react"

import { ChildOnlyProp } from "@/lib/types"
import type { DocsFrontmatter, MdPageContent } from "@/lib/interfaces"

import { Divider } from "@/components/atoms/divider"
import InlineLink from "@/components/atoms/Link"
import { mdxTableComponents } from "@/components/atoms/mdx-table-components"
import CallToContribute from "@/components/molecules/CallToContribute"
import Card from "@/components/molecules/Card"
import Codeblock from "@/components/molecules/Codeblock"
import DeveloperDocsLinks from "@/components/molecules/DeveloperDocsLinks"
import FeedbackCard from "@/components/molecules/FeedbackCard"
import FileContributors from "@/components/molecules/FileContributors"
import MainArticle from "@/components/molecules/MainArticle"
import YouTube from "@/components/molecules/YouTube"
import BannerNotification from "@/components/organisms/Banners/BannerNotification"
import DocsNav from "@/components/organisms/DocsNav"
import GlossaryTooltip from "@/components/organisms/Glossary/GlossaryTooltip"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/organisms/MdComponents"
import { PieChart } from "@/components/organisms/PieChart"
import SideNav from "@/components/organisms/SideNav"
import SideNavMobile from "@/components/organisms/SideNavMobile"
import TableOfContents from "@/components/organisms/TableOfContents"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Emoji from "@/components/utilities/Emoji"
import Translation from "@/components/utilities/Translation"

import { cn } from "@/lib/utils/cn"
import { getEditPath } from "@/lib/utils/editPath"
import { addSlashes } from "@/lib/utils/url"

const baseHeadingClasses = "font-bold scroll-mt-40 break-words"

const H1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading1
    className={cn(baseHeadingClasses, "max-md:mt-0 max-md:text-[2rem]")}
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

const baseSubHeadingClasses = "leading-xs font-semibold break-words"

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

const Pre = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const match = props.className?.match(/(language-\S+)/)
  const codeLanguage = match ? match[0] : "plain-text"
  return <Codeblock codeLanguage={codeLanguage} {...props} />
}

export const docsComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  pre: Pre,
  ...mdxTableComponents,
  ButtonLink,
  Card,
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
  Required<Pick<MdPageContent, "lastEditLocaleTimestamp">> &
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
        <BannerNotification shouldShow={isPageIncomplete}>
          <Translation id="page-developers-docs:banner-page-incomplete" />
        </BannerNotification>
      )}
      <div
        className="flex justify-between bg-background-highlight lg:pe-8"
        dir={contentNotTranslated ? "ltr" : "unset"}
      >
        <SideNav path={addSlashes(slug)} />
        <MainArticle className="min-w-0 flex-1 px-8 pb-8 pt-8 md:px-16 md:pb-16 md:pt-12">
          <H1 id="top">{frontmatter.title}</H1>
          <FileContributors
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
          <TableOfContents
            editPath={absoluteEditPath}
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth!}
            hideEditButton={!!frontmatter.hideEditButton}
            isMobile
          />
          <div className="prose prose-lg max-w-none break-words">
            {children}
          </div>
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
