"use client"

import { type ReactNode, useId, useState } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

const ExpandableDescription = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("common")
  const [isOpen, setIsOpen] = useState(false)
  const id = useId()

  return (
    <div className="flex flex-col items-start gap-2">
      <div
        id={id}
        className={cn(
          !isOpen &&
            "relative max-h-48 overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-16 after:bg-linear-to-t after:from-background-highlight"
        )}
      >
        {children}
      </div>
      <Button
        variant="link"
        className="px-0"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? t("show-less") : t("show-more")}
      </Button>
    </div>
  )
}

export default ExpandableDescription
