import React, { createRef, useContext, useState } from "react"
import { MdExpandMore } from "react-icons/md"
import { Box, Fade, Flex, Icon, ListItem } from "@chakra-ui/react"

import { BaseLink, type LinkProps } from "../Link"

import { ISection } from "./types"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"

const NavLink = (props: LinkProps) => (
  <BaseLink
    color="text200"
    display="block"
    textDecor="none"
    py={2}
    px={4}
    fontWeight="normal"
    _hover={{
      textDecor: "none",
      color: "primary.base",
      svg: { fill: "currentColor" },
    }}
    _visited={{}}
    sx={{ svg: { fill: "currentColor" } }}
    {...props}
  />
)

type DropdownContext = {
  isOpen: boolean
  toggle: () => void
  close: () => void
  tabInteractionHandler: (
    e: React.KeyboardEvent<HTMLElement>,
    shouldClose: boolean
  ) => void
}

const DropdownContext = React.createContext<DropdownContext | null>(null)

export type NavDropdownProps = {
  children?: React.ReactNode
  section: ISection
}

const NavDropdown = ({ children, section }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const ref = createRef<HTMLLIElement>()

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
          mt="1"
          position="absolute"
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

type ItemProps = {
  children?: React.ReactNode
  isLast?: boolean
}

const Item = ({ children, isLast = false, ...rest }: ItemProps) => {
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

type TitleProps = {
  children?: React.ReactNode
}

const Title = (props: TitleProps) => {
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

export default Object.assign(NavDropdown, { Link: NavLink, Item, Title })
