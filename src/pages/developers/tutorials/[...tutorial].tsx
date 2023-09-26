import { ReactElement } from "react"
import { ParsedUrlQuery } from "querystring"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"
import path from "path"

import { getContentBySlug } from "@/lib/utils/md"
import rehypeImgSize from "@/lib/rehype/rehypeImgSize"
import { getLastModifiedDate } from "@/lib/utils/gh"

// Layouts
import { RootLayout, TutorialLayout } from "@/layouts"
import { staticComponents as components } from "@/layouts/Static"

// Types
import type { GetServerSideProps } from "next/types"
import type { NextPageWithLayout } from "@/lib/types"

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

  const tutorialPath = path.join(tutorialsPath, params.tutorial.join("/"))
  const markdown = getContentBySlug(tutorialPath, [
    "slug",
    "content",
    "frontmatter",
  ])
  const frontmatter = markdown.frontmatter!
  // TODO: see how we can handle the published date on the tutorial's layout
  // since we can't send the Date object anymore
  frontmatter.published = frontmatter.published.toString()

  const mdPath = path.join("/content", ...params.tutorial)
  const mdDir = path.join("public", mdPath)

  const mdxSource: any = await serialize(markdown.content as string, {
    mdxOptions: {
      // Required since MDX v2 to compile tables (see https://mdxjs.com/migrating/v2/#gfm)
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeImgSize, { dir: mdDir, srcPath: mdPath }]],
    },
  })

  const originalSlug = `/${params.tutorial.join("/")}/`
  const lastUpdatedDate = await getLastModifiedDate(originalSlug)

  return {
    props: {
      mdxSource,
      originalSlug,
      frontmatter,
      lastUpdatedDate,
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
  // `slug`, `frontmatter` and `lastUpdatedDate` values are returned by `getStaticProps` method and passed to the page component
  const { originalSlug: slug, frontmatter, lastUpdatedDate } = page.props
  const layoutProps = { slug, frontmatter, lastUpdatedDate }

  return (
    <RootLayout>
      <TutorialLayout {...layoutProps}>{page}</TutorialLayout>
    </RootLayout>
  )
}

export default ContentPage
