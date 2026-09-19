import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

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
import { Tag, TagsInlineText } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import {
  buildToolLabels,
  findToolBySlug,
  getRelatedTools,
  getToolKey,
  localizeToolDescriptions,
  normalizeDeveloperToolsData,
  withCategories,
} from "@/lib/utils/developerToolsData"
import { getMetadata } from "@/lib/utils/metadata"

import ToolCard from "../_components/ToolCard"
import ToolDescription from "../_components/ToolDescription"
import ToolLinks from "../_components/ToolLinks"

import PageJsonLD from "./page-jsonld"

import { getDeveloperToolsData } from "@/lib/data"

// Rendered on demand and revalidated daily to pick up tools data updates
export const revalidate = 86400
export const dynamicParams = true

type ToolPageParams = PageParams & { tool: string }

const Page = async (props: { params: Promise<ToolPageParams> }) => {
  const { locale, tool: toolKey } = await props.params

  const [data, { contributors }, t, tCommon, toolDescriptions] =
    await Promise.all([
      getDeveloperToolsData(),
      getAppPageContributorInfo("developers/tools", locale as Lang),
      getTranslations({ locale, namespace: "page-developers-tools" }),
      getTranslations({ locale, namespace: "common" }),
      getTranslations({
        locale,
        namespace: "page-developers-tools-descriptions",
      }),
    ])

  const normalized = normalizeDeveloperToolsData(data)
  if (!normalized) notFound()

  const allTools = localizeToolDescriptions(
    withCategories(normalized),
    toolDescriptions
  )
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
      <div className="px-page py-hero lg:py-hero-2x">
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
              <BreadcrumbPage>{tool.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="px-page pb-page">
        <MainArticle className="flex flex-col gap-10">
          {tool.banner_url && (
            <Image
              src={tool.banner_url}
              alt=""
              width={1200}
              height={300}
              className="h-40 w-full rounded-base object-cover sm:h-56"
            />
          )}

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
            {tool.thumbnail_url && (
              <Image
                src={tool.thumbnail_url}
                alt={tool.name}
                width={124}
                height={124}
                className="size-16 shrink-0 rounded-xl object-cover xl:size-32"
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
            <ToolDescription
              description={tool.description}
              className="max-w-3xl"
            />
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

        <ContentFeedback />
      </main>
    </>
  )
}

export function generateStaticParams() {
  return []
}

export async function generateMetadata(props: {
  params: Promise<ToolPageParams>
}) {
  const { locale, tool: toolKey } = await props.params

  const [normalized, toolDescriptions] = await Promise.all([
    normalizeDeveloperToolsData(await getDeveloperToolsData()),
    getTranslations({
      locale,
      namespace: "page-developers-tools-descriptions",
    }),
  ])
  const tool =
    normalized &&
    findToolBySlug(
      localizeToolDescriptions(withCategories(normalized), toolDescriptions),
      toolKey
    )
  if (!tool) return {}

  return await getMetadata({
    locale,
    slug: ["developers", "tools", toolKey],
    title: tool.name,
    description: tool.description.slice(0, 160),
  })
}

export default Page
