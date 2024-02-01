import { Fragment } from "react"
import { useRouter } from "next/router"
import { Menu as ArkMenu, Portal as ArkPortal } from "@ark-ui/react"
import { Button, Flex, Icon, Link } from "@chakra-ui/react"

import { ButtonProps } from "@/components/Buttons"

import { cleanPath } from "@/lib/utils/url"

import type { Level, LvlRefs, NavItem } from "../types"

import ItemContent from "./ItemContent"
import NextChevron from "./NextChevron"

import { useRtlFlip } from "@/hooks/useRtlFlip"

type LvlPortalProps = {
  lvl: Level
  refs: LvlRefs
  items: NavItem[]
}

const LvlPortal = ({ lvl, refs, items }: LvlPortalProps) => {
  const { direction } = useRtlFlip()
  const { asPath } = useRouter()
  const pad = 4
  if (lvl > 3) return null

  return (
    <ArkPortal container={refs[`lvl${lvl}`]}>
      <ArkMenu.Content asChild>
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
            const { label, description, icon, ...action } = item
            const isLink = "href" in action
            const isActivePage = isLink && cleanPath(asPath) === action.href

            const buttonProps: ButtonProps = {
              color: isActivePage ? "menu.active" : `menu.lvl${lvl}.main`,
              leftIcon: lvl !== 1 || !icon ? undefined : <Icon as={icon} />,
              rightIcon: isLink ? undefined : <NextChevron />,
              position: "relative",
              w: "full",
              sx: { "span:first-of-type": { m: 0, me: 4 } }, // Spacing for icon
              py: "4",
              bg: "none",
              _hover: { boxShadow: "none" },
              _active: { boxShadow: "none" },
            }

            return (
              <Fragment key={label}>
                {isLink ? (
                  <ArkMenu.Item id={label} asChild>
                    <Button as={Link} href={action.href} {...buttonProps}>
                      <ItemContent lvl={lvl} item={item} />
                    </Button>
                  </ArkMenu.Item>
                ) : (
                  <ArkMenu.Root dir={direction} loop>
                    <ArkMenu.TriggerItem>
                      <Button {...buttonProps}>
                        <ItemContent lvl={lvl} item={item} />
                      </Button>
                    </ArkMenu.TriggerItem>
                    <LvlPortal
                      lvl={(lvl + 1) as Level}
                      refs={refs}
                      items={action.items}
                    />
                  </ArkMenu.Root>
                )}
              </Fragment>
            )
          })}
        </Flex>
      </ArkMenu.Content>
    </ArkPortal>
  )
}

export default LvlPortal
