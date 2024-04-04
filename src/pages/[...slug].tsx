import fs from "fs"
import { join } from "path"
import { ParsedUrlQuery } from "querystring"

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next/types"
import type { SSRConfig } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { getPlaiceholder } from "plaiceholder"
import readingTime from "reading-time"
import remarkGfm from "remark-gfm"

import type {
  Lang,
  Layout,
  LayoutMappingType,
  NextPageWithLayout,
  TocNodeType,
} from "@/lib/types"

import mdComponents from "@/components/MdComponents"
import PageMetadata from "@/components/PageMetadata"

import { getCrowdinContributors } from "@/lib/utils/crowdin"
import { dateToString } from "@/lib/utils/date"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLastModifiedDate } from "@/lib/utils/gh"
import { getContent, getContentBySlug } from "@/lib/utils/md"
import { runOnlyOnce } from "@/lib/utils/runOnlyOnce"
import { remapTableOfContents } from "@/lib/utils/toc"
import {
  filterRealLocales,
  getRequiredNamespacesForPage,
} from "@/lib/utils/translations"

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
import { fetchGFIs } from "@/lib/api/fetchGFIs"
import rehypeHeadingIds from "@/lib/rehype/rehypeHeadingIds"
import rehypeImg from "@/lib/rehype/rehypeImg"
import remarkInferToc from "@/lib/rehype/remarkInferToc"

interface Params extends ParsedUrlQuery {
  slug: string[]
}

export const layoutMapping = {
  static: StaticLayout,
  "use-cases": UseCasesLayout,
  staking: StakingLayout,
  roadmap: RoadmapLayout,
  upgrade: UpgradeLayout,
  docs: DocsLayout,
  tutorial: TutorialLayout,
}

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
  const paths = filterRealLocales(locales).flatMap((locale) =>
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
}) satisfies GetStaticPaths<Params>

type Props = Omit<Parameters<LayoutMappingType[Layout]>[0], "children"> &
  SSRConfig & {
    mdxSource: MDXRemoteSerializeResult
    gfissues: Awaited<ReturnType<typeof fetchGFIs>>
  }

// Fetch external API data once to avoid hitting rate limit
const gfIssuesDataFetch = runOnlyOnce(async () => {
  return await fetchGFIs()
})

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

  if ("image" in frontmatter) {
    const heroImagePath = join(process.cwd(), "public", frontmatter.image)
    const imageBuffer = fs.readFileSync(heroImagePath)
    const { base64 } = await getPlaiceholder(imageBuffer, { size: 16 })
    frontmatter.blurDataURL = base64
  }

  const timeToRead = readingTime(markdown.content)
  const tocItems = remapTableOfContents(tocNodeItems, mdxSource.compiledSource)
  const slug = `/${params.slug.join("/")}/`
  const lastUpdatedDate = getLastModifiedDate(slug, locale!)
  const lastDeployDate = getLastDeployDate()

  // Get corresponding layout
  let layout = (frontmatter.template as Layout) ?? "static"

  if (!frontmatter.template) {
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

  const crowdinContributors = ["docs", "tutorial"].includes(layout)
    ? getCrowdinContributors(mdPath, locale as Lang)
    : []

  const requiredNamespaces = getRequiredNamespacesForPage(slug, layout)

  const gfissues = await gfIssuesDataFetch()

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
      crowdinContributors,
      gfissues,
    },
  }
}) satisfies GetStaticProps<Props, Params>

const ContentPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ mdxSource, layout, gfissues }) => {
  // TODO: Address component typing error here (flip `FC` types to prop object types)
  // @ts-expect-error
  const components: Record<string, React.ReactNode> = {
    ...mdComponents,
    ...componentsMapping[layout],
  }

  // Global scope for MDX components
  const scope = { gfissues }
  return (
    <>
      <MDXRemote {...mdxSource} components={components} scope={scope} />
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
    crowdinContributors,
    contentNotTranslated,
  } = page.props

  const layoutProps = {
    slug,
    frontmatter,
    lastUpdatedDate,
    timeToRead,
    tocItems,
    crowdinContributors,
    contentNotTranslated,
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
