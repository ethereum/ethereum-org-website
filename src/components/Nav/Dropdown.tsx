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
      <ChakraMenu isLazy placement="bottom">
        {({ isOpen }) => (
          <>
            <MenuButton
              dir={direction}
              borderRadius="base"
              px="3"
              py="0.5"
              _focusVisible={{
                outline: "4px solid",
                outlineColor: "primary.hover",
                color: "primary.base",
              }}
              _hover={{
                color: "primary.base",
              }}
              _active={{
                bg: "primary.lowContrast",
              }}
              _expanded={{
                bg: "background.highlight",
              }}
              sx={{
                "& > span": {
                  display: "inline-flex",
                  alignItems: "center",
                },
              }}
            >
              {section.text}
              <Icon
                as={MdExpandMore}
                fontSize="2xl"
                color="currentcolor"
                transform={isOpen ? "rotate(180deg)" : undefined}
              />
            </MenuButton>
            <MenuList
              border="1px"
              borderColor="dropdownBorder"
              borderRadius="none"
              py={4}
              sx={{ "--menu-bg": "colors.dropdownBackground" }}
              // Override the dark styles from the default theme
              _dark={{}}
              rootProps={{
                top: "4 !important",
              }}
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
    color="text200"
    display="block"
    py={2}
    px={4}
    _hover={{
      bg: "dropdownBackgroundHover",
      color: "primary.base",
    }}
  >
    <Link
      isPartiallyActive={false}
      color="inherit"
      textDecor="none"
      _hover={{ textDecor: "none" }}
      {...props}
    />
  </MenuItem>
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
