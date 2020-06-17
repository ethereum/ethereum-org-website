import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

import Link from "./Link"
import Icon from "./Icon"
import Search from "./Search"

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
`

const InnerContent = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 450px; */
  justify-content: space-between;
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

const Nav = ({ handleThemeChange, isDarkTheme }) => {
  const intl = useIntl()

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
          text: "Ethereum Studio",
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

  // Loop through link sections
  // If section has `items`, render dropdown link
  // Else, render link
  return (
    <StyledNav>
      <NavContent>
        <Link to="/en/">
          <HomeLogo
            fixed={data.file.childImageSharp.fixed}
            alt={"Ethereum logo"}
          />
        </Link>
        <InnerContent>
          <LeftItems>
            <NavListItem>
              <NavLink to={`/`}>Ethereum</NavLink>
            </NavListItem>
            <NavListItem>
              <NavLink to={`/what-is-ethereum/`}>What is Ethereum?</NavLink>
            </NavListItem>
            <NavListItem>
              <NavLink to={`/learn/`}>Learn</NavLink>
            </NavListItem>
            <NavListItem>
              <NavLink to={`/developers/`}>Developers</NavLink>
            </NavListItem>
          </LeftItems>
          <RightItems>
            <Search />
            <ThemeToggle onClick={handleThemeChange}>
              <Icon name={isDarkTheme ? "darkTheme" : "lightTheme"} />
            </ThemeToggle>
            <RightNavLink to="/en/languages/" hideArrow={true}>
              <Icon name="language" />
              <Span>Languages</Span>
            </RightNavLink>
          </RightItems>
        </InnerContent>
      </NavContent>
    </StyledNav>
  )
}

export default Nav
