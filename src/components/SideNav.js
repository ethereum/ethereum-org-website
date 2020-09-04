import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import Icon from "./Icon"
import Link from "./Link"

const links = [
  {
    title: `Accounts`,
    to: `/edn/learn/accounts/`,
  },
  {
    title: `Smart contracts`,
    to: `/edn/learn/smart-contracts/`,
    items: [
      {
        title: `Smart contract languages`,
        to: `/edn/learn/smart-contracts/languages/`,
      },
      {
        title: `Smart contract anatomy`,
        to: `/edn/learn/smart-contracts/anatomy/`,
      },
    ],
  },
  {
    title: `EVM`,
    to: `/edn/learn/evm/`,
  },
]

const IconContainer = styled.div`
  cursor: pointer;
`
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
  justify-content: space-between;
  padding: 0.5rem 1rem 0.5rem 2rem;
  &:hover {
    color: ${(props) => props.theme.colors.primary};
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

const NavItem = styled.div``

// TODO inner links flash on navigation...
// Some issue w/ re-render on route change?
const NavLink = ({ item, path }) => {
  const isLinkPartiallyActive = path.includes(item.to)
  const [isOpen, setIsOpen] = useState(isLinkPartiallyActive)

  if (item.items) {
    return (
      <NavItem>
        <LinkContainer>
          <SideNavLink to={item.to}>{item.title} </SideNavLink>
          <IconContainer onClick={() => setIsOpen(!isOpen)}>
            <StyledIcon isOpen={isOpen} name="chevronDown" />
          </IconContainer>
        </LinkContainer>
        <InnerLinks
          key={item.title}
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
        <SideNavLink to={item.to}>{item.title}</SideNavLink>
      </LinkContainer>
    </NavItem>
  )
}

const SideNav = ({ path }) => {
  return (
    <Aside>
      {links.map((item, idx) => (
        <NavLink item={item} path={path} key={idx} />
      ))}
    </Aside>
  )
}

export default SideNav
