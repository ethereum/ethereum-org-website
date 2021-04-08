import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import Icon from "./Icon"
import Link from "./Link"
import Translation from "./Translation"
import { dropdownIconContainerVariant } from "./SharedStyledComponents"

import docLinks from "../data/developer-docs-links.yaml"

const IconContainer = styled(motion.div)`
  cursor: pointer;
`

const Nav = styled.nav`
  position: sticky;
  top: 7.25rem; /* account for navbar */
  padding: 2rem 0 4rem;
  height: calc(100vh - 80px); /* TODO take footer into account for height? */
  width: calc((100% - 1448px) / 2 + 298px);
  min-width: 298px;
  overflow-y: auto;
  transition: all 0.2s ease-in-out;
  transition: transform 0.2s ease;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.1);
  border-right: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const InnerLinks = styled(motion.div)`
  font-size: ${(props) => props.theme.fontSizes.s};
  line-height: 1.6;
  font-weight: 400;
  margin-left: 1rem;
`
const innerLinksVariants = {
  open: {
    opacity: 1,
    display: "block",
  },
  closed: {
    opacity: 0,
    display: "none",
  },
}

const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem 0.5rem 2rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.ednBackground};
  }
`
const SideNavLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`
const SideNavGroup = styled.div`
  width: 100%;
  cursor: pointer;
`

const NavItem = styled.div``

const NavLink = ({ item, path }) => {
  const isLinkInPath = path.includes(item.to) || path.includes(item.path)
  const [isOpen, setIsOpen] = useState(isLinkInPath)

  useEffect(() => {
    // Only set on items that contain a link
    // Otherwise items w/ `path` would re-open every path change
    if (item.to) {
      const shouldOpen = path.includes(item.to) || path.includes(item.path)
      setIsOpen(shouldOpen)
    }
  }, [path, item.path, item.to])

  if (item.items) {
    return (
      <NavItem>
        <LinkContainer>
          {item.to && (
            <SideNavLink to={item.to} isPartiallyActive={false}>
              <Translation id={item.id} />
            </SideNavLink>
          )}
          {!item.to && (
            <SideNavGroup onClick={() => setIsOpen(!isOpen)}>
              <Translation id={item.id} />
            </SideNavGroup>
          )}
          <IconContainer
            onClick={() => setIsOpen(!isOpen)}
            variants={dropdownIconContainerVariant}
            animate={isOpen ? "open" : "closed"}
          >
            <Icon name="chevronDown" />
          </IconContainer>
        </LinkContainer>
        <InnerLinks
          key={item.id}
          animate={isOpen ? "open" : "closed"}
          variants={innerLinksVariants}
          initial="closed"
        >
          {item.items.map((childItem, idx) => (
            <NavLink item={childItem} path={path} key={idx} />
          ))}
        </InnerLinks>
      </NavItem>
    )
  }
  return (
    <NavItem>
      <LinkContainer>
        <SideNavLink to={item.to} isPartiallyActive={false}>
          <Translation id={item.id} />
        </SideNavLink>
      </LinkContainer>
    </NavItem>
  )
}

// TODO set tree state based on if current path is a child
// of the given parent. Currently all `path` items default to open
// and they only collapse when clicked on.
// e.g. solution: https://github.com/hasura/gatsby-gitbook-starter/blob/5c165af40e48fc55eb06b45b95c84eb64b17ed32/src/components/sidebar/tree.js
const SideNav = ({ path }) => (
  <Nav>
    {docLinks.map((item, idx) => (
      <NavLink item={item} path={path} key={idx} />
    ))}
  </Nav>
)

export default SideNav
