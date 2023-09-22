import React, { FC, useRef, useState } from "react"
import { Icon, Flex, Box, HStack, useDisclosure } from "@chakra-ui/react"
import { MdWbSunny, MdBrightness2, MdLanguage } from "react-icons/md"

import Menu from "./Menu"
import MobileNavMenu from "./Mobile"
import ButtonLink from "../ButtonLink"
import Link, { BaseLink } from "../Link"
import Search from "../Search"
import IconButton from "../IconButton"
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
    mobileNavProps,
  } = useNav({ path })
  const searchModalDisclosure = useDisclosure()

  const navWrapperRef = useRef(null)
  const [languagesHover, setLanguagesHover] = useState(false)

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
          <BaseLink
            to="/"
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
            justifyContent={{ base: "flex-end", lg: "space-between" }}
            ml={{ base: 3, xl: 8 }}
          >
            <Menu hideBelow="lg" path={path} sections={linkSections} />
            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap={{ base: 2, xl: 4 }}
            >
              <Search {...searchModalDisclosure} />
              {/* Mobile */}
              <MobileNavMenu
                {...mobileNavProps}
                hideFrom="lg"
                toggleSearch={searchModalDisclosure.onOpen}
                drawerContainerRef={navWrapperRef}
              />
              <HStack spacing={2} hideBelow="lg">
                <IconButton
                  transition="transform 0.5s, color 0.2s"
                  icon={isDarkTheme ? <MdWbSunny /> : <MdBrightness2 />}
                  aria-label={
                    isDarkTheme
                      ? "Switch to Light Theme"
                      : "Switch to Dark Theme"
                  }
                  variant="ghost"
                  isSecondary
                  px={1.5}
                  _hover={{
                    transform: "rotate(10deg)", // Rotate the icon to 30 degrees on hover
                    color: "primary.hover",
                  }}
                  onClick={toggleColorMode}
                ></IconButton>

                <ButtonLink
                  onMouseOver={() => setLanguagesHover(true)}
                  onMouseOut={() => setLanguagesHover(false)}
                  to={`/languages/${fromPageParameter}`}
                  variant="ghost"
                  isSecondary
                  px={1.5}
                  _hover={{
                    color: "primary.hover",
                  }}
                >
                  <Box mr={2} mt={2}>
                    <Icon
                      as={MdLanguage}
                      transition="transform 0.3s ease-in-out, color 0.2s"
                      // _groupHover renders "[data-group]:hover &"
                      _groupHover={{
                        transform: "rotate(10deg)",
                      }}
                    />
                  </Box>
                  <span>Languages {i18n.language.toUpperCase()}</span>
                </ButtonLink>
              </HStack>
            </Flex>
          </Flex>
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
            <BaseLink
              key={idx}
              to={link.to}
              isPartiallyActive={link.isPartiallyActive}
              color="text"
              fontWeight="normal"
              textDecor="none"
              mr={8}
              _hover={{
                color: "primary.base",
                svg: {
                  fill: "currentColor",
                },
              }}
              _visited={{}}
              sx={{
                svg: {
                  fill: "currentColor",
                },
              }}
            >
              {link.text}
            </BaseLink>
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default Nav
