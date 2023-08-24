import { ParsedUrlQuery } from "querystring"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"
import path from "path"

import { getContent, getContentBySlug } from "@/lib/utils/md"
import rehypeImgSize from "@/lib/rehype/rehypeImgSize"

import { StaticLayout } from "@/layouts"
import { staticComponents as components } from "@/layouts/Static"

import type { GetStaticPaths, GetStaticProps, NextPage } from "next/types"

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
  const markdown = getContentBySlug(params.slug.join("/"), ["slug", "content"])

  const mdPath = path.join("/content", ...params.slug)
  const mdDir = path.join("public", mdPath)

  const mdxSource = await serialize(markdown.content, {
    mdxOptions: {
      // Required since MDX v2 to compile tables (see https://mdxjs.com/migrating/v2/#gfm)
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeImgSize, { dir: mdDir, srcPath: mdPath }]],
    },
  })

  return {
    props: {
      mdxSource,
    },
  }
}

const ContentPage: NextPage<Props> = ({ mdxSource }) => {
  return (
    <StaticLayout>
      {/* // TODO: fix components types, for some reason MDXRemote doesn't like some of them */}
      {/* @ts-ignore */}
      <MDXRemote {...mdxSource} components={components} />
    </StaticLayout>
  )
}

export default ContentPage
