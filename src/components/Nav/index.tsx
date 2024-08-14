import { lazy, Suspense, useRef } from "react"
import { useTranslation } from "next-i18next"
import { Box, Flex, Hide, Show } from "@chakra-ui/react"

import { EthHomeIcon } from "@/components/icons"
import { BaseLink } from "@/components/Link"
import Search from "@/components/Search"

import { isDesktop } from "@/lib/utils/isDesktop"

import { NAV_PY } from "@/lib/constants"

import DesktopNavMenu from "./Desktop"
import Menu from "./Menu"
import { useNav } from "./useNav"

import { useDisclosure } from "@/hooks/useDisclosure"
import { useIsClient } from "@/hooks/useIsClient"

const MobileNavMenu = lazy(() => import("./Mobile"))

// TODO display page title on mobile
const Nav = () => {
  const { toggleColorMode, linkSections } = useNav()
  const { t } = useTranslation("common")
  const searchModalDisclosure = useDisclosure()
  const navWrapperRef = useRef(null)
  const isClient = useIsClient()
  const isDesktopFlag = isDesktop()

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
            {/* avoid rendering desktop Menu version on mobile */}

            {isClient && isDesktopFlag ? (
              <Menu className="hidden md:block" sections={linkSections} />
            ) : (
              <Box />
            )}

            <Flex alignItems="center" /*  justifyContent="space-between" */>
              {/* Desktop */}
              {/* avoid rendering desktop menu version on mobile */}
              <Show above="md">
                <Search {...searchModalDisclosure} />
                <DesktopNavMenu toggleColorMode={toggleColorMode} />
              </Show>

              <Hide above="md">
                {/* Mobile */}
                {/* use Suspense to display the Search & the Menu at the same time */}
                <Suspense>
                  <Search {...searchModalDisclosure} />
                  <MobileNavMenu
                    toggleColorMode={toggleColorMode}
                    linkSections={linkSections}
                    toggleSearch={searchModalDisclosure.onOpen}
                  />
                </Suspense>
              </Hide>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Nav
