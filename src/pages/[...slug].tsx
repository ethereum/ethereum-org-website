import { ReactElement } from "react"
import { ParsedUrlQuery } from "querystring"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"
import path from "path"

import { getContent, getContentBySlug } from "@/lib/utils/md"
import rehypeImgSize from "@/lib/rehype/rehypeImgSize"
import rehypeHeadingIds from "@/lib/rehype/rehypeHeadingIds"

// Layouts and components
import {
  RootLayout,
  staticComponents,
  StaticLayout,
  useCasesComponents,
  UseCasesLayout,
  // stakingComponents,
  // StakingLayout,
  // roadmapComponents,
  // RoadmapLayout,
  // upgradeComponents,
  // UpgradeLayout,
  // eventComponents,
  // EventLayout,
  // docsComponents,
  // DocsLayout,
} from "@/layouts"

// Types
import type { GetStaticPaths, GetStaticProps } from "next/types"
import { Frontmatter, NextPageWithLayout } from "@/lib/types"
import { getLastModifiedDate } from "@/lib/utils/gh"
import type { ToCItem } from "@/lib/interfaces"

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
} as const

interface Params extends ParsedUrlQuery {
  slug: string[]
}

interface Props {
  mdxSource: MDXRemoteSerializeResult
}

export const getStaticPaths: GetStaticPaths = () => {
  const contentFiles = getContent("/").filter(
    // Filter `/developers/tutorials` slugs since they are processed by
    // `/developers/tutorials/[...tutorial].tsx`
    (file) => !file.slug.includes("/developers/tutorials")
  )

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
  const markdown = getContentBySlug(params.slug.join("/"))
  const frontmatter = markdown.frontmatter
  const tocItems = markdown.tocItems

  const mdPath = path.join("/content", ...params.slug)
  const mdDir = path.join("public", mdPath)

  const mdxSource = await serialize(markdown.content, {
    mdxOptions: {
      // Required since MDX v2 to compile tables (see https://mdxjs.com/migrating/v2/#gfm)
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeImgSize, { dir: mdDir, srcPath: mdPath }], [rehypeHeadingIds]],
    },
  })

  const originalSlug = `/${params.slug.join("/")}/`
  const lastUpdatedDate = await getLastModifiedDate(originalSlug)
  let layout = frontmatter.template
  if (!frontmatter.template) {
    layout = params.slug.includes("developers/docs") ? "docs" : "static"
  }

  return {
    props: {
      mdxSource,
      originalSlug,
      frontmatter,
      lastUpdatedDate,
      layout,
      tocItems,
    },
  }
}

interface ContentPageProps extends Props {
  layout: keyof typeof layoutMapping
}

const ContentPage: NextPageWithLayout<ContentPageProps> = ({
  mdxSource,
  layout,
}) => {
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
  // `slug`, `frontmatter`, `lastUpdatedDate` and `layout` values are returned by `getStaticProps` method and passed to the page component
  const {
    originalSlug: slug,
    frontmatter,
    lastUpdatedDate,
    layout,
    tocItems,
  } = page.props
  const layoutProps = { slug, frontmatter, lastUpdatedDate, tocItems }
  const Layout = layoutMapping[layout]
  return (
    <RootLayout>
      <Layout {...layoutProps}>{page}</Layout>
    </RootLayout>
  )
}

export default ContentPage
