import React, { useState, createRef, useContext } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import {
  Box,
  Fade,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
} from "@chakra-ui/react"
import { MdExpandMore } from "react-icons/md"

import Link, { IProps as LinkProps } from "../Link"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { getDirection } from "../../utils/translations"
import { Lang } from "../../utils/languages"

import { ISection } from "./types"

const NavLink = (props: LinkProps) => (
  <Link
    color="text200"
    display="block"
    textDecor="none"
    py={2}
    px={4}
    _hover={{
      textDecor: "none",
      color: "primary.base",
      svg: { fill: "currentColor" },
    }}
    sx={{ svg: { fill: "currentColor" } }}
    {...props}
  />
)

interface IDropdownContext {
  isOpen: boolean
  toggle: () => void
  close: () => void
  tabInteractionHandler: (
    e: React.KeyboardEvent<HTMLElement>,
    shouldClose: boolean
  ) => void
}

const DropdownContext = React.createContext<IDropdownContext | null>(null)

export interface IProps {
  children?: React.ReactNode
  section: ISection
  hasSubNav: boolean
}

const NavDropdown: React.FC<IProps> & {
  Item: typeof Item
  Link: typeof Link
  Title: typeof Title
} = ({ children, section, hasSubNav }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useI18next()
  const ref = createRef<HTMLLIElement>()

  const direction = getDirection(language as Lang)

  const toggle = () => setIsOpen((isOpen) => !isOpen)
  const close = () => setIsOpen(false)

  useOnClickOutside(ref, () => setIsOpen(false))

  // Toggle on `enter` key
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.keyCode === 13) {
      setIsOpen(!isOpen)
    } else if (e.shiftKey && e.keyCode === 9) {
      setIsOpen(false)
    }
  }

  const tabInteractionHandler = (
    e: React.KeyboardEvent<HTMLElement>,
    shouldClose: boolean
  ): void => {
    if (shouldClose) {
      e.keyCode === 9 && !e.shiftKey && setIsOpen(false)
    }
  }

  const ariaLabel = section.ariaLabel || section.text

  return (
    <DropdownContext.Provider
      value={{ isOpen, toggle, close, tabInteractionHandler }}
    >
      <ListItem
        ref={ref}
        aria-label={ariaLabel}
        whiteSpace="nowrap"
        m={0}
        color="text"
        _hover={{ color: "primary.base" }}
      >
        <Flex
          as="span"
          dir={direction}
          onClick={() => toggle()}
          onKeyDown={onKeyDownHandler}
          tabIndex={0}
          role="button"
          aria-expanded={isOpen ? "true" : "false"}
          alignItems="center"
          cursor="pointer"
          py={2}
          _hover={{
            "& > svg": {
              fill: "currentColor",
            },
          }}
        >
          {section.text}
          <Icon
            as={MdExpandMore}
            color="text200"
            boxSize={6}
            transform={isOpen ? "rotate(180deg)" : undefined}
          />
        </Flex>
        <Box
          as={Fade}
          in={isOpen}
          unmountOnExit
          bg="dropdownBackground"
          border="1px"
          borderColor="dropdownBorder"
          m={0}
          mt={hasSubNav ? "-4.5rem" : -4}
          position="absolute"
          top="100%"
          py={4}
          borderRadius="base"
          width="auto"
        >
          {children}
        </Box>
      </ListItem>
    </DropdownContext.Provider>
  )
}

interface IItemProp {
  children?: React.ReactNode
  isLast?: boolean
}

const Item: React.FC<IItemProp> = ({ children, isLast = false, ...rest }) => {
  const context = useContext(DropdownContext)

  return (
    <ListItem
      {...rest}
      onClick={() => context?.close()}
      onKeyDown={(e) => context?.tabInteractionHandler(e, isLast)}
      m={0}
      color="inherit"
      _hover={{
        bg: "dropdownBackgroundHover",
        color: "text",
      }}
    >
      {children}
    </ListItem>
  )
}

interface ITitleProps {
  children?: React.ReactNode
}

const Title: React.FC<ITitleProps> = (props) => {
  return (
    <Box
      as="span"
      color="text"
      display="block"
      fontFamily="heading"
      fontSize="1.3rem"
      lineHeight={1.4}
      mb={2}
      px={4}
      {...props}
    />
  )
}

NavDropdown.Item = Item
NavDropdown.Link = NavLink
NavDropdown.Title = Title

export default NavDropdown
