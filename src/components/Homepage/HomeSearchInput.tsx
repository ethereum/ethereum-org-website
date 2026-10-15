"use client"

import { useRef } from "react"
import { Search as SearchIcon, Sparkles } from "lucide-react"

import Search from "@/components/Search"

import { HOME_SEARCH_HASH } from "@/lib/constants"

import { useOnHash } from "@/hooks/useOnHash"

type HomeSearchInputProps = {
  label: string
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
const HomeSearchInput = ({ label, ask }: HomeSearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  // Keystrokes keep landing here until the modal takes focus; open (and count) once.
  const openedRef = useRef(false)
  const Icon = ask ? Sparkles : SearchIcon

  // Script focus can't raise the iOS keyboard; on touch this only places the caret.
  useOnHash(HOME_SEARCH_HASH, () => {
    inputRef.current?.focus({ preventScroll: true })
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
          <label className="relative flex w-full items-center">
            <Icon
              aria-hidden
              className="pointer-events-none absolute start-4 size-5 text-body-medium"
            />
            <input
              ref={inputRef}
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              aria-label={label}
              placeholder={label}
              className="w-full rounded-lg border border-body-light bg-background px-12 py-3 text-lg placeholder:text-center placeholder:text-body-medium hover:border-primary-hover focus-visible:outline-[3px] focus-visible:-outline-offset-2 focus-visible:outline-primary-hover"
              onFocus={preloadModal}
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
