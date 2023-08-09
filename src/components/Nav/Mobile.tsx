import React, { Fragment, ReactNode, RefObject } from "react"
import {
  Box,
  IconButton,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  List,
  ListItem,
  forwardRef,
  DrawerFooter,
  Flex,
} from "@chakra-ui/react"
import { MdBrightness2, MdLanguage, MdSearch, MdWbSunny } from "react-icons/md"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { motion } from "framer-motion"

import Link from "../Link"
import Translation from "../Translation"

import { ISections } from "./types"
import { ChildOnlyProp } from "../../types"
import { SearchIconButton } from "../Search"

const NavListItem = forwardRef<{ "aria-label"?: string }, typeof List>(
  (props, ref) => <ListItem ref={ref} mb={12} {...props} />
)

const SectionItem = forwardRef<ChildOnlyProp, typeof ListItem>((props, ref) => (
  <ListItem ref={ref} mb={4} opacity={0.7} _hover={{ opacity: 1 }} {...props} />
))

const StyledNavLink = (props: {
  to: string
  isPartiallyActive: boolean
  children: ReactNode
}) => (
  <Link
    color="currentColor"
    textDecor="none"
    _hover={{
      color: "primary.base",
    }}
    {...props}
  />
)

const FooterItem = forwardRef<ChildOnlyProp, "div">((props, ref) => (
  <Flex
    ref={ref}
    flex="1 1 120px"
    alignItems="center"
    color="text"
    cursor="pointer"
    flexDir="column"
    _hover={{
      color: "primary.base",
      "& svg": {
        fill: "currentColor",
      },
    }}
    sx={{
      "& svg": {
        fill: "currentColor",
        fontSize: "2xl",
      },
    }}
    {...props}
  />
))

const FooterItemText = (props: ChildOnlyProp) => (
  <Box
    fontSize="sm"
    lineHeight={1.6}
    fontWeight={400}
    letterSpacing="0.04em"
    mt={2}
    textTransform="uppercase"
    textAlign="center"
    opacity={0.7}
    _hover={{ opacity: 1 }}
    {...props}
  />
)

const hamburgerSvg =
  "M 2 13 l 10 0 l 0 0 l 10 0 M 4 19 l 8 0 M 12 19 l 8 0 M 2 25 l 10 0 l 0 0 l 10 0"
const glyphSvg =
  "M 2 19 l 10 -14 l 0 0 l 10 14 M 2 19 l 10 7 M 12 26 l 10 -7 M 2 22 l 10 15 l 0 0 l 10 -15"
const closeSvg =
  "M 2 13 l 0 -3 l 20 0 l 0 3 M 7 14 l 10 10 M 7 24 l 10 -10 M 2 25 l 0 3 l 20 0 l 0 -3"

const glyphPathVariants = {
  closed: {
    d: hamburgerSvg,
    transition: { duration: 0.4 },
  },
  open: {
    d: [hamburgerSvg, glyphSvg, glyphSvg, glyphSvg, closeSvg],
    transition: { duration: 1.2 },
  },
}

export interface IProps {
  isMenuOpen: boolean
  isDarkTheme: boolean
  toggleMenu: () => void
  toggleTheme: () => void
  toggleSearch: () => void
  linkSections: ISections
  fromPageParameter: string
  drawerContainerRef: RefObject<HTMLElement | null>
}

