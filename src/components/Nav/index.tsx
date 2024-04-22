import { useRef } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdWbSunny } from "react-icons/md"
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  MenuButton,
  Text,
  useColorModeValue,
  useDisclosure,
  useEventListener,
} from "@chakra-ui/react"

import { IconButton } from "@/components/Buttons"
import { EthHomeIcon } from "@/components/icons"
import LanguagePicker from "@/components/LanguagePicker"
import { BaseLink } from "@/components/Link"
import Search from "@/components/Search"

import { DESKTOP_LANGUAGE_BUTTON_NAME, NAV_PY } from "@/lib/constants"

import Menu from "./Menu"
import MobileNavMenu from "./Mobile"
import { useNav } from "./useNav"

// TODO display page title on mobile
const Nav = () => {
  const { toggleColorMode, linkSections, mobileNavProps } = useNav()
  const { locale } = useRouter()
  const { t } = useTranslation("common")
  const searchModalDisclosure = useDisclosure()
  const navWrapperRef = useRef(null)
  const languagePickerState = useDisclosure()
  const languagePickerRef = useRef<HTMLButtonElement>(null)

  /**
   * Adds a keydown event listener to toggle color mode (ctrl|cmd + \)
   * or open the language picker (\).
   * @param {string} event - The keydown event.
   */
  useEventListener("keydown", (e) => {
    if (e.key !== "\\") return
    e.preventDefault()
    if (e.metaKey || e.ctrlKey) {
      toggleColorMode()
    } else {
      if (languagePickerState.isOpen) return
      languagePickerRef.current?.click()
    }
  })

  const ThemeIcon = useColorModeValue(<MdBrightness2 />, <MdWbSunny />)
  const themeIconAriaLabel = useColorModeValue(
    "Switch to Dark Theme",
    "Switch to Light Theme"
  )

  return (
    <Box position="sticky" top={0} zIndex="sticky" width="full">
      <Flex
        ref={navWrapperRef}
        as="nav"
        aria-label={t("nav-primary")}
        bg="background.base"
        borderBottom="1px"
        borderColor="rgba(0, 0, 0, 0.1)"
        height="4.75rem"
        justifyContent="center"
        py={NAV_PY}
        px={{ base: 4, xl: 8 }}
      >
        <Flex
          alignItems={{ base: "center", md: "normal" }}
          justifyContent={{ base: "space-between", md: "normal" }}
          width="full"
          maxW="container.2xl"
        >
          <BaseLink
            href="/"
            aria-label={t("home")}
            display="inline-flex"
            alignItems="center"
            textDecor="none"
          >
            <EthHomeIcon opacity={0.85} _hover={{ opacity: 1 }} />
          </BaseLink>
          {/* Desktop */}
          <Flex
            w="full"
            justifyContent={{ base: "flex-end", md: "space-between" }}
            ms={{ base: 3, xl: 8 }}
          >
            <Menu hideBelow="md" sections={linkSections} />
            <Flex alignItems="center" /*  justifyContent="space-between" */>
              <Search {...searchModalDisclosure} />
              {/* Desktop */}
              <HStack hideBelow="md" gap="0">
                <IconButton
                  transition="transform 0.5s, color 0.2s"
                  icon={ThemeIcon}
                  aria-label={themeIconAriaLabel}
                  variant="ghost"
                  isSecondary
                  px={{ base: "2", xl: "3" }}
                  _hover={{
                    transform: "rotate(10deg)",
                    color: "primary.hover",
                  }}
                  onClick={toggleColorMode}
                />

                {/* Locale-picker menu */}
                <LanguagePicker
                  placement="bottom-end"
                  minH="unset"
                  maxH="75vh"
                  w="xs"
                  inset="unset"
                  top="unset"
                  menuState={languagePickerState}
                >
                  <MenuButton
                    as={Button}
                    name={DESKTOP_LANGUAGE_BUTTON_NAME}
                    ref={languagePickerRef}
                    variant="ghost"
                    color="body.base"
                    transition="color 0.2s"
                    px={{ base: "2", xl: "3" }}
                    _hover={{
                      color: "primary.hover",
                      "& svg": {
                        transform: "rotate(10deg)",
                        transition: "transform 0.5s",
                      },
                    }}
                    _active={{
                      color: "primary.hover",
                      bg: "primary.lowContrast",
                    }}
                    sx={{
                      "& svg": {
                        transform: "rotate(0deg)",
                        transition: "transform 0.5s",
                      },
                    }}
                  >
                    <Icon
                      as={BsTranslate}
                      fontSize="2xl"
                      verticalAlign="middle"
                      me={2}
                    />
                    <Text hideBelow="lg" as="span">
                      {t("common:languages")}&nbsp;
                    </Text>
                    {locale!.toUpperCase()}
                  </MenuButton>
                </LanguagePicker>
              </HStack>
              {/* Mobile */}
              <MobileNavMenu
                {...mobileNavProps}
                linkSections={linkSections}
                hideFrom="md"
                toggleSearch={searchModalDisclosure.onOpen}
                drawerContainerRef={navWrapperRef}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Nav
