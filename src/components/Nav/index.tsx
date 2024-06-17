import { lazy, Suspense, useRef } from "react"
import { useTranslation } from "next-i18next"
import { Box, Flex, Show, useDisclosure } from "@chakra-ui/react"

import { EthHomeIcon } from "@/components/icons"
import { BaseLink } from "@/components/Link"
import Search from "@/components/Search"

import { isMobile } from "@/lib/utils/isMobile"

import { NAV_PY } from "@/lib/constants"

import DesktopNavMenu from "./Desktop"
import Menu from "./Menu"
import { useNav } from "./useNav"

const MobileNavMenu = lazy(() => import("./Mobile"))

// TODO display page title on mobile
const Nav = () => {
  const { toggleColorMode, linkSections, mobileNavProps } = useNav()
  const { t } = useTranslation("common")
  const isDesktop = !isMobile()
  const searchModalDisclosure = useDisclosure()
  const navWrapperRef = useRef(null)

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
            {isDesktop && <Menu hideBelow="md" sections={linkSections} />}

            <Flex alignItems="center" /*  justifyContent="space-between" */>
              {/* Desktop */}
              {/* avoid rendering desktop menu version on mobile */}
              <Show above="md">
                <Search {...searchModalDisclosure} />
                <DesktopNavMenu toggleColorMode={toggleColorMode} />
              </Show>

              <Show below="md">
                {/* Mobile */}
                {/* use Suspense to display the Search & the Meny at the same time */}
                <Suspense>
                  <Search {...searchModalDisclosure} />
                  <MobileNavMenu
                    {...mobileNavProps}
                    linkSections={linkSections}
                    toggleSearch={searchModalDisclosure.onOpen}
                    drawerContainerRef={navWrapperRef}
                  />
                </Suspense>
              </Show>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Nav
