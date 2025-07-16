import { motion } from "framer-motion"
import { tv } from "tailwind-variants"
import { Content } from "@radix-ui/react-navigation-menu"

import { cn } from "@/lib/utils/cn"

import { NavItem, NavSections } from "../types"

import SubMenu from "./SubMenu"
import { useNavMenu } from "./useNavMenu"

export const navMenuVariants = tv({
  slots: {
    base: "text-body",
    item: "has-[button[data-state=open]]:rounded-s-md has-[button[data-state=open]]:rounded-e-none has-[button[data-state=open]]:-me-2 has-[button[data-state=open]]:pe-2",
    link: "group w-full relative py-4 hover:text-primary [&:hover_p]:text-primary focus-visible:text-primary [&:focus-visible_p]:text-primary hover:outline-0 rounded-md hover:shadow-none focus-visible:outline-0 focus-visible:rounded-md focus-visible:shadow-none",
    linkSubtext: "text-sm",
    submenu: "grid h-full w-full grid-cols-1",
  },
  variants: {
    level: {
      1: {
        submenu: "grid-cols-3 bg-background",
        item: "has-[button[data-state=open]]:bg-background-low",
        link: "data-[active=true]:bg-background-low hover:bg-background-low focus-visible:bg-background-low",
        linkSubtext: "group-[data-active=true]:text-body-menu",
      },
      2: {
        submenu: "grid-cols-2 bg-background-low",
        item: "has-[button[data-state=open]]:bg-background-medium",
        link: "hover:bg-background-medium focus-visible:bg-background-medium data-[active=true]:bg-background-medium",
        linkSubtext: "group-[data-active=true]:text-body-menu-low",
      },
      3: {
        submenu: "grid-cols-1 bg-background-medium",
        item: "has-[button[data-state=open]]:bg-background-low`",
        link: "data-[active=true]:bg-background-low hover:bg-background-low",
        linkSubtext: "group-[data-active=true]:text-body-menu-medium",
      },
      4: {
        submenu: "grid-cols-1 bg-background-high",
        item: "has-[button[data-state=open]]:bg-background-medium",
        link: "data-[active=true]:bg-background-medium hover:bg-background-medium",
        linkSubtext: "group-[data-active=true]:text-body-menu-high",
      },
    },
  },
})

type MenuContentProps = {
  items: NavItem[]
  isOpen: boolean
  sections: NavSections
}

// Desktop Menu content
const MenuContent = ({ items, isOpen, sections }: MenuContentProps) => {
  const { activeSection, containerVariants, onClose } = useNavMenu(sections)
  const { base } = navMenuVariants()

  return (
    <Content asChild>
      <motion.div
        className={cn(
          "absolute inset-x-0 top-19 border border-body-light bg-background shadow-md",
          base()
        )}
        variants={containerVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <SubMenu
          lvl={1}
          items={items}
          activeSection={activeSection}
          onClose={onClose}
        />
      </motion.div>
    </Content>
  )
}

export default MenuContent
