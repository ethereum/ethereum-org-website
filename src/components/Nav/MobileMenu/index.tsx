import { Languages, SearchIcon } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import { Trigger as TabsTrigger } from "@radix-ui/react-tabs"

import { Lang } from "@/lib/types"

import MobileLanguagePicker from "@/components/LanguagePicker/Mobile"
import ExpandIcon from "@/components/Nav/MobileMenu/ExpandIcon"
import LvlAccordion from "@/components/Nav/MobileMenu/LvlAccordion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Nav/MobileMenu/MenuAccordion"
import Search from "@/components/Search"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"

import { cn } from "@/lib/utils/cn"

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

  return (
    <Sheet>
      <SheetTrigger className={className} asChild>
        <HamburgerButton
          className={cn("-me-2", className)}
          isMenuOpen={false}
          {...props}
        />
      </SheetTrigger>
      <SheetContent
        forceMount
        side="left"
        className="flex flex-col"
        aria-describedby=""
      >
        <SheetHeader>
          <MenuHeader />
        </SheetHeader>

        <Tabs
          defaultValue="navigation"
          className="flex flex-1 flex-col overflow-auto"
        >
          <div className="flex-1 overflow-auto">
            <TabsContent value="navigation" className="mt-0 border-none p-0">
              <NavigationContent />
            </TabsContent>
            <TabsContent value="languages" className="mt-0 border-none p-0">
              <LanguageContent />
            </TabsContent>
          </div>

          <SheetFooter className="h-[108px] justify-center border-t border-body-light px-4 py-0">
            <TabsList className="grid h-auto w-full grid-cols-3">
              <div className="flex flex-col items-center gap-1 py-2">
                <Search asChild>
                  <FooterButton icon={SearchIcon}>
                    <FooterItemText>{t("search")}</FooterItemText>
                  </FooterButton>
                </Search>
              </div>
              <div className="flex flex-col items-center gap-1 py-2">
                <ThemeToggleFooterButton />
              </div>
              <div className="flex flex-col items-center gap-1 py-2">
                <TabsTrigger value="languages" asChild>
                  <FooterButton
                    icon={Languages}
                    name={MOBILE_LANGUAGE_BUTTON_NAME}
                  >
                    <FooterItemText>{t("languages")}</FooterItemText>
                  </FooterButton>
                </TabsTrigger>
              </div>
            </TabsList>
          </SheetFooter>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

async function NavigationContent() {
  const locale = await getLocale()
  const linkSections = await getNavigation(locale as Lang)

  return (
    <nav className="p-0">
      <Accordion locale={locale as Lang}>
        {SECTION_LABELS.map((key) => {
          const { label, items } = linkSections[key]

          return (
            <AccordionItem
              key={key}
              value={key}
              className="group/accordion-item border-b border-body-light first:border-t"
            >
              <AccordionTrigger className="text-body">
                <ExpandIcon />
                <span className="flex-1 text-start text-lg font-bold leading-none">
                  {label}
                </span>
              </AccordionTrigger>

              <AccordionContent className="mt-0 bg-background-low p-0">
                <LvlAccordion lvl={2} items={items} activeSection={key} />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </nav>
  )
}

async function LanguageContent() {
  const languages = await getLanguagesDisplayInfo()

  return (
    <div className="h-full">
      <MobileLanguagePicker languages={languages} />
    </div>
  )
}
