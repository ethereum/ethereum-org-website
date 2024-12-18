import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import Emoji from "./Emoji"
import Translation from "./Translation"

export type TranslationBannerLegalProps = {
  shouldShow: boolean
  originalPagePath: string
}

const TranslationBannerLegal = ({
  shouldShow,
  originalPagePath,
}: TranslationBannerLegalProps) => {
  // Default to isOpen being false, and let the useEffect set this.
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (
      localStorage.getItem(
        `dont-show-translation-legal-banner-${originalPagePath}`
      ) === "true"
    ) {
      setIsOpen(false)
    } else {
      setIsOpen(shouldShow)
    }
  }, [originalPagePath, shouldShow])

  return (
    <aside
      className={cn(
        "fixed z-50",
        "bottom-0 md:bottom-8",
        "right-0 md:right-8",
        isOpen ? "block" : "hidden"
      )}
    >
      <div
        className={cn(
          "relative flex justify-between",
          "w-full md:max-w-[600px]",
          "rounded-sm p-4",
          "bg-info-banner text-black-300",
          "shadow-[rgba(0,0,0,0.16)_0px_2px_4px_0px] md:shadow-md"
        )}
      >
        <div className="m-4 mt-[40px] flex flex-col sm:mt-4">
          <div className="mb-4 flex flex-col-reverse items-start sm:flex-row sm:items-center">
            <h3 className="text-xl font-bold leading-none md:text-2xl">
              <Translation id="translation-banner-no-bugs-title" />
              <Emoji
                text=":bug:"
                className="mb-4 ms-2 pt-2 text-3xl sm:mb-auto"
              />
            </h3>
          </div>
          <p>
            <Translation id="translation-banner-no-bugs-content" />
          </p>
          <div className="flex flex-col items-start sm:flex-row sm:items-center">
            <Button
              variant="link"
              onClick={() => {
                localStorage.setItem(
                  `dont-show-translation-legal-banner-${originalPagePath}`,
                  "true"
                )
                setIsOpen(false)
              }}
            >
              <Translation id="translation-banner-no-bugs-dont-show-again" />
            </Button>
          </div>
        </div>
        <button
          type="button"
          className={cn(
            "absolute right-0 top-0 m-4",
            "rounded-sm p-2",
            "text-secondary hover:text-primary"
          )}
          onClick={() => setIsOpen(false)}
        >
          <MdClose className="h-4 w-4" />
        </button>
      </div>
    </aside>
  )
}

export default TranslationBannerLegal
