"use client"

import { Languages, Menu } from "lucide-react"
import { useLocale } from "next-intl"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import type { Lang } from "@/lib/types"

import LanguagePicker from "@/components/LanguagePicker"
import ExpandIcon from "@/components/Nav/MobileMenu/ExpandIcon"
import LvlAccordion from "@/components/Nav/MobileMenu/LvlAccordion"
import { useNavigation } from "@/components/Nav/useNavigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SheetFooter, SheetHeader } from "@/components/ui/sheet"

import { cn } from "@/lib/utils/cn"
import { isLangRightToLeft } from "@/lib/utils/translations"
import { slugify } from "@/lib/utils/url"

import { MOBILE_LANGUAGE_BUTTON_NAME, SECTION_LABELS } from "@/lib/constants"

import FooterButton from "./FooterButton"
import FooterItemText from "./FooterItemText"
import MenuHeader from "./MenuHeader"
import ThemeToggleFooterButton from "./ThemeToggleFooterButton"

import { useLanguagesDisplayInfo } from "@/hooks/useLanguagesDisplayInfo"
import useTranslation from "@/hooks/useTranslation"

/**
 * Client-side mobile menu content
 * Fetches navigation and language data on the client to avoid RSC payload bloat
 */
export default function MobileMenuContent() {
  const { t } = useTranslation("common")
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
          <NavigationContent className="min-h-0 flex-1 overflow-y-auto" />
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

function NavigationContent({ className }: { className?: string }) {
  const locale = useLocale()
  const { linkSections } = useNavigation()

  return (
    <nav className={cn("p-0", className)}>
      {SECTION_LABELS.map((key) => {
        const { label, items } = linkSections[key]

        return (
          <Collapsible
            key={key}
            className="border-b border-body-light first:border-t"
          >
            <CollapsibleTrigger
              data-testid={`mobile-menu-collapsible-${slugify(label)}`}
              className={cn(
                "group/menu flex w-full flex-1 items-center justify-between gap-2 px-4 py-4 font-medium transition-all hover:bg-background-highlight hover:text-primary-hover focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover group-data-[state=open]/menu:bg-background-highlight group-data-[state=open]/menu:text-primary-high-contrast md:px-4 [&[data-state=open]:dir(rtl)_[data-label=icon-container]>svg]:rotate-90 [&[data-state=open]_[data-label=icon-container]>svg]:-rotate-90",
                "text-body"
              )}
            >
              <ExpandIcon />
              <span className="flex-1 text-start text-lg font-bold leading-none">
                {label}
              </span>
            </CollapsibleTrigger>

            <CollapsibleContent
              className={cn(
                "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
                "mt-0 bg-background-low p-0"
              )}
            >
              <LvlAccordion
                lvl={2}
                items={items}
                activeSection={key}
                locale={locale}
              />
            </CollapsibleContent>
          </Collapsible>
        )
      })}
    </nav>
  )
}

function LanguageContent({ className }: { className?: string }) {
  const languages = useLanguagesDisplayInfo()

  return <LanguagePicker className={className} languages={languages} />
}
