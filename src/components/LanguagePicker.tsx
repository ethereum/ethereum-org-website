import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {
  Box,
  Flex,
  forwardRef,
  Input,
  Menu,
  MenuDivider,
  MenuItem,
  type MenuItemProps,
  MenuList,
  type MenuListProps,
  type MenuProps,
  Progress as ChakraProgress,
  ProgressProps,
  Text,
} from "@chakra-ui/react"

import type { Lang, LocaleDisplayInfo } from "@/lib/types"

import { BaseLink, type LinkProps } from "@/components/Link"

import progressData from "@/data/translationProgress.json"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { Button } from "./Buttons"

import i18nConfig from "@/../i18n.config.json"

type ItemProps = MenuItemProps & Pick<LinkProps, "href" | "locale" | "onClick">

const Item = forwardRef(({ onClick, ...props }: ItemProps, ref) => (
  <MenuItem
    as={BaseLink}
    ref={ref}
    flexDir="column"
    w="full"
    mb="1"
    onClick={onClick}
    alignItems="start"
    borderRadius="base"
    bg="transparent"
    color="body.base"
    textDecoration="none"
    data-group
    onFocus={(e) => {
      e.target.scrollIntoView({ block: "nearest" })
    }}
    scrollMarginY="16"
    _hover={{ bg: "primary.lowContrast", textDecoration: "none" }}
    _focus={{ bg: "primary.lowContrast" }}
    sx={{
      p: {
        textDecoration: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    }}
    {...props}
  />
))

const Progress = ({ value }: Pick<ProgressProps, "value">) => (
  <ChakraProgress
    value={value}
    h="0.5"
    w="full"
    bg="body.light"
    _groupHover={{
      "[role=progressbar]": {
        backgroundColor: "primary.highContrast",
      },
    }}
    sx={{
      "[role=progressbar]": {
        backgroundColor: "body.medium",
      },
    }}
  />
)

type NoResultsCalloutProps = { onMenuClose: () => void }
const NoResultsCallout = ({ onMenuClose }: NoResultsCalloutProps) => {
  const { t } = useTranslation("page-languages")
  return (
    <Box>
      <Text fontWeight="bold" mb="2">
        {t("page-languages-want-more-header")}
      </Text>
      {t("page-languages-want-more-paragraph")}{" "}
      <BaseLink
        as={MenuItem}
        key="item-no-results"
        href="contributing/translation-program"
        onClick={onMenuClose}
      >
        {t("page-languages-want-more-link")}
      </BaseLink>
    </Box>
  )
}

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
  const { asPath, locale, locales } = router
  const inputRef = useRef<HTMLInputElement>(null)
  const firstItemRef = useRef<HTMLAnchorElement>(null)
  const [filterValue, setFilterValue] = useState("")

  if (!(progressData?.length > 0))
    throw new Error("Missing translation progress data; check GitHub action")

  const totalWords = progressData[0].words.total

  const localeToDisplayInfo = (localeOption: string): LocaleDisplayInfo => {
    const i18nConfigItem = i18nConfig.find(({ code }) => localeOption === code)
    if (!i18nConfigItem)
      throw new Error("Missing i18n config for " + localeOption)

    const englishName = i18nConfigItem.name

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
        i18nConfigItem.crowdinCode.toLowerCase() === languageId.toLowerCase()
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

  // Get the preferred language for the users browser
  const [navLang, setNavLang] = useState("")
  useEffect(() => {
    setNavLang(navigator.language.toLowerCase())
  }, [])
  const browserLocale = locales?.reduce((acc, cur) => {
    if (cur.toLowerCase() === navLang) return cur
    if (navLang.includes(cur.toLowerCase()) && acc !== navLang) return cur
    return acc
  }, "")
  const browserLocaleInfo = displayNames.find(
    ({ localeOption }) => localeOption === browserLocale
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
                {browserLocaleInfo && (
                  <>
                    <Text fontSize="xs" color="body.medium">
                      Browser language
                    </Text>
                    <Item
                      key={`item-${browserLocale}`}
                      href={asPath}
                      locale={browserLocale as Lang}
                      onClick={onMenuClose}
                    >
                      <Text fontSize="lg" color="primary.base">
                        {browserLocaleInfo.targetName}
                      </Text>
                      <Text
                        textTransform="uppercase"
                        fontSize="xs"
                        color="body.medium"
                      >
                        {browserLocaleInfo.sourceName}
                      </Text>
                      <Progress value={browserLocaleInfo.approvalProgress} />
                    </Item>
                    <MenuDivider borderColor="body.medium" my="4" mx="-2" />
                  </>
                )}

                <Text fontSize="xs" color="body.medium">
                  Filter list ({filteredNames.length} languages)
                </Text>
                <MenuItem
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
                </MenuItem>

                {filteredNames.map(
                  (
                    {
                      localeOption,
                      sourceName,
                      targetName,
                      approvalProgress,
                      wordsApproved,
                    },
                    index
                  ) => {
                    const firstResult = index === 0
                    const percentage = new Intl.NumberFormat(locale!, {
                      style: "percent",
                    }).format(approvalProgress / 100)
                    const progress =
                      approvalProgress === 0
                        ? "<" + percentage.replace("0", "1")
                        : percentage
                    const words = new Intl.NumberFormat(locale!).format(
                      wordsApproved
                    )
                    return (
                      <Item
                        key={"item-" + localeOption}
                        href={asPath}
                        locale={localeOption}
                        ref={firstResult ? firstItemRef : null}
                        onClick={onMenuClose}
                      >
                        <Text fontSize="lg" color="primary.base">
                          {targetName}
                        </Text>
                        <Text
                          textTransform="uppercase"
                          fontSize="sm"
                          color="body.base"
                          maxW="full"
                        >
                          {sourceName}
                        </Text>
                        <Text
                          textTransform="lowercase"
                          fontSize="xs"
                          color="body.medium"
                          maxW="full"
                        >
                          {progress} translated • {words} words
                        </Text>
                        <Progress value={approvalProgress} />
                      </Item>
                    )
                  }
                )}

                {filteredNames.length === 0 && (
                  <NoResultsCallout onMenuClose={onMenuClose} />
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
