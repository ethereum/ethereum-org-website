import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdClose } from "react-icons/md"

import type { Lang } from "@/lib/types"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"
import { isLangRightToLeft } from "@/lib/utils/translations"

import Emoji from "./Emoji"

export type TranslationBannerProps = {
  shouldShow: boolean
  originalPagePath: string
  isPageContentEnglish: boolean
}

const TranslationBanner = ({
  shouldShow,
  originalPagePath,
  isPageContentEnglish,
}: TranslationBannerProps) => {
  const [isOpen, setIsOpen] = useState(shouldShow)
  const { t } = useTranslation("common")
  const { locale } = useRouter()
  const dir = isLangRightToLeft(locale! as Lang) ? "rtl" : "ltr"

  useEffect(() => {
    setIsOpen(shouldShow)
  }, [originalPagePath, shouldShow])

  const headerTextId = isPageContentEnglish
    ? "translation-banner-title-new"
    : "translation-banner-title-update"

  const bodyTextId = isPageContentEnglish
    ? "translation-banner-body-new"
    : "translation-banner-body-update"

  return (
    <aside
      className={cn(
        "fixed bottom-0 end-0 z-popover rounded bg-background-highlight md:bottom-8 md:end-8",
        isOpen ? "block" : "hidden"
      )}
      dir={dir}
    >
      <div className="relative max-h-full max-w-full p-4 shadow-md md:max-w-[600px]">
        <Flex className="m-4 mt-10 flex-col gap-4 sm:mt-4">
          <Flex className="flex-col-reverse items-start sm:flex-row sm:items-center">
            <h3 className="leading-none md:text-2xl">{t(headerTextId)}</h3>
            <Emoji
              text=":globe_showing_asia_australia:"
              className="mb-4 ms-2 text-2xl sm:mb-auto"
            />
          </Flex>
          <p>{t(bodyTextId)}</p>
          <Flex className="flex-col items-start sm:flex-row sm:items-center">
            <div>
              <ButtonLink href="/contributing/translation-program/">
                {t("translation-banner-button-translate-page")}
              </ButtonLink>
            </div>
            {/* Todo: Reimplement once fixed */}
            {/* Issue: https://github.com/ethereum/ethereum-org-website/issues/12292 */}
            {/* {!isPageContentEnglish && (
              <div>
                <Button
                  asChild
                  variant="outline"
                  className="ms-0 sm:ms-2 mt-2 sm:mt-0 border-neutral-900 text-neutral-900"
                >
                  <a href={originalPagePath} lang={DEFAULT_LOCALE}>
                    {t("translation-banner-button-see-english")}
                  </a>
                </Button>
              </div>
            )} */}
          </Flex>
        </Flex>
        <Button
          variant="ghost"
          size="sm"
          className="absolute end-0 top-0 m-2 hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          <MdClose className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </aside>
  )
}

export default TranslationBanner
