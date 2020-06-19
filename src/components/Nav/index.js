import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import NavDropdown from "./Dropdown"
import MobileNavMenu from "./Mobile"
import Link from "../Link"
import Icon from "../Icon"
import Search from "../Search"
import Translation from "../Translation"

const StyledNav = styled.nav`
  padding: 1rem 2rem;
  box-sizing: border-box;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`

const NavContent = styled.div`
  display: flex;
  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.xl};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    justify-content: space-between;
  }
`

const InnerContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const LeftItems = styled.ul`
  margin: 0;
  margin-left: 2rem;
  display: flex;
  align-items: center;
  list-style-type: none;
  list-style-image: none;
`

const RightItems = styled.div`
  margin: 0;
  margin-left: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavListItem = styled.li`
  margin: 0;
`

const NavLink = styled(Link)`
  margin-right: 2rem;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`
const RightNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-right: 0;
  margin-left: 1rem;

  &:hover {
    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const HomeLogo = styled(Img)`
  opacity: 0.85;
  &:hover {
    opacity: 1;
  }
`

const Span = styled.span`
  padding-left: 0.5rem;
`

const ThemeToggle = styled.span`
  cursor: pointer;
  margin-left: 1rem;
  display: flex;
  align-items: center;
`

const MenuIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: block;
    cursor: pointer;
  }
`

const linkSections = [
  { text: "page-home", to: "/", hideMobile: true },
  {
    text: "page-individuals",
    ariaLabel: "page-individuals-aria-label",
    items: [
      {
        text: "page-home-section-individuals-item-one",
        to: "/what-is-ethereum/",
      },
      {
        text: "page-home-section-individuals-item-four",
        to: "/eth/",
      },
      {
        text: "page-home-section-individuals-item-two",
        to: "/dapps/",
      },
      {
        text: "page-home-section-individuals-item-five",
        to: "/wallets/",
      },
      {
        text: "page-home-section-individuals-item-three",
        to: "/learn/",
      },
      { text: "page-community", to: "/community/" },
    ],
  },
  {
    text: "page-developers",
    ariaLabel: "page-developers-aria-label",
    items: [
      {
        text: "get-started",
        to: "/build/",
      },
      {
        text: "ethereum-studio",
        to: "https://studio.ethereum.org/",
      },
      {
        text: "developer-resources",
        to: "/developers/",
      },
    ],
  },
  { text: "page-enterprise", to: "/enterprise/" },
]

const Nav = ({ handleThemeChange, isDarkTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "ethereum-logo-wireframe.png" }) {
        childImageSharp {
          fixed(width: 22) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <StyledNav>
      <NavContent>
        <Link to="/en/">
          <HomeLogo
            fixed={data.file.childImageSharp.fixed}
            alt={"Ethereum logo"}
          />
        </Link>
        {/* Desktop */}
        <InnerContent>
          <LeftItems>
            {linkSections.map((section, idx) => {
              if (section.items) {
                return <NavDropdown section={section} key={idx} />
              }
              return (
                <NavListItem key={idx}>
                  <NavLink to={section.to}>
                    <Translation id={section.text} />
                  </NavLink>
                </NavListItem>
              )
            })}
          </LeftItems>
          <RightItems>
            <Search />
            <ThemeToggle onClick={handleThemeChange}>
              <Icon name={isDarkTheme ? "darkTheme" : "lightTheme"} />
            </ThemeToggle>
            <RightNavLink to="/en/languages/">
              <Icon name="language" />
              <Span>Languages</Span>
            </RightNavLink>
          </RightItems>
        </InnerContent>
        {/* Mobile */}
        <MobileNavMenu
          isOpen={isMenuOpen}
          isDarkTheme={isDarkTheme}
          toggleMenu={handleMenuToggle}
          toggleTheme={handleThemeChange}
          linkSections={linkSections}
        />
        <span onClick={handleMenuToggle}>
          <MenuIcon name="menu" />
        </span>
      </NavContent>
    </StyledNav>
  )
}

export default Nav
