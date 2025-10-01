"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { useLocale } from "next-intl"
import { type DocSearchHit, useDocSearchKeyboardEvents } from "@docsearch/react"
import * as Portal from "@radix-ui/react-portal"
import { Slot } from "@radix-ui/react-slot"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { sanitizeHitTitle } from "@/lib/utils/sanitizeHitTitle"
import { sanitizeHitUrl } from "@/lib/utils/url"

import SearchButton from "./SearchButton"
import SearchInputButton from "./SearchInputButton"

import { useDisclosure } from "@/hooks/useDisclosure"
import { useTranslation } from "@/hooks/useTranslation"

const SearchModal = dynamic(() => import("./SearchModal"))

interface SearchProps {
  asChild?: boolean
  children?: React.ReactElement
}

const Search = ({ asChild = false, children }: SearchProps) => {
  const disclosure = useDisclosure()
  const { isOpen, onOpen, onClose } = disclosure

  const locale = useLocale()
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation("common")

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
    searchButtonRef,
  })

  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ""
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ""
  const indexName =
    process.env.NEXT_PUBLIC_ALGOLIA_BASE_SEARCH_INDEX_NAME || "ethereumorg"

  const searchModalProps = {
    apiKey,
    appId,
    indexName,
    onClose,
    searchParameters: {
      facetFilters: [`lang:${locale}`],
    },
    transformItems: (items: DocSearchHit[]) =>
      items.map((item: DocSearchHit) => {
        const newItem: DocSearchHit = structuredClone(item)
        newItem.url = sanitizeHitUrl(item.url)
        const newTitle = sanitizeHitTitle(item.hierarchy.lvl0 || "")
        newItem.hierarchy.lvl0 = newTitle
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
        {isOpen && <SearchModal {...searchModalProps} />}
      </Portal.Root>
    </>
  )
}

export default Search
