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
      text: "page-home-section-individuals-item-two",
      ariaLabel: "nav-use-aria-label",
      shouldDisplay: contentVersion > 1.1,
      items: [
        {
          text: "page-home-section-individuals-item-five",
          to: "/wallets/",
          shouldDisplay: contentVersion > 1,
        },
        {
          text: "page-home-section-individuals-item-six",
          to: "/get-eth/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "page-dapps-title",
          to: "/dapps/",
          shouldDisplay: contentVersion > 1,
        },
        {
          text: "page-stablecoins-title",
          to: "/stablecoins/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "page-stake-eth",
          to: "/eth2/staking/",
          shouldDisplay: contentVersion > 1.1,
        },
      ],
    },
    {
      text: "page-home-section-learn-title",
      ariaLabel: "nav-learn-aria-label",
      shouldDisplay: contentVersion > 1.1,
      items: [
        {
          text: "page-home-section-individuals-item-one",
          to: "/what-is-ethereum/",
          shouldDisplay: contentVersion > 1,
        },
        {
          text: "page-home-section-individuals-item-four",
          to: "/eth/",
          shouldDisplay: contentVersion > 1,
        },
        {
          text: "page-home-section-individuals-item-three",
          to: "/learn/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "footer-ethereum-history",
          to: "/history/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "footer-ethereum-whitepaper",
          to: "/whitepaper/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "page-eth2",
          to: "/eth2/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "page-glossary",
          to: "/glossary/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "footer-eips",
          to: "/eips/",
          shouldDisplay: contentVersion > 1.1,
        },
      ],
    },
    {
      text: "page-individuals",
      ariaLabel: "page-individuals-aria-label",
      shouldDisplay: contentVersion === 1.1,
      items: [
        {
          text: "page-home-section-individuals-item-one",
          to: "/what-is-ethereum/",
          shouldDisplay: contentVersion > 1,
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
        {
          text: "page-eth2",
          to: "/eth2/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "page-glossary",
          to: "/glossary/",
          shouldDisplay: contentVersion > 1.1,
        },
      ],
    },
    {
      text: "page-developers",
      ariaLabel: "page-developers-aria-label",
      shouldDisplay: contentVersion === 1.1,
      items: [
        {
          text: "get-started",
          to: "/build/",
          shouldDisplay: contentVersion > 1,
        },
        {
          text: "ethereum-studio",
          to: "/en/studio/",
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
      text: "page-developers",
      ariaLabel: "page-developers-aria-label",
      shouldDisplay: contentVersion > 1.1,
      items: [
        {
          text: "page-developers-home",
          to: "/developers/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "edn-docs-title",
          to: "/developers/docs/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "edn-tutorials",
          to: "/developers/tutorials/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "edn-learning-tools",
          to: "/developers/learning-tools/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "edn-local-env",
          to: "/developers/local-environment/",
          shouldDisplay: contentVersion > 1.1,
        },
      ],
    },
    {
      text: "page-enterprise",
      to: "/enterprise/",
      shouldDisplay: contentVersion === 1.1,
    },
    {
      text: "page-enterprise",
      ariaLabel: "page-enterprise-aria-label",
      shouldDisplay: contentVersion > 1.1,
      items: [
        {
          text: "page-enterprise-public",
          to: "/enterprise/",
          shouldDisplay: contentVersion > 1.1,
        },
        {
          text: "page-enterprise-private",
          to: "/enterprise/private-ethereum/",
          shouldDisplay: contentVersion > 1.1,
        },
      ],
    },
    {
      text: "page-community",
      to: "/community/",
      shouldDisplay: contentVersion > 1.1,
    },
  ]
  const ednLinks = [
    {
      text: "edn-home",
      to: "/developers/",
      isPartiallyActive: false,
      shouldDisplay: contentVersion > 1.1,
    },
    {
      text: "edn-docs",
      to: "/developers/docs/",
      shouldDisplay: contentVersion > 1.1,
    },
    {
      text: "edn-tutorials",
      to: "/developers/tutorials/",
      shouldDisplay: contentVersion > 1.1,
    },
    {
      text: "edn-learning-tools",
      to: "/developers/learning-tools/",
      shouldDisplay: contentVersion > 1.1,
    },
    {
      text: "edn-local-env",
      to: "/developers/local-environment/",
      shouldDisplay: contentVersion > 1.1,
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

  const shouldShowSubNav = path.includes("/developers/") && contentVersion > 1.1

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
              {linkSections
                .filter((section) => section.shouldDisplay)
                .map((section, idx) => {
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
