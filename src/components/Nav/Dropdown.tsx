import React, { useState, createRef, useContext } from "react"
import styled from "styled-components"
import { useIntl } from "react-intl"
import { motion } from "framer-motion"

import Translation from "../Translation"
import Icon from "../Icon"
import Link from "../Link"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { getDirection, translateMessageId } from "../../utils/translations"
import { Lang } from "../../utils/languages"

import { ISection } from "./types"

// TODO use framer-motion
const StyledIcon = styled(Icon)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? `rotate(180deg)` : ``)};
`

const DropdownTitle = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-right: 1.5rem;

  &:hover {
    & > svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const DropdownList = styled(motion.ul)<{ hasSubNav: boolean }>`
  margin: 0;
  position: absolute;
  margin-top: ${({ hasSubNav }) => (hasSubNav ? `-4.5rem` : `-1rem`)};
  list-style-type: none;
  list-style-image: none;
  top: 100%;
  width: auto;
  border-radius: 0.5em;
  background: ${(props) => props.theme.colors.dropdownBackground};
  border: 1px solid ${(props) => props.theme.colors.dropdownBorder};
  padding: 1rem 0;
`

const listVariants = {
  open: {
    opacity: 1,
    rotateX: 0,
    display: "block",
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    rotateX: -15,
    transitionEnd: {
      display: "none",
    },
  },
}

const NavListItem = styled.li`
  white-space: nowrap;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const DropdownItem = styled.li`
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.dropdownBackgroundHover};
  }
`

// TODO move to SharedStyles
const NavLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  color: ${(props) => props.theme.colors.text200};
  svg {
    fill: ${(props) => props.theme.colors.text200};
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const H2 = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding: 0 1rem;

  &:first-child {
    margin-top: 0;
  }

  color: ${(props) => props.theme.colors.text};
`

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
  section: ISection
  hasSubNav: boolean
}

const NavDropdown: React.FC<IProps> & {
  Item: typeof Item
  Link: typeof Link
  Title: typeof Title
} = ({ children, section, hasSubNav }) => {
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()
  const ref = createRef<HTMLLIElement>()

  const direction = getDirection(intl.locale as Lang)

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
      <NavListItem ref={ref} aria-label={translateMessageId(ariaLabel, intl)}>
        <DropdownTitle
          dir={direction}
          onClick={() => toggle()}
          onKeyDown={onKeyDownHandler}
          tabIndex={0}
          role="button"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <Translation id={section.text} />
          <StyledIcon isOpen={isOpen} name="chevronDown" />
        </DropdownTitle>

        <DropdownList
          hasSubNav={hasSubNav}
          animate={isOpen ? "open" : "closed"}
          variants={listVariants}
          initial="closed"
        >
          {children}
        </DropdownList>
      </NavListItem>
    </DropdownContext.Provider>
  )
}

interface IItemProp {
  isLast?: boolean
}

const Item: React.FC<IItemProp> = ({ children, isLast = false, ...rest }) => {
  const context = useContext(DropdownContext)

  return (
    <DropdownItem
      {...rest}
      onClick={() => context?.close()}
      onKeyDown={(e) => context?.tabInteractionHandler(e, isLast)}
    >
      {children}
    </DropdownItem>
  )
}

interface ITitleProps {}

const Title: React.FC<ITitleProps> = ({ children }) => {
  return <H2>{children}</H2>
}

NavDropdown.Item = Item
NavDropdown.Link = NavLink
NavDropdown.Title = Title

export default NavDropdown
