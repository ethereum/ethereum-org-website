import { Fragment } from "react"
import { Menu as ArkMenu, Portal as ArkPortal } from "@ark-ui/react"
import { Flex } from "@chakra-ui/react"

import type { Level, LvlRefs, NavItem } from "../types"

import ItemContent from "./ItemContent"

import { useRtlFlip } from "@/hooks/useRtlFlip"

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
            const { label, ...action } = item
            return (
              <Fragment key={label}>
                {"href" in action ? (
                  <ArkMenu.Item id={label}>
                    <ItemContent lvl={lvl} item={item} />
                  </ArkMenu.Item>
                ) : (
                  <ArkMenu.Root loop dir={direction}>
                    <ArkMenu.TriggerItem>
                      <ItemContent lvl={lvl} item={item} />
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
