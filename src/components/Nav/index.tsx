import React, { useState } from "react"
import styled from "styled-components"
import { cloneDeep } from "lodash"
import { useIntl } from "react-intl"

import Menu from "./Menu"
import MobileNavMenu from "./Mobile"
import NakedButton from "../NakedButton"
import Link from "../Link"
import Icon from "../Icon"
import Search from "../Search"
import Translation from "../Translation"
import { NavLink } from "../SharedStyledComponents"
import { translateMessageId } from "../../utils/translations"
import HomeIcon from "../../assets/eth-home-icon.svg"

import { IItem, ISections } from "./types"

const NavContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
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

const HomeLogo = styled(HomeIcon)`
  width: 22px;
  opacity: 0.85;
  &:hover {
    opacity: 1;
  }
`

const Span = styled.span`
  padding-left: 0.5rem;
`

const ThemeToggle = styled(NakedButton)`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  &:hover {
    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const NavIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
`

export interface IProps {
  handleThemeChange: () => void
  isDarkTheme: boolean
  path: string
}

// TODO display page title on mobile
const Nav: React.FC<IProps> = ({ handleThemeChange, isDarkTheme, path }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const intl = useIntl()

  const linkSections: ISections = {
    useEthereum: {
      text: "use-ethereum",
      ariaLabel: "use-ethereum-menu",
      items: [
        {
          text: "ethereum-wallets",
          to: "/wallets/",
        },
        {
          text: "get-eth",
          to: "/get-eth/",
        },
        {
          text: "decentralized-applications-dapps",
          to: "/dapps/",
        },
        {
          text: "layer-2",
          to: "/layer-2/",
        },
        {
          text: "nft-page",
          to: "/nft/",
        },
        {
          text: "defi-page",
          to: "/defi/",
        },
        {
          text: "dao-page",
          to: "/dao/",
        },
        {
          text: "page-stablecoins-title",
          to: "/stablecoins/",
        },
        {
          text: "page-stake-eth",
          to: "/staking/",
        },
        {
          text: "run-a-node",
          to: "/run-a-node/",
        },
        {
          text: "decentralized-social-networks",
          to: "/social-networks/",
        },
        {
          text: "decentralized-identity",
          to: "/decentralized-identity/",
        },
        {
          text: "decentralized-science",
          to: "/desci/",
        },
      ],
    },
    learn: {
      text: "learn",
      ariaLabel: "learn-menu",
      items: [
        {
          // @ts-ignore: until we add the translations
          text: "Start here",
          items: [
            {
              // @ts-ignore: until we add the translations
              text: "Learn hub",
              to: "/learn/",
            },
          ],
        },
        {
          // @ts-ignore: until we add the translations
          text: "Ethereum basics",
          items: [
            {
              text: "what-is-ethereum",
              to: "/what-is-ethereum/",
            },
            {
              text: "what-is-ether",
              to: "/eth/",
            },
            {
              text: "ethereum-wallets",
              to: "/wallets/",
            },
            {
              text: "ethereum-security",
              to: "/security/",
            },
            {
              text: "web3",
              to: "/web3/",
            },
            {
              text: "smart-contracts",
              to: "/smart-contracts/",
            },
          ],
        },
        {
          // @ts-ignore: until we add the translations
          text: "Ethereum protocol",
          items: [
            {
              text: "energy-consumption",
              to: "/energy-consumption/",
            },
            {
              text: "ethereum-upgrades",
              to: "/upgrades/",
            },
            {
              text: "eips",
              to: "/eips/",
            },
            {
              text: "history-of-ethereum",
              to: "/history/",
            },
            {
              text: "ethereum-whitepaper",
              to: "/whitepaper/",
            },
            {
              text: "ethereum-glossary",
              to: "/glossary/",
            },
            {
              text: "ethereum-governance",
              to: "/governance/",
            },
            {
              text: "bridges",
              to: "/bridges/",
            },
            {
              text: "zero-knowledge-proofs",
              to: "/zero-knowledge-proofs/",
            },
          ],
        },
      ],
    },
    developers: {
      text: "developers",
      ariaLabel: "page-developers-aria-label",
      items: [
        {
          text: "developers-home",
          to: "/developers/",
        },
        {
          text: "documentation",
          to: "/developers/docs/",
        },
        {
          text: "tutorials",
          to: "/developers/tutorials/",
        },
        {
          text: "learn-by-coding",
          to: "/developers/learning-tools/",
        },
        {
          text: "set-up-local-env",
          to: "/developers/local-environment/",
        },
      ],
    },
    enterprise: {
      text: "enterprise",
      ariaLabel: "enterprise-menu",
      items: [
        {
          text: "mainnet-ethereum",
          to: "/enterprise/",
        },
        {
          text: "private-ethereum",
          to: "/enterprise/private-ethereum/",
        },
      ],
    },
    community: {
      text: "community",
      ariaLabel: "community-menu",
      items: [
        {
          text: "community-hub",
          to: "/community/",
        },
        {
          text: "ethereum-online",
          to: "/community/online/",
        },
        {
          text: "ethereum-events",
          to: "/community/events/",
        },
        {
          text: "get-involved",
          to: "/community/get-involved/",
        },
        {
          text: "open-research",
          to: "/community/research/",
        },
        {
          text: "grants",
          to: "/community/grants/",
        },
        {
          text: "ethereum-support",
          to: "/community/support/",
        },
        {
          text: "language-resources",
          to: "/community/language-resources/",
        },
      ],
    },
  }

  const ednLinks: Array<IItem> = [
    {
      text: "home",
      to: "/developers/",
      isPartiallyActive: false,
    },
    {
      text: "docs",
      to: "/developers/docs/",
    },
    {
      text: "tutorials",
      to: "/developers/tutorials/",
    },
    {
      text: "learn-by-coding",
      to: "/developers/learning-tools/",
    },
    {
      text: "set-up-local-env",
      to: "/developers/local-environment/",
    },
  ]

  let mobileLinkSections = cloneDeep(linkSections)
  const handleMenuToggle = (item?: "search" | "menu"): void => {
    if (item === "menu") {
      setIsMenuOpen(!isMenuOpen)
    } else if (item === "search") {
      setIsSearchOpen(!isSearchOpen)
    } else {
      setIsMenuOpen(false)
      setIsSearchOpen(false)
    }

    if (isMenuOpen || isSearchOpen) {
      document.documentElement.style.overflowY = "scroll"
    } else {
      document.documentElement.style.overflowY = "hidden"
    }
  }

  const shouldShowSubNav = path.includes("/developers/")

  return (
    <NavContainer>
      <StyledNav aria-label={translateMessageId("nav-primary", intl)}>
        <NavContent>
          <HomeLogoNavLink to="/">
            <HomeLogo />
          </HomeLogoNavLink>
          {/* Desktop */}
          <InnerContent>
            <LeftItems>
              <Menu path={path} sections={linkSections} />
            </LeftItems>
            <RightItems>
              <Search useKeyboardShortcut />
              <ThemeToggle
                onClick={handleThemeChange}
                aria-label={
                  isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"
                }
              >
                <NavIcon name={isDarkTheme ? "lightTheme" : "darkTheme"} />
              </ThemeToggle>
              <RightNavLink to="/languages/">
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
        </NavContent>
      </StyledNav>
      {shouldShowSubNav && (
        <SubNav aria-label={translateMessageId("nav-developers", intl)}>
          {ednLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              isPartiallyActive={link.isPartiallyActive}
            >
              <Translation id={link.text} />
            </NavLink>
          ))}
        </SubNav>
      )}
    </NavContainer>
  )
}

export default Nav
