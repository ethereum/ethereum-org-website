import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { BsCircle } from "react-icons/bs"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import {
  Box,
  type ButtonProps,
  Flex,
  type FlexProps,
  Icon,
  IconProps,
  List,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react"

import type { Lang } from "@/lib/types"

import { Button } from "@/components/Buttons"
import Link from "@/components/Link"

import { isLangRightToLeft } from "@/lib/utils/translations"

import type { NavItem, NavSectionKey, NavSections } from "./types"

type ActiveState =
  | { section: null; lvl1: null; lvl2: null; lvl3: null }
  | { section: NavSectionKey; lvl1: null; lvl2: null; lvl3: null }
  | { section: NavSectionKey; lvl1: number; lvl2: null; lvl3: null }
  | { section: NavSectionKey; lvl1: number; lvl2: number; lvl3: null }
  | { section: NavSectionKey; lvl1: number; lvl2: number; lvl3: number }

type Level = 1 | 2 | 3

const activeNull: ActiveState = {
  section: null,
  lvl1: null,
  lvl2: null,
  lvl3: null,
}

type NextChevronProps = IconProps & {
  lvl: Level
  isLink: boolean
}

const NextChevron = ({ lvl, isLink, ...props }: NextChevronProps) => {
  const { locale } = useRouter()
  if (isLink) return undefined
  const isRtl = isLangRightToLeft(locale! as Lang)
  return (
    <Icon
      as={isRtl ? MdChevronLeft : MdChevronRight}
      fill={`menu.lvl${lvl}.main`}
      {...props}
    />
  )
}

type GetHoverActionsArgs = {
  lvl: Level
  index: number
  href?: string
}

type MenuButtonProps = {
  item: NavItem
  lvl: Level
  index: number
  getHoverActions: (args: GetHoverActionsArgs) => Partial<ButtonProps>
}

const MenuButton = ({ item, lvl, index, getHoverActions }: MenuButtonProps) => {
  const { label, description, icon: CustomIcon, ...action } = item
  const { asPath } = useRouter()
  const isLink = "href" in action
  const isPartiallyActive = action.href && asPath.includes(action.href)
  return (
    <Button
      as={isLink ? Link : undefined}
      href={action.href}
      rightIcon={
        <NextChevron
          lvl={lvl}
          isLink={isLink}
          _groupHover={{ fill: "menu.highlight" }}
        />
      }
      leftIcon={
        lvl === 1 ? (
          <Icon
            as={CustomIcon || BsCircle}
            color={`menu.lvl${lvl}.main`}
            _groupHover={{ color: "menu.highlight" }}
          />
        ) : undefined
      }
      sx={{ "span:first-of-type": { m: 0, me: 4 } }}
      py="4"
      bg={`menu.lvl${lvl}.background`}
      me={isLink ? undefined : -4}
      data-group
      _hover={{
        bg: `menu.lvl${lvl + 1}.background`,
        borderInlineEndRadius: isLink ? undefined : "none",
        boxShadow: "none",
      }}
      _active={{
        bg: `menu.lvl${lvl + 1}.background`,
        borderInlineEndRadius: isLink ? undefined : "none",
        boxShadow: "none",
      }}
      // TODO: _focus styles
      {...getHoverActions({ lvl, index, href: action.href })}
    >
      <Box me="auto" textAlign="start">
        <Text
          fontWeight="bold"
          color={isPartiallyActive ? "menu.highlight" : `menu.lvl${lvl}.main`}
          _groupHover={{ color: "menu.highlight" }}
        >
          {label}
        </Text>
        <Text
          fontSize="sm"
          color={
            isPartiallyActive ? "menu.highlight" : `menu.lvl${lvl}.subtext`
          }
          _groupHover={{ color: "menu.highlight" }}
        >
          {description}
        </Text>
      </Box>
    </Button>
  )
}

export type MenuProps = FlexProps & {
  sections: NavSections
}

// TODO (a11y): Keyboard arrow navigation
// TODO (style): Implement custom icons
// TODO (style): Implement asPath active styling (isPartiallyActive)

const Menu = ({ sections, ...props }: MenuProps) => {
  const { locale } = useRouter()
  const isRtl = isLangRightToLeft(locale! as Lang)

  const [active, setActive] = useState<ActiveState>(activeNull)

  // Order of sections in the menu
  const sectionLabels: NavSectionKey[] = [
    "learn",
    "use",
    "build",
    "participate",
    "research",
  ]

  const onOpen = (key: NavSectionKey) => {
    setActive((prev) => ({ ...prev, section: key } as ActiveState))
  }

  const onClose = () => {
    setActive(activeNull)
  }

  const isOpen = !!active.section

  const getLvl1Items = (): NavItem[] => {
    if (!active.section) return []
    return sections[active.section as NavSectionKey].items || []
  }

  const getLvl2Items = (): NavItem[] => {
    if (!active.section || active.lvl1 === null) return []
    const lvl1Items = sections[active.section as NavSectionKey].items
    const lvl2Items = lvl1Items[active.lvl1 % lvl1Items.length].items || []
    return lvl2Items
  }

  const getLvl3Items = (): NavItem[] => {
    if (!active.section || active.lvl1 === null || active.lvl2 === null)
      return []
    const lvl1Items = sections[active.section as NavSectionKey].items
    const lvl2Items = lvl1Items[active.lvl1 % lvl1Items.length].items || []
    if (lvl2Items.length === 0) return []
    const lvl3Items = lvl2Items[active.lvl2].items || []
    return lvl3Items
  }

  const has = {
    lvl1Items: getLvl1Items().length > 0,
    lvl2Items: getLvl2Items().length > 0,
    lvl3Items: getLvl3Items().length > 0,
  } as const

  const setActiveIndex = (lvl: Level, index: number | null) => {
    if (lvl === 3) {
      setActive((prev) => ({ ...prev, lvl3: index } as ActiveState))
    } else if (lvl === 2) {
      setActive((prev) => ({ ...prev, lvl2: index, lvl3: null } as ActiveState))
    } else {
      setActive(
        (prev) =>
          ({
            ...prev,
            lvl1: index,
            lvl2: null,
            lvl3: null,
          } as ActiveState)
      )
    }
  }

  const getLvlContainerProps = (lvl: Level): FlexProps => ({
    bg: `menu.lvl${lvl}.background`,
    color: `menu.lvl${lvl}.main`,
    p: 4,
    me: 0,
    direction: "column",
    zIndex: 1 - lvl,
  })

  const x = isRtl ? "100%" : "-100%"

  const slideAnimationProps = {
    as: motion.div,
    initial: { x, scaleX: 0 },
    animate: { x: 0, scaleX: 1 },
    exit: { x, scaleX: 0 },
  } as const

  const getHoverActions = ({
    lvl,
    index,
    href,
  }: GetHoverActionsArgs): Partial<ButtonProps> => ({
    isActive: active[`lvl${lvl}`] === index,
    onClick: () => {
      href ? onClose() : setActiveIndex(1, index)
    },
    onMouseEnter: () => setActiveIndex(lvl, index),
    onFocusCapture: () => setActiveIndex(lvl, index),
  })

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-start"
      autoFocus
    >
      <PopoverTrigger>
        <Flex as={List} display="flex" alignItems="center" m="0" {...props}>
          {sectionLabels.map((key) => {
            const { label, ariaLabel } = sections[key]
            return (
              <Button
                key={key}
                isActive={active.section === key}
                variant="ghost"
                color="menu.lvl1.main"
                sx={{ span: { m: 0 } }}
                _hover={{
                  color: "menu.highlight",
                }}
                _active={{
                  color: "menu.highlight",
                  bg: "primary.lowContrast",
                }}
                onClick={() => onOpen(key)}
                onMouseEnter={() => {
                  if (!isOpen) return
                  setActive(
                    (prev) => ({ ...prev, section: key } as ActiveState)
                  )
                }}
                aria-label={ariaLabel}
              >
                {label}
              </Button>
            )
          })}
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        shadow="md"
        border="1px"
        borderColor="menu.stroke"
        position="absolute"
        bg={`menu.lvl${has.lvl3Items ? 3 : has.lvl2Items ? 2 : 1}.background`}
        insetInlineStart="-5.375rem"
        w="min(100vw, 1504px)"
        mx="auto"
        zIndex={0}
        onMouseLeave={() => setActiveIndex(1, null)}
      >
        {has.lvl1Items && (
          <Flex {...getLvlContainerProps(1)}>
            {getLvl1Items().map((item, index) => (
              <MenuButton
                key={item.label}
                item={item}
                lvl={1}
                index={index}
                getHoverActions={getHoverActions}
              />
            ))}
          </Flex>
        )}
        <AnimatePresence>
          {has.lvl2Items && (
            <Flex {...slideAnimationProps} {...getLvlContainerProps(2)}>
              {getLvl2Items().map((item, index) => (
                <MenuButton
                  key={item.label}
                  item={item}
                  lvl={2}
                  index={index}
                  getHoverActions={getHoverActions}
                />
              ))}
            </Flex>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {has.lvl3Items && (
            <Flex {...slideAnimationProps} {...getLvlContainerProps(3)}>
              {getLvl3Items().map((item, index) => (
                <MenuButton
                  key={item.label}
                  item={item}
                  lvl={3}
                  index={index}
                  getHoverActions={getHoverActions}
                />
              ))}
            </Flex>
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  )
}

export default Menu
