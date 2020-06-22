import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Translation from "./Translation"

const customIdRegEx = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/

const Aside = styled.aside`
  position: sticky;
  top: 72px;
  padding: 1rem;
  bottom: 0;
  right: 0;
  width: 18.5rem;
  height: calc(100vh - 80px);
  overflow-y: auto;
  transition: all 0.2s ease-in-out;
  transition: transform 0.2s ease;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const OuterList = styled.ul`
  list-style-type: none;
  list-style-image: none;
  border-left: 1px solid ${(props) => props.theme.colors.dropdownBorder};
  padding: 0;
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.s};
  line-height: 1.6;
  font-weight: 400;
  padding-right: 0.25rem;
  padding-left: 1rem;
`

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
`

const StyledSidebarLink = styled(Link)`
  position: relative;
  display: inline-block;
  color: ${(props) => props.theme.colors.textSidebar};
  margin-bottom: 0.5rem !important;
  /* Add left border bullet on hover */
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    &:after {
      content: "";
      background-color: ${(props) => props.theme.colors.background};
      border: 1px solid ${(props) => props.theme.colors.primary};
      border-radius: 50%;
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      left: -1.29rem;
      top: 50%;
      margin-top: -0.25rem;
    }
  }
  /* Add left solid bullet when active */
  &.active {
    color: ${(props) => props.theme.colors.primary};
    &:after {
      content: "";
      background-color: ${(props) => props.theme.colors.primary};
      border: 1px solid ${(props) => props.theme.colors.primary};
      border-radius: 50%;
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      left: -1.29rem;
      top: 50%;
      margin-top: -0.25rem;
    }
  }
  /* Extend bullet position when nested */
  &.nested {
    &:before {
      content: "⌞";
      opacity: 0.5;
      display: inline-flex;
      position: absolute;
      left: -14px;
      top: -4px;
    }
    &:hover {
      &:after {
        left: -2.29rem;
      }
    }
    &.active {
      &:after {
        left: -2.29rem;
      }
    }
  }
`

const slugify = (s) =>
  encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-"))

const getCustomId = (title) => {
  const match = customIdRegEx.exec(title)
  if (match) {
    return match[2].toLowerCase()
  }
  console.warn("Missing custom ID on header: ", title)
  return slugify(title)
}

const trimmedTitle = (title) => {
  const match = customIdRegEx.exec(title)
  return match ? title.replace(match[1], "").trim() : title
}

const SidebarLink = ({ depth, item }) => {
  const url = `#${getCustomId(item.title)}`
  let isActive = false
  if (typeof window !== `undefined`) {
    isActive = window.location.hash === url
  }
  const isNested = depth === 2
  let classes = ""
  if (isActive) {
    classes += " active"
  }
  if (isNested) {
    classes += " nested"
  }
  return (
    <StyledSidebarLink to={url} className={classes}>
      {trimmedTitle(item.title)}
    </StyledSidebarLink>
  )
}

const ListItems = ({ items, depth, maxDepth }) => {
  if (depth > maxDepth) {
    return null
  }
  return items.map((item, index) => {
    if (item.items) {
      // Don't display <h1>
      if (depth === 0) {
        return (
          <OuterList key={item.title}>
            <h4>
              <Translation id="page-content" />
            </h4>
            <ListItems
              items={item.items}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          </OuterList>
        )
      }
      return (
        <ListItem key={index}>
          <div>
            <SidebarLink depth={depth} item={item} />
            <InnerList key={item.title}>
              <ListItems
                items={item.items}
                depth={depth + 1}
                maxDepth={maxDepth}
              />
            </InnerList>
          </div>
        </ListItem>
      )
    }
    return (
      <ListItem key={index}>
        <div>
          <SidebarLink depth={depth} item={item} />
        </div>
      </ListItem>
    )
  })
}

const Sidebar = ({ items, maxDepth }) => {
  return (
    <Aside>
      <ListItems items={items} depth={0} maxDepth={maxDepth ? maxDepth : 1} />
    </Aside>
  )
}

export default Sidebar
