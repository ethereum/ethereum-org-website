import React, { useState, createRef } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import { motion } from "framer-motion"

import Translation from "../Translation"
import Icon from "../Icon"
import Link from "../Link"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"

const StyledIcon = styled(Icon)`
  transform: ${(props) => (props.isOpen ? `rotate(180deg)` : ``)};
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

// TODO why slightly below?
const DropdownList = styled(motion.ul)`
  margin: 0;
  position: absolute;
  list-style-type: none;
  list-style-image: none;
  top: 100%;
  width: auto;
  border-radius: 0.5em;
  background: ${(props) => props.theme.colors.dropdownBackground};
  border: 1px solid ${(props) => props.theme.colors.dropdownBorder};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
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

// TODO move to shared space w/ Nav
const NavListItem = styled.li`
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

const NavLink = styled(Link)`
  display: block;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const NavDropdown = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()
  const ref = createRef()

  useOnClickOutside(ref, () => setIsOpen(false))

  return (
    <NavListItem
      ref={ref}
      aria-label={`Select ${intl.formatMessage({
        id: section.text,
      })}`}
    >
      <DropdownTitle onClick={() => setIsOpen(!isOpen)} tabIndex="0">
        <Translation id={section.text} />
        <StyledIcon isOpen={isOpen} name="chevronDown" />
      </DropdownTitle>
      <DropdownList
        animate={isOpen ? "open" : "closed"}
        variants={listVariants}
        initial="closed"
      >
        {section.items
          .filter((item) => item.shouldDisplay)
          .map((item, idx) => {
            return (
              <DropdownItem key={idx} onClick={() => setIsOpen(false)}>
                <NavLink to={item.to} tabIndex="-1">
                  <Translation id={item.text} />
                </NavLink>
              </DropdownItem>
            )
          })}
      </DropdownList>
    </NavListItem>
  )
}

export default NavDropdown
