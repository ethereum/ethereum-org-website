"use client"

import { type RefObject, useCallback, useMemo, useRef } from "react"
import dynamic from "next/dynamic"
import { useLocale, useTranslations } from "next-intl"
import {
  type DocSearchModalProps,
  useDocSearchKeyboardEvents,
} from "typesense-docsearch-react"
import * as Portal from "@radix-ui/react-portal"
import { Slot } from "@radix-ui/react-slot"

import { ErrorBoundary } from "@/components/ui/error-boundary"
import { BaseLink } from "@/components/ui/Link"

import {
  type ExplorerQuery,
  parseExplorerQuery,
  truncateHex,
} from "@/lib/utils/explorerQuery"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { sanitizeHitTitle } from "@/lib/utils/sanitizeHitTitle"
import { isExternal, sanitizeHitUrl } from "@/lib/utils/url"

import SearchButton from "./SearchButton"
import SearchInputButton from "./SearchInputButton"

import { useDisclosure } from "@/hooks/useDisclosure"

const SearchModal = dynamic(() => import("./SearchModal"))

// `DocSearchHit` isn't re-exported from the package root, so derive it from the
// modal's transformItems signature. Note: unlike Algolia's nested `hierarchy`
// object, this fork exposes flattened dotted keys (e.g. `item["hierarchy.lvl0"]`).
type DocSearchHit = Parameters<
  NonNullable<DocSearchModalProps["transformItems"]>
>[0][number]

type HitComponentProps = Parameters<
  NonNullable<DocSearchModalProps["hitComponent"]>
>[0]

const TITLE_KEYS = new Set(["lvl0", "hierarchy.lvl0"])

/**
 * Marks our injected hits so `transformItems` leaves them alone. One row per network, so
 * the id carries the index -- the renderer keys rows on it.
 */
const EXPLORER_ID_PREFIX = "ethereum-org-block-explorer:"

const isExplorerHit = (objectID: string) =>
  objectID.startsWith(EXPLORER_ID_PREFIX)

/** Network logos already shipped for `/layer-2/networks`. */
const NETWORK_ICON_PATH = "/images/layer-2/"

/**
 * What `useSearchClient` actually hands to `transformSearchClient`: a bare object with
 * one `search` method, not the `typesense` SearchClient the prop's type claims. Modelled
 * narrowly here so the cast at the call site is the only place that lies.
 */
interface MinimalSearchClient {
  search: (
    requests: { q?: string }[]
  ) => Promise<{ results: { hits: DocSearchHit[]; nbHits: number }[] }>
}

/**
 * Strip the site-name suffix from every copy of a hit's lvl0 title.
 *
 * The renderer reads `_highlightResult["hierarchy.lvl0"].value`, and the group header
 * above each result takes its label from the same place -- so the raw fields are not
 * enough. Highlight entries nest the string under `value`, which a naive walk recurses
 * straight past.
 */
const stripTitleSuffix = (node: Record<string, unknown>, depth = 0) => {
  if (depth > 6) return
  for (const [key, value] of Object.entries(node)) {
    if (TITLE_KEYS.has(key)) {
      if (typeof value === "string") {
        node[key] = sanitizeHitTitle(value)
        continue
      }
      // Highlight/snippet entries: { value: "...", matchLevel: "none" }
      const wrapped = value as { value?: unknown } | null
      if (wrapped && typeof wrapped.value === "string") {
        wrapped.value = sanitizeHitTitle(wrapped.value)
        continue
      }
    }
    if (value && typeof value === "object") {
      stripTitleSuffix(value as Record<string, unknown>, depth + 1)
    }
  }
}

interface SearchProps {
  asChild?: boolean
  children?: React.ReactElement<unknown>
}

