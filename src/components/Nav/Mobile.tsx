import { RefObject } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import { MdBrightness2, MdLanguage, MdSearch, MdWbSunny } from "react-icons/md"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  forwardRef,
  Heading,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"

import { Button } from "@/components/Buttons"
import { BaseLink } from "@/components/Link"

import { SECTION_LABELS } from "@/lib/constants"

import type { NavSections } from "./types"

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

const expandedPathVariants = {
  closed: {
    d: "M12 7.875V17.125",
    transition: { duration: 0.1 },
  },
  open: {
    d: "M12 12V12",
    transition: { duration: 0.1 },
  },
}

const OpenCloseIcon = ({ isOpen }: { isOpen: boolean }) => (
  <Icon
    viewBox="0 0 24 25"
    width={6}
    height={6}
    position="relative"
    strokeWidth="2px"
    display="inline-block"
    stroke="currentColor"
  >
    <motion.path
      variants={expandedPathVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      d="M12 7.875V17.125"
      stroke-width="2"
    />
    <path d="M7.375 12.5L16.625 12.5" stroke-width="2" />
  </Icon>
)

type HamburgerProps = ButtonProps & {
  isMenuOpen: boolean
  onToggle: () => void
}
const Hamburger = ({ isMenuOpen, onToggle, ...props }: HamburgerProps) => {
  const { t } = useTranslation("common")
  return (
    <Button
      onClick={onToggle}
      aria-label={t("aria-toggle-search-button")}
      variant="ghost"
      isSecondary
      px={0}
      {...props}
    >
      <Icon
        viewBox="0 0 24 40"
        pointerEvents={isMenuOpen ? "none" : "auto"}
        mx={0.5}
        width={6}
        height={10}
        position="relative"
        strokeWidth="2px"
        // zIndex={100}
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
    </Button>
  )
}
export type MobileNavMenuProps = ButtonProps & {
  isOpen: boolean
  onToggle: () => void
  toggleColorMode: () => void
  toggleSearch: () => void
  linkSections: NavSections
  fromPageParameter: string
  drawerContainerRef: RefObject<HTMLElement | null>
}

const MobileNavMenu = ({
  isOpen: isMenuOpen,
  onToggle,
  toggleColorMode: toggleTheme,
  toggleSearch,
  linkSections,
  fromPageParameter,
  drawerContainerRef,
  ...props
}: MobileNavMenuProps) => {
  const { t } = useTranslation("common")
  const themeIcon = useColorModeValue(MdBrightness2, MdWbSunny)
  const themeLabelKey = useColorModeValue("dark-mode", "light-mode")

  return (
    <>
      <Hamburger isMenuOpen={isMenuOpen} onToggle={onToggle} {...props} />

      {/* DRAWER MENU */}
      <Drawer
        portalProps={{ containerRef: drawerContainerRef }}
        isOpen={isMenuOpen}
        onClose={onToggle}
        placement="start"
        size="md"
      >
        <DrawerOverlay bg="modalBackground" />
        <DrawerContent bg="background.base">
          <Flex
            pt="4"
            pb="2"
            px="5"
            alignItems="center"
            justify="space-between"
          >
            <DrawerHeader
              fontWeight="regular"
              fontSize="md"
              color="body.medium"
              textTransform="uppercase"
              p="0"
            >
              Ethereum.org
            </DrawerHeader>
            <IconButton
              size="6"
              icon={<Hamburger isMenuOpen onToggle={onToggle} p="0" />}
              aria-label={t("aria-toggle-search-button")}
              variant="ghost"
              w="fit-content"
              p="0"
            />
          </Flex>

          {/* MAIN NAV CONTENTS OF MOBILE MENU */}
          <DrawerBody as="nav" px="0">
            <Accordion allowToggle>
              {SECTION_LABELS.map((key) => {
                const { label, ariaLabel, items } = linkSections[key]
                return (
                  <AccordionItem key={label}>
                    {({ isExpanded }) => (
                      <>
                        <Heading
                          as="h2"
                          color="menu.lvl1.main"
                          bg={
                            isExpanded
                              ? "menu.lvl1.background"
                              : "background.base"
                          }
                          py="4"
                        >
                          <AccordionButton
                            justifyContent="start"
                            gap="2"
                            _hover={{ bg: "none" }}
                          >
                            <OpenCloseIcon isOpen={isExpanded} />
                            <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              fontWeight="bold"
                              fontSize="lg"
                            >
                              {label}
                            </Box>
                          </AccordionButton>
                        </Heading>

                        {/* LVL2 */}
                        <AccordionPanel p="0" bg="menu.lvl2.background">
                          <Accordion allowToggle>
                            {items.map(
                              (
                                {
                                  label: lvl2Label,
                                  description: lvl2Description,
                                  ...lvl2Action
                                },
                                idx
                              ) => (
                                <AccordionItem key={lvl2Label}>
                                  {"href" in lvl2Action ? (
                                    <Button
                                      as={BaseLink}
                                      w="full"
                                      href={lvl2Action.href}
                                      onClick={onToggle}
                                      variant="ghost"
                                      borderRadius="none"
                                      justifyContent="start"
                                      gap="2"
                                      _hover={{
                                        color: "menu.highlight",
                                      }}
                                    >
                                      <Box flex="1" textAlign="left" ps={12}>
                                        <Text
                                          fontWeight="bold"
                                          fontSize="md"
                                          color="menu.lvl2.main"
                                        >
                                          {lvl2Label}
                                        </Text>
                                        <Text
                                          fontWeight="regular"
                                          fontSize="sm"
                                          color="menu.lvl2.subtext"
                                        >
                                          {lvl2Description}
                                        </Text>
                                      </Box>
                                    </Button>
                                  ) : (
                                    <AccordionItem>
                                      {({ isExpanded }) => (
                                        <>
                                          <Heading
                                            as="h3"
                                            color="menu.lvl2.main"
                                            py="4"
                                            px="4"
                                          >
                                            <AccordionButton
                                              justifyContent="start"
                                              gap="2"
                                              _hover={{ bg: "none" }}
                                            >
                                              <OpenCloseIcon
                                                isOpen={isExpanded}
                                              />
                                              <Box flex="1" textAlign="left">
                                                <Text
                                                  fontWeight="bold"
                                                  fontSize="md"
                                                  color="menu.lvl2.main"
                                                >
                                                  {lvl2Label}
                                                </Text>
                                                <Text
                                                  fontWeight="regular"
                                                  fontSize="sm"
                                                  color="menu.lvl2.subtext"
                                                >
                                                  {lvl2Description}
                                                </Text>
                                              </Box>
                                            </AccordionButton>
                                          </Heading>

                                          {/* LVL3 */}
                                          <AccordionPanel
                                            p="0"
                                            bg="menu.lvl3.background"
                                          >
                                            <Accordion allowToggle>
                                              {lvl2Action.items.map(
                                                (
                                                  {
                                                    label: lvl3Label,
                                                    description:
                                                      lvl3Description,
                                                    ...lvl3Action
                                                  },
                                                  idx
                                                ) => (
                                                  <AccordionItem
                                                    key={lvl3Label}
                                                  >
                                                    {"href" in lvl3Action ? (
                                                      <Button
                                                        as={BaseLink}
                                                        w="full"
                                                        href={lvl3Action.href}
                                                        onClick={onToggle}
                                                        variant="ghost"
                                                        borderRadius="none"
                                                        justifyContent="start"
                                                        gap="2"
                                                        _hover={{
                                                          color:
                                                            "menu.highlight",
                                                        }}
                                                      >
                                                        <Box
                                                          flex="1"
                                                          textAlign="left"
                                                          ps={16}
                                                        >
                                                          <Text
                                                            fontWeight="bold"
                                                            fontSize="md"
                                                            color="menu.lvl3.main"
                                                          >
                                                            {lvl3Label}
                                                          </Text>
                                                          <Text
                                                            fontWeight="regular"
                                                            fontSize="sm"
                                                            color="menu.lvl3.subtext"
                                                          >
                                                            {lvl3Description}
                                                          </Text>
                                                        </Box>
                                                      </Button>
                                                    ) : (
                                                      ({ isExpanded }) => (
                                                        <>
                                                          <Heading
                                                            as="h4"
                                                            color="menu.lvl3.main"
                                                            py="4"
                                                            pe="4"
                                                            ps="8"
                                                          >
                                                            <AccordionButton
                                                              justifyContent="start"
                                                              gap="2"
                                                              _hover={{
                                                                bg: "none",
                                                              }}
                                                            >
                                                              <OpenCloseIcon
                                                                isOpen={
                                                                  isExpanded
                                                                }
                                                              />
                                                              <Box
                                                                flex="1"
                                                                textAlign="left"
                                                              >
                                                                <Text
                                                                  fontWeight="bold"
                                                                  fontSize="md"
                                                                  color="menu.lvl3.main"
                                                                >
                                                                  {lvl2Label}
                                                                </Text>
                                                                <Text
                                                                  fontWeight="regular"
                                                                  fontSize="sm"
                                                                  color="menu.lvl3.subtext"
                                                                >
                                                                  {
                                                                    lvl2Description
                                                                  }
                                                                </Text>
                                                              </Box>
                                                            </AccordionButton>
                                                          </Heading>

                                                          {/* LVL4 */}
                                                          <AccordionPanel
                                                            p="0"
                                                            bg="menu.lvl4.background"
                                                          >
                                                            <Accordion
                                                              allowToggle
                                                            >
                                                              {lvl3Action.items.map(
                                                                (
                                                                  {
                                                                    label:
                                                                      lvl4Label,
                                                                    description:
                                                                      lvl4Description,
                                                                    ...lvl4Action
                                                                  },
                                                                  idx
                                                                ) => (
                                                                  <AccordionItem
                                                                    key={
                                                                      lvl4Label
                                                                    }
                                                                  >
                                                                    {"href" in
                                                                      lvl4Action && (
                                                                      <Button
                                                                        as={
                                                                          BaseLink
                                                                        }
                                                                        w="full"
                                                                        href={
                                                                          lvl4Action.href
                                                                        }
                                                                        onClick={
                                                                          onToggle
                                                                        }
                                                                        variant="ghost"
                                                                        borderRadius="none"
                                                                        justifyContent="start"
                                                                        gap="2"
                                                                        _hover={{
                                                                          color:
                                                                            "menu.highlight",
                                                                        }}
                                                                      >
                                                                        <Box
                                                                          flex="1"
                                                                          textAlign="left"
                                                                          ps={
                                                                            20
                                                                          }
                                                                        >
                                                                          <Text
                                                                            fontWeight="bold"
                                                                            fontSize="md"
                                                                            color="menu.lvl4.main"
                                                                          >
                                                                            {
                                                                              lvl4Label
                                                                            }
                                                                          </Text>
                                                                          <Text
                                                                            fontWeight="regular"
                                                                            fontSize="sm"
                                                                            color="menu.lvl4.subtext"
                                                                          >
                                                                            {
                                                                              lvl4Description
                                                                            }
                                                                          </Text>
                                                                        </Box>
                                                                      </Button>
                                                                    )}
                                                                  </AccordionItem>
                                                                )
                                                              )}
                                                            </Accordion>
                                                          </AccordionPanel>
                                                        </>
                                                      )
                                                    )}
                                                  </AccordionItem>
                                                )
                                              )}
                                            </Accordion>
                                          </AccordionPanel>
                                        </>
                                      )}
                                    </AccordionItem>
                                  )}
                                </AccordionItem>
                              )
                            )}
                          </Accordion>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                )
              })}
            </Accordion>
          </DrawerBody>

          {/* FOOTER ELEMENTS: SEARCH, LIGHT/DARK, LANGUAGES */}
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
                onToggle()
                toggleSearch()
              }}
            >
              <Icon as={MdSearch} />
              <FooterItemText>{t("search")}</FooterItemText>
            </FooterItem>
            <FooterItem onClick={toggleTheme}>
              <Icon as={themeIcon} />
              <FooterItemText>{t(themeLabelKey)}</FooterItemText>
            </FooterItem>
            <FooterItem onClick={onToggle}>
              <Flex
                as={BaseLink}
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
                <FooterItemText>{t("languages")}</FooterItemText>
              </Flex>
            </FooterItem>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileNavMenu
