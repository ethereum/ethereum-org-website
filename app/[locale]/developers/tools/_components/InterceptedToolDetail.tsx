import { AppWindowMac } from "lucide-react"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import type { Lang } from "@/lib/types"

import CatalogDetailModal from "@/components/CatalogDetailModal"
import DetailRow from "@/components/CatalogDetailModal/DetailRow"
import FullDetailsLink from "@/components/CatalogDetailModal/FullDetailsLink"
import Twitter from "@/components/icons/twitter.svg"
import { ButtonLink } from "@/components/ui/buttons/Button"
import InlineLink from "@/components/ui/Link"
import { Tag, TagsInlineText } from "@/components/ui/tag"

import {
  buildToolLabels,
  findToolBySlug,
  getToolKey,
  localizeToolDescriptions,
  normalizeDeveloperToolsData,
  withCategories,
} from "@/lib/utils/developerToolsData"

import ToolDescription from "./ToolDescription"
import ToolLinkRows from "./ToolLinkRows"

import { getPathname } from "@/i18n/navigation"
import { getDeveloperToolsData } from "@/lib/data"

/**
 * Shared body for the intercepting modal slots: the compact tool detail
 * rendered inside the catalog modal shell. The standalone `[tool]` page has its
 * own wider layout, and keeps the banner image this compact view drops.
 */
const InterceptedToolDetail = async ({
  locale,
  toolKey,
}: {
  locale: string
  toolKey: string
}) => {
  const [data, t, tCommon, toolDescriptions] = await Promise.all([
    getDeveloperToolsData(),
    getTranslations({ locale, namespace: "page-developers-tools" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({
      locale,
      namespace: "page-developers-tools-descriptions",
    }),
  ])

  const normalized = normalizeDeveloperToolsData(data)
  if (!normalized) notFound()

  const tool = findToolBySlug(
    localizeToolDescriptions(withCategories(normalized), toolDescriptions),
    toolKey
  )
  if (!tool) notFound()

  const { categoryLabels, subcategoryLabels, tagLabels } = buildToolLabels(
    t,
    normalized.taxonomy
  )

  const detailHref = getPathname({
    href: `/developers/tools/${getToolKey(tool)}/`,
    locale: locale as Lang,
  })

  return (
    <CatalogDetailModal
      title={tool.name}
      image={tool.thumbnail_url}
      fallbackIcon={
        <AppWindowMac className="size-14 shrink-0 text-body-medium" />
      }
      description={tool.descriptionStripped ?? undefined}
      closeLabel={tCommon("close")}
    >
      <div className="flex flex-col gap-6">
        <ToolDescription description={tool.description} />

        <div className="flex flex-col gap-2">
          <DetailRow label={t("page-developers-tools-modal-category")}>
            <Tag size="small" status="tag">
              {categoryLabels[tool.categoryId] || tool.categoryId}
            </Tag>
          </DetailRow>

          <DetailRow label={t("page-developers-tools-modal-type")} roomyLabel>
            <span className="font-bold text-body">
              {subcategoryLabels[tool.subcategory_id] || tool.subcategory_id}
            </span>
          </DetailRow>

          {tool.tags.length > 0 && (
            <DetailRow label={t("page-developers-tools-modal-tags")} roomyLabel>
              <TagsInlineText
                list={tool.tags.map((tag) => tagLabels[tag] || tag)}
                variant="light"
                className="font-bold text-body lowercase"
              />
            </DetailRow>
          )}

          <ToolLinkRows
            locale={locale}
            tool={tool}
            detailHref={detailHref}
            labels={{
              repository: t("page-developers-tools-modal-repository"),
              repositories: t("page-developers-tools-modal-repositories"),
              package: t("page-developers-tools-modal-package"),
              packages: t("page-developers-tools-modal-packages"),
              more: (count) => t("page-developers-tools-modal-more", { count }),
            }}
          />

          <FullDetailsLink
            href={detailHref}
            label={t("page-developers-tools-modal-full-details")}
          />
        </div>

        {(tool.website || tool.twitter) && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            {tool.website && (
              <ButtonLink href={tool.website} variant="solid" className="w-fit">
                {t("page-developers-tools-modal-website")}
              </ButtonLink>
            )}
            {tool.twitter &&
              (tool.website ? (
                <InlineLink
                  href={tool.twitter}
                  hideArrow
                  aria-label={t("page-developers-tools-modal-social")}
                  className="ms-auto flex size-10 items-center justify-center rounded-lg border transition-colors hover:bg-background-highlight"
                >
                  <Twitter className="size-5 text-body" />
                </InlineLink>
              ) : (
                <ButtonLink
                  href={tool.twitter}
                  variant="solid"
                  className="w-fit"
                >
                  {t("page-developers-tools-modal-social")}
                </ButtonLink>
              ))}
          </div>
        )}
      </div>
    </CatalogDetailModal>
  )
}

export default InterceptedToolDetail
