import React, { Fragment, ReactNode, RefObject } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import { IconType } from "react-icons"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdSearch, MdWbSunny } from "react-icons/md"
import {
  Box,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  forwardRef,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  MenuButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"

import LanguagePicker from "@/components/LanguagePicker"

import type { ChildOnlyProp } from "../../lib/types"
import { Button } from "../Buttons"
import { BaseLink } from "../Link"

import { ISections } from "./types"

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
  <BaseLink
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

type FooterButtonProps = ButtonProps & {
  icon: IconType
}

const FooterButton = ({ icon, ...props }: FooterButtonProps) => (
  <Button
    leftIcon={<Icon as={icon} />}
    sx={{ span: { m: 0 } }}
    variant="ghost"
    flexDir="column"
    alignItems="center"
    color="body.base"
    px="1"
    {...props}
  />
)

const FooterItemText = (props: ChildOnlyProp) => (
  <Text
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

const hamburgerVariants = {
  closed: { d: hamburgerSvg, transition: { duration: 0.25 } },
  open: { d: glyphSvg, transition: { duration: 0.25 } },
}

type HamburgerProps = ButtonProps & {
  isMenuOpen: boolean
  onToggle: () => void
}

const HamburgerButton = ({
  isMenuOpen,
  onToggle,
  ...props
}: HamburgerProps) => {
  const { t } = useTranslation("common")
  return (
    <IconButton
      onClick={onToggle}
      aria-label={t("aria-toggle-search-button")}
      variant="ghost"
      isSecondary
      px={0}
      color="body.base"
      icon={
        <Icon
          viewBox="0 0 24 40"
          pointerEvents={isMenuOpen ? "none" : "auto"}
          mx={0.5}
          width={6}
          height={10}
          position="relative"
          strokeWidth="2px"
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
            variants={hamburgerVariants}
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
          />
        </Icon>
      }
      {...props}
    />
  )
}

type CloseButtonProps = ButtonProps & {
  onToggle: () => void
}

const CloseButton = ({ onToggle, ...props }: CloseButtonProps) => {
  const { t } = useTranslation("common")
  return (
    <IconButton
      onClick={onToggle}
      aria-label={t("aria-toggle-search-button")}
      variant="ghost"
      isSecondary
      px={0}
      color="menu.lvl1.main"
      icon={
        <Icon
          viewBox="0 0 24 24"
          width={6}
          height={6}
          position="relative"
          strokeWidth="2px"
          display="inline-block"
          stroke="currentColor"
        >
          <path d="M 2 4 l 0 -3 l 20 0 l 0 3" />
          <path d="M 7 15 l 10 -10 " />
          <path d="M 7 5 l 10 10" />
          <path d="M 2 16 l 0 3 l 20 0 l 0 -3" />
        </Icon>
      }
      {...props}
    />
  )
}

export type MobileNavMenuProps = ButtonProps & {
  isMenuOpen: boolean
  isDarkTheme: boolean
  toggleMenu: () => void
  toggleTheme: () => void
  toggleSearch: () => void
  linkSections: ISections
  fromPageParameter: string
  drawerContainerRef: RefObject<HTMLElement | null>
}

const MobileNavMenu = ({
  isMenuOpen,
  isDarkTheme,
  toggleMenu: onToggle,
  toggleTheme,
  toggleSearch,
  linkSections,
  fromPageParameter,
  drawerContainerRef,
  ...props
}: MobileNavMenuProps) => {
  const { t } = useTranslation("common")

  const ThemeIcon = useColorModeValue(MdBrightness2, MdWbSunny)
  const themeLabelKey = useColorModeValue("dark-mode", "light-mode")

  return (
    <>
      <HamburgerButton isMenuOpen={isMenuOpen} onToggle={onToggle} {...props} />
      <Drawer
        portalProps={{ containerRef: drawerContainerRef }}
        isOpen={isMenuOpen}
        onClose={onToggle}
        placement="start"
        size="sm"
      >
        <DrawerOverlay bg="modalBackground" />
        <DrawerContent bg="background.base">
          <DrawerCloseButton fontSize="md" w="fit-content" px="2" m="2">
            {t("close")}
          </DrawerCloseButton>
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
                              <SectionItem key={idx} onClick={onToggle}>
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
                          <SectionItem key={idx} onClick={onToggle}>
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
                  <NavListItem key={idx} onClick={onToggle}>
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
            <Grid templateColumns="repeat(3, 1fr)" w="full">
              <FooterButton
                icon={MdSearch}
                onClick={() => {
                  // Workaround to ensure the input for the search modal can have focus
                  onToggle()
                  toggleSearch()
                }}
              >
                <FooterItemText>{t("search")}</FooterItemText>
              </FooterButton>
              <FooterButton icon={ThemeIcon} onClick={toggleTheme}>
                <FooterItemText>{t(themeLabelKey)}</FooterItemText>
              </FooterButton>
              <LanguagePicker
                hideFrom="lg" // TODO: Confirm breakpoint after nav-menu PR merged
                position="fixed"
                w="calc(100vw - var(--eth-sizes-8))"
                inset="4"
                handleClose={onToggle}
                _before={{
                  content: '""',
                  position: "fixed",
                  inset: 0,
                  bg: "black",
                  opacity: 0.4,
                }} // TODO: Replace with overlay component
              >
                <MenuButton as={FooterButton} icon={BsTranslate}>
                  <FooterItemText>{t("languages")}</FooterItemText>
                </MenuButton>
              </LanguagePicker>
            </Grid>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileNavMenu
