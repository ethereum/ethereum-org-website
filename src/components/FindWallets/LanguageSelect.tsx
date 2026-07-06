"use client"

import { useEffect, useRef, useState } from "react"

import Input from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { trackCustomEvent } from "@/lib/utils/matomo"

import type { WalletLanguageOption } from "./types"
import {
  useWalletFilterActions,
  useWalletFilters,
} from "./WalletFilterProvider"

const trackLanguageSelect = (languageName: string) => {
  trackCustomEvent({
    eventCategory: "WalletFilterSidebar",
    eventAction: "Language search",
    eventName: languageName,
  })
}

const LanguageSelect = ({
  languages,
  searchPlaceholder,
  popularLabel,
}: {
  languages: WalletLanguageOption[]
  searchPlaceholder: string
  popularLabel: string
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { state } = useWalletFilters()
  const { setLanguage } = useWalletFilterActions()

  const countSortedLanguages = [...languages].sort((a, b) => b.count - a.count)

  useEffect(() => {
    if (isSelectOpen) {
      // Delay focus to ensure input is rendered
      const frame = requestAnimationFrame(() => {
        searchInputRef.current?.focus()
      })

      return () => cancelAnimationFrame(frame)
    }
  }, [isSelectOpen])

  return (
    <div className="flex flex-col gap-2">
      <Select
        open={isSelectOpen}
        onOpenChange={setIsSelectOpen}
        value={state.language}
        onValueChange={(langCode: string) => {
          const selected = languages.find((l) => l.langCode === langCode)
          trackLanguageSelect(selected?.name || langCode)
          setLanguage(langCode)
          setSearchQuery("") // Reset search when selection is made
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <div
            className="sticky -top-2 z-10 bg-background p-2"
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInputRef}
              type="search"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return

                const selectedLanguage = languages.find((lang) =>
                  lang.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                if (!selectedLanguage) return

                trackLanguageSelect(selectedLanguage.name)
                setLanguage(selectedLanguage.langCode)
                setIsSelectOpen(false)
                setSearchQuery("")
              }}
              className="w-full"
            />
          </div>
          {languages.map((language) => {
            const isVisible = language.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
            return (
              <SelectItem
                key={language.langCode}
                value={language.langCode}
                className={!isVisible ? "hidden" : ""}
              >
                {`${language.name} (${language.count})`}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      <p className="text-sm text-body-medium">{popularLabel}</p>
      <div className="flex flex-row flex-wrap gap-2">
        {countSortedLanguages.slice(0, 5).map((language, index, array) => {
          return (
            <span
              key={language.langCode}
              className="cursor-pointer text-sm text-primary"
              onClick={() => {
                trackLanguageSelect(language.name)
                setLanguage(language.langCode)
              }}
            >
              {`${language.name} (${language.count})${index < array.length - 1 ? ", " : ""}`}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default LanguageSelect
