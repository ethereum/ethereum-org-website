import React, { FC, useRef } from "react"
import { Icon, IconButton, Flex, Text, Box } from "@chakra-ui/react"
import { MdWbSunny, MdBrightness2, MdLanguage } from "react-icons/md"

import Menu from "./Menu"
import MobileNavMenu from "./Mobile"
import ButtonLink from "../ButtonLink"
import Link from "../Link"
import Search from "../Search"
import { EthHomeIcon } from "../icons"
import { useNav } from "./useNav"

export interface IProps {
  path: string
}

// TODO display page title on mobile
const Nav: FC<IProps> = ({ path }) => {
  const {
    ednLinks,
    fromPageParameter,
    i18n,
    isDarkTheme,
    shouldShowSubNav,
    t,
    toggleColorMode,
    linkSections,
    searchRef,
    mobileNavProps,
  } = useNav({ path })

  const navWrapperRef = useRef(null)

  return (
    <Box position="sticky" top={0} zIndex={100} width="full">
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
          alignItems={{ base: "center", lg: "normal" }}
          justifyContent={{ base: "space-between", lg: "normal" }}
          width="full"
          maxW="container.2xl"
        >
          <Link
            to="/"
            aria-label={t("home")}
            display="inline-flex"
            alignItems="center"
            textDecor="none"
          >
            <EthHomeIcon opacity={0.85} _hover={{ opacity: 1 }} />
          </Link>
          {/* Desktop */}
          <Flex
            justifyContent="space-between"
            w="100%"
            display={{ base: "none", lg: "flex" }}
            ml={{ base: 3, xl: 8 }}
          >
            <Menu path={path} sections={linkSections} />
            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap={{ base: 1, xl: 0 }}
            >
              <Search ref={searchRef} />
              <IconButton
                aria-label={
                  isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"
                }
                icon={<Icon as={isDarkTheme ? MdWbSunny : MdBrightness2} />}
                variant="icon"
                size="sm"
                fontSize="2xl"
                ms={{ xl: 2 }}
                _hover={{ color: "primary.base" }}
                onClick={toggleColorMode}
              />
              <ButtonLink
                to={`/languages/${fromPageParameter}`}
                variant="icon"
                px={{ base: 1, xl: 1.5 }}
                size="sm"
                fontSize="md"
              >
                <Icon as={MdLanguage} fontSize="2xl" />
                <Text as="span" pl={2}>
                  <Box as="span" hideBelow="lg">
                    {t("languages")}
                  </Box>{" "}
                  {i18n.language.toUpperCase()}
                </Text>
              </ButtonLink>
            </Flex>
          </Flex>
          {/* Mobile */}
          <MobileNavMenu
            {...mobileNavProps}
            drawerContainerRef={navWrapperRef}
          />
        </Flex>
      </Flex>
      {shouldShowSubNav && (
        <Flex
          as="nav"
          aria-label={t("nav-developers")}
          display={{ base: "none", lg: "flex" }}
          bg="ednBackground"
          borderBottom="1px"
          borderColor="border"
          boxSizing="border-box"
          py={4}
          px={8}
        >
          {ednLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              isPartiallyActive={link.isPartiallyActive}
              color="text"
              textDecor="none"
              mr={8}
              _hover={{
                color: "primary.base",
                svg: {
                  fill: "currentColor",
                },
              }}
              sx={{
                svg: {
                  fill: "currentColor",
                },
              }}
            >
              {link.text}
            </Link>
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default Nav
