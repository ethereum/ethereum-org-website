import React, { useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

import Icon from "./Icon"
import Link from "./Link"
import Translation from "./Translation"
import { supportedLanguages } from "../utils/translations"
import { dropdownIconContainerVariant } from "./SharedStyledComponents"

import docLinks from "../data/developer-docs-links.yaml"

// Traverse all links to find page id
const getPageTitleId = (to, links) => {
  let linksArr = Array.isArray(links) ? links : [links]
  for (const link of linksArr) {
    if (link.to === to) {
      return link.id
    }
    if (link.items) {
      let pageTitle = getPageTitleId(to, link.items)
      if (pageTitle) {
        return pageTitle
      }
    }
  }
}

const Container = styled.div`
  position: sticky;
  z-index: 2; /* Prevents header overlap */
  top: 75px; /* account for mobile nav */
  background-color: ${(props) => props.theme.colors.ednBackground};
  height: auto;
  width: 100%;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`
const SelectContainer = styled(motion.div)`
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  padding: 1rem 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.ednBackground};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`
const PageTitle = styled.div`
  margin-right: 0.5rem;
`

const Nav = styled(motion.nav)`
  height: auto;
  max-height: calc(100vh - 139px); /* full height minus primary nav */
  overflow-y: scroll;
  overflow-x: hidden;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 0.5rem;
`

const InnerLinks = styled(motion.div)`
  font-size: ${(props) => props.theme.fontSizes.s};
  line-height: 1.6;
  font-weight: 400;
  padding-left: 1rem;
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
  padding: 0.5rem 2rem 0.5rem 0.5rem;
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
const IconContainer = styled(motion.div)`
  cursor: pointer;
`
const NavItem = styled.div``

const NavLink = ({ item, path, toggle }) => {
  const [isOpen, setIsOpen] = useState(false)

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
            <NavLink item={childItem} path={path} key={idx} toggle={toggle} />
          ))}
        </InnerLinks>
      </NavItem>
    )
  }
  return (
    <NavItem onClick={toggle}>
      <LinkContainer>
        <SideNavLink to={item.to} isPartiallyActive={false}>
          <Translation id={item.id} />
        </SideNavLink>
      </LinkContainer>
    </NavItem>
  )
}

// TODO consolidate into SideNav
const SideNavMobile = ({ path }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Strip language path
  let pagePath = path
  if (supportedLanguages.includes(pagePath.split("/")[1])) {
    pagePath = pagePath.substring(3)
  }
  let pageTitleId = getPageTitleId(pagePath, docLinks)
  if (!pageTitleId) {
    console.warn(`No id found for "pagePath": `, pagePath)
    pageTitleId = `Change page`
  }
  return (
    <Container>
      <SelectContainer onClick={() => setIsOpen(!isOpen)}>
        <PageTitle>
          <Translation id={pageTitleId} />
        </PageTitle>
        <IconContainer
          variants={dropdownIconContainerVariant}
          animate={isOpen ? "open" : "closed"}
        >
          <Icon name="chevronDown" />
        </IconContainer>
      </SelectContainer>
      <AnimatePresence>
        {isOpen && (
          <Nav
            key="nav"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              display: "block",
              transition: {
                duration: 1,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.4,
              },
            }}
          >
            {docLinks.map((item, idx) => (
              <NavLink
                item={item}
                path={path}
                key={idx}
                toggle={() => setIsOpen(false)}
              />
            ))}
          </Nav>
        )}
      </AnimatePresence>
    </Container>
  )
}

export default SideNavMobile
