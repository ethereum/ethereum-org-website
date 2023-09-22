import { ReactElement } from "react"
import { ParsedUrlQuery } from "querystring"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"
import path from "path"

import { getContent, getContentBySlug } from "@/lib/utils/md"
import rehypeImgSize from "@/lib/rehype/rehypeImgSize"

// Layouts
import { RootLayout, DocsLayout } from "@/layouts"
import { staticComponents as components } from "@/layouts/Static"

// Types
import type { GetStaticPaths, GetStaticProps } from "next/types"
import { Frontmatter, NextPageWithLayout } from "@/lib/types"
import { getLastModifiedDate } from "@/lib/utils/gh"

interface Params extends ParsedUrlQuery {
  slug: string[]
}

interface Props {
  mdxSource: MDXRemoteSerializeResult
}

const dir = path.join("/", "developers", "docs")
export const getStaticPaths: GetStaticPaths = () => {
  const contentFiles = getContent(dir, ["slug"])

  return {
    paths: contentFiles.map((file) => {
      // Remove dir from slug since the base segment is handled by Next with the
      // nested folder structure
      const slug = file.slug.replace(dir, "")
      return {
        params: {
          // Splitting nested paths to generate proper slug
          slug: slug.split("/").slice(1),
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
  const markdown = getContentBySlug(path.join(dir, params.slug.join("/")), [
    "slug",
    "content",
    "frontmatter",
  ])
  const frontmatter = markdown.frontmatter

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
  const slug: string = page.props.originalSlug
  const frontmatter: Frontmatter = page.props.frontmatter
  const lastUpdatedDate = page.props.lastUpdatedDate

  const layoutProps = { slug, frontmatter, lastUpdatedDate }

  return (
    <RootLayout>
      <DocsLayout {...layoutProps}>{page}</DocsLayout>
    </RootLayout>
  )
}

export default ContentPage
