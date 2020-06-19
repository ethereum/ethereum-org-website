import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Aside = styled.aside`
  width: 300px;
`
// TODO move to markdown utils?
const slugify = (s) =>
  encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-"))

const getCustomId = (title) => {
  const match = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/.exec(title)
  if (match) {
    return match[2].toLowerCase()
  }
  console.warn("Missing custom ID on header: ", title)
  return slugify(title)
}

const trimmedTitle = (title) => {
  const match = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/.exec(title)
  return match ? title.replace(match[1], "").trim() : title
}

const ListItems = ({ items, level }) => {
  return items.map((item, index) => {
    if (item.items) {
      // Don't display <h1>
      if (level === 1) {
        return (
          <ul key={item.title}>
            <ListItems items={item.items} level={level + 1} />
          </ul>
        )
      }
      return (
        // TODO better key?
        // TODO style each level differently
        <li key={index}>
          <Link to={`#${getCustomId(item.title)}`}>
            {trimmedTitle(item.title)}
          </Link>
          <ul key={item.title}>
            <ListItems items={item.items} level={level + 1} />
          </ul>
        </li>
      )
    }
    return (
      <li key={index}>
        <Link to={`#${getCustomId(item.title)}`}>
          {trimmedTitle(item.title)}
        </Link>
      </li>
    )
  })
}

// TODO style
const Sidebar = ({ items }) => {
  if (items.length) {
    return (
      <Aside>
        <ul>
          <li>CONTENTS</li>
          <ListItems items={items} level={1} />
        </ul>
      </Aside>
    )
  } else {
    // TODO return null? Hide this component?
    return (
      <Aside>
        <ul></ul>
      </Aside>
    )
  }
}

export default Sidebar
