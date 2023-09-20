import { ReactElement } from "react"
import { ParsedUrlQuery } from "querystring"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"
import path from "path"

import { getContent, getContentBySlug } from "@/lib/utils/md"
import rehypeImgSize from "@/lib/rehype/rehypeImgSize"

// Layouts
import { RootLayout, StaticLayout } from "@/layouts"
import { staticComponents as components } from "@/layouts/Static"
// import { UseCasesLayout } from "@/layouts/UseCases"
// import { StakingLayout } from "@/layouts/Staking"
// import { RoadmapLayout } from "@/layouts/Roadmap"
// import { UpgradeLayout } from "@/layouts/Upgrade"
// import { EventLayout } from "@/layouts/Event"
// import { DocsLayout } from "@/layouts/Docs"
// import { TutorialLayout } from "@/layouts/Tutorial"

// Types
import type { GetStaticPaths, GetStaticProps } from "next/types"
import { Frontmatter, NextPageWithLayout } from "@/lib/types"
import { getLastModifiedDate } from "@/lib/utils/gh"

const componentMapping = {
  static: StaticLayout,
  // "use-cases": UseCasesLayout,
  // staking: StakingLayout,
  // roadmap: RoadmapLayout,
  // upgrade: UpgradeLayout,
  // event: EventLayout,
  // docs: DocsLayout,
  // tutorial: TutorialLayout,
} as const

interface Params extends ParsedUrlQuery {
  slug: string[]
}

interface Props {
  mdxSource: MDXRemoteSerializeResult
}

export const getStaticPaths: GetStaticPaths = () => {
  const contentFiles = getContent(["slug", "content"])

  return {
    paths: contentFiles.map((file) => {
      return {
        params: {
          // Splitting nested paths to generate proper slug
          slug: file.slug.split("/").slice(1),
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params!
  const markdown = getContentBySlug(params.slug.join("/"), [
    "slug",
    "content",
    "frontmatter",
  ])
  const frontmatter = markdown.frontmatter as Frontmatter

  const mdPath = path.join("/content", ...params.slug)
  const mdDir = path.join("public", mdPath)

  const mdxSource: any = await serialize(markdown.content as string, {
    mdxOptions: {
      // Required since MDX v2 to compile tables (see https://mdxjs.com/migrating/v2/#gfm)
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeImgSize, { dir: mdDir, srcPath: mdPath }]],
    },
  })

  const originalSlug = `/${params.slug.join("/")}/`
  const lastUpdatedDate = await getLastModifiedDate(originalSlug)

  const layout =
    frontmatter.template ?? params.slug.includes("developers/docs")
      ? "docs"
      : params.slug.includes("developers/tutorials")
      ? "tutorial"
      : "static"
  return {
    props: {
      mdxSource,
      originalSlug,
      frontmatter,
      lastUpdatedDate,
      layout,
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
  const {
    originalSlug: slug,
    frontmatter,
    lastUpdatedDate,
    layout,
  } = page.props
  const layoutProps = { slug, frontmatter, lastUpdatedDate }
  const Layout = componentMapping[layout]
  return (
    <RootLayout>
      <Layout {...layoutProps}>{page}</Layout>
    </RootLayout>
  )
}

export default ContentPage
