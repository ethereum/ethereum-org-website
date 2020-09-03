import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import Icon from "./Icon"
import Link from "./Link"
import navLinks from "../data/sidenav-links.yaml"

// TODO clicking on the Icon
// should open the links but should NOT navigate to link
const StyledIcon = styled(Icon)`
  transform: ${(props) => (props.isOpen ? `` : `rotate(270deg)`)};
`

const Aside = styled.aside`
  position: sticky;
  top: 6.25rem; /* account for navbar */
  padding: 4rem 0 2rem;
  /* TODO take footer into account for height? */
  height: calc(100vh - 80px);
  overflow-y: auto;
  transition: all 0.2s ease-in-out;
  transition: transform 0.2s ease;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.1);

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }

  /* Gitbook styles */
  /* flex: 0 0 auto; */
  width: calc((100% - 1448px) / 2 + 298px);
  /* display: flex; */
  /* z-index: 15; */
  min-width: 298px;
  /* align-items: stretch; */
  /* border-right: 1px solid #e6ecf1; */
  /* flex-direction: column; */
  /* padding-left: calc((100% - 1448px) / 2); */
`

// TODO InnerLinks should display if current route matches
const InnerLinks = styled(motion.div)`
  font-size: ${(props) => props.theme.fontSizes.s};
  line-height: 1.6;
  font-weight: 400;
  padding-right: 0.25rem;
  padding-left: 1rem;
`
const innerLinksVariants = {
  open: {
    opacity: 1,
    display: "block",
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
}

const SideNavLink = styled(Link)`
  width: 100%;
  display: flex !important;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  text-decoration: none;
  position: relative;
  display: inline-block;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.white600};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`

const ParentLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const NavItem = styled.div``

const NavLinks = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false)

  return items.map((item, index) => {
    if (item.items) {
      return (
        <NavItem key={index} onClick={() => setIsOpen(!isOpen)}>
          {/* TODO clickin link should open */}
          <SideNavLink to={item.link}>
            <span>{item.title} </span>
            <StyledIcon isOpen={isOpen} name="chevronDown" />
          </SideNavLink>
          <InnerLinks
            key={item.title}
            animate={isOpen ? "open" : "closed"}
            variants={innerLinksVariants}
            initial="closed"
          >
            <NavLinks items={item.items} />
          </InnerLinks>
        </NavItem>
      )
    }
    return (
      <NavItem key={index}>
        <SideNavLink to={item.link}>
          <span>{item.title}</span>
        </SideNavLink>
      </NavItem>
    )
  })
}

const SideNav = () => {
  return (
    <Aside>
      <NavLinks items={navLinks[0].items} />
    </Aside>
  )
}

export default SideNav
