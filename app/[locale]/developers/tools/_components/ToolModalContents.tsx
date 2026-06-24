import { Download } from "lucide-react"

import GitHub from "@/components/icons/github.svg"
import NpmJs from "@/components/icons/npmjs.svg"
import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Tag, TagsInlineText } from "@/components/ui/tag"

import { numberFormat } from "@/lib/utils/numbers"
import { isExternal } from "@/lib/utils/url"

import type { DeveloperToolWithCategory } from "../types"
import { getCategoryTagStyle } from "../utils"

export type ToolModalLabels = {
  links: string
  website: string
  social: string
}

const ToolModalContents = ({
  locale,
  tool,
  categoryLabels,
  subcategoryLabels,
  tagLabels,
  labels,
}: {
  locale: string
  tool: DeveloperToolWithCategory
  categoryLabels: Record<string, string>
  subcategoryLabels: Record<string, string>
  tagLabels: Record<string, string>
  labels: ToolModalLabels
}) => {
  const compactNumber = numberFormat(locale, { notation: "compact" })
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      {tool.banner_url && (
        <div className="h-24 w-full shrink-0 sm:h-36">
          <Image
            src={tool.banner_url}
            alt=""
            width={23 * 16}
            height={23 * 4}
            className="size-full object-cover"
          />
        </div>
      )}
      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-8">
        <div className="shrink-0 space-y-1">
          <Tag
            size="small"
            status={getCategoryTagStyle(tool.categoryId)}
            className="px-1 py-0"
          >
            {categoryLabels[tool.categoryId] || tool.categoryId}
          </Tag>
          <p className="text-sm text-body-medium">
            {subcategoryLabels[tool.subcategory_id] || tool.subcategory_id}
          </p>
          <h2 className="text-h3">{tool.name}</h2>
          <TagsInlineText
            list={tool.tags.map((tag) => tagLabels[tag] || tag)}
            variant="light"
            className="lowercase"
          />
        </div>
        <div className="-mt-2 max-h-[8lh] shrink-0 overflow-y-auto [mask-image:linear-gradient(to_top,transparent,white_2rem,white_calc(100%-1rem),transparent)] pt-2 pb-4 sm:max-h-[10lh]">
          <p className="whitespace-pre-line">{tool.description}</p>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2">
          <p className="shrink-0">{labels.links}</p>
          <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain pe-1 pb-6 [-webkit-overflow-scrolling:touch]">
            <div className="flex flex-wrap gap-2">
              {tool.website && (
                <ButtonLink href={tool.website}>{labels.website}</ButtonLink>
              )}
              {tool.twitter && (
                <ButtonLink
                  href={tool.twitter}
                  variant={tool.website ? "outline" : "solid"}
                >
                  {labels.social}
                </ButtonLink>
              )}
              {tool.repos
                .map((repo) =>
                  typeof repo === "string" ? { href: repo } : repo
                )
                .filter((repo) => isExternal(repo.href))
                .sort(
                  (a, b) =>
                    (typeof b.stargazers === "number" ? b.stargazers : -1) -
                    (typeof a.stargazers === "number" ? a.stargazers : -1)
                )
                .map((repo) => {
                  const href = repo.href
                  const isGitHub = href.includes("https://github.com")
                  const sanitizeRegExp = /^https:\/\/github\.com\//
                  // TODO: Handle non-github/npmjs labels
                  const label = href.replace(sanitizeRegExp, "")
                  const starsLabel =
                    typeof repo.stargazers === "number"
                      ? `(${compactNumber.format(repo.stargazers)} ☆)`
                      : null
                  return (
                    <ButtonLink
                      key={href}
                      href={href}
                      variant="outline"
                      className="flex w-fit"
                      hideArrow={isGitHub}
                      title={undefined}
                    >
                      {isGitHub && <GitHub className="!size-5" />}
                      <span>{label}</span>
                      {starsLabel && (
                        <span className="text-xs whitespace-nowrap text-primary">
                          {starsLabel}
                        </span>
                      )}
                    </ButtonLink>
                  )
                })}
              {(tool.packages || [])
                .map((pkg) => (typeof pkg === "string" ? { href: pkg } : pkg))
                .filter((pkg) => isExternal(pkg.href))
                .sort(
                  (a, b) =>
                    (typeof b.downloads === "number" ? b.downloads : -1) -
                    (typeof a.downloads === "number" ? a.downloads : -1)
                )
                .map((pkg) => {
                  const href = pkg.href
                  const isNpm =
                    href.includes("https://www.npmjs.com") ||
                    href.includes("https://npmjs.com")
                  const label = href.replace(
                    /^https:\/\/(www\.)?npmjs\.com\/package\//,
                    ""
                  )
                  const downloadsCount =
                    typeof pkg.downloads === "number"
                      ? compactNumber.format(pkg.downloads)
                      : null
                  return (
                    <ButtonLink
                      key={href}
                      href={href}
                      variant="outline"
                      className="flex w-fit"
                      hideArrow={isNpm}
                    >
                      {isNpm && <NpmJs className="!size-5" />}
                      <span>{label}</span>
                      {downloadsCount && (
                        <span className="inline-flex items-center text-xs whitespace-nowrap text-primary">
                          ({downloadsCount}
                          <Download
                            className="ms-1 size-3"
                            aria-hidden="true"
                          />
                          )
                        </span>
                      )}
                    </ButtonLink>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToolModalContents
