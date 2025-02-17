import { BaseHTMLAttributes } from "react"
import { motion } from "framer-motion"
import {
  Item,
  List,
  Root,
  Trigger,
  Viewport,
} from "@radix-ui/react-navigation-menu"

import { cn } from "@/lib/utils/cn"

import { MAIN_NAV_ID, SECTION_LABELS } from "@/lib/constants"

import { Button } from "../../ui/buttons/Button"
import type { NavSections } from "../types"

import MenuContent from "./MenuContent"
import { useNavMenu } from "./useNavMenu"

type NavMenuProps = BaseHTMLAttributes<HTMLDivElement> & {
  sections: NavSections
}

const Menu = ({ sections, ...props }: NavMenuProps) => {
  const { activeSection, direction, handleSectionChange, isOpen } =
    useNavMenu(sections)

  return (
    <div {...props}>
      <Root
        dir={direction}
        orientation="horizontal"
        onValueChange={handleSectionChange}
        delayDuration={0}
      >
        <List id={MAIN_NAV_ID} className="m-0 flex list-none">
          {SECTION_LABELS.map((sectionKey) => {
            const { label, items } = sections[sectionKey]
            const isActive = activeSection === sectionKey

            return (
              <Item key={sectionKey} value={label}>
                <Trigger asChild>
                  <Button
                    className={cn(
                      "relative whitespace-nowrap px-3 py-2 lg:px-4",
                      isActive ? "text-primary" : "text-body",
                      "after:absolute after:inset-x-0 after:top-full after:h-4 after:content-['']"
                    )}
                    variant="ghost"
                  >
                    {/* Animated highlight for active section */}
                    {isActive && (
                      <motion.div
                        layoutId="active-section-highlight"
                        className="absolute inset-0 z-0 rounded bg-primary-low-contrast"
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Button>
                </Trigger>
                {/* Desktop Menu content */}
                <MenuContent
                  items={items}
                  isOpen={isOpen}
                  sections={sections}
                />
              </Item>
            )
          })}
        </List>

        <Viewport />
      </Root>
    </div>
  )
}

export default Menu
