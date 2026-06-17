import { MDXRemoteProps } from "next-mdx-remote"

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
import PageActions from "@/components/PageActions"
import TableOfContents from "@/components/TableOfContents"
import TutorialMetadata from "@/components/TutorialMetadata"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { mdxTableComponents } from "@/components/ui/mdx-table-components"
import YouTube from "@/components/YouTube"

import { getEditPath } from "@/lib/utils/editPath"

export const tutorialsComponents = {
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
  const hideEditButton =
    slug.startsWith("latest/") || !!frontmatter.hideEditButton

  return (
    <div className="flex w-full gap-8">
      <MainArticle
        className="flow max-w-screen-lg min-w-0 px-8 lg:py-8"
        dir={contentNotTranslated ? "ltr" : "unset"}
      >
        <Breadcrumbs
          slug={[
            ...slug.split("/").slice(0, -1),
            frontmatter.breadcrumb || slug.split("/").slice(-1),
          ].join("/")}
          startDepth={1}
        />
        <h1>{frontmatter.title}</h1>
        <TutorialMetadata frontmatter={frontmatter} timeToRead={timeToRead} />
        <PageActions
          slug={slug}
          isTranslated={!contentNotTranslated}
          editPath={absoluteEditPath}
          hideEditButton={hideEditButton}
          className="-ms-2 mb-6 lg:mt-6"
        />
        <TableOfContents
          className="pt-6"
          items={tocItems}
          maxDepth={frontmatter.sidebarDepth!}
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
            className="my-6 max-h-128 w-full rounded-xl object-cover"
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
        />
      )}
    </div>
  )
}
