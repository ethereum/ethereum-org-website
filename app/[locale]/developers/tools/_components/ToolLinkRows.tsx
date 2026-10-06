import { ArrowRight, Download } from "lucide-react"

import DetailRow from "@/components/CatalogDetailModal/DetailRow"
import GitHub from "@/components/icons/github.svg"
import NpmJs from "@/components/icons/npmjs.svg"
import InlineLink from "@/components/ui/Link"

import type { DeveloperToolWithCategory } from "@/lib/utils/developerToolsData"
import {
  getPackageLabel,
  getRankedPackages,
  getRankedRepos,
  getRepoLabel,
} from "@/lib/utils/developerToolsData"
import { numberFormat } from "@/lib/utils/numbers"

/**
 * A handful of tools list dozens of repos (Hats Protocol has 31), which would
 * stretch the modal past the rest of the catalog's rhythm. Show the top few by
 * stars/downloads and send the rest to the standalone page.
 */
const SHOWN = 3

export type ToolLinkRowsLabels = {
  repository: string
  repositories: string
  package: string
  packages: string
  /** Already interpolated with the remaining count. */
  more: (count: number) => string
}

type Entry = { href: string; label: string; count: string | null }

const LinkList = ({
  entries,
  hidden,
  icon,
  detailHref,
  moreLabel,
}: {
  entries: Entry[]
  hidden: number
  icon: "github" | "npm"
  detailHref: string
  moreLabel: string
}) => (
  <div className="flex flex-col items-end gap-1">
    {entries.map(({ href, label, count }) => (
      <InlineLink
        key={href}
        href={href}
        hideArrow
        // Long repo slugs wrap to two lines and break the row rhythm, so each
        // entry is held to one line; the full name stays available on hover.
        title={label}
        className="group/link flex max-w-full items-center gap-1.5 no-underline hover:no-underline"
      >
        {icon === "github" ? (
          <GitHub className="size-4 shrink-0 text-body group-hover/link:text-primary-hover" />
        ) : (
          <NpmJs className="size-4 shrink-0" />
        )}
        <span className="truncate font-bold text-body group-hover/link:text-primary-hover">
          {label}
        </span>
        {count && (
          <span className="inline-flex shrink-0 items-center whitespace-nowrap text-body-medium">
            {count}
            {icon === "npm" && (
              <Download className="ms-0.5 size-3" aria-hidden="true" />
            )}
          </span>
        )}
      </InlineLink>
    ))}
    {hidden > 0 && (
      // Raw anchor for the same reason as FullDetailsLink: the modal already
      // sits on this URL, so only a document navigation escapes the interception.
      <a href={detailHref} className="group text-body-medium no-underline">
        <span className="group-hover:underline">{moreLabel}</span>
        <ArrowRight className="ms-1 mb-0.5 inline size-[1em] rtl:-scale-x-100" />
      </a>
    )}
  </div>
)

/**
 * Repos and packages as spec rows rather than a growing grid of buttons, so a
 * tool with 31 repos reads the same as one with a single repo. The standalone
 * page keeps the exhaustive `ToolLinks` list.
 */
const ToolLinkRows = ({
  locale,
  tool,
  detailHref,
  labels,
}: {
  locale: string
  tool: DeveloperToolWithCategory
  detailHref: string
  labels: ToolLinkRowsLabels
}) => {
  const compactNumber = numberFormat(locale, { notation: "compact" })
  const repos = getRankedRepos(tool)
  const packages = getRankedPackages(tool)

  return (
    <>
      {repos.length > 0 && (
        <DetailRow
          label={repos.length === 1 ? labels.repository : labels.repositories}
          roomyLabel
          alignTop={repos.length > 1}
        >
          <LinkList
            icon="github"
            detailHref={detailHref}
            moreLabel={labels.more(repos.length - SHOWN)}
            hidden={repos.length - SHOWN}
            entries={repos.slice(0, SHOWN).map((repo) => ({
              href: repo.href,
              label: getRepoLabel(repo.href),
              count:
                typeof repo.stargazers === "number"
                  ? `${compactNumber.format(repo.stargazers)} ☆`
                  : null,
            }))}
          />
        </DetailRow>
      )}

      {packages.length > 0 && (
        <DetailRow
          label={packages.length === 1 ? labels.package : labels.packages}
          roomyLabel
          alignTop={packages.length > 1}
        >
          <LinkList
            icon="npm"
            detailHref={detailHref}
            moreLabel={labels.more(packages.length - SHOWN)}
            hidden={packages.length - SHOWN}
            entries={packages.slice(0, SHOWN).map((pkg) => ({
              href: pkg.href,
              label: getPackageLabel(pkg.href),
              count:
                typeof pkg.downloads === "number"
                  ? compactNumber.format(pkg.downloads)
                  : null,
            }))}
          />
        </DetailRow>
      )}
    </>
  )
}

export default ToolLinkRows
