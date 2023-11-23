import { join } from "path"

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next/types"
import { SSRConfig } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import readingTime from "reading-time"
import remarkGfm from "remark-gfm"

import type { NextPageWithLayout, TocNodeType } from "@/lib/types"

import mdComponents from "@/components/MdComponents"
import PageMetadata from "@/components/PageMetadata"

import { dateToString } from "@/lib/utils/date"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLastModifiedDate } from "@/lib/utils/gh"
import { getContent, getContentBySlug } from "@/lib/utils/md"
import { remapTableOfContents } from "@/lib/utils/toc"

import {
  docsComponents,
  DocsLayout,
  roadmapComponents,
  RoadmapLayout,
  stakingComponents,
  StakingLayout,
  staticComponents,
  StaticLayout,
  TutorialLayout,
  tutorialsComponents,
  upgradeComponents,
  UpgradeLayout,
  useCasesComponents,
  UseCasesLayout,
} from "@/layouts"
import rehypeHeadingIds from "@/lib/rehype/rehypeHeadingIds"
import rehypeImg from "@/lib/rehype/rehypeImg"
import remarkInferToc from "@/lib/rehype/remarkInferToc"
import { getRequiredNamespacesForPath } from "@/lib/utils/translations"

const layoutMapping = {
  static: StaticLayout,
  "use-cases": UseCasesLayout,
  staking: StakingLayout,
  roadmap: RoadmapLayout,
  upgrade: UpgradeLayout,
  docs: DocsLayout,
  tutorial: TutorialLayout,
  // event: EventLayout,
}

type LayoutMappingType = typeof layoutMapping

const componentsMapping = {
  static: staticComponents,
  "use-cases": useCasesComponents,
  staking: stakingComponents,
  roadmap: roadmapComponents,
  upgrade: upgradeComponents,
  docs: docsComponents,
  tutorial: tutorialsComponents,
} as const

export const getStaticPaths = (({ locales }) => {
  const contentFiles = getContent("/")

  // Generate page paths for each supported locale
  const paths = locales!.flatMap((locale) =>
    contentFiles.map((file) => ({
      params: {
        // Splitting nested paths to generate proper slug
        slug: file.slug.split("/").slice(1),
      },
      locale,
    }))
  )

  return {
    paths,
    fallback: false,
  }
}) satisfies GetStaticPaths<{ slug: string[] }>

type Props = Omit<
  Parameters<LayoutMappingType[keyof LayoutMappingType]>[0],
  "children"
> &
  SSRConfig & {
    mdxSource: MDXRemoteSerializeResult
  }

export const getStaticProps = (async (context) => {
  const params = context.params!
  const { locale } = context

  const markdown = getContentBySlug(`${locale}/${params.slug.join("/")}`)
  const frontmatter = markdown.frontmatter
  const contentNotTranslated = markdown.contentNotTranslated

  const mdPath = join("/content", ...params.slug)
  const mdDir = join("public", mdPath)

  let tocNodeItems: TocNodeType[] = []
  const tocCallback = (toc: TocNodeType): void => {
    tocNodeItems = "items" in toc ? toc.items : []
  }
  const mdxSource = await serialize(markdown.content, {
    mdxOptions: {
      remarkPlugins: [
        // Required since MDX v2 to compile tables (see https://mdxjs.com/migrating/v2/#gfm)
        remarkGfm,
        [remarkInferToc, { callback: tocCallback }],
      ],
      rehypePlugins: [
        [rehypeImg, { dir: mdDir, srcPath: mdPath, locale }],
        [rehypeHeadingIds],
      ],
    },
  })

  const timeToRead = readingTime(markdown.content)
  const tocItems = remapTableOfContents(tocNodeItems, mdxSource.compiledSource)
  const slug = `/${params.slug.join("/")}/`
  const lastUpdatedDate = getLastModifiedDate(slug, locale!)
  const lastDeployDate = getLastDeployDate()

  // Get corresponding layout
  let layout = frontmatter.template as keyof LayoutMappingType

  if (!frontmatter.template) {
    layout = "static"

    if (params.slug.includes("docs")) {
      layout = "docs"
    }

    if (params.slug.includes("tutorials")) {
      layout = "tutorial"
      if ("published" in frontmatter) {
        frontmatter.published = dateToString(frontmatter.published)
      }
    }
  }

  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPath(slug, layout)

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      mdxSource,
      slug,
      frontmatter,
      lastUpdatedDate,
      lastDeployDate,
      contentNotTranslated,
      layout,
      timeToRead: Math.round(timeToRead.minutes),
      tocItems,
    },
  }
}) satisfies GetStaticProps<Props, { slug: string[] }>

const ContentPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ mdxSource, layout }) => {
  // TODO: Address component typing error here (flip `FC` types to prop object types)
  // @ts-expect-error
  const components: Record<string, React.ReactNode> = { ...mdComponents, ...componentsMapping[layout] }
  return (
    <>
      <MDXRemote {...mdxSource} components={components} />
    </>
  )
}

// Per-Page Layouts: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript
ContentPage.getLayout = (page) => {
  // values returned by `getStaticProps` method and passed to the page component
  const {
    slug,
    frontmatter,
    lastUpdatedDate,
    layout,
    timeToRead,
    tocItems,
  } = page.props


  const layoutProps = {
    slug,
    frontmatter,
    lastUpdatedDate,
    timeToRead,
    tocItems,
  }
  const Layout = layoutMapping[layout]

  return (
    <Layout {...layoutProps}>
      <PageMetadata
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.image}
        author={frontmatter.author}
        canonicalUrl={frontmatter.sourceUrl}
      />
      {page}
    </Layout>
  )
}

export default ContentPage
