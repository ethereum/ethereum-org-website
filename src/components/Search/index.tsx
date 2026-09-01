"use client"

import { type RefObject, useRef } from "react"
import dynamic from "next/dynamic"
import { useLocale, useTranslations } from "next-intl"
import {
  type DocSearchModalProps,
  useDocSearchKeyboardEvents,
} from "typesense-docsearch-react"
import * as Portal from "@radix-ui/react-portal"
import { Slot } from "@radix-ui/react-slot"

import { ErrorBoundary } from "@/components/ui/error-boundary"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { sanitizeHitTitle } from "@/lib/utils/sanitizeHitTitle"
import { sanitizeHitUrl } from "@/lib/utils/url"

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

  const searchModalProps = {
    typesenseCollectionName: collectionName,
    typesenseServerConfig: {
      nodes: [{ host, port, protocol }],
      apiKey,
    },
    // Required by the modal's types. Empty by design: the collection is already
    // locale-scoped, so no language filter is needed. This is the hook point for
    // query tuning (typo thresholds, grouping) once it's been measured.
    typesenseSearchParameters: {},
    onClose,
    transformItems: (items: DocSearchHit[]) =>
      items.map((item: DocSearchHit) => {
        // Use JSON clone for browser compatibility (structuredClone not available in Chrome < 98)
        const newItem: DocSearchHit = JSON.parse(JSON.stringify(item))
        newItem.url = sanitizeHitUrl(item.url)
        newItem["hierarchy.lvl0"] = sanitizeHitTitle(
          item["hierarchy.lvl0"] || ""
        )
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
