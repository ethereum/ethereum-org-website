import React from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import {
  Box,
  Icon,
  ListItem,
  Menu as ChakraMenu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { MdExpandMore } from "react-icons/md"

import { BaseLink, IProps as LinkProps } from "../Link"

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
              borderTop="none"
              borderColor="body.light"
              borderRadius="none"
              p={0}
              sx={{ "--menu-bg": "colors.background.highlight" }}
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
    as={BaseLink}
    isPartiallyActive={false}
    textDecor="none"
    color="text200"
    display="block"
    p="2"
    _hover={{
      bg: "primary.lowContrast",
      color: "primary.base",
      textDecor: "none",
    }}
    _active={{
      bg: "body.light",
      color: "primary.highContrast",
    }}
    _focusVisible={{
      outline: "4px solid",
      outlineColor: "primary.hover",
      outlineOffset: "-1px",
      color: "primary.base",
      bg: "none",
    }}
    {...props}
  />
)

const ItemGroup = ({ item }: { item: Pick<IItem, "text" | "items"> }) => {
  const { text, items } = item
  return (
    <MenuGroup
      title={text}
      color="text"
      fontFamily="heading"
      fontSize="2xl"
      fontWeight="normal"
      lineHeight="1.5"
      mt={0}
      mx={0}
      mb="2"
      px="2"
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
