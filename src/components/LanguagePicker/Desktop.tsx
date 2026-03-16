"use client"

import { Languages } from "lucide-react"

import type { LocaleDisplayInfo } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { DESKTOP_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import { Button } from "../ui/buttons/Button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

import LanguagePicker from "."

import { useDisclosure } from "@/hooks/useDisclosure"
import { useEventListener } from "@/hooks/useEventListener"

type DesktopLanguagePickerProps = {
  languages: LocaleDisplayInfo[]
  locale: string
  languageLabel: string
  className?: string
}

const DesktopLanguagePicker = ({
  languages,
  locale,
  languageLabel,
  className,
}: DesktopLanguagePickerProps) => {
  const { isOpen, setValue, onClose, onOpen } = useDisclosure()

  useEventListener("keydown", (e) => {
    if (e.key !== "\\" || e.metaKey || e.ctrlKey) return
    e.preventDefault()
    onOpen()
  })

  return (
    <Popover open={isOpen} onOpenChange={setValue}>
      <PopoverTrigger asChild>
        <Button
          name={DESKTOP_LANGUAGE_BUTTON_NAME}
          variant="ghost"
          className="animate-fade-in gap-0 px-2 text-body transition-transform duration-500 active:bg-primary-low-contrast active:text-primary-hover data-[state='open']:bg-primary-low-contrast data-[state='open']:text-primary-hover max-md:hidden xl:px-3 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:hover:rotate-12"
        >
          <Languages className="align-middle text-2xl" />
          &nbsp;
          <span className="max-lg:hidden">{languageLabel}&nbsp;</span>
          {locale.toUpperCase()}
        </Button>
      </PopoverTrigger>
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
