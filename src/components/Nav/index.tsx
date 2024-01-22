import { useRef } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdBrightness2, MdLanguage, MdWbSunny } from "react-icons/md"
import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"

import { ButtonLink, IconButton } from "../Buttons"
import { EthHomeIcon } from "../icons"
import { BaseLink } from "../Link"
import Search from "../Search"

import Menu from "./Menu"
import MobileNavMenu from "./Mobile"
import { useNav } from "./useNav"

// TODO display page title on mobile
const Nav = () => {
  const { fromPageParameter, toggleColorMode, linkSections, mobileNavProps } =
    useNav()

  const { locale } = useRouter()
  const { t } = useTranslation("common")
  const searchModalDisclosure = useDisclosure()
  const navWrapperRef = useRef(null)

  const themeIcon = useColorModeValue(<MdBrightness2 />, <MdWbSunny />)
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
        py={4}
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
            <Flex alignItems="center" justifyContent="space-between">
              <Search {...searchModalDisclosure} />
              {/* Desktop */}
              <HStack spacing={2} hideBelow="md" ms="2">
                <IconButton
                  transition="transform 0.5s, color 0.2s"
                  icon={themeIcon}
                  aria-label={themeIconAriaLabel}
                  variant="ghost"
                  isSecondary
                  px={1.5}
                  _hover={{
                    transform: "rotate(10deg)",
                    color: "primary.hover",
                  }}
                  onClick={toggleColorMode}
                />
                <ButtonLink
                  href={`/languages/${fromPageParameter}`}
                  transition="color 0.2s"
                  leftIcon={<Icon as={MdLanguage} />}
                  variant="ghost"
                  isSecondary
                  px={1.5}
                  _hover={{
                    color: "primary.hover",
                    "& svg": {
                      transform: "rotate(10deg)",
                      transition: "transform 0.5s",
                    },
                  }}
                >
                  {t("languages")} {locale!.toUpperCase()}
                </ButtonLink>
              </HStack>
              {/* Mobile */}
              <MobileNavMenu
                ms={{ base: 2, lg: 4 }}
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
