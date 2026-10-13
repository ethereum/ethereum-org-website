import { Download } from "lucide-react"

import GitHub from "@/components/icons/github.svg"
import NpmJs from "@/components/icons/npmjs.svg"
import { ButtonLink } from "@/components/ui/buttons/Button"

import type { DeveloperToolWithCategory } from "@/lib/utils/developerToolsData"
import {
  getPackageLabel,
  getRankedPackages,
  getRankedRepos,
  getRepoLabel,
} from "@/lib/utils/developerToolsData"
import { numberFormat } from "@/lib/utils/numbers"

export type ToolLinksLabels = {
  website: string
  social: string
}

/**
 * The exhaustive action links for a tool (website, social, ranked repos with
 * stars, ranked packages with downloads). Used by the standalone tool page; the
 * modal shows a capped `ToolLinkRows` instead so a tool with dozens of repos
 * doesn't stretch it.
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
      {getRankedRepos(tool).map((repo) => {
        const isGitHub = repo.href.includes("https://github.com")
        const starsLabel =
          typeof repo.stargazers === "number"
            ? `(${compactNumber.format(repo.stargazers)} ☆)`
            : null
        return (
          <ButtonLink
            key={repo.href}
            href={repo.href}
            variant="outline"
            className="flex w-fit"
            hideArrow={isGitHub}
            title={undefined}
          >
            {isGitHub && <GitHub className="!size-5" />}
            <span>{getRepoLabel(repo.href)}</span>
            {starsLabel && (
              <span className="text-xs whitespace-nowrap text-primary">
                {starsLabel}
              </span>
            )}
          </ButtonLink>
        )
      })}
      {getRankedPackages(tool).map((pkg) => {
        const isNpm =
          pkg.href.includes("https://www.npmjs.com") ||
          pkg.href.includes("https://npmjs.com")
        const downloadsCount =
          typeof pkg.downloads === "number"
            ? compactNumber.format(pkg.downloads)
            : null
        return (
          <ButtonLink
            key={pkg.href}
            href={pkg.href}
            variant="outline"
            className="flex w-fit"
            hideArrow={isNpm}
          >
            {isNpm && <NpmJs className="!size-5" />}
            <span>{getPackageLabel(pkg.href)}</span>
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
