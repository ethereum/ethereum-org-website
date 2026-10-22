"use client"

import { type RefObject, useRef } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { useDocSearchKeyboardEvents } from "typesense-docsearch-react"
import * as Portal from "@radix-ui/react-portal"
import { Slot } from "@radix-ui/react-slot"

import { ErrorBoundary } from "@/components/ui/error-boundary"

import { trackCustomEvent } from "@/lib/utils/matomo"

import SearchButton from "./SearchButton"
import SearchInputButton from "./SearchInputButton"

import { useDisclosure } from "@/hooks/useDisclosure"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import { useOnHash } from "@/hooks/useOnHash"

const SearchModal = dynamic(() => import("./SearchModal"))

const noop = () => {}

interface SearchProps {
  asChild?: boolean
  /** An element to open the modal on click (with `asChild`), or a render function handed the opener. */
  children?:
    | React.ReactElement<unknown>
    | ((open: () => void) => React.ReactNode)
  /**
   * Whether this instance answers the global open shortcut. Exactly one mounted instance
   * may: the hook binds at the document, so a second would open a second modal on the
   * same keypress. The nav's instance owns it; a trigger elsewhere on the page opts out
   * and opens on click alone. Escape still closes whichever one is open.
   */
  ownsShortcut?: boolean
  /** Read when the modal mounts, not when it is asked to open, so keystrokes typed while it loads are kept. */
  getInitialQuery?: () => string
  /** Opens the modal when the page loads with, or navigates to, this URL fragment. */
  openOnHash?: string
}

const Search = ({
  asChild = false,
  children,
  ownsShortcut = true,
  getInitialQuery,
  openOnHash,
}: SearchProps) => {
  const disclosure = useDisclosure()
  const { isOpen, onOpen, onClose } = disclosure

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

  useOnHash(openOnHash, () => {
    onOpen()
    trackCustomEvent({
      eventCategory: "nav bar",
      eventAction: "link",
      eventName: "search open",
    })
  })

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen: ownsShortcut ? handleOpen : noop,
    onClose,
    // The fork's React 18-era types want a non-null ref; React 19's useRef
    // yields RefObject<T | null>. Safe to narrow — the hook only reads .current.
    searchButtonRef: searchButtonRef as RefObject<HTMLButtonElement>,
  })

  // DocSearch already opens on these chords, so there is nothing to do here.
  // The registration exists only so the hook counts a keyboard-opened search
  // separately from the button, which share the event above.
  useKeyboardShortcut("search", () => {}, { enabled: ownsShortcut })

  return (
    <>
      {typeof children === "function" ? (
        children(handleOpen)
      ) : asChild ? (
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
            <SearchModal onClose={onClose} getInitialQuery={getInitialQuery} />
          </ErrorBoundary>
        )}
      </Portal.Root>
    </>
  )
}

export default Search
