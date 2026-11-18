"use client"

import { Languages, Menu } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import type { Lang } from "@/lib/types"

import LanguagePicker from "@/components/LanguagePicker"
import { SheetFooter, SheetHeader } from "@/components/ui/sheet"

import { isLangRightToLeft } from "@/lib/utils/translations"

import { MOBILE_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import DrillDownNav from "./DrillDownNav"
import FooterButton from "./FooterButton"
import FooterItemText from "./FooterItemText"
import MenuHeader from "./MenuHeader"
import ThemeToggleFooterButton from "./ThemeToggleFooterButton"

import { useLanguagesDisplayInfo } from "@/hooks/useLanguagesDisplayInfo"

/**
 * Client-side mobile menu content
 * Fetches navigation and language data on the client to avoid RSC payload bloat
 */
export default function MobileMenuContent() {
  const t = useTranslations("common")
  const locale = useLocale()
  const isRtl = isLangRightToLeft(locale as Lang)
  const dir = isRtl ? "rtl" : "ltr"

  return (
    <>
      <SheetHeader>
        <MenuHeader />
      </SheetHeader>

      <TabsPrimitive.Root
        dir={dir}
        defaultValue="navigation"
        className="flex min-h-0 flex-1 flex-col"
      >
        <TabsPrimitive.Content
          value="navigation"
          className="mt-0 hidden min-h-0 flex-1 flex-col border-none p-0 data-[state=active]:flex"
        >
          <DrillDownNav className="min-h-0 flex-1 overflow-y-auto" />
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
          value="languages"
          className="mt-0 hidden min-h-0 flex-1 flex-col border-none p-0 data-[state=active]:flex"
        >
          <LanguageContent className="flex min-h-0 flex-1 flex-col" />
        </TabsPrimitive.Content>

        <SheetFooter className="h-[108px] shrink-0 justify-center border-t border-body-light px-4 py-0">
          <TabsPrimitive.List className="grid h-auto w-full grid-cols-3">
            <div className="flex flex-col items-center gap-1 py-2">
              <TabsPrimitive.Trigger value="languages" asChild>
                <FooterButton
                  icon={Languages}
                  name={MOBILE_LANGUAGE_BUTTON_NAME}
                  data-testid="mobile-menu-language-picker"
                >
                  <FooterItemText>{t("languages")}</FooterItemText>
                </FooterButton>
              </TabsPrimitive.Trigger>
            </div>
            <div className="flex flex-col items-center gap-1 py-2">
              <ThemeToggleFooterButton />
            </div>
            <div className="flex flex-col items-center gap-1 py-2">
              <TabsPrimitive.Trigger value="navigation" asChild>
                <FooterButton
                  icon={Menu}
                  data-testid="mobile-menu-navigation-picker"
                >
                  <FooterItemText>{t("menu")}</FooterItemText>
                </FooterButton>
              </TabsPrimitive.Trigger>
            </div>
          </TabsPrimitive.List>
        </SheetFooter>
      </TabsPrimitive.Root>
    </>
  )
}

function LanguageContent({ className }: { className?: string }) {
  const languages = useLanguagesDisplayInfo()

  return <LanguagePicker className={className} languages={languages} />
}