const MobileNavMenu: React.FC<IProps> = ({
  isMenuOpen,
  isDarkTheme,
  toggleMenu,
  toggleTheme,
  toggleSearch,
  linkSections,
  fromPageParameter,
  drawerContainerRef,
}) => {
  const { t } = useTranslation()

  const handleClick = (): void => {
    toggleMenu()
  }

  return (
    <Box
      display={{ base: "flex", lg: "none" }}
      gap={2}
      sx={{ svg: { fill: "body.base" } }}
    >
      <SearchIconButton
        onClick={toggleSearch}
        aria-label={t("aria-toggle-search-button")}
        size="sm"
      />
      <IconButton
        icon={
          <Icon
            viewBox="0 0 24 40"
            pointerEvents={isMenuOpen ? "none" : "auto"}
            mx={0.5}
            width={6}
            height={10}
            position="relative"
            strokeWidth="2px"
            zIndex={100}
            _hover={{
              color: "primary.base",
              "& > path": {
                stroke: "primary.base",
              },
            }}
            sx={{
              "& > path": {
                stroke: "text",
                fill: "none",
              },
            }}
          >
            <motion.path
              variants={glyphPathVariants}
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
            />
          </Icon>
        }
        onClick={toggleMenu}
        aria-label={t("aria-toggle-search-button")}
        variant="icon"
        size="sm"
        zIndex={2000}
        _hover={{ svg: { fill: "primary.base" } }}
      />
      <Drawer
        portalProps={{ containerRef: drawerContainerRef }}
        isOpen={isMenuOpen}
        onClose={handleClick}
        placement="left"
        size="sm"
      >
        <DrawerOverlay bg="modalBackground" />
        <DrawerContent bg="background.base">
          <DrawerBody pt={12} pb={24} px={4}>
            <List m={0}>
              {Object.keys(linkSections).map((sectionKey, idx) => {
                const section = linkSections[sectionKey]

                return section.items ? (
                  <NavListItem key={idx} aria-label={`Select ${section.text}`}>
                    <Box color="text" my={4} fontSize="1.3rem">
                      {section.text}
                    </Box>
                    <List m={0}>
                      {section.items.map((item, idx) =>
                        item.items ? (
                          <Fragment key={idx}>
                            <Box
                              mt={8}
                              mb={4}
                              fontSize="0.9rem"
                              lineHeight={1}
                              color="currentColor"
                            >
                              {item.text}
                            </Box>
                            {item.items.map((item, idx) => (
                              <SectionItem key={idx} onClick={handleClick}>
                                <StyledNavLink
                                  to={item.to}
                                  isPartiallyActive={item.isPartiallyActive}
                                >
                                  {item.text}
                                </StyledNavLink>
                              </SectionItem>
                            ))}
                          </Fragment>
                        ) : (
                          <SectionItem key={idx} onClick={handleClick}>
                            <StyledNavLink
                              to={item.to}
                              isPartiallyActive={item.isPartiallyActive}
                            >
                              {item.text}
                            </StyledNavLink>
                          </SectionItem>
                        )
                      )}
                    </List>
                  </NavListItem>
                ) : (
                  <NavListItem key={idx} onClick={handleClick}>
                    <StyledNavLink
                      to={section.to}
                      isPartiallyActive={section.isPartiallyActive}
                    >
                      {section.text}
                    </StyledNavLink>
                  </NavListItem>
                )
              })}
            </List>
          </DrawerBody>
          <DrawerFooter
            bg="background.base"
            borderTop="1px"
            borderColor="lightBorder"
            justifyContent="space-between"
            height="108px"
            px={4}
            py={0}
            mt="auto"
          >
            <FooterItem
              onClick={() => {
                // Workaround to ensure the input for the search modal can have focus
                toggleMenu()
                toggleSearch()
              }}
            >
              <Icon as={MdSearch} />
              <FooterItemText>
                <Translation id="search" />
              </FooterItemText>
            </FooterItem>
            <FooterItem onClick={toggleTheme}>
              <Icon as={isDarkTheme ? MdWbSunny : MdBrightness2} />
              <FooterItemText>
                <Translation id={isDarkTheme ? "light-mode" : "dark-mode"} />
              </FooterItemText>
            </FooterItem>
            <FooterItem onClick={handleClick}>
              <Flex
                as={Link}
                to={`/languages/${fromPageParameter}`}
                alignItems="center"
                color="text"
                flexDir="column"
                textDecor="none"
                _hover={{
                  color: "primary.base",
                  textDecor: "none",
                }}
              >
                <Icon as={MdLanguage} />
                <FooterItemText>
                  <Translation id="languages" />
                </FooterItemText>
              </Flex>
            </FooterItem>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default MobileNavMenu
