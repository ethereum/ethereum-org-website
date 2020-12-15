import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import Img from "gatsby-image"
import styled from "styled-components"
import { cloneDeep } from "lodash"

import NavDropdown from "./Dropdown"
import MobileNavMenu from "./Mobile"
import Link from "../Link"
import Icon from "../Icon"
import Search from "../Search"
import Translation from "../Translation"
import { NavLink } from "../../components/SharedStyledComponents"

import {
  translateMessageId,
  getLangContentVersion,
} from "../../utils/translations"

const NavContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100vw;
  /* xl breakpoint (1440px) + 72px (2rem padding on each side) */
  max-width: 1504px;
`

const StyledNav = styled.nav`
  height: ${(props) => props.theme.variables.navHeight};
  padding: 1rem 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* TODO use theme variable */
`

const SubNav = styled.nav`
  padding: 1rem 2rem;
  box-sizing: border-box;
  display: flex;
  background: ${(props) => props.theme.colors.ednBackground};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  /* TODO sort out mobile */
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const NavContent = styled.div`
  display: flex;
  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.xl};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    align-items: center;
    justify-content: space-between;
  }
`
const NavMobileButton = styled.span`
  outline: none;
  margin-left: 1rem;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavListItem = styled.li`
  white-space: nowrap;
  margin: 0;
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

const HomeLogoNavLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`

const HomeLogo = styled(Img)`
  opacity: 0.85;
  &:hover {
    opacity: 1;
  }
`

// Todo: opacity -> nudge on hover?

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

const MobileIcons = styled.div`
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: flex;
  }
`

const SearchIcon = styled(MenuIcon)`
  margin-right: 1rem;
`

// TODO display page title on mobile
const Nav = ({ handleThemeChange, isDarkTheme, path }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "eth-home-icon.png" }) {
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
      text: "page-index-section-individuals-item-two",
      ariaLabel: "nav-use-aria-label",
      items: [
        {
          text: "page-index-section-individuals-item-five",
          to: "/wallets/",
        },
        {
          text: "page-index-section-individuals-item-six",
          to: "/get-eth/",
        },
        {
          text: "page-dapps-title",
          to: "/dapps/",
        },
        {
          text: "page-stablecoins-title",
          to: "/stablecoins/",
        },
        {
          text: "page-stake-eth",
          to: "/eth2/staking/",
        },
      ],
    },
    {
      text: "page-index-section-learn-title",
      ariaLabel: "nav-learn-aria-label",
      items: [
        {
          text: "page-index-section-individuals-item-one",
          to: "/what-is-ethereum/",
        },
        {
          text: "page-index-section-individuals-item-four",
          to: "/eth/",
        },
        {
          text: "page-index-section-individuals-item-three",
          to: "/learn/",
        },
        {
          text: "nav-ethereum-history",
          to: "/history/",
        },
        {
          text: "nav-ethereum-whitepaper",
          to: "/whitepaper/",
        },
        {
          text: "page-eth2",
          to: "/eth2/",
        },
        {
          text: "nav-glossary",
          to: "/glossary/",
        },
        {
          text: "nav-eips",
          to: "/eips/",
        },
      ],
    },
    {
      text: "nav-developers",
      ariaLabel: "page-developers-aria-label",
      items: [
        {
          text: "page-developers-home",
          to: "/developers/",
        },
        {
          text: "nav-developers-docs-title",
          to: "/developers/docs/",
        },
        {
          text: "nav-developers-tutorials",
          to: "/developers/tutorials/",
        },
        {
          text: "nav-developers-learning-tools",
          to: "/developers/learning-tools/",
        },
        {
          text: "nav-developers-local-env",
          to: "/developers/local-environment/",
        },
      ],
    },
    {
      text: "nav-enterprise",
      ariaLabel: "nav-enterprise-aria-label",
      items: [
        {
          text: "nav-enterprise-public",
          to: "/enterprise/",
        },
        {
          text: "nav-enterprise-private",
          to: "/enterprise/private-ethereum/",
        },
      ],
    },
    {
      text: "nav-community",
      to: "/community/",
    },
  ]
  const ednLinks = [
    {
      text: "nav-developers-home",
      to: "/developers/",
      isPartiallyActive: false,
    },
    {
      text: "nav-developers-docs",
      to: "/developers/docs/",
    },
    {
      text: "nav-developers-tutorials",
      to: "/developers/tutorials/",
    },
    {
      text: "nav-developers-learning-tools",
      to: "/developers/learning-tools/",
    },
    {
      text: "nav-developers-local-env",
      to: "/developers/local-environment/",
    },
  ]
  let mobileLinkSections = cloneDeep(linkSections)

  const handleMenuToggle = (item) => {
    if (item === "menu") {
      setIsMenuOpen(!isMenuOpen)
    } else if (item === "search") {
      setIsSearchOpen(!isSearchOpen)
    } else {
      setIsMenuOpen(false)
      setIsSearchOpen(false)
    }
  }

  const shouldShowSubNav = path.includes("/developers/")

  return (
    <NavContainer>
      <StyledNav>
        <NavContent>
          <HomeLogoNavLink to="/">
            <HomeLogo
              fixed={data.file.childImageSharp.fixed}
              alt={translateMessageId("ethereum-logo", intl)}
            />
          </HomeLogoNavLink>
          {/* Desktop */}
          <InnerContent>
            <LeftItems>
              {linkSections.map((section, idx) => {
                if (section.items) {
                  return (
                    <NavDropdown
                      section={section}
                      key={idx}
                      hasSubNav={shouldShowSubNav}
                    />
                  )
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
            isMenuOpen={isMenuOpen}
            isSearchOpen={isSearchOpen}
            isDarkTheme={isDarkTheme}
            toggleMenu={handleMenuToggle}
            toggleTheme={handleThemeChange}
            linkSections={mobileLinkSections}
          />
          <MobileIcons>
            <NavMobileButton
              onClick={() => handleMenuToggle("search")}
              onKeyDown={() => handleMenuToggle("search")}
              role="button"
              tabIndex="0"
            >
              <SearchIcon name="search" />
            </NavMobileButton>

            <NavMobileButton
              onClick={() => handleMenuToggle("menu")}
              onKeyDown={() => handleMenuToggle("menu")}
              role="button"
              tabIndex="0"
            >
              <MenuIcon name="menu" />
            </NavMobileButton>
          </MobileIcons>
        </NavContent>
      </StyledNav>

      {shouldShowSubNav && (
        <SubNav>
          {ednLinks.map((link, idx) => {
            return (
              <NavLink
                key={idx}
                to={link.to}
                isPartiallyActive={link.isPartiallyActive}
              >
                <Translation id={link.text} />
              </NavLink>
            )
          })}
        </SubNav>
      )}
    </NavContainer>
  )
}

export default Nav
