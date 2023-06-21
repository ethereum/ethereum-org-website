import React from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import {
  Icon,
  ListItem,
  Menu as ChakraMenu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { MdExpandMore } from "react-icons/md"

import Link, { IProps as LinkProps } from "../Link"

import { getDirection } from "../../utils/translations"
import { Lang } from "../../utils/languages"

import { IItem, ISection } from "./types"

export interface IProps {
  children?: React.ReactNode
  section: ISection
}

const NavDropdown: React.FC<IProps> & {
  Item: typeof Item
  ItemGroup: typeof ItemGroup
} = ({ children, section }) => {
  const { language } = useI18next()

  const direction = getDirection(language as Lang)

  return (
    <ListItem m={0}>
      <ChakraMenu isLazy>
        {({ isOpen }) => (
          <>
            <MenuButton
              dir={direction}
              sx={{
                "& > span": {
                  display: "inline-flex",
                  alignItems: "center",
                  py: 2,
                },
              }}
            >
              {section.text}
              <Icon
                as={MdExpandMore}
                fontSize="2xl"
                color="text200"
                transform={isOpen ? "rotate(180deg)" : undefined}
              />
            </MenuButton>
            <MenuList
              border="1px"
              borderColor="dropdownBorder"
              borderRadius="base"
              mt={-2}
              py={4}
              sx={{ "--menu-bg": "colors.dropdownBackground" }}
              // Override the dark styles from the default theme
              _dark={{}}
            >
              {children}
            </MenuList>
          </>
        )}
      </ChakraMenu>
    </ListItem>
  )
}

const Item = (props: Pick<LinkProps, "to" | "children">) => (
  <MenuItem
    as={Link}
    isPartiallyActive={false}
    color="text200"
    display="block"
    textDecor="none"
    py={2}
    px={4}
    _hover={{
      bg: "dropdownBackgroundHover",
      color: "primary.base",
      textDecor: "none",
      svg: { fill: "currentColor" },
    }}
    sx={{ svg: { fill: "currentColor" } }}
    {...props}
  />
)

const ItemGroup = ({ item }: { item: Pick<IItem, "text" | "items"> }) => {
  const { text, items } = item
  return (
    <MenuGroup
      title={text}
      color="text"
      display="block"
      fontFamily="heading"
      fontSize="1.3rem"
      fontWeight="normal"
      lineHeight={1.4}
      mt={0}
      mx={0}
      mb={2}
      px={4}
    >
      {(items || []).map((item, idx) => (
        <NavDropdown.Item key={idx} to={item.to}>
          {item.text}
        </NavDropdown.Item>
      ))}
    </MenuGroup>
  )
}

NavDropdown.Item = Item
NavDropdown.ItemGroup = ItemGroup
export default NavDropdown
