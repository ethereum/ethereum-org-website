import React from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import { motion } from "framer-motion"

import NakedButton from "../NakedButton"
import Translation from "../Translation"
import Icon from "../Icon"
import Link from "../Link"
import Search from "../Search"
import Emoji from "../Emoji"
import { NavLink } from "../../components/SharedStyledComponents"
import { translateMessageId } from "../../utils/translations"

const Container = styled.div`
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: flex;
  }
`

const MenuIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
`

const MenuButton = styled(NakedButton)`
  margin-left: 1rem;
`

const SearchIcon = styled(MenuIcon)`
  margin-right: 1rem;
`

const MobileModal = styled(motion.div)`
  position: fixed;
  background: ${(props) => props.theme.colors.modalBackground};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const mobileModalVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "none", opacity: 0 },
}

const MenuContainer = styled(motion.div)`
  background: ${(props) => props.theme.colors.background};
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  overflow: hidden;
  width: 100%;
  max-width: 450px;
`

const mobileMenuVariants = {
  closed: { x: `-100%`, transition: { duration: 0.2 } },
  open: { x: 0, transition: { duration: 0.8 } },
}

const GlyphButton = styled.svg`
  margin: 0 0.125rem;
  width: 1.5rem;
  height: 2.5rem;
  position: relative;
  stroke: ${({ theme }) => theme.colors.text};
  stroke-width: 2px;
  z-index: 100;
`

const glyphPathVariants = {
  hamburger: {
    d: "M 2 13 l 10 0 l 10 0 M 4 19 l 8  0 l 8  0 M 2 25 l 10 0 l 10 0",
    transition: { duration: 0.4 },
  },
  glyph: {
    d: "M 2 19 l 10 -14 l 10 14 M 2 19 l 10 7 l 10 -7 M 2 22 l 10 15 l 10 -15",
    transition: { duration: 0.8 },
  },
}

const SearchContainer = styled(MenuContainer)`
  z-index: 101;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`

const SearchHeader = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > svg {
    fill: ${(props) => props.theme.colors.text};
  }
`

const CloseIconContainer = styled.span`
  z-index: 102;
  cursor: pointer;

  & > svg {
    fill: ${(props) => props.theme.colors.text};
  }
`

const MenuItems = styled.ul`
  margin: 0;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 3rem 1rem 8rem;
`

const NavListItem = styled.li`
  margin: 0;
  margin-bottom: 3rem;
  list-style-type: none;
  list-style-image: none;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 0;
`

const SectionTitle = styled.div`
  margin: 1rem 0;
  color: ${(props) => props.theme.colors.text};
`

const SectionItems = styled.ul`
  margin: 0;
`

const SectionItem = styled.li`
  margin-bottom: 1rem;
  list-style-type: none;
  list-style-image: none;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

const BottomMenu = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-top: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding-right: 1rem;
  padding-left: 1rem;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 108px;
  align-items: center;
  width: 100%;
  max-width: 450px;
`
const BottomItem = styled.div`
  flex: 1 1 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
  & > svg {
    fill: ${(props) => props.theme.colors.text};
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    & > svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const BottomLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.colors.text};
  & > svg {
    fill: ${(props) => props.theme.colors.text};
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    & > svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const BottomItemText = styled.div`
  font-size: 0.875rem;
  line-height: 1.6;
  font-weight: 400;
  letter-spacing: 0.04em;
  margin-top: 0.5rem;
  text-transform: uppercase;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
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

const MobileNavMenu = ({
  isMenuOpen,
  isSearchOpen,
  isDarkTheme,
  toggleMenu,
  toggleTheme,
  linkSections,
}) => {
  const intl = useIntl()

  const isOpen = isMenuOpen || isSearchOpen
  return (
    <Container>
      <MenuButton
        onClick={() => toggleMenu("search")}
        aria-label={translateMessageId("aria-toggle-search-button", intl)}
      >
        <SearchIcon name="search" />
      </MenuButton>
      <MenuButton
        onClick={() => toggleMenu("menu")}
        aria-label={translateMessageId("aria-toggle-menu-button", intl)}
      >
        <GlyphButton viewBox="0 0 24 40">
          <motion.path
            variants={glyphPathVariants}
            animate={isOpen ? "glyph" : "hamburger"}
            d={glyphPathVariants.hamburger.d}
            stroke={isDarkTheme ? "white" : "black"}
            fill="none"
          />
        </GlyphButton>
      </MenuButton>
      <MobileModal
        animate={isOpen ? "open" : "closed"}
        variants={mobileModalVariants}
        initial="closed"
        onClick={toggleMenu}
      />
      <MenuContainer
        aria-hidden={isMenuOpen ? false : true}
        animate={isMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        initial="closed"
      >
        <MenuItems>
          {linkSections.map((section, idx) =>
            section.items ? (
              <NavListItem
                key={idx}
                aria-label={`Select ${translateMessageId(section.text, intl)}`}
              >
                <SectionTitle>
                  <Translation id={section.text} />
                </SectionTitle>
                <SectionItems>
                  {section.items.map((item, idx) => (
                    <SectionItem key={idx} onClick={toggleMenu}>
                      <StyledNavLink
                        to={item.to}
                        isPartiallyActive={item.isPartiallyActive}
                      >
                        <Translation id={item.text} />
                      </StyledNavLink>
                    </SectionItem>
                  ))}
                </SectionItems>
              </NavListItem>
            ) : (
              <NavListItem onClick={toggleMenu} key={idx}>
                <NavLink
                  to={section.to}
                  isPartiallyActive={section.isPartiallyActive}
                >
                  <Translation id={section.text} />
                </NavLink>
              </NavListItem>
            )
          )}
        </MenuItems>
        <BottomMenu>
          <BottomItem onClick={() => toggleMenu("search")}>
            <MenuIcon name="search" />
            <BottomItemText>
              <Translation id="search" />
            </BottomItemText>
          </BottomItem>
          <BottomItem onClick={toggleTheme}>
            <MenuIcon name={isDarkTheme ? "darkTheme" : "lightTheme"} />
            <BottomItemText>
              <Translation id={isDarkTheme ? "dark-mode" : "light-mode"} />
            </BottomItemText>
          </BottomItem>
          <BottomItem onClick={toggleMenu}>
            <BottomLink to="/languages/">
              <MenuIcon name="language" />
              <BottomItemText>
                <Translation id="languages" />
              </BottomItemText>
            </BottomLink>
          </BottomItem>
        </BottomMenu>
      </MenuContainer>
      <SearchContainer
        animate={isSearchOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        initial="closed"
      >
        <SearchHeader>
          <Translation id="search" />
          <CloseIconContainer onClick={() => toggleMenu("search")}>
            <Icon name="close" />
          </CloseIconContainer>
        </SearchHeader>
        <Search handleSearchSelect={toggleMenu} />
        <BlankSearchState>
          <Emoji text=":sailboat:" size={3} />
          <Translation id="search-box-blank-state-text" />
        </BlankSearchState>
      </SearchContainer>
    </Container>
  )
}

export default MobileNavMenu
