import { Fragment, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { BsCircle } from "react-icons/bs"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { Menu, Portal } from "@ark-ui/react"
import {
  Box,
  calc,
  Flex,
  type FlexProps,
  Grid,
  Icon,
  type IconProps,
  ListItem,
  Text,
  UnorderedList,
  useToken,
} from "@chakra-ui/react"

import type { Lang } from "@/lib/types"

import { Button } from "@/components/Buttons"
import Link from "@/components/Link"

import { isLangRightToLeft } from "@/lib/utils/translations"
import { cleanPath } from "@/lib/utils/url"

import { SECTION_LABELS } from "@/lib/constants"

import type { Level, LvlRefs, NavItem, NavSections } from "./types"

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

type ItemProps = {
  item: NavItem
  lvl: Level
}

const Item = ({ item, lvl }: ItemProps) => {
  const { label, description, icon: CustomIcon, ...action } = item
  const { asPath } = useRouter()
  const isLink = "href" in action
  const isActivePage = isLink && cleanPath(asPath) === action.href
  const [highlighted, setHighlighted] = useState(false)

  const minW = calc.subtract(
    calc.multiply(useToken("sizes.container", "md"), 0.5),
    useToken("space", 8)
  ) // Half of `md` container (smallest desktop width) minus padding

  return (
    <Button
      as={isLink ? Link : undefined}
      href={action.href}
      onMouseEnter={() => setHighlighted(true)}
      onMouseLeave={() => setHighlighted(false)}
      rightIcon={
        <NextChevron
          lvl={lvl}
          isLink={isLink}
          _groupHover={{ fill: "menu.highlight" }}
          position="relative"
          zIndex="1"
        />
      }
      leftIcon={
        lvl === 1 ? (
          <Icon
            as={CustomIcon || BsCircle}
            color={isActivePage ? "menu.active" : `menu.lvl${lvl}.main`}
            _groupHover={{ color: "menu.highlight" }}
            position="relative"
            zIndex="1"
          />
        ) : undefined
      }
      position="relative"
      minW={minW}
      sx={{ "span:first-of-type": { m: 0, me: 4 } }}
      me={isLink ? undefined : -4}
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
      // TODO: _focus/_hover styles
    >
      {highlighted && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            insetInlineEnd: isLink ? 0 : -1,
            background: `var(--eth-colors-menu-lvl${
              (lvl) + 1
            }-background)`,
            borderStartStartRadius: "var(--eth-radii-base)",
            borderEndStartRadius: "var(--eth-radii-base)",
            borderStartEndRadius: isLink
              ? "var(--eth-radii-base)"
              : "var(--eth-radii-none)",
            borderEndEndRadius: isLink
              ? "var(--eth-radii-base)"
              : "var(--eth-radii-none)",
            zIndex: 0,
          }}
          transition={{ duration: 0.2 }}
          layoutId={`menu-lvl${(lvl) + 1}-highlight`}
        />
      )}
      <Box me="auto" textAlign="start" position="relative" zIndex="1">
        <Text
          fontWeight="bold"
          color={isActivePage ? "highContrast" : `menu.lvl${lvl}.main`}
          _groupHover={{ color: "menu.highlight" }}
        >
          {label}
        </Text>
        <Text
          fontSize="sm"
          color={isActivePage ? "menu.active" : `menu.lvl${lvl}.subtext`}
          _groupHover={{ color: "menu.highlight" }}
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
  if (lvl > 3) return null
  return (
    <Portal container={refs[`lvl${lvl}`]}>
      <Menu.Content asChild>
        <Flex
          flexDir="column"
          bg={`menu.lvl${lvl}.background`}
          sx={{
            "[data-highlighted]": {
              outline: "2px solid var(--eth-colors-menu-highlight)",
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
                  <Menu.Root loop>
                    <Menu.TriggerItem>
                      <Item lvl={1} item={item} />
                    </Menu.TriggerItem>
                    <LvlPortal
                      lvl={lvl + 1 as Level}
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
  const refs: LvlRefs = {
    lvl1: useRef(null),
    lvl2: useRef(null),
    lvl3: useRef(null),
  }

  return (
    <>
      <Flex
        as={UnorderedList}
        alignItems="center"
        listStyleType="none"
        m="0"
        {...props}
      >
        {SECTION_LABELS.map((sectionKey) => {
          const { label } = sections[sectionKey]
          return (
            <Menu.Root key={label} unmountOnExit loop>
              <Menu.Trigger>
                <Button
                  as={ListItem}
                  variant="ghost"
                  color="menu.lvl1.body"
                  m="0"
                >
                  {label}
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
        top="4.75rem"
        insetInline="0"
        bg={`menu.lvl${1}.background`} // TODO
        templateColumns="repeat(3, 1fr)"
        transition="grid-template-rows 0.5s ease-in-out"
      >
        <Box ref={refs.lvl1} />
        <Box ref={refs.lvl2} />
        <Box ref={refs.lvl3} />
      </Grid>
    </>
  )
}

export default ArkMenu
