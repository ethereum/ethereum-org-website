"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { useLocale } from "next-intl"

import Translate from "@/components/icons/translate.svg"
import SearchButton from "@/components/Search/SearchButton"
import SearchInputButton from "@/components/Search/SearchInputButton"
import { Skeleton } from "@/components/ui/skeleton"

import { DESKTOP_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import { Button } from "../../ui/buttons/Button"
import { useNavigation } from "../useNavigation"
import { useThemeToggle } from "../useThemeToggle"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"
import { useTranslation } from "@/hooks/useTranslation"

const LazyButton = dynamic(
  () => import("../../ui/buttons/Button").then((mod) => mod.Button),
  {
    ssr: false,
    loading: () => (
      <Skeleton
        data-label="mobile-menu"
        className="mx-3 size-6 px-3 max-md:hidden"
      />
    ),
  }
)

const Menu = dynamic(() => import("../Menu"), {
  ssr: false,
  loading: () => (
    <div className="me-8 flex w-full items-center gap-10 px-6 max-md:hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-12 py-2" />
      ))}
    </div>
  ),
})

const MobileMenuLoading = () => (
  <Skeleton data-label="mobile-menu" className="ms-2 size-6" />
)

const MobileNavMenu = dynamic(() => import("../Mobile"), {
  ssr: false,
  loading: MobileMenuLoading,
})

const SearchProvider = dynamic(() => import("../../Search"), {
  ssr: false,
  loading: () => (
    <>
      <div className="flex items-center gap-6 px-2 max-md:hidden xl:px-3">
        <Skeleton
          data-label="search-xl"
          className="hidden h-6 w-[169px] xl:flex"
        />
        <Skeleton data-label="search" className="size-6 xl:hidden" />
      </div>
      <div className="flex items-center md:hidden">
        <Skeleton data-label="search" className="mx-2 size-6" />
        <MobileMenuLoading />
      </div>
    </>
  ),
})

const LanguagePicker = dynamic(() => import("../../LanguagePicker"), {
  ssr: false,
  loading: () => (
    // LG skeleton width approximates English "[icon] Languages EN" text width
    <Skeleton className="h-6 max-md:hidden md:mx-2 md:w-[54px] lg:mx-3 lg:w-[8.875rem]" />
  ),
})

const ClientSideNav = () => {
  const { t } = useTranslation("common")
  const locale = useLocale()

  const { linkSections } = useNavigation()
  const { toggleColorMode, ThemeIcon, themeIconAriaLabel } = useThemeToggle()

  const languagePickerRef = useRef<HTMLButtonElement>(null)

  // avoid rendering/adding desktop Menu version to DOM on mobile
  const desktopScreen = useBreakpointValue({ base: false, md: true })

  return (
    <>
      {desktopScreen && (
        <Menu
          className="animate-fade-in max-md:hidden"
          sections={linkSections}
        />
      )}

      <div className="flex items-center">
        <SearchProvider>
          {({ onOpen }) => {
            return (
              <>
                <SearchInputButton
                  className="animate-fade-in max-xl:hidden"
                  onClick={onOpen}
                />
                <SearchButton
                  className="animate-fade-in xl:hidden"
                  onClick={onOpen}
                />

                {!desktopScreen && (
                  <MobileNavMenu
                    toggleColorMode={toggleColorMode}
                    linkSections={linkSections}
                    toggleSearch={onOpen}
                    className="flex animate-fade-in md:hidden"
                  />
                )}
              </>
            )
          }}
        </SearchProvider>

        {desktopScreen && (
          <LazyButton
            aria-label={themeIconAriaLabel}
            variant="ghost"
            isSecondary
            className="group animate-fade-in px-2 max-md:hidden xl:px-3 [&>svg]:transition-transform [&>svg]:duration-500 [&>svg]:hover:rotate-12 [&>svg]:hover:text-primary-hover"
            onClick={toggleColorMode}
          >
            <ThemeIcon className="transform-transform duration-500 group-hover:rotate-12 group-hover:transition-transform group-hover:duration-500" />
          </LazyButton>
        )}

        {desktopScreen && (
          <LanguagePicker className="max-md:hidden">
            <Button
              name={DESKTOP_LANGUAGE_BUTTON_NAME}
              ref={languagePickerRef}
              variant="ghost"
              className="animate-fade-in gap-0 px-2 text-body transition-transform duration-500 active:bg-primary-low-contrast active:text-primary-hover data-[state='open']:bg-primary-low-contrast data-[state='open']:text-primary-hover max-md:hidden xl:px-3 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:hover:rotate-12"
            >
              <Translate className="me-2 align-middle text-2xl" />
              <span className="max-lg:hidden">{t("languages")}&nbsp;</span>
              {locale!.toUpperCase()}
            </Button>
          </LanguagePicker>
        )}
      </div>
    </>
  )
}

export default ClientSideNav
