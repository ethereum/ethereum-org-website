import { Languages, Menu } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import type { Lang } from "@/lib/types"

import LanguagePicker from "@/components/LanguagePicker"
import ExpandIcon from "@/components/Nav/MobileMenu/ExpandIcon"
import LvlAccordion from "@/components/Nav/MobileMenu/LvlAccordion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SheetCloseOnNavigate } from "@/components/ui/sheet-close-on-navigate"

import { cn } from "@/lib/utils/cn"
import { isLangRightToLeft } from "@/lib/utils/translations"
import { slugify } from "@/lib/utils/url"

import { MOBILE_LANGUAGE_BUTTON_NAME, SECTION_LABELS } from "@/lib/constants"

import FooterButton from "./FooterButton"
import FooterItemText from "./FooterItemText"
import HamburgerButton from "./HamburgerButton"
import MenuHeader from "./MenuHeader"
import ThemeToggleFooterButton from "./ThemeToggleFooterButton"

import { getLanguagesDisplayInfo, getNavigation } from "@/lib/nav/links"

type MobileMenuProps = {
  className?: string
}

export default async function MobileMenu({
  className,
  ...props
}: MobileMenuProps) {
  const t = await getTranslations({ namespace: "common" })
  const locale = await getLocale()
  const isRtl = isLangRightToLeft(locale as Lang)
  const side = isRtl ? "right" : "left"
  const dir = isRtl ? "rtl" : "ltr"

  return (
    <SheetCloseOnNavigate>
      <SheetTrigger className={className} asChild>
        <HamburgerButton
          className={cn("-me-2", className)}
          isMenuOpen={false}
          {...props}
        />
      </SheetTrigger>
      <SheetContent
        side={side}
        hideOverlay
        className="flex flex-col"
        aria-describedby=""
      >
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
            <NavigationContent className="flex-1 overflow-y-auto" />
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
      </SheetContent>
    </SheetCloseOnNavigate>
  )
}

async function NavigationContent({ className }: { className?: string }) {
  const locale = await getLocale()
  const linkSections = await getNavigation()

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

async function LanguageContent({ className }: { className?: string }) {
  const languages = await getLanguagesDisplayInfo()

  return <LanguagePicker className={className} languages={languages} />
}
