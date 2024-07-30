import React, { MouseEvent, useState } from "react"
import { useTranslation } from "next-i18next"
import { MdMenu } from "react-icons/md"
import {
  Button,
  ButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"

// Utils
import { trackCustomEvent } from "@/lib/utils/matomo"

// Components
import { BaseLink } from "./Link"

export interface ListItem {
  text: string
  href?: string
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

export type ButtonDropdownProps = ButtonProps & {
  list: List
}

const ButtonDropdown = ({ list, ...rest }: ButtonDropdownProps) => {
  const { t } = useTranslation("common")
  const [selectedItem, setSelectedItem] = useState(list.text)
  const handleClick = (
    e: MouseEvent<HTMLElement>,
    item: ListItem,
    idx: number
  ) => {
    const { matomo, callback } = item

    if (matomo) {
      trackCustomEvent(matomo)
    }

    if (callback) {
      e.preventDefault()
      callback(idx)
    }
    setSelectedItem(item.text)
  }

  return (
    <Menu matchWidth>
      <MenuButton
        as={Button}
        leftIcon={<MdMenu />}
        variant="outline"
        _active={{ bg: "transparent" }}
        {...rest}
      >
        {t(selectedItem)}
      </MenuButton>
      <MenuList
        py={2}
        borderRadius="base"
        border="1px"
        borderColor="text"
        bg="dropdownBackground"
        zIndex="popover"
      >
        {list.items.map((item, idx) => {
          const { text, href } = item

          return href ? (
            <BaseLink
              key={idx}
              href={href!}
              isPartiallyActive={false}
              textDecor="none"
              color="text"
              fontWeight="normal"
              _hover={{ textDecor: "none", color: "primary.base" }}
              _focus={{ textDecor: "none", color: "primary.base" }}
            >
              <MenuItem
                as="span"
                onClick={(e) => handleClick(e, item, idx)}
                p={2}
                textAlign="center"
                justifyContent="center"
                bg="dropdownBackground"
                _hover={{
                  color: "primary.base",
                  bg: "dropdownBackgroundHover",
                }}
                _focus={{
                  color: "primary.base",
                  bg: "dropdownBackgroundHover",
                }}
              >
                {t(text)}
              </MenuItem>
            </BaseLink>
          ) : (
            <MenuItem key={idx} onClick={(e) => handleClick(e, item, idx)}>
              {t(text)}
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

export default ButtonDropdown
