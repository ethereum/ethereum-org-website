import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {
  Box,
  Flex,
  Input,
  Menu,
  MenuDivider,
  MenuItem as ChakraMenuItem,
  MenuList,
  type MenuListProps,
  type MenuProps,
  Text,
} from "@chakra-ui/react"

import type { Lang, LocaleDisplayInfo } from "@/lib/types"

import { Button } from "@/components/Buttons"
import { BaseLink } from "@/components/Link"

import progressData from "@/data/translationProgress.json"

import { DEFAULT_LOCALE } from "@/lib/constants"

import MenuItem from "./MenuItem"
import NoResultsCallout from "./NoResultsCallout"

import i18nConfig from "@/../i18n.config.json"

type LanguagePickerProps = Omit<MenuListProps, "children"> & {
  children: React.ReactNode
  placement: MenuProps["placement"]
  handleClose?: () => void
}

const LanguagePicker = ({
  children,
  placement,
  handleClose,
  ...props
}: LanguagePickerProps) => {
  const { t } = useTranslation("page-languages")
  const router = useRouter()
  const { locale, locales } = router
  const inputRef = useRef<HTMLInputElement>(null)
  const firstItemRef = useRef<HTMLAnchorElement>(null)
  const [filterValue, setFilterValue] = useState("")

  // Get the preferred languages for the users browser
  const [navLangs, setNavLangs] = useState<string[]>([])
  useEffect(() => {
    setNavLangs(Array.from(navigator.languages))
  }, [])

  if (!(progressData?.length > 0))
    throw new Error("Missing translation progress data; check GitHub action")

  const totalWords = progressData[0].words.total

  const localeToDisplayInfo = (localeOption: string): LocaleDisplayInfo => {
    const i18nConfigItem = i18nConfig.find(({ code }) => localeOption === code)
    const englishName = i18nConfigItem!.name

    // Get "source" display name (Language choice displayed in language of current locale)
    const intlSource = new Intl.DisplayNames([locale!], {
      type: "language",
    }).of(localeOption)
    // For languages that do not have an Intl display name, use English name as fallback
    const fallbackSource =
      intlSource !== localeOption ? intlSource : englishName
    const i18nKey = "language-" + localeOption.toLowerCase()
    const i18nSource = t(i18nKey)
    const sourceName = i18nSource === i18nKey ? fallbackSource : i18nSource

    // Get "target" display name (Language choice displayed in that language)
    const fallbackTarget = new Intl.DisplayNames([localeOption], {
      type: "language",
    }).of(localeOption)
    const i18nConfigTarget = i18nConfigItem?.localName
    const targetName = i18nConfigTarget || fallbackTarget

    if (!sourceName || !targetName) {
      throw new Error("Missing language display name, locale: " + localeOption)
    }

    // English will not have a dataItem
    const dataItem = progressData.find(
      ({ languageId }) =>
        i18nConfigItem!.crowdinCode.toLowerCase() === languageId.toLowerCase()
    )

    const approvalProgress =
      localeOption === DEFAULT_LOCALE ? 100 : dataItem?.approvalProgress || 0

    const wordsApproved =
      localeOption === DEFAULT_LOCALE
        ? totalWords || 0
        : dataItem?.words.approved || 0

    return {
      localeOption,
      approvalProgress,
      sourceName,
      targetName,
      englishName,
      wordsApproved,
    }
  }

  const displayNames: LocaleDisplayInfo[] =
    locales
      ?.map(localeToDisplayInfo)
      .sort((a, b) => b.approvalProgress - a.approvalProgress) || []

  const filteredNames = displayNames.filter(
    ({ localeOption, sourceName, targetName, englishName }) =>
      (localeOption + sourceName + targetName + englishName)
        .toLowerCase()
        .includes(filterValue.toLowerCase())
  )

  // For each browser preference, reduce to the most specific match found in `locales` array
  const allBrowserLocales: Lang[] = navLangs
    .map(
      (navLang) =>
        locales?.reduce((acc, cur) => {
          if (cur.toLowerCase() === navLang) return cur
          if (navLang.includes(cur.toLowerCase()) && acc !== navLang) return cur
          return acc
        }, "") as Lang
    )
    .filter((i) => !!i) // Remove those without matches

  // Remove duplicate matches
  const browserLocales: Lang[] = Array.from(new Set(allBrowserLocales))

  // Get display info for each browser locale
  const browserLocalesInfo: LocaleDisplayInfo[] = browserLocales.map(
    (browserLocale) => {
      const item = displayNames.find(
        ({ localeOption }) => localeOption === browserLocale
      )
      if (!item)
        throw new Error("Missing browser locale info for " + browserLocale)
      return item
    }
  )

  return (
    <Menu
      isLazy
      initialFocusRef={inputRef}
      placement={placement}
      closeOnSelect={false}
    >
      {({ onClose }) => {
        const onMenuClose = () => {
          setFilterValue("")
          handleClose ? handleClose() : onClose()
        }
        return (
          <>
            {children}
            <MenuList
              position="relative"
              overflow="auto"
              borderRadius="base"
              py="0"
              {...props}
            >
              {/* Mobile Close bar */}
              <Flex
                justifyContent="end"
                hideFrom="md"
                position="sticky"
                zIndex="sticky"
                top="0"
                bg="background.base"
              >
                <Button
                  p="4"
                  variant="ghost"
                  alignSelf="end"
                  onClick={onMenuClose}
                  textTransform="uppercase"
                  fontSize="xs"
                >
                  Close
                </Button>
              </Flex>

              {/* Main Language selection menu */}
              <Box
                position="relative"
                w="100%"
                minH="calc(100% - 53px)" // Fill height with space for close button on mobile
                p="4"
                bg="background.highlight"
                sx={{ "[role=menuitem]": { py: "3", px: "2" } }}
              >
                {browserLocalesInfo.length > 0 && (
                  <>
                    <Text fontSize="xs" color="body.medium">
                      Browser{" "}
                      {browserLocalesInfo.length === 1
                        ? "language"
                        : "languages"}
                    </Text>
                    {browserLocalesInfo.map((displayInfo) => (
                      <MenuItem
                        key={`item-${displayInfo.localeOption}`}
                        displayInfo={displayInfo}
                        onClick={onMenuClose}
                      />
                    ))}
                    <MenuDivider borderColor="body.medium" my="4" mx="-2" />
                  </>
                )}

                <Text fontSize="xs" color="body.medium">
                  Filter list ({filteredNames.length} languages)
                </Text>
                <ChakraMenuItem
                  onFocus={() => inputRef.current?.focus()}
                  p="0"
                  bg="transparent"
                  position="relative"
                  closeOnSelect={false}
                >
                  <Input
                    placeholder="Type to filter"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    ref={inputRef}
                    h="8"
                    mt="1"
                    mb="2"
                    bg="background.base"
                    color="body.base"
                    onKeyDown={(e) => {
                      // Navigate to first result on enter
                      if (e.key === "Enter") {
                        e.preventDefault()
                        firstItemRef.current?.click()
                      }
                    }}
                  />
                </ChakraMenuItem>

                {filteredNames.map((displayInfo, index) => {
                  const firstResult = index === 0
                  return (
                    <MenuItem
                      key={"item-" + displayInfo.localeOption}
                      displayInfo={displayInfo}
                      ref={firstResult ? firstItemRef : null}
                      onClick={onMenuClose}
                    />
                  )
                })}

                {filteredNames.length === 0 && (
                  <NoResultsCallout onClose={onMenuClose} />
                )}
              </Box>

              {/* Footer callout */}
              <Flex
                borderTop="2px"
                borderColor="primary.base"
                bg="primary.lowContrast"
                p="3"
                position="sticky"
                bottom="0"
                justifyContent="center"
              >
                <Text fontSize="xs" textAlign="center" color="body.base">
                  Help us translate ethereum.org.{" "}
                  <BaseLink
                    href="/contributing/translation-program"
                    onClick={onMenuClose}
                  >
                    Learn more
                  </BaseLink>
                </Text>
              </Flex>
            </MenuList>
          </>
        )
      }}
    </Menu>
  )
}

export default LanguagePicker
