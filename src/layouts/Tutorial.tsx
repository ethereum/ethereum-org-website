import { MDXRemoteProps } from "next-mdx-remote"
import type { HTMLAttributes } from "react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, TutorialFrontmatter } from "@/lib/interfaces"

import Breadcrumbs from "@/components/Breadcrumbs"
import CallToContribute from "@/components/CallToContribute"
import Emoji from "@/components/Emoji"
import EnvWarningBanner from "@/components/EnvWarningBanner"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/MdComponents"
import TableOfContents from "@/components/TableOfContents"
import TooltipLink from "@/components/TooltipLink"
import TutorialMetadata from "@/components/TutorialMetadata"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { mdxTableComponents } from "@/components/ui/mdx-table-components"
import YouTube from "@/components/YouTube"

import { getEditPath } from "@/lib/utils/editPath"

const Heading1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading1 className="max-lg:text-[1.75rem]" {...props} />
)

const Heading2 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading2 className="mt-12 scroll-mt-40 max-md:text-2xl" {...props} />
)

const Heading3 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading3
    className="scroll-mt-40 font-semibold max-md:text-md"
    {...props}
  />
)

const Heading4 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading4
    className="scroll-mt-40 font-semibold max-md:text-md"
    {...props}
  />
)

const Paragraph = (props: HTMLAttributes<HTMLParagraphElement>) => (
  <p className="mx-0 mt-8 mb-4 break-words" {...props} />
)

const KBD = (props: HTMLAttributes<HTMLElement>) => (
  <kbd
    className="rounded-xs border-2 border-primary px-2 py-0.5 align-middle"
    {...props}
  />
)

export const tutorialsComponents = {
  a: TooltipLink,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: Paragraph,
  kbd: KBD,
  ...mdxTableComponents,
  ButtonLink,
  CallToContribute,
  Card: MarkdownCard,
  Emoji,
  EnvWarningBanner,
  YouTube,
} as MDXRemoteProps["components"]

type TutorialLayoutProps = ChildOnlyProp &
  Pick<
    MdPageContent,
    | "tocItems"
    | "contributors"
    | "contentNotTranslated"
    | "slug"
    | "lastEditLocaleTimestamp"
  > & {
    frontmatter: TutorialFrontmatter
    timeToRead: number
  }

export const TutorialLayout = ({
  children,
  slug,
  frontmatter,
  tocItems,
  timeToRead,
  lastEditLocaleTimestamp,
  contributors,
  contentNotTranslated,
}: TutorialLayoutProps) => {
  const absoluteEditPath = getEditPath(slug)
  const heroImage = frontmatter.image

  return (
    <div className="flex w-full gap-8">
      <MainArticle
        className="max-w-screen-lg min-w-0 px-8 lg:py-8"
        dir={contentNotTranslated ? "ltr" : "unset"}
      >
        <Breadcrumbs
          slug={[
            ...slug.split("/").slice(0, -1),
            frontmatter.breadcrumb || slug.split("/").slice(-1),
          ].join("/")}
          startDepth={1}
        />
        <Heading1>{frontmatter.title}</Heading1>
        <TutorialMetadata frontmatter={frontmatter} timeToRead={timeToRead} />
        <TableOfContents
          className="pt-8"
          items={tocItems}
          maxDepth={frontmatter.sidebarDepth!}
          editPath={absoluteEditPath}
          isMobile
        />
        {heroImage && (
          <Image
            src={heroImage}
            alt=""
            width={frontmatter.imageWidth ?? 1200}
            height={frontmatter.imageHeight ?? 630}
            blurDataURL={frontmatter.blurDataURL}
            preload
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="my-6 h-auto w-full rounded-xl"
          />
        )}
        {children}
        {!frontmatter.hideEditButton && (
          <FileContributors
            className="my-10 border-t"
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
        )}
        <FeedbackCard />
      </MainArticle>
      {tocItems && (
        <TableOfContents
          className="pt-16"
          items={tocItems}
          maxDepth={frontmatter.sidebarDepth!}
          editPath={absoluteEditPath}
          hideEditButton={!!frontmatter.hideEditButton}
        />
      )}
    </div>
  )
}
