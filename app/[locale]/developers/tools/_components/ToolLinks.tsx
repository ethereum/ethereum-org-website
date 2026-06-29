import { Download } from "lucide-react"

import GitHub from "@/components/icons/github.svg"
import NpmJs from "@/components/icons/npmjs.svg"
import { ButtonLink } from "@/components/ui/buttons/Button"

import type { DeveloperToolWithCategory } from "@/lib/utils/developerToolsData"
import { numberFormat } from "@/lib/utils/numbers"
import { isExternal } from "@/lib/utils/url"

export type ToolLinksLabels = {
  website: string
  social: string
}

/**
 * Shared action links for a tool (website, social, ranked repos with stars,
 * ranked packages with downloads). Reused by the modal detail and the
 * standalone tool page so the link/format logic lives in one place.
 */
const ToolLinks = ({
  locale,
  tool,
  labels,
}: {
  locale: string
  tool: DeveloperToolWithCategory
  labels: ToolLinksLabels
}) => {
  const compactNumber = numberFormat(locale, { notation: "compact" })

  return (
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
        .map((repo) => (typeof repo === "string" ? { href: repo } : repo))
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
                  <Download className="ms-1 size-3" aria-hidden="true" />)
                </span>
              )}
            </ButtonLink>
          )
        })}
    </div>
  )
}

export default ToolLinks
