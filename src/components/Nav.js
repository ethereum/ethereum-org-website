import React from "react"
// TODO sort out how to use Link from "gatsby-plugin-intl"
// TypeError: Cannot read property 'language' of undefined
// import { Link } from "gatsby-plugin-intl"
import { Link } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

const StyledNav = styled.nav`
  margin: 2rem;
`

const NavList = styled.ul`
  display: flex;
`

const NavListItem = styled.li`
  margin-left: 2rem;
`

const Nav = ({ handleThemeChange }) => {
  const intl = useIntl()

  return (
    <StyledNav>
      <NavList>
        <NavListItem>
          <Link to={`/${intl.locale}/what-is-ethereum/`}>
            What is Ethereum?
          </Link>
        </NavListItem>
        <NavListItem>
          <Link to={`/${intl.locale}/whitepaper/`}>Whitepaper</Link>
        </NavListItem>
        <NavListItem>
          <button onClick={handleThemeChange}>Light mode</button>
        </NavListItem>
      </NavList>
    </StyledNav>
  )
}

export default Nav
