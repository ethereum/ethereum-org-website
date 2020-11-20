import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import Img from "gatsby-image"
import styled from "styled-components"
import Emoji from "../Emoji"
import { cloneDeep } from "lodash"
import { motion } from "framer-motion"
import NavDropdown from "./Dropdown"
import MobileNavMenu from "./Mobile"
import Link from "../Link"
import Icon from "../Icon"
import Search from "../Search"
import Translation from "../Translation"
import { getLangContentVersion } from "../../utils/translations"

const NavContainer = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100vw;
  /* xl breakpoint (1440px) + 72px (2rem padding on each side) */
  max-width: 1504px;
`

const SearchModal = styled(motion.div)`
  position: fixed;
  background: ${(props) => props.theme.colors.modalBackground};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const mobileModalVariants = {
  open: { display: "block" },
  closed: { display: "none" },
}

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
  &.active {
    font-weight: bold;
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

const Span = styled.span`
  padding-left: 0.5rem;
`

const mobileMenuVariants = {
  closed: { x: `-100%`, transition: { duration: 0.2 } },
  open: { x: 0, transition: { duration: 0.8 } },
}

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

const MenuContainer = styled(motion.div)`
  background: ${(props) => props.theme.colors.background};
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  overflow: hidden;
  width: 100%;
  max-width: 450px;
`

const SearchContainer = styled(MenuContainer)`
  z-index: 101;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`

const searchContainerVariants = {
  closed: { x: `-100%`, transition: { duration: 0.2 } },
  open: { x: 0, transition: { duration: 0.8 } },
}

const SearchHeader = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > svg {
    fill: ${(props) => props.theme.colors.text};
  }
`

const ChevronLeftIcon = styled(Icon)`
  transform: rotate(90deg);
`

const BlankSearchState = styled.div`
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.searchBackgroundEmpty};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vw;
  align-self: center;
  width: 280px;
  width: min(60vw, 280px);
  height: 280px;
  height: min(60vw, 280px);
  border-radius: 100%;
`

const CloseIconContainer = styled.span`
  z-index: 102;
  cursor: pointer;

  & > svg {
    fill: ${(props) => props.theme.colors.text};
  }
`

const MobileIcons = styled.div`
  display: flex;
`

const SearchIcon = styled(MenuIcon)`
  margin-right: 1rem;
`

// TODO display page title on mobile
const Nav = ({ handleThemeChange, isDarkTheme, path, toggleMenu, isOpen }) => {
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
    {
      text: "page-glossary",
      to: "/glossary/",
      shouldDisplay: contentVersion > 1.1,
    },
  ]
  let mobileLinkSections = cloneDeep(linkSections)

  // If contentVersion includes EDN (>1.1), strip out Developers links
  // for desktop nav (those versions use SubNav instead) and
  // add EDN links to mobile nav
  if (contentVersion > 1.1) {
    linkSections.splice(5, 1, {
      text: "page-developers",
      to: "/developers/",
      ariaLabel: "page-developers-aria-label",
      shouldDisplay: true,
    })
    mobileLinkSections.splice(5, 1, {
      text: "page-developers",
      ariaLabel: "page-developers-aria-label",
      shouldDisplay: true,
      items: ednLinks,
    })
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const shouldShowSubNav = path.includes("/developers/") && contentVersion > 1.1
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleClose = () => {
    toggleMenu()
    setIsSearchOpen(false)
  }

  return (
    <NavContainer>
      <StyledNav>
        <NavContent>
          <HomeLogoNavLink to="/en/">
            <HomeLogo
              fixed={data.file.childImageSharp.fixed}
              alt={"Ethereum logo"}
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
            isOpen={isMenuOpen}
            isDarkTheme={isDarkTheme}
            toggleMenu={handleMenuToggle}
            toggleTheme={handleThemeChange}
            linkSections={mobileLinkSections}
          />
          <MobileIcons>
            <SearchModal
              animate={isSearchOpen ? "open" : "closed"}
              variants={mobileModalVariants}
              initial="closed"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            ></SearchModal>
            <SearchContainer
              animate={isSearchOpen ? "open" : "closed"}
              variants={mobileMenuVariants}
              initial="closed"
            >
              <SearchHeader>
                <span>
                  <Translation id="search" />
                </span>
                <CloseIconContainer onClick={() => setIsSearchOpen(false)}>
                  <Icon name="close" />
                </CloseIconContainer>
              </SearchHeader>
              <Search handleSearchSelect={handleClose} />
              <BlankSearchState>
                <Emoji text=":sailboat:" size={3} />
                <Translation id="search-box-blank-state-text" />
              </BlankSearchState>
            </SearchContainer>
            <NavMobileButton
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              onKeyDown={() => setIsSearchOpen(!isSearchOpen)}
              role=""
              tabIndex="0"
            >
              <SearchIcon name="search" />
            </NavMobileButton>

            <NavMobileButton
              onClick={handleMenuToggle}
              onKeyDown={handleMenuToggle}
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
