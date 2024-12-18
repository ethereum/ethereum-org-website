import { useRouter } from "next/router"
import type { HTMLAttributes } from "react"
import { Badge } from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, TutorialFrontmatter } from "@/lib/interfaces"

import { ButtonLink } from "@/components/Buttons"
import CallToContribute from "@/components/CallToContribute"
import Card from "@/components/Card"
import Codeblock from "@/components/Codeblock"
import Emoji from "@/components/Emoji"
import EnvWarningBanner from "@/components/EnvWarningBanner"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import InfoBanner from "@/components/InfoBanner"
import MainArticle from "@/components/MainArticle"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/MdComponents"
import TableOfContents from "@/components/TableOfContents"
import TooltipLink from "@/components/TooltipLink"
import TutorialMetadata from "@/components/TutorialMetadata"
import { mdxTableComponents } from "@/components/ui/Table"
import YouTube from "@/components/YouTube"

import { getEditPath } from "@/lib/utils/editPath"

const Heading1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading1
    className="font-monospace uppercase max-lg:text-[1.75rem]"
    {...props}
  />
)

const Heading2 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading2
    className="mt-12 scroll-mt-40 font-monospace uppercase max-md:text-2xl"
    {...props}
  />
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
  <p className="mx-0 mb-4 mt-8 break-words" {...props} />
)

const KBD = (props: HTMLAttributes<HTMLElement>) => (
  <kbd
    className="rounded-sm border-2 border-primary px-2 py-0.5 align-middle"
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
  pre: Codeblock,
  ...mdxTableComponents,
  Badge,
  ButtonLink,
  CallToContribute,
  Card,
  Emoji,
  EnvWarningBanner,
  InfoBanner,
  YouTube,
}
type TutorialLayoutProps = ChildOnlyProp &
  Pick<MdPageContent, "tocItems" | "contributors" | "contentNotTranslated"> &
  Required<Pick<MdPageContent, "lastEditLocaleTimestamp">> & {
    frontmatter: TutorialFrontmatter
    timeToRead: number
  }

export const TutorialLayout = ({
  children,
  frontmatter,
  tocItems,
  timeToRead,
  lastEditLocaleTimestamp,
  contributors,
  contentNotTranslated,
}: TutorialLayoutProps) => {
  const { asPath: relativePath } = useRouter()
  const absoluteEditPath = getEditPath(relativePath)

  return (
    <div className="flex w-full gap-8 border-b bg-background p-8 lg:mx-auto lg:bg-background-highlight lg:shadow">
      <MainArticle
        className="min-w-0 max-w-[1000px] rounded bg-background p-0 lg:p-16 lg:shadow"
        dir={contentNotTranslated ? "ltr" : "unset"}
      >
        <Heading1>{frontmatter.title}</Heading1>
        <TutorialMetadata frontmatter={frontmatter} timeToRead={timeToRead} />
        <TableOfContents
          className="pt-8"
          items={tocItems}
          maxDepth={frontmatter.sidebarDepth!}
          editPath={absoluteEditPath}
          isMobile
        />
        {children}
        <FileContributors
          contributors={contributors}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        />
        <FeedbackCard />
      </MainArticle>
      {tocItems && (
        <TableOfContents
          className="pt-8"
          items={tocItems}
          maxDepth={frontmatter.sidebarDepth!}
          editPath={absoluteEditPath}
          hideEditButton={!!frontmatter.hideEditButton}
        />
      )}
    </div>
  )
}
