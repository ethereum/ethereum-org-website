import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Aside = styled.aside`
  width: 300px;
`
// TODO need to fix link generation
// Look at Reactjs.org for how they set them explicitly
// https://github.com/reactjs/reactjs.org/pull/1636
const ListItems = ({ items }) => {
  return items.map((item, index) => {
    if (item.items) {
      return (
        // TODO better key?
        // TODO style each level differently
        <ul key={item.title}>
          <ListItems items={item.items} />
        </ul>
      )
    }
    return (
      <li key={index}>
        <Link to={item.url}>{item.title}</Link>
      </li>
    )
  })
}

const Sidebar = ({ items }) => {
  if (items.length) {
    return (
      <Aside>
        <ul>
          <li>CONTENTS</li>
          <ListItems items={items} />
        </ul>
      </Aside>
    )
  } else {
    return (
      <Aside>
        <ul></ul>
      </Aside>
    )
  }
}

export default Sidebar
