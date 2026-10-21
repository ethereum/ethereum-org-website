"use client"

import { useRef } from "react"
import { Search as SearchIcon, Sparkles } from "lucide-react"

import Search from "@/components/Search"
import Input from "@/components/ui/input"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { HOME_SEARCH_HASH } from "@/lib/constants"

import { useOnHash } from "@/hooks/useOnHash"

type HomeSearchInputProps = {
  label: string
  eventCategory: string
  /** Asking is English-only, so elsewhere this is a search box. */
  ask: boolean
}

const preloadModal = () => import("@/components/Search/SearchModal")

/**
 * The hero's search as a field: focusing it does nothing, the first keystroke opens the
 * modal and the typing carries on there.
 *
 * The modal reads the field when it mounts rather than when it is asked to open, so
 * characters typed while its chunk loads are kept; focusing the field preloads it to
 * keep that window short. The field empties once focus moves into the modal, so it is
 * blank again on close.
 */
const HomeSearchInput = ({
  label,
  ask,
  eventCategory,
}: HomeSearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  // Keystrokes keep landing here until the modal takes focus; open (and count) once.
  const openedRef = useRef(false)
  // The `#ask` focus is the page's doing, not the reader's; leave it uncounted.
  const scriptFocusRef = useRef(false)
  const Icon = ask ? Sparkles : SearchIcon

  // Script focus can't raise the iOS keyboard; on touch this only places the caret.
  useOnHash(HOME_SEARCH_HASH, () => {
    const input = inputRef.current
    if (!input) return
    input.scrollIntoView({ block: "center" })
    scriptFocusRef.current = true
    input.focus({ preventScroll: true })
  })

  return (
    <Search
      ownsShortcut={false}
      getInitialQuery={() => inputRef.current?.value ?? ""}
    >
      {(open) => {
        const openOnce = (value: string) => {
          if (!value || openedRef.current) return
          openedRef.current = true
          open()
        }

        return (
          <label className="relative flex items-center max-sm:w-full">
            <Icon
              aria-hidden
              className="pointer-events-none absolute start-6 size-6 text-body"
            />
            <Input
              ref={inputRef}
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              aria-label={label}
              placeholder={label}
              className="field-sizing-content rounded-lg py-3 ps-14 pe-8 text-lg max-sm:w-full max-sm:pe-14 max-sm:placeholder:text-center"
              onFocus={() => {
                preloadModal()
                if (scriptFocusRef.current) {
                  scriptFocusRef.current = false
                  return
                }
                trackCustomEvent({
                  eventCategory,
                  eventAction: "cta_click",
                  eventName: "search_input",
                })
              }}
              onChange={(e) => {
                // An IME is still composing; open once the character is committed.
                if ((e.nativeEvent as InputEvent).isComposing) return
                openOnce(e.currentTarget.value)
              }}
              onCompositionEnd={(e) => openOnce(e.currentTarget.value)}
              onBlur={(e) => {
                e.currentTarget.value = ""
                openedRef.current = false
              }}
            />
          </label>
        )
      }}
    </Search>
  )
}

export default HomeSearchInput
