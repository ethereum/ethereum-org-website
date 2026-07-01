import { MDXRemoteProps } from "next-mdx-remote"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, TutorialFrontmatter } from "@/lib/interfaces"

import Breadcrumbs from "@/components/Breadcrumbs"
import CallToContribute from "@/components/CallToContribute"
import ContentFeedback from "@/components/ContentFeedback"
import Emoji from "@/components/Emoji"
import EnvWarningBanner from "@/components/EnvWarningBanner"
import FileContributors from "@/components/FileContributors"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import PageActions from "@/components/PageActions"
import TableOfContents from "@/components/TableOfContents"
import TutorialMetadata from "@/components/TutorialMetadata"
import TranslationBanner from "@/components/TranslationBanner"
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
    <div className="flex justify-between gap-8">
      <TranslationBanner contentNotTranslated={contentNotTranslated} />

      <main
        className="max-w-4xl min-w-0 px-4 py-8 md:px-8 lg:py-16"
        dir={contentNotTranslated ? "ltr" : "unset"}
      >
        <MainArticle className="flow">
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
        </MainArticle>

        {/* End-of-page actions */}
        <ContentFeedback />
      </main>

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
