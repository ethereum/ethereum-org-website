import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import Img from "gatsby-image"
import styled from "styled-components"

import NavDropdown from "./Dropdown"
import MobileNavMenu from "./Mobile"
import Link from "../Link"
import Icon from "../Icon"
import Search from "../Search"
import Translation from "../Translation"
import { getLangContentVersion } from "../../utils/translations"

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
  text-decoration: none;
  margin-right: 2rem;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`
const RightNavLink = styled(NavLink)`
  text-decoration: none;
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

const NavIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
`

const MenuIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: block;
    cursor: pointer;
  }
`

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
  const intl = useIntl()
  const contentVersion = getLangContentVersion(intl.locale)

  const linkSections = [
    {
      text: "page-home",
      to: "/",
      shouldDisplay: true,
      isPartiallyActive: false,
    },
    {
      text: "page-beginners",
      to: `/what-is-ethereum/`,
      shouldDisplay: contentVersion < 1.1,
    },
    {
      text: "page-use",
      to: `/use/`,
      shouldDisplay: contentVersion < 1.1,
    },
    {
      text: "page-learn",
      to: `/learn/`,
      shouldDisplay: contentVersion < 1.1,
    },
    {
      text: "page-individuals",
      ariaLabel: "page-individuals-aria-label",
      shouldDisplay: contentVersion > 1,
      items: [
        {
          text: "page-home-section-individuals-item-one",
          to: "/what-is-ethereum/",
          shouldDisplay: contentVersion > 1,
        },
        {
          text: "page-eth2",
          to: "/eth2/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "page-home-section-individuals-item-four",
          to: "/eth/",
          shouldDisplay: contentVersion > 1,
        },
        {
          text: "page-home-section-individuals-item-six",
          to: "/get-eth/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "page-home-section-individuals-item-two",
          to: "/dapps/",
          shouldDisplay: contentVersion > 1,
        },
        {
          text: "page-home-section-individuals-item-five",
          to: "/wallets/",
          shouldDisplay: contentVersion > 1,
        },
        {
          text: "page-home-section-individuals-item-three",
          to: "/learn/",
          shouldDisplay: contentVersion > 1,
        },
        {
          text: "page-community",
          to: "/community/",
          shouldDisplay: contentVersion > 1.1,
        },
      ],
    },
    {
      text: "page-developers",
      ariaLabel: "page-developers-aria-label",
      shouldDisplay: true,
      items: [
        {
          text: "get-started",
          to: "/build/",
          shouldDisplay: contentVersion > 1,
        },
        {
          text: "ethereum-studio",
          to: "https://studio.ethereum.org/",
          shouldDisplay: true,
        },
        {
          text: "developer-resources",
          to: "/developers/",
          shouldDisplay: true,
        },
      ],
    },
    {
      text: "page-enterprise",
      to: "/enterprise/",
      shouldDisplay: contentVersion > 1,
    },
  ]

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
            {linkSections
              .filter((section) => section.shouldDisplay)
              .map((section, idx) => {
                if (section.items) {
                  return <NavDropdown section={section} key={idx} />
                }
                return (
                  <NavListItem key={idx}>
                    <NavLink
                      to={section.to}
                      isPartiallyActive={section.isPartiallyActive}
                    >
                      <Translation id={section.text} />
                    </NavLink>
                  </NavListItem>
                )
              })}
          </LeftItems>
          <RightItems>
            <Search />
            <ThemeToggle onClick={handleThemeChange}>
              <NavIcon name={isDarkTheme ? "darkTheme" : "lightTheme"} />
            </ThemeToggle>
            <RightNavLink to="/en/languages/">
              <NavIcon name="language" />
              <Span>
                <Translation id="languages" />
              </Span>
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
