import { useRef, forwardRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdSearch } from "react-icons/md"
import * as Portal from "@radix-ui/react-portal"
import { useDocSearchKeyboardEvents } from "@docsearch/react"
import { DocSearchHit } from "@docsearch/react/dist/esm/types"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { sanitizeHitTitle } from "@/lib/utils/sanitizeHitTitle"
import { sanitizeHitUrl } from "@/lib/utils/url"

import SearchButton from "./SearchButton"

import "@docsearch/css"
import { Button, ButtonProps } from "../ui/button"

const SearchModal = dynamic(() => import("./SearchModal"))

export const SearchIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className="px-2 transition-transform duration-200 ease-in-out hover:text-primary-base hover:rotate-5"
      {...props}
    >
      <MdSearch className="w-8 h-8" />
    </Button>
  )
)

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const Search = forwardRef<HTMLButtonElement, Props>(
  ({ isOpen, onOpen, onClose }, ref) => {
    const { locale } = useRouter()
    const searchButtonRef = useRef<HTMLButtonElement>(null)
    // const mergedButtonRefs = useMergeRefs(ref, searchButtonRef)
    const { t } = useTranslation("common")

    useDocSearchKeyboardEvents({
      isOpen,
      onOpen,
      onClose,
      searchButtonRef,
    })

    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ""
    const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ""
    const indexName =
      process.env.NEXT_PUBLIC_ALGOLIA_BASE_SEARCH_INDEX_NAME || "ethereumorg"

    return (
      <>
        <div className="hidden xl:block">
          <SearchButton
            // ref={mergedButtonRefs}
            onClick={() => {
              onOpen()
              trackCustomEvent({
                eventCategory: "nav bar",
                eventAction: "click",
                eventName: "search open",
              })
            }}
            translations={{
              buttonText: t("search"),
              buttonAriaLabel: t("search"),
            }}
          />
        </div>
        <div className="xl:hidden">
          <SearchIconButton
            ref={ref}
            onClick={() => {
              onOpen()
              trackCustomEvent({
                eventCategory: "nav bar",
                eventAction: "click",
                eventName: "search open",
              })
            }}
            aria-label={t("aria-toggle-search-button")}
          />
        </div>
        <Portal.Root>
          {isOpen && (
            <SearchModal
              apiKey={apiKey}
              appId={appId}
              indexName={indexName}
              onClose={onClose}
              searchParameters={{
                facetFilters: [`lang:${locale}`],
              }}
              transformItems={(items) =>
                items.map((item: DocSearchHit) => {
                  const newItem: DocSearchHit = structuredClone(item)
                  newItem.url = sanitizeHitUrl(item.url)
                  const newTitle = sanitizeHitTitle(
                    item._highlightResult.hierarchy.lvl0?.value || ""
                  )
                  newItem._highlightResult.hierarchy.lvl0.value = newTitle
                  return newItem
                })
              }
              placeholder={t("search-ethereum-org")}
              translations={{
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
                  recentSearchesTitle: t(
                    "docsearch-start-recent-searches-title"
                  ),
                  noRecentSearchesText: t("docsearch-start-no-recent-searches"),
                  saveRecentSearchButtonTitle: t(
                    "docsearch-start-save-recent-search"
                  ),
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
                  reportMissingResultsLinkText: t(
                    "docsearch-no-results-missing-link"
                  ),
                },
              }}
            />
          )}
        </Portal.Root>
      </>
    )
  }
)

export default Search
