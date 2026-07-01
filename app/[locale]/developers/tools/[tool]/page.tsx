import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Section } from "@/components/ui/section"
import { Tag, TagsInlineText } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import {
  buildToolLabels,
  findToolBySlug,
  getRelatedTools,
  getToolKey,
  normalizeDeveloperToolsData,
  withCategories,
} from "@/lib/utils/developerToolsData"
import { getMetadata } from "@/lib/utils/metadata"

import ToolCard from "../_components/ToolCard"
import ToolLinks from "../_components/ToolLinks"

import PageJsonLD from "./page-jsonld"

import { getDeveloperToolsData } from "@/lib/data"

// Re-render statically generated pages daily to pick up tools data updates
export const revalidate = 86400

type ToolPageParams = PageParams & { tool: string }

const Page = async (props: { params: Promise<ToolPageParams> }) => {
  const { locale, tool: toolKey } = await props.params
  setRequestLocale(locale)

  const [data, { contributors }, t, tCommon] = await Promise.all([
    getDeveloperToolsData(),
    getAppPageContributorInfo("developers/tools", locale as Lang),
    getTranslations({ locale, namespace: "page-developers-tools" }),
    getTranslations({ locale, namespace: "common" }),
  ])

  const normalized = normalizeDeveloperToolsData(data)
  if (!normalized) notFound()

  const allTools = withCategories(normalized)
  const tool = findToolBySlug(allTools, toolKey)
  if (!tool) notFound()

  const relatedTools = getRelatedTools(allTools, tool)
  const { categoryLabels, subcategoryLabels, tagLabels } = buildToolLabels(
    t,
    normalized.taxonomy
  )
  const categoryLabel = categoryLabels[tool.categoryId] || tool.categoryId

  return (
    <>
      <PageJsonLD
        locale={locale}
        tool={tool}
        categoryLabel={categoryLabel}
        contributors={contributors}
      />
      {/* Breadcrumb sits outside <main>, matching PageHero's eyebrow inset on
          the catalog/category pages so it stays aligned across navigation. */}
      <div className="p-hero lg:px-hero-1.5x lg:py-hero-2x">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ethereum.org</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/developers/">
                {tCommon("developers")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/developers/tools/">
                {tCommon("tools")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/developers/tools/categories/${tool.categoryId}/`}
              >
                {categoryLabel}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{tool.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="pb-page">
        <MainArticle className="flex flex-col gap-10 px-page">
          {tool.banner_url && (
            <Image
              src={tool.banner_url}
              alt=""
              width={1200}
              height={300}
              className="h-40 w-full rounded-lg object-cover sm:h-56"
            />
          )}

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
            {tool.thumbnail_url && (
              <Image
                src={tool.thumbnail_url}
                alt={tool.name}
                width={124}
                height={124}
                className="size-16 shrink-0 rounded-xl object-cover xl:size-[124px]"
              />
            )}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div>
                  <Tag status="tag">{categoryLabel}</Tag>
                </div>
                <h1 className="mt-0">{tool.name}</h1>
                <p className="text-sm text-body-medium">
                  {subcategoryLabels[tool.subcategory_id] ||
                    tool.subcategory_id}
                </p>
                <TagsInlineText
                  list={tool.tags.map((tag) => tagLabels[tag] || tag)}
                  variant="light"
                  className="lowercase"
                />
              </div>
              <ToolLinks
                locale={locale}
                tool={tool}
                labels={{
                  website: t("page-developers-tools-modal-website"),
                  social: t("page-developers-tools-modal-social"),
                }}
              />
            </div>
          </div>

          {tool.description && (
            <p className="max-w-3xl whitespace-pre-line">{tool.description}</p>
          )}

          {relatedTools.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-h4">
                {t("page-developers-tools-related-title")}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {relatedTools.map((related) => (
                  <ToolCard key={getToolKey(related)} tool={related} />
                ))}
              </div>
            </section>
          )}
        </MainArticle>

        <Section className="px-page">
          <ContentFeedback />
        </Section>
      </main>
    </>
  )
}

export async function generateStaticParams() {
  const data = normalizeDeveloperToolsData(await getDeveloperToolsData())
  if (!data) return []

  // Flat routes: one entry per tool, keyed by its globally-unique slug.
  return data.resources.map((r) => ({ tool: getToolKey(r) }))
}

export async function generateMetadata(props: {
  params: Promise<ToolPageParams>
}) {
  const { locale, tool: toolKey } = await props.params

  const normalized = normalizeDeveloperToolsData(await getDeveloperToolsData())
  const tool = normalized && findToolBySlug(withCategories(normalized), toolKey)
  if (!tool) return {}

  return await getMetadata({
    locale,
    slug: ["developers", "tools", toolKey],
    title: tool.name,
    description: tool.description.slice(0, 160),
  })
}

export default Page
