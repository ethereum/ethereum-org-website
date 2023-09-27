import { ReactElement } from "react"
import { ParsedUrlQuery } from "querystring"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"
import path from "path"

import { getContent, getContentBySlug } from "@/lib/utils/md"
import rehypeImgSize from "@/lib/rehype/rehypeImgSize"

// Layouts
import {
  RootLayout,
  StaticLayout,
  UseCasesLayout,
  // StakingLayout,
  // RoadmapLayout,
  // UpgradeLayout,
  // EventLayout,
  // DocsLayout,
} from "@/layouts"
import { staticComponents } from "@/layouts/Static"
import { useCasesComponents } from "@/layouts/UseCases"
// import { stakingComponents } from "@/layouts/Staking"
// import { roadmapComponents } from "@/layouts/Roadmap"
// import { upgradeComponents } from "@/layouts/Upgrade"
// import { eventComponents } from "@/layouts/Event"
// import { docsComponents } from "@/layouts/Docs"

// Types
import type { GetStaticPaths, GetStaticProps } from "next/types"
import { Frontmatter, NextPageWithLayout } from "@/lib/types"
import { getLastModifiedDate } from "@/lib/utils/gh"

const layoutMapping = {
  static: StaticLayout,
  "use-cases": UseCasesLayout,
  // staking: StakingLayout,
  // roadmap: RoadmapLayout,
  // upgrade: UpgradeLayout,
  // event: EventLayout,
  // docs: DocsLayout,
} as const

const componentsMapping = {
  static: staticComponents,
  "use-cases": useCasesComponents,
  // staking: stakingComponents,
  // roadmap: roadmapComponents,
  // upgrade: upgradeComponents,
  // event: eventComponents,
  // docs: docsComponents,
}

interface Params extends ParsedUrlQuery {
  slug: string[]
}

interface Props {
  mdxSource: MDXRemoteSerializeResult
  layout: keyof typeof layoutMapping
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

const ContentPage: NextPageWithLayout<Props> = ({ mdxSource, layout }) => {
  const components = componentsMapping[layout]
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
  const Layout = layoutMapping[layout]
  return (
    <RootLayout>
      <Layout {...layoutProps}>{page}</Layout>
    </RootLayout>
  )
}

export default ContentPage
