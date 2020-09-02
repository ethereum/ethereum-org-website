import React from "react"
import styled from "styled-components"

import Link from "./Link"
import navLinks from "../data/sidenav-links.yaml"

const Aside = styled.aside`
  position: sticky;
  top: 75px; /* size of navbar */
  padding: 4rem 2rem 2rem;
  /* TODO take footer into account for height? */
  height: calc(100vh - 80px);
  overflow-y: auto;
  transition: all 0.2s ease-in-out;
  transition: transform 0.2s ease;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.1);

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }

  /* Gitbook styles */
  /* flex: 0 0 auto; */
  width: calc((100% - 1448px) / 2 + 298px);
  /* display: flex; */
  /* z-index: 15; */
  min-width: 298px;
  /* align-items: stretch; */
  /* border-right: 1px solid #e6ecf1; */
  /* flex-direction: column; */
  /* padding-left: calc((100% - 1448px) / 2); */
`

const List = styled.ul`
  list-style-type: none;
  list-style-image: none;
  padding: 0;
  margin: 0;
`

// TODO style & add animations
// Should be hidden when closed
const InnerList = styled.ul`
  list-style-type: none;
  list-style-image: none;
  padding: 0;
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.s};
  line-height: 1.6;
  font-weight: 400;
  padding-right: 0.25rem;
  padding-left: 1rem;
`

const ListItem = styled.li`
  margin: 0;
  margin-bottom: 1.5rem;
  font-weight: bold;
`

const SideNavLink = styled(Link)`
  text-decoration: none;
  position: relative;
  display: inline-block;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`

const ItemsList = ({ items }) => {
  return items.map((item, index) => {
    if (item.items) {
      return (
        <ListItem key={index}>
          <div>
            <SideNavLink to={item.link}>{item.title}</SideNavLink>
            <InnerList key={item.title}>
              <ItemsList items={item.items} />
            </InnerList>
          </div>
        </ListItem>
      )
    }
    return (
      <ListItem key={index}>
        <SideNavLink to={item.link}>{item.title}</SideNavLink>
      </ListItem>
    )
  })
}

// TODO handle nested items
// How structure query to have child pages nested within parents?
// Gatsby approach seems to be manual using separate data file :(
// https://github.com/gatsbyjs/gatsby/blob/master/www/src/data/sidebars/doc-links.yaml
const SideNav = () => {
  return (
    <Aside>
      <List>
        <ItemsList items={navLinks[0].items} />
      </List>
    </Aside>
  )
}

export default SideNav
