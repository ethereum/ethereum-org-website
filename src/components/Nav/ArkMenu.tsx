import { Fragment, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { BsCircle } from "react-icons/bs"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { Menu, type MenuOpenChangeDetails, Portal } from "@ark-ui/react"
import {
  Box,
  Flex,
  type FlexProps,
  Grid,
  Icon,
  type IconProps,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import type { Lang } from "@/lib/types"

import { Button } from "@/components/Buttons"
import Link from "@/components/Link"

import { isLangRightToLeft } from "@/lib/utils/translations"
import { cleanPath } from "@/lib/utils/url"

import { SECTION_LABELS } from "@/lib/constants"

import type {
  Level,
  LvlRefs,
  NavItem,
  NavSectionKey,
  NavSections,
} from "./types"

import { useRtlFlip } from "@/hooks/useRtlFlip"

const NextChevron = (props: IconProps) => {
  const { locale } = useRouter()
  const isRtl = isLangRightToLeft(locale! as Lang)
  return <Icon as={isRtl ? MdChevronLeft : MdChevronRight} {...props} />
}

type ItemProps = {
  item: NavItem
  lvl: Level
}

const Item = ({ item, lvl }: ItemProps) => {
  const { label, description, icon: CustomIcon, ...action } = item
  const { asPath } = useRouter()
  const isLink = "href" in action
  const isActivePage = isLink && cleanPath(asPath) === action.href

  return (
    <Button
      as={isLink ? Link : undefined}
      href={action.href}
      color={`menu.lvl${lvl}.main`}
      rightIcon={
        isLink ? undefined : (
          <NextChevron fill="currentColor" position="relative" zIndex="1" />
        )
      }
      leftIcon={
        lvl === 1 ? (
          <Icon
            as={CustomIcon || BsCircle}
            color={isActivePage ? "menu.active" : `menu.lvl${lvl}.main`}
            position="relative"
            zIndex="1"
          />
        ) : undefined
      }
      position="relative"
      w="full"
      sx={{ "span:first-of-type": { m: 0, me: 4 } }}
      py="4"
      bg="none"
      data-group
      _hover={{
        boxShadow: "none",
      }}
      _active={{
        outlineOffset: "2px",
        boxShadow: "none",
      }}
    >
      <Box me="auto" textAlign="start" position="relative" zIndex="1">
        <Text
          fontWeight="bold"
          color={isActivePage ? "menu.active" : `menu.lvl${lvl}.main`}
        >
          {label}
        </Text>
        <Text
          fontSize="sm"
          color={isActivePage ? "menu.active" : `menu.lvl${lvl}.subtext`}
        >
          {description}
        </Text>
      </Box>
    </Button>
  )
}

type LvlPortalProps = {
  lvl: Level
  refs: LvlRefs
  items: NavItem[]
}
const LvlPortal = ({ lvl, refs, items }: LvlPortalProps) => {
  const { direction } = useRtlFlip()
  const pad = 4
  if (lvl > 3) return null
  return (
    <Portal container={refs[`lvl${lvl}`]}>
      <Menu.Content asChild>
        <Flex
          flexDir="column"
          bg={`menu.lvl${lvl}.background`}
          h="full"
          p={pad}
          _focus={{ outline: "none" }}
          sx={{
            // Styling for highlighted items
            "[data-highlighted]": {
              rounded: "md",
              "p, svg": { color: "primary.base" },
              bg: `menu.lvl${lvl}.activeBackground`,
            },
            // Adjust spacing when sub-items available
            '[data-state="closed"],[data-state="open"]': {
              me: -pad,
            },
            // End-edge is flat if items are open
            '[data-state="open"]': {
              roundedEnd: "none",
            },
          }}
        >
          {items.map((item) => {
            const { label, ...action } = item
            return (
              <Fragment key={label}>
                {"href" in action ? (
                  <Menu.Item id={label}>
                    <Item lvl={lvl} item={item} />
                  </Menu.Item>
                ) : (
                  <Menu.Root loop dir={direction}>
                    <Menu.TriggerItem>
                      <Item lvl={lvl} item={item} />
                    </Menu.TriggerItem>
                    <LvlPortal
                      lvl={(lvl + 1) as Level}
                      refs={refs}
                      items={action.items}
                    />
                  </Menu.Root>
                )}
              </Fragment>
            )
          })}
        </Flex>
      </Menu.Content>
    </Portal>
  )
}

type ArkMenuProps = FlexProps & {
  sections: NavSections
}
const ArkMenu = ({ sections, ...props }: ArkMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [activeSection, setActiveSection] = useState<NavSectionKey | null>(null)

  const { direction } = useRtlFlip()

  const handleOpenChange = (
    { open }: MenuOpenChangeDetails,
    sectionKey: NavSectionKey
  ): void => {
    setActiveSection(open ? sectionKey : null)
    open ? onOpen() : onClose()
  }

  const refs: LvlRefs = {
    lvl1: useRef(null),
    lvl2: useRef(null),
    lvl3: useRef(null),
  }

  const handleSectionHover = (sectionKey: NavSectionKey) => {
    if (!isOpen) return
    if (sectionKey === activeSection) return
    setActiveSection(sectionKey)
    // TODO: Open the section being hovered
  }

  return (
    <>
      <Flex alignItems="center" listStyleType="none" m="0" {...props}>
        {SECTION_LABELS.map((sectionKey) => {
          const { label } = sections[sectionKey]
          const isActive = activeSection === sectionKey
          return (
            <Menu.Root
              key={label}
              unmountOnExit
              loop
              onOpenChange={(details) => handleOpenChange(details, sectionKey)}
              dir={direction}
            >
              <Menu.Trigger asChild>
                <Button
                  variant="ghost"
                  m="0"
                  color={isActive ? "primary.base" : "menu.lvl1.body"}
                  // onMouseEnter={() => handleSectionHover(sectionKey)}
                >
                  {isActive && (
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: "0",
                        borderRadius: "var(--eth-radii-base)",
                        background: "var(--eth-colors-primary-lowContrast)",
                        zIndex: 0,
                      }}
                      layoutId="menu-section-bg-highlight"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <Text as="span" zIndex="1">
                    {label}
                  </Text>
                </Button>
              </Menu.Trigger>
              <LvlPortal
                lvl={1}
                refs={refs}
                items={sections[sectionKey].items}
              />
            </Menu.Root>
          )
        })}
      </Flex>
      <Grid
        position="absolute"
        visibility={isOpen ? "visible" : "hidden"}
        top="navHeight"
        insetInline="0"
        templateColumns="repeat(3, 1fr)"
        transition="grid-template-columns 0.5s ease-in-out"
        shadow="md"
        border="1px"
        borderColor="menu.stroke"
        scrollBehavior="smooth"
        bg={`menu.lvl${1}.background`}
        sx={{
          // Styling if Lvl2 is open
          '&:has(#menu-box-lvl-2 [data-state="open"])': {
            bg: "menu.lvl2.background",
          },
          // Styling if Lvl3 is open
          '&:has(#menu-box-lvl-3 [data-state="open"])': {
            bg: "menu.lvl3.background",
          },
        }}
      >
        <Box ref={refs.lvl1} id="menu-box-lvl-1" />
        <Box ref={refs.lvl2} id="menu-box-lvl-2" />
        <Box ref={refs.lvl3} id="menu-box-lvl-3" />
      </Grid>
    </>
  )
}

export default ArkMenu
