import React, { FC, useState } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  Icon,
  IconButton,
  Flex,
  Text,
  useColorMode,
  useToken,
} from "@chakra-ui/react"
import { MdWbSunny, MdBrightness2, MdLanguage } from "react-icons/md"
import styled from "@emotion/styled"
import { cloneDeep } from "lodash"

import Menu from "./Menu"
import MobileNavMenu from "./Mobile"
import ButtonLink from "../ButtonLink"
import Link from "../Link"
import Search from "../Search"
import Translation from "../Translation"
import { NavLink } from "../SharedStyledComponents"
import { EthHomeIcon } from "../icons"
import { IItem, ISections } from "./types"

const NavContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
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
  gap: 0.5rem;
`

const HomeLogoNavLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`

const HomeLogo = styled(EthHomeIcon)`
  opacity: 0.85;
  &:hover {
    opacity: 1;
  }
`

export interface IProps {
  path: string
}

// TODO display page title on mobile
const Nav: FC<IProps> = ({ path }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  const isDarkTheme = colorMode === "dark"

  const linkSections: ISections = {
    useEthereum: {
      text: t("use-ethereum"),
      ariaLabel: t("use-ethereum-menu"),
      items: [
        {
          text: t("find-wallet"),
          to: "/wallets/find-wallet/",
        },
        {
          text: t("get-eth"),
          to: "/get-eth/",
        },
        {
          text: t("decentralized-applications-dapps"),
          to: "/dapps/",
        },
        {
          text: t("layer-2"),
          to: "/layer-2/",
        },
        {
          text: t("nft-page"),
          to: "/nft/",
        },
        {
          text: t("defi-page"),
          to: "/defi/",
        },
        {
          text: t("dao-page"),
          to: "/dao/",
        },
        {
          text: t("stablecoins"),
          to: "/stablecoins/",
        },
        {
          text: t("stake-eth"),
          to: "/staking/",
        },
        {
          text: t("run-a-node"),
          to: "/run-a-node/",
        },
        {
          text: t("decentralized-social-networks"),
          to: "/social-networks/",
        },
        {
          text: t("decentralized-identity"),
          to: "/decentralized-identity/",
        },
        {
          text: t("decentralized-science"),
          to: "/desci/",
        },
      ],
    },
    learn: {
      text: t("learn"),
      ariaLabel: t("learn-menu"),
      items: [
        {
          text: "Start here",
          items: [
            {
              text: t("learn-hub"),
              to: "/learn/",
            },
            {
              text: t("guides-hub"),
              to: "/guides/",
            },
          ],
        },
        {
          text: "Ethereum basics",
          items: [
            {
              text: t("what-is-ethereum"),
              to: "/what-is-ethereum/",
            },
            {
              text: t("what-is-ether"),
              to: "/eth/",
            },
            {
              text: t("ethereum-wallets"),
              to: "/wallets/",
            },
            {
              text: t("ethereum-security"),
              to: "/security/",
            },
            {
              text: t("web3"),
              to: "/web3/",
            },
            {
              text: t("smart-contracts"),
              to: "/smart-contracts/",
            },
          ],
        },
        {
          text: "Ethereum protocol",
          items: [
            {
              text: t("energy-consumption"),
              to: "/energy-consumption/",
            },
            {
              text: t("ethereum-roadmap"),
              to: "/roadmap/",
            },
            {
              text: t("eips"),
              to: "/eips/",
            },
            {
              text: t("history-of-ethereum"),
              to: "/history/",
            },
            {
              text: t("ethereum-whitepaper"),
              to: "/whitepaper/",
            },
            {
              text: t("ethereum-glossary"),
              to: "/glossary/",
            },
            {
              text: t("ethereum-governance"),
              to: "/governance/",
            },
            {
              text: t("bridges"),
              to: "/bridges/",
            },
            {
              text: t("zero-knowledge-proofs"),
              to: "/zero-knowledge-proofs/",
            },
          ],
        },
      ],
    },
    developers: {
      text: t("developers"),
      ariaLabel: t("page-developers-aria-label"),
      items: [
        {
          text: t("developers-home"),
          to: "/developers/",
        },
        {
          text: t("documentation"),
          to: "/developers/docs/",
        },
        {
          text: t("tutorials"),
          to: "/developers/tutorials/",
        },
        {
          text: t("learn-by-coding"),
          to: "/developers/learning-tools/",
        },
        {
          text: t("set-up-local-env"),
          to: "/developers/local-environment/",
        },
      ],
    },
    enterprise: {
      text: t("enterprise"),
      ariaLabel: t("enterprise-menu"),
      items: [
        {
          text: t("mainnet-ethereum"),
          to: "/enterprise/",
        },
        {
          text: t("private-ethereum"),
          to: "/enterprise/private-ethereum/",
        },
      ],
    },
    community: {
      text: t("community"),
      ariaLabel: t("community-menu"),
      items: [
        {
          text: t("community-hub"),
          to: "/community/",
        },
        {
          text: t("ethereum-online"),
          to: "/community/online/",
        },
        {
          text: t("ethereum-events"),
          to: "/community/events/",
        },
        {
          text: t("get-involved"),
          to: "/community/get-involved/",
        },
        {
          text: t("open-research"),
          to: "/community/research/",
        },
        {
          text: t("grants"),
          to: "/community/grants/",
        },
        {
          text: t("ethereum-support"),
          to: "/community/support/",
        },
        {
          text: t("language-resources"),
          to: "/community/language-resources/",
        },
      ],
    },
  }

  const ednLinks: Array<IItem> = [
    {
      text: t("home"),
      to: "/developers/",
      isPartiallyActive: false,
    },
    {
      text: t("docs"),
      to: "/developers/docs/",
    },
    {
      text: t("tutorials"),
      to: "/developers/tutorials/",
    },
    {
      text: t("learn-by-coding"),
      to: "/developers/learning-tools/",
    },
    {
      text: t("set-up-local-env"),
      to: "/developers/local-environment/",
    },
  ]

  let mobileLinkSections = cloneDeep(linkSections)
  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev)
    document.documentElement.style.overflowY = isMenuOpen ? "scroll" : "hidden"
  }
  const lgBreakpoint = useToken("breakpoints", "lg")

  const toggleSearch = (): void => {
    document.getElementsByClassName("DocSearch-Button")[0].click()
  }
  const shouldShowSubNav = path.includes("/developers/")
  const splitPath = path.split("/")
  const fromPageParameter =
    splitPath.length > 3 && splitPath[2] !== "languages"
      ? `?from=/${splitPath.slice(2).join("/")}`
      : ""
  return (
    <NavContainer>
      <StyledNav aria-label={t("nav-primary")}>
        <NavContent>
          <HomeLogoNavLink to="/" aria-label={t("home")}>
            <HomeLogo />
          </HomeLogoNavLink>
          {/* Desktop */}
          <Flex
            justifyContent="space-between"
            w="100%"
            display={{ base: "none", lg: "flex" }}
          >
            <LeftItems>
              <Menu path={path} sections={linkSections} />
            </LeftItems>
            <RightItems>
              <Search />
              <IconButton
                aria-label={
                  isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"
                }
                icon={
                  <Icon
                    as={isDarkTheme ? MdWbSunny : MdBrightness2}
                    fontSize="2xl"
                  />
                }
                variant="icon"
                _hover={{ color: "primary" }}
                onClick={toggleColorMode}
              />
              <ButtonLink to={`/languages/${fromPageParameter}`} variant="icon">
                <Icon as={MdLanguage} fontSize="2xl" />
                <Text as="span" pl={2}>
                  <Translation id="languages" />
                </Text>
              </ButtonLink>
            </RightItems>
          </Flex>
          {/* Mobile */}
          <MobileNavMenu
            isMenuOpen={isMenuOpen}
            isDarkTheme={isDarkTheme}
            toggleMenu={toggleMenu}
            toggleTheme={toggleColorMode}
            toggleSearch={toggleSearch}
            linkSections={mobileLinkSections}
            fromPageParameter={fromPageParameter}
          />
        </NavContent>
      </StyledNav>
      {shouldShowSubNav && (
        <SubNav aria-label={t("nav-developers")}>
          {ednLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              isPartiallyActive={link.isPartiallyActive}
            >
              {link.text}
            </NavLink>
          ))}
        </SubNav>
      )}
    </NavContainer>
  )
}

export default Nav
