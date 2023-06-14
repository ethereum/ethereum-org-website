// Libraries
import React, { MouseEvent } from "react"
import { MdMenu } from "react-icons/md"
import {
  Button,
  ButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"

// Components
import Link from "./Link"
import Translation from "./Translation"

// Utils
import { trackCustomEvent } from "../utils/matomo"

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

export interface IProps extends ButtonProps {
  list: List
}

const ButtonDropdown: React.FC<IProps> = ({ list, ...rest }) => {
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
  }
  return (
    <Menu matchWidth>
      <MenuButton as={Button} leftIcon={<MdMenu />} variant="outline" {...rest}>
        <Translation id={list.text} />
      </MenuButton>
      <MenuList>
        {list.items.map((item, idx) => {
          const { text, to } = item

          return to ? (
            <Link
              key={idx}
              to={to!}
              isPartiallyActive={false}
              textDecor="none"
              color="text"
              _hover={{ textDecor: "none", color: "primary" }}
              _focus={{ textDecor: "none", color: "primary" }}
            >
              <MenuItem as="span" onClick={(e) => handleClick(e, item, idx)}>
                <Translation id={text} />
              </MenuItem>
            </Link>
          ) : (
            <MenuItem key={idx} onClick={(e) => handleClick(e, item, idx)}>
              <Translation id={text} />
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

export default ButtonDropdown
