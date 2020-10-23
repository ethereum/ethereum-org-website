import React from "react"
import styled from "styled-components"

import docLinks from "../data/developer-docs-links.yaml"
import Link from "./Link"
import Emoji from "./Emoji"

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 604px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  margin-top: 1rem;
  width: 262px;
  height: 82px;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
`

const PreviousCard = styled(Card)`
  justify-content: flex-start;
`

const NextCard = styled(Card)`
  justify-content: flex-end;
`
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 166px;
  max-height: 74px;
  word-wrap: break-word;
`

const PreviousText = styled(TextDiv)`
  align-items: flex-start;
`

const NextText = styled(TextDiv)`
  align-items: flex-end;
`

const NavLink = styled(Link)`
  line-height: 1rem;
`

const PreviousNavLink = styled(NavLink)`
  text-align: left;
`

const NextNavLink = styled(NavLink)`
  text-align: right;
`

const DocsNav = ({ relativePath }) => {
  // Construct array of all linkable documents in order recursively
  const docsArray = []
  const getDocs = (links) => {
    for (let item of links) {
      // If object has 'items' key
      if (item.items) {
        // And if item has a 'to' key
        // Add 'to' path and 'title' to docsArray
        item.to && docsArray.push({ to: item.to, title: item.title })
        // Then recursively add sub-items
        getDocs(item.items)
      } else {
        // If object has no further 'items', add and continue
        docsArray.push({ to: item.to, title: item.title })
      }
    }
  }

  // Initiate recursive loop with full docLinks yaml
  getDocs(docLinks)

  // Find index that matches current page
  let currentIndex = 0
  for (let i = 0; i < docsArray.length; i++) {
    if (relativePath.indexOf(docsArray[i].to) > -1) {
      currentIndex = i
    }
  }

  // Extract previous and next doc based on current index +/- 1
  const previousDoc = currentIndex - 1 > 0 ? docsArray[currentIndex - 1] : null
  const nextDoc =
    currentIndex + 1 < docsArray.length ? docsArray[currentIndex + 1] : null

  return (
    <Container>
      {previousDoc ? (
        <PreviousCard>
          <Emoji
            text=":backhand_index_pointing_left:"
            size={3}
            marginRight={1}
          />
          <PreviousText>
            <span>PREVIOUS</span>
            <PreviousNavLink to={previousDoc.to}>
              {previousDoc.title}
            </PreviousNavLink>
          </PreviousText>
        </PreviousCard>
      ) : (
        <div />
      )}
      {nextDoc ? (
        <NextCard>
          <NextText>
            <span>NEXT</span>
            <NextNavLink to={nextDoc.to}>{nextDoc.title}</NextNavLink>
          </NextText>
          <Emoji
            text=":backhand_index_pointing_right:"
            size={3}
            marginLeft={1}
          />
        </NextCard>
      ) : (
        <div />
      )}
    </Container>
  )
}

export default DocsNav
