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
  CommitHistory,
  Lang,
  Layout,
  LayoutMappingType,
  NextPageWithLayout,
  TocNodeType,
} from "@/lib/types"

import mdComponents from "@/components/MdComponents"
import PageMetadata from "@/components/PageMetadata"

import { getFileContributorInfo } from "@/lib/utils/contributors"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { dateToString } from "@/lib/utils/date"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getContent, getContentBySlug } from "@/lib/utils/md"
import { getLocaleTimestamp } from "@/lib/utils/time"
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
  translatathonComponents,
  TranslatathonLayout,
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
  translatathon: TranslatathonLayout,
  tutorial: TutorialLayout,
}

const componentsMapping = {
  static: staticComponents,
  "use-cases": useCasesComponents,
  staking: stakingComponents,
  roadmap: roadmapComponents,
  upgrade: upgradeComponents,
  docs: docsComponents,
  translatathon: translatathonComponents,
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

const commitHistoryCache: CommitHistory = {}

const loadData = dataLoader([["gfissues", fetchGFIs]])

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

  const requiredNamespaces = getRequiredNamespacesForPage(slug, layout)

  const { contributors, lastUpdatedDate } = await getFileContributorInfo(
    mdDir,
    mdPath,
    slug,
    locale!,
    frontmatter.lang,
    layout,
    commitHistoryCache
  )

  const lastDeployDate = getLastDeployDate()
  const lastEditLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastUpdatedDate
  )
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const [gfissues] = await loadData()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      mdxSource,
      slug,
      frontmatter,
      lastEditLocaleTimestamp,
      lastDeployLocaleTimestamp,
      contentNotTranslated,
      layout,
      timeToRead: Math.round(timeToRead.minutes),
      tocItems,
      contributors,
      gfissues,
    },
  }
}) satisfies GetStaticProps<Props, Params>

const ContentPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ mdxSource, layout, gfissues }) => {
  // TODO: Address component typing error here (flip `FC` types to prop object types)
  // @ts-expect-error Incompatible component function signatures
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
    lastEditLocaleTimestamp,
    lastDeployLocaleTimestamp,
    layout,
    timeToRead,
    tocItems,
    contributors,
    contentNotTranslated,
  } = page.props

  const layoutProps = {
    slug,
    frontmatter,
    lastEditLocaleTimestamp,
    lastDeployLocaleTimestamp,
    timeToRead,
    tocItems,
    contributors,
    contentNotTranslated,
  }
  const Layout = layoutMapping[layout]

  return (
    <Layout {...layoutProps}>
      <PageMetadata
        title={frontmatter.metaTitle ?? frontmatter.title}
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
