import { ReactElement } from "react"
import { ParsedUrlQuery } from "querystring"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"
import path from "path"
import { Text } from "@chakra-ui/react"

import { getContentBySlug } from "@/lib/utils/md"
import rehypeImg from "@/lib/rehype/rehypeImg"
import rehypeHeadingIds from "@/lib/rehype/rehypeHeadingIds"
import { readingTime } from "@/lib/utils/timeToRead"
import { getLastDeployDate, getLastModifiedDate } from "@/lib/utils/gh"

// Layouts
import { RootLayout, TutorialLayout } from "@/layouts"
import { tutorialsComponents } from "@/layouts"

// Types
import type { GetServerSideProps } from "next/types"
import type { NextPageWithLayout } from "@/lib/types"
import type { TutorialFrontmatter } from "@/lib/interfaces"

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
  const tocItems = markdown.tocItems
  const contentNotTranslated = markdown.contentNotTranslated
  // TODO: see how we can handle the published date on the tutorial's layout
  // since we can't send the Date object anymore
  frontmatter.published = frontmatter.published.toString()

  const mdPath = path.join("/content/developers/tutorials", ...params.tutorial)
  const mdDir = path.join("public", mdPath)
  const timeToRead = readingTime(markdown.content)
  const mdxSource = await serialize(markdown.content, {
    mdxOptions: {
      // Required since MDX v2 to compile tables (see https://mdxjs.com/migrating/v2/#gfm)
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [rehypeImg, { dir: mdDir, srcPath: mdPath, locale }],
        [rehypeHeadingIds],
      ],
    },
  })

  const lastUpdatedDate = await getLastModifiedDate(tutorialPath, locale!)
  const lastDeployDate = await getLastDeployDate()

  return {
    props: {
      mdxSource,
      frontmatter,
      lastUpdatedDate,
      lastDeployDate,
      contentNotTranslated,
      timeToRead,
      tocItems,
    },
  }
}

const ContentPage: NextPageWithLayout<Props> = ({ mdxSource }) => {
  return (
    <>
      {/* // TODO: fix components types, for some reason MDXRemote doesn't like some of them */}
      {/* @ts-ignore */}
      <MDXRemote {...mdxSource} components={tutorialsComponents} />
    </>
  )
}

// Per-Page Layouts: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript
ContentPage.getLayout = (page: ReactElement) => {
  // values returned by `getStaticProps` method and passed to the page component
  const {
    slug,
    frontmatter,
    tocItems,
    timeToRead,
    lastUpdatedDate,
    contentNotTranslated,
    lastDeployDate,
  } = page.props

  const rootLayoutProps = {
    contentIsOutdated: frontmatter.isOutdated,
    contentNotTranslated,
    lastDeployDate,
  }

  const layoutProps = {
    slug,
    frontmatter,
    tocItems,
    timeToRead,
    lastUpdatedDate,
  }

  return (
    <RootLayout {...rootLayoutProps}>
      <Text>Hello world</Text>
      {/* <TutorialLayout {...layoutProps}>{page}</TutorialLayout> */}
    </RootLayout>
  )
}

export default ContentPage
