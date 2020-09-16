import React, { useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

import Icon from "./Icon"
import Link from "./Link"
import { supportedLanguages } from "../utils/translations"

// To display item as a collapsable directory vs. a link,
// add a `path` property (of the directory), not a `to` property
const links = [
  {
    title: "README",
    to: "/developers/docs/",
  },
  {
    title: "Foundational topics",
    path: "/developers/docs/",
    items: [
      {
        title: "Intro to Ethereum",
        to: "/developers/docs/intro-to-ethereum/",
      },
      {
        title: "Intro to dapps",
        to: "/developers/docs/dapps/",
      },
      {
        title: "Web2 vs Web3",
        to: "/developers/docs/web2-vs-web3/",
      },
      {
        title: `Accounts`,
        to: `/developers/docs/accounts/`,
      },
      {
        title: "Transactions",
        to: "/developers/docs/transactions/",
      },
      {
        title: "Ethereum virtual machine (EVM)",
        to: "/developers/docs/evm/",
      },
      {
        title: "Gas",
        to: "/developers/docs/gas/",
      },
      {
        title: "Blocks",
        to: "/developers/docs/blocks/",
      },
      {
        title: "Mining",
        to: "/developers/docs/mining/",
      },
      {
        title: "Networks",
        to: "/developers/docs/networks/",
      },
      {
        title: "Nodes and clients",
        to: "/developers/docs/nodes-and-clients/",
      },
    ],
  },
  {
    title: "Ethereum stack",
    path: "/developers/docs/",
    items: [
      {
        title: "Intro to the stack",
        to: "/developers/docs/ethereum-stack/",
      },
      {
        title: `Smart contracts`,
        to: `/developers/docs/smart-contracts/`,
        items: [
          {
            title: `Smart contract languages`,
            to: `/developers/docs/smart-contracts/languages/`,
          },
          {
            title: `Smart contract anatomy`,
            to: `/developers/docs/smart-contracts/anatomy/`,
          },
          {
            title: "Testing smart contracts",
            to: "/developers/docs/smart-contracts/testing-smart-contracts/",
          },
          {
            title: "Compiling smart contracts",
            to: "/developers/docs/smart-contracts/compiling-smart-contracts/",
          },
          {
            title: "Deploying smart contracts",
            to: "/developers/docs/smart-contracts/deploying-smart-contracts/",
          },
        ],
      },
      {
        title: "JavaScript client libraries",
        to: "/developers/docs/javascript-client-libraries/",
      },
      {
        title: "Data and analytics",
        path: "/developers/docs/",
        items: [
          {
            title: "Block explorers",
            to: "/developers/docs/data-and-analytics/block-explorers/",
          },
        ],
      },
      {
        title: "Security",
        to: "/developers/docs/security/",
      },
      {
        title: "Storage",
        to: "/developers/docs/storage/",
      },
      {
        title: "Development frameworks",
        to: "/developers/docs/frameworks/",
      },
      {
        title: "Development environments",
        to: "/developers/docs/IDEs/",
      },
      {
        title: "Programming languages",
        to: "/developers/docs/programming-languages/",
        items: [
          {
            title: "Delphi",
            to: "/developers/docs/programming-languages/delphi/",
          },
          {
            title: ".NET",
            to: "/developers/docs/programming-languages/dot-net/",
          },
          {
            title: "Golang",
            to: "/developers/docs/programming-languages/golang/",
          },
          {
            title: "Java",
            to: "/developers/docs/programming-languages/java/",
          },
          {
            title: "Javascript",
            to: "/developers/docs/programming-languages/javascript/",
          },
          {
            title: "Python",
            to: "/developers/docs/programming-languages/python/",
          },
          {
            title: "Rust",
            to: "/developers/docs/programming-languages/rust/",
          },
        ],
      },
    ],
  },
  {
    title: "Advanced",
    path: "/developers/docs/",
    items: [
      {
        title: "Token standards",
        to: "/developers/docs/tokens/",
      },
      {
        title: "Oracles",
        to: "/developers/docs/oracles/",
      },
      {
        title: "Scaling",
        to: "/developers/docs/layer-2-scaling/",
      },
    ],
  },
]

// Traverse all links to find page title
const getPageTitle = (to, links) => {
  let linksArr = Array.isArray(links) ? links : [links]
  for (const link of linksArr) {
    if (link.to === to) {
      return link.title
    }
    if (link.items) {
      let pageTitle = getPageTitle(to, link.items)
      if (pageTitle) {
        return pageTitle
      }
    }
  }
}

const Container = styled.div`
  margin-top: 75px; /* account for mobile nav */
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
  overflow-y: auto;
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
              {item.title}
            </SideNavLink>
          )}
          {!item.to && (
            <SideNavGroup onClick={() => setIsOpen(!isOpen)}>
              {item.title}
            </SideNavGroup>
          )}
          <IconContainer
            onClick={() => setIsOpen(!isOpen)}
            variants={{
              open: {
                rotate: 0,
                transition: {
                  duration: 0.4,
                },
              },
              closed: { rotate: -90 },
            }}
            animate={isOpen ? "open" : "closed"}
          >
            <Icon name="chevronDown" />
          </IconContainer>
        </LinkContainer>
        <InnerLinks
          key={item.title}
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
          {item.title}
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
  let pageTitle = getPageTitle(pagePath, links)
  if (!pageTitle) {
    console.warn(`No title found for "pagePath": `, pagePath)
    pageTitle = `Change page`
  }
  return (
    <Container>
      <SelectContainer onClick={() => setIsOpen(!isOpen)}>
        <PageTitle>{pageTitle}</PageTitle>
        <IconContainer
          variants={{
            open: {
              rotate: 0,
              transition: {
                duration: 0.4,
              },
            },
            closed: { rotate: -90 },
          }}
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
            {links.map((item, idx) => (
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
