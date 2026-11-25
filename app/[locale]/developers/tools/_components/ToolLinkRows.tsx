import { ArrowRight, Download, Star } from "lucide-react"

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

type Kind = "github" | "npm"
type Entry = { href: string; label: string; count: string | null }

const getEntries = (tool: DeveloperToolWithCategory, locale: string) => {
  const compact = numberFormat(locale, { notation: "compact" })
  const format = (n?: number) =>
    typeof n === "number" ? compact.format(n) : null
  return {
    github: getRankedRepos(tool).map((repo) => ({
      href: repo.href,
      label: getRepoLabel(repo.href),
      count: format(repo.stargazers),
    })),
    npm: getRankedPackages(tool).map((pkg) => ({
      href: pkg.href,
      label: getPackageLabel(pkg.href),
      count: format(pkg.downloads),
    })),
  } satisfies Record<Kind, Entry[]>
}

const kindLabels = (labels: Omit<ToolLinkRowsLabels, "more">) => [
  {
    kind: "github" as const,
    one: labels.repository,
    many: labels.repositories,
  },
  { kind: "npm" as const, one: labels.package, many: labels.packages },
]

const KindIcon = ({ kind, className }: { kind: Kind; className: string }) =>
  kind === "github" ? (
    <GitHub className={className} />
  ) : (
    <NpmJs className={className} />
  )

const CountIcon = ({ kind }: { kind: Kind }) =>
  kind === "github" ? (
    <Star className="size-3.5" aria-hidden />
  ) : (
    <Download className="size-3.5" aria-hidden />
  )

const LinkList = ({
  entries,
  hidden,
  kind,
  detailHref,
  moreLabel,
}: {
  entries: Entry[]
  hidden: number
  kind: Kind
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
        <KindIcon
          kind={kind}
          className="size-4 shrink-0 text-body group-hover/link:text-primary-hover"
        />
        <span className="truncate font-bold text-body group-hover/link:text-primary-hover">
          {label}
        </span>
        {count && (
          <span className="inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap text-body-medium">
            {count}
            <CountIcon kind={kind} />
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

/** Compact spec rows for the modal: the top few, then a link to the page. */
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
  const entries = getEntries(tool, locale)
  return kindLabels(labels).map(({ kind, one, many }) => {
    const list = entries[kind]
    if (list.length === 0) return null
    return (
      <DetailRow
        key={kind}
        label={list.length === 1 ? one : many}
        roomyLabel
        alignTop={list.length > 1}
      >
        <LinkList
          kind={kind}
          detailHref={detailHref}
          moreLabel={labels.more(list.length - SHOWN)}
          hidden={list.length - SHOWN}
          entries={list.slice(0, SHOWN)}
        />
      </DetailRow>
    )
  })
}

/** Every repo and package for the detail page's About panel, as an open list. */
export const ToolLinkSections = ({
  locale,
  tool,
  labels,
}: {
  locale: string
  tool: DeveloperToolWithCategory
  labels: Omit<ToolLinkRowsLabels, "more">
}) => {
  const entries = getEntries(tool, locale)
  return kindLabels(labels).map(({ kind, one, many }) => {
    const list = entries[kind]
    if (list.length === 0) return null
    // GitHub owners are case-insensitive, and the catalog spells some both ways.
    const owners = new Set(
      list.map(({ label }) => label.split("/")[0].toLowerCase())
    )
    const sharedOwner =
      owners.size === 1 && list[0].label.includes("/")
        ? list[0].label.split("/")[0]
        : undefined
    return (
      <section key={kind} className="flex max-w-3xl flex-col gap-1">
        <h3 className="flex flex-wrap items-baseline gap-x-2 text-md">
          {list.length === 1 ? one : many}
          {sharedOwner && (
            <span className="text-sm font-normal text-body-medium">
              {sharedOwner}
            </span>
          )}
        </h3>
        <ul className="m-0 grid list-none grid-cols-1 gap-x-8 sm:grid-cols-2">
          {list.map(({ href, label, count }) => {
            const slash = label.indexOf("/")
            return (
              <li key={href} className="m-0 border-b border-border">
                <InlineLink
                  href={href}
                  hideArrow
                  title={label}
                  className="group/link flex items-center gap-2 py-2.5 no-underline hover:no-underline"
                >
                  <KindIcon
                    kind={kind}
                    className="size-4 shrink-0 text-body-medium group-hover/link:text-primary-hover"
                  />
                  <span className="min-w-0 flex-1 truncate text-body group-hover/link:text-primary-hover">
                    {!sharedOwner && slash > 0 && (
                      <span className="text-body-medium">
                        {label.slice(0, slash + 1)}
                      </span>
                    )}
                    <span className="font-bold">{label.slice(slash + 1)}</span>
                  </span>
                  {count && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm text-body-medium tabular-nums">
                      {count}
                      <CountIcon kind={kind} />
                    </span>
                  )}
                </InlineLink>
              </li>
            )
          })}
        </ul>
      </section>
    )
  })
}

export default ToolLinkRows