const Search = ({ asChild = false, children }: SearchProps) => {
  const disclosure = useDisclosure()
  const { isOpen, onOpen, onClose } = disclosure

  const locale = useLocale()
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const t = useTranslations("common")

  const handleOpen = () => {
    onOpen()
    trackCustomEvent({
      eventCategory: "nav bar",
      eventAction: "click",
      eventName: "search open",
    })
  }

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen: handleOpen,
    onClose,
    // The fork's React 18-era types want a non-null ref; React 19's useRef
    // yields RefObject<T | null>. Safe to narrow — the hook only reads .current.
    searchButtonRef: searchButtonRef as RefObject<HTMLButtonElement>,
  })

  const host = process.env.NEXT_PUBLIC_TYPESENSE_HOST || ""
  const port = Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT) || 443
  const protocol = process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL || "https"
  const apiKey = process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_KEY || ""
  // One collection per locale (`ethereumorg-en`, `ethereumorg-ja`, ...). A single
  // combined index took ~16h to crawl -- past CI limits, and every locale waited
  // on every other. See typesense/README.md.
  const collectionPrefix =
    process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION_PREFIX || "ethereumorg"
  const collectionName = `${collectionPrefix}-${locale}`

  /**
   * A pasted address or transaction hash is never answerable from site content, so
   * offer the block explorer instead. This has to happen in the search client rather
   * than `transformItems`, which never sees the query and is not called at all when
   * there are no results -- the normal case for an address.
   */
  /**
   * A pasted address or hash is never answerable from site content, so offer the block
   * explorers instead. This has to happen in the search client rather than
   * `transformItems`, which never sees the query and is not called at all when there are
   * no results -- the normal case for an address.
   *
   * One row per network, titled by network. The value itself is identical on every row
   * and already visible in the input two lines above, so repeating it nine times would
   * be noise; the network is the only thing that differs and the only thing being chosen.
   */
  /**
   * A pasted address or hash is never answerable from site content, so offer the block
   * explorers instead. This has to happen in the search client rather than
   * `transformItems`, which never sees the query and is not called at all when there are
   * no results -- the normal case for an address.
   *
   * One row per network, titled by network. The value itself is identical on every row
   * and already visible in the input two lines above, so repeating it would be noise;
   * the network is the only thing that differs and the only thing being chosen.
   */
  const buildExplorerHits = useCallback(
    (parsed: ExplorerQuery): DocSearchHit[] =>
      parsed.groups.flatMap((group, groupIndex) => {
        const heading = t(
          group.kind === "hash"
            ? "docsearch-explorer-hash"
            : "docsearch-explorer-address",
          { explorer: group.brand }
        )
        // `type: "lvl1"` is the renderer's top-level row: title from `hierarchy.lvl1`,
        // and a second line only if `content` is set -- omitted to keep rows one line.
        // `hierarchy.lvl0` is both the section heading and the grouping key, so rows
        // sharing an explorer share it and land in one section.
        //
        // Snippet renders these through dangerouslySetInnerHTML. Every value is a
        // translated string or a generated network name -- the query itself never
        // reaches them, which is what keeps a pasted value out of an HTML sink.
        return group.targets.map((target, index) => {
          // Rows name a network, unless the explorer covers one chain and the value is
          // ambiguous -- then they name the lookup instead (Starkscan's two routes).
          const label = target.role
            ? t(`docsearch-explorer-${target.role}`)
            : target.name
          return {
            objectID: `${EXPLORER_ID_PREFIX}${groupIndex}:${index}`,
            type: "lvl1",
            url: target.url,
            "hierarchy.lvl0": heading,
            "hierarchy.lvl1": label,
            // Rendered by the library as the row's second line; CSS shows it only in
            // Recent, where the input is empty and a row titled "Base" would not say
            // which value was looked up.
            content: truncateHex(parsed.value),
            __explorerIcon: target.icon,
            // The library caps every section at five rows as a stand-in for `distinct`.
            // Each row here is a different destination, not a repeat of one page, so
            // the cap would silently drop real choices. See patches/.
            __docsearchNoLimit: true,
            _highlightResult: {
              "hierarchy.lvl0": { value: heading },
              "hierarchy.lvl1": { value: label },
            },
          }
        }) as unknown as DocSearchHit[]
      }),
    [t]
  )

  /**
   * Explorer rows leave the site, so they get the external-link treatment -- new tab,
   * `rel`, the arrow affordance and its assistive text -- from `BaseLink`. Everything
   * else keeps the library's plain anchor.
   *
   * `hideArrow` because BaseLink appends its icon after the children, which here is a
   * block-level row; the arrow belongs beside the network name.
   */
  /**
   * Explorer rows leave the site, so they get the external-link treatment -- new tab,
   * `rel`, and its assistive text -- from `BaseLink`.
   *
   * `children` is the library's whole rendered row, including the save and remove
   * buttons it puts on Recent entries. Replacing it drops that functionality, so the row
   * is kept intact and only decorated: the network logo arrives as a CSS variable that
   * `docsearch.css` paints over the default icon, and the external-link arrow is drawn
   * there too -- as a `::after` on the title, which is the only way to seat it beside the
   * text rather than after the action buttons.
   */
  const hitComponent = useCallback(({ hit, children }: HitComponentProps) => {
    if (!isExplorerHit(hit.objectID)) {
      return <a href={hit.url}>{children}</a>
    }
    const icon = (hit as unknown as { __explorerIcon: string }).__explorerIcon
    return (
      <BaseLink
        href={hit.url}
        hideArrow
        className="DocSearch-Hit-explorer"
        style={
          {
            "--explorer-icon": `url("${NETWORK_ICON_PATH}${icon}")`,
          } as React.CSSProperties
        }
      >
        {children}
      </BaseLink>
    )
  }, [])

  const navigator = useMemo(
    () => ({
      navigate({ itemUrl }: { itemUrl: string }) {
        if (isExternal(itemUrl)) {
          window.open(itemUrl, "_blank", "noopener,noreferrer")?.focus()
          return
        }
        window.location.assign(itemUrl)
      },
    }),
    []
  )

  const transformSearchClient = useCallback(
    (client: MinimalSearchClient): MinimalSearchClient => ({
      ...client,
      search: async (requests) => {
        const response = await client.search(requests)
        const parsed = parseExplorerQuery(requests[0]?.q ?? "")
        if (!parsed) return response
        const hits = buildExplorerHits(parsed)
        const [first, ...rest] = response.results
        return {
          results: [
            {
              ...first,
              hits: [...hits, ...(first?.hits ?? [])],
              nbHits: (first?.nbHits ?? 0) + hits.length,
            },
            ...rest,
          ],
        }
      },
    }),
    [buildExplorerHits]
  )

  const searchModalProps = {
    typesenseCollectionName: collectionName,
    typesenseServerConfig: {
      nodes: [{ host, port, protocol }],
      apiKey,
    },
    typesenseSearchParameters: {
      // Break near-ties by page importance: root-level pages rank 10, tutorials 1.
      // 100 buckets is deliberate -- coarser bucketing collapses genuinely different
      // match scores into one tier and lets a three-value signal reorder them, which
      // measured worse than no sort at all. At this granularity pagerank only decides
      // between comparable matches: hit@1 and MRR match the unsorted baseline while
      // hit@10 improves 81% -> 84% against the labelled query set.
      sort_by: "_text_match(buckets: 100):desc,pagerank:desc",
    },
    onClose,
    hitComponent,
    navigator,
    // The prop is typed against typesense's SearchClient; the object the hook builds
    // is the narrower shape above.
    transformSearchClient:
      transformSearchClient as unknown as DocSearchModalProps["transformSearchClient"],
    transformItems: (items: DocSearchHit[]) =>
      items.map((item: DocSearchHit) => {
        // Our own hit carries an absolute explorer URL, which sanitizeHitUrl would
        // strip to a path -- turning it into a broken internal link.
        if (isExplorerHit(item.objectID)) return item
        // Use JSON clone for browser compatibility (structuredClone not available in Chrome < 98)
        const newItem: DocSearchHit = JSON.parse(JSON.stringify(item))
        newItem.url = sanitizeHitUrl(item.url)
        // lvl0 is the page's og:title, which always ends " | ethereum.org", and it is
        // shown as the group header above every result. The fork keeps it in several
        // places -- a flat dotted key, the `hierarchy` object, a `hierarchy_camel`
        // array, and `_highlightResult`/`_snippetResult` copies that the renderer
        // actually reads -- so walk the hit and strip it wherever it appears.
        stripTitleSuffix(newItem as unknown as Record<string, unknown>)
        return newItem
      }),
    placeholder: t("search-ethereum-org"),
    translations: {
      searchBox: {
        resetButtonTitle: t("clear"),
        resetButtonAriaLabel: t("clear"),
        cancelButtonText: t("close"),
        cancelButtonAriaLabel: t("close"),
      },
      footer: {
        selectText: t("docsearch-to-select"),
        selectKeyAriaLabel: t("docsearch-to-select"),
        navigateText: t("docsearch-to-navigate"),
        navigateUpKeyAriaLabel: t("up"),
        navigateDownKeyAriaLabel: t("down"),
        closeText: t("docsearch-to-close"),
        closeKeyAriaLabel: t("docsearch-to-close"),
        searchByText: t("docsearch-search-by"),
      },
      errorScreen: {
        titleText: t("docsearch-error-title"),
        helpText: t("docsearch-error-help"),
      },
      startScreen: {
        recentSearchesTitle: t("docsearch-start-recent-searches-title"),
        noRecentSearchesText: t("docsearch-start-no-recent-searches"),
        saveRecentSearchButtonTitle: t("docsearch-start-save-recent-search"),
        removeRecentSearchButtonTitle: t(
          "docsearch-start-remove-recent-search"
        ),
        favoriteSearchesTitle: t("docsearch-start-favorite-searches"),
        removeFavoriteSearchButtonTitle: t(
          "docsearch-start-remove-favorite-search"
        ),
      },
      noResultsScreen: {
        noResultsText: t("docsearch-no-results-text"),
        suggestedQueryText: t("docsearch-no-results-suggested-query"),
        reportMissingResultsText: t("docsearch-no-results-missing"),
        reportMissingResultsLinkText: t("docsearch-no-results-missing-link"),
      },
    },
  }

  return (
    <>
      {asChild ? (
        <Slot
          ref={searchButtonRef}
          onClick={handleOpen}
          data-testid="search-button"
        >
          {children}
        </Slot>
      ) : (
        <>
          <SearchButton
            onClick={handleOpen}
            data-testid="search-button"
            className="xl:hidden"
          />
          <SearchInputButton className="max-xl:hidden" onClick={handleOpen} />
        </>
      )}
      <Portal.Root>
        {isOpen && (
          <ErrorBoundary
            fallback={() => (
              <div className="fixed inset-0 z-modal flex items-center justify-center bg-overlay">
                <div className="mx-4 flex flex-col items-center gap-4 rounded-lg bg-background p-8 text-center shadow-lg">
                  <p className="text-body-medium">
                    {t("loading-error-refresh")}
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary-hover"
                      onClick={() => window.location.reload()}
                    >
                      {t("refresh")}
                    </button>
                    <button
                      className="rounded-md border border-body-light px-4 py-2 text-sm text-body hover:bg-background-highlight"
                      onClick={onClose}
                    >
                      {t("close")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          >
            <SearchModal {...searchModalProps} />
          </ErrorBoundary>
        )}
      </Portal.Root>
    </>
  )
}

export default Search
