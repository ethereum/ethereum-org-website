"use client"

import type { LocaleDisplayInfo } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

import LanguagePicker from "."

import { useDisclosure } from "@/hooks/useDisclosure"
import { useEventListener } from "@/hooks/useEventListener"

type DesktopLanguagePickerProps = {
  children: React.ReactNode
  languages: LocaleDisplayInfo[]
  className?: string
}

const DesktopLanguagePicker = ({
  children,
  languages,
  className,
}: DesktopLanguagePickerProps) => {
  const { isOpen, setValue, onClose, onOpen } = useDisclosure()

  /**
   * Adds a keydown event listener to focus filter input (\).
   * @param {string} event - The keydown event.
   */
  useEventListener("keydown", (e) => {
    if (e.key !== "\\" || e.metaKey || e.ctrlKey) return
    e.preventDefault()
    onOpen()
  })

  return (
    <Popover open={isOpen} onOpenChange={setValue}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="end"
        className={cn(
          "flex w-[320px] flex-col bg-background-highlight p-0",
          className
        )}
      >
        <LanguagePicker
          className="max-h-[calc(100vh-12rem)]"
          languages={languages}
          onSelect={onClose}
          onNoResultsClose={onClose}
          onTranslationProgramClick={onClose}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DesktopLanguagePicker
