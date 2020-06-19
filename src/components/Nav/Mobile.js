import React, { useState } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import { motion } from "framer-motion"

import Translation from "../Translation"
import Icon from "../Icon"
import Link from "../Link"
import Search from "../Search"

const MobileModal = styled(motion.div)`
  position: fixed;
  background: hsla(0, 0%, 69.8%, 0.9);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const mobileModalVariants = {
  open: { display: "block" },
  closed: { display: "none" },
}

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

const mobileMenuVariants = {
  closed: { x: `-100%`, transition: { duration: 0.2 } },
  open: { x: 0, transition: { duration: 0.8 } },
}

const SearchContainer = styled(MenuContainer)`
  z-index: 101;
  padding: 1rem;
`

const searchContainerVariants = {
  closed: { y: `-100%`, transition: { duration: 0.2 } },
  open: { y: 0, transition: { duration: 0.8 } },
}

const SearchHeader = styled.h3`
  display: flex;
  align-items: center;
  cursor: pointer;

  & > svg {
    fill: ${(props) => props.theme.colors.text};
  }
`

const CloseIconContainer = styled.span`
  z-index: 102;
  position: absolute;
  cursor: pointer;
  top: 1rem;
  right: 1rem;

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

const SectionTitle = styled.div`
  margin: 1rem 0;
  color: ${(props) => props.theme.colors.text};
`

const SectionItems = styled.ul`
  margin: 0;
`

const SectionItem = styled.li`
  margin: 0;
  margin-bottom: 1rem;
  list-style-type: none;
  list-style-image: none;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

const NavLink = styled(Link)`
  margin-right: 2rem;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
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
  flex: 1 1 auto;
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
  flex: 1 1 auto;
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

const MenuIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
`

const ChevronLeftIcon = styled(Icon)`
  transform: rotate(180deg);
`

// TODO mobile search
const MobileNavMenu = ({
  isOpen,
  isDarkTheme,
  toggleMenu,
  toggleTheme,
  linkSections,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const intl = useIntl()

  const handleClose = () => {
    toggleMenu()
    setIsSearchOpen(false)
  }

  return (
    <>
      <MobileModal
        animate={isOpen ? "open" : "closed"}
        variants={mobileModalVariants}
        initial="closed"
      ></MobileModal>
      <MenuContainer
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        initial="closed"
      >
        <MenuItems>
          {linkSections.map((section, idx) => {
            if (section.items) {
              return (
                <NavListItem
                  key={idx}
                  aria-label={`Select ${intl.formatMessage({
                    id: section.text,
                  })}`}
                >
                  <SectionTitle>
                    <Translation id={section.text} />
                  </SectionTitle>
                  <SectionItems>
                    {section.items.map((item, idx) => {
                      return (
                        <SectionItem onClick={toggleMenu} key={idx}>
                          <NavLink to={item.to}>
                            <Translation id={item.text} />
                          </NavLink>
                        </SectionItem>
                      )
                    })}
                  </SectionItems>
                </NavListItem>
              )
            }
            return (
              <NavListItem onClick={toggleMenu} key={idx}>
                <NavLink to={section.to}>
                  <Translation id={section.text} />
                </NavLink>
              </NavListItem>
            )
          })}
        </MenuItems>
        <BottomMenu>
          <BottomItem onClick={() => setIsSearchOpen(!isSearchOpen)}>
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
          <div onClick={toggleMenu}>
            <BottomLink to="/en/languages/">
              <MenuIcon name="language" />
              <BottomItemText>
                <Translation id="languages" />
              </BottomItemText>
            </BottomLink>
          </div>
        </BottomMenu>
        {/* TODO add sail emoji */}
        <SearchContainer
          animate={isSearchOpen ? "open" : "closed"}
          variants={searchContainerVariants}
          initial="closed"
        >
          <SearchHeader onClick={() => setIsSearchOpen(false)}>
            <ChevronLeftIcon name="chevronRight" />
            <Translation id="search" />
          </SearchHeader>
          <Search handleSearchSelect={handleClose} />
        </SearchContainer>
        <CloseIconContainer onClick={handleClose}>
          <Icon name="close" />
        </CloseIconContainer>
      </MenuContainer>
    </>
  )
}

export default MobileNavMenu
