import React, { useState } from "react"
import styled from "styled-components"
import { FormattedMessage } from "gatsby-plugin-intl"
import { motion } from "framer-motion"

import Icon from "../Icon"
import Link from "../Link"

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

const DropdownList = styled(motion.ul)`
  position: absolute;
  list-style-type: none;
  list-style-image: none;
  top: 100%;
  width: auto;
  border-radius: 0.5em;
  background: #fff;
  border: 1px solid #e5e5e5;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`

const listVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.5,
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
  & > svg {
    fill: ${(props) => props.theme.colors.primary};
  }
`

const NavLink = styled(Link)`
  margin-right: 2rem;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const NavDropdown = ({ section, idx }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <NavListItem key={idx}>
      <DropdownTitle onClick={handleToggle} tabIndex="0">
        <FormattedMessage id={section.text} />
        <StyledIcon isOpen={isOpen} name="chevron-down" />
      </DropdownTitle>
      <DropdownList
        animate={isOpen ? "open" : "closed"}
        variants={listVariants}
        initial="closed"
      >
        {section.items.map((item, idx) => {
          return (
            <NavListItem key={idx}>
              <NavLink to={item.to} tabIndex="-1">
                <FormattedMessage id={item.text} />
              </NavLink>
            </NavListItem>
          )
        })}
      </DropdownList>
    </NavListItem>
  )
}

export default NavDropdown
