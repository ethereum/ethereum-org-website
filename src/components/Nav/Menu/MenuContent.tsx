import { motion } from "framer-motion"
import { Box } from "@chakra-ui/react"
import { Content } from "@radix-ui/react-navigation-menu"

import { NavItem, NavSections } from "../types"

import SubMenu from "./SubMenu"
import { useNavMenu } from "./useNavMenu"

type MenuContentProps = {
  items: NavItem[]
  isOpen: boolean
  sections: NavSections
}

// Desktop Menu content
const MenuContent = ({ items, isOpen, sections }: MenuContentProps) => {
  const { activeSection, containerVariants, menuColors, onClose } =
    useNavMenu(sections)

  return (
    <Content asChild>
      <Box
        as={motion.div}
        variants={containerVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        position="absolute"
        top="19"
        insetInline="0"
        shadow="md"
        border="1px"
        borderColor={menuColors.stroke}
        bg={menuColors.lvl[1].background}
      >
        <SubMenu
          lvl={1}
          items={items}
          activeSection={activeSection}
          onClose={onClose}
        />
      </Box>
    </Content>
  )
}

export default MenuContent
