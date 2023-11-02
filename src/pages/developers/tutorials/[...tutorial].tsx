import path from "path"
import { ParsedUrlQuery } from "querystring"

import { ReactElement } from "react"
import type { GetServerSideProps } from "next/types"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"

import type { NextPageWithLayout } from "@/lib/types"
import type { TutorialFrontmatter } from "@/lib/interfaces"

import PageMetadata from "@/components/PageMetadata"

import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLastModifiedDate } from "@/lib/utils/gh"
import { getContentBySlug } from "@/lib/utils/md"

import { RootLayout, TutorialLayout } from "@/layouts"
import { staticComponents as components } from "@/layouts/Static"
import rehypeImg from "@/lib/rehype/rehypeImg"

interface Params extends ParsedUrlQuery {
  tutorial: string[]
}

interface Props {
  mdxSource: MDXRemoteSerializeResult
}

const tutorialsPath = path.join("/", "developers", "tutorials")

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const params = context.params!
  const { locale } = context

  const tutorialPath = path.join(tutorialsPath, params.tutorial.join("/"))
  const markdown = getContentBySlug(tutorialPath)
  const frontmatter = markdown.frontmatter as TutorialFrontmatter
  const contentNotTranslated = markdown.contentNotTranslated
  // TODO: see how we can handle the published date on the tutorial's layout
  // since we can't send the Date object anymore
  frontmatter.published = frontmatter.published.toString()

  const mdPath = path.join("/content", ...params.tutorial)
  const mdDir = path.join("public", mdPath)

  const mdxSource = await serialize(markdown.content, {
    mdxOptions: {
      // Required since MDX v2 to compile tables (see https://mdxjs.com/migrating/v2/#gfm)
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeImg, { dir: mdDir, srcPath: mdPath, locale }]],
    },
  })

  const lastUpdatedDate = getLastModifiedDate(tutorialPath, locale!)
  const lastDeployDate = getLastDeployDate()

  return {
    props: {
      mdxSource,
      slug: tutorialPath,
      frontmatter,
      lastUpdatedDate,
      lastDeployDate,
      contentNotTranslated,
    },
  }
}

const ContentPage: NextPageWithLayout<Props> = ({ mdxSource }) => {
  return (
    <>
      {/* // TODO: fix components types, for some reason MDXRemote doesn't like some of them */}
      {/* @ts-ignore */}
      <MDXRemote {...mdxSource} components={components} />
    </>
  )
}

// Per-Page Layouts: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript
ContentPage.getLayout = (page: ReactElement) => {
  // values returned by `getStaticProps` method and passed to the page component
  const {
    slug,
    frontmatter,
    lastUpdatedDate,
    lastDeployDate,
    contentNotTranslated,
  } = page.props

  const rootLayoutProps = {
    contentIsOutdated: frontmatter.isOutdated,
    contentNotTranslated,
    lastDeployDate,
  }
  const layoutProps = { slug, frontmatter, lastUpdatedDate }

  return (
    <RootLayout {...rootLayoutProps}>
      <TutorialLayout {...layoutProps}>
        <PageMetadata
          title={frontmatter.title}
          description={frontmatter.description}
          author={frontmatter.author}
          canonicalUrl={frontmatter.sourceUrl}
        />
        {page}
      </TutorialLayout>
    </RootLayout>
  )
}

export default ContentPage
