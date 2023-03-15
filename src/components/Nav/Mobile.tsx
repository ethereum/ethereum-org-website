import React from "react"
import { Box, IconButton } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { motion } from "framer-motion"

import Icon from "../Icon"
import Link from "../Link"
import Translation from "../Translation"
import { NavLink } from "../SharedStyledComponents"

import { ISections } from "./types"

const MobileModal = styled(motion.div)`
  position: fixed;
  background: ${(props) => props.theme.colors.modalBackground};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
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
  stroke-width: 2px;
  z-index: 100;
  pointer-events: ${(props) => props.pointerEvents};
  & > path {
    stroke: ${(props) => props.theme.colors.text};
    fill: none;
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    & > path {
      stroke: ${(props) => props.theme.colors.primary};
    }
  }
`

const hamburgerSvg =
  "M 2 13 l 10 0 l 0 0 l 10 0 M 4 19 l 8 0 M 12 19 l 8 0 M 2 25 l 10 0 l 0 0 l 10 0"
const glyphSvg =
  "M 2 19 l 10 -14 l 0 0 l 10 14 M 2 19 l 10 7 M 12 26 l 10 -7 M 2 22 l 10 15 l 0 0 l 10 -15"
const closeSvg =
  "M 2 13 l 0 -3 l 20 0 l 0 3 M 7 14 l 10 10 M 7 24 l 10 -10 M 2 25 l 0 3 l 20 0 l 0 -3"

const glyphPathVariants = {
  closed: {
    d: hamburgerSvg,
    transition: { duration: 0.4 },
  },
  open: {
    d: [hamburgerSvg, glyphSvg, glyphSvg, glyphSvg, closeSvg],
    transition: { duration: 1.2 },
  },
}

const MenuItems = styled.ul`
  margin: 0;
  height: 100%;
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
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.text};
`

const SectionSubtitle = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1;
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

const BottomMenu = styled(motion.div)`
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
  z-index: 99;
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
    text-decoration: none;
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
  text-align: center;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

export interface IProps {
  isMenuOpen: boolean
  isDarkTheme: boolean
  toggleMenu: () => void
  toggleTheme: () => void
  toggleSearch: () => void
  linkSections: ISections
  fromPageParameter: string
}

const MobileNavMenu: React.FC<IProps> = ({
  isMenuOpen,
  isDarkTheme,
  toggleMenu,
  toggleTheme,
  toggleSearch,
  linkSections,
  fromPageParameter,
}) => {
  const { t } = useTranslation()

  const handleClick = (): void => {
    toggleMenu()
  }

  return (
    <Box
      display={{ base: "flex", lg: "none" }}
      gap={4}
      sx={{ svg: { fill: "body" } }}
    >
      <IconButton
        icon={<Icon name="search" />}
        onClick={toggleSearch}
        aria-label={t("aria-toggle-search-button")}
        variant="icon"
        _hover={{ svg: { fill: "primary" } }}
      />
      <IconButton
        icon={
          <GlyphButton
            viewBox="0 0 24 40"
            pointerEvents={isMenuOpen ? "none" : "auto"}
          >
            <motion.path
              variants={glyphPathVariants}
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
            />
          </GlyphButton>
        }
        onClick={toggleMenu}
        aria-label={t("aria-toggle-search-button")}
        variant="icon"
        _hover={{ svg: { fill: "primary" } }}
      />
      <MobileModal
        animate={isMenuOpen ? "open" : "closed"}
        variants={mobileModalVariants}
        initial="closed"
        onClick={handleClick}
      />
      <MenuContainer
        aria-hidden={!isMenuOpen}
        animate={isMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        initial="closed"
      >
        <MenuItems>
          {Object.keys(linkSections).map((sectionKey, idx) => {
            const section = linkSections[sectionKey]
            return section.items ? (
              <NavListItem key={idx} aria-label={`Select ${section.text}`}>
                <SectionTitle>{section.text}</SectionTitle>
                <SectionItems>
                  {section.items.map((item, idx) =>
                    item.items ? (
                      <React.Fragment key={idx}>
                        <SectionSubtitle>{item.text}</SectionSubtitle>
                        {item.items.map((item, idx) => (
                          <SectionItem key={idx} onClick={handleClick}>
                            <StyledNavLink
                              to={item.to}
                              isPartiallyActive={item.isPartiallyActive}
                            >
                              {item.text}
                            </StyledNavLink>
                          </SectionItem>
                        ))}
                      </React.Fragment>
                    ) : (
                      <SectionItem key={idx} onClick={handleClick}>
                        <StyledNavLink
                          to={item.to}
                          isPartiallyActive={item.isPartiallyActive}
                        >
                          {item.text}
                        </StyledNavLink>
                      </SectionItem>
                    )
                  )}
                </SectionItems>
              </NavListItem>
            ) : (
              <NavListItem onClick={handleClick} key={idx}>
                <NavLink
                  to={section.to}
                  isPartiallyActive={section.isPartiallyActive}
                >
                  {section.text}
                </NavLink>
              </NavListItem>
            )
          })}
        </MenuItems>
      </MenuContainer>
      <BottomMenu
        aria-hidden={!isMenuOpen}
        animate={isMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        initial="closed"
      >
        <BottomItem onClick={toggleSearch}>
          <Icon name="search" />
          <BottomItemText>
            <Translation id="search" />
          </BottomItemText>
        </BottomItem>
        <BottomItem onClick={toggleTheme}>
          <Icon name={isDarkTheme ? "darkTheme" : "lightTheme"} />
          <BottomItemText>
            <Translation id={isDarkTheme ? "dark-mode" : "light-mode"} />
          </BottomItemText>
        </BottomItem>
        <BottomItem onClick={handleClick}>
          <BottomLink to={`/languages/${fromPageParameter}`}>
            <Icon name="language" />
            <BottomItemText>
              <Translation id="languages" />
            </BottomItemText>
          </BottomLink>
        </BottomItem>
      </BottomMenu>
    </Box>
  )
}

export default MobileNavMenu
