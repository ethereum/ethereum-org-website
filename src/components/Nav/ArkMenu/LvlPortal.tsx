import { Fragment } from "react"
import { Menu, Portal } from "@ark-ui/react"
import { Flex } from "@chakra-ui/react"

import type { Level, LvlRefs, NavItem } from "../types"

import Item from "./Item"

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

export default LvlPortal
