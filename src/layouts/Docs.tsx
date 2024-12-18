import { useRouter } from "next/router"
import type { HTMLAttributes } from "react"
import { Badge } from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"
import type { DocsFrontmatter, MdPageContent } from "@/lib/interfaces"

import BannerNotification from "@/components/Banners/BannerNotification"
import { ButtonLink } from "@/components/Buttons"
import CallToContribute from "@/components/CallToContribute"
import Card from "@/components/Card"
import Codeblock from "@/components/Codeblock"
import DeveloperDocsLinks from "@/components/DeveloperDocsLinks"
import DocsNav from "@/components/DocsNav"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import InfoBanner from "@/components/InfoBanner"
import MainArticle from "@/components/MainArticle"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/MdComponents"
import SideNav from "@/components/SideNav"
import SideNavMobile from "@/components/SideNavMobile"
import TableOfContents from "@/components/TableOfContents"
import Translation from "@/components/Translation"
import { Divider } from "@/components/ui/divider"
import InlineLink from "@/components/ui/Link"
import { mdxTableComponents } from "@/components/ui/Table"
import YouTube from "@/components/YouTube"

import { cn } from "@/lib/utils/cn"
import { getEditPath } from "@/lib/utils/editPath"

const baseHeadingClasses =
  "font-mono uppercase font-bold scroll-mt-40 break-words"

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
      <Translation id="back-to-top" /> ↑
    </InlineLink>
  </div>
)

export const docsComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  pre: Codeblock,
  ...mdxTableComponents,
  Badge,
  ButtonLink,
  Card,
  CallToContribute,
  DeveloperDocsLinks,
  Divider,
  Emoji,
  GlossaryTooltip,
  InfoBanner,
  YouTube,
}

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
  frontmatter,
  tocItems,
  lastEditLocaleTimestamp,
  contributors,
  contentNotTranslated,
}: DocsLayoutProps) => {
  const isPageIncomplete = !!frontmatter.incomplete
  const { asPath: relativePath } = useRouter()
  const absoluteEditPath = getEditPath(relativePath)

  return (
    <div className="flex w-full flex-col border-b">
      <SideNavMobile path={relativePath} />
      {isPageIncomplete && (
        <BannerNotification shouldShow={isPageIncomplete}>
          <Translation id="page-developers-docs:banner-page-incomplete" />
        </BannerNotification>
      )}
      <div
        className="flex justify-between bg-background-highlight lg:pe-8"
        dir={contentNotTranslated ? "ltr" : "unset"}
      >
        <SideNav path={relativePath} />
        <MainArticle className="min-w-0 flex-1 px-8 pb-8 pt-8 md:px-16 md:pb-16 md:pt-12">
          <H1 id="top">{frontmatter.title}</H1>
          <FileContributors
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
          <TableOfContents
            editPath={absoluteEditPath}
            items={tocItems}
            isMobile
            maxDepth={frontmatter.sidebarDepth!}
            hideEditButton={!!frontmatter.hideEditButton}
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
