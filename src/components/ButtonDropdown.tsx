// Libraries
import React, { useState } from "react"
import { MdMenu } from "react-icons/md"

// Components
import Link from "./Link"
import Button from "./Button"
import Translation from "./Translation"

// Utils
import { Menu, MenuButton, MenuList, MenuItem, Box } from "@chakra-ui/react"
import { TranslationKey } from "../utils/translations"
import { trackCustomEvent } from "../utils/matomo"
import { Icon } from "@chakra-ui/react"

export interface List {
  text: TranslationKey
  ariaLabel: string
  items: Array<ListItem>
}

export interface ListItem {
  text: string
  to?: string
  matomo?: {
    eventCategory: string
    eventAction: string
    eventName: string
  }
  callback?: (idx: number) => void
}

export interface List {
  text: string
  ariaLabel: string
  items: Array<ListItem>
}

export interface IProps {
  list: List
}

const MenuItemLink = ({ children, ...props }) => {
  return (
    <Link
      {...props}
      color="inherit"
      textDecoration="none"
      _hover={{ textDecoration: "none", color: { undefined } }}
    >
      {children}
    </Link>
  )
}

const ButtonDropdown: React.FC<IProps> = ({ list }) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <Menu aria-label={`Select ${list.text}`} matchWidth={true} offset={[0, 4]}>
      {({ isOpen }) => (
        <Box
          position="relative"
          display="flex"
          flexDir={{ base: "column-reverse", lg: "column" }}
          width={{ base: "100%", lg: "auto" }}
        >
          <MenuButton
            as={Button}
            variant="outline"
            minW={{ base: "100%", lg: "240" }}
            marginBottom={8}
            paddingTop={2}
            paddingBottom={2}
            tabIndex={0}
            alignSelf="flex-end"
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            bg={isOpen && !isActive ? "transparent !important" : undefined}
            boxShadow={isOpen && !isActive ? "outline !important" : undefined}
            border={isOpen && !isActive ? "none" : undefined}
            display="flex"
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Icon as={MdMenu} marginInlineEnd={2}></Icon>
              <Translation id={list.text} />
            </Box>
          </MenuButton>
          <MenuList
            border="1px solid"
            borderColor="text"
            backgroundColor="dropdownBackground"
            color="text"
          >
            {list.items.map(({ text, to, matomo, callback }, idx) => (
              <MenuItem
                key={idx}
                justifyContent="center"
                margin={0}
                paddingTop="0.5rem"
                paddingBottom="0.5rem"
                _hover={{
                  backgroundColor: "dropdownBackgroundHover",
                  color: "primary",
                }}
              >
                {!!to && !!matomo && (
                  <MenuItemLink
                    isPartiallyActive={false}
                    onClick={() => {
                      trackCustomEvent(matomo)
                    }}
                    to={to}
                  >
                    <Translation id={text} />
                  </MenuItemLink>
                )}
                {!!to && !matomo && (
                  <MenuItemLink isPartiallyActive={false} to={to}>
                    <Translation id={text} />
                  </MenuItemLink>
                )}
                {!!callback && (
                  <Box onClick={() => callback(idx)}>
                    <Translation id={text} />
                  </Box>
                )}
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      )}
    </Menu>
  )
}

export default ButtonDropdown
