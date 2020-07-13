import React from "react"
import styled from "styled-components"

import Link from "./Link"

const Crumb = styled.h4`
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: normal;
`

const List = styled.ul`
  margin: 0;
  margin-bottom: 2rem;
  list-style-type: none;
  display: flex;
  justify-content: center;
`

const ListItem = styled.li`
  margin: 0;
  margin-right: 0.5rem;
`

const Slash = styled.span`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.colors.textSidebar};
`

const CrumbLink = styled(Link)`
  color: ${(props) => props.theme.colors.textSidebar};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const Breadcrumbs = ({ crumbs }) => {
  return (
    <List>
      {crumbs.map((crumb, idx) => {
        return (
          <ListItem key={idx}>
            <Crumb>
              <CrumbLink to={crumb.link} isPartiallyActive={crumb.link !== "/"}>
                {crumb.text}
              </CrumbLink>
              {idx < crumbs.length - 1 && <Slash>/</Slash>}
            </Crumb>
          </ListItem>
        )
      })}
    </List>
  )
}

export default Breadcrumbs
